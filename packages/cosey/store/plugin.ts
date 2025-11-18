import { type PiniaPluginContext } from 'pinia';
import { watch } from 'vue';
import { persist } from '../persist';

declare module 'pinia' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface DefineStoreOptionsBase<S, Store> {
    persist?: {
      pick: (keyof S)[];
    };
  }
}

export function piniaPluginPersist(context: PiniaPluginContext) {
  const {
    store,
    options: { persist: persistConfig },
  } = context;

  const pickKeys = persistConfig?.pick || [];

  const persistKey = `Cosey:pinia:${store.$id}`;

  const localData = persist.get(persistKey) || {};

  store.$patch(localData);

  watch(
    pickKeys.map((key) => () => store[key]),
    () => {
      persist.set(persistKey, Object.fromEntries(pickKeys.map((key) => [key, store[key]])));
    },
  );
}
