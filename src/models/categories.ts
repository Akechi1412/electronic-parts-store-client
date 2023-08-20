import { MouseEventHandler } from 'react';

export interface CategoryPayloadProps {
  name: string;
  parent_id?: number | null;
  thumbnail?: string;
}

export interface CategoriesData {
  id: number;
  parent_id: number;
  parent_name: string;
  name: string;
  thumbnail: string;
  created_at: string;
  updated_at: string;
}

export interface CategoryData {
  id: number;
  parent_id?: number | null;
  parent_name?: string | null;
  name: string;
  thumbnail?: string | null;
}

export interface CategoriesParamsProps {
  page: number;
  limit?: number;
  nameFilter?: string;
}

export interface CategoryRowProps {
  id: number;
  name: string;
  parent: string;
  createdAt: string;
  updatedAt: string;
  onDelete: MouseEventHandler<HTMLDivElement>;
  onEdit: MouseEventHandler<HTMLDivElement>;
}

export interface CategoriesTreeProps {
  categories: any[];
  parentCategoryId?: number | null;
  indentLevel?: number;
  onClick?: (categoryId: number) => void;
}
