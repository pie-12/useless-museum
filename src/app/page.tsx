"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MUSEUM_ROOMS } from "@/config/rooms.config";
import { 
  Monitor, 
  Trash2, 
  HelpCircle, 
  X, 
  Minus, 
  Square, 
  Folder, 
  Terminal, 
  Clock, 
  Calculator, 
  Volume2, 
  Dices, 
  Power, 
  Sparkles,
  Info,
  Maximize2
} from "lucide-react";

export default function Win98Desktop() {
  const router = useRouter();
  const [selectedIcon, setSelectedIcon] = useState<string | null>("welcome");
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(true);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Xử lý mở phòng (Double-click hoặc bấm nút Mở)
  const handleOpenRoom = (roomId: string) => {
    const room = MUSEUM_ROOMS.find((r) => r.id === roomId);
    if (!room) return;

    if (room.status === "open") {
      router.push(`/rooms/${room.id}`);
    } else {
      setAlertMessage(
        `[THÔNG BÁO TỪ ĐĨA MỀM A:\\]\n\nPhòng "${room.title}" hiện đang được các kỹ sư giải nén từ đĩa mềm 1.44 MB.\n\nTrạng thái: Đang chuẩn bị ra mắt. Quý khách vui lòng ghé thăm các phòng có sẵn!`
      );
    }
  };

  // Nút dịch chuyển ngẫu nhiên
  const handleRandomRoom = () => {
    setIsStartOpen(false);
    const openRooms = MUSEUM_ROOMS.filter((r) => r.status === "open");
    if (openRooms.length === 0) return;
    const randomIndex = Math.floor(Math.random() * openRooms.length);
    router.push(`/rooms/${openRooms[randomIndex].id}`);
  };

  const getIconForRoom = (index: number) => {
    switch (index) {
      case 1: return "🔘";
      case 2: return "🕰️";
      case 3: return "📏";
      case 4: return "📝";
      case 5: return "☕";
      case 6: return "💺";
      case 7: return "👾";
      case 8: return "📜";
      case 9: return "🎵";
      case 10: return "⌨️";
      case 11: return "🪴";
      case 12: return "📜";
      case 13: return "🚗";
      case 14: return "💬";
      case 15: return "🐛";
      default: return "💾";
    }
  };

  return (
    <div 
      className="min-h-screen bg-[#008080] text-black font-sans relative overflow-hidden pb-12 select-none"
      onClick={() => {
        if (isStartOpen) setIsStartOpen(false);
      }}
    >
      {/* Vùng Desktop Icons */}
      <main className="p-3 sm:p-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 sm:gap-6 z-10 relative">
        {/* Icon My Computer / Cửa sổ chính */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            setSelectedIcon("computer");
          }}
          onDoubleClick={(e) => {
            e.stopPropagation();
            setIsWelcomeOpen(true);
          }}
          className={`flex flex-col items-center justify-center p-2 rounded cursor-pointer text-center w-24 sm:w-28 group transition-colors ${
            selectedIcon === "computer" ? "bg-[#000080]/80 text-white" : "hover:bg-white/10 text-white"
          }`}
        >
          <div className="text-3xl sm:text-4xl mb-1 filter drop-shadow">🖥️</div>
          <span className="text-[11px] sm:text-xs font-mono font-medium leading-tight px-1 rounded break-words">
            Bảo Tàng (C:)
          </span>
        </div>

        {/* Icon Thùng rác */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            setSelectedIcon("recycle");
          }}
          onDoubleClick={(e) => {
            e.stopPropagation();
            setAlertMessage("Thùng rác trống rỗng!\n\nKhông có gì ở đây ngoài những dòng code dở dang và deadline cũ.");
          }}
          className={`flex flex-col items-center justify-center p-2 rounded cursor-pointer text-center w-24 sm:w-28 group transition-colors ${
            selectedIcon === "recycle" ? "bg-[#000080]/80 text-white" : "hover:bg-white/10 text-white"
          }`}
        >
          <div className="text-3xl sm:text-4xl mb-1 filter drop-shadow">🗑️</div>
          <span className="text-[11px] sm:text-xs font-mono font-medium leading-tight px-1 rounded">
            Thùng Rác
          </span>
        </div>

        {/* 15 Icon của 15 phòng bảo tàng */}
        {MUSEUM_ROOMS.map((room) => {
          const isSelected = selectedIcon === room.id;
          const isOpen = room.status === "open";

          return (
            <div
              key={room.id}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIcon(room.id);
              }}
              onDoubleClick={(e) => {
                e.stopPropagation();
                handleOpenRoom(room.id);
              }}
              className={`flex flex-col items-center justify-center p-2 rounded cursor-pointer text-center w-24 sm:w-28 group transition-colors ${
                isSelected ? "bg-[#000080]/80 text-white" : "hover:bg-white/10 text-white"
              }`}
            >
              <div className="text-3xl sm:text-4xl mb-1 filter drop-shadow relative">
                {getIconForRoom(room.roomNumber)}
                {isOpen && (
                  <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-emerald-400 border border-black rounded-full" />
                )}
              </div>
              <span className="text-[11px] sm:text-xs font-mono font-medium leading-tight px-1 rounded line-clamp-2">
                {room.title}
              </span>
              <span className="text-[9px] font-mono text-emerald-200 mt-0.5">
                {isOpen ? "[Mở cửa]" : "[Đang lắp]"}
              </span>
            </div>
          );
        })}
      </main>

      {/* Cửa sổ Chào mừng / Explorer (C:\BAO_TANG_DO_VO_DUNG) */}
      {isWelcomeOpen && (
        <div 
          className="fixed top-12 sm:top-16 left-4 sm:left-1/2 sm:-translate-x-1/2 w-[calc(100%-2rem)] sm:w-[560px] win98-box z-30 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Title bar */}
          <div className="win98-titlebar text-xs">
            <div className="flex items-center gap-1.5">
              <span>🏛️</span>
              <span className="truncate">C:\BẢO_TÀNG_ĐỒ_VÔ_DỤNG\HuongDan.txt</span>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setIsWelcomeOpen(false)}
                className="win98-btn w-4 h-4 text-black text-[10px] font-bold flex items-center justify-center leading-none"
              >
                <Minus className="w-2.5 h-2.5" />
              </button>
              <button 
                onClick={() => setIsWelcomeOpen(false)}
                className="win98-btn w-4 h-4 text-black text-[10px] font-bold flex items-center justify-center leading-none"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </div>
          </div>

          {/* Menu Bar cổ điển */}
          <div className="bg-[#c0c0c0] border-b border-gray-400 px-2 py-0.5 flex gap-3 text-xs">
            <span className="underline cursor-pointer">T</span>ệp tin
            <span className="underline cursor-pointer">C</span>hỉnh sửa
            <span className="underline cursor-pointer">X</span>em
            <span className="underline cursor-pointer">T</span>rợ giúp
          </div>

          {/* Nội dung cửa sổ */}
          <div className="p-4 bg-[#ffffff] win98-window-sunken m-2 text-xs font-mono space-y-3 max-h-[60vh] overflow-y-auto">
            <div className="border-b border-gray-200 pb-2">
              <h1 className="font-bold text-sm text-[#000080]">
                BẢO TÀNG ĐỒ VÔ DỤNG (WINDOWS 98 EDITION)
              </h1>
              <p className="text-gray-500 text-[11px] mt-0.5">
                Phiên bản hệ điều hành: 4.10.1998 • Bộ nhớ: 64 MB RAM
              </p>
            </div>

            <p className="leading-relaxed text-gray-800">
              Chào mừng bạn đến với triển lãm số bảo tồn những phát minh vô dụng nhất trên Internet.
            </p>

            <div className="bg-[#f0f0f0] p-2.5 border border-gray-300 text-gray-700 space-y-1">
              <p className="font-bold text-black">HƯỚNG DẪN THAM QUAN:</p>
              <p>• Nháy đúp (Double-click) vào bất kỳ biểu tượng nào trên màn hình để vào phòng.</p>
              <p>• Trên điện thoại: Chạm vào biểu tượng rồi bấm nút bên dưới.</p>
              <p>• Bấm nút <b>"Start"</b> ở góc trái bên dưới để dịch chuyển tức thời.</p>
            </div>

            {/* Các phòng đang mở cửa */}
            <div>
              <p className="font-bold text-emerald-800 mb-1">
                CÁC PHÒNG ĐANG MỞ CỬA (KHUYÊN THỬ):
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                <button
                  onClick={() => handleOpenRoom("vague-clock")}
                  className="win98-btn p-2 text-left text-[11px] hover:bg-gray-100 flex items-center gap-1.5"
                >
                  <span>🕰️</span>
                  <span className="truncate">Đồng Hồ Mơ Hồ</span>
                </button>
                <button
                  onClick={() => handleOpenRoom("tired-keyboard")}
                  className="win98-btn p-2 text-left text-[11px] hover:bg-gray-100 flex items-center gap-1.5"
                >
                  <span>⌨️</span>
                  <span className="truncate">Bàn Phím Mệt</span>
                </button>
                <button
                  onClick={() => handleOpenRoom("useless-converter")}
                  className="win98-btn p-2 text-left text-[11px] hover:bg-gray-100 flex items-center gap-1.5"
                >
                  <span>📏</span>
                  <span className="truncate">Đổi Đơn Vị</span>
                </button>
              </div>
            </div>
          </div>

          {/* Nút chân cửa sổ */}
          <div className="p-2 bg-[#c0c0c0] flex items-center justify-between text-xs">
            <span className="text-[11px] text-gray-600">Trạng thái: Sẵn sàng</span>
            <div className="flex gap-2">
              <button
                onClick={handleRandomRoom}
                className="win98-btn px-3 py-1 font-bold text-xs flex items-center gap-1"
              >
                <Dices className="w-3.5 h-3.5" />
                <span>Phòng Ngẫu Nhiên</span>
              </button>
              <button
                onClick={() => setIsWelcomeOpen(false)}
                className="win98-btn px-3 py-1 text-xs"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cửa sổ Alert Win98 khi bấm phòng chưa mở hoặc lỗi */}
      {alertMessage && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-[1px] flex items-center justify-center p-4 z-50"
          onClick={() => setAlertMessage(null)}
        >
          <div 
            className="win98-box w-full max-w-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
</main>
</div>;
}