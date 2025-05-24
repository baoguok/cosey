import { createPinia } from 'pinia';
import { useLayoutStore } from './layout';
import { useUserStore } from './user';
import { useAppearanceStore } from './appearance';
import { piniaPluginPersist } from './plugin';

export function createPiniaStore() {
  const pinia = createPinia();
  pinia.use(piniaPluginPersist);
  return pinia;
}

export { useUserStore, useAppearanceStore, useLayoutStore };
