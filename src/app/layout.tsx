import type { Metadata } from 'next';
import { IBM_Plex_Sans } from 'next/font/google';
import Script from 'next/script';
import Providers from '~/components/providers';
import { cn } from '~/lib/utils/cn';
import '~/styles/globals.css';

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://neon.tech/demos/playground'),
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
    url: 'https://neon.tech/demos/playground',
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
    site: 'https://neon.tech/demos/playground',
  },
};

const isProduction = process.env.NODE_ENV === 'production';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        {isProduction && (
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 'https://www.googletagmanager.com/gtm.js?id='+i+dl+'';f.parentNode.insertBefore(j,f); })(window,document,'script','dataLayer', 'GTM-MJLTK6F');
      `}
          </Script>
        )}
      </head>
      <body className={cn('bg-muted-app text-muted-base', ibmPlexSans.className)}>
        {isProduction && (
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MJLTK6F" height="0" width="0" style="display: none; visibility: hidden" aria-hidden="true"></iframe>`,
            }}
          />
        )}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
