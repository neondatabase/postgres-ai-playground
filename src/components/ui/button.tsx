import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '~/lib/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-offset-2 focus-visible:ring-offset-muted-app',
  {
    variants: {
      variant: {
        default: 'bg-primary-solid text-white shadow hover:bg-solid-hover',
        danger: 'bg-danger-solid text-white shadow-sm hover:bg-danger-solid-hover',
        outline:
          'text-muted-base border border-muted border-muted-hover shadow-sm hover:text-muted-high-contrast',
        secondary:
          'bg-primary-element text-primary-high-contrast shadow-sm hover:bg-muted-element-hover',
        ghost: 'hover:bg-muted-element-hover hover:text-muted-high-contrast',
        link: 'text-primary-base underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
