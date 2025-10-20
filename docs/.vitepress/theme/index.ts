import type { Theme } from 'vitepress';

import './style.css';

import { createI18n } from 'vue-i18n';
const i18n = createI18n({
  legacy: false,
  missingWarn: false,
  fallbackWarn: false,
  silentTranslationWarn: true,
  silentFallbackWarn: true,
});

import dayjs from 'dayjs';
import dayjsZhCn from 'dayjs/locale/zh-cn';

dayjs.locale(dayjsZhCn);

import { App, Component } from 'vue';
import Layout from '@/components/layout/layout.vue';

import 'virtual:svg-icons-register';

// import 'virtual:ssr-style.css';

import { createCosey } from 'cosey';

import { createMock } from '@cosey/mock';

import { icons as carbonIcons } from '@iconify-json/carbon';
import { addIconifyIcon } from 'cosey/components';

import 'virtual:group-icons.css';
import { useUploadApi } from '@/api/common';
import { createMemoryHistory } from 'vue-router';

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
  async enhanceApp({ app }) {
    registerVPGlobalComponents(app);

    const cosey = createCosey({
      router: {
        listening: false,
        history: createMemoryHistory(),
      },
      http: {
        baseURL: '/mock/api',
      },
      api: {
        login: () => async () => '',
        getUserInfo: () => async () => ({}),
        upload: () => {
          return useUploadApi().singleUpload;
        },
      },
    });

    app.use(cosey);

    app.use(i18n);

    if (!import.meta.env.SSR) {
      const mock = createMock({
        skipAuth: true,
      });
      mock.intercept();
    }
  },
  Layout: Layout,
} satisfies Theme;
