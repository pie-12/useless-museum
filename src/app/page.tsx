"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MUSEUM_ROOMS } from "@/config/rooms.config";
import { playMechanicalClick, playCalculatorBeep } from "@/lib/sound";
import { 
  X, 
  Minus, 
  Folder, 
  Terminal, 
  Volume2, 
  Dices, 
  Power, 
  Award,
  ShoppingBag,
  Download
} from "lucide-react";

const GUARD_PHRASES = [
  "Cứ xem đi, đừng đụng gì.",
  "Phòng nào cũng vậy thôi.",
  "Hỏi chi mà hỏi.",
  "Tui đang trực, đừng có làm ồn.",
  "Vé không đồng mà đòi hỏi nhiều rứa.",
  "Bấm cho đã rồi cũng có làm được việc chi mô.",
];

interface GiftItem {
  id: string;
  name: string;
  price: string;
  icon: string;
}

const GIFT_ITEMS: GiftItem[] = [
  { id: "air", name: "Không khí bảo tàng đóng chai", price: "0 VNĐ", icon: "🏺" },
  { id: "time", name: "Thời gian đã mất khi ghé thăm", price: "Vô giá", icon: "⏳" },
  { id: "bug", name: "Bug đã fix hôm qua", price: "Miễn phí", icon: "🐛" },
  { id: "patience", name: "Sự kiên nhẫn", price: "Đắt đỏ", icon: "🧘" },
];

