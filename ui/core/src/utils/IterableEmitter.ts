import { EventEmitter } from "events";

interface TypedEmitterInterface<Type, Payload> {
  addListener(event: Type, listener: (payload: Payload) => void): this;
  on(event: Type, listener: (Type: Payload) => any): this;

  once(event: Type, listener: (Type: Payload) => any): this;
  prependListener(event: Type, listener: (Type: Payload) => any): this;
  prependOnceListener(event: Type, listener: (Type: Payload) => any): this;

  off(event: Type, listener: (Type: Payload) => any): this;
  removeAllListeners(event?: Type): this;
  removeListener(event: Type, listener: (Type: Payload) => any): this;

  emit(event: Type, payload?: Payload): boolean;
  eventNames(): (keyof Type | string | symbol)[];
  rawListeners(event: Type): Function[];
  listeners(event: Type): Function[];
  listenerCount(event: Type): number;

  getMaxListeners(): number;
  setMaxListeners(maxListeners: number): this;
}

type PromiseResolver<T> = {
  promise: Promise<T>;
  resolve: (t?: T) => void;
};
function createPromiseResolver<T>(): PromiseResolver<T> {
  let resolve: (value: T | PromiseLike<T>) => void;
  let promise: Promise<T> | null = new Promise((r) => (resolve = r));

  return {
    promise,
    // @ts-ignore
    resolve,
  };
}

type IterableEmitterEvent<T, P> = { type: T; payload: P };

export class IterableEmitter<EventTypes, EventPayload, FinalResult> {
  emitter: TypedEmitterInterface<EventTypes, EventPayload>;
  private isActivated = false;
  private isComplete = false;

  emit: TypedEmitterInterface<EventTypes, EventPayload>["emit"];
  on: TypedEmitterInterface<EventTypes, EventPayload>["on"];

  private resultPromiseResolver = createPromiseResolver<FinalResult>();

  private iteratorPromiseResolver?: PromiseResolver<undefined> | null;
  private eventQueue: IterableEmitterEvent<EventTypes, EventPayload>[] = [];

  private processEvent(event: EventTypes, payload: EventPayload) {
    this.eventQueue.push({ type: event, payload });
    this.iteratorPromiseResolver?.resolve();
  }

  constructor() {
    this.emitter = (new EventEmitter() as unknown) as TypedEmitterInterface<
      EventTypes,
      EventPayload
    >;
    this.on = this.emitter.on.bind(this.emitter);

    this.emit = (event: EventTypes, payload: EventPayload) => {
      if (this.isComplete) {
        throw new Error(
          `Cannot emit event ${event} after IterableEmitter is complete!`,
        );
      }

      this.processEvent(event, payload);
      return this.emitter.emit(event, payload);
    };
    this.iteratorPromiseResolver = createPromiseResolver();
  }

  hasActivated() {
    return this.isActivated;
  }

  awaitResult() {
    return this.resultPromiseResolver.promise;
  }

  execute() {
    if (this.hasActivated()) {
      throw new Error("Cannot start an IterableEmitter twice!");
    }
    this.isActivated = true;
  }

  async *_generator(): AsyncGenerator<
    IterableEmitterEvent<EventTypes, EventPayload>
  > {
    if (!this.hasActivated())
      throw new Error("Cannot call generator before activation");
    if (this.isComplete)
      throw new Error("Cannot call generator after  completion");
    while (!this.isComplete) {
      while (this.eventQueue.length) {
        const event = this.eventQueue.shift();
        if (event) yield event;
      }
      if (this.isComplete) {
        break;
      } else {
        this.iteratorPromiseResolver = createPromiseResolver();
        await this.iteratorPromiseResolver.promise;
      }
    }
  }

  completeExecution(finalResult?: FinalResult) {
    this.isComplete = true;
    this.iteratorPromiseResolver?.resolve();
    this.emitter.removeAllListeners();
    this.resultPromiseResolver.resolve(finalResult);
  }
}
