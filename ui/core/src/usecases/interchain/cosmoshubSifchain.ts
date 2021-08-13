import { UsecaseContext } from "..";
import { IAssetAmount, TransactionStatus, Network } from "../../entities";
import {
  InterchainApi,
  ExecutableTransaction,
  InterchainTransaction,
  InterchainParams,
} from "./_InterchainApi";
import { SifchainChain, CosmoshubChain } from "../../services/ChainsService";
import { isBroadcastTxFailure } from "@cosmjs/stargate";
import { findAttribute, parseRawLog, Log } from "@cosmjs/stargate/build/logs";

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
  transfer(params: InterchainParams) {
    return new ExecutableTransaction(async (emit) => {
      emit("signing");
      try {
        const txSequence = await this.context.services.ibc.transferIBCTokens({
          sourceNetwork: params.assetAmount.asset.network,
          destinationNetwork: Network.SIFCHAIN,
          assetAmountToTransfer: params.assetAmount,
        });
        for (let tx of txSequence) {
          if (isBroadcastTxFailure(tx)) {
            this.context.services.bus.dispatch({
              type: "ErrorEvent",
              payload: {
                message: "IBC Transfer Failed",
              },
            });
            emit("tx_error", {
              state: tx.rawLog?.includes("out of gas")
                ? "out_of_gas"
                : "failed",
              memo: tx.rawLog || "",
              hash: tx.transactionHash,
            });
            return;
          } else {
            const logs = parseRawLog(tx.rawLog);

            // debugger;
            this.context.services.bus.dispatch({
              type: "PegTransactionPendingEvent",
              payload: {
                hash: tx.transactionHash,
              },
            });
            emit("sent", {
              state: "requested",
              hash: tx.transactionHash,
            });
            const sequence = findAttribute(
              logs,
              "send_packet",
              "packet_sequence",
            );
            const dstChannel = findAttribute(
              logs,
              "send_packet",
              "packet_dst_channel",
            );
            const dstPort = findAttribute(
              logs,
              "send_packet",
              "packet_dst_port",
            );
            const timeoutTimestampNanoseconds = findAttribute(
              logs,
              "send_packet",
              "packet_timeout_timestamp",
            );
            const timeoutTimestampMs =
              BigInt(timeoutTimestampNanoseconds.value as string) /
              BigInt(1000000);

            while (true) {
              await new Promise((r) => setTimeout(r, 1000));
              if (+timeoutTimestampMs.toString() < Date.now()) {
                this.context.services.bus.dispatch({
                  type: "PegTransactionErrorEvent",
                  payload: {
                    message: "Timed out waiting for packet receipt.",
                    txStatus: {
                      state: "failed",
                      hash: tx.transactionHash,
                    },
                  },
                });
                break;
              }
              try {
                const received = await this.context.services.ibc.checkIfPacketReceived(
                  Network.SIFCHAIN,
                  dstChannel.value,
                  dstPort.value,
                  sequence.value,
                );
                if (received) {
                  this.context.services.bus.dispatch({
                    type: "PegTransactionCompletedEvent",
                    payload: {
                      hash: tx.transactionHash,
                    },
                  });
                  return;
                }
              } catch (e) {}
            }
            return new InterchainTransaction(
              this.fromChain.id,
              this.toChain.id,
              params.fromAddress,
              params.toAddress,
              tx.transactionHash,
              params.assetAmount,
            );
          }
        }
      } catch (err) {
        // "signing_error"?
        console.error(err);
        emit("approve_error");
        return;
      }
    });
  }
}

class CosmosTransferTransaction extends InterchainTransaction {
  meta?: {
    logs?: Log[];
  };
}
