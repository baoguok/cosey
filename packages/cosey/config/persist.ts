import type { DeepPartial } from '../types/helper';

/**
 * 持久化数据配置
 */
export const defaultPersistConfig = {
  /**
   * 持久化数据保存的键名
   */
  name: 'CoseyAdmin',

  /**
   * 持久化数据保存的方式
   */
  type: 'local' as 'local' | 'session',
};

export type PersistConfig = DeepPartial<typeof defaultPersistConfig>;
export type RequiredPersistConfig = typeof defaultPersistConfig;
