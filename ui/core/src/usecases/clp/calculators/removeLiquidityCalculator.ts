import {
  Amount,
  Asset,
  AssetAmount,
  LiquidityProvider,
  Pool,
} from "../../../entities";
import { calculateWithdrawal } from "../../../entities/formulae";
import { format } from "../../../utils/format";
import { PoolState } from "./addLiquidityCalculator";

export function useRemoveLiquidityCalculator(input: {
  externalAssetSymbol: string | null;
  nativeAssetSymbol: string | null;
  wBasisPoints: string | null;
  asymmetry: string | null;
  poolFinder: (a: Asset | string, b: Asset | string) => Pool | null;
  liquidityProvider: LiquidityProvider | null;
  sifAddress: string;
}) {
  // this function needs to be refactored so
  const externalAsset = (() => {
    if (!input.externalAssetSymbol) return null;
    return Asset(input.externalAssetSymbol);
  })();

  const nativeAsset = (() => {
    if (!input.nativeAssetSymbol) return null;
    return Asset(input.nativeAssetSymbol);
  })();

  const liquidityPool = (() => {
    if (!nativeAsset || !externalAsset) return null;

    // Find pool from poolFinder
    const pool = input.poolFinder(externalAsset, nativeAsset);
    return pool ?? null;
  })();

  const poolUnits = (() => {
    if (!liquidityPool) return null;
    return liquidityPool.poolUnits;
  })();

  const wBasisPoints = (() => {
    if (!input.wBasisPoints) return null;
    return Amount(input.wBasisPoints);
  })();

  const asymmetry = (() => {
    if (!input.asymmetry) return null;
    return Amount(input.asymmetry);
  })();

  const nativeAssetBalance = (() => {
    if (!liquidityPool) return null;
    return (
      liquidityPool.amounts.find((a) => a.symbol === input.nativeAssetSymbol) ??
      null
    );
  })();

  const externalAssetBalance = (() => {
    if (!liquidityPool) return null;
    return (
      liquidityPool.amounts.find(
        (a) => a.symbol === input.externalAssetSymbol.value,
      ) ?? null
    );
  })();

  const lpUnits = (() => {
    if (!input.liquidityProvider.value) return null;

    return input.liquidityProvider.value.units;
  })();

  const hasLiquidity = (() => {
    if (!lpUnits) return false;
    return lpUnits.greaterThan("0");
  })();

  const withdrawalAmounts = (() => {
    if (
      !poolUnits ||
      !nativeAssetBalance ||
      !externalAssetBalance ||
      !lpUnits ||
      !wBasisPoints ||
      !asymmetry ||
      !externalAsset ||
      !nativeAsset
    )
      return null;

    const {
      withdrawExternalAssetAmount,
      withdrawNativeAssetAmount,
    } = calculateWithdrawal({
      poolUnits,
      nativeAssetBalance,
      externalAssetBalance,
      lpUnits,
      wBasisPoints,
      asymmetry: asymmetry,
    });

    return {
      hasLiquidity,
      withdrawExternalAssetAmount: AssetAmount(
        externalAsset,
        withdrawExternalAssetAmount,
      ),
      withdrawNativeAssetAmount: AssetAmount(
        nativeAsset,
        withdrawNativeAssetAmount,
      ),
    };
  })();

  const state = (() => {
    if (!input.externalAssetSymbol.value || !input.nativeAssetSymbol.value)
      return PoolState.SELECT_TOKENS;

    if (!wBasisPoints?.greaterThan("0")) return PoolState.ZERO_AMOUNTS;

    if (!hasLiquidity) return PoolState.NO_LIQUIDITY;
    if (!lpUnits) {
      return PoolState.INSUFFICIENT_FUNDS;
    }

    return PoolState.VALID_INPUT;
  })();

  const withdrawExternalAssetAmountMessage = (() => {
    if (!withdrawalAmounts) return "";
    const assetAmount = withdrawalAmounts?.withdrawExternalAssetAmount;
    return format(assetAmount.amount, assetAmount.asset, {
      mantissa: 6,
    });
  })();

  const withdrawNativeAssetAmountMessage = (() => {
    if (!withdrawalAmounts) return "";
    const assetAmount = withdrawalAmounts?.withdrawNativeAssetAmount;
    return format(assetAmount.amount, assetAmount.asset, {
      mantissa: 6,
    });
  })();

  return {
    withdrawExternalAssetAmount: withdrawExternalAssetAmountMessage,
    withdrawNativeAssetAmount: withdrawNativeAssetAmountMessage,
    state,
  };
}
