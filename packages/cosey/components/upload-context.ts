import type { AxiosRequestConfig } from 'axios';
import { inject, type InjectionKey, provide } from 'vue';

export interface UploadContext {
  request?: (
    data: Blob,
    config?: AxiosRequestConfig,
    extra?: Record<PropertyKey, any>,
  ) => Promise<string>;
}

const uploadContextKey = Symbol('uploadContext') as InjectionKey<UploadContext>;

export const useUploadProvide = (context: UploadContext) => {
  provide(uploadContextKey, context);
};

export const useUpload = () => {
  return inject(uploadContextKey, null);
};
