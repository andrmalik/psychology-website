import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Inter } from 'next/font/google';
import Head from 'next/head';

const geistSans = Geist({
 variable: "--font-geist-sans",
 subsets: ["latin"],
});

const geistMono = Geist_Mono({
 variable: "--font-geist-mono",
 subsets: ["latin"],
});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Андрей Малик - Психолог | Консультации онлайн",
  description: "Психологическая помощь и консультации. Индивидуальная терапия онлайн и в Израиле. Эмоционально-образная терапия, КПТ.",
  applicationName: "Андрей Малик - Психолог",
  keywords: ["психолог", "психотерапия", "консультации", "Израиль", "онлайн терапия", "терапия"], 
  openGraph: {
    title: "Андрей Малик - Психолог",
    description: "Психологическая помощь и консультации онлайн",
    type: "website",
    url: "https://andrewmalik.com",
  }
,
 robots: {
   index: true,
   follow: true,
 },
 icons: {
   icon: "favicon.ico",
   apple: "apple-icon.png",
 },
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
return (
  <html lang="ru">
    <head>
      <meta name="theme-color" content="#f6f2ec" />
      <meta name="msapplication-navbutton-color" content="#f6f2ec" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="theme-color" content="#f6f2ec" media="(prefers-color-scheme: light)" />
      <meta name="theme-color" content="#0a0a0a" media="(prefers-color-scheme: dark)" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    </head>
    <body className="antialiased">

       {children}
     </body>
   </html>
 );
}