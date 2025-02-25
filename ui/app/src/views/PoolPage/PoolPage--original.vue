<script lang="ts">
import { defineComponent, ref } from "vue";
import { computed, toRefs } from "@vue/reactivity";
import { useCore } from "@/hooks/useCore";
import { LiquidityProvider, Pool } from "@sifchain/sdk";
import Layout from "@/components/Layout/Layout";
import PoolList from "@/components/PoolList/PoolList.vue";
import PoolListItem from "@/components/PoolList/PoolListItem.vue";
import SifButton from "@/components/SifButton/SifButton.vue";
import ActionsPanel from "@/components/ActionsPanel/ActionsPanel.vue";

type AccountPool = { lp: LiquidityProvider; pool: Pool };

export default defineComponent({
  components: {
    Layout,
    SifButton,
    PoolList,
    PoolListItem,
    ActionsPanel,
  },

  setup() {
    const { store } = useCore();

    const selectedPool = ref<AccountPool | null>(null);

    // TODO: Sort pools?
    const accountPools = computed(() => {
      if (
        !store.accountpools ||
        !store.wallet.get(Network.SIFCHAIN).address ||
        !store.accountpools[store.wallet.get(Network.SIFCHAIN).address]
      )
        return [];

      return Object.entries(
        store.accountpools[store.wallet.get(Network.SIFCHAIN).address] ?? {},
      ).map(([poolName, accountPool]) => {
        return {
          ...accountPool,
          pool: store.pools[poolName],
        } as AccountPool;
      });
    });

    return {
      accountPools,
      selectedPool,
    };
  },
});
</script>

<template>
  <Layout>
    <div>
      <div class="heading mb-8">
        <h3>Your Liquidity</h3>
        <router-link to="/pool/add-liquidity"
          ><SifButton data-handle="add-liquidity-button" primary nocase
            >Add Liquidity</SifButton
          ></router-link
        >
      </div>

      <div class="info">
        <h3 class="mb-2">Liquidity provider rewards</h3>
        <p class="text--small mb-2">
          Liquidity providers earn a percentage fee on all trades proportional
          to their share of the pool. Fees are added to the pool, accrue in real
          time and can be claimed by withdrawing your liquidity. To learn more,
          refer to the documentation
          <a
            target="_blank"
            href="https://docs.sifchain.finance/roles/liquidity-providers"
            >here</a
          >.
        </p>
      </div>

      <PoolList class="mb-2">
        <PoolListItem
          v-for="(accountPool, index) in accountPools"
          :key="index"
          :accountPool="accountPool"
        />
      </PoolList>
    </div>
    <ActionsPanel connectType="connectToSif" />
  </Layout>
</template>

<style scoped lang="scss">
.heading {
  display: flex;
  align-items: center;

  h3 {
    @include title16;
  }
}

.info {
  text-align: left;
  padding: 8px;
  font-weight: 400;
}

.footer {
  font-weight: 400;
}
</style>
