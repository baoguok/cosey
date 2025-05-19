import { type App } from 'vue';
import ElementPlus from 'element-plus';

import coseyComponents from '../components';

export function registerGlobalComponents(app: App) {
  app.use(ElementPlus);
  app.use(coseyComponents);
}

export * from './layout';
export * from './merged';
