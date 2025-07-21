import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';

import { App, Component } from 'vue';
import Layout from '@/components/layout/layout.vue';

import './style.css';

import 'virtual:svg-icons-register';

import 'virtual:ssr-style.css';

import { registerGlobalComponents } from 'cosey';

import { createMock } from '@cosey/mock';

import { icons as carbonIcons } from '@iconify-json/carbon';
import { addIconifyIcon } from 'cosey/components';

import 'virtual:group-icons.css';

addIconifyIcon('carbon', carbonIcons);

function getComponentName(key: string) {
  return key.split('/').pop()!.split('.')[0];
}

function registerVPGlobalComponents(app: App) {
  const vpComponents = import.meta.glob('../../components/**/*.vue', {
    eager: true,
  }) as Record<
    string,
    {
      default: Component;
    }
  >;
  Object.keys(vpComponents).forEach((key) => {
    const component = vpComponents[key] as Record<string, any>;
    app.component(`component-${getComponentName(key)}`, component.default);
  });

  const examples = import.meta.glob(`../../examples/**/*.vue`, {
    eager: true,
  });
  Object.keys(examples).forEach((key) => {
    const example = examples[key] as Record<string, any>;
    app.component(
      `${key.replaceAll('../', '').replaceAll('/', '-').replace('.vue', '')}`,
      example.default,
    );
  });
}

export default {
  extends: DefaultTheme,
  async enhanceApp({ app }) {
    registerVPGlobalComponents(app);
    registerGlobalComponents(app);
    if (!import.meta.env.SSR) {
      const mock = createMock({
        skipAuth: true,
      });
      mock.intercept();
    }
  },
  Layout: Layout,
} satisfies Theme;
