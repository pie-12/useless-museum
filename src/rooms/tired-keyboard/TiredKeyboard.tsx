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
              Hãy thử gõ một đoạn văn thật nhanh và xem bàn phím của bạn chịu đựng được bao lâu.
            </p>
          </div>

          {/* Thanh thể lực (Stamina Bar) */}
          <div className="w-full sm:w-64 bg-[#eee4d2] p-3 rounded-2xl border border-[#d8c8b0]">
            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
              <span className="flex items-center gap-1 font-bold text-museum-wood">
                {stamina > 60 ? (
                  <BatteryCharging className="w-4 h-4 text-emerald-600" />
                ) : stamina > 25 ? (
                  <Battery className="w-4 h-4 text-amber-600" />
                ) : (
                  <BatteryWarning className="w-4 h-4 text-rose-600 animate-bounce" />
                )}
                Thể lực phím:
              </span>
              <span className="font-bold">{stamina}%</span>
            </div>

            <div className="w-full h-3 bg-[#ded1bd] rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-200 ${getBatteryColor()}`}
                style={{ width: `${stamina}%` }}
              />
            </div>
          </div>
        </div>

        {/* Lời than vãn của bàn phím */}
        {complaint && (
          <div
            className={`p-3 rounded-xl mb-4 text-xs font-mono border transition-all ${
              isExhausted
                ? "bg-rose-50 border-rose-200 text-rose-800 font-bold"
                : "bg-amber-50 border-amber-200 text-amber-800"
            }`}
          >
            💬 {complaint}
          </div>
        )}

        {/* Khung gõ phím */}
        <div className="relative mb-6">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              isExhausted
                ? "Bàn phím đang ngất xỉu... xin vui lòng dừng gõ để hồi sức!"
                : "Thử gõ vào đây: 'Hôm nay tôi rảnh rỗi ghé thăm bảo tàng đồ vô dụng và tôi gõ như bay...'"
            }
            disabled={isExhausted}
            rows={6}
            className={`w-full p-4 rounded-2xl font-mono text-sm border-2 transition-all outline-none resize-none ${
              isExhausted
                ? "bg-rose-50/50 border-rose-300 text-rose-400 cursor-not-allowed"
                : stamina < 30
                ? "bg-[#fffaf0] border-amber-400 text-stone-800 shadow-inner"
return <div>Máy đánh chữ...</div>;
}