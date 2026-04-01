"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  playMechanicalClick,
  playPixelExplosionSound,
  playPixelDropSound,
} from "@/lib/sound";

export function DoNothingButton() {
  const [clicks, setClicks] = useState<number>(0);
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const [heat, setHeat] = useState<number>(0);
  const [isExploded, setIsExploded] = useState<boolean>(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastClickTimeRef = useRef<number>(0);

  const heatRef = useRef(heat);
  heatRef.current = heat;

  // Khởi tạo lượt bấm từ localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("do_nothing_button_clicks");
      if (saved) {
        const val = parseInt(saved, 10);
        if (!isNaN(val)) setClicks(val);
      }
    } catch {
      // storage unavailable
    }
  }, []);

  // Giảm nhiệt theo thời gian nếu không bấm (decay)
  useEffect(() => {
    const timer = setInterval(() => {
      if (heatRef.current > 0 && !isExploded) {
        setHeat((prev) => Math.max(0, prev - 1.5));
      }
    }, 200);

    return () => clearInterval(timer);
  }, [isExploded]);

  // Kết thúc vụ nổ: hết video một lúc (~0.7s) là nút tự hồi sinh lại ngay, không chữ thừa thãi
  const finishExplosion = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    const video = videoRef.current;
    if (video) {
      video.pause();
    }
    setIsVideoPlaying(false);

    // Hết nổ 0.7s là nút hồi phục lại
    setTimeout(() => {
      setIsExploded(false);
      setHeat(0);
      playPixelDropSound();
    }, 700);
  }, []);

  // Kích nổ ngay lập tức khi chạm đỉnh: video tua thẳng tới mốc 2.0s
  useEffect(() => {
    if (!isExploded) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) {
      setIsVideoPlaying(false);
      finishExplosion();
      return;
    }

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) {
      setIsVideoPlaying(false);
      finishExplosion();
      return;
    }

    setIsVideoPlaying(true);
    // Nhảy ngay đến mốc 2.0s để nổ ngay lập tức cùng âm thanh trong video
    video.currentTime = 2.0;
    video.muted = false;
    video.volume = 1.0;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Trình duyệt chặn autoplay âm thanh thì vẫn tiếp tục chạy hình
      });
    }

    let isRunning = true;

    const renderLoop = () => {
      if (!isRunning) return;

      // Chạy cho đến khi toàn bộ vụ nổ và khói kết thúc tự nhiên
      if (video.ended) {
        isRunning = false;
        finishExplosion();
        return;
      }

      if (video.readyState >= 2) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = frame.data;
        const len = data.length;

        // Thuật toán Chroma Key lọc bỏ màu xanh lá phông nền
        for (let i = 0; i < len; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          if (g > 70 && g > r * 1.25 && g > b * 1.25) {
            const maxOther = Math.max(r, b);
            const diff = g - maxOther;
            if (diff > 25) {
              data[i + 3] = 0; // Trong suốt hoàn toàn
            } else {
              data[i + 3] = Math.max(0, 255 - Math.round((diff / 25) * 255));
            }
          }
        }

        ctx.putImageData(frame, 0, 0);
      }

      animFrameRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameRef.current = requestAnimationFrame(renderLoop);

    const onEnded = () => {
      isRunning = false;
      finishExplosion();
    };

    video.addEventListener("ended", onEnded);

    return () => {
      isRunning = false;
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      video.removeEventListener("ended", onEnded);
    };
  }, [isExploded, finishExplosion]);

  // Xác định con dấu mộc theo blueprint
  const getStamp = (count: number): string | null => {
    if (count >= 1000) return "RẢNH RỖI CẤP 5";
    if (count >= 404) return "RẢNH RỖI CẤP 4";
    if (count >= 100) return "RẢNH RỖI CẤP 3";
    if (count >= 69) return "RẢNH RỖI CẤP 2";
    if (count >= 1) return "RẢNH RỖI CẤP 1";
    return null;
  };

  const triggerClick = () => {
    const now = Date.now();
    // Chống double-fire giữa pointerdown và click trong 80ms
    if (now - lastClickTimeRef.current < 80) return;
    lastClickTimeRef.current = now;

    if (isExploded) return;
    setIsPressed(true);

    const nextClicks = clicks + 1;
    setClicks(nextClicks);
    try {
      localStorage.setItem("do_nothing_button_clicks", nextClicks.toString());
    } catch {
      // storage unavailable
    }

    // Tăng nhiệt độ nút: mỗi click tăng 8 độ (spam dồn dập mới chạm đỉnh nổ)
    const nextHeat = Math.min(100, heat + 8);
    setHeat(nextHeat);

    // Kích nổ ngay khi chạm 100%
    if (nextHeat >= 100) {
      setIsExploded(true);
      setIsPressed(false);
      playPixelExplosionSound();
    } else {
      playMechanicalClick();
    }
  };

  const handlePointerUp = () => {
    setIsPressed(false);
  };

  const currentStamp = getStamp(clicks);
  const formattedClicks = clicks.toLocaleString("vi-VN");

  return (
    <div className="w-full flex flex-col items-center justify-center py-8 px-4 select-none font-mono">
      {/* Video ẩn trong layout (không dùng display:none để trình duyệt vẫn giải mã khung hình) */}
      <video
        ref={videoRef}
        src="/explosion.mp4"
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          opacity: 0.01,
          pointerEvents: "none",
          zIndex: -1,
        }}
      />

      {/* Khung máy bệ đỡ Pixel 3D */}
      <div className="relative w-full max-w-sm sm:max-w-md bg-[#d4d0c8] p-5 sm:p-6 win98-box shadow-2xl flex flex-col items-center overflow-hidden">
        {/* Thanh vạch nhiệt pixel (tối giản thuần thị giác, không chữ) */}
        <div className="w-full flex items-center justify-between text-xs mb-4 px-1 border-b border-gray-400 pb-2">
          {/* Đèn LED pixel chỉ thị */}
          <span
            className={`w-3 h-3 border border-black ${
              heat > 70
                ? "bg-red-500 animate-pulse"
                : heat > 35
                ? "bg-yellow-400"
                : "bg-green-600"
            }`}
          />

          {/* Vạch khối đo nhiệt pixel thuần túy */}
          <div className="w-24 h-4 bg-black p-0.5 flex gap-0.5 border border-gray-600">
            {Array.from({ length: 8 }).map((_, i) => {
              const filled = (i + 1) * 12.5 <= heat;
              const isWarning = i >= 5;
              return (
                <div
                  key={i}
                  className={`flex-1 h-full ${
                    filled
                      ? isWarning
                        ? "bg-red-500"
                        : "bg-yellow-400"
                      : "bg-gray-800"
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Khói pixel bốc lên khi quá nhiệt (> 50%) */}
        {heat > 50 && !isExploded && (
          <div className="absolute top-14 flex gap-4 text-xs font-bold text-gray-600 animate-bounce select-none pointer-events-none z-10">
            <span className="opacity-75">░▒▓</span>
            <span className="opacity-90">▒▓█</span>
            <span className="opacity-75">▓▒░</span>
          </div>
        )}

        {/* Khu vực trung tâm: Nút 3D Pixel và Vụ nổ Meme */}
        <div className="relative my-4 w-full min-h-[200px] flex items-center justify-center">
          {/* Canvas hiển thị video nổ đã lọc phông xanh - Bắt buộc xem hết toàn bộ */}
          <canvas
            ref={canvasRef}
            width={640}
            height={360}
            className={`absolute inset-0 m-auto w-full max-w-[420px] h-auto pointer-events-none z-30 drop-shadow-2xl select-none ${
              isExploded && isVideoPlaying ? "block" : "hidden"
            }`}
            style={{ imageRendering: "pixelated" }}
          />

          {/* Chiếc nút 3D Pixel Art (tạm ẩn đi khi nổ, hết nổ tự hồi lại) */}
          <div
            className={`relative flex items-center justify-center transition-all ${
              isExploded ? "opacity-0 pointer-events-none scale-95" : "opacity-100 scale-100"
            } ${heat > 70 && !isExploded ? "animate-pulse" : ""}`}
          >
            <button
              type="button"
              onPointerDown={triggerClick}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              onKeyDown={(e) => {
                if (e.key === " " || e.key === "Enter") {
                  e.preventDefault();
                  triggerClick();
                }
              }}
              onKeyUp={(e) => {
                if (e.key === " " || e.key === "Enter") {
                  setIsPressed(false);
                }
              }}
              disabled={isExploded}
              aria-label="Nút chả làm gì"
              className="group relative cursor-pointer outline-none focus:outline-none select-none transition-transform"
              style={{
                transform: isPressed ? "translateY(5px)" : "translateY(0px)",
              }}
            >
              {/* Khối Nút 3D Pixel Art (SVG) */}
              <svg
                width="180"
                height="130"
                viewBox="0 0 180 130"
                className="overflow-visible"
                style={{ imageRendering: "pixelated" }}
              >
                {/* Bóng đổ pixel dưới đáy */}
                <rect
                  x="20"
                  y={isPressed ? "92" : "96"}
                  width="140"
                  height="16"
                  fill="#1e1e1e"
                />
                <rect
                  x="16"
                  y={isPressed ? "96" : "100"}
                  width="148"
                  height="12"
                  fill="#000000"
                  opacity="0.4"
                />

                {/* Đế viền ngoài nút (Pixel Bevel Base) */}
                <rect x="16" y="70" width="148" height="30" fill="#2b0000" />
                <rect x="20" y="66" width="140" height="34" fill="#5c0000" />

                {/* Thân 3D bên dưới mặt nút (Front Extrusion) */}
                <rect
                  x="24"
                  y={isPressed ? "58" : "50"}
                  width="132"
                  height={isPressed ? "22" : "30"}
                  fill="#8b0000"
                />
                {/* Viền bóng cạnh phải */}
                <rect
                  x="144"
                  y={isPressed ? "58" : "50"}
                  width="12"
                  height={isPressed ? "22" : "30"}
                  fill="#520000"
                />

                {/* Mặt trên của nút đỏ (Top Face) */}
                <rect
                  x="24"
                  y={isPressed ? "38" : "30"}
                  width="132"
                  height="28"
                  fill={heat > 70 ? "#ff4d4d" : "#e60000"}
                />

                {/* Viền highlight pixel sáng (Top-Left Edge) */}
                <rect
                  x="24"
                  y={isPressed ? "38" : "30"}
                  width="132"
                  height="5"
                  fill="#ff8080"
                />
                <rect
                  x="24"
                  y={isPressed ? "38" : "30"}
                  width="6"
                  height="28"
                  fill="#ff9999"
                />

                {/* Viền shadow pixel tối (Bottom-Right Face Edge) */}
                <rect
                  x="24"
                  y={isPressed ? "61" : "53"}
                  width="132"
                  height="5"
                  fill="#b30000"
                />
                <rect
                  x="150"
                  y={isPressed ? "38" : "30"}
                  width="6"
                  height="28"
                  fill="#990000"
                />

                {/* Viền ngoài nét đen pixel 4px */}
                <rect x="24" y={isPressed ? "34" : "26"} width="132" height="4" fill="#000000" />
                <rect x="20" y="100" width="140" height="4" fill="#000000" />
                <rect x="20" y={isPressed ? "38" : "30"} width="4" height="66" fill="#000000" />
                <rect x="156" y={isPressed ? "38" : "30"} width="4" height="66" fill="#000000" />
              </svg>
            </button>
          </div>
        </div>

        {/* Con dấu mộc hành chính phẳng lỳ đóng cộp lên bệ (Blueprint) */}
        {currentStamp && (
          <div className="absolute bottom-20 right-4 sm:right-6 pointer-events-none transform -rotate-12 transition-all z-20">
            <div className="border-2 border-red-700 bg-red-50/80 px-2.5 py-1 text-red-700 font-bold text-xs uppercase tracking-wider shadow-sm select-none">
              ★ {currentStamp} ★
            </div>
          </div>
        )}

        {/* Bảng đồng hồ LED hiển thị số lượt bấm (Client-side localStorage) */}
        <div className="w-full win98-window-sunken bg-black text-[#39ff14] p-3 rounded-none flex flex-col items-center justify-center z-10">
          <div className="text-[10px] text-gray-400 tracking-widest uppercase mb-0.5">
            TỔNG SỐ LẦN ĐÃ BẤM
          </div>
          <div className="text-3xl sm:text-4xl font-black tracking-wider font-mono">
            {formattedClicks}
          </div>
          <div className="text-[10px] text-gray-500 mt-1">
            (Một chiếc nút không có tác dụng gì cả)
          </div>
        </div>

        {/* Ốc vít pixel 4 góc bệ đỡ */}
        <div className="absolute top-2 left-2 text-[9px] text-gray-600 font-bold select-none">⊕</div>
        <div className="absolute top-2 right-2 text-[9px] text-gray-600 font-bold select-none">⊕</div>
        <div className="absolute bottom-2 left-2 text-[9px] text-gray-600 font-bold select-none">⊕</div>
        <div className="absolute bottom-2 right-2 text-[9px] text-gray-600 font-bold select-none">⊕</div>
      </div>

      {/* Dòng thuyết minh deadpan cộc lốc */}
      <p className="mt-6 text-xs text-gray-700 font-mono text-center max-w-sm">
        Nút bấm hoàn toàn vô dụng. Không gửi email, không tắt máy, không cứu thế giới.
      </p>
    </div>
  );
}
