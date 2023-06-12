import React from 'react';
import Providers from '@/components/providers';
import '../styles/globals.css';
import { Inter } from 'next/font/google';
import { cn } from '@/utils/cn';
import { Metadata } from 'next';
import { env } from '@/env.mjs';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL ?? ''),
  title: 'Postgres AI Playground',
  description:
    'Postgres playground where you can connect to your database and use AI to generate SQL queries',
  keywords: [
    'Postgres',
    'SQL Playground',
    'Postgres AI',
    'Postgres Playground',
    'Postgres AI Playground',
    'Postgres SQL Playground',
    'Postgres SQL AI Playground',
  ],
  openGraph: {
    images: ['/images/og.png'],
    url: 'https://postgres-ai-playground.vercel.app/',
    title: 'Postgres AI Playground',
    description:
      'Postgres playground where you can connect to your database and use AI to generate SQL queries',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Postgres AI Playground',
    description:
      'Postgres playground where you can connect to your database and use AI to generate SQL queries',
    images: ['/images/og.png'],
    creator: 'Neon.tech',
    creatorId: '@neondatabase',
    site: 'https://postgres-ai-playground.vercel.app/',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn(inter.className, 'bg-app text-gray-base')}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
