import { ThemeProvider } from '@/components/providers/theme-provider';
import localFont from "next/font/local";
import Script from 'next/script';
import { ADSENSE_CLIENT } from '@/lib/adsense';
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
        <meta name="google-adsense-account" content={ADSENSE_CLIENT} />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://googleads.g.doubleclick.net" crossOrigin="anonymous" />
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
        {/* Intentionally omit AdSense script here; it is conditionally initialized client-side by AdSlot only on non-onion hosts */}
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
