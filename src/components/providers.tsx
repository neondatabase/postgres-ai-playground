'use client';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/query-client';

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="data-theme">
      <QueryClientProvider client={queryClient}>
        <Analytics />
        <Toaster
          containerStyle={{}}
          position="bottom-right"
          toastOptions={{
            success: {
              style: {
                color: 'var(--color-text-gray-base)',
                backgroundColor: 'var(--color-bg-element)',
              },
              duration: 4000,
            },
            error: {
              style: {
                color: 'var(--color-text-gray-base)',
                backgroundColor: 'var(--color-bg-element)',
              },
              duration: 4000,
            },
          }}
        />
        {children}
      </QueryClientProvider>
    </ThemeProvider>
  );
}
