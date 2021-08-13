import {
  IAssetAmount,
  TransactionStatus,
  Chain,
  AssetAmount,
} from "../../entities";
import { UsecaseContext } from "..";
import { PegEvent } from "../peg/peg";
import { IterableEmitter } from "../../utils/IterableEmitter";
import { defer } from "../../utils/defer";

export type InterchainParams = {
  assetAmount: IAssetAmount;
  fromAddress: string;
  toAddress: string;
};

export type InterchainTransaction = InterchainParams & {
  fromChainId: string;
  toChainId: string;
  hash: string;
};

export interface InterchainApi {
  fromChain: Chain;
  toChain: Chain;
  context: UsecaseContext;

  estimateFees(
    params: InterchainParams,
  ): Promise<IAssetAmount | undefined | void>;

  transfer(params: InterchainParams): ExecutableTransaction;

  subscribeToTransfer(
    transferTx: InterchainTransaction,
  ): AsyncGenerator<TransactionStatus>;
}

export class ExecutableTransaction extends IterableEmitter<
  PegEvent["type"],
  TransactionStatus | undefined
> {
  private deferred = defer<InterchainTransaction | undefined>();

  constructor(
    private fn: (
      emit: ExecutableTransaction["emit"],
    ) => Promise<InterchainTransaction | undefined>,
  ) {
    super();
    this.execute();
  }

  awaitResult() {
    return this.deferred.promise;
  }

  private execute() {
    this.fn(this.emit)
      .then((tx) => {
        this.completeExecution();
        this.deferred.resolve(tx);
      })
      .catch((error) => {
        console.error(error);
        this.emit("tx_error", {
          state: "failed",
          hash: "",
          memo: error.message,
        });
        this.completeExecution();
        this.deferred.resolve();
      });
  }

  async *generator(): AsyncGenerator<PegEvent> {
    for await (const ev of this.subject.iterator) {
      yield {
        type: ev.type,
        tx: ev.payload,
      } as PegEvent;
    }
  }
}
