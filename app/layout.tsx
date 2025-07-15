import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const geistMono = Geist_Mono({
  variable: "--font-vazir",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "مدیریت",
  description: "مدیریت",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa">
      <body className={`${geistMono.variable} antialiased`}>
        <div className="flex items-start justify-end">
          <div className="flex-1">{children}</div>
           <Sidebar /> 
        </div>
      </body>
    </html>
  );
}
