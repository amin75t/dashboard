import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
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
      <body className={` antialiased BYekan`}>
        <div className="flex items-start justify-end">
          <div className="flex-1">{children}</div>
          <Sidebar />
        </div>
      </body>
    </html>
  );
}
