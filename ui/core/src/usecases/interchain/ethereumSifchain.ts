import { UsecaseContext } from "..";
import { IAssetAmount, Chain, TransactionStatus } from "../../entities";
import {
  InterchainApi,
  ExecutableTransaction,
  InterchainTransaction,
  InterchainParams,
} from "./_InterchainApi";
import { SubscribeToTx } from "../peg/utils/subscribeToTx";
import { SifchainChain, EthereumChain } from "../../services/ChainsService";
import { isSupportedEVMChain } from "../utils";
import { isOriginallySifchainNativeToken } from "../peg/utils/isOriginallySifchainNativeToken";
import { createIteratorSubject } from "../../utils/iteratorSubject";

const ETH_CONFIRMATIONS = 50;

export default function createEthereumSifchainApi(
  context: UsecaseContext,
  ethereumChain: EthereumChain,
  sifchainChain: SifchainChain,
) {
  return new EthereumSifchainInterchainApi(
    context,
    ethereumChain,
    sifchainChain,
  );
}

class EthereumSifchainInterchainApi
  extends InterchainApi
  implements InterchainApi {
  subscribeToTx: ReturnType<typeof SubscribeToTx>;

  constructor(
    public context: UsecaseContext,
    public fromChain: Chain,
    public toChain: Chain,
  ) {
    super(context, fromChain, toChain);
    this.subscribeToTx = SubscribeToTx(context);
  }

  transfer(params: InterchainParams) {
    return new ExecutableTransaction(async (emit) => {
      if (!isSupportedEVMChain(this.context.store.wallet.eth.chainId)) {
        this.context.services.bus.dispatch({
          type: "ErrorEvent",
          payload: {
            message: "EVM Network not supported!",
          },
        });
        emit("tx_error", {
          state: "failed",
          hash: "",
          memo: "EVM network not supported",
        });
        return;
      }

      if (params.assetAmount.asset.symbol !== "eth") {
        emit("approve_started");
        try {
          await this.context.services.ethbridge.approveBridgeBankSpend(
            params.fromAddress,
            params.assetAmount,
          );
        } catch (error) {
          emit("approve_error");
          return;
        }
        emit("approved");
      }

      emit("signing");

      const lockOrBurnFn = isOriginallySifchainNativeToken(
        params.assetAmount.asset,
      )
        ? this.context.services.ethbridge.burnToSifchain
        : this.context.services.ethbridge.lockToSifchain;

      const pegTx = lockOrBurnFn(
        params.toAddress,
        params.assetAmount,
        ETH_CONFIRMATIONS,
      );
      this.subscribeToTx(pegTx);

      try {
        const hash = await new Promise<string>((resolve, reject) => {
          pegTx.onError((error) => {
            reject(error.payload);
          });
          pegTx.onTxHash((hash) => {
            resolve(hash.txHash);
          });
        });

        emit("sent", { state: "completed", hash });

        return new InterchainTransaction(
          this.fromChain.id,
          this.toChain.id,
          params.fromAddress,
          params.toAddress,
          hash,
          params.assetAmount,
        );
      } catch (transactionStatus) {
        emit("tx_error", transactionStatus);
      }
    });
  }

  async *subscribeToTransfer(transferTx: InterchainTransaction) {
    const pegTx = this.context.services.ethbridge.createPegTx(
      ETH_CONFIRMATIONS,
      transferTx.assetAmount.asset.symbol,
      transferTx.hash,
    );
    const { iterator, feed, end } = createIteratorSubject<TransactionStatus>();
    this.subscribeToTx(pegTx, (tx: TransactionStatus) => {
      feed(tx);
      if (tx.state === "completed" || tx.state === "failed") end();
    });
    return iterator;
  }
}
