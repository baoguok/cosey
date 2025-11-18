import { type App } from 'vue';
import ElementPlus from 'element-plus';

import coseyComponents from '../components';

export function launchGlobalComponents(app: App) {
  app.use(ElementPlus);
  app.use(coseyComponents);
}
