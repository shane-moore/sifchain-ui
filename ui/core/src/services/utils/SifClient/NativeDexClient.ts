import * as TokenRegistryV1Query from "../../../generated/proto/sifnode/tokenregistry/v1/query";
import * as TokenRegistryV1Tx from "../../../generated/proto/sifnode/tokenregistry/v1/tx";
import * as CLPV1Query from "../../../generated/proto/sifnode/clp/v1/querier";
import * as CLPV1Tx from "../../../generated/proto/sifnode/clp/v1/tx";
import * as DispensationV1Query from "../../../generated/proto/sifnode/dispensation/v1/query";
import * as DispensationV1Tx from "../../../generated/proto/sifnode/dispensation/v1/tx";
import * as EthbridgeV1Query from "../../../generated/proto/sifnode/ethbridge/v1/query";
import * as EthbridgeV1Tx from "../../../generated/proto/sifnode/ethbridge/v1/tx";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { toHex } from "@cosmjs/encoding";
import {
  DirectSecp256k1HdWallet,
  Registry,
  GeneratedType,
  isTsProtoGeneratedType,
  OfflineSigner,
} from "@cosmjs/stargate/node_modules/@cosmjs/proto-signing";
import {
  BroadcastTxResponse,
  createProtobufRpcClient,
  defaultRegistryTypes,
  QueryClient,
  setupAuthExtension,
  setupBankExtension,
  setupIbcExtension,
  SigningStargateClient,
  StargateClient,
  TimeoutError,
} from "@cosmjs/stargate";
import { BroadcastTxCommitResponse } from "@cosmjs/tendermint-rpc/build/tendermint34";
import { SimulationResponse } from "@cosmjs/stargate/build/codec/cosmos/base/abci/v1beta1/abci";
import { sleep } from "../../../test/utils/sleep";
import { TxRaw } from "@cosmjs/stargate/build/codec/cosmos/tx/v1beta1/tx";
import { MsgClientImpl } from "@cosmjs/stargate/build/codec/cosmos/bank/v1beta1/tx";

export class NativeDexClient {
  protected constructor(
    readonly rpcUrl: string,
    protected t34: Tendermint34Client,
    readonly query: ReturnType<typeof NativeDexClient.createQueryClient>,
  ) {}
  static async connect(rpcUrl: string): Promise<NativeDexClient> {
    const t34 = await Tendermint34Client.connect(rpcUrl);
    const query = this.createQueryClient(t34);
    const instance = new this(rpcUrl, t34, query);
    return instance;
  }

  async createSigningClient(signerAddress: string, signer: OfflineSigner) {
    const createCustomTypesForModule = (
      nativeModule: Record<string, GeneratedType | any> & {
        protobufPackage: string;
      },
    ): Iterable<[string, GeneratedType]> => {
      let types: [string, GeneratedType][] = [];
      for (const [prop, type] of Object.entries(nativeModule)) {
        if (!isTsProtoGeneratedType(type)) {
          continue;
        }
        types.push([`/${nativeModule.protobufPackage}.${prop}`, type]);
      }
      return types;
    };
    const nativeRegistry = new Registry([
      ...defaultRegistryTypes,
      ...createCustomTypesForModule(EthbridgeV1Tx),
      ...createCustomTypesForModule(DispensationV1Tx),
      ...createCustomTypesForModule(CLPV1Tx),
      ...createCustomTypesForModule(TokenRegistryV1Tx),
    ]);
    const client = await SigningStargateClient.connectWithSigner(
      this.rpcUrl,
      signer,
      {
        registry: nativeRegistry,
      },
    );

    const rpcClient = {
      request: async (service: string, method: string, data: Uint8Array) => {
        const typeUrl = `/${service}${method}`;
        const lookup = nativeRegistry.lookupType(typeUrl);
        if (!lookup) throw new Error("Invalid message " + typeUrl);

        const decoded = lookup.decode(data);
        const broadcastRes = await client.signAndBroadcast(
          signerAddress,
          [
            {
              typeUrl,
              value: decoded,
            },
          ],
          client.fees.delegate,
        );

        // Return this to stick with type contract for Rpc.. this sucks.
        // Would ilke to return the tx to the application.
        return new Uint8Array();
      },
    };

    return {
      ethbridge: new EthbridgeV1Tx.MsgClientImpl(rpcClient),
      tokenregistry: new TokenRegistryV1Tx.MsgClientImpl(rpcClient),
      clp: new CLPV1Tx.MsgClientImpl(rpcClient),
      dispensation: new DispensationV1Tx.MsgClientImpl(rpcClient),
    };
  }

  private static createQueryClient(t34: Tendermint34Client) {
    return QueryClient.withExtensions(
      t34,
      setupIbcExtension,
      setupBankExtension,
      setupAuthExtension,
      (base: QueryClient) => {
        const rpcClient = createProtobufRpcClient(base);
        return {
          tokenregistry: new TokenRegistryV1Query.QueryClientImpl(rpcClient),
          clp: new CLPV1Query.QueryClientImpl(rpcClient),
          dispensation: new DispensationV1Query.QueryClientImpl(rpcClient),
          ethbridge: new EthbridgeV1Query.QueryClientImpl(rpcClient),
        };
      },
    );
  }
}
