import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "ADATA Compliance — ИИ-проверка контрагентов и санкционный скрининг",
  description:
    "ADATA Compliance — платформа AML/KYC due-diligence. Введите название компании, и ИИ-агент проверит её по международным базам и санкционным спискам, оценит уровень риска и покажет полное досье.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`dark ${openSans.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
