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
      <body className="vintage-paper min-h-screen flex flex-col text-museum-ink antialiased selection:bg-[#ecd9c6] selection:text-museum-wood">
        <MuseumHeader />
        <main className="flex-1">{children}</main>
        <MuseumFooter />
      </body>
    </html>
  );
}
