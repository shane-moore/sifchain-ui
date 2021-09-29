import { AssetAmount, humanUnitsToAssetAmount, Pool, toBaseUnits } from '@sifchain/sdk'
import { SwapQuote } from '@sifchain/sdk/src/clients/liquidity/SwapClient'
import { MsgSwap } from '@sifchain/sdk/src/generated/proto/sifnode/clp/v1/tx'
import { NativeDexTransaction } from '@sifchain/sdk/src/services/utils/SifClient/NativeDexTransaction'
import { atom, selector } from 'recoil'
import { sdk } from '../../sdk'

const defaultFromAsset =
  sdk.chains.sifchain.lookupAsset('uatom') ||
  sdk.chains.sifchain.lookupAsset('uphoton') ||
  sdk.chains.sifchain.lookupAssetOrThrow('ceth')
export const fromAssetState = atom({
  key: 'swap/fromAsset',
  default: defaultFromAsset,
})

const defaultToAsset = sdk.chains.sifchain.lookupAssetOrThrow('rowan')
export const toAssetState = atom({
  key: 'swap/toAsset',
  default: defaultToAsset,
})

export const fromAmountState = atom({
  key: 'swap/fromAmount',
  default: '0',
})

export const toAmountState = atom({
  key: 'swap/toAmount',
  default: '0',
})

export const fromAssetAmountState = selector({
  key: 'swap/fromAssetAmount',
  get: ({ get }) => humanUnitsToAssetAmount(get(fromAssetState), get(fromAmountState)),
})

export const toAssetAmountState = selector({
  key: 'swap/fromAssetAmount',
  get: ({ get }) => humanUnitsToAssetAmount(get(toAssetState), get(toAmountState)),
})

export const poolsState = atom<Pool[]>({
  key: 'swap/pools',
  default: [],
})

export const fromToPoolState = selector<{
  fromPool: Pool
  toPool: Pool
} | null>({
  key: 'swap/fromToPool',
  get: ({ get }) => {
    return sdk.liquidity.swap.findSwapPools({
      fromAsset: get(fromAssetState),
      toAsset: get(toAssetState),
      pools: get(poolsState),
    })
  },
})

export const swapQuoteState = atom<ReturnType<typeof sdk.liquidity.swap.createSwapQuote> | null>({
  key: 'swap/quote',
  default: null,
})

export const swapTxDraftState = atom<NativeDexTransaction<MsgSwap> | null>({
  key: 'swap/txDraft',
  default: null,
})
