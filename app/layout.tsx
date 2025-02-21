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
  keywords: ["психолог", "психотерапия", "консультации", "Израиль", "онлайн терапия"], 
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
     <body
       className={`${geistSans.variable} ${geistMono.variable} antialiased`}
     >
       {children}
     </body>
   </html>
 );
}