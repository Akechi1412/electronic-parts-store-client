import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode, MouseEventHandler, ChangeEventHandler } from 'react';

export interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export interface ToggleLayoutProps extends LayoutProps {
  title: string;
}

export type NextPageWithLayout = NextPage & {
  Layout?: (props: LayoutProps) => ReactElement;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export interface InputProps {
  type: 'text' | 'password' | 'email';
  hasEye?: boolean;
  value?: string;
  placeholder?: string;
  className?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: ChangeEventHandler<HTMLInputElement>;
  onClickEye?: MouseEventHandler<HTMLImageElement>;
}

export interface ButtonPureProps {
  title: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  secondary?: boolean;
}

export interface ButtonProps extends ButtonPureProps {
  href?: string;
}

export interface AddButtonProps {
  title: string;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export interface LoadingProps {
  className?: string;
}

export interface SideItemProps {
  title: string;
  iconSrc: string;
  activeIconSrc: string;
  isExpanded: boolean;
  isActive: boolean;
  href?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export interface ImageUploadProps {
  onFileSelected: (file: File) => void;
  width: number;
  height: number;
  initialImage?: string;
}

export interface MultiImagesData {
  file?: File;
  url?: string;
}

export interface MultiImagesUploadProps {
  className?: string;
  itemClassName?: string;
  initImagesData: MultiImagesData[];
  onImagesChange: (data: MultiImagesData[]) => void;
}

export interface ExcelUploadProps {
  onFileSelected: (file: File) => void;
  onSubmit: MouseEventHandler<HTMLButtonElement>;
  width: number;
  height: number;
  className?: string;
  initialFile?: File;
}

export interface InputsData {
  input1: string;
  input2: string;
}

export interface DynamicInputsProps {
  className?: string;
  placeholderInput1: string;
  placeholderInput2: string;
  initInputs: InputsData[];
  onInputsChange: (data: InputsData[]) => void;
}
