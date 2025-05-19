import axios from 'axios';

const Api = {
  UsersResource: '/mock/api/users',
};

export const getUsers = async (params?: any) => {
  return axios
    .get(`${Api.UsersResource}`, {
      params,
    })
    .then((res) => {
      return res.data.data;
    });
};

export const addUser = async (data: any) => {
  return axios
    .post(`${Api.UsersResource}`, {
      data,
    })
    .then((res) => {
      return res.data.data;
    });
};

export const updateUser = async (id: number, data: any) => {
  return axios
    .patch(`${Api.UsersResource}/${id}`, {
      data,
    })
    .then((res) => {
      return res.data.data;
    });
};

export const deleteUser = async (id: number) => {
  return axios.delete(`${Api.UsersResource}/${id}`).then((res) => {
    return res.data.data;
  });
};
