import { http } from 'cosey';

const Api = {
  PermissionsResource: '/rbac/permissions',
};

export default {
  getPermissions: (params?: any) => {
    return http.get(Api.PermissionsResource, {
      params,
    });
  },

  getPermission: (id: number) => {
    return http.get(`${Api.PermissionsResource}/${id}`);
  },

  addPermission: (data: any) => {
    return http.post(Api.PermissionsResource, data);
  },

  updatePermission: (id: number, data: any) => {
    return http.patch(`${Api.PermissionsResource}/${id}`, data);
  },

  deletePermission: (id: number) => {
    return http.delete(`${Api.PermissionsResource}/${id}`);
  },

  getPermissionTree: () => {
    return http.get(`${Api.PermissionsResource}/tree`);
  },

  getPermissionParentTree: (id: number) => {
    return http.get(`${Api.PermissionsResource}/${id}/parent/tree`);
  },
};
