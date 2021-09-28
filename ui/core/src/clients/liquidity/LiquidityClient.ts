import {
  IAssetAmount,
  IAsset,
  AssetAmount,
  Amount,
  Pool,
  LiquidityProvider,
  Chain,
  CompositePool,
} from "../../entities";
import { NativeDexClient } from "../../services/utils/SifClient/NativeDexClient";
import { format } from "../../utils";
import { slipAdjustment, calculateWithdrawal } from "../../entities/formulae";
import TokenRegistryService from "../../services/TokenRegistryService";

type RemoveLiquidityParams = {
  pool: Pool;
  liquidityProvider: LiquidityProvider;
  asymmetry: number;
  basisPoints: number;
};

export type LiquidityContext = {
  sifApiUrl: string;
  sifRpcUrl: string;
  sifChainId: string;
};

export const DEFAULT_SWAP_SLIPPAGE_PERCENT = 1.5;

export class LiquidityClient {
  constructor(public context: LiquidityContext, public nativeChain: Chain) {}

  private tokenRegistry = TokenRegistryService(this.context);

  private nativeDexClientPromise?: Promise<NativeDexClient>;
  private async getNativeDexClient() {
    if (!this.nativeDexClientPromise) {
      this.nativeDexClientPromise = NativeDexClient.connectByChain(
        this.nativeChain,
      );
    }
    return this.nativeDexClientPromise;
  }

  /**
   * Fetch all available liquidity pools.
   */
  async fetchAllPools() {
    const client = await this.getNativeDexClient();
    const res = await client.query.clp.GetPools({});
    const registry = await this.tokenRegistry.load();

    return res.pools
      .map((pool) => {
        const externalSymbol = pool.externalAsset?.symbol;
        const entry = registry.find(
          (item) =>
            item.denom === externalSymbol || item.baseDenom === externalSymbol,
        );
        if (!entry) return null;

        const asset = this.nativeChain.findAssetWithLikeSymbol(entry.baseDenom);

        if (!asset) {
          console.log(entry, externalSymbol);
        }
        if (!asset) return null;
        return Pool(
          AssetAmount(this.nativeChain.nativeAsset, pool.nativeAssetBalance),
          AssetAmount(asset, pool.externalAssetBalance),
          Amount(pool.poolUnits),
        );
      })
      .filter((i) => i != null) as Pool[];
  }

  /*
   * Fetch the liquidity pool associated with the given external asset.
   */
  async fetchPool(params: { asset: IAsset }) {
    const client = await this.getNativeDexClient();

    const entry = await this.tokenRegistry.findAssetEntryOrThrow(params.asset);
    const poolRes = await client.query.clp.GetPool({
      symbol: entry.denom,
    });

    if (!poolRes?.pool) return;
    const pool = Pool(
      AssetAmount(
        this.nativeChain.nativeAsset,
        poolRes.pool.nativeAssetBalance || "0",
      ),
      AssetAmount(params.asset, poolRes.pool.externalAssetBalance || "0"),
      Amount(poolRes.pool.poolUnits),
    );

    return pool;
  }

  /*
   * Fetch liquidity provider data for the given address (if it exists)
   * matching the given external asset.
   */
  async fetchLiquidityProvider(params: { address: string; asset: IAsset }) {
    const client = await this.getNativeDexClient();
    const entry = await this.tokenRegistry.findAssetEntryOrThrow(params.asset);

    const res = await client.query.clp.GetLiquidityProvider({
      lpAddress: params.address,
      symbol: entry.denom,
    });
    return LiquidityProvider(
      params.asset,
      Amount(res.liquidityProvider?.liquidityProviderUnits || "0"),
      params.address,
      Amount(res.nativeAssetBalance),
      Amount(res.externalAssetBalance),
    );
  }

  async fetchAddLiquidityQuote(params: {
    address: string;
    externalAmount: IAssetAmount;
    nativeAmount: IAssetAmount;
    isCreatingPool: boolean;
  }) {
    const pool = await this.fetchPool({ asset: params.externalAmount });
    return this.createAddLiquidityQuote({
      ...params,
      ...(pool
        ? {
            isCreatingPool: false,
            pool,
            liquidityProvider: await this.fetchLiquidityProvider({
              address: params.address,
              asset: params.externalAmount,
            }),
          }
        : {
            isCreatingPool: true,
          }),
    });
  }

