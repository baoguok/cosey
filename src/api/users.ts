import { useRequest } from 'cosey';

const Api = {
  UsersResource: '/users',
};

export const useUsersApi = () => {
  return useRequest().map({
    getUsers: (http) => (params?: any) => {
      return http.get(Api.UsersResource, {
        params,
      });
    },

    getUser: (http) => (id: number) => {
      return http.get(`${Api.UsersResource}/${id}`);
    },

    addUser: (http) => (data: any) => {
      return http.post(Api.UsersResource, data);
    },

    updateUser: (http) => (id: number, data: any) => {
      return http.patch(`${Api.UsersResource}/${id}`, data);
    },

    deleteUser: (http) => (id: number) => {
      return http.delete(`${Api.UsersResource}/${id}`);
    },

    updateBulkSilent: (http) => (data: { ids: number[]; value: number }) => {
      return http.patch(`${Api.UsersResource}/bulk-silent`, data);
    },
  });
};
