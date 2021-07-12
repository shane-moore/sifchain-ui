import { shortenHash } from "@/componentsLegacy/shared/utils";
import AssetIcon from "@/componentsLegacy/utilities/AssetIcon";
import { defineComponent, PropType, computed } from "@vue/runtime-core";
import { WalletConnection } from "./constants";

export default defineComponent({
  name: "WalletConnection",
  props: {
    connection: {
      type: Object as PropType<WalletConnection>,
      required: true,
    },
  },
  setup(props) {
    const stateRef = computed(() => props.connection.useConnection());

    return () => (
      <div class="h-[37px] flex items-center px-[10px] w-full">
        <div class="flex-1">
          <img
            src={props.connection.iconSrc}
            class="w-[18px]"
            alt={props.connection.name}
          />
          <div class="ml-[13px]">
            <div class="text-xs font-bold">{props.connection.name}</div>
            <div class="text-[8px] opacity-50 capitalize">
              {props.connection.network}
            </div>
          </div>
        </div>
        <AssetIcon
          icon="interactive/link"
          class={[
            "w-[20px] max-w-[20px] h-[20px] transition-all",
            stateRef.value.isConnected && "text-connected-base",
          ]}
        />
        <div class="flex-1">
          <button class="text-[11px] font-bold flex justify-end items-center">
            {stateRef.value.isConnected
              ? shortenHash(stateRef.value.address)
              : "Connect"}
            <AssetIcon
              icon="interactive/chevron-down"
              class="ml-[10px] w-[20px] h-[20px] transition-all"
              style={{ transform: "rotate(90deg)" }}
            />
          </button>
        </div>
      </div>
    );
  },
});
