import axios, { AxiosError, InternalAxiosRequestConfig, type CreateAxiosDefaults } from 'axios';
import { ElMessage } from 'element-plus';
import { get, merge, pick } from 'lodash-es';
import { useOuterUserStore } from '../store';
import { ROUTER_TO, TOKEN_NAME } from '../constant';
import { Http } from './Http';
import { isObject } from '../utils';
import { type RequiredHttpConfig, type HttpConfig } from '../config/http';
import { persist } from '../persist';
import { globalConfig } from '../config';
import { router } from '../router';

export { Http } from './Http';

type MixedAxiosRequestConfig = InternalAxiosRequestConfig & {
  coseyHttpConfig?: HttpConfig;
  coseyMergedCfg?: RequiredHttpConfig;
};

export function createHttp(axiosConfig: CreateAxiosDefaults = {}, createCfg: HttpConfig = {}) {
  function createAxios() {
    const { http: globalCfg, router: routerConfig } = globalConfig;
    const createdMergedCfg = merge({}, globalCfg, createCfg);

    const userStore = useOuterUserStore();

    const handleError = (resData: any, mergedCfg: RequiredHttpConfig) => {
      const httpPath = mergedCfg.path;
      const code = get(resData, httpPath.code);
      const message = get(resData, httpPath.message) || 'Error';
      const data = httpPath.data ? get(resData, httpPath.data) : resData;

      if (code !== mergedCfg.code.success) {
        ElMessage.error({
          message,
          duration: mergedCfg.errorDuration,
        });

        if (code === mergedCfg.code.forbidden) {
          router.push(routerConfig.homePath);
        } else if (code === mergedCfg.code.unauthorized) {
          if (persist.get(TOKEN_NAME)) {
            userStore.logout(persist.get(ROUTER_TO) || router.currentRoute.value.fullPath);
          }
        }

        return Promise.reject(new Error(message));
      }

      if (mergedCfg.originalData) {
        return resData;
      }

      return data;
    };

    const axiosIns = axios.create(
      merge({}, pick(createdMergedCfg, ['baseURL', 'timeout', 'headers']), axiosConfig),
    );

    function getMergedCfg(target: any): RequiredHttpConfig {
      return target?.config?.coseyMergedCfg || createdMergedCfg;
    }

    axiosIns.interceptors.request.use(
      (config: MixedAxiosRequestConfig) => {
        const mergedCfg = (config.coseyMergedCfg = merge(
          {},
          createdMergedCfg,
          config.coseyHttpConfig,
        ));

        const token = persist.get(TOKEN_NAME);
        if (token) {
          config.headers[mergedCfg.authHeaderKey] = mergedCfg.authScheme
            ? `${mergedCfg.authScheme} ${token}`
            : token;
        }
        return config;
      },
      (error) => {
        const mergedCfg = getMergedCfg(error);

        ElMessage.error({
          message: error.message,
          duration: mergedCfg.errorDuration,
        });

        return Promise.reject(error);
      },
    );

    axiosIns.interceptors.response.use(
      (response) => {
        const mergedCfg = getMergedCfg(response);

        if (mergedCfg.originalResponse) {
          return response;
        }

        const { data: resData } = response;
        return handleError(resData, mergedCfg);
      },
      (error: Error | AxiosError) => {
        const mergedCfg = getMergedCfg(error);

        if (
          error instanceof AxiosError &&
          error.response &&
          isObject(error.response.data) &&
          get(error.response.data, mergedCfg.path.code)
        ) {
          return handleError(error.response.data, mergedCfg);
        } else {
          ElMessage.error({
            message: error.message,
            duration: mergedCfg.errorDuration,
          });

          return Promise.reject(error);
        }
      },
    );

    return axiosIns;
  }

  return new Http(createAxios);
}

export const http = createHttp();
