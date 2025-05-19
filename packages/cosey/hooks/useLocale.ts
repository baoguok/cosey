import { inject, provide, ref } from 'vue';
import zh_cn from 'element-plus/es/locale/lang/zh-cn';
import en from 'element-plus/es/locale/lang/en';
import dayjs from 'dayjs';
import dayjsZh from 'dayjs/locale/zh-cn';
import dayEn from 'dayjs/locale/en';

const mapLocale = {
  zh_CN: {
    ep: zh_cn,
    dayjs: dayjsZh,
  },
  en_US: {
    ep: en,
    dayjs: dayEn,
  },
};

const localeContextSymbol = Symbol('locale');

export function useLocaleProvide() {
  const locale = ref();

  const setLocale = (language: keyof typeof mapLocale) => {
    const lang = mapLocale[language];
    locale.value = lang.ep;
    dayjs.locale(lang.dayjs);
  };

  setLocale('zh_CN');

  const context = {
    locale,
    setLocale,
  };

  provide(localeContextSymbol, context);

  return context;
}

export function useLocale() {
  return inject<ReturnType<typeof useLocaleProvide>>(localeContextSymbol) as ReturnType<
    typeof useLocaleProvide
  >;
}
