import Providers from '@/components/providers';
import '../styles/globals.css';
import { Inter } from 'next/font/google';
import { cn } from '@/utils/cn';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Postgres AI Playground',
  description:
    'Postgres playground where you can connect to your database and use AI to generate SQL queries',
  openGraph: {
    type: 'website',
    url: 'https://postgres-ai-playground.vercel.app/',
    siteName: 'Postgres AI Playground',
    title: 'Postgres AI Playground',
    description:
      'Postgres playground where you can connect to your database and use AI to generate SQL queries',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Providers>
        <body className={cn(inter.className, 'bg-app text-gray-base')}>
          {children}
        </body>
      </Providers>
    </html>
  );
}
