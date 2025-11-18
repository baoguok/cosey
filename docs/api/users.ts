import { http } from 'cosey';

const Api = {
  UsersResource: '/users',
};

export default {
  getUsers: (params?: any) => {
    return http.get(Api.UsersResource, {
      params,
    });
  },

  getUser: (id: number) => {
    return http.get(`${Api.UsersResource}/${id}`);
  },

  addUser: (data: any) => {
    return http.post(Api.UsersResource, data);
  },

  updateUser: (id: number, data: any) => {
    return http.patch(`${Api.UsersResource}/${id}`, data);
  },

  deleteUser: (id: number) => {
    return http.delete(`${Api.UsersResource}/${id}`);
  },

  updateBulkSilent: (data: { ids: number[]; value: number }) => {
    return http.patch(`${Api.UsersResource}/bulk-silent`, data);
  },
};
