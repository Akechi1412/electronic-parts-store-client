import { axiosClient } from '@/api-client';
import { CategoriesParamsProps, CategoryPayloadProps } from '@/models';

export const categoriesApi = {
  getAll() {
    return axiosClient.get('/categories');
  },
  getAllWithoutProducts() {
    return axiosClient.get('/categories/without-products');
  },
  getById(id: number) {
    return axiosClient.get(`categories/${id}`);
  },
  getPerPage(params: CategoriesParamsProps) {
    let url = `/categories?page=${params.page}`;
    const nameFilter = params.nameFilter?.trim();

    if (params.limit) {
      url += `&limit=${params.limit}`;
    }

    if (nameFilter) {
      url += `&name_like=${nameFilter}`;
    }
    return axiosClient.get(url);
  },
  create(payload: CategoryPayloadProps) {
    return axiosClient.post('/categories', payload);
  },
  update(id: number, payload: CategoryPayloadProps) {
    return axiosClient.patch(`/categories/${id}`, payload);
  },
  delete(id: number) {
    return axiosClient.delete(`/categories/${id}`);
  },
};
