<script lang="ts">
import { defineComponent } from "vue";
import Pill from "../Pill/Pill.vue";

export default defineComponent({
  components: { Pill },
  async setup() {
    function isNumeric(s: any) {
      return s - 0 == s && ("" + s).trim().length > 0;
    }

    function formatNumberString(x: string) {
      const parts = x.split(".");
      return new Intl.NumberFormat("en-us", {
        maximumFractionDigits: parts.length < 2 ? 0 : parts[1].length,
      }).format(+x);
      // return x.replace(/\B(?=(?=\d*\.)(\d{3})+(?!\d))/g, ",");
    }

    const data = await fetch(
      "https://vtdbgplqd6.execute-api.us-west-2.amazonaws.com/default/tokenstats",
    );
    const json = await data.json();
    const pools = json.body ? json.body.pools : "";
    if (!pools || pools.length < 1) {
      return "";
    }

    let total = 0.0;
    pools.map((p: any) => {
      const depth = p.poolDepth;
      if (isNumeric(depth)) {
        total += parseFloat(depth) * 2;
      }
    });

    const tlv = "TVL: $" + formatNumberString(total.toFixed(1));

    return {
      tlv: tlv.substring(0, tlv.length - 2),
    };
  },
});
</script>

<template>
  <Suspense>
    <template #default>
      <Pill color="info">{{ tlv }}</Pill>
    </template>
    <template #fallback>Loading...</template>
  </Suspense>
</template>

<style lang="scss" scoped>
.rowan {
}
</style>
