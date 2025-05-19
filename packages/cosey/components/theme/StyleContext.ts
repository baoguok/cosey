import { defineComponent, inject, InjectionKey, PropType, provide } from 'vue';

export class StyleCache {
  cache: Map<string | object, string> = new Map();

  get(key: string | object) {
    return this.cache.get(key);
  }

  set(key: string | object, value: string) {
    return this.cache.set(key, value);
  }

  has(key: string | object) {
    return this.cache.has(key);
  }
}

export interface StyleContext {
  cache?: StyleCache;
}

export const styleContextKey = Symbol('styleContext') as InjectionKey<StyleContext>;

export function useStyleProvider(context: StyleContext) {
  provide(styleContextKey, context);
}

const cache = new StyleCache();

export function useStyleInection() {
  const context = inject(styleContextKey, {});

  const mergedContext = {
    cache: context.cache || cache,
  };

  return mergedContext;
}

export const StyleProvider = defineComponent({
  name: 'StyleProvider',
  inheritAttrs: false,
  props: {
    cache: {
      type: Object as PropType<StyleCache>,
    },
  },
  setup(props, { slots }) {
    useStyleProvider(props);
    return () => slots.default?.();
  },
});
