"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

export default function RoomError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Lỗi phòng trưng bày:", error);
  }, [error]);

  return (
    <div className="max-w-xl mx-auto my-16 px-4">
      <div className="bg-[#fff9f9] border-2 border-dashed border-[#e6b8b8] rounded-2xl p-8 text-center shadow-ticket">
        <div className="w-16 h-16 rounded-full bg-[#fce8e8] text-museum-stamp flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <span className="text-xs font-mono uppercase tracking-widest text-museum-stamp font-bold">
          ★ BIỂN BÁO BẢO TRÌ ĐỘT XUẤT ★
        </span>

        <h2 className="font-serif font-black text-2xl text-museum-wood mt-2 mb-3">
          Gian Trưng Bày Đang Tạm Đóng Cửa
        </h2>

        <p className="text-sm text-museum-sepia leading-relaxed mb-6">
          Có vẻ như một hiện vật vô dụng trong căn phòng này vừa bị rơi vỡ hoặc kỹ sư bảo tàng vô tình đá phải dây điện. 
          Toàn bộ các phòng khác vẫn an toàn và mở cửa bình thường!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-museum-wood hover:bg-museum-sepia text-white font-serif text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Thử Mở Lại Cửa</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#efe7d8] hover:bg-[#e4dac7] text-museum-wood border border-[#d5c7b3] font-serif text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Quay Về Sảnh Chính</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
