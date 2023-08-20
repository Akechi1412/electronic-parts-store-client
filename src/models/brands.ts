import { MouseEventHandler } from 'react';

export interface BrandRowProps {
  id: number;
  name: string;
  logo: string;
  createdAt: string;
  updatedAt: string;
  onDelete: MouseEventHandler<HTMLDivElement>;
  onEdit: MouseEventHandler<HTMLDivElement>;
}

export interface BrandsData {
  id: number;
  name: string;
  logo?: string;
  created_at: string;
  updated_at: string;
}

export interface BrandData {
  id: number;
  name: string;
  logo?: string | null;
  description?: string | null;
}

export interface BrandPayloadProps {
  name: string;
  logo?: string;
  description?: string;
}

export interface BrandsParamsProps {
  page: number;
  limit?: number;
  nameFilter?: string;
}
