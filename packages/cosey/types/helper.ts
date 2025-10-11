import { Prettify } from '@vue/shared';
import { Slot, Slots, SlotsType } from 'vue';

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Writeable<T> = {
  -readonly [key in keyof T]: T[key];
};

export type GetVueComponentProps<T extends new (...args: any) => any> = Writeable<
  InstanceType<T>['$props']
>;

export type GetVueComponentSlots<T extends new (...args: any) => any> = Writeable<
  InstanceType<T>['$slots']
>;

export type GetVueComponentEmits<T extends new (...args: any) => any> = InstanceType<T>['$emit'];

export declare const SlotSymbol: any;

export type UnwrapSlotsType<S extends SlotsType, T = NonNullable<S[typeof SlotSymbol]>> = [
  keyof S,
] extends [never]
  ? Slots
  : Readonly<
      Prettify<{
        [K in keyof T]: NonNullable<T[K]> extends (...args: any[]) => any ? T[K] : Slot<T[K]>;
      }>
    >;
