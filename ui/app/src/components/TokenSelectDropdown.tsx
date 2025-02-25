import { formatAssetAmount } from "@/componentsLegacy/shared/utils";
import AssetIcon from "@/components/AssetIcon";
import { useCore } from "@/hooks/useCore";
import {
  computed,
  defineComponent,
  effect,
  onMounted,
  onUnmounted,
  PropType,
  Ref,
  ref,
  Teleport,
  TransitionGroup,
  watch,
  watchEffect,
} from "vue";
import { IAsset, Network } from "../../../core/src";
import { TokenIcon } from "./TokenIcon";
import { sortAndFilterTokens, TokenSortBy } from "@/utils/sortAndFilterTokens";
import { TokenListItem, useTokenList } from "@/hooks/useToken";

export const TokenSelectDropdown = defineComponent({
  props: {
    active: {
      type: Object as PropType<Ref<boolean> | boolean>,
      required: true,
    },
    onCloseIntent: {
      type: Function,
      required: true,
    },
    onSelectAsset: {
      type: Function as PropType<(asset: IAsset) => any>,
      required: true,
    },
    network: {
      type: Object as PropType<Ref<Network>>,
      required: false,
    },
    hideBalances: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    excludeSymbols: {
      type: Array as PropType<Array<string>>,
      required: false,
      default: () => [],
    },
    sortBy: {
      type: [String, Function] as PropType<
        TokenSortBy | ((a: TokenListItem, b: TokenListItem) => number)
      >,
      required: false,
      default: () => "symbol",
    },
  },
  setup(props) {
    const core = useCore();
    const selfRoot = ref<HTMLDivElement | null>(null);
    const dropdownRoot = ref<HTMLDivElement | null>(null);
    const iconScrollContainer = ref<HTMLDivElement | null>(null);

    const activeRef = computed(() => {
      return typeof props.active === "boolean"
        ? props.active
        : props.active.value;
    });

    const searchQuery = ref("");
    const networksRef = computed(() => {
      const net = props.network?.value;
      return [net || Network.SIFCHAIN];
    });

    const tokensRef = useTokenList({
      networks: networksRef,
    });
    const sortedAndFilteredTokens = computed(() => {
      const excludeSymbolsSet = new Set(
        props.excludeSymbols.map((s) => s.toLowerCase()),
      );
      return sortAndFilterTokens({
        tokens: tokensRef.value,
        searchQuery: searchQuery.value,
        sortBy: props.sortBy,
        network: networksRef.value[0],
      }).filter((token) => {
        return !excludeSymbolsSet.has(token.asset.symbol.toLowerCase());
      });
    });

    const boundingClientRect = ref<DOMRect | undefined>();
    const resizeListener = ref(() => {
      boundingClientRect.value = selfRoot.value?.getBoundingClientRect();
    });
    const externalClickListener = ref((e: Event) => {
      // Timeout: if the click to close happens same time as a click to open,
      // make this happen after so it really closes it.
      // This is for example, for a click on the toggle open button.
      setTimeout(() => {
        if (
          !dropdownRoot.value?.contains(e.target as HTMLElement) &&
          !selfRoot.value?.contains(e.target as HTMLElement) &&
          !(e as any).handled
        ) {
          props.onCloseIntent?.();
        }
      }, 1);
    });

    watch(
      activeRef,
      () => {
        if (activeRef.value) {
          // If a click is still in progress, we don't want to attach this listener yet.
          window.requestAnimationFrame(() => {
            document.body.addEventListener(
              "click",
              externalClickListener.value,
              true,
            );
          });
        } else {
          document.body.removeEventListener(
            "click",
            externalClickListener.value,
            true,
          );
        }
      },
      { immediate: true, deep: true },
    );

    watch([activeRef.value], () => {
      let frameId: number;
      if (activeRef.value) {
        frameId = window.requestAnimationFrame(() => {
          dropdownRoot.value?.querySelector("input")?.focus();
        });
      }
      const rect = selfRoot.value?.getBoundingClientRect();
      if (
        rect?.x !== boundingClientRect.value?.x ||
        rect?.y !== boundingClientRect.value?.y
      ) {
        boundingClientRect.value = rect;
      }
      return () => window.cancelAnimationFrame(frameId);
    });
    onMounted(() => {
      resizeListener.value();
      window.addEventListener("resize", resizeListener.value);
    });
    onUnmounted(() => {
      window.removeEventListener("resize", resizeListener.value);
    });

    return () => (
      <div ref={selfRoot} class="w-full h-0">
        {
          <Teleport to="#portal-target">
            {activeRef.value && (
              <div
                ref={dropdownRoot}
                style={{
                  boxShadow: "0px 20px 20px 0px #00000080",
                  position: "absolute",
                  top: (boundingClientRect.value?.y ?? 0) + "px",
                  left:
                    (boundingClientRect.value?.x ?? 0) +
                    // (boundingClientRect.value?.width ?? 0) +
                    "px",
                }}
                class=" overflow-hidden bg-gray-input border-gray-input_outline border-solid border-[1px] w-[440px] mt-[7px] z-50 rounded-[4px]"
              >
                <div class="w-full h-full py-[20px] px-[15px]">
                  <div class="w-full bg-gray-base border-gray-input_outline border-[1px] border-solid h-8 relative flex items-center rounded-lg overflow-hidden">
                    <AssetIcon
                      size={20}
                      icon="interactive/search"
                      class={[`ml-3 w-4 h-4`, false ? "text-[#6E6E6E]" : ""]}
                    />
                    <input
                      id="token-search"
                      autofocus
                      type="search"
                      placeholder="Search Token..."
                      onKeydown={(e: Event) => {
                        if (
                          (e as KeyboardEvent).key === "Enter" &&
                          sortedAndFilteredTokens.value.length > 0
                        ) {
                          props.onSelectAsset(
                            sortedAndFilteredTokens.value[0].asset,
                          );
                          searchQuery.value = "";
                        } else if ((e as KeyboardEvent).key === 'ArrowDown' || (e as KeyboardEvent).key === 'ArrowUp' && sortedAndFilteredTokens.value.length > 0) {
                          let highlightedItem: HTMLElement | null = document.querySelector("[data-from-amount-symbol-dropdown-index].bg-gray-base")

                          if (highlightedItem) {
                            // get index of currently highlighted item
                            const currentIndex: number | undefined = parseInt(highlightedItem.dataset?.fromAmountSymbolDropdownIndex || '-1')

                            // set which item is next to highlight depending upon user selects to traverse up or down
                            const nextHighlightedItem: HTMLElement | null = document.querySelector(`[data-from-amount-symbol-dropdown-index='${(e as KeyboardEvent).key === 'ArrowDown' ? currentIndex + 1 : currentIndex - 1}']`)

                            // define element that scrolls through available symbols
                            let scrollBox = document.querySelector('.absolute.inset-0.w-full.h-full.overflow-y-scroll')

                            // scroll down if the user keyed down to the last element before hidden ones below
                            if ((e as KeyboardEvent).key === 'ArrowDown') {
                              const parentBoxBottom: number | undefined = document.querySelector('#fromTokenSymbolSelectContainer')?.getBoundingClientRect().bottom
                              const myBoxBottom = nextHighlightedItem?.getBoundingClientRect().bottom

                              if (myBoxBottom && parentBoxBottom && myBoxBottom > parentBoxBottom) {
                                scrollBox?.scrollBy({ top: 33, behavior: 'smooth' })
                              }
                            } else {
                              // scroll up if the user keyed up to an element higher than the parent
                              const parentBoxTop: number | undefined = document.querySelector('#fromTokenSymbolSelectContainer')?.getBoundingClientRect().top
                              const myBoxTop = nextHighlightedItem?.getBoundingClientRect().top
                              scrollBox?.scrollBy({ top: -33, behavior: 'smooth' })
                            }

                            // highlight the next symbol in list after user keys up or down
                            nextHighlightedItem?.classList.add('bg-gray-base')
                            highlightedItem.classList.remove('bg-gray-base')
                          } else {
                            // if user keys down from the input text field, highlight the first item in tne symbols list
                            const firstItemInList: HTMLElement | null = document.querySelector("[data-from-amount-symbol-dropdown-index='0']")
                            firstItemInList?.classList.add('bg-gray-base')
                          }

                        }
                      }}
                      value={searchQuery.value}
                      onInput={(e: Event) => {
                        searchQuery.value = (e.target as HTMLInputElement).value;
                      }}
                      class="box-border w-full absolute top-0 bottom-0 left-0 right-0 pl-8 pr-3 h-full bg-transparent outline-none text-white font-sans font-medium"
                    />
                  </div>
                  <div
                    ref={iconScrollContainer}
                    class="w-full overflow-hidden relative"
                    id="fromTokenSymbolSelectContainer"
                  >
                    <div class="justify-between flex w-full font-normal px-[3px] py-[8px]">
                      <div>Token Name</div>
                      <div>{!props.hideBalances && "Balance"}</div>
                    </div>
                    <div class="w-full h-[302px] relative mr-[-15px]">
                      <div class="absolute inset-0 w-full h-full overflow-y-scroll">
                        <ol>
                          {sortedAndFilteredTokens.value.map((token, index) => {
                            return (
                              <li
                                onClick={(e: MouseEvent) => {
                                  props.onSelectAsset(token.asset);
                                  (e as any).handled = true;
                                }}
                                data-from-amount-symbol-dropdown-index={index}
                                key={token.asset.symbol}
                                class="list-complete-item flex w-full px-[8px] py-[4px] hover:bg-gray-base cursor-pointer items-center font-medium uppercase"
                              >
                                <TokenIcon
                                  key={token.asset.symbol}
                                  size={20}
                                  assetValue={token.asset}
                                  class="mr-[8px]"
                                />
                                {token.asset.displaySymbol || token.asset.symbol}
                                <div class="flex-1 ml-[8px]" />
                                {props.hideBalances
                                  ? ""
                                  : formatAssetAmount(token.amount)}
                              </li>
                            );
                          })}
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Teleport>
        }
      </div>
    );
  },
});
