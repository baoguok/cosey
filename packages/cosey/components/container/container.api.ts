import type { ExtractPropTypes, InjectionKey, SlotsType } from 'vue';

export const containerProps = {
  fullPage: {
    type: Boolean,
  },
};

export type ContainerProps = ExtractPropTypes<typeof containerProps>;

export interface ContainerSlots {
  default: {};
}

export const containerSlots = Object as SlotsType<ContainerSlots>;

export const containerContextKey = Symbol('containerContext') as InjectionKey<{
  height: string;
}>;