  createAddLiquidityQuote(
    params:
      | {
          externalAmount: IAssetAmount;
          nativeAmount: IAssetAmount;
          pool: Pool;
          liquidityProvider?: LiquidityProvider;
          isCreatingPool?: false;
        }
      | {
          externalAmount: IAssetAmount;
          nativeAmount: IAssetAmount;
          isCreatingPool: true;
          pool?: undefined;
        },
  ) {
    if (params.isCreatingPool) {
      // Creating liquidity first time.
      return {
        isCreatingPool: true,
        externalToNativeRatio: +format(
          params.externalAmount
            .toDerived()
            .divide(params.nativeAmount.toDerived()),
          { mantissa: 8 },
        ),
        slipFactor: 0,
        poolShare: 1,
      };
    }

    const derivedNative = params.pool.nativeAmount.toDerived();
    const derivedExternal = params.pool.externalAmount.toDerived();

    const externalToNativeProjectedRatio = derivedExternal
      .add(params.externalAmount.toDerived())
      .divide(derivedNative.add(params.nativeAmount.toDerived()));

    let [
      projectedTotalUnits,
      projectedUserUnits,
    ] = params.pool.calculatePoolUnits(
      params.nativeAmount,
      params.externalAmount,
    );

    // if this user already has pool units include those in the newUnits
    if (params.liquidityProvider) {
      projectedUserUnits = projectedUserUnits.add(
        params.liquidityProvider.units,
      );
    }

    const slipFactor = Amount("1").subtract(
      slipAdjustment(
        params.nativeAmount,
        params.externalAmount,
        params.pool.nativeAmount,
        params.pool.externalAmount,
      ),
    );

    return {
      isCreatingPool: false,
      externalToNativeRatio: +format(externalToNativeProjectedRatio, {
        mantissa: 8,
      }),
      slipFactor: +format(slipFactor, { mantissa: 4 }),
      poolShare: +format(projectedUserUnits.divide(projectedTotalUnits), {
        mantissa: 4,
      }),
    };
  }

  async prepareAddLiquidityTx(params: {
    address: string;
    addExternalAmount: IAssetAmount;
    addNativeAmount: IAssetAmount;
  }) {
    const externalAssetEntry = await this.tokenRegistry.findAssetEntryOrThrow(
      params.addExternalAmount.asset,
    );

    const client = await this.getNativeDexClient();
    const pool = await this.fetchPool({
      asset: params.addExternalAmount,
    });

    const txDraft = !!pool
      ? client.tx.clp.AddLiquidity(
          {
            externalAsset: {
              symbol: externalAssetEntry.denom,
            },
            externalAssetAmount: params.addExternalAmount.toBigInt().toString(),
            nativeAssetAmount: params.addExternalAmount.toBigInt().toString(),
            signer: params.address,
          },
          params.address,
        )
      : client.tx.clp.CreatePool(
          {
            externalAsset: {
              symbol: externalAssetEntry.denom,
            },
            externalAssetAmount: params.addExternalAmount.toBigInt().toString(),
            nativeAssetAmount: params.addNativeAmount.toBigInt().toString(),
            signer: params.address,
          },
          params.address,
        );

    return txDraft;
  }

  private assertValidRemoveLiquidityParams(params: RemoveLiquidityParams) {
    if (!(params.asymmetry <= -1 && params.asymmetry >= 1)) {
      throw new Error(
        `params.asymmetry expected to be between -1 and 1, got ${params.asymmetry}`,
      );
    }
    if (!(params.basisPoints > 0 && params.basisPoints <= 1)) {
      throw new Error(
        `params.basisPoints expected to be between >0 and <= 1, got ${params.basisPoints}`,
      );
    }
    return params;
  }
  createRemoveLiquidityQuote(params: RemoveLiquidityParams) {
    this.assertValidRemoveLiquidityParams(params);
    const data = calculateWithdrawal({
      poolUnits: params.pool.poolUnits,
      nativeAssetBalance: params.liquidityProvider.nativeAmount,
      externalAssetBalance: params.liquidityProvider.externalAmount,
      lpUnits: params.liquidityProvider.units,
      asymmetry: Amount(String(params.asymmetry * 10_000)),
      wBasisPoints: Amount(String(params.basisPoints * 10_000)),
    });

    return {
      withdrawNativeAssetAmount: data.withdrawNativeAssetAmount,
      withdrawExternalAssetAmount: data.withdrawExternalAssetAmount,
    };
  }

