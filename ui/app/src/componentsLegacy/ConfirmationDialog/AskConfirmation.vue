<script lang="tsx">
import { defineComponent, PropType, useCssModule } from "vue";
import SifButton from "@/componentsLegacy/SifButton/SifButton.vue";
import DetailsPanel from "@/componentsLegacy/DetailsPanel/DetailsPanel.vue";
import AskConfirmationInfo from "@/componentsLegacy/AskConfirmationInfo/Index.vue";
import { IAssetAmount } from "@sifchain/sdk";

export default defineComponent({
  components: { DetailsPanel, AskConfirmationInfo, SifButton },
  emits: ["confirmswap"],
  props: {
    requestClose: Function,
    fromAmount: { type: Object as PropType<IAssetAmount>, required: true },
    toAmount: { type: Object as PropType<IAssetAmount>, required: true },
    leastAmount: String,
    fromToken: String,
    toToken: String,
    swapRate: String,
    minimumReceived: String,
    providerFee: String,
    priceImpact: String,
    priceMessage: String,
    onConfirmswap: Function as PropType<() => void>,
  },
  setup(props, ctx) {
    const styles = useCssModule();

    return () => (
      <div data-handle="confirm-swap-modal" class={styles.confirmSwap}>
        <h3 class={[styles.title, "mb-10"]}>Confirm Swap</h3>
        <AskConfirmationInfo
          tokenAAmount={props.fromAmount}
          tokenBAmount={props.toAmount}
        />
        <div class={styles.estimate}>Output is estimated.</div>
        <DetailsPanel
          class={styles.details}
          priceMessage={props.priceMessage}
          toToken={props.toToken}
          minimumReceived={props.minimumReceived}
          providerFee={props.providerFee}
          priceImpact={props.priceImpact}
        />
        <SifButton
          block
          primary
          class={styles.confirmBtn}
          {...{ onClick: () => ctx.emit("confirmswap") }}
        >
          Confirm Swap
        </SifButton>
      </div>
    );
  },
});
</script>

<style lang="scss" module>
.confirmSwap {
  display: flex;
  flex-direction: column;
  padding: 30px 20px 20px 20px;
  min-height: 50vh;
}

.details {
  margin-bottom: 20px;
}

.confirmBtn {
  margin-top: auto !important;
}
.title {
  font-size: $fs_lg;
  color: $c_text;
  margin-bottom: 2rem;
  text-align: left;
}

.estimate {
  margin: 25px 0;
  font-weight: 400;
  text-align: left;

  strong {
    font-weight: 700;
  }
}
</style>
