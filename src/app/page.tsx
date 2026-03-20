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
</main>
<footer className='fixed bottom-0 left-0 right-0 h-10 win98-box z-40 flex items-center px-1'>Start</footer>
</div>;
}