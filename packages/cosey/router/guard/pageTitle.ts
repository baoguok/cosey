import { type Router } from 'vue-router';
import { globalConfig } from '../../config';

export function registerPageTitleGuard(router: Router) {
  router.afterEach((to) => {
    const { site: siteConfig } = globalConfig;
    const title = to.meta.title ? to.meta.title + ' - ' + siteConfig.name : siteConfig.name;
    document.title = title;
  });
}
