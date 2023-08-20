import axios from 'axios';

const axiosClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const ImportApi = {
  insertProducts(formData: FormData) {
    return axiosClient.post('/import/products', formData);
  },
};
