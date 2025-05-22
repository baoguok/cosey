import { useRequest } from 'cosey';

const Api = {
  AdminsResource: '/rbac/admins',
};

export const useAdminsApi = () => {
  return useRequest().map({
    getAdmins: (http) => (params?: any) => {
      return http.get(Api.AdminsResource, {
        params,
      });
    },

    getAdmin: (http) => (id: number) => {
      return http.get(`${Api.AdminsResource}/${id}`);
    },

    addAdmin: (http) => (data: any) => {
      return http.post(Api.AdminsResource, data);
    },

    updateAdmin: (http) => (id: number, data: any) => {
      return http.patch(`${Api.AdminsResource}/${id}`, data);
    },

    deleteAdmin: (http) => (id: number) => {
      return http.delete(`${Api.AdminsResource}/${id}`);
    },
  });
};
