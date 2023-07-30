import { NextPage } from 'next';
import { AppProps } from 'next/app';
import {
  ReactElement,
  ReactNode,
  MouseEventHandler,
  EventHandler,
  ChangeEvent,
  ChangeEventHandler,
} from 'react';

export interface LayoutProps {
  children: ReactNode;
  className?: string;
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

export interface AuthProps {
  children: ReactNode;
  isAdminPage: boolean;
}

export interface LoadingProps {
  className?: string;
}
