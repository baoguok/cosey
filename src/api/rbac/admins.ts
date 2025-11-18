import { http } from 'cosey';

const Api = {
  AdminsResource: '/rbac/admins',
};

export default {
  getAdmins: (params?: any) => {
    return http.get(Api.AdminsResource, {
      params,
    });
  },

  getAdmin: (id: number) => {
    return http.get(`${Api.AdminsResource}/${id}`);
  },

  addAdmin: (data: any) => {
    return http.post(Api.AdminsResource, data);
  },

  updateAdmin: (id: number, data: any) => {
    return http.patch(`${Api.AdminsResource}/${id}`, data);
  },

  deleteAdmin: (id: number) => {
    return http.delete(`${Api.AdminsResource}/${id}`);
  },
};
