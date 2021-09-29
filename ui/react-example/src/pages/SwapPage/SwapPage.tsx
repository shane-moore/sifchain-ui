import React, { useState } from 'react'
import { AssetAmount, formatAssetAmount, humanUnitsToAssetAmount, Pool, toBaseUnits } from '@sifchain/sdk'
import { sdk } from '../../sdk'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  fromAmountState,
  fromAssetState,
  fromToPoolState,
  poolsState,
  swapQuoteState,
  toAmountState,
  toAssetState,
} from './state'

export default function SwapPage() {
  const [fromAsset, setFromAsset] = useRecoilState(fromAssetState)
  const [toAsset, setToAsset] = useRecoilState(toAssetState)
  const [fromAmount, setFromAmount] = useRecoilState(fromAmountState)
  const [toAmount, setToAmount] = useRecoilState(toAmountState)
  const [, setPools] = useRecoilState(poolsState)
  const fromToPool = useRecoilValue(fromToPoolState)

  const [slippagePercent, setSlippagePercent] = useState(1)

  const [swapQuote, setSwapQuote] = useRecoilState(swapQuoteState)

  const fromAmountInputRef = React.useRef<HTMLInputElement | null>(null)
  const toAmountInputRef = React.useRef<HTMLInputElement | null>(null)

  const onInputChange = (key: 'fromAmount' | 'toAmount', amount: string) => {
    amount = String(parseFloat(amount) || '0')

    const matchingAsset = key === 'fromAmount' ? fromAsset : toAsset

    if (fromToPool?.fromPool && fromToPool?.toPool) {
      const assetAmount = AssetAmount(matchingAsset, toBaseUnits(amount, matchingAsset))
      const quote = sdk.liquidity.swap.createSwapQuote(
        key === 'fromAmount'
          ? {
              ...fromToPool,
              slippagePercent,
              fromAmount: assetAmount,
            }
          : {
              ...fromToPool,
              slippagePercent,
              toAmount: assetAmount,
            },
      )

      setFromAmount(formatAssetAmount(quote.fromAmount))
      setToAmount(formatAssetAmount(quote.toAmount))
      setSwapQuote(quote)

      const otherInput = key === 'fromAmount' ? toAmountInputRef.current : fromAmountInputRef.current
      const otherValue = formatAssetAmount(key === 'fromAmount' ? quote.toAmount : quote.fromAmount)
      if (otherInput) otherInput.value = +otherValue !== 0 ? otherValue : ''
    }
  }

  // re-calculate amounts when assets or pools change
  React.useEffect(() => {
    // Don't recalculate from amount when pool changes if from is already focused.
    const shouldChangeKey = document.activeElement === fromAmountInputRef.current ? 'toAmount' : 'fromAmount'
    if (fromToPool) onInputChange(shouldChangeKey, shouldChangeKey === 'fromAmount' ? fromAmount : toAmount)
  }, [fromToPool, slippagePercent])

  return (
    <div>
      <h3>Swap</h3>
      <button
        onClick={() => {
          setFromAsset(toAsset)
          setToAsset(fromAsset)
          if (fromAmountInputRef.current && toAmountInputRef.current) {
            let fromVal = fromAmountInputRef.current.value
            fromAmountInputRef.current.value = toAmountInputRef.current.value
            toAmountInputRef.current.value = fromVal
          }
        }}
      >
        Switch
      </button>
      <hr />
      <label>
        From
        <select
          onChange={ev => setFromAsset(sdk.chains.sifchain.lookupAssetOrThrow(ev.target.value))}
          value={fromAsset.symbol}
        >
          {sdk.chains.sifchain.assets.map(asset => (
            <option key={asset.symbol} value={asset.symbol}>
              {asset.symbol}
            </option>
          ))}
        </select>
        <input
          type="string"
          ref={fromAmountInputRef}
          placeholder="0"
          onChange={e => onInputChange('fromAmount', e.target.value)}
        />
      </label>
      <hr />
      <label>
        To
        <select
          onChange={ev => setToAsset(sdk.chains.sifchain.lookupAssetOrThrow(ev.target.value))}
          value={toAsset.symbol}
        >
          {sdk.chains.sifchain.assets.map(asset => (
            <option key={asset.symbol} value={asset.symbol}>
              {asset.symbol}
            </option>
          ))}
        </select>
        <input
          type="string"
          ref={toAmountInputRef}
          placeholder="0"
          onChange={e => onInputChange('toAmount', e.target.value)}
        />
      </label>
      <hr />
      Slippage:
      <label>
        <input
          type="radio"
          name="slippage"
          className="ml-1"
          checked={slippagePercent === 0.5}
          onClick={() => setSlippagePercent(0.5)}
        />
        0.5%
      </label>
      <label>
        <input
          type="radio"
          name="slippage"
          className="ml-1"
          checked={slippagePercent === 1}
          onClick={() => setSlippagePercent(1)}
        />
        1%
      </label>
      <label>
        <input type="radio" name="slippage" checked={slippagePercent === 1.5} onClick={() => setSlippagePercent(1.5)} />
        1.5%
      </label>
      <hr />
      {!!swapQuote && (
        <ul>
          <li>
            Price: {swapQuote.fromToRatio} {fromAsset.displaySymbol.toUpperCase()} per{' '}
            {toAsset.displaySymbol.toUpperCase()}
          </li>
          <li>
            Minimum received: {formatAssetAmount(swapQuote.minimumReceived)}{' '}
            {swapQuote.minimumReceived.displaySymbol.toUpperCase()}
          </li>
          <li>Price impact: {swapQuote.priceImpact}%</li>
          <li>
            Liquidity Provider Fee: {formatAssetAmount(swapQuote.providerFee)}{' '}
            {swapQuote.providerFee.displaySymbol.toUpperCase()}
          </li>
        </ul>
      )}
    </div>
  )
}
