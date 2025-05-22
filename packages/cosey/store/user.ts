import { ref } from 'vue';
import { type RouteRecordRaw, useRoute, useRouter } from 'vue-router';
import { defineStore } from 'pinia';
import { getAllDynamicRoutes } from '../router';
import { usePersist } from '../hooks';
import { TOKEN_NAME } from '../constant';
/**
 * 用于解决ts错误提示：
 * The inferred type of '' cannot be named without a reference to '.pnpm/@vue+shared@3.5.13/node_modules/@vue/shared'. This is likely not portable. A type annotation is necessary.
 */
import type {} from '@vue/shared';
import { useGlobalConfig } from '../config';
import { warningOnce } from '../utils';
import { NOT_FOUND_ROUTE_NAME, NotFoundRoute } from '../router/not-found';

interface UserInfo {
  id?: number;
  username?: string;
  nickname: string;
  avatar: string;
  [key: PropertyKey]: any;
}

export const useUserStore = defineStore('cosey-user', () => {
  const route = useRoute();
  const router = useRouter();
  const persist = usePersist();
  const {
    router: routerConfig,
    api: apiConfig,
    filterRoute,
    defineAuthority,
  } = useGlobalConfig() || {};

  if (!apiConfig?.login) {
    warningOnce(!!apiConfig?.login, 'The "login" api is required.');
  }

  if (!apiConfig?.getUserInfo) {
    warningOnce(!!apiConfig?.getUserInfo, 'The "getUserInfo" api is required.');
  }

  const loginApi = apiConfig?.login?.();
  const getUserInfoApi = apiConfig?.getUserInfo?.();
  const changePasswordApi = apiConfig?.changePassword?.();
  const logoutApi = apiConfig?.logout?.();

  // 当前动态添加的路由
  const dynamicRoutes = ref<any[]>([]);
  // 当前登录用户的信息
  const userInfo = ref<UserInfo>();
  // 是否已获取用户信息
  const requestedUserInfo = ref(false);

  /**
   * 登录获取用户 token
   * 会保存 token 到硬盘，每次刷新页面会复用此 token
   */
  const login = async (data: any) => {
    await loginApi?.(data).then((token: string) => {
      persist.set(TOKEN_NAME, token);
      router.push((route.query.redirect as string) || routerConfig!.homePath);
    });
  };

  /**
   * 获取用户信息
   * 会在获取 token 后跳转路由前获取
   */
  const getUserInfo = async () => {
    return getUserInfoApi?.().then((res: any) => {
      const nickname = res.nickname;
      const avatar = res.avatar;
      userInfo.value = {
        ...res,
        nickname,
        avatar,
      };

      return userInfo.value;
    });
  };

  /**
   * 修改密码
   */
  const changePassword = async (data: any) => {
    await changePasswordApi?.(data).then(() => {
      router.back();
    });
  };

  /**
   * 设置权限
   */
  const setAuthorization = async () => {
    return defineAuthority?.(userInfo.value!);
  };

  const mapRoute = (routes: RouteRecordRaw[]): RouteRecordRaw[] => {
    return routes
      .map((route) => {
        const result = filterRoute?.(route);
        const node = result === true ? route : result;

        if (node && node.children && node.children.length) {
          node.children = mapRoute(node.children);
        }
        return node;
      })
      .filter(Boolean) as RouteRecordRaw[];
  };

  /**
   * 根据用户权限过滤路由
   */
  const filterRoutes = (routes: RouteRecordRaw[]) => {
    return mapRoute(routes);
  };

  /**
   * 在获取用户信息后添加动态路由
   */
  const addDynamicRoutes = async () => {
    const filteredRoutes = filterRoutes(getAllDynamicRoutes());

    router.removeRoute(NOT_FOUND_ROUTE_NAME);
    filteredRoutes.forEach((route) => {
      router.addRoute(route as RouteRecordRaw);
    });
    router.addRoute('Exception', NotFoundRoute as RouteRecordRaw);

    dynamicRoutes.value = filteredRoutes;
  };

  /**
   * 退出登录时清空用户信息
   */
  const flush = (lastPath?: string) => {
    persist.remove(TOKEN_NAME);
    userInfo.value = undefined;
    requestedUserInfo.value = false;
    router.push({
      path: routerConfig!.loginPath,
      query: {
        redirect: lastPath,
      },
    });
  };

  /**
   * 退出登录
   */
  const logout = async (lastPath?: string) => {
    await logoutApi?.();
    flush(lastPath);
  };

  return {
    dynamicRoutes,
    userInfo,
    requestedUserInfo,
    login,
    getUserInfo,
    changePassword,
    setAuthorization,
    addDynamicRoutes,
    logout,
  };
});
