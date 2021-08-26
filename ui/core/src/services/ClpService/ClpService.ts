import {
  Amount,
  Asset,
  IAsset,
  IAssetAmount,
  LiquidityProvider,
  Network,
  Pool,
  getChainsService,
} from "../../entities";

import { SifUnSignedClient } from "../utils/SifClient";
import { toPool } from "../utils/SifClient/toPool";
import { RawPool } from "../utils/SifClient/x/clp";
import { once } from "../../utils/once";
import TokenRegistryService from "../../services/TokenRegistryService";
import { NativeDexClient } from "../../services/utils/SifClient/NativeDexClient";
import { PoolsRes } from "../../generated/proto/sifnode/clp/v1/querier";
import { KeplrWalletProvider } from "../../clients/wallets";
import { OfflineSigner } from "@cosmjs/launchpad";
import { SigningStargateClient } from "@cosmjs/stargate";
import {
  MsgAddLiquidity,
  MsgClientImpl as ClpMsgClientImpl,
} from "../../generated/proto/sifnode/clp/v1/tx";

export type ClpServiceContext = {
  nativeAsset: IAsset;
  sifApiUrl: string;
  sifRpcUrl: string;
  sifWsUrl: string;
  sifChainId: string;
  sifUnsignedClient?: SifUnSignedClient;
};

type IClpService = {
  getRawPools: () => Promise<PoolsRes>;
  getPools: () => Promise<Pool[]>;
  getPoolSymbolsByLiquidityProvider: (address: string) => Promise<string[]>;
  swap: (params: {
    fromAddress: string;
    sentAmount: IAssetAmount;
    receivedAsset: Asset;
    minimumReceived: IAssetAmount;
  }) => any;
  addLiquidity: (params: {
    fromAddress: string;
    nativeAssetAmount: IAssetAmount;
    externalAssetAmount: IAssetAmount;
  }) => any;
  createPool: (params: {
    fromAddress: string;
    nativeAssetAmount: IAssetAmount;
    externalAssetAmount: IAssetAmount;
  }) => any;
  getLiquidityProvider: (params: {
    asset: IAsset;
    lpAddress: string;
  }) => Promise<LiquidityProvider | null>;
  removeLiquidity: (params: {
    wBasisPoints: string;
    asymmetry: string;
    asset: IAsset;
    fromAddress: string;
  }) => any;
};

// TS not null type guard
function notNull<T>(val: T | null): val is T {
  return val !== null;
}

export default function createClpService({
  sifApiUrl,
  nativeAsset,
  sifChainId,
  sifWsUrl,
  sifRpcUrl,
  sifUnsignedClient = new SifUnSignedClient(sifApiUrl, sifWsUrl, sifRpcUrl),
}: ClpServiceContext): IClpService {
  const client = sifUnsignedClient;
  const dexClientPromise = NativeDexClient.connect(sifRpcUrl);
  const getSignedDexClient = once(async (address: string) => {
    const dexClient = await dexClientPromise;
    const keplr = KeplrWalletProvider.create({ sifRpcUrl });
    return dexClient.createSigningClient(
      address,
      await keplr.getSendingSigner(getChainsService().get(Network.SIFCHAIN)),
    );
  });

  const tokenRegistry = TokenRegistryService({ sifRpcUrl });

  const instance: IClpService = {
    async getRawPools() {
      const queryClient = await dexClientPromise;
      return queryClient.query.clp.GetPools({});
    },
    async getPools() {
      try {
        const rawPools = await client.getPools();
        return (
          rawPools
            .map(toPool(nativeAsset))
            // toPool can return a null pool for invalid pools lets filter them out
            .filter(notNull)
        );
      } catch (error) {
        return [];
      }
    },
    async getPoolSymbolsByLiquidityProvider(address: string) {
      // Unfortunately it is expensive for the backend to
      // filter pools so we need to annoyingly do this in two calls
      // First we get the metadata
      const queryClient = await dexClientPromise;
      const { assets } = await queryClient.query.clp.GetAssetList({
        lpAddress: address,
      });
      return assets?.map((a) => a.symbol) ?? [];
    },

    async addLiquidity(params: {
      fromAddress: string;
      nativeAssetAmount: IAssetAmount;
      externalAssetAmount: IAssetAmount;
    }) {
      const externalAssetEntry = await tokenRegistry.findAssetEntryOrThrow(
        params.externalAssetAmount.asset,
      );
      const signedClient = await getSignedDexClient(params.fromAddress);

      return signedClient.clp.AddLiquidity({
        signer: params.fromAddress,
        externalAsset: {
          symbol: externalAssetEntry.denom,
        },
        externalAssetAmount: params.externalAssetAmount.toBigInt().toString(),
        nativeAssetAmount: params.nativeAssetAmount.toBigInt().toString(),
      });
    },

    async createPool(params) {
      const externalAssetEntry = await tokenRegistry.findAssetEntryOrThrow(
        params.externalAssetAmount.asset,
      );
      const signedClient = await getSignedDexClient(params.fromAddress);

      return await signedClient.clp.CreatePool({
        signer: params.fromAddress,
        externalAsset: {
          symbol: externalAssetEntry.denom,
        },
        externalAssetAmount: params.externalAssetAmount.toBigInt().toString(),
        nativeAssetAmount: params.nativeAssetAmount.toBigInt().toString(),
      });
    },

    async swap(params) {
      const sentAssetEntry = await tokenRegistry.findAssetEntryOrThrow(
        params.sentAmount,
      );
      const receivedAssetEntry = await tokenRegistry.findAssetEntryOrThrow(
        params.receivedAsset,
      );
      const signedClient = await getSignedDexClient(params.fromAddress);

      return await signedClient.clp.Swap({
        signer: params.fromAddress,
        receivedAsset: {
          symbol: receivedAssetEntry.denom,
        },
        sentAmount: params.sentAmount.toBigInt().toString(),
        sentAsset: {
          symbol: sentAssetEntry.denom,
        },
        minReceivingAmount: params.minimumReceived.toBigInt().toString(),
      });
    },
    async getLiquidityProvider(params) {
      const externalAssetEntry = await tokenRegistry.findAssetEntryOrThrow(
        params.asset,
      );
      const dexClient = await dexClientPromise;
      const response = await dexClient.query.clp.GetLiquidityProvider({
        symbol: externalAssetEntry.denom,
        lpAddress: params.lpAddress,
      });

      const {
        liquidityProvider,
        nativeAssetBalance,
        externalAssetBalance,
      } = response;

      if (!liquidityProvider) return null;

      const { liquidityProviderUnits, liquidityProviderAddress } =
        liquidityProvider || {};

      return LiquidityProvider(
        params.asset,
        Amount(liquidityProviderUnits),
        liquidityProviderAddress,
        Amount(nativeAssetBalance),
        Amount(externalAssetBalance),
      );
    },

    async removeLiquidity(params) {
      const externalAssetEntry = await tokenRegistry.findAssetEntryOrThrow(
        params.asset,
      );
      const signedClient = await getSignedDexClient(params.fromAddress);

      return signedClient.clp.RemoveLiquidity({
        signer: params.fromAddress,
        asymmetry: params.asymmetry,
        externalAsset: {
          symbol: externalAssetEntry.denom,
        },
        wBasisPoints: params.wBasisPoints,
      });
    },
  };

  return instance;
}
