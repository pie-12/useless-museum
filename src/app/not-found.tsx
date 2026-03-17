import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto my-24 px-4 text-center font-mono">
      <div className="border border-black p-8 sm:p-12 bg-white">
        <p className="text-xs uppercase tracking-widest text-neutral-400 mb-2">
          [ LỖI 404 • HIỆN VẬT KHÔNG TỒN TẠI ]
        </p>

        <h2 className="font-serif font-black text-3xl sm:text-4xl text-black uppercase mb-4">
          Bức Tường Trống.
        </h2>

        <p className="text-xs text-neutral-500 font-sans leading-relaxed mb-8">
          Không tìm thấy gian phòng này trong danh mục lưu trữ của bảo tàng. Quý khách vui lòng kiểm tra lại số phòng hoặc quay trở về sảnh chính.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-neutral-800 text-xs font-mono uppercase tracking-wider font-semibold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Về Sảnh Triển Lãm</span>
        </Link>
      </div>
    </div>
  );
}
