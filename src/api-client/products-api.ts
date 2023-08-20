import { axiosClient } from '@/api-client';
import { ProductsParamsProps, ProductPayLoadProps } from '@/models';

export const productsApi = {
  getAll() {
    return axiosClient.get('/products');
  },
  getById(id: bigint) {
    return axiosClient.get(`products/${id}`);
  },
  getPerPage(params: ProductsParamsProps) {
    let url = `/products?page=${params.page}`;
    const nameFilter = params.nameFilter?.trim();

    if (params.limit) {
      url += `&limit=${params.limit}`;
    }

    if (nameFilter) {
      url += `&name_like=${nameFilter}`;
    }

    if (params.categoryIdFilter) {
      url += `&category_id=${params.categoryIdFilter}`;
    }

    if (params.brandIdFilter) {
      url += `&brand_id=${params.brandIdFilter}`;
    }

    if (params.hiddenFilter != null) {
      url += `&hidden=${params.hiddenFilter}`;
    }

    if (params.newFilter) {
      url += `&new=${params.newFilter}`;
    }

    if (params.featuredFilter) {
      url += `&featured=${params.featuredFilter}`;
    }

    if (params.bestsellerFilter) {
      url += `&bestseller=${params.bestsellerFilter}`;
    }

    if (params.freeshipFilter) {
      url += `&freeship=${params.freeshipFilter}`;
    }

    if (params.saleFilter) {
      url += '&discount_gt=0';
    }

    return axiosClient.get(url);
  },
  create(payload: ProductPayLoadProps) {
    return axiosClient.post('/products', payload);
  },
  update(id: bigint, payload: ProductPayLoadProps) {
    return axiosClient.patch(`/products/${id}`, payload);
  },
  delete(id: bigint) {
    return axiosClient.delete(`/products/${id}`);
  },
};
