import axios from 'axios';
import { blob } from 'stream/consumers';

const axiosClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'Content-Disposition': 'attachment; filename=products.xlsx',
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

export const ExportApi = {
  getProductsFile() {
    return axiosClient.get('/export/products', { responseType: 'blob' });
  },
};
