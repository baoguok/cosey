import { useRoute, useRouter } from 'vue-router';
import axios, { AxiosError, type CreateAxiosDefaults } from 'axios';
import { ElMessage } from 'element-plus';
import { defaults, get, pick } from 'lodash-es';
import { usePersist } from '../hooks';
import { useUserStore } from '../store';
import { ROUTER_TO, TOKEN_NAME } from '../constant';
import { Http } from './Http';
import { useGlobalConfig } from '../config';
import { isObject } from '../utils';

export function useRequest(config: CreateAxiosDefaults = {}) {
  const persist = usePersist();
  const userStore = useUserStore();
  const router = useRouter();
  const route = useRoute();
  const { http: httpConfig, router: routerConfig } = useGlobalConfig();

  const handleError = (resData: any) => {
    const httpPath = httpConfig.path;
    const code = get(resData, httpPath.code);
    const message = get(resData, httpPath.message) || 'Error';
    const data = get(resData, httpPath.data);

    if (code !== httpConfig.code.success) {
      ElMessage.error({
        message,
        duration: httpConfig.errorDuration,
      });

      if (code === httpConfig.code.forbidden) {
        router.push(routerConfig.homePath);
      } else if (code === httpConfig.code.unauthorized) {
        if (persist.get(TOKEN_NAME)) {
          userStore.logout(persist.get(ROUTER_TO) || route.fullPath);
        }
      }

      return Promise.reject(new Error(message));
    }
    return data;
  };

  const createAxios = () => {
    const axiosIns = axios.create(
      defaults(config, pick(httpConfig, ['baseURL', 'timeout', 'headers'])),
    );

    axiosIns.interceptors.request.use(
      (config) => {
        Object.assign(config, httpConfig.headers);
        const token = persist.get(TOKEN_NAME);
        if (token) {
          config.headers.Authorization = httpConfig.authScheme
            ? `${httpConfig.authScheme} ${token}`
            : token;
        }
        return config;
      },
      (error) => {
        ElMessage.error({
          message: error,
          duration: httpConfig.errorDuration,
        });
        return Promise.reject(error);
      },
    );

    axiosIns.interceptors.response.use(
      (response) => {
        const { data: resData } = response;
        return handleError(resData);
      },
      (error: Error | AxiosError) => {
        if (
          error instanceof AxiosError &&
          error.response &&
          isObject(error.response.data) &&
          get(error.response.data, httpConfig.path.code)
        ) {
          return handleError(error.response.data);
        } else {
          ElMessage.error({
            message: error.message,
            duration: httpConfig.errorDuration,
          });

          return Promise.reject(error);
        }
      },
    );

    return axiosIns;
  };

  type HttpHandler = (http: Http) => (...args: any[]) => any;

  type WrappedHttpHandler<
    T extends HttpHandler,
    ActualHandler extends (...args: any[]) => any = ReturnType<T>,
  > = {
    (...args: Parameters<ActualHandler>): ReturnType<ActualHandler>;
    abort: () => void;
  };

  const fn = <T extends HttpHandler, R = WrappedHttpHandler<T>>(handler: T) => {
    const http = new Http(createAxios);

    const wrappedFn = (...args: any[]) => {
      return handler(http)(...args);
    };
    wrappedFn.abort = () => {
      http.abort();
    };

    return wrappedFn as R;
  };

  const map = <
    T extends Record<string, HttpHandler>,
    R = {
      [K in keyof T]: WrappedHttpHandler<T[K]>;
    },
  >(
    object: T,
  ) => {
    const result = {} as R;
    for (const [key, handler] of Object.entries(object)) {
      result[key as keyof R] = fn(handler);
    }
    return result;
  };

  return {
    fn,
    map,
  };
}
