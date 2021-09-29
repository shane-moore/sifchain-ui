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
import { BaseLiquidityClient } from "./BaseLiquidityClient";

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

export class SwapClient extends BaseLiquidityClient {
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

  /*
   * Return a quote about how a swap is estimated to go based on passed in pools.
   */
  createSwapQuote(
    params:
      | {
          fromAmount: IAssetAmount;
          toAmount?: undefined;
          fromPool: Pool;
          toPool: Pool;
          slippagePercent?: number; // 1-100
        }
      | {
          fromAmount?: undefined;
          toAmount: IAssetAmount;
          fromPool: Pool;
          toPool: Pool;
          slippagePercent?: number; // 1-100
        },
  ) {
    const slippageAmount = Amount(
      String(params.slippagePercent || DEFAULT_SWAP_SLIPPAGE_PERCENT),
    );

    const compositePool =
      params.fromPool === params.toPool
        ? params.fromPool
        : CompositePool(params.fromPool, params.toPool);

    const fromAmount =
      params.fromAmount ?? compositePool.calcReverseSwapResult(params.toAmount);
    const toAmount =
      params.toAmount ?? compositePool.calcSwapResult(params.fromAmount);

    const insufficientFromLiquidity = params.fromPool.externalAmount.lessThan(
      fromAmount,
    );
    const insufficientToLiquidity = params.toPool.externalAmount.lessThan(
      toAmount,
    );

    return {
      flags: {
        insufficientLiquidity: insufficientFromLiquidity
          ? "from"
          : insufficientToLiquidity
          ? "to"
          : false,
      },
      fromAmount,
      toAmount,
      minimumReceived: AssetAmount(
        toAmount,
        Amount("1").subtract(
          slippageAmount.divide(Amount("100")).multiply(toAmount),
        ),
      ),
      providerFee: compositePool.calcProviderFee(fromAmount),
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
