import { UsecaseContext } from "..";
import { IAssetAmount, Chain, TransactionStatus } from "../../entities";
import {
  InterchainApi,
  ExecutableTransaction,
  ChainTransferTransaction,
} from "./_InterchainApi";
import { parseTxFailure } from "../../services/SifService/parseTxFailure";
import { SubscribeToTx } from "../peg/utils/subscribeToTx";
import { SifchainChain, EthereumChain } from "../../services/ChainsService";
import { calculateUnpegFee } from "../peg/utils/calculateExportFee";

const ETH_CONFIRMATIONS = 50;

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

  async prepareTransfer(
    assetAmount: IAssetAmount,
    fromAddress: string,
    toAddress: string,
  ) {
    const feeAmount = calculateUnpegFee(assetAmount.asset);

    const execute = async (executableTx: ExecutableTransaction) => {
      executableTx.emit("signing");

      const isNativeAsset = this.context.services.chains
        .getAll()
        .some((chain: Chain) => {
          return (
            chain.findAssetWithLikeSymbol(assetAmount.asset.symbol)?.symbol ===
            chain.nativeAsset.symbol
          );
        });
      const lockOrBurnFn = isNativeAsset
        ? this.context.services.ethbridge.lockToEthereum
        : this.context.services.ethbridge.burnToEthereum;

      const tx = await lockOrBurnFn({
        assetAmount,
        ethereumRecipient: toAddress,
        fromAddress: fromAddress,
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
        executableTx.emit(
          "tx_error",
          parseTxFailure({
            transactionHash: txStatus.hash,
            rawLog: txStatus.memo || "",
          }),
        );
      } else {
        executableTx.emit("sent", txStatus);
      }

      console.log(
        "unpeg txStatus.state",
        txStatus.state,
        txStatus.memo,
        txStatus.code,
        tx.value.msg,
      );

      return new ChainTransferTransaction(
        this.fromChain.id,
        this.toChain.id,
        fromAddress,
        toAddress,
        txStatus.hash,
        assetAmount,
      );
    };
    return new ExecutableTransaction(execute, feeAmount);
  }

  async subscribeToTransfer(
    transferTx: ChainTransferTransaction,
  ): Promise<TransactionStatus> {
    throw "not implemented";
    // const status: TransactionStatus = {
    //   state: "accepted",
    //   hash: transferTx.hash,
    // };
    // if (
    //   transferTx.fromChainId !== this.fromChain.id ||
    //   transferTx.toChainId !== this.toChain.id
    // ) {
    //   throw new Error("Cannot subscribe!");
    // }

    // const inflightTx = new InflightTransaction(status);

    // const run = async () => {
    //   const pegTx = this.context.services.ethbridge.createPegTx(
    //     ETH_CONFIRMATIONS,
    //     transferTx.fromSymbol,
    //     transferTx.hash,
    //   );
    //   const unsubscribe = this.subscribeToTx(pegTx);

    //   try {
    //     await new Promise((resolve, reject) => {
    //       pegTx.onComplete(resolve);
    //       pegTx.onError(reject);
    //     });
    //   } catch (error) {
    //     inflightTx.update("failed", { memo: error.message });
    //     return;
    //   } finally {
    //     unsubscribe();
    //   }
    //   inflightTx.update("completed");
    // };

    // run();
    // return inflightTx;
  }
}
