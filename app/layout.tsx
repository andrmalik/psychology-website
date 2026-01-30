import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { Analytics } from "@vercel/analytics/next"

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
  title: "מורה פרטי למטמטיקה - אנדרי מליק",
  description: "מורה פרטי למתמטיקה – שיעורים אישיים, הכנה לבגרות ויח״ל, חיזוק היסודות והעמקת הידע. ליווי מקצועי, יחס אישי ותמיכה לאורך כל הדרך.",
  applicationName: "מורה פרטי למטמטיקה - אנדרי מליק",
  keywords: ["מורה פרטי", "מטמטיקה", "מורה פרטי למטמטיקה", "בגרות", "מורה לבגרות", "ורה פרטי לבגות", "5 יחידות", "מורה פרטי 5 יחידות בגרות", "בגרות מורה"], 
  openGraph: {
    title: "מורה פרטי למטטיקה - אנדרי מליקг",
    description: "מורה פרטי למתמטיקה – שיעורים אישיים והכנה לבגרות",
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
    <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
    <meta name="theme-color" content="#0a0a0a" media="(prefers-color-scheme: dark)" />
    
    <meta name="msapplication-navbutton-color" content="#ffffff" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    
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