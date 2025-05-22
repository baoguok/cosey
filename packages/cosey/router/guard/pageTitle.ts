import { type Router } from 'vue-router';
import { useGlobalConfig } from '../../config';

export function registerPageTitleGuard(router: Router) {
  router.afterEach((to) => {
    const siteConfig = useGlobalConfig().site;
    const title = to.meta.title ? to.meta.title + ' - ' + siteConfig.name : siteConfig.name;
    document.title = title;
  });
}
