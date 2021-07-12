import { computed, ComputedRef, ref, Ref } from "@vue/reactivity";
import { reactive, readonly, toRefs, watch, watchEffect } from "vue";
const cache: Record<string, any> = {};

type Await<T> = T extends {
  then(onfulfilled?: (value: infer U) => unknown): unknown;
}
  ? U
  : T;
export const useAsyncData = <F extends () => Promise<any>>(
  fn: F,
  shouldReload: ComputedRef<boolean> = computed(() => false),
) => {
  const publicState = {
    data: ref<Await<ReturnType<F>> | null>(null),
    error: ref<any>(null),
    isError: ref(false),
    isSuccess: ref(false),
    isLoading: ref(false),
    reload: ref(loadData),
  };

  function loadData() {
    fn()
      .then((data) => {
        publicState.data.value = data;
        publicState.isSuccess.value = true;
        publicState.isLoading.value = false;
      })
      .catch((e) => {
        publicState.isError.value = true;
        publicState.isLoading.value = false;
        publicState.error = e;
      });
  }
  const privateState = {
    hasRun: ref(false),
  };

  watchEffect(() => {
    if (!privateState.hasRun.value || shouldReload.value) {
      privateState.hasRun.value = true;
      loadData();
    }
  });

  return publicState;
};
