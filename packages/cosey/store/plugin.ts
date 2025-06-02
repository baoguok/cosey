import { type PiniaPluginContext } from 'pinia';
import { watch } from 'vue';
import { usePersist } from '../hooks';

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
    options: { persist },
  } = context;

  const pickKeys = persist?.pick || [];

  const persistIns = usePersist();

  const persistKey = `Cosey:pinia:${store.$id}`;

  const localData = persistIns.get(persistKey) || {};

  store.$patch(localData);

  watch(
    pickKeys.map((key) => () => store[key]),
    () => {
      persistIns.set(persistKey, Object.fromEntries(pickKeys.map((key) => [key, store[key]])));
    },
  );
}
