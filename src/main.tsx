import './styles/index.css';

import { createApp } from 'vue';
import { createCosey } from 'cosey';
import App from '@/App.vue';
import { dynamicRoutes, staticRoutes } from './routes';
import { useUploadApi } from './api/common';
import { useAuthApi } from './api/rbac/auth';

import { AbilityBuilder, createMongoAbility, defineAbility } from '@casl/ability';
import { ABILITY_TOKEN } from '@casl/vue';

import LayoutSetting from './components/layout-setting';
import LayoutHttpMessage from './components/layout-http-message';
import LoginTips from './components/login-tips.vue';

import 'virtual:svg-icons-register';
import { icons as carbonIcons } from '@iconify-json/carbon';
import { addIconifyIcon } from 'cosey/components';

import { createMock } from '@cosey/mock';

addIconifyIcon('carbon', carbonIcons);

async function bootstrap() {
  const app = createApp(App);

  // 权限
  const ability = defineAbility(() => {});
  ability.can = ability.can.bind(ability);
  ability.cannot = ability.cannot.bind(ability);
  app.provide(ABILITY_TOKEN, ability);

  // cosey
  const cosey = createCosey({
    router: { dynamic: dynamicRoutes, static: staticRoutes },
    http: {
      baseURL: import.meta.env.VITE_BASE_URL,
    },
    site: {
      name: import.meta.env.VITE_APP_TITLE,
      logo: import.meta.env.VITE_APP_LOGO,
      description: import.meta.env.VITE_APP_DESCRIPTION,
    },
    api: {
      upload: () => {
        return useUploadApi().singleUpload;
      },
      login: () => {
        return useAuthApi().login;
      },
      getUserInfo: () => {
        return useAuthApi().getUserInfo;
      },
      changePassword: () => {
        return useAuthApi().changePassword;
      },
    },
    defineAuthority({ permissions = [] }) {
      const { can, rules } = new AbilityBuilder(createMongoAbility);
      permissions.forEach(({ action, subject }: any) => {
        can(action, subject);
      });
      ability.update(rules);
    },
    filterRoute(route) {
      const authority = route.meta?.authority;
      return !authority ? true : authority(ability);
    },
    slots: {
      topbarRight() {
        return (
          <>
            <LayoutSetting />
            <LayoutHttpMessage />
          </>
        );
      },
      authWidget() {
        return (
          <>
            <LoginTips />
            <LayoutSetting />
            <LayoutHttpMessage />
          </>
        );
      },
    },
  });

  app.use(cosey);

  // 请求拦截
  const mock = createMock();
  mock.intercept();
  app.provide('mockContext', mock.httpMessageManager);

  // 挂载根组件
  app.mount('#app');
}

bootstrap();
