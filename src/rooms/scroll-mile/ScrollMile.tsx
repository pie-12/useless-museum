"use client";

import { useState, useEffect, useRef } from "react";
import { playClockTick } from "@/lib/sound";

const PX_TO_METERS = 0.00026458;

const LANDMARKS = [
  { name: "Trụ Cầu Rồng", dist: 37.5 },
  { name: "Tượng Phật Bà Linh Ứng", dist: 67 },
  { name: "Đỉnh Bà Nà", dist: 1487 },
  { name: "Cáp Treo Bà Nà", dist: 5771 },
];

export function ScrollMile() {
  const [meters, setMeters] = useState<number>(0);
  const touchStartY = useRef<number>(0);
  const lastTickDist = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("scroll_odometer_meters");
      if (saved) {
        setMeters(parseFloat(saved) || 0);
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  const addScrollDistance = (deltaPx: number) => {
    const addedMeters = Math.abs(deltaPx) * PX_TO_METERS;
    setMeters((prev) => {
      const next = prev + addedMeters;
      try {
        localStorage.setItem("scroll_odometer_meters", next.toFixed(2));
      } catch {
        // Ignore storage errors
      }

      // Play tick sound every ~0.5 meters of scrolling
      if (next - lastTickDist.current > 0.5) {
        lastTickDist.current = next;
        playClockTick();
      }

      return next;
    });
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      addScrollDistance(e.deltaY);
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const delta = touchStartY.current - currentY;
      touchStartY.current = currentY;
      addScrollDistance(delta * 1.5);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  // Format odometer digits (e.g., 00123.4)
  const integerPart = Math.floor(meters);
  const decimalPart = Math.floor((meters % 1) * 10);
  const intStr = integerPart.toString().padStart(5, "0").slice(-5);

  return (
    <div 
      ref={containerRef}
      className="w-full max-w-xl mx-auto py-8 px-4 select-none font-mono flex flex-col items-center justify-center text-center"
    >
      {/* Vỏ mặt đồng hồ công-tơ-mét kiểu Honda Super Cub 50cc */}
      <div className="relative w-72 sm:w-80 bg-gradient-to-b from-[#222222] via-[#111111] to-[#2c2c2c] p-6 rounded-3xl border-4 border-[#888888] shadow-2xl flex flex-col items-center">
        {/* Vòng bezel mạ chrome */}
        <div className="absolute inset-1 rounded-[22px] border border-gray-500 pointer-events-none opacity-40" />

        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-3">
          HONDA CUB 50cc • ODOMETER
        </div>

        {/* Cụm con lăn hiển thị quãng đường cuộn */}
        <div className="flex items-center justify-center bg-black p-2 rounded-lg border-2 border-gray-600 shadow-inner gap-1 mb-4">
          {/* Các con số hàng nghìn, trăm, chục, đơn vị (đen chữ trắng) */}
          {intStr.split("").map((digit, idx) => (
            <div
              key={idx}
              className="w-7 h-10 bg-[#1c1c1c] border border-gray-700 rounded flex items-center justify-center text-xl font-black text-white shadow-inner"
            >
              {digit}
            </div>
          ))}

          {/* Dấu chấm ngăn cách */}
return <div>Đồng hồ cây số...</div>;
}