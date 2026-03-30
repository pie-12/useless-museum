import { notFound } from "next/navigation";
import Link from "next/link";
import { MUSEUM_ROOMS } from "@/config/rooms.config";
import { VagueClock } from "@/rooms/vague-clock/VagueClock";
import { TiredKeyboard } from "@/rooms/tired-keyboard/TiredKeyboard";
import { UselessConverter } from "@/rooms/useless-converter/UselessConverter";
import { ScrollMile } from "@/rooms/scroll-mile/ScrollMile";
import { IdleBonsai } from "@/rooms/idle-bonsai/IdleBonsai";
import { ArrowLeft, Dices, Hammer, Sparkles, Tag, Minus, Square, X } from "lucide-react";

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
      case "tired-keyboard":
        return <TiredKeyboard />;
      case "useless-converter":
        return <UselessConverter />;
      case "scroll-mile":
        return <ScrollMile />;
      case "idle-bonsai":
        return <IdleBonsai />;
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
    <div className="min-h-screen bg-[#008080] p-2 sm:p-6 flex flex-col items-center justify-start font-mono">
      {/* Cửa sổ ứng dụng Win98 */}
      <div className="w-full max-w-5xl win98-box shadow-2xl flex flex-col mb-6">
        {/* Title bar màu xanh chuẩn Win98 */}
        <div className="win98-titlebar text-xs">
          <div className="flex items-center gap-2">
            <span>💾</span>
            <span className="font-bold truncate">
              C:\ROOMS\Phong{room.roomNumber < 10 ? `0${room.roomNumber}` : room.roomNumber}_{room.id}.exe — [{room.title}]
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Link
              href="/"
              className="win98-btn w-4 h-4 text-black text-[10px] font-bold flex items-center justify-center"
              title="Thu nhỏ về desktop"
            >
              <Minus className="w-2.5 h-2.5" />
            </Link>
            <div
              className="win98-btn w-4 h-4 text-black text-[10px] font-bold flex items-center justify-center opacity-60 cursor-default"
            >
              <Square className="w-2 h-2" />
            </div>
            <Link
              href="/"
              className="win98-btn w-4 h-4 text-black text-[10px] font-bold flex items-center justify-center"
              title="Đóng phòng quay về desktop"
            >
              <X className="w-2.5 h-2.5" />
            </Link>
          </div>
        </div>

        {/* Thanh Menu giả lập */}
        <div className="bg-[#c0c0c0] border-b border-gray-400 px-2 py-0.5 flex items-center justify-between text-xs select-none">
          <div className="flex gap-3">
            <Link href="/" className="hover:bg-[#000080] hover:text-white px-1 rounded flex items-center gap-1">
              <span>←</span>
              <span className="underline">Q</span>uay lại Desktop
            </Link>
            <span className="text-gray-600 px-1 hidden sm:inline">
              Chủ đề: {room.styleTheme}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-700 hidden sm:inline">
              Trạng thái: 100% Vô dụng
            </span>
          </div>
        </div>

        {/* Nội dung bên trong cửa sổ */}
        <div className="bg-[#f4f4f4] text-black p-2 sm:p-6 overflow-y-auto">
          {renderRoomContent()}
        </div>

        {/* Status bar đáy cửa sổ */}
        <div className="bg-[#c0c0c0] border-t border-gray-400 px-3 py-1 flex items-center justify-between text-[11px] text-gray-600">
          <span>Phòng {room.roomNumber}/15 • {room.title}</span>
          <Link href="/" className="hover:underline text-black font-bold">
            [ Đóng cửa sổ ✕ ]
          </Link>
        </div>
      </div>
    </div>
  );
}
