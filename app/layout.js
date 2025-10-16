import { ThemeProvider } from '@/components/providers/theme-provider';
import localFont from "next/font/local";
import Script from 'next/script';
import { ADMAVEN_CLIENT } from '@/lib/admaven';
import ConsentBanner from '@/components/ConsentBanner';
import { Toaster } from '@/components/ui/toaster';
import "./globals.css";

// Import startup initialization - this runs when the app starts
import './startup.js';

const oxProto = localFont({
  src: "./fonts/0xProtoNerdFontMono-Regular.ttf",
  variable: "--font-oxproto",
  weight: "400",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name='admaven-placement' content='Bqja6rHaE' />
        <meta name="admaven-account" content={ADMAVEN_CLIENT} />
        <link rel="preconnect" href="https://admaven.com" crossOrigin="anonymous" />
        {/* Consent Mode default (required to run before GA/ads) */}
        <Script id="consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'ad_storage': 'denied',
              'analytics_storage': 'denied'
            });
          `}
        </Script>
        {/* Admaven script */}
        <Script
          src="https://admaven.com/ads.js"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${oxProto.variable} antialiased font-mono`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <ConsentBanner />
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
