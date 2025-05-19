import { type Router } from 'vue-router';
import NProgress from 'nprogress';

export function registerProgressGuard(router: Router) {
  const pathCache: Record<string, boolean> = {};

  router.beforeEach((to) => {
    if (!pathCache[to.path]) {
      NProgress.start();
    }
  });

  router.afterEach((to) => {
    pathCache[to.path] = true;
    NProgress.done();
  });
}
