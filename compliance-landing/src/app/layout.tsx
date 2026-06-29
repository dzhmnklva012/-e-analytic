import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "ADATA Compliance — ИИ-проверка контрагентов и санкционный скрининг",
  description:
    "ADATA Compliance — платформа комплаенса и проверки контрагентов на базе ИИ. Введите название компании — проверим по международным базам и санкционным спискам, оценим риск и покажем досье.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${openSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
