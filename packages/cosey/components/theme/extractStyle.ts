import { renderToString } from 'vue/server-renderer';
import { StyleCache, StyleProvider } from './StyleContext';
import { createSSRApp, h, VNode } from 'vue';

import { isString } from '../../utils';
import ElementPlus, { ID_INJECTION_KEY, ZINDEX_INJECTION_KEY } from 'element-plus';

export function extractCacheStyle(cache: StyleCache) {
  let styleStr = '';

  cache.cache.forEach((value, key) => {
    if (isString(key)) {
      styleStr += value;
    }
  });

  return styleStr;
}

export function extractStyle(node?: VNode | (VNode | null | undefined)[]) {
  const cache = new StyleCache();

  const app = createSSRApp({
    setup() {
      return () => {
        return h(StyleProvider, { cache }, () => node);
      };
    },
  });

  app.use(ElementPlus);
  app.provide(ID_INJECTION_KEY, { prefix: 1024, current: 0 });
  app.provide(ZINDEX_INJECTION_KEY, { current: 0 });

  app.config.warnHandler = () => null;

  renderToString(app);

  const styleText = extractCacheStyle(cache);

  return styleText;
}
