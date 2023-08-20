import { MouseEventHandler } from 'react';

export interface ProductRowProps {
  thumbnail?: string;
  id: bigint;
  name: string;
  brand?: string;
  price: number | string;
  amount: number | string;
  createdAt: string;
  updatedAt: string;
  onDelete: MouseEventHandler<HTMLDivElement>;
  onEdit: MouseEventHandler<HTMLDivElement>;
}

export interface SpecificationData {
  name: string;
  value: string;
}

export interface ProductImageData {
  url: string;
  on_top: number;
}

export interface ProductPayLoadProps {
  name: string;
  short_desc?: string;
  quantity?: number | null;
  unit?: string;
  warranty?: number | null;
  price?: number | null;
  discount?: number | null;
  start_at?: string | null;
  end_at?: string | null;
  category_id: number;
  brand_id?: number | null;
  feature?: string;
  specification?: SpecificationData[];
  hidden?: 0 | 1;
  new?: 0 | 1;
  featured?: 0 | 1;
  bestseller?: 0 | 1;
  freeship?: 0 | 1;
  thumbnail?: string;
  product_image?: ProductImageData[];
}

export interface ProductsParamsProps {
  page: number;
  limit?: number;
  nameFilter?: string;
  categoryIdFilter?: number;
  brandIdFilter?: number;
  hiddenFilter?: 0 | 1 | null;
  newFilter?: null | 1;
  featuredFilter?: null | 1;
  freeshipFilter?: null | 1;
  bestsellerFilter?: null | 1;
  saleFilter?: null | 1;
}

export interface ProductsData {
  id: bigint;
  name: string;
  thumbnail?: string;
  brand_name?: string;
  quantity?: number;
  price?: number;
  created_at: string;
  updated_at: string;
}

export interface ProductData {
  name: string;
  short_desc?: string;
  quantity?: number | null;
  unit?: string;
  warranty?: number | null;
  price?: number | null;
  discount?: number | null;
  start_at?: string;
  end_at?: string;
  category_id: number;
  brand_id?: number | null;
  category_name: string;
  brand_name?: string;
  feature?: string;
  specification?: SpecificationData[];
  product_image?: ProductImageData[];
  hidden?: 0 | 1;
  new?: 0 | 1;
  featured?: 0 | 1;
  bestseller?: 0 | 1;
  freeship?: 0 | 1;
  thumbnail?: string;
}
