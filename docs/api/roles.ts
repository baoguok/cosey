import { http } from 'cosey';

const Api = {
  RolesResource: '/rbac/roles',
};

export default {
  getRoles: (params?: any) => {
    return http.get(Api.RolesResource, {
      params,
    });
  },

  getRole: (id: number) => {
    return http.get(`${Api.RolesResource}/${id}`);
  },

  addRole: (data: any) => {
    return http.post(Api.RolesResource, data);
  },

  updateRole: (id: number, data: any) => {
    return http.patch(`${Api.RolesResource}/${id}`, data);
  },

  deleteRole: (id: number) => {
    return http.delete(`${Api.RolesResource}/${id}`);
  },

  getRolePermissions: (id: number) => {
    return http.get(`${Api.RolesResource}/${id}/permissions`);
  },

  updateRolePermissions: (id: number, data: any) => {
    return http.patch(`${Api.RolesResource}/${id}/permissions`, data);
  },
};
