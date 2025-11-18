import { http } from 'cosey';

const Api = {
  EnumsResource: '/system/enums',
  EnumItemsResource: (enumId: number) => `/system/enums/${enumId}/enum-items`,
  EnumItemsQueryResource: '/system/enum-items',
};

// enums
export default {
  getEnums: (params?: any) => {
    return http.get(Api.EnumsResource, {
      params,
    });
  },

  getEnum: (id: number) => {
    return http.get(`${Api.EnumsResource}/${id}`);
  },

  addEnum: (data: any) => {
    return http.post(Api.EnumsResource, data);
  },

  updateEnum: (id: number, data: any) => {
    return http.patch(`${Api.EnumsResource}/${id}`, data);
  },

  deleteEnum: (id: number) => {
    return http.delete(`${Api.EnumsResource}/${id}`);
  },

  // enum-items
  getEnumItems: (enumId: number, params?: any) => {
    return http.get(Api.EnumItemsResource(enumId), {
      params,
    });
  },

  getEnumItem: (enumId: number, id: number) => {
    return http.get(`${Api.EnumItemsResource(enumId)}/${id}`);
  },

  addEnumItem: (enumId: number, data: any) => {
    return http.post(Api.EnumItemsResource(enumId), data);
  },

  updateEnumItem: (enumId: number, id: number, data: any) => {
    return http.patch(`${Api.EnumItemsResource(enumId)}/${id}`, data);
  },

  deleteEnumItem: (enumId: number, id: number) => {
    return http.delete(`${Api.EnumItemsResource(enumId)}/${id}`);
  },

  getEnumItemsByEnumName: (enumName: string, params?: any) => {
    return http.get(`${Api.EnumItemsQueryResource}`, {
      params: {
        ...params,
        enumName,
      },
    });
  },
};
