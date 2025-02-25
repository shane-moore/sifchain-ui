<script lang="ts">
import { defineComponent } from "vue";
import Layout from "@/componentsLegacy/Layout/Layout";
import { computed, ref } from "@vue/reactivity";
import { useCore } from "@/hooks/useCore";
import { SwapState, TransactionStatus, useSwapCalculator } from "@sifchain/sdk";
import { useWalletButton } from "@/componentsLegacy/WithWallet/useWalletButton";
import CurrencyPairPanel from "@/componentsLegacy/CurrencyPairPanel/Index.vue";
import Modal from "@/componentsLegacy/Modal/Modal.vue";
import SelectTokenDialogSif from "@/componentsLegacy/TokenSelector/SelectTokenDialogSif.vue";
import ActionsPanel from "@/componentsLegacy/ActionsPanel/ActionsPanel.vue";
import ModalView from "@/componentsLegacy/ModalView/ModalView.vue";
import ConfirmationDialog from "@/componentsLegacy/ConfirmationDialog/ConfirmationDialog.vue";
import { useCurrencyFieldState } from "@/hooks/useCurrencyFieldState";
import DetailsPanel from "@/componentsLegacy/DetailsPanel/DetailsPanel.vue";
import SlippagePanel from "@/componentsLegacy/SlippagePanel/Index.vue";
import { getMaxAmount } from "../utils/getMaxAmount";
import { format } from "@sifchain/sdk/src/utils/format";

// This is a little generic but these UI Flows
// might be different depending on our page functionality
// It would be better not to share them but instead derive state based on them in this file/domain.
// Currently some of these are used in down tree components but until we convert to JSX
// We will need to manage these manually
type SwapPageState = "idle" | "confirm" | "submit" | "fail" | "success";

export default defineComponent({
  components: {
    ActionsPanel,
    CurrencyPairPanel,
    Layout,
    Modal,
    DetailsPanel,
    SelectTokenDialogSif,
    ModalView,
    ConfirmationDialog,
    SlippagePanel,
  },

  setup() {
    const { usecases, poolFinder, store } = useCore();

    const {
      fromSymbol,
      fromAmount,
      toSymbol,
      toAmount,
    } = useCurrencyFieldState();

    const slippage = ref<string>("1.0");
    const pageState = ref<SwapPageState>("idle");
    const txStatus = ref<TransactionStatus | null>(null);

    const selectedField = ref<"from" | "to" | null>(null);
    const { connected } = useWalletButton();

    function requestTransactionModalClose() {
      pageState.value = "idle";
    }

    const balances = computed(() => {
      return store.wallet.get(Network.SIFCHAIN).balances;
    });

    const getAccountBalance = () => {
      return balances.value.find(
        (balance) => balance.asset.symbol === fromSymbol.value,
      );
    };

    const isFromMaxActive = computed(() => {
      const accountBalance = getAccountBalance();
      if (!accountBalance) return false;
      return (
        fromAmount.value === format(accountBalance.amount, accountBalance.asset)
      );
    });

    const {
      state,
      fromFieldAmount,
      toFieldAmount,
      priceMessage,
      priceImpact,
      providerFee,
      minimumReceived,
    } = useSwapCalculator({
      balances,
      fromAmount,
      toAmount,
      fromSymbol,
      selectedField,
      toSymbol,
      slippage,
      poolFinder,
    });

    function clearAmounts() {
      fromAmount.value = "0.0";
      toAmount.value = "0.0";
    }

    function handleNextStepClicked() {
      if (!fromFieldAmount.value)
        throw new Error("from field amount is not defined");
      if (!toFieldAmount.value)
        throw new Error("to field amount is not defined");

      pageState.value = "confirm";
    }

    async function handleAskConfirmClicked() {
      if (!fromFieldAmount.value)
        throw new Error("from field amount is not defined");
      if (!toFieldAmount.value)
        throw new Error("to field amount is not defined");
      if (!minimumReceived.value)
        throw new Error("minimumReceived amount is not defined");

      pageState.value = "submit";

      txStatus.value = await usecases.clp.swap(
        fromFieldAmount.value,
        toFieldAmount.value.asset,
        minimumReceived.value,
      );

      pageState.value =
        typeof txStatus.value.code === "number" ? "fail" : "success";

      clearAmounts();
    }

    function swapInputs() {
      selectedField.value === "to"
        ? (selectedField.value = "from")
        : (selectedField.value = "to");
      const fromAmountValue = fromAmount.value;
      const fromSymbolValue = fromSymbol.value;
      fromAmount.value = toAmount.value;
      fromSymbol.value = toSymbol.value;
      toAmount.value = fromAmountValue;
      toSymbol.value = fromSymbolValue;
    }

    return {
      connected,
      nextStepMessage: computed(() => {
        switch (state.value) {
          case SwapState.ZERO_AMOUNTS:
            return "Please enter an amount";
          case SwapState.INSUFFICIENT_FUNDS:
            return "Insufficient Funds";
          case SwapState.INSUFFICIENT_LIQUIDITY:
            return "Insufficient Liquidity";
          case SwapState.INVALID_AMOUNT:
            return "Invalid Amount";
          case SwapState.VALID_INPUT:
            return "Swap";
        }
      }),
      handleFromSymbolClicked(next: () => void) {
        selectedField.value = "from";
        next();
      },
      handleToSymbolClicked(next: () => void) {
        selectedField.value = "to";
        next();
      },
      handleSelectClosed(data: string) {
        if (typeof data !== "string") {
          return;
        }

        if (selectedField.value === "from") {
          fromSymbol.value = data;
        }

        if (selectedField.value === "to") {
          toSymbol.value = data;
        }
        selectedField.value = null;
      },
      handleFromFocused() {
        selectedField.value = "from";
      },
      handleToFocused() {
        selectedField.value = "to";
      },
      handleNextStepClicked,
      handleBlur() {
        if (isFromMaxActive) return;
        selectedField.value = null;
      },
      slippage,
      fromAmount,
      toAmount,
      fromSymbol,
      fromFieldAmount,
      toFieldAmount,
      minimumReceived: computed(() => {
        if (!minimumReceived.value) return "";
        const { amount, asset } = minimumReceived.value;
        return format(amount, asset, { mantissa: 18, trimMantissa: true });
      }),
      toSymbol,
      priceMessage,
      priceImpact,
      providerFee,
      handleFromMaxClicked() {
        selectedField.value = "from";
        const accountBalance = getAccountBalance();
        if (!accountBalance) return;
        const maxAmount = getMaxAmount(fromSymbol, accountBalance);
        fromAmount.value = format(maxAmount, accountBalance.asset, {
          mantissa: accountBalance.asset.decimals,
          trimMantissa: true,
        });
      },
      nextStepAllowed: computed(() => {
        return state.value === SwapState.VALID_INPUT;
      }),
      pageState,
      txStatus,
      transactionModalOpen: computed(() => pageState.value !== "idle"),
      requestTransactionModalClose,
      handleArrowClicked() {
        swapInputs();
      },
      handleConfirmClicked() {
        pageState.value = "submit";
      },
      handleAskConfirmClicked,

      isFromMaxActive,
      selectedField,
    };
  },
});
</script>

