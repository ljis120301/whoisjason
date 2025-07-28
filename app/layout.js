import { ThemeProvider } from '@/components/providers/theme-provider';
import localFont from "next/font/local";
import "./globals.css";

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
