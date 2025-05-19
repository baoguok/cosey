import { useRequest } from 'cosey';

const Api = {
  ConfigGroupsResource: '/system/config-groups',
  ConfigsResource: `/system/configs`,
};

// configs
export const useConfigsApi = () =>
  useRequest().map({
    getConfigs: (http) => (params?: any) => {
      return http.get(Api.ConfigsResource, {
        params,
      });
    },

    getConfig: (http) => (id: number) => {
      return http.get(`${Api.ConfigsResource}/${id}`);
    },

    addConfig: (http) => (data: any) => {
      return http.post(Api.ConfigsResource, data);
    },

    updateConfig: (http) => (id: number, data: any) => {
      return http.patch(`${Api.ConfigsResource}/${id}`, data);
    },

    deleteConfig: (http) => (id: number) => {
      return http.delete(`${Api.ConfigsResource}/${id}`);
    },
  });

// config-groups
export const useConfigGroupsApi = () =>
  useRequest().map({
    getConfigGroups: (http) => (params?: any) => {
      return http.get(Api.ConfigGroupsResource, {
        params,
      });
    },

    getConfigGroup: (http) => (id: number) => {
      return http.get(`${Api.ConfigGroupsResource}/${id}`);
    },

    addConfigGroup: (http) => (data: any) => {
      return http.post(Api.ConfigGroupsResource, data);
    },

    updateConfigGroup: (http) => (id: number, data: any) => {
      return http.patch(`${Api.ConfigGroupsResource}/${id}`, data);
    },

    deleteConfigGroup: (http) => (id: number) => {
      return http.delete(`${Api.ConfigGroupsResource}/${id}`);
    },
  });