<template>
  <Layout>
    <div>
      <Modal @close="handleSelectClosed">
        <template v-slot:activator="{ requestOpen }">
          <CurrencyPairPanel
            v-model:fromAmount="fromAmount"
            v-model:fromSymbol="fromSymbol"
            :fromMax="!!fromSymbol"
            :isFromMaxActive="isFromMaxActive"
            :fromDisabled="disableInputFields"
            :toDisabled="disableInputFields"
            @frommaxclicked="handleFromMaxClicked"
            @fromfocus="handleFromFocused"
            @fromblur="handleBlur"
            @fromsymbolclicked="handleFromSymbolClicked(requestOpen)"
            :fromSymbolSelectable="connected"
            :canSwap="nextStepAllowed"
            @arrowclicked="handleArrowClicked"
            v-model:toAmount="toAmount"
            v-model:toSymbol="toSymbol"
            @tofocus="handleToFocused"
            @toblur="handleBlur"
            @tosymbolclicked="handleToSymbolClicked(requestOpen)"
            :toSymbolSelectable="connected"
            tokenALabel="From"
            tokenBLabel="To"
          />
        </template>
        <template v-slot:default="{ requestClose }">
          <SelectTokenDialogSif
            :selectedTokens="[fromSymbol, toSymbol].filter(Boolean)"
            @tokenselected="requestClose"
            :mode="selectedField"
          />
        </template>
      </Modal>
      <SlippagePanel v-if="nextStepAllowed" v-model:slippage="slippage" />
      <DetailsPanel
        :toToken="toSymbol || ''"
        :priceMessage="priceMessage || ''"
        :minimumReceived="minimumReceived || ''"
        :providerFee="providerFee || ''"
        :priceImpact="priceImpact || ''"
      />
      <ActionsPanel
        connectType="connectToSif"
        @nextstepclick="handleNextStepClicked"
        :nextStepAllowed="nextStepAllowed"
        :nextStepMessage="nextStepMessage"
      />
      <ModalView
        :requestClose="requestTransactionModalClose"
        :isOpen="transactionModalOpen"
        ><ConfirmationDialog
          @confirmswap="handleAskConfirmClicked"
          :state="pageState"
          :txStatus="txStatus"
          :requestClose="requestTransactionModalClose"
          :priceMessage="priceMessage"
          :fromAmount="fromFieldAmount"
          :toAmount="toFieldAmount"
          :minimumReceived="minimumReceived || ''"
          :providerFee="providerFee || ''"
          :priceImpact="priceImpact || ''"
      /></ModalView>
    </div>
  </Layout>
</template>
