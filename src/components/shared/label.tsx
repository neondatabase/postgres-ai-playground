'use client';
import { Root } from '@radix-ui/react-label';
import { cn } from '@/utils/cn';
import type { FC, LabelHTMLAttributes } from 'react';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md';
}

export const Label: FC<Readonly<LabelProps>> = ({
  children,
  className,
  htmlFor,
  size = 'medium',
  ...props
}) => (
  <Root
    {...props}
    className={cn('block', className, `text-${size}`)}
    htmlFor={htmlFor}
  >
    {children}
  </Root>
);
