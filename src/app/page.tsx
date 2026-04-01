"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MUSEUM_ROOMS } from "@/config/rooms.config";
import { 
  playMechanicalClick, 
  playCalculatorBeep, 
  playBallTapSound, 
  setMasterVolume,
  getMasterVolume
} from "@/lib/sound";
import { 
  X, 
  Minus, 
  Square,
  Folder, 
  Terminal, 
  Volume2, 
  Dices, 
  Power, 
  Award,
  ShoppingBag,
  Download
} from "lucide-react";

type Language = "vi" | "en" | "ja";

const I18N_DESKTOP = {
  vi: {
    langLabel: "V",
    langTooltip: "Bộ gõ / Ngôn ngữ: Tiếng Việt (Bấm để đổi)",
    myComputer: "Bảo Tàng (C:)",
    giftShop: "CuaHangLuuNiem.exe",
    certificate: "ChungNhan.exe",
    roomOpen: "[Mở cửa]",
    roomBuilding: "[Đang lắp]",
    huongDanTitle: "C:\\BẢO_TÀNG_ĐỒ_VÔ_DỤNG\\HuongDan.txt",
    menuFile: "ệp tin",
    menuEdit: "hỉnh sửa",
    menuView: "em",
    menuHelp: "rợ giúp",
    h1: "BẢO TÀNG ĐỒ VÔ DỤNG (WINDOWS 98 EDITION)",
    version: "Phiên bản: 4.10.1998 • Lấy cảm hứng từ The Useless Web",
    intro: "Đây là một web bảo tàng vô dụng. Bấm vào thì xem, không giải quyết vấn đề gì cả.",
    controlsHeader: "THAO TÁC:",
    control1: "• Nháy đúp biểu tượng để vào phòng.",
    control2: "• Trên điện thoại: Nhấp vào biểu tượng rồi bấm nút.",
    control3: "• Bấm nút \"Start\" để nhảy ngẫu nhiên.",
    openRoomsHeader: "CÁC PHÒNG ĐANG MỞ CỬA:",
    statusReady: "Trạng thái: Sẵn sàng",
    randomRoomBtn: "Phòng Ngẫu Nhiên",
    closeBtn: "Đóng",
    guardTitle: "👮‍♂️ Bác bảo vệ:",
    guardPhrases: [
      "Cứ xem đi, đừng đụng gì.",
      "Phòng nào cũng vậy thôi.",
      "Hỏi chi mà hỏi.",
      "Tui đang trực, đừng có làm ồn.",
      "Vé không đồng mà đòi hỏi nhiều rứa.",
      "Bấm cho đã rồi cũng có làm được việc chi mô.",
    ],
    taskbarMuseumTab: "Bảo Tàng Đồ Vô Dụng",
    calendarTitle: "Thuộc Tính Ngày (DateProperties.exe)",
    yesterdayCardTitle: "HÔM QUA",
    yesterdayCardText: "Đã qua rồi.",
    todayCardTitle: "HÔM NAY",
    todayCardText: "Chính là đây.",
    tomorrowCardTitle: "NGÀY MAI",
    tomorrowCardText: "Chưa tới đâu.",
    volumeTitle: "Điều Chỉnh Âm Lượng (MasterVolume.exe)",
    volumeLabel: "Âm lượng:",
  },
  en: {
    langLabel: "E",
    langTooltip: "Keyboard / Language: English (Click to toggle)",
    myComputer: "Museum (C:)",
    giftShop: "GiftShop.exe",
    certificate: "Certificate.exe",
    roomOpen: "[Open]",
    roomBuilding: "[Setup]",
    huongDanTitle: "C:\\THE_USELESS_MUSEUM\\Readme.txt",
    menuFile: "ile",
    menuEdit: "dit",
    menuView: "iew",
    menuHelp: "elp",
    h1: "THE USELESS MUSEUM (WINDOWS 98 EDITION)",
    version: "Version: 4.10.1998 • Inspired by The Useless Web",
    intro: "A collection of completely useless web exhibits. Click to view, solves no real problems.",
    controlsHeader: "CONTROLS:",
    control1: "• Double-click any icon to enter the room.",
    control2: "• On mobile: Tap an icon and hit enter.",
    control3: "• Click \"Start\" button for a random room.",
    openRoomsHeader: "CURRENTLY OPEN ROOMS:",
    statusReady: "Status: Ready",
    randomRoomBtn: "Random Room",
    closeBtn: "Close",
    guardTitle: "👮‍♂️ Guard:",
    guardPhrases: [
      "Look around, don't touch anything.",
      "Every room is just as pointless.",
      "Why are you asking me?",
      "I'm on duty, keep it quiet.",
      "Free admission and you still complain.",
      "Click all you want, nothing will happen.",
    ],
    taskbarMuseumTab: "The Useless Museum",
    calendarTitle: "Date Properties (DateProperties.exe)",
    yesterdayCardTitle: "YESTERDAY",
    yesterdayCardText: "Already gone.",
    todayCardTitle: "TODAY",
    todayCardText: "Right now.",
    tomorrowCardTitle: "TOMORROW",
    tomorrowCardText: "Not yet here.",
    volumeTitle: "Volume Control (MasterVolume.exe)",
    volumeLabel: "Volume:",
  },
  ja: {
    langLabel: "日",
    langTooltip: "入力 / 言語: 日本語 (クリックで切替)",
    myComputer: "博物館 (C:)",
    giftShop: "土産物屋.exe",
    certificate: "認定証.exe",
    roomOpen: "[公開中]",
    roomBuilding: "[準備中]",
    huongDanTitle: "C:\\無用博物館\\説明書.txt",
    menuFile: "ァイル",
    menuEdit: "集",
    menuView: "示",
    menuHelp: "ルプ",
    h1: "無用博物館 (WINDOWS 98 エディション)",
    version: "バージョン: 4.10.1998 • The Useless Web より",
    intro: "まったく役に立たない展示の博物館です。クリックしても何も解決しません。",
    controlsHeader: "操作方法:",
    control1: "• アイコンをダブルクリックで入室。",
    control2: "• スマホの場合：タップして選択後に実行。",
    control3: "• 「Start」でランダムな展示へ。",
    openRoomsHeader: "公開中の展示室:",
    statusReady: "状態: 準備完了",
    randomRoomBtn: "ランダム展示",
    closeBtn: "閉じる",
    guardTitle: "👮‍♂️ 警備員:",
    guardPhrases: [
      "見るだけで触るな。",
      "どの部屋も同じだ。",
      "質問するな。",
      "勤務中だ、静かにしろ。",
      "無料入場なのに文句を言うな。",
      "いくら押しても何も起きないぞ。",
    ],
    taskbarMuseumTab: "無用博物館",
    calendarTitle: "日付のプロパティ (DateProperties.exe)",
    yesterdayCardTitle: "昨日",
    yesterdayCardText: "もう過ぎた。",
    todayCardTitle: "今日",
    todayCardText: "今この時。",
    tomorrowCardTitle: "明日",
    tomorrowCardText: "まだ先だ。",
    volumeTitle: "音量調整 (MasterVolume.exe)",
    volumeLabel: "音量:",
  },
};

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
  const [lang, setLang] = useState<Language>("vi");
  const t = I18N_DESKTOP[lang];

  const [selectedIcon, setSelectedIcon] = useState<string | null>("welcome");
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(true);
  const [isGiftShopOpen, setIsGiftShopOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isVolumeOpen, setIsVolumeOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Tilting Slider (Bập Bênh) Volume Physics State & Refs
  const [boardAngle, setBoardAngle] = useState<number>(0);
  const boardAngleRef = useRef<number>(0);
  const ballPosRef = useRef<number>(70);
  const ballVelRef = useRef<number>(0);
  const [ballDisplayPos, setBallDisplayPos] = useState<number>(70);
  const [volumeLevel, setVolumeLevel] = useState<number>(70);
  const lastTapTimeRef = useRef<number>(0);
  const boardRef = useRef<HTMLDivElement | null>(null);
  const activeHandleRef = useRef<"left" | "right" | null>(null);
  const boardCenterRef = useRef<{ cx: number; cy: number }>({ cx: 0, cy: 0 });

  // Window drag & resize states for HuongDan.txt
  const [windowPos, setWindowPos] = useState<{ x: number; y: number }>({ x: 40, y: 50 });
  const [windowSize, setWindowSize] = useState<{ w: number; h: number }>({ w: 560, h: 460 });
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; winX: number; winY: number }>({ mouseX: 0, mouseY: 0, winX: 0, winY: 0 });
  const isResizingRef = useRef(false);
  const resizeStartRef = useRef<{ mouseX: number; mouseY: number; winW: number; winH: number }>({ mouseX: 0, mouseY: 0, winW: 0, winH: 0 });

  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [guardBubble, setGuardBubble] = useState<string | null>(null);
  const [guardPhraseIdx, setGuardPhraseIdx] = useState<number>(0);
  const [soldOutItems, setSoldOutItems] = useState<string[]>([]);
  const [visitorName, setVisitorName] = useState<string>("Một Vị Khách Rảnh Rỗi");
  const [visitedCount, setVisitedCount] = useState<number>(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Synchronize boardAngle to ref
  boardAngleRef.current = boardAngle;

  // Tilting Slider physics loop (requestAnimationFrame)
  useEffect(() => {
    let animId: number;
    let prevTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min(32, time - prevTime) / 16.666;
      prevTime = time;

      const angle = boardAngleRef.current;
      const rad = (angle * Math.PI) / 180;

      // Gravity acceleration along inclined plane (positive angle = right tilted down)
      const gravity = Math.sin(rad) * 0.42 * dt;
      let vel = (ballVelRef.current + gravity) * Math.pow(0.98, dt);

      // Stop condition: when board is nearly horizontal and ball velocity is small
      if (Math.abs(angle) < 0.5 && Math.abs(vel) < 0.04) {
        vel = 0;
      }

      let pos = ballPosRef.current + vel * dt;

      // Boundary collision checks (0 to 100)
      if (pos <= 0) {
        pos = 0;
        if (vel < -0.15) {
          const now = performance.now();
          if (now - lastTapTimeRef.current > 120) {
            playBallTapSound();
            lastTapTimeRef.current = now;
          }
          vel = -vel * 0.18; // subtle bounce
        } else {
          vel = 0;
        }
      } else if (pos >= 100) {
        pos = 100;
        if (vel > 0.15) {
          const now = performance.now();
          if (now - lastTapTimeRef.current > 120) {
            playBallTapSound();
            lastTapTimeRef.current = now;
          }
          vel = -vel * 0.18; // subtle bounce
        } else {
          vel = 0;
        }
      }

      ballVelRef.current = vel;
      ballPosRef.current = pos;
      setBallDisplayPos(pos);

      const roundedVol = Math.round(pos);
      setVolumeLevel(roundedVol);
      setMasterVolume(roundedVol / 100);

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleStartTilt = (e: React.PointerEvent, handle: "left" | "right") => {
    e.preventDefault();
    e.stopPropagation();
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}
    activeHandleRef.current = handle;

    if (boardRef.current) {
      const rect = boardRef.current.getBoundingClientRect();
      boardCenterRef.current = {
        cx: rect.left + rect.width / 2,
        cy: rect.top + rect.height / 2,
      };
    }
  };

  const handleTiltPointerMove = (e: React.PointerEvent) => {
    if (!activeHandleRef.current) return;
    const { cx, cy } = boardCenterRef.current;
    const handle = activeHandleRef.current;

    let targetAngle = 0;
    if (handle === "right") {
      const dx = Math.max(30, e.clientX - cx);
      const dy = e.clientY - cy;
      targetAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
    } else {
      const dx = Math.min(-30, e.clientX - cx);
      const dy = e.clientY - cy;
      targetAngle = -(Math.atan2(dy, -dx) * 180) / Math.PI;
    }

    const clamped = Math.max(-25, Math.min(25, targetAngle));
    setBoardAngle(clamped);
    boardAngleRef.current = clamped;
  };

  const handleTiltPointerUp = (e: React.PointerEvent) => {
    if (activeHandleRef.current) {
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
      activeHandleRef.current = null;
      // Note: Board remains tilted when released!
    }
  };

  useEffect(() => {
    // Initial center on client
    if (typeof window !== "undefined") {
      const defaultW = Math.min(560, window.innerWidth - 32);
      const defaultX = Math.max(16, Math.floor((window.innerWidth - defaultW) / 2));
      setWindowPos({ x: defaultX, y: 50 });
      setWindowSize({ w: defaultW, h: 460 });
    }

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

  // Global mousemove and mouseup listeners for window dragging and resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingRef.current) {
        const dx = e.clientX - dragStartRef.current.mouseX;
        const dy = e.clientY - dragStartRef.current.mouseY;
        const newX = Math.max(0, Math.min(window.innerWidth - 100, dragStartRef.current.winX + dx));
        const newY = Math.max(0, Math.min(window.innerHeight - 80, dragStartRef.current.winY + dy));
        setWindowPos({ x: newX, y: newY });
      } else if (isResizingRef.current) {
        const dw = e.clientX - resizeStartRef.current.mouseX;
        const dh = e.clientY - resizeStartRef.current.mouseY;
        const newW = Math.max(320, Math.min(window.innerWidth - 10, resizeStartRef.current.winW + dw));
        const newH = Math.max(260, Math.min(window.innerHeight - 50, resizeStartRef.current.winH + dh));
        setWindowSize({ w: newW, h: newH });
      }
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      isResizingRef.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleTitleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;
    isDraggingRef.current = true;
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      winX: windowPos.x,
      winY: windowPos.y,
    };
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMaximized) return;
    isResizingRef.current = true;
    resizeStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      winW: windowSize.w,
      winH: windowSize.h,
    };
  };

  // Toggle Language Handler (Unikey-style)
  const handleToggleLang = (e: React.MouseEvent) => {
    e.stopPropagation();
    playMechanicalClick();
    setLang((prev) => (prev === "vi" ? "en" : prev === "en" ? "ja" : "vi"));
  };

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
    const phrases = t.guardPhrases;
    const nextIdx = (guardPhraseIdx + 1) % phrases.length;
    setGuardPhraseIdx(nextIdx);
    setGuardBubble(phrases[guardPhraseIdx % phrases.length]);
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
        if (isVolumeOpen) setIsVolumeOpen(false);
        if (isCalendarOpen) setIsCalendarOpen(false);
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
            {t.myComputer}
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
            {t.giftShop}
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
            {t.certificate}
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
                {isOpen ? t.roomOpen : t.roomBuilding}
              </span>
            </div>
          );
        })}
      </main>

      {/* Cửa sổ Chào mừng / Explorer (HuongDan.txt) - Kéo di chuyển & phóng to thu nhỏ */}
      {isWelcomeOpen && (
        <div 
          className={`win98-box z-30 shadow-2xl select-none flex flex-col ${
            isMaximized
              ? "fixed top-0 left-0 right-0 bottom-10 w-full !h-[calc(100vh-40px)]"
              : "fixed"
          }`}
          style={
            isMaximized
              ? undefined
              : {
                  top: `${windowPos.y}px`,
                  left: `${windowPos.x}px`,
                  width: `${windowSize.w}px`,
                  height: `${windowSize.h}px`,
                  maxWidth: "calc(100vw - 16px)",
                  maxHeight: "calc(100vh - 50px)",
                }
          }
          onClick={(e) => e.stopPropagation()}
        >
          {/* Titlebar draggable */}
          <div 
            onMouseDown={handleTitleMouseDown}
            className="win98-titlebar text-xs cursor-move select-none"
          >
            <div className="flex items-center gap-1.5 truncate pointer-events-none">
              <span>🏛️</span>
              <span className="truncate">{t.huongDanTitle}</span>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setIsWelcomeOpen(false)}
                className="win98-btn w-4 h-4 text-black text-[10px] font-bold flex items-center justify-center leading-none"
              >
                <Minus className="w-2.5 h-2.5" />
              </button>
              <button 
                onClick={() => setIsMaximized(!isMaximized)}
                className="win98-btn w-4 h-4 text-black text-[10px] font-bold flex items-center justify-center leading-none"
                title={isMaximized ? "Khôi phục" : "Phóng to"}
              >
                <Square className="w-2 h-2" />
              </button>
              <button 
                onClick={() => setIsWelcomeOpen(false)}
                className="win98-btn w-4 h-4 text-black text-[10px] font-bold flex items-center justify-center leading-none"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </div>
          </div>

          {/* Menu bar với chữ liền nhau, hover Win98 chuẩn */}
          <div className="bg-[#c0c0c0] border-b border-gray-400 px-2 py-0.5 flex gap-2 text-xs select-none">
            <span className="cursor-pointer px-1.5 py-0.5 hover:bg-[#000080] hover:text-white"><u>T</u>{t.menuFile}</span>
            <span className="cursor-pointer px-1.5 py-0.5 hover:bg-[#000080] hover:text-white"><u>C</u>{t.menuEdit}</span>
            <span className="cursor-pointer px-1.5 py-0.5 hover:bg-[#000080] hover:text-white"><u>X</u>{t.menuView}</span>
            <span className="cursor-pointer px-1.5 py-0.5 hover:bg-[#000080] hover:text-white"><u>T</u>{t.menuHelp}</span>
          </div>

          {/* Nội dung HuongDan.txt */}
          <div className="p-4 bg-[#ffffff] win98-window-sunken m-2 text-xs font-mono space-y-3 flex-1 overflow-y-auto">
            <div className="border-b border-gray-200 pb-2">
              <h1 className="font-bold text-sm text-[#000080]">
                {t.h1}
              </h1>
              <p className="text-gray-500 text-[11px] mt-0.5">
                {t.version}
              </p>
            </div>

            <p className="leading-relaxed text-gray-800">
              {t.intro}
            </p>

            <div className="bg-[#f0f0f0] p-2.5 border border-gray-300 text-gray-700 space-y-1">
              <p className="font-bold text-black">{t.controlsHeader}</p>
              <p>{t.control1}</p>
              <p>{t.control2}</p>
              <p>{t.control3}</p>
            </div>

            <div>
              <p className="font-bold text-emerald-800 mb-1">
                {t.openRoomsHeader}
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

          {/* Footer bar */}
          <div className="p-2 bg-[#c0c0c0] flex items-center justify-between text-xs relative select-none">
            <span className="text-[11px] text-gray-600">{t.statusReady}</span>
            <div className="flex gap-2">
              <button
                onClick={handleRandomRoom}
                className="win98-btn px-3 py-1 font-bold text-xs flex items-center gap-1"
              >
                <Dices className="w-3.5 h-3.5" />
                <span>{t.randomRoomBtn}</span>
              </button>
              <button
                onClick={() => setIsWelcomeOpen(false)}
                className="win98-btn px-3 py-1 text-xs"
              >
                {t.closeBtn}
              </button>
            </div>

            {/* Resize grip ở góc dưới bên phải */}
            {!isMaximized && (
              <div
                onMouseDown={handleResizeMouseDown}
                className="absolute bottom-0 right-0 w-3.5 h-3.5 cursor-nwse-resize flex items-end justify-end p-0.5 select-none"
                title="Kéo để thay đổi kích thước"
              >
                <div className="w-2 h-2 border-r-2 border-b-2 border-gray-600" />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Cửa sổ Cửa hàng lưu niệm không bán gì (CuaHangLuuNiem.exe) */}
      {isGiftShopOpen && (
        <div 
          className="fixed top-20 left-4 sm:left-1/2 sm:-translate-x-1/2 w-[calc(100%-2rem)] sm:w-[480px] win98-box z-30 shadow-2xl font-mono text-xs"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="win98-titlebar">
            <div className="flex items-center gap-1.5">
              <span>🛍️</span>
              <span className="truncate">CuaHangLuuNiem.exe — [Kệ Hàng Triển Lãm]</span>
            </div>
            <button 
              onClick={() => setIsGiftShopOpen(false)}
              className="win98-btn w-4 h-4 text-black text-[10px] font-bold flex items-center justify-center"
            >
              <X className="w-2.5 h-2.5" />
            </button>
          </div>

          <div className="p-4 bg-[#c0c0c0]">
            <div className="bg-white win98-window-sunken p-3 mb-3">
              <p className="font-bold text-black mb-1">DANH MỤC LƯU NIỆM ĐẶC BIỆT</p>
              <p className="text-[11px] text-gray-600">
                Toàn bộ sản phẩm được trưng bày vĩnh viễn và không bao giờ phục vụ thương mại.
              </p>
            </div>

            <div className="space-y-2">
              {GIFT_ITEMS.map((item) => {
                const isSoldOut = soldOutItems.includes(item.id);
                return (
                  <div 
                    key={item.id}
                    className="bg-[#dcdcdc] p-2.5 border border-gray-400 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{item.icon}</span>
                      <div>
                        <p className="font-bold text-gray-900">{item.name}</p>
                        <p className="text-[10px] text-gray-500">Giá: {item.price}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleBuyGift(item.id)}
                      className={`win98-btn px-3 py-1 text-xs font-bold ${
                        isSoldOut ? "text-gray-500 bg-gray-300 shadow-inner" : "text-black"
                      }`}
                    >
                      {isSoldOut ? "[ Hết hàng ]" : "[ Mua ]"}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-2 border-t border-gray-400 flex justify-end">
              <button
                onClick={() => setIsGiftShopOpen(false)}
                className="win98-btn px-4 py-1.5 font-bold"
              >
                Đóng cửa hàng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cửa sổ Giấy Chứng Nhận Vô Dụng (ChungNhan.exe) */}
      {isCertificateOpen && (
        <div 
          className="fixed top-14 left-4 sm:left-1/2 sm:-translate-x-1/2 w-[calc(100%-2rem)] sm:w-[540px] win98-box z-30 shadow-2xl font-mono text-xs"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="win98-titlebar">
            <div className="flex items-center gap-1.5">
              <span>📜</span>
              <span className="truncate">ChungNhan.exe — [Giấy Chứng Nhận Vô Dụng]</span>
            </div>
            <button 
              onClick={() => setIsCertificateOpen(false)}
              className="win98-btn w-4 h-4 text-black text-[10px] font-bold flex items-center justify-center"
            >
              <X className="w-2.5 h-2.5" />
            </button>
          </div>

          <div className="p-4 bg-[#c0c0c0]">
            <div className="mb-3 flex items-center gap-2">
              <label className="text-[11px] font-bold text-gray-800 whitespace-nowrap">
                Tên khách tham quan:
              </label>
              <input
                type="text"
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                maxLength={30}
                className="flex-1 bg-white win98-window-sunken px-2 py-1 text-xs focus:outline-none"
                placeholder="Nhập tên của bạn..."
              />
            </div>

            {/* Canvas render giấy khen */}
            <div className="flex justify-center mb-3 overflow-hidden">
              <canvas
                ref={canvasRef}
                width={500}
                height={300}
                className="win98-window-sunken max-w-full h-auto bg-[#faf6ed]"
              />
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-gray-400">
              <span className="text-[11px] text-gray-600">
                Đã ghé thăm: {visitedCount}/15 phòng
              </span>
              <div className="flex gap-2">
                <button
                  onClick={handleDownloadCertificate}
                  className="win98-btn px-3 py-1.5 font-bold flex items-center gap-1.5 text-blue-900"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải Ảnh PNG</span>
                </button>
                <button
                  onClick={() => setIsCertificateOpen(false)}
                  className="win98-btn px-4 py-1.5"
                >
                  Đóng
                </button>
              </div>
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
            <div className="win98-titlebar text-xs">
              <div className="flex items-center gap-1.5">
                <span>⚠️</span>
                <span>Thông Báo Hệ Thống</span>
              </div>
              <button 
                onClick={() => setAlertMessage(null)}
                className="win98-btn w-4 h-4 text-black text-[10px] font-bold flex items-center justify-center"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </div>

            <div className="p-4 bg-[#c0c0c0] text-xs font-mono">
              <div className="flex gap-3 mb-4">
                <span className="text-3xl">💾</span>
                <p className="whitespace-pre-line leading-relaxed text-black">
                  {alertMessage}
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-gray-400">
                <button
                  onClick={() => setAlertMessage(null)}
                  className="win98-btn px-5 py-1.5 font-bold text-xs"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cửa sổ Điều Chỉnh Âm Lượng Bập Bênh (MasterVolume.exe) */}
      {isVolumeOpen && (
        <div
          className="fixed bottom-12 right-2 sm:right-6 w-[calc(100%-1rem)] sm:w-84 win98-box z-50 shadow-2xl font-mono text-xs animate-in fade-in zoom-in-95"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="win98-titlebar">
            <div className="flex items-center gap-1.5 truncate">
              <span>🔊</span>
              <span className="truncate">{t.volumeTitle}</span>
            </div>
            <button
              onClick={() => setIsVolumeOpen(false)}
              className="win98-btn w-4 h-4 text-black text-[10px] font-bold flex items-center justify-center"
            >
              <X className="w-2.5 h-2.5" />
            </button>
          </div>

          <div className="p-4 bg-[#c0c0c0] flex flex-col items-center select-none">
            {/* Dòng chữ duy nhất: Âm lượng: N */}
            <div className="w-full text-left font-bold text-sm text-black mb-4">
              {t.volumeLabel} {volumeLevel}
            </div>

            {/* Vùng Bập Bênh (Seesaw / Tilting Slider) */}
            <div className="w-full py-6 flex flex-col items-center justify-center relative min-h-[110px]">
              {/* Tấm bảng chữ nhật bập bênh */}
              <div
                ref={boardRef}
                style={{
                  transform: `rotate(${boardAngle}deg)`,
                  transformOrigin: "center center",
                }}
                className="w-64 h-12 bg-[#c0c0c0] win98-box flex items-center px-1.5 relative shadow-md select-none touch-none z-10"
              >
                {/* Tay nắm bên trái (Left Handle) */}
                <div
                  onPointerDown={(e) => handleStartTilt(e, "left")}
                  onPointerMove={handleTiltPointerMove}
                  onPointerUp={handleTiltPointerUp}
                  onPointerCancel={handleTiltPointerUp}
                  title="Nắm kéo lên/xuống để nghiêng"
                  className="w-5 h-8 flex flex-col items-center justify-center gap-0.5 cursor-grab active:cursor-grabbing hover:bg-gray-300 rounded border border-gray-400 select-none touch-none flex-shrink-0"
                >
                  <div className="w-2.5 h-0.5 bg-gray-600 rounded-full" />
                  <div className="w-2.5 h-0.5 bg-gray-600 rounded-full" />
                  <div className="w-2.5 h-0.5 bg-gray-600 rounded-full" />
                </div>

                {/* Rãnh trượt ngang (Track) */}
                <div className="flex-1 h-4 bg-[#111111] win98-window-sunken mx-2 rounded-full relative overflow-hidden flex-shrink select-none">
                  {/* Viên bi tròn màu trắng lăn theo trọng lực */}
                  <div
                    className="w-3.5 h-3.5 rounded-full bg-white shadow-md border border-gray-300 absolute top-px transition-none select-none pointer-events-none"
                    style={{
                      left: `calc(${ballDisplayPos}% - ${(ballDisplayPos / 100) * 14}px)`,
                    }}
                  />
                </div>

                {/* Tay nắm bên phải (Right Handle) */}
                <div
                  onPointerDown={(e) => handleStartTilt(e, "right")}
                  onPointerMove={handleTiltPointerMove}
                  onPointerUp={handleTiltPointerUp}
                  onPointerCancel={handleTiltPointerUp}
                  title="Nắm kéo lên/xuống để nghiêng"
                  className="w-5 h-8 flex flex-col items-center justify-center gap-0.5 cursor-grab active:cursor-grabbing hover:bg-gray-300 rounded border border-gray-400 select-none touch-none flex-shrink-0"
                >
                  <div className="w-2.5 h-0.5 bg-gray-600 rounded-full" />
                  <div className="w-2.5 h-0.5 bg-gray-600 rounded-full" />
                  <div className="w-2.5 h-0.5 bg-gray-600 rounded-full" />
                </div>
              </div>

              {/* Trụ tam giác đỡ bập bênh ở giữa (Fulcrum) */}
              <div className="flex flex-col items-center mt-[-2px] z-0 select-none pointer-events-none">
                {/* Tam giác trụ */}
                <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[18px] border-b-[#707070]" />
                {/* Đế trụ */}
                <div className="w-12 h-2 bg-[#808080] border-t border-gray-400 shadow-sm" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cửa sổ Lịch Vô Dụng (DateProperties.exe) */}
      {isCalendarOpen && (
        <div
          className="fixed bottom-12 right-2 sm:right-6 w-[calc(100%-1rem)] sm:w-80 win98-box z-50 shadow-2xl font-mono text-xs animate-in fade-in zoom-in-95"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="win98-titlebar">
            <div className="flex items-center gap-1.5 truncate">
              <span>📅</span>
              <span className="truncate">{t.calendarTitle}</span>
            </div>
            <button
              onClick={() => setIsCalendarOpen(false)}
              className="win98-btn w-4 h-4 text-black text-[10px] font-bold flex items-center justify-center"
            >
              <X className="w-2.5 h-2.5" />
            </button>
          </div>

          <div className="p-3 bg-[#c0c0c0] flex flex-col items-center">
            {/* 3 Thẻ thời gian vô dụng (tối đa 3 chữ mỗi thẻ) */}
            <div className="w-full space-y-2 mb-3">
              {/* Thẻ Hôm qua */}
              <div className="bg-[#f0f0f0] win98-window-sunken p-2.5 text-left">
                <span className="text-[10px] text-gray-500 font-bold uppercase block tracking-wider">
                  {t.yesterdayCardTitle}
                </span>
                <span className="text-base font-bold text-gray-700 block mt-0.5">
                  {t.yesterdayCardText}
                </span>
              </div>

              {/* Thẻ Hôm nay (Nổi bật) */}
              <div className="bg-[#ffffff] win98-window-sunken p-2.5 text-left border-blue-900">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-blue-900 font-bold uppercase block tracking-wider">
                    {t.todayCardTitle}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <span className="text-base font-bold text-black block mt-0.5">
                  {t.todayCardText}
                </span>
              </div>

              {/* Thẻ Ngày mai */}
              <div className="bg-[#f0f0f0] win98-window-sunken p-2.5 text-left">
                <span className="text-[10px] text-gray-500 font-bold uppercase block tracking-wider">
                  {t.tomorrowCardTitle}
                </span>
                <span className="text-base font-bold text-gray-700 block mt-0.5">
                  {t.tomorrowCardText}
                </span>
              </div>
            </div>

            {/* Nút đóng */}
            <div className="w-full flex justify-end gap-2 pt-1 border-t border-gray-400">
              <button
                onClick={() => setIsCalendarOpen(false)}
                className="win98-btn px-6 py-1.5 font-bold text-xs"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pop-up Start Menu */}
      {isStartOpen && (
        <div 
          className="fixed bottom-10 left-0 w-64 win98-box z-50 shadow-2xl font-mono text-xs select-none overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex">
            {/* Cột xanh bên trái mang thương hiệu Windows 98 */}
            <div className="w-8 bg-gradient-to-t from-[#000080] to-[#1084d0] text-white flex flex-col justify-end items-center pb-2 select-none overflow-hidden flex-shrink-0">
              <span
                className="text-white text-xs font-bold tracking-widest uppercase select-none block"
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                Windows 98
              </span>
            </div>

            <div className="flex-1 py-1 bg-[#c0c0c0]">
              <button
                onClick={handleRandomRoom}
                className="w-full text-left px-3 py-2 hover:bg-[#000080] hover:text-white flex items-center gap-2.5 transition-colors"
              >
                <Dices className="w-4 h-4 text-amber-500" />
                <span className="font-bold">Phòng Ngẫu Nhiên (Run...)</span>
              </button>

              <button
                onClick={() => {
                  setIsStartOpen(false);
                  setIsCertificateOpen(true);
                }}
                className="w-full text-left px-3 py-2 hover:bg-[#000080] hover:text-white flex items-center gap-2.5 transition-colors"
              >
                <Award className="w-4 h-4 text-amber-600" />
                <span>Giấy Chứng Nhận Vô Dụng</span>
              </button>

              <button
                onClick={() => {
                  setIsStartOpen(false);
                  setIsGiftShopOpen(true);
                }}
                className="w-full text-left px-3 py-2 hover:bg-[#000080] hover:text-white flex items-center gap-2.5 transition-colors"
              >
                <ShoppingBag className="w-4 h-4 text-emerald-600" />
                <span>Cửa Hàng Lưu Niệm</span>
              </button>

              <button
                onClick={() => {
                  setIsStartOpen(false);
                  setIsWelcomeOpen(true);
                }}
                className="w-full text-left px-3 py-2 hover:bg-[#000080] hover:text-white flex items-center gap-2.5 transition-colors"
              >
                <Folder className="w-4 h-4 text-yellow-600" />
                <span>Mở Sơ Đồ Bảo Tàng</span>
              </button>

              <a
                href="https://github.com/pie-12/useless-museum"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-left px-3 py-2 hover:bg-[#000080] hover:text-white flex items-center gap-2.5 transition-colors block"
              >
                <Terminal className="w-4 h-4 text-emerald-600" />
                <span>Mã Nguồn (GitHub)</span>
              </a>

              <div className="my-1 border-t border-gray-400 border-b border-white" />

              <button
                onClick={() => {
                  setIsStartOpen(false);
                  setAlertMessage("Bạn bấm Shut Down thật à?\n\nKhông có nút tắt máy nào ở đây đâu, quay lại làm việc hoặc ghé mấy phòng kia chơi tiếp đi bạn ơi!");
                }}
                className="w-full text-left px-3 py-2 hover:bg-[#000080] hover:text-white flex items-center gap-2.5 transition-colors"
              >
                <Power className="w-4 h-4 text-rose-600" />
                <span>Tắt Máy (Shut Down...)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bong bóng thoại của Bác bảo vệ ngủ gật */}
      {guardBubble && (
        <div className="fixed bottom-12 left-24 z-50 bg-[#ffffcc] border-2 border-black p-2.5 shadow-2xl rounded font-mono text-xs max-w-xs animate-in fade-in zoom-in-95">
          <p className="font-bold text-black leading-tight">{t.guardTitle}</p>
          <p className="text-[#333333] mt-1">{guardBubble}</p>
        </div>
      )}

      {/* Taskbar Windows 98 cố định dưới đáy màn hình */}
      <footer className="fixed bottom-0 left-0 right-0 h-10 win98-box z-40 flex items-center justify-between px-1 font-mono text-xs select-none">
        {/* Nút Start & Bác bảo vệ */}
        <div className="flex items-center gap-1.5 h-full py-0.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsStartOpen(!isStartOpen);
            }}
            className={`win98-btn h-full px-2.5 flex items-center gap-1.5 font-black text-xs ${
              isStartOpen ? "win98-btn-pressed" : ""
            }`}
          >
            <span className="text-base">🪟</span>
            <span>Start</span>
          </button>

          {/* Bác bảo vệ ngủ gật (The Slumbering Guard) */}
          <button
            onClick={handleGuardClick}
            title="Bác bảo vệ bảo tàng (đang ngủ gật)"
            className="win98-btn h-full px-2 flex items-center gap-1 text-[11px] hover:bg-gray-200 active:bg-gray-300"
          >
            <span>👮‍♂️</span>
            <span className="text-[10px] text-gray-600 font-bold">zzz</span>
          </button>

          {/* Nút Tab trên Taskbar */}
          <button
            onClick={() => setIsWelcomeOpen(!isWelcomeOpen)}
            className={`win98-btn h-full px-3 max-w-[180px] sm:max-w-[220px] truncate text-[11px] hidden xs:flex items-center gap-1.5 ${
              isWelcomeOpen ? "win98-btn-pressed font-bold" : ""
            }`}
          >
            <span>📁</span>
            <span className="truncate">{t.taskbarMuseumTab}</span>
          </button>
        </div>

        {/* System Tray (Đồng hồ, Bập bênh âm lượng, Bộ gõ Unikey, Chứng nhận) */}
        <div className="win98-window-sunken h-full py-0.5 px-2 flex items-center gap-2 bg-[#c0c0c0]">
          <button
            onClick={() => setIsCertificateOpen(true)}
            title="Xem Giấy Chứng Nhận Vô Dụng"
            className="hover:opacity-80 text-xs"
          >
            📜
          </button>

          {/* Biểu tượng chuyển đổi ngôn ngữ kiểu Unikey [ V ] -> [ E ] -> [ 日 ] */}
          <button
            onClick={handleToggleLang}
            title={t.langTooltip}
            className="w-4 h-4 bg-white border border-gray-600 flex items-center justify-center font-bold text-[10px] shadow-sm select-none hover:bg-gray-100"
          >
            <span className={lang === "vi" ? "text-red-600 font-black" : lang === "en" ? "text-blue-600 font-black" : "text-rose-700 font-black"}>
              {t.langLabel}
            </span>
          </button>

          {/* Biểu tượng Loa / The Worst Volume Control (Bập bênh nghiêng) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              playMechanicalClick();
              setIsVolumeOpen(!isVolumeOpen);
            }}
            title={t.volumeTitle}
            className={`p-1 hover:bg-gray-300 rounded flex items-center justify-center ${isVolumeOpen ? "bg-gray-400" : ""}`}
          >
            <Volume2 className="w-3.5 h-3.5 text-gray-700" />
          </button>

          {/* Đồng hồ bấm vào hiện Lịch Vô Dụng (DateProperties.exe) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              playMechanicalClick();
              setIsCalendarOpen(!isCalendarOpen);
            }}
            title={t.calendarTitle}
            className={`text-xs font-bold text-black hover:bg-gray-300 px-1 py-0.5 rounded ${isCalendarOpen ? "bg-gray-400" : ""}`}
          >
            {currentTime || "12:00"}
          </button>
        </div>
      </footer>
    </div>
  );
}
