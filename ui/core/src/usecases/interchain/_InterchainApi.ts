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

export class InterchainTransaction {
  constructor(
    public fromChainId: string,
    public toChainId: string,
    public fromAddress: string,
    public toAddress: string,
    public hash: string,
    public assetAmount: IAssetAmount,
  ) {}

  toJSON() {
    return {
      fromChainId: this.fromChainId,
      toChainId: this.toChainId,
      fromAddress: this.fromAddress,
      toAddress: this.toAddress,
      hash: this.hash,
      symbol: this.assetAmount.symbol,
      amount: this.assetAmount.amount.toBigInt().toString(),
    };
  }
  static fromJSON(json: any) {
    return new InterchainTransaction(
      json.fromChainId as string,
      json.toChainId as string,
      json.fromAddress as string,
      json.toAddress as string,
      json.hash as string,
      AssetAmount(json.symbol as string, json.amount as string),
    );
  }
}

export type InterchainParams = {
  assetAmount: IAssetAmount;
  fromAddress: string;
  toAddress: string;
};

export class InterchainApi {
  fromChain: Chain;
  toChain: Chain;
  context: UsecaseContext;

  constructor(context: UsecaseContext, fromChain: Chain, toChain: Chain) {
    this.context = context;
    this.fromChain = fromChain;
    this.toChain = toChain;
  }

  async estimateFees(
    params: InterchainParams,
  ): Promise<IAssetAmount | undefined> {
    return undefined;
  }

  transfer(params: InterchainParams): ExecutableTransaction {
    throw "not implemented";
  }

  // async *subscribeToTransfer(
  //   transferTx: ChainTransferTransaction,
  // ): AsyncGenerator<TransactionStatus> {
  //   throw "not implemented";
  // }
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
