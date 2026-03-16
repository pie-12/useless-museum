import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function MuseumHeader() {
  return (
    <header className="border-b border-black/10 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        {/* Gallery Masthead */}
        <Link href="/" className="group flex items-baseline gap-3">
          <span className="font-mono text-xs tracking-widest font-black uppercase text-black bg-black text-white px-1.5 py-0.5">
            UM
          </span>
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
            <span className="font-serif font-black tracking-tight text-lg sm:text-xl text-black uppercase group-hover:opacity-70 transition-opacity">
              Bảo Tàng Đồ Vô Dụng
            </span>
            <span className="font-mono text-[10px] text-neutral-400 tracking-widest uppercase">
              / Permanent Collection
            </span>
          </div>
        </Link>

        {/* Gallery Navigation / Meta Info */}
        <div className="flex items-center gap-4 sm:gap-6 font-mono text-xs">
          <span className="hidden md:inline-block text-[11px] text-neutral-500 uppercase tracking-widest">
            Vé vào cửa: 0.00 VNĐ
          </span>
          <a
            href="https://github.com/pie-12/useless-museum"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-black hover:text-neutral-500 transition-colors uppercase tracking-wider text-[11px] font-semibold border-b border-black pb-0.5"
          >
            <span>Mã nguồn</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </header>
  );
}
