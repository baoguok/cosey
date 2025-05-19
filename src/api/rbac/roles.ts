import { useRequest } from 'cosey';

const Api = {
  RolesResource: '/rbac/roles',
};

export const useRolesApi = () =>
  useRequest().map({
    getRoles: (http) => (params?: any) => {
      return http.get(Api.RolesResource, {
        params,
      });
    },

    getRole: (http) => (id: number) => {
      return http.get(`${Api.RolesResource}/${id}`);
    },

    addRole: (http) => (data: any) => {
      return http.post(Api.RolesResource, data);
    },

    updateRole: (http) => (id: number, data: any) => {
      return http.patch(`${Api.RolesResource}/${id}`, data);
    },

    deleteRole: (http) => (id: number) => {
      return http.delete(`${Api.RolesResource}/${id}`);
    },

    getRolePermissions: (http) => (id: number) => {
      return http.get(`${Api.RolesResource}/${id}/permissions`);
    },

    updateRolePermissions: (http) => (id: number, data: any) => {
      return http.patch(`${Api.RolesResource}/${id}/permissions`, data);
    },
  });
