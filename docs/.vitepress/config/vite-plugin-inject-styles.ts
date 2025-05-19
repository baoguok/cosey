import { type Component, defineComponent, h } from 'vue';
import { components as coseyComponents } from 'cosey/components';
import { extractStyle } from 'cosey/components';
import { useOverrideVitePress } from '../../components/layout/override-vite-press';
import docsComponents from '../../temp-components/index.js';

function extractComponentStyle() {
  const ignores = [
    'ContextMenuItem',
    'ContextSubMenu',
    'DndSortItem',
    'FormItem',
    'SnugMenuItem',
    'Table',
    'TableAction',
  ];

  return extractStyle(
    Object.values({
      ...coseyComponents,
      ...(docsComponents as Record<string, Component>),
      useOverrideVitePress: defineComponent({
        setup() {
          useOverrideVitePress();
          return () => null;
        },
      }),
    })
      .map((component) => {
        if (ignores.includes(component.name!)) {
          return null;
        }
        return h(component);
      })
      .filter(Boolean),
  );
}

function vitePluginInjectStyles() {
  const virtualModuleId = 'virtual:ssr-style.css';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  const styleStr = extractComponentStyle();

  return {
    name: 'vite-plugin-inject-styles',
    resolveId(id: string) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    load(id: string) {
      if (id === resolvedVirtualModuleId) {
        return styleStr;
      }
    },
  };
}

export default vitePluginInjectStyles;
