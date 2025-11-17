import type { DeepPartial } from '../types/helper';

/**
 * 国际化相关配置
 */
export const defaultI18nConfig = {
  locale: 'zh-cn' as string,
  messages: [] as {
    value: string;
    label: string;
    dayjs: Record<string, any>;
    cosey: Record<string, any>;
    app: Record<string, any>;
  }[],
};

export type I18nConfig = DeepPartial<typeof defaultI18nConfig>;
export type RequiredI18nConfig = typeof defaultI18nConfig;
