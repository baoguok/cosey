import dayjsZhCn from 'dayjs/locale/zh-cn';
import coseyZhCn from '../locale/lang/zh-cn';
import type { DeepPartial } from '../types/helper';

/**
 * 国际化相关配置
 */
export const defaultI18nConfig = {
  locale: 'zh-cn' as string,
  messages: [
    { value: 'zh-cn', label: '简体中文', dayjs: dayjsZhCn, cosey: coseyZhCn, app: {} },
  ] as {
    value: string;
    label: string;
    dayjs: Record<string, any>;
    cosey: Record<string, any>;
    app: Record<string, any>;
  }[],
};

export type I18nConfig = DeepPartial<typeof defaultI18nConfig>;
export type RequiredI18nConfig = typeof defaultI18nConfig;
