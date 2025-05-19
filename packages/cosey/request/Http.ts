import { AxiosInstance, AxiosRequestConfig } from 'axios';

export class Http {
  axiosFactory: () => AxiosInstance;
  axiosIns: AxiosInstance | null = null;
  controller: AbortController;
  config: AxiosRequestConfig | null = null;

  constructor(axiosFactory: () => AxiosInstance) {
    this.axiosFactory = axiosFactory;
    this.controller = new AbortController();
  }

  abort() {
    if (this.config?.signal === this.controller.signal) {
      this.controller.abort();
    }
  }

  _request<T = any, D = any>(config: AxiosRequestConfig<D>) {
    if (!config.signal) {
      config.signal = this.controller.signal;
    }

    if (!this.axiosIns) {
      this.axiosIns = this.axiosFactory();
    }

    return this.axiosIns.request<T, T, D>(config);
  }

  request<T = any, D = any>(config: AxiosRequestConfig<D>) {
    return this._request<T, D>(config);
  }

  get<T = any, D = any>(url: string, config?: AxiosRequestConfig<D>) {
    return this._request<T, D>({
      ...config,
      url,
      method: 'get',
    });
  }

  delete<T = any, D = any>(url: string, config?: AxiosRequestConfig<D>) {
    return this._request<T, D>({
      ...config,
      url,
      method: 'delete',
    });
  }

  head<T = any, D = any>(url: string, config?: AxiosRequestConfig<D>) {
    return this._request<T, D>({
      ...config,
      url,
      method: 'head',
    });
  }

  options<T = any, D = any>(url: string, config?: AxiosRequestConfig<D>) {
    return this._request<T, D>({
      ...config,
      url,
      method: 'options',
    });
  }

  post<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
    return this._request<T, D>({
      ...config,
      url,
      data,
      method: 'post',
    });
  }

  put<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
    return this._request<T, D>({
      ...config,
      url,
      data,
      method: 'put',
    });
  }

  patch<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
    return this._request<T, D>({
      ...config,
      url,
      data,
      method: 'patch',
    });
  }
}
