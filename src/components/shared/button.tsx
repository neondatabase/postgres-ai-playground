'use client';
import { cn } from '@/utils/cn';
import * as React from 'react';
import type { HTMLAttributes } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from 'framer-motion';

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
        <BorderMask width={2}>
          <AnimatePresence>
            {loading && (
              <BorderFollower>
                <div className="dark:bg-gradient-radial-dark h-20 w-20 opacity-30" />
              </BorderFollower>
            )}
          </AnimatePresence>
        </BorderMask>
        {loading ? 'Loading...' : children}
        {trailingIcon}
      </button>
    );
  }
);

interface BorderMaskProps {
  width: string | number;
  radius?: string | number;
  children?: React.ReactNode;
}

const BorderMask = ({
  width,
  radius = 'inherit',
  children,
  ...otherProps
}: BorderMaskProps) => {
  const widthWithUnit = typeof width === 'number' ? width + 'px' : width;
  return (
    <div
      style={{
        inset: `calc(-1 * ${widthWithUnit})`,
        borderWidth: width,
        borderRadius: 'inherit',
        WebkitMask:
          'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
      }}
      className={cn('pointer-events-none absolute  border-transparent')}
      {...otherProps}
    >
      <div
        className="absolute overflow-hidden"
        style={{
          inset: `calc(-1 * ${widthWithUnit})`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

const BorderFollower = ({
  children,
  duration = 2000,
  radius,
  ...otherProps
}: any) => {
  const pathRef = React.useRef<SVGRectElement>();
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).x
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).y
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <svg
      className="absolute h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      {...otherProps}
    >
      <rect
        fill="none"
        className={`rounded-[${radius}]`}
        width="100%"
        height="100%"
        ref={pathRef}
      />
      <foreignObject x="0" y="0" width="100%" height="100%">
        <motion.div
          className="bg-radial-gradient"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            display: 'inline-block',
            transform,
          }}
        >
          {children}
        </motion.div>
      </foreignObject>
    </svg>
  );
};
