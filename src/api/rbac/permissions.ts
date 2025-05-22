import { useRequest } from 'cosey';

const Api = {
  PermissionsResource: '/rbac/permissions',
};

export const usePermissionsApi = () => {
  return useRequest().map({
    getPermissions: (http) => (params?: any) => {
      return http.get(Api.PermissionsResource, {
        params,
      });
    },

    getPermission: (http) => (id: number) => {
      return http.get(`${Api.PermissionsResource}/${id}`);
    },

    addPermission: (http) => (data: any) => {
      return http.post(Api.PermissionsResource, data);
    },

    updatePermission: (http) => (id: number, data: any) => {
      return http.patch(`${Api.PermissionsResource}/${id}`, data);
    },

    deletePermission: (http) => (id: number) => {
      return http.delete(`${Api.PermissionsResource}/${id}`);
    },

    getPermissionTree: (http) => () => {
      return http.get(`${Api.PermissionsResource}/tree`);
    },

    getPermissionParentTree: (http) => (id: number) => {
      return http.get(`${Api.PermissionsResource}/${id}/parent/tree`);
    },
  });
};
