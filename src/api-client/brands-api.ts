import { axiosClient } from '@/api-client';
import { BrandsParamsProps, BrandPayloadProps } from '@/models';

export const brandsApi = {
  getAll() {
    return axiosClient.get('/brands');
  },
  getById(id: number) {
    return axiosClient.get(`brands/${id}`);
  },
  getPerPage(params: BrandsParamsProps) {
    let url = `/brands?page=${params.page}`;
    const nameFilter = params.nameFilter?.trim();

    if (params.limit) {
      url += `&limit=${params.limit}`;
    }

    if (nameFilter) {
      url += `&name_like=${nameFilter}`;
    }
    return axiosClient.get(url);
  },
  create(payload: BrandPayloadProps) {
    return axiosClient.post('/brands', payload);
  },
  update(id: number, payload: BrandPayloadProps) {
    return axiosClient.patch(`/brands/${id}`, payload);
  },
  delete(id: number) {
    return axiosClient.delete(`/brands/${id}`);
  },
};
