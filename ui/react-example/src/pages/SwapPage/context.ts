import { Pool } from '@sifchain/sdk'
import { createContext, useContext, useEffect, useState } from 'react'
import { sdk } from '../../sdk'

const swapContext = createContext(null)

export const useSwapContext = useContext(swapContext)

const defaultFromAsset =
  sdk.chains.sifchain.lookupAsset('uatom') ||
  sdk.chains.sifchain.lookupAsset('uphoton') ||
  sdk.chains.sifchain.lookupAssetOrThrow('ceth')

const defaultToAsset = sdk.chains.sifchain.lookupAssetOrThrow('rowan')

export const SwapPageProvider = () => {
  const [fromAsset, setFromAsset] = useState(defaultFromAsset)
  const [toAsset, setToAsset] = useState(defaultToAsset)
  const [fromAmount, setFromAmount] = useState('0')
  const [toAmount, setToAmount] = useState('0')
  const [pools, setPools] = useState<Pool[]>([])
  const [fromToPool, setFromToPool] = useState<{ fromPool: Pool; toPool: Pool } | null>(null)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    ;(async function run() {
      setPools(await sdk.liquidity.fetchAllPools())
      timeoutId = setTimeout(run, 10_000)
    })()
    return () => clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    setFromToPool(sdk.liquidity.swap.findSwapFromToPool({ fromAsset, toAsset, pools }))
  }, [pools])

  const value = {
    fromAsset,
    setFromAsset,
    toAsset,
    setToAsset,
    fromAmount,
    setFromAmount,
    toAmount,
    setToAmount,
    slippagePercent,
    setSlippagePercent,
    fromToPool,
    swapQuote,
  }

  return <swapContext.Provider value={value}></swapContext.Provider>
}
