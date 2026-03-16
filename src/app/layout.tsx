import type { Metadata } from "next";
import "./globals.css";
import { MuseumHeader } from "@/components/MuseumHeader";
import { MuseumFooter } from "@/components/MuseumFooter";

export const metadata: Metadata = {
  title: "Bảo Tàng Đồ Vô Dụng (Useless Museum)",
  description: "Bảo tồn và trưng bày những sáng kiến phần mềm vô nghĩa nhưng vui nhộn nhất trên Internet.",
  keywords: ["useless web", "bảo tàng vô dụng", "pet project", "hài hước", "lập trình viên"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="bg-white text-neutral-900 min-h-screen flex flex-col antialiased selection:bg-black selection:text-white">
        <MuseumHeader />
        <main className="flex-1">{children}</main>
        <MuseumFooter />
      </body>
    </html>
  );
}
