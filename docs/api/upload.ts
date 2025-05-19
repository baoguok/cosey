import axios, { type AxiosRequestConfig } from 'axios';

export const upload = async (data: Blob, config?: AxiosRequestConfig) => {
  const formData = new FormData();
  formData.append('file', data);
  formData.append('module', 'public');
  formData.append('file_type', 'image');

  return axios.post('/mock/api/upload', formData, config).then((res) => {
    return res.data.data.list[0].file_url;
  });
};
