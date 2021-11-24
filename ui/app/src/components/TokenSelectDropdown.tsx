// scroll down if the user keyed down to the last element before hidden ones below
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
import handleTokenDropdownScrolling from '../utils/handleTokenDropdownScrolling'

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
                        const isArrowDown = (e as KeyboardEvent).key === 'ArrowDown'
                        const isArrowUp = (e as KeyboardEvent).key === 'ArrowUp'
                        const isEnter = (e as KeyboardEvent).key === 'Enter'
                        if (
                          isEnter &&
                          sortedAndFilteredTokens.value.length > 0
                        ) {
                          props.onSelectAsset(
                            sortedAndFilteredTokens.value[0].asset,
                          );
                          searchQuery.value = "";


                        } else if (isArrowDown || isArrowUp) {

                          // create references to the token dropdown container and children to pass to the handleTokeDropdownScrolling helper function
                          const highlightedToken: HTMLElement | null = document.querySelector("[data-token-dropdown-index].bg-gray-base")

                          // get index of currently highlighted item
                          const currentIndex: number | undefined = parseInt(highlightedToken?.dataset?.tokenDropdownIndex | '0')

                          // next highlighted token will be the previous token if arrow up and will be the next toke if arrow down
                          const nextHighlightedToken: HTMLElement | null = document.querySelector(`[data-token-dropdown-index='${isArrowDown ? currentIndex + 1 : currentIndex - 1}']`)

                          const firstTokenInList: HTMLElement | null = document.querySelector("[data-token-dropdown-index='0']")

                          // box around list of tokens
                          const tokenListContainerRect: DOMRect | undefined = document.querySelector('#tokenSelectContainer')?.getBoundingClientRect()

                          // define element that scrolls through available symbols
                          const tokenScrollContainer: HTMLElement | null = document.querySelector('#tokenScrollContainer')

                          // token that's about to be highlighted
                          const nextHighlightedTokenRect: DOMRect | undefined = nextHighlightedToken?.getBoundingClientRect()

                          if (nextHighlightedToken && firstTokenInList && tokenListContainerRect && tokenScrollContainer) {
                            handleTokenDropdownScrolling(isArrowDown, isArrowUp, highlightedToken, nextHighlightedToken, firstTokenInList, tokenListContainerRect, tokenScrollContainer, nextHighlightedTokenRect)
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
                    id="tokenSelectContainer"
                  >
                    <div class="justify-between flex w-full font-normal px-[3px] py-[8px]">
                      <div>Token Name</div>
                      <div>{!props.hideBalances && "Balance"}</div>
                    </div>
                    <div class="w-full h-[302px] relative mr-[-15px]">
                      <div class="absolute inset-0 w-full h-full overflow-y-scroll" id="tokenScrollContainer">
                        <ol>
                          {sortedAndFilteredTokens.value.map((token, index) => {
                            return (
                              <li
                                onClick={(e: MouseEvent) => {
                                  props.onSelectAsset(token.asset);
                                  (e as any).handled = true;
                                }}
                                data-token-dropdown-index={index}
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
