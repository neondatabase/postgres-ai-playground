'use client';
import { cn } from '@/utils/cn';
import * as React from 'react';
import type { HTMLAttributes } from 'react';

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  disabled?: boolean;
  size?: ButtonSize;
  appearance?: ButtonAppearance;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

export type ButtonSize = 'small' | 'medium' | 'large' | 'xlarge';

export type ButtonAppearance = 'primary' | 'secondary' | 'outlined' | 'danger';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Btn(
    {
      disabled = false,
      loading = false,
      size = 'medium',
      appearance = 'primary',
      children,
      className,
      leadingIcon,
      trailingIcon,
      type = 'button',
      ...props
    }: ButtonProps,
    ref
  ) {
    const computeStyles = (appearance: ButtonAppearance) => {
      switch (appearance) {
        case 'primary':
          return 'text-white bg-solid hover:bg-solid-hover border-transparent border';
        case 'secondary':
          return 'text-neutral-900 bg-neutral-200 hover:bg-neutral-300 border-2 border-transparent';
        case 'outlined':
          return 'border border-gray-primary hover:border-gray-hover hover:text-gray-high-contrast';
        case 'danger':
          return 'text-white bg-red-600 hover:bg-red-700 border-transparent border';
      }
    };

    return (
      <button
        type={type}
        ref={ref}
        disabled={disabled || loading}
        {...props}
        className={cn(
          computeStyles(appearance),
          size === 'small' && 'px-3 py-2 text-sm',
          size === 'medium' && 'px-4 py-2 text-sm ',
          size === 'large' && 'px-4 py-2.5 text-base',
          size === 'xlarge' && 'px-4 py-2.5 text-lg',
          'rounded-md disabled:cursor-not-allowed disabled:opacity-50',
          'relative inline-flex select-none items-center justify-between leading-4',
          'transition-colors duration-150 ease-in-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-hover focus-visible:ring-offset-2 focus-visible:ring-offset-app',
          className
        )}
      >
        {leadingIcon}
        {loading ? 'Loading...' : children}
        {trailingIcon}
      </button>
    );
  }
);
