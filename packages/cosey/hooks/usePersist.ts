import Persist from '@gunny/persist';
import { inject, type InjectionKey } from 'vue';

export const persistContextKey = Symbol('persistContext') as InjectionKey<Persist>;

export const createPersist = (name: string, type: 'local' | 'session') => {
  return new Persist(name, { type });
};

let defaultPersist: Persist | undefined;

/**
 * 持久化数据，保存在硬盘里而不是在内存中，刷新页面后还能读取到数据。
 * https://github.com/sutras/persist#readme
 */
export function usePersist() {
  let persist = inject(persistContextKey, defaultPersist);

  if (!persist) {
    persist = defaultPersist = createPersist('CoseyAdmin', 'local');
  }

  return persist;
}
