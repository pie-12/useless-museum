import Link from "next/link";
import { Landmark, Compass, Github, Sparkles } from "lucide-react";

export function MuseumHeader() {
  return (
    <header className="border-b border-[#d8d0c0] bg-[#fdfbf7]/90 backdrop-blur sticky top-0 z-50 transition-all">
      <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between gap-4">
        {/* Logo / Museum Identity */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-museum-wood text-museum-paper flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Landmark className="w-5 h-5 text-[#f0e6d2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-black text-lg sm:text-xl tracking-tight text-museum-wood group-hover:text-museum-stamp transition-colors">
                BẢO TÀNG ĐỒ VÔ DỤNG
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#ebdccb] text-[#5a3a29] border border-[#d8c4ad] font-semibold">
                Vé 0đ
              </span>
            </div>
            <p className="text-xs text-museum-sepia hidden sm:block">
              Nơi bảo tồn những sáng kiến vô nghĩa nhất của nhân loại
            </p>
          </div>
        </Link>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://github.com/pie-12/useless-museum"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-md border border-[#cfc4b0] bg-[#f5ede0] hover:bg-[#ede2d0] text-museum-ink transition-colors"
          >
            <Github className="w-4 h-4" />
            <span className="hidden md:inline">Mã nguồn</span>
          </a>
        </div>
      </div>
    </header>
  );
}
