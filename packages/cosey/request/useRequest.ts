import { useRoute, useRouter } from 'vue-router';
import axios, { AxiosError, type CreateAxiosDefaults } from 'axios';
import { ElMessage } from 'element-plus';
import { defaults, get, merge, pick } from 'lodash-es';
import { usePersist } from '../hooks';
import { useUserStore } from '../store';
import { ROUTER_TO, TOKEN_NAME } from '../constant';
import { Http } from './Http';
import { useGlobalConfig } from '../config';
import { isObject } from '../utils';
import { type HttpConfig, type RequiredHttpConfig } from '../config/http';

export function useRequest(config: CreateAxiosDefaults = {}, useHttpConfig?: HttpConfig) {
  const persist = usePersist();
  const userStore = useUserStore();
  const router = useRouter();
  const route = useRoute();
  const { http: httpConfig, router: routerConfig } = useGlobalConfig();

  const handleError = (resData: any, mergedHttpConfig: RequiredHttpConfig) => {
    const httpPath = mergedHttpConfig.path;
    const code = get(resData, httpPath.code);
    const message = get(resData, httpPath.message) || 'Error';
    const data = httpPath.data ? get(resData, httpPath.data) : resData;

    if (code !== mergedHttpConfig.code.success) {
      ElMessage.error({
        message,
        duration: mergedHttpConfig.errorDuration,
      });

      if (code === mergedHttpConfig.code.forbidden) {
        router.push(routerConfig.homePath);
      } else if (code === mergedHttpConfig.code.unauthorized) {
        if (persist.get(TOKEN_NAME)) {
          userStore.logout(persist.get(ROUTER_TO) || route.fullPath);
        }
      }

      return Promise.reject(new Error(message));
    }
    return data;
  };

  const createAxios = (createHttpConfig?: HttpConfig) => {
    const mergedHttpConfig = merge({}, httpConfig, useHttpConfig, createHttpConfig);

    const axiosIns = axios.create(
      defaults(config, pick(mergedHttpConfig, ['baseURL', 'timeout', 'headers'])),
    );

    axiosIns.interceptors.request.use(
      (config) => {
        Object.assign(config, mergedHttpConfig.headers);
        const token = persist.get(TOKEN_NAME);
        if (token) {
          config.headers[mergedHttpConfig.authHeaderKey] = mergedHttpConfig.authScheme
            ? `${mergedHttpConfig.authScheme} ${token}`
            : token;
        }
        return config;
      },
      (error) => {
        ElMessage.error({
          message: error,
          duration: mergedHttpConfig.errorDuration,
        });
        return Promise.reject(error);
      },
    );

    axiosIns.interceptors.response.use(
      (response) => {
        if (mergedHttpConfig.originalResponse) {
          return response;
        }

        const { data: resData } = response;
        return handleError(resData, mergedHttpConfig);
      },
      (error: Error | AxiosError) => {
        if (
          error instanceof AxiosError &&
          error.response &&
          isObject(error.response.data) &&
          get(error.response.data, mergedHttpConfig.path.code)
        ) {
          return handleError(error.response.data, mergedHttpConfig);
        } else {
          ElMessage.error({
            message: error.message,
            duration: mergedHttpConfig.errorDuration,
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
