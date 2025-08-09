import { ThemeProvider } from '@/components/providers/theme-provider';
import localFont from "next/font/local";
import Script from 'next/script';
import { ADSENSE_CLIENT } from '@/lib/adsense';
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
        <Script
          id="adsense-script"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${oxProto.variable} antialiased font-mono`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
