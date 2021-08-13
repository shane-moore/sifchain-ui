import { UsecaseContext } from "..";
import { IAssetAmount, TransactionStatus, Network } from "../../entities";
import {
  InterchainApi,
  ExecutableTransaction,
  ChainTransferTransaction,
} from "./_InterchainApi";
import { parseTxFailure } from "../../services/SifService/parseTxFailure";
import { SifchainChain, CosmoshubChain } from "../../services/ChainsService";
import { isBroadcastTxFailure } from "@cosmjs/stargate";
import { findAttribute, parseRawLog } from "@cosmjs/stargate/build/logs";

export default function createCosmoshubSifchainApi(
  context: UsecaseContext,
  cosmoshubChain: CosmoshubChain,
  sifchainChain: SifchainChain,
) {
  return new CosmoshubSifchainInterchainApi(
    context,
    cosmoshubChain,
    sifchainChain,
  );
}

class CosmoshubSifchainInterchainApi
  extends InterchainApi
  implements InterchainApi {
  async prepareTransfer(
    assetAmount: IAssetAmount,
    fromAddress: string,
    toAddress: string,
  ) {
    return new ExecutableTransaction(
      async (executableTx: ExecutableTransaction) => {
        executableTx.emit("signing");
        const txSequence = await this.context.services.ibc.transferIBCTokens({
          sourceNetwork: Network.SIFCHAIN,
          destinationNetwork: Network.COSMOSHUB,
          assetAmountToTransfer: assetAmount,
        });
        for (let tx of txSequence) {
          if (isBroadcastTxFailure(tx)) {
            this.context.services.bus.dispatch({
              type: "ErrorEvent",
              payload: {
                message: "IBC Transfer Failed",
              },
            });
            executableTx.emit(
              "tx_error",
              parseTxFailure({
                transactionHash: tx.transactionHash,
                rawLog: tx.rawLog || "",
              }),
            );
          } else {
            executableTx.emit("sent", {
              state: "completed",
              hash: tx.transactionHash,
              memo: "Transaction Completed",
            });
            return new ChainTransferTransaction(
              this.fromChain.id,
              this.toChain.id,
              fromAddress,
              toAddress,
              tx.transactionHash,
              assetAmount,
            );
          }
        }
      },
    );
  }

  async subscribeToTransfer(
    transferTx: ChainTransferTransaction,
  ): Promise<TransactionStatus> {
    throw "not implemented";
  }
}
