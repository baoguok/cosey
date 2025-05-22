import { useRequest } from 'cosey';

const Api = {
  EnumsResource: '/system/enums',
  EnumItemsResource: (enumId: number) => `/system/enums/${enumId}/enum-items`,
  EnumItemsQueryResource: '/system/enum-items',
};

// enums
export const useEnumsApi = () => {
  return useRequest().map({
    getEnums: (http) => (params?: any) => {
      return http.get(Api.EnumsResource, {
        params,
      });
    },

    getEnum: (http) => (id: number) => {
      return http.get(`${Api.EnumsResource}/${id}`);
    },

    addEnum: (http) => (data: any) => {
      return http.post(Api.EnumsResource, data);
    },

    updateEnum: (http) => (id: number, data: any) => {
      return http.patch(`${Api.EnumsResource}/${id}`, data);
    },

    deleteEnum: (http) => (id: number) => {
      return http.delete(`${Api.EnumsResource}/${id}`);
    },

    // enum-items
    getEnumItems: (http) => (enumId: number, params?: any) => {
      return http.get(Api.EnumItemsResource(enumId), {
        params,
      });
    },

    getEnumItem: (http) => (enumId: number, id: number) => {
      return http.get(`${Api.EnumItemsResource(enumId)}/${id}`);
    },

    addEnumItem: (http) => (enumId: number, data: any) => {
      return http.post(Api.EnumItemsResource(enumId), data);
    },

    updateEnumItem: (http) => (enumId: number, id: number, data: any) => {
      return http.patch(`${Api.EnumItemsResource(enumId)}/${id}`, data);
    },

    deleteEnumItem: (http) => (enumId: number, id: number) => {
      return http.delete(`${Api.EnumItemsResource(enumId)}/${id}`);
    },

    getEnumItemsByEnumName: (http) => (enumName: string, params?: any) => {
      return http.get(`${Api.EnumItemsQueryResource}`, {
        params: {
          ...params,
          enumName,
        },
      });
    },
  });
};
