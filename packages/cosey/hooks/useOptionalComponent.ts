import { isString } from '../utils';
import { computed, resolveComponent, type Component } from 'vue';

export function useOptionalComponent(
  component: string | Component | undefined,
  defaultComponent: Component,
) {
  return computed(() => {
    return component
      ? isString(component)
        ? resolveComponent(component)
        : component
      : defaultComponent;
  });
}
