'use client';
import { cn } from '@/utils/cn';
import type { InputHTMLAttributes } from 'react';
import * as React from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'email' | 'password' | 'hidden' | 'number' | 'search';
  className?: string;
  id: string;
  name: string;
  placeholder?: string;
  value?: string;
  autoComplete?: string;
  error?: string;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  function txtInput(
    {
      type = 'text',
      id,
      name,
      className,
      placeholder,
      value,
      autoComplete = 'on',
      error,
      ...props
    }: TextInputProps,
    ref
  ) {
    return (
      <>
        <input
          ref={ref}
          id={id}
          name={name}
          type={type}
          value={value}
          autoComplete={autoComplete}
          className={cn(
            className,
            'block w-full rounded-md border-gray-primary hover:border-gray-hover transition-colors bg-element text-gray-high-contrast shadow-sm placeholder:text-gray-base/80  sm:text-sm',
            'disabled:cursor-not-allowed disabled:opacity-40',
            'transition-colors hover:border-gray-hover',
            'focus-visible:border-gray-hover focus-visible:ring-2 focus-visible:ring-primary-hover focus-visible:ring-offset-2 focus-visible:ring-offset-app'
          )}
          placeholder={placeholder}
          {...props}
        />
        {error && (
          <p className="text-red-1100  mt-2 text-sm" id="email-error">
            {error}
          </p>
        )}
      </>
    );
  }
);
