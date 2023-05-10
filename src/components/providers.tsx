'use client';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="data-theme">
      <Toaster />
      {children}
    </ThemeProvider>
  );
}
