<script lang="ts">
import { defineComponent, watch, onMounted } from "vue";
import { computed, ref, ComputedRef } from "@vue/reactivity";
import Layout from "@/componentsLegacy/Layout/Layout";
import SifButton from "@/componentsLegacy/SifButton/SifButton.vue";
import {
  getAssetLabel,
  getBlockExplorerUrl,
  getRewardEarningsUrl,
  useAssetItem,
} from "@/componentsLegacy/shared/utils";
import { useCore } from "@/hooks/useCore";
import { useRoute } from "vue-router";
import { format } from "@sifchain/sdk/src/utils/format";
import { Amount, Network } from "@sifchain/sdk";
import Tooltip from "@/componentsLegacy/Tooltip/Tooltip.vue";
import Icon from "@/componentsLegacy/Icon/Icon.vue";
import Loader from "@/componentsLegacy/Loader/Loader.vue";

const DECIMALS = 5;

async function getEarnedRewards(address: string, symbol: string) {
  const earnedRewardsUrl = getRewardEarningsUrl();
  const res = await fetch(`${earnedRewardsUrl}/${symbol}/netChange/${address}`);
  const parsedData = await res.json();
  // TD - This should return Amount, method needs work
  // Rudis recent work should refactor this call too into a testable service
  return {
    negative: Amount(parsedData.netChangeUSDT.toString()).lessThan("0"),
    netChange: format(Amount(Math.abs(parsedData.netChangeUSDT).toString()), {
      mantissa: 2,
    }),
  };
}

export default defineComponent({
  components: { Layout, SifButton, Tooltip, Icon, Loader },
  setup() {
    const { config, store } = useCore();
    const route = useRoute().params.externalAsset;

    const address = computed(() => store.wallet.get(Network.SIFCHAIN).address);
    let earnedRewards = ref<string | null>(null);
    let earnedRewardsNegative = ref<boolean>(false);

    const accountPool = computed(() => {
      if (
        !route ||
        !store.wallet.get(Network.SIFCHAIN).address ||
        !store.accountpools ||
        !store.accountpools[store.wallet.get(Network.SIFCHAIN).address] ||
        !store.accountpools[store.wallet.get(Network.SIFCHAIN).address][
          `${route}_rowan`
        ]
      ) {
        return null;
      }

      const poolTicker = `${route}_rowan`;
      const storeAccountPool =
        store.accountpools[store.wallet.get(Network.SIFCHAIN).address][
          poolTicker
        ];

      // enrich pool ticker with pool object
      return {
        ...storeAccountPool,
        pool: store.pools[poolTicker],
      };
    });

    const fromSymbol = computed(() =>
      accountPool?.value?.pool.amounts[1].asset
        ? getAssetLabel(accountPool?.value.pool.amounts[1].asset)
        : "",
    );

    // const USDTImage = useAssetItem('USDT').token.value?.imageUrl;
    const USDTImage =
      "https://assets.coingecko.com/coins/images/325/thumb/Tether-logo.png?1598003707";

    const fromAsset = useAssetItem(fromSymbol);
    const fromToken = fromAsset.token;
    const fromBackgroundStyle = fromAsset.background;
    const fromTokenImage = computed(() => {
      if (!fromToken.value) return "";
      const t = fromToken.value;
      return t.imageUrl;
    });

    const calculateRewards = async (address: string, fromSymbol: string) => {
      // TODO - needs a better pattern to handle this
      const earnedRewardsObject = await getEarnedRewards(
        address,
        fromSymbol?.toLowerCase(),
      );
      earnedRewardsNegative.value = earnedRewardsObject.negative;
      earnedRewards.value = earnedRewardsObject.netChange;
    };

    watch([address, fromSymbol], async () => {
      calculateRewards(address.value, fromSymbol.value);
    });

    onMounted(async () => {
      calculateRewards(address.value, fromSymbol.value);
    });

    const fromTotalValue = computed(() => {
      const aAmount = accountPool?.value?.pool.amounts[1];
      if (!aAmount) return "";
      return format(aAmount.amount, aAmount.asset, { mantissa: DECIMALS });
    });

    const toSymbol = computed(() =>
      accountPool?.value?.pool.amounts[0].asset
        ? getAssetLabel(accountPool.value.pool.amounts[0].asset)
        : "",
    );
    const toAsset = useAssetItem(toSymbol);
    const toToken = toAsset.token;
    const toBackgroundStyle = toAsset.background;
    const toTokenImage = computed(() => {
      if (!toToken.value) return "";
      const t = toToken.value;
      return t.imageUrl;
    });

    const toTotalValue = computed(() => {
      const aAmount = accountPool?.value?.pool.amounts[0];
      if (!aAmount) return "";
      return format(aAmount.amount, aAmount.asset, { mantissa: DECIMALS });
    });

    const poolUnitsAsFraction = computed(
      () => accountPool?.value?.lp.units || Amount("0"),
    );

    const myPoolShare = computed(() => {
      if (!accountPool?.value?.pool?.poolUnits) return null;

      const perc = format(
        poolUnitsAsFraction.value
          .divide(accountPool?.value?.pool?.poolUnits)
          .multiply("100"),
        { mantissa: 4 },
      );

      return `${perc}`;
    });
    const myPoolUnits = computed(() => {
      return format(poolUnitsAsFraction.value, { mantissa: DECIMALS });
    });
    return {
      accountPool,
      fromToken,
      fromSymbol,
      fromBackgroundStyle,
      fromTokenImage,
      fromTotalValue,
      toSymbol,
      toBackgroundStyle,
      toTokenImage,
      toTotalValue,
      myPoolUnits,
      myPoolShare,
      chainId: config.sifChainId,
      getBlockExplorerUrl,
      earnedRewards,
      earnedRewardsNegative,
      USDTImage,
    };
  },
});
</script>

