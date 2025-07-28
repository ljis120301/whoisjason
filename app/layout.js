import { ThemeProvider } from '@/components/providers/theme-provider';
import localFont from "next/font/local";
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
      <body className={`${oxProto.variable} antialiased font-mono`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
