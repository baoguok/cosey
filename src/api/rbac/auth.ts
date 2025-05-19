import { useRequest } from 'cosey';

const Api = {
  Login: '/rbac/auth/login',
  UserInfo: '/rbac/auth/info',
  ChangePassword: '/rbac/auth/change-password',
};

export const useAuthApi = () =>
  useRequest().map({
    login: (http) => async (data: any) => {
      const res = await http.post(Api.Login, data);
      return res.token as string;
    },

    getUserInfo: (http) => () => {
      return http.get(Api.UserInfo);
    },

    changePassword: (http) => (data: any) => {
      return http.post(Api.ChangePassword, data);
    },
  });