  async prepareRemoveLiquidityTx(params: RemoveLiquidityParams) {
    this.assertValidRemoveLiquidityParams(params);
    const client = await this.getNativeDexClient();

    const externalAssetEntry = await this.tokenRegistry.findAssetEntryOrThrow(
      params.pool.externalAmount,
    );

    return client.tx.clp.RemoveLiquidity(
      {
        asymmetry: String(params.asymmetry * 10_000),
        wBasisPoints: String(params.basisPoints * 10_000),
        externalAsset: {
          symbol: externalAssetEntry.denom,
        },
        signer: params.liquidityProvider.address,
      },
      params.liquidityProvider.address,
    );
  }

  findSwapPools(params: { fromAsset: IAsset; toAsset: IAsset; pools: Pool[] }) {
    const isNativeAsset = (asset: IAsset) => asset.symbol === "rowan";
    const fromPoolAsset = isNativeAsset(params.fromAsset)
      ? params.toAsset
      : params.fromAsset;
    const fromPool = params.pools.find(
      (p) => p.externalAmount.symbol === fromPoolAsset.symbol,
    )!;

    const toPool =
      isNativeAsset(params.fromAsset) || isNativeAsset(params.toAsset)
        ? fromPool
        : params.pools.find(
            (p) => p.externalAmount.symbol === params.toAsset.symbol,
          )!;
    return { fromPool, toPool };
  }

  async fetchSwapQuote(params: {
    fromAmount: IAssetAmount;
    toAsset: IAsset;
    slippagePercent?: number;
  }) {
    return this.createSwapQuote({
      ...params,
      ...this.findSwapPools({
        pools: await this.fetchAllPools(),
        fromAsset: params.fromAmount,
        toAsset: params.toAsset,
      }),
    });
  }

  /*
   * Return a quote about how a swap is estimated to go based on passed in pools.
   */
  createSwapQuote(params: {
    fromAmount: IAssetAmount;
    toAsset: IAsset;
    fromPool: Pool;
    toPool: Pool;
    slippagePercent?: number; // 1-100
  }) {
    const slippageAmount = Amount(
      String(params.slippagePercent || DEFAULT_SWAP_SLIPPAGE_PERCENT),
    );

    const compositePool =
      params.fromPool === params.toPool
        ? params.fromPool
        : CompositePool(params.fromPool, params.toPool);

    const toAmount = compositePool.calcSwapResult(params.fromAmount);

    const insufficientFromLiquidity = params.fromPool.externalAmount.lessThan(
      params.fromAmount,
    );
    const insufficientToLiquidity = params.toPool.externalAmount.lessThan(
      toAmount,
    );

    return {
      flags: {
        insufficientLiquidity:
          insufficientFromLiquidity || insufficientToLiquidity,
        insufficientFromLiquidity,
        insufficientToLiquidity,
      },
      toAmount: toAmount,
      fromToRatio: +format(toAmount.divide(params.fromAmount), toAmount.asset, {
        mantissa: 6,
      }),
      minimumReceived: AssetAmount(
        toAmount,
        Amount("1").subtract(
          slippageAmount.divide(Amount("100")).multiply(toAmount),
        ),
      ),
      providerFee: compositePool.calcProviderFee(params.fromAmount),
    };
  }

  async prepareSwapTx(params: {
    address: string;
    fromAmount: IAssetAmount;
    toAsset: IAsset;
    minimumReceived: IAssetAmount;
  }) {
    const client = await this.getNativeDexClient();
    return client.tx.clp.Swap(
      {
        sentAsset: {
          symbol: (
            await this.tokenRegistry.findAssetEntryOrThrow(params.fromAmount)
          ).denom,
        },
        receivedAsset: {
          symbol: (
            await this.tokenRegistry.findAssetEntryOrThrow(params.toAsset)
          ).denom,
        },
        signer: params.address,
        sentAmount: params.fromAmount.toBigInt().toString(),
        minReceivingAmount: params.minimumReceived.toBigInt().toString(),
      },
      params.address,
    );
  }
}
