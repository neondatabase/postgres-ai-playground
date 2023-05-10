'use client';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="data-theme">
      <Analytics />
      <Toaster />
      {children}
    </ThemeProvider>
  );
}
