import { AssetAmount, Pool, toBaseUnits } from "@sifchain/sdk";
import { SwapQuote } from "@sifchain/sdk/src/clients/liquidity/SwapClient";
import { MsgSwap } from "@sifchain/sdk/src/generated/proto/sifnode/clp/v1/tx";
import { NativeDexTransaction } from "@sifchain/sdk/src/services/utils/SifClient/NativeDexTransaction";
import { atom, selector } from "recoil";
import { sdk } from "../../sdk";

const defaultFromAsset =
  sdk.chains.sifchain.lookupAsset("uatom") ||
  sdk.chains.sifchain.lookupAsset("uphoton") ||
  sdk.chains.sifchain.lookupAssetOrThrow("ceth");
export const fromAssetState = atom({
  key: "swap/fromAsset",
  default: defaultFromAsset,
});

const defaultToAsset = sdk.chains.sifchain.lookupAssetOrThrow("rowan");
export const toAssetState = atom({
  key: "swap/toAsset",
  default: defaultToAsset,
});

export const fromAssetAmountState = atom({
  key: "swap/fromAssetAmount",
  default: AssetAmount(defaultFromAsset, "0"),
});

export const toAssetAmountState = atom({
  key: "swap/toAssetAmount",
  default: AssetAmount(defaultToAsset, "0"),
});

export const poolsState = atom<Pool[]>({
  key: "swap/pools",
  default: [],
});

export const fromToPoolState = selector<{
  fromPool: Pool;
  toPool: Pool;
} | null>({
  key: "swap/fromToPool",
  get: ({ get }) => {
    return sdk.liquidity.swap.findSwapPools({
      fromAsset: get(fromAssetState),
      toAsset: get(toAssetState),
      pools: get(poolsState),
    });
  },
});

export const swapQuoteState = atom<SwapQuote | null>({
  key: "swap/quote",
  default: null,
});

export const swapTxDraftState = atom<NativeDexTransaction<MsgSwap> | null>({
  key: "swap/txDraft",
  default: null,
});
