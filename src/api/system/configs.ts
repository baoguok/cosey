import { http } from 'cosey';

const Api = {
  ConfigGroupsResource: '/system/config-groups',
  ConfigsResource: `/system/configs`,
};

// configs
export default {
  getConfigs: (params?: any) => {
    return http.get(Api.ConfigsResource, {
      params,
    });
  },

  getConfig: (id: number) => {
    return http.get(`${Api.ConfigsResource}/${id}`);
  },

  addConfig: (data: any) => {
    return http.post(Api.ConfigsResource, data);
  },

  updateConfig: (id: number, data: any) => {
    return http.patch(`${Api.ConfigsResource}/${id}`, data);
  },

  deleteConfig: (id: number) => {
    return http.delete(`${Api.ConfigsResource}/${id}`);
  },

  getConfigGroups: (params?: any) => {
    return http.get(Api.ConfigGroupsResource, {
      params,
    });
  },

  getConfigGroup: (id: number) => {
    return http.get(`${Api.ConfigGroupsResource}/${id}`);
  },

  addConfigGroup: (data: any) => {
    return http.post(Api.ConfigGroupsResource, data);
  },

  updateConfigGroup: (id: number, data: any) => {
    return http.patch(`${Api.ConfigGroupsResource}/${id}`, data);
  },

  deleteConfigGroup: (id: number) => {
    return http.delete(`${Api.ConfigGroupsResource}/${id}`);
  },
};
