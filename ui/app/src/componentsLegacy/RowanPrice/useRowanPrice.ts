import { useAsyncData } from "@/hooks/useAsyncData";
import { useAsyncDataCached } from "@/hooks/useAsyncDataCached";
import { watchEffect } from "vue";

export const useRowanPrice = (params?: { shouldReload: boolean }) => {
  const price = useAsyncDataCached("rowanPrice", async () => {
    function isNumeric(s: any) {
      return s - 0 == s && ("" + s).trim().length > 0;
    }
    const data = await fetch(
      "https://data.sifchain.finance/beta/asset/tokenStats",
    );
    const json = await data.json();
    const rowanPriceInUSDT = json.body ? json.body.rowanUSD : "";

    if (isNumeric(rowanPriceInUSDT)) {
      return parseFloat(rowanPriceInUSDT).toPrecision(6);
    }
  });

  watchEffect(async (onInvalidate) => {
    if (!params?.shouldReload) return;
    let shouldBreak = false;
    while (!shouldBreak) {
      await price.reload.value();
      await new Promise((r) => setTimeout(r, 300 * 1000));
    }
    onInvalidate(() => {
      shouldBreak = true;
    });
  });

  return price;
};
