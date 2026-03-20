import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bảo Tàng Đồ Vô Dụng (Useless Museum 98)",
  description: "Bảo tồn và trưng bày những sáng kiến phần mềm vô nghĩa nhưng vui nhộn nhất trên Internet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={beVietnamPro.variable}>
      <body className="font-sans antialiased bg-[#008080] text-black min-h-screen select-none overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
