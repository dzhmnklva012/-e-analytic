import type { Metadata, Viewport } from "next";
import { Open_Sans } from "next/font/google";
import Script from "next/script";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider, themeInitScript } from "@/components/theme-provider";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: "Статистика — ADATA Compliance",
  description:
    "Сводная статистика модулей системы ADATA Compliance: задачи, файлы, горячая линия, расследования, конфликт интересов и подарки.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${openSans.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <ThemeProvider>
          <TooltipProvider delay={200}>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
