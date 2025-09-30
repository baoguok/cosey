import { type Router } from 'vue-router';
import { useGlobalConfig } from '../../config';
import { useUserStore } from '../../store';
import { usePersist } from '../../hooks';
import { ROUTER_TO, TOKEN_NAME } from '../../constant';

/**
 * 身份验证路由守卫
 */
export function registerAuthGuard(router: Router) {
  let firstTimeAddRoutes = false;

  router.beforeEach(async (to) => {
    const persist = usePersist();
    const routerConfig = useGlobalConfig().router;

    const token = persist.get(TOKEN_NAME);
    const userStore = useUserStore();

    if (to.path === '/' && routerConfig.homePath !== '/') {
      return routerConfig.homePath;
    }

    if (token) {
      if (!userStore.requestedUserInfo) {
        try {
          persist.set(ROUTER_TO, to.fullPath);
          await userStore.getUserInfo();
          await userStore.setAuthorization();
          await userStore.addDynamicRoutes();

          firstTimeAddRoutes = true;
          userStore.requestedUserInfo = true;
        } catch {
          return false;
        } finally {
          persist.remove(ROUTER_TO);
        }
      }

      if (to.path === routerConfig.loginPath) {
        return routerConfig.homePath;
      }

      if (firstTimeAddRoutes) {
        firstTimeAddRoutes = false;
        return to.path;
      }

      return true;
    }

    if (!to.meta.authentication) {
      return true;
    }

    return {
      path: routerConfig.loginPath,
      query: {
        redirect: to.path,
      },
    };
  });
}
