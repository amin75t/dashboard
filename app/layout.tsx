import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


const geistMono = Geist_Mono({
  variable: "--font-vazir",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "مدیریت سفارشات",
  description: "مدیریت سفارشات",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa">
      <body
        className={` ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
