'use client';
import { ThemeProvider } from 'next-themes';

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return <ThemeProvider attribute="data-theme">{children}</ThemeProvider>;
}
