import { UsecaseContext } from "..";
import { IAssetAmount, Chain, TransactionStatus } from "../../entities";
import {
  InterchainApi,
  ExecutableTransaction,
  InterchainTransaction,
  InterchainParams,
} from "./_InterchainApi";
import { parseTxFailure } from "../../services/SifService/parseTxFailure";
import { SubscribeToTx } from "../peg/utils/subscribeToTx";
import { SifchainChain, EthereumChain } from "../../services/ChainsService";
import { calculateUnpegFee } from "../peg/utils/calculateExportFee";
import { isOriginallySifchainNativeToken } from "../peg/utils/isOriginallySifchainNativeToken";

export default function createSifchainEthereumApi(
  context: UsecaseContext,
  sifchainChain: SifchainChain,
  ethereumChain: EthereumChain,
) {
  return new EthereumSifchainInterchainApi(
    context,
    sifchainChain,
    ethereumChain,
  );
}

class EthereumSifchainInterchainApi
  extends InterchainApi
  implements InterchainApi {
  subscribeToTx: ReturnType<typeof SubscribeToTx>;

  constructor(context: UsecaseContext, fromChain: Chain, toChain: Chain) {
    super(context, fromChain, toChain);
    this.subscribeToTx = SubscribeToTx(this.context);
  }

  async estimateFees(params: InterchainParams) {
    return calculateUnpegFee(params.assetAmount.asset);
  }

  transfer(params: InterchainParams) {
    return new ExecutableTransaction(async (emit) => {
      const feeAmount = await this.estimateFees(params);
      emit("signing");

      const lockOrBurnFn = isOriginallySifchainNativeToken(
        params.assetAmount.asset,
      )
        ? this.context.services.ethbridge.lockToEthereum
        : this.context.services.ethbridge.burnToEthereum;

      const tx = await lockOrBurnFn({
        assetAmount: params.assetAmount,
        ethereumRecipient: params.toAddress,
        fromAddress: params.fromAddress,
        feeAmount,
      });

      const txStatus = await this.context.services.sif.signAndBroadcast(
        tx.value.msg,
      );

      if (txStatus.state !== "accepted") {
        this.context.services.bus.dispatch({
          type: "TransactionErrorEvent",
          payload: {
            txStatus,
            message: txStatus.memo || "There was an error while unpegging",
          },
        });
        emit(
          "tx_error",
          parseTxFailure({
            transactionHash: txStatus.hash,
            rawLog: txStatus.memo || "",
          }),
        );
      } else {
        emit("sent", txStatus);
      }

      console.log(
        "unpeg txStatus.state",
        txStatus.state,
        txStatus.memo,
        txStatus.code,
        tx.value.msg,
      );

      return new InterchainTransaction(
        this.fromChain.id,
        this.toChain.id,
        params.fromAddress,
        params.toAddress,
        txStatus.hash,
        params.assetAmount,
      );
    });
  }
}