export default function Win98Desktop() {
  const router = useRouter();
  const [selectedIcon, setSelectedIcon] = useState<string | null>("welcome");
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(true);
  const [isGiftShopOpen, setIsGiftShopOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [guardBubble, setGuardBubble] = useState<string | null>(null);
  const [guardPhraseIdx, setGuardPhraseIdx] = useState<number>(0);
  const [soldOutItems, setSoldOutItems] = useState<string[]>([]);
  const [visitorName, setVisitorName] = useState<string>("Một Vị Khách Rảnh Rỗi");
  const [visitedCount, setVisitedCount] = useState<number>(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

    // Track visited count from localStorage
    try {
      const visited = JSON.parse(localStorage.getItem("useless_museum_visited") || "[]");
      setVisitedCount(Array.isArray(visited) ? visited.length : 0);
    } catch {
      // Ignore parse errors
    }

    return () => clearInterval(interval);
  }, []);

  // Vẽ giấy chứng nhận trên Canvas
  useEffect(() => {
    if (!isCertificateOpen || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background giấy cổ điển
    ctx.fillStyle = "#faf6ed";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Đường viền đôi cổ điển
    ctx.strokeStyle = "#8b4513";
    ctx.lineWidth = 6;
    ctx.strokeRect(16, 16, canvas.width - 32, canvas.height - 32);

    ctx.strokeStyle = "#c29b62";
    ctx.lineWidth = 2;
    ctx.strokeRect(24, 24, canvas.width - 48, canvas.height - 48);

    // Tiêu đề
    ctx.textAlign = "center";
    ctx.fillStyle = "#3e2723";
    ctx.font = "bold 22px 'Be Vietnam Pro', Tahoma, sans-serif";
    ctx.fillText("BẢO TÀNG ĐỒ VÔ DỤNG", canvas.width / 2, 70);

    ctx.font = "bold 16px 'Be Vietnam Pro', Tahoma, sans-serif";
    ctx.fillStyle = "#b71c1c";
    ctx.fillText("CHỨNG NHẬN THAM QUAN VÔ DỤNG", canvas.width / 2, 105);

    // Người nhận
    ctx.font = "italic 13px 'Be Vietnam Pro', Tahoma, sans-serif";
    ctx.fillStyle = "#5d4037";
    ctx.fillText("Trân trọng trao tặng cho:", canvas.width / 2, 145);

    ctx.font = "bold 20px 'Be Vietnam Pro', Tahoma, sans-serif";
    ctx.fillStyle = "#1a237e";
    ctx.fillText(visitorName || "Một Vị Khách Rảnh Rỗi", canvas.width / 2, 180);

    // Nội dung deadpan
    ctx.font = "12px 'Be Vietnam Pro', Tahoma, sans-serif";
    ctx.fillStyle = "#424242";
    ctx.fillText("Vì đã kiên nhẫn ghé thăm và lướt qua những điều vô nghĩa nhất.", canvas.width / 2, 220);

    ctx.font = "bold 13px 'Be Vietnam Pro', Tahoma, sans-serif";
    ctx.fillStyle = "#880e4f";
    ctx.fillText('"Giấy chứng nhận này hoàn toàn không có giá trị sử dụng trong thực tế."', canvas.width / 2, 250);

    // Dấu mộc đỏ
    ctx.save();
    ctx.translate(canvas.width - 110, canvas.height - 85);
    ctx.rotate(-0.15);
    ctx.strokeStyle = "#d32f2f";
    ctx.lineWidth = 3;
    ctx.strokeRect(-60, -25, 120, 50);
    ctx.fillStyle = "#d32f2f";
    ctx.font = "bold 11px Tahoma, sans-serif";
    ctx.fillText("★ VÔ DỤNG ĐẠI TOÀN ★", 0, -5);
    ctx.font = "9px Tahoma, sans-serif";
    ctx.fillText("ĐÃ CHỨNG THỰC", 0, 12);
    ctx.restore();

    // Ngày cấp
    ctx.textAlign = "left";
    ctx.font = "11px 'Be Vietnam Pro', monospace";
    ctx.fillStyle = "#757575";
    const dateStr = new Date().toLocaleDateString("vi-VN");
    ctx.fillText(`Ngày cấp: ${dateStr}`, 40, canvas.height - 40);
  }, [isCertificateOpen, visitorName]);

  const handleDownloadCertificate = () => {
    if (!canvasRef.current) return;
    playMechanicalClick();
    const link = document.createElement("a");
    link.download = `chung-nhan-vo-dung-${Date.now()}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  const handleOpenRoom = (roomId: string) => {
    const room = MUSEUM_ROOMS.find((r) => r.id === roomId);
    if (!room) return;

    if (room.status === "open") {
      // Mark as visited in localStorage
      try {
        const visited: string[] = JSON.parse(localStorage.getItem("useless_museum_visited") || "[]");
        if (!visited.includes(room.id)) {
          visited.push(room.id);
          localStorage.setItem("useless_museum_visited", JSON.stringify(visited));
          setVisitedCount(visited.length);
        }
      } catch {
        // Ignore parse error
      }
      router.push(`/rooms/${room.id}`);
    } else {
      setAlertMessage(
        `[THÔNG BÁO TỪ ĐĨA MỀM A:\\]\n\nPhòng "${room.title}" hiện đang được các kỹ sư giải nén từ đĩa mềm 1.44 MB.\n\nTrạng thái: Đang chuẩn bị ra mắt. Quý khách vui lòng ghé thăm các phòng có sẵn!`
      );
    }
  };

  const handleRandomRoom = () => {
    setIsStartOpen(false);
    playMechanicalClick();
    const openRooms = MUSEUM_ROOMS.filter((r) => r.status === "open");
    if (openRooms.length === 0) return;
    const randomIndex = Math.floor(Math.random() * openRooms.length);
    handleOpenRoom(openRooms[randomIndex].id);
  };

  const handleGuardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playMechanicalClick();
    const nextIdx = (guardPhraseIdx + 1) % GUARD_PHRASES.length;
    setGuardPhraseIdx(nextIdx);
    setGuardBubble(GUARD_PHRASES[guardPhraseIdx]);
    setTimeout(() => {
      setGuardBubble(null);
    }, 3500);
  };

  const handleBuyGift = (itemId: string) => {
    playCalculatorBeep();
    if (!soldOutItems.includes(itemId)) {
      setSoldOutItems((prev) => [...prev, itemId]);
    }
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

        {/* Cửa hàng lưu niệm không bán gì (CuaHangLuuNiem.exe) */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            setSelectedIcon("giftshop");
          }}
          onDoubleClick={(e) => {
            e.stopPropagation();
            setIsGiftShopOpen(true);
          }}
          className={`flex flex-col items-center justify-center p-2 rounded cursor-pointer text-center w-24 sm:w-28 group transition-colors ${
            selectedIcon === "giftshop" ? "bg-[#000080]/80 text-white" : "hover:bg-white/10 text-white"
          }`}
        >
          <div className="text-3xl sm:text-4xl mb-1 filter drop-shadow">🛍️</div>
          <span className="text-[11px] sm:text-xs font-mono font-medium leading-tight px-1 rounded break-words">
            CuaHangLuuNiem.exe
          </span>
        </div>

        {/* Giấy chứng nhận tham quan (ChungNhan.exe) */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            setSelectedIcon("cert");
          }}
          onDoubleClick={(e) => {
            e.stopPropagation();
            setIsCertificateOpen(true);
          }}
          className={`flex flex-col items-center justify-center p-2 rounded cursor-pointer text-center w-24 sm:w-28 group transition-colors ${
            selectedIcon === "cert" ? "bg-[#000080]/80 text-white" : "hover:bg-white/10 text-white"
          }`}
        >
          <div className="text-3xl sm:text-4xl mb-1 filter drop-shadow relative">
            📜
            {visitedCount >= 3 && (
              <span className="absolute -top-1 -right-1 text-xs">★</span>
            )}
          </div>
          <span className="text-[11px] sm:text-xs font-mono font-medium leading-tight px-1 rounded break-words">
            ChungNhan.exe
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

      {/* Cửa sổ Chào mừng / Explorer */}
      {isWelcomeOpen && (
        <div 
          className="fixed top-12 sm:top-16 left-4 sm:left-1/2 sm:-translate-x-1/2 w-[calc(100%-2rem)] sm:w-[560px] win98-box z-30 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
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

          <div className="bg-[#c0c0c0] border-b border-gray-400 px-2 py-0.5 flex gap-3 text-xs">
            <span className="underline cursor-pointer">T</span>ệp tin
            <span className="underline cursor-pointer">C</span>hỉnh sửa
            <span className="underline cursor-pointer">X</span>em
            <span className="underline cursor-pointer">T</span>rợ giúp
          </div>

          <div className="p-4 bg-[#ffffff] win98-window-sunken m-2 text-xs font-mono space-y-3 max-h-[60vh] overflow-y-auto">
            <div className="border-b border-gray-200 pb-2">
              <h1 className="font-bold text-sm text-[#000080]">
                BẢO TÀNG ĐỒ VÔ DỤNG (WINDOWS 98 EDITION)
              </h1>
              <p className="text-gray-500 text-[11px] mt-0.5">
                Phiên bản: 4.10.1998 • Lấy cảm hứng từ The Useless Web
              </p>
            </div>

            <p className="leading-relaxed text-gray-800">
              Đây là một web bảo tàng vô dụng. Bấm vào thì xem, không giải quyết vấn đề gì cả.
            </p>

            <div className="bg-[#f0f0f0] p-2.5 border border-gray-300 text-gray-700 space-y-1">
              <p className="font-bold text-black">THAO TÁC:</p>
              <p>• Nháy đúp biểu tượng để vào phòng.</p>
              <p>• Trên điện thoại: Nhấp vào biểu tượng rồi bấm nút.</p>
              <p>• Bấm nút <b>"Start"</b> để nhảy ngẫu nhiên.</p>
            </div>

            <div>
              <p className="font-bold text-emerald-800 mb-1">
                CÁC PHÒNG ĐANG MỞ CỬA:
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
</main>
</div>;
}