<template>
  <Layout class="pool" backLink="/pool" title="Your Pair">
    <p class="description">
      Liquidity providers earn a percentage fee on all trades proportional to
      their share of the pool. Fees are added to the pool, accrue in real time
      and can be claimed by withdrawing your liquidity.

      <a
        target="_blank"
        href="https://docs.sifchain.finance/core-concepts/liquidity-pool"
        >Click here to learn more.</a
      >
    </p>
    <div class="sheet" :class="!accountPool ? 'disabled' : 'active'">
      <div class="">
        <div class="header" @click="$emit('poolselected')">
          <div class="image">
            <img
              v-if="fromTokenImage"
              width="22"
              height="22"
              :src="fromTokenImage"
              class="info-img"
            />
            <div class="placeholder" :style="fromBackgroundStyle" v-else></div>
            <img
              v-if="toTokenImage"
              width="22"
              height="22"
              :src="toTokenImage"
              class="info-img"
            />
            <div class="placeholder" :style="toBackgroundStyle" v-else></div>
          </div>
          <div class="symbol">
            <span>{{ fromSymbol }}</span>
            /
            <span>{{ toSymbol }}</span>
          </div>
        </div>
      </div>

      <div class="">
        <div class="details">
          <div
            class="row"
            :data-handle="'total-pooled-' + fromSymbol.toLowerCase()"
          >
            <span>Total Pooled {{ fromSymbol }}:</span>
            <span class="value">
              <span>{{ fromTotalValue }}</span>
              <img
                v-if="fromTokenImage"
                width="18"
                height="18"
                :src="fromTokenImage"
                class="info-img"
              />
              <div
                class="placeholder"
                :style="fromBackgroundStyle"
                v-else
              ></div>
            </span>
          </div>
          <div
            class="row"
            :data-handle="'total-pooled-' + toSymbol.toLowerCase()"
          >
            <span>Total Pooled {{ toSymbol.toUpperCase() }}:</span>
            <span class="value">
              <span>{{ toTotalValue }}</span>
              <img
                v-if="toTokenImage"
                width="18"
                height="18"
                :src="toTokenImage"
                class="info-img"
              />
              <div class="placeholder" :style="toBackgroundStyle" v-else></div>
            </span>
          </div>
          <div class="row" data-handle="total-pool-share">
            <span>Your Pool Share (%):</span>
            <span class="value pool-share-value">
              {{ myPoolShare }}
            </span>
          </div>
          <div class="row" data-handle="total-pool-share">
            <span
              >Your Net Gain/Loss:
              <Tooltip
                message="This is your total net gain/loss based on earnings from swap fees and any gains or losses associated with changes in the tokens' prices from the moment you ever added liquidity to this pool. This is in USDT."
              >
                <Icon icon="info-box-black" /> </Tooltip
            ></span>
            <div class="value net-loss-value">
              <span v-if="earnedRewards">
                {{ earnedRewardsNegative ? "-" : "" }}{{ earnedRewards }}
              </span>
              <span v-else class="value">
                <Loader typeSize />
              </span>
              <img
                width="18"
                height="18"
                :src="USDTImage"
                class="info-img net-loss-img"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="footer">
        <div class="mr-1">
          <router-link
            :to="`/pool/remove-liquidity/${fromSymbol.toLowerCase()}`"
            ><SifButton primaryOutline nocase block
              >Remove Liquidity</SifButton
            ></router-link
          >
        </div>
        <div class="ml-1 add-button">
          <router-link :to="`/pool/add-liquidity/${fromSymbol.toLowerCase()}`"
            ><SifButton primary nocase block
              >Add Liquidity</SifButton
            ></router-link
          >
        </div>
      </div>
      <div class="dotted-line"></div>
      <!-- <a target="_blank" :href="getBlockExplorerUrl(chainId)">View</a> -->
      <div class="blockexplorer-container">
        <SifButton
          :absolute="true"
          target="_blank"
          :to="getBlockExplorerUrl(chainId)"
          primaryOutline
          nocase
          block
          >View On Block Explorer</SifButton
        >
      </div>
    </div>
  </Layout>
