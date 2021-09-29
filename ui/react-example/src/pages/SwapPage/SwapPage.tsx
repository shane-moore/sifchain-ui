import React from "react";
import {
  AssetAmount,
  formatAssetAmount,
  humanUnitsToAssetAmount,
  Pool,
  toBaseUnits,
} from "@sifchain/sdk";
import { sdk } from "../../sdk";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  fromAssetAmountState,
  fromAssetState,
  fromToPoolState,
  poolsState,
  swapQuoteState,
  toAssetAmountState,
  toAssetState,
} from "./state";

export default function SwapPage() {
  const [fromAsset, setFromAsset] = useRecoilState(fromAssetState);
  const [toAsset, setToAsset] = useRecoilState(toAssetState);
  const [fromAssetAmount, setFromAssetAmount] = useRecoilState(
    fromAssetAmountState,
  );
  const [toAssetAmount, setToAssetAmount] = useRecoilState(toAssetAmountState);
  const [, setPools] = useRecoilState(poolsState);
  const fromToPool = useRecoilValue(fromToPoolState);

  const [swapQuote, setSwapQuote] = useRecoilState(swapQuoteState);

  const fromAmountInputRef = React.useRef<HTMLInputElement | null>(null);
  const toAmountInputRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    (async function run() {
      setPools(await sdk.liquidity.fetchAllPools());
      timeoutId = setTimeout(run, 10_000);
    })();
    return () => clearTimeout(timeoutId);
  }, []);

  const onInputChange = (key: "fromAmount" | "toAmount", amount: string) => {
    const matchingAsset = key === "fromAmount" ? fromAsset : toAsset;

    if (fromToPool?.fromPool && fromToPool?.toPool) {
      const assetAmount = AssetAmount(
        matchingAsset,
        toBaseUnits(amount, matchingAsset),
      );
      const quote = sdk.liquidity.swap.createSwapQuote(
        key === "fromAmount"
          ? {
              ...fromToPool,
              fromAmount: assetAmount,
            }
          : {
              ...fromToPool,
              toAmount: assetAmount,
            },
      );
      setFromAssetAmount(quote.fromAmount);
      setToAssetAmount(quote.toAmount);

      const otherInput =
        key === "fromAmount"
          ? fromAmountInputRef.current
          : toAmountInputRef.current;
      const otherValue =
        key === "fromAmount" ? quote.toAmount : quote.fromAmount;
      if (otherInput) otherInput.value = formatAssetAmount(otherValue);
    } else {
      // If pools haven't loaded just set inputs.
      if (key === "fromAmount") {
        setFromAssetAmount(humanUnitsToAssetAmount(fromAsset, amount));
      } else if (key === "toAmount") {
        setToAssetAmount(humanUnitsToAssetAmount(toAsset, amount));
      }
    }
  };
  return (
    <div>
      <h3>Swap</h3>

      <label>
        From
        <select
          onChange={(ev) =>
            setFromAsset(
              sdk.chains.sifchain.lookupAssetOrThrow(ev.target.value),
            )
          }
          value={fromAsset.symbol}
        >
          {sdk.chains.sifchain.assets.map((asset) => (
            <option key={asset.symbol} value={asset.symbol}>
              {asset.symbol}
            </option>
          ))}
        </select>
        <input
          type="number"
          min="0"
          ref={fromAmountInputRef}
          defaultValue={
            fromAssetAmount.toBigInt().toString().startsWith("0") ? "" : "0"
          }
          onChange={(e) => onInputChange("fromAmount", e.target.value)}
        />
      </label>
      <hr />
      <label>
        To
        <select
          onChange={(ev) =>
            setToAsset(sdk.chains.sifchain.lookupAssetOrThrow(ev.target.value))
          }
          value={toAsset.symbol}
        >
          {sdk.chains.sifchain.assets.map((asset) => (
            <option key={asset.symbol} value={asset.symbol}>
              {asset.symbol}
            </option>
          ))}
        </select>
        <input
          type="number"
          min="0"
          ref={toAmountInputRef}
          defaultValue={
            toAssetAmount.toBigInt().toString().startsWith("0") ? "" : "0"
          }
          onChange={(e) => onInputChange("toAmount", e.target.value)}
        />
      </label>
    </div>
  );
}
