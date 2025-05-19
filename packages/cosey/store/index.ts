import { createPinia } from 'pinia';
import { useLayoutStore } from './layout';
import { useUserStore } from './user';
import { useAppearanceStore } from './appearance';

export function createStore() {
  return createPinia();
}

export { useUserStore, useAppearanceStore, useLayoutStore };