</template>

<style lang="scss" scoped>
.sheet {
  background: $c_white;
  border-radius: $br_sm;
  border: $divider;
  padding: 20px;
  &.disabled {
    opacity: 0.3;
  }
  .section {
    padding: 8px 12px;
  }

  .section:not(:last-of-type) {
    border-bottom: $divider;
  }

  .header {
    display: flex;
    margin-bottom: 10px;
  }
  .symbol {
    font-size: $fs_md;
    color: $c_text;
  }

  .image {
    height: 22px;

    & > * {
      border-radius: 16px;

      &:nth-child(2) {
        position: relative;
        left: -6px;
      }
    }
  }

  .row {
    display: flex;
    justify-content: space-between;
    padding: 2px 0;
    color: $c_text;
    font-weight: 400;

    .value {
      display: flex;
      align-items: center;
      font-weight: 400;
      & > * {
        margin-right: 4px;
      }

      & > *:last-child {
        margin-right: 0;
      }
    }

    .image,
    .placeholder {
      margin-left: 4px;
    }
  }
  .details {
    margin-bottom: 10px;
  }
  .info {
    text-align: left;
    font-weight: 400;
  }

  .placeholder {
    display: inline-block;
    background: #aaa;
    box-sizing: border-box;
    border-radius: 16px;
    height: 22px;
    width: 22px;
    text-align: center;
  }

  .footer {
    display: flex;

    & > div {
      flex: 1;
    }
  }
}
.description {
  font-family: PT Serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 140%;
  margin-bottom: 15px;
  color: #343434;
  font-weight: 400;
  text-align: left;
}
.blockexplorer-container {
  padding: 8px 0;
  // TODO - This should be somewhat like the <Panel> class
  .blockexplorer-label {
    color: #333;
    font-style: italic;
    font-size: 16px;
  }
  .blockexplorer-link {
    a {
      color: #666;
      background: #f3f3f3;
      border-radius: 4px;
      padding: 4px 10px;
      font-weight: 400;
    }
    font-style: italic;
  }
}
.net-loss-img {
  margin-left: 4px;
}
.pool-share-value {
  margin-right: 22px;
}
.add-button {
  margin-left: 10px;
}
.dotted-line {
  border-top: 1px dotted #d4b553;
  margin: 10px 0;
}
</style>
