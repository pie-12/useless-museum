"use client";

import { useState, useEffect, useRef } from "react";
import { BatteryCharging, BatteryWarning, Battery, Coffee, RotateCcw, Flame } from "lucide-react";

export function TiredKeyboard() {
  const [inputText, setInputText] = useState("");
  const [stamina, setStamina] = useState(100);
  const [isExhausted, setIsExhausted] = useState(false);
  const [totalKeyStrokes, setTotalKeyStrokes] = useState(0);
  const [collapseCount, setCollapseCount] = useState(0);
  const [complaint, setComplaint] = useState<string | null>(null);

  const lastKeyTimeRef = useRef<number>(Date.now());
  const staminaRef = useRef<number>(100);

  // Vòng lặp hồi phục thể lực khi người dùng nghỉ tay
  useEffect(() => {
    const recoveryInterval = setInterval(() => {
      const now = Date.now();
      const idleTime = now - lastKeyTimeRef.current;

      if (idleTime > 1500) {
        setStamina((prev) => {
          const next = Math.min(100, prev + 8);
          staminaRef.current = next;
          if (next > 20) {
            setIsExhausted(false);
          }
          if (next === 100) {
            setComplaint(null);
          }
          return next;
        });
      }
    }, 300);

    return () => clearInterval(recoveryInterval);
  }, []);

  // Xử lý khi gõ phím
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (isExhausted) {
      e.preventDefault();
      setComplaint("Bàn phím đã bất tỉnh nhân sự! Xin đừng gõ nữa, hãy cho nó nghỉ 3 giây...");
      return;
    }

    lastKeyTimeRef.current = Date.now();
    setTotalKeyStrokes((prev) => prev + 1);

    // Tính lượng thể lực bị tiêu hao
    setStamina((prev) => {
      const drain = Math.floor(Math.random() * 3) + 3; // Mất 3-5% mỗi phím
      const next = Math.max(0, prev - drain);
      staminaRef.current = next;

      if (next <= 0) {
        setIsExhausted(true);
        setCollapseCount((c) => c + 1);
        setComplaint("Bàn phím kiệt sức gục ngã! (Đang thở oxy...)");
      } else if (next < 25) {
        setComplaint("Phù... phù... gõ chậm lại chút đi bạn ơi, ngón tay bạn là súng máy à?");
      } else if (next < 50) {
        setComplaint("Bắt đầu thấy mỏi tay rồi đấy nhé...");
      }

      return next;
    });
  };

  const getBatteryColor = () => {
    if (stamina > 60) return "bg-emerald-500 text-emerald-700";
    if (stamina > 25) return "bg-amber-500 text-amber-700";
    return "bg-rose-500 text-rose-700 animate-pulse";
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-[#fffdf9] border-2 border-[#d5c7b3] rounded-3xl p-6 sm:p-10 shadow-ticket">
        {/* Header phòng */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#dfd6c6] mb-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-museum-stamp font-bold">
              ★ PHÒNG 10 • BẢN TEST THỂ LỰC ★
            </span>
            <h2 className="font-serif font-black text-2xl sm:text-3xl text-museum-wood mt-1">
              Bàn Phím Biết Mệt
            </h2>
            <p className="text-xs text-museum-sepia mt-1">
return <div>Máy đánh chữ...</div>;
}