import type { InjectionKey } from 'vue';

export interface ContainerProps {
  fullPage?: boolean;
}

export interface ContainerSlots {
  default?: (props: Record<string, never>) => any;
}

export const containerContextKey = Symbol('containerContext') as InjectionKey<{
  height: string;
}>;
