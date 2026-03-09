import Link from "next/link";
import { Landmark, Compass, Sparkles, Code2 } from "lucide-react";

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
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span className="hidden md:inline">Mã nguồn</span>
          </a>
        </div>
      </div>
    </header>
  );
}
