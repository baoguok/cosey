export interface NumberFormatProps {
  value?: number | string;
  precision?: number;
  animate?: boolean;
  duration?: number;
  locales?: 'zh-Hans' | 'en-US' | (string & {});
  type?: 'currency' | 'decimal' | 'percent';
  currency?: 'CNY' | 'USD' | (string & {});
  beforeDisplay?: (value: string) => string;
}

export const defaultNumberFormatProps: NumberFormatProps = {
  precision: 0,
  duration: 1500,
  locales: 'zh-Hans',
  type: 'decimal',
  currency: 'CNY',
};

export interface NumberFormatSlots {
  default?: (props: Record<string, never>) => any;
}

export interface NumberFormatEmits {}

export interface NumberFormatExpose {}
