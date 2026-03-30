"use client";

import { useState, useEffect, useRef } from "react";
import { playClockTick } from "@/lib/sound";

export function IdleBonsai() {
  const [idleSeconds, setIdleSeconds] = useState<number>(0);
  const [leavesCount, setLeavesCount] = useState<number>(0);
  const [hasFlower, setHasFlower] = useState<boolean>(false);
  const [fallenLeaves, setFallenLeaves] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>("Đang lớn...");

  const idleSecondsRef = useRef<number>(0);
  const leavesCountRef = useRef<number>(0);
  const hasFlowerRef = useRef<boolean>(false);
  const lastMovedAtRef = useRef<number>(Date.now());

  idleSecondsRef.current = idleSeconds;
  leavesCountRef.current = leavesCount;
  hasFlowerRef.current = hasFlower;

  // Timer loop
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const timeSinceMove = Math.floor((now - lastMovedAtRef.current) / 1000);
      setIdleSeconds(timeSinceMove);

      // 15s per leaf, up to 4 leaves
      const calculatedLeaves = Math.min(4, Math.floor(timeSinceMove / 15));
      setLeavesCount(calculatedLeaves);

      // 60s = flower
      const flowerBloomed = timeSinceMove >= 60;
      setHasFlower(flowerBloomed);

      if (timeSinceMove > 0) {
        setStatusText("Đang lớn...");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Motion detection handler
  const handleUserMovement = () => {
    const now = Date.now();
    // Only react if previously was idle for at least 3 seconds
    if (now - lastMovedAtRef.current >= 3000) {
      if (leavesCountRef.current > 0 || hasFlowerRef.current) {
        playClockTick();
        setFallenLeaves((prev) => prev + 1);
      }
      setStatusText("Lại nhúc nhích rồi.");
      setLeavesCount(0);
      setHasFlower(false);
      setIdleSeconds(0);
    }
    lastMovedAtRef.current = now;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleUserMovement, { passive: true });
    window.addEventListener("keydown", handleUserMovement, { passive: true });
    window.addEventListener("touchstart", handleUserMovement, { passive: true });
    window.addEventListener("wheel", handleUserMovement, { passive: true });
    window.addEventListener("scroll", handleUserMovement, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleUserMovement);
      window.removeEventListener("keydown", handleUserMovement);
      window.removeEventListener("touchstart", handleUserMovement);
      window.removeEventListener("wheel", handleUserMovement);
      window.removeEventListener("scroll", handleUserMovement);
    };
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto py-8 px-4 select-none font-mono flex flex-col items-center justify-center text-center">
      {/* Khung chậu cây Zen */}
      <div className="w-72 h-80 bg-[#f4f2ec] rounded-2xl border-2 border-[#d5cfc0] shadow-md p-4 flex flex-col items-center justify-end relative overflow-hidden">
        {/* SVG Cây Bonsai */}
        <svg viewBox="0 0 200 220" className="w-56 h-64">
          {/* Thân cây gỗ uốn lượn */}
          <path
            d="M 95 180 Q 98 140 85 110 Q 75 85 100 65 Q 120 50 115 35"
            fill="none"
            stroke="#5c3a21"
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* Nhánh trái */}
          <path
            d="M 87 115 Q 60 105 45 95"
            fill="none"
            stroke="#5c3a21"
            strokeWidth="7"
            strokeLinecap="round"
          />
          {/* Nhánh phải */}
          <path
            d="M 95 80 Q 125 75 145 65"
            fill="none"
            stroke="#5c3a21"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Lá 1 (Mọc lúc 15s) - Cành trái */}
          {leavesCount >= 1 && (
            <ellipse
              cx="40"
              cy="92"
              rx="12"
              ry="7"
              fill="#2e7d32"
              transform="rotate(-20 40 92)"
            />
          )}

          {/* Lá 2 (Mọc lúc 30s) - Cành phải */}
          {leavesCount >= 2 && (
            <ellipse
              cx="148"
              cy="62"
              rx="12"
              ry="7"
              fill="#388e3c"
              transform="rotate(25 148 62)"
            />
          )}

          {/* Lá 3 (Mọc lúc 45s) - Đỉnh cành giữa */}
          {leavesCount >= 3 && (
            <ellipse
              cx="112"
              cy="30"
              rx="13"
              ry="8"
              fill="#43a047"
return <div>Cây bonsai...</div>;
}