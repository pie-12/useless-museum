import { notFound } from "next/navigation";
import Link from "next/link";
import { MUSEUM_ROOMS } from "@/config/rooms.config";
import { VagueClock } from "@/rooms/vague-clock/VagueClock";
import { TiredKeyboard } from "@/rooms/tired-keyboard/TiredKeyboard";
import { UselessConverter } from "@/rooms/useless-converter/UselessConverter";
import { ScrollMile } from "@/rooms/scroll-mile/ScrollMile";
import { IdleBonsai } from "@/rooms/idle-bonsai/IdleBonsai";
import { BugQuiz } from "@/rooms/bug-quiz/BugQuiz";
import { Minus, Square, X } from "lucide-react";

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
      case "bug-quiz":
        return <BugQuiz />;
      default:
        return (
          <div className="max-w-md mx-auto my-12 px-2">
            {/* Hộp thoại Setup kiểu Windows 98 */}
            <div className="win98-box shadow-xl flex flex-col">
              {/* Title bar của hộp thoại Setup */}
              <div className="win98-titlebar text-xs">
                <div className="flex items-center gap-1.5 truncate">
                  <span>📦</span>
                  <span className="truncate">Setup.exe — [Phòng {room.roomNumber < 10 ? `0${room.roomNumber}` : room.roomNumber}]</span>
                </div>
              </div>

              {/* Thân hộp thoại */}
              <div className="p-5 bg-[#c0c0c0] flex flex-col items-center text-center font-mono">
                {/* Icon đĩa mềm / giải nén */}
                <div className="text-4xl mb-3 select-none">
                  💾
                </div>

                <p className="text-sm font-bold text-black mb-1">
                  {room.title}
                </p>

                {/* Dòng chữ tối thiểu */}
                <p className="text-xs text-gray-800 mb-3">
                  Đang giải nén... 99%
                </p>

                {/* Thanh tiến trình Win98 kẹt ở 99% */}
                <div className="w-full bg-white win98-window-sunken h-5 p-0.5 flex gap-0.5 mb-5 select-none">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-full ${
                        i < 23 ? "flex-1 bg-[#000080]" : "w-1.5 bg-transparent"
                      }`}
                    />
                  ))}
                </div>

                {/* Nút kiểu Win98 */}
                <div className="w-full flex justify-end gap-2 pt-2 border-t border-gray-400">
                  <Link
                    href="/"
                    className="win98-btn px-5 py-1 text-xs font-bold text-black text-center"
                  >
                    Hủy bỏ
                  </Link>
                </div>
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
            <Link href="/" className="hover:bg-[#000080] hover:text-white px-1.5 py-0.5 rounded flex items-center gap-1">
              <span>←</span>
              <span><u>Q</u>uay lại Desktop</span>
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
