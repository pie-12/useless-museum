import { notFound } from "next/navigation";
import Link from "next/link";
import { MUSEUM_ROOMS } from "@/config/rooms.config";
import { VagueClock } from "@/rooms/vague-clock/VagueClock";
import { TiredKeyboard } from "@/rooms/tired-keyboard/TiredKeyboard";
import { UselessConverter } from "@/rooms/useless-converter/UselessConverter";
import { VagueClock } from "@/rooms/vague-clock/VagueClock";
import { ArrowLeft, Dices, Hammer, Sparkles, Tag } from "lucide-react";

interface RoomPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return MUSEUM_ROOMS.map((room) => ({
    slug: room.id,
  }));
}

export default async function RoomPage({ params }: RoomPageProps) {
  const { slug } = await params;
  const room = MUSEUM_ROOMS.find((r) => r.id === slug);

  if (!room) {
    notFound();
  }

  // Khớp slug với component tương ứng
  const renderRoomContent = () => {
    switch (room.id) {
      case "vague-clock":
        return <VagueClock />;
      case "vague-clock":
        return <VagueClock />;
      case "tired-keyboard":
        return <TiredKeyboard />;
      case "useless-converter":
        return <UselessConverter />;
      default:
        return (
          <div className="max-w-xl mx-auto my-12 px-4 text-center">
            <div className="bg-[#fffdf9] border-2 border-dashed border-[#d8c8b0] rounded-3xl p-8 sm:p-12 shadow-ticket">
              <div className="w-16 h-16 rounded-full bg-[#f4ece0] text-museum-wood flex items-center justify-center mx-auto mb-4">
                <Hammer className="w-8 h-8 text-museum-stamp animate-bounce" />
              </div>

              <span className="text-xs font-mono uppercase tracking-widest text-museum-stamp font-bold">
                ★ PHÒNG TRIỂN LÃM ĐANG DÀN DỰNG ★
              </span>

              <h2 className="font-serif font-black text-2xl sm:text-3xl text-museum-wood mt-2 mb-3">
                {room.title}
              </h2>

              <p className="text-xs font-serif italic text-museum-sepia mb-4">
                "{room.tagline}"
              </p>

              <div className="bg-[#f9f5ec] border border-[#e8ddcb] rounded-2xl p-4 text-xs text-museum-sepia text-left leading-relaxed mb-6">
                <p className="font-bold text-museum-wood mb-1">Mô tả dự kiến:</p>
                <p>{room.description}</p>
                <div className="mt-3 pt-3 border-t border-[#e2d6c0] flex items-center justify-between text-[11px] font-mono">
                  <span>Kỹ sư phụ trách: {room.author}</span>
                  <span className="capitalize">Theme: {room.styleTheme}</span>
                </div>
              </div>

              <p className="text-xs font-mono text-museum-sepia mb-6">
                Các nghệ nhân bảo tàng đang gõ từng dòng code để sớm ra mắt quý khách.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-museum-wood hover:bg-museum-sepia text-white font-serif text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Quay Lại Sảnh Chính</span>
                </Link>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex flex-col justify-between">
      {/* Thanh điều hướng nhanh phía trên phòng */}
      <div className="border-b border-[#dfd6c6] bg-[#f8f3e9]/60 px-4 py-2.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-serif font-bold text-museum-sepia hover:text-museum-wood transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Sảnh chính</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-museum-sepia hidden sm:inline">Bạn đang ở:</span>
            <span className="font-bold text-museum-stamp bg-[#f7e6e6] px-2 py-0.5 rounded border border-[#f0cccc]">
              Phòng {room.roomNumber < 10 ? `0${room.roomNumber}` : room.roomNumber}: {room.title}
            </span>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs font-mono text-museum-wood hover:text-museum-stamp transition-colors"
          >
            <Dices className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Phòng khác</span>
          </Link>
        </div>
      </div>

      {/* Nội dung phòng trưng bày */}
      <div className="flex-1 py-6">{renderRoomContent()}</div>
    </div>
  );
}