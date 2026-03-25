"use client";

import { useState, useEffect } from "react";
import { playClockTick } from "@/lib/sound";

const MORNING_PHRASES = ["Sáng rồi.", "Đang buổi sáng.", "Mới sáng ngày ra."];
const NOON_PHRASES = ["Gần trưa rồi.", "Đang giờ trưa.", "Trưa trờ trưa trật."];
const AFTERNOON_PHRASES = ["Chiều chiều rồi.", "Xế chiều rồi.", "Đang nửa buổi chiều."];
const EVENING_PHRASES = ["Tối rồi.", "Nhá nhem tối.", "Tối mịt rồi."];
const NIGHT_PHRASES = ["Khuya rồi.", "Nửa đêm nửa hôm.", "Đêm hôm khuya khoắt."];

export function VagueClock() {
  const [tapCount, setTapCount] = useState<number>(1);
  const [message, setMessage] = useState<string>("Đang xem giờ...");
  const [angles, setAngles] = useState<{ hour: number; minute: number }>({ hour: 73, minute: 218 });

  const getTodayKey = () => {
    const today = new Date().toISOString().slice(0, 10);
    return `vague_clock_taps_${today}`;
  };

  const getPhraseForCurrentTime = (tapIndex: number) => {
    if (tapIndex >= 10) {
      return "Đừng hỏi nữa.";
    }
    if (tapIndex >= 5) {
      return "Một lúc nào đó.";
    }

    const hour = new Date().getHours();
    let pool = MORNING_PHRASES;

    if (hour >= 5 && hour < 11) {
      pool = MORNING_PHRASES;
    } else if (hour >= 11 && hour < 14) {
      pool = NOON_PHRASES;
    } else if (hour >= 14 && hour < 18) {
      pool = AFTERNOON_PHRASES;
    } else if (hour >= 18 && hour < 22) {
      pool = EVENING_PHRASES;
    } else {
      pool = NIGHT_PHRASES;
    }

    // Pick phrase predictably or pseudo-randomly
    const idx = (tapIndex - 1) % pool.length;
    return pool[idx];
  };

  useEffect(() => {
    const saved = localStorage.getItem(getTodayKey());
    const count = saved ? parseInt(saved, 10) : 1;
    setTapCount(count);
    setMessage(getPhraseForCurrentTime(count));

    // Random non-realistic angles on load
    setAngles({
      hour: Math.floor(Math.random() * 360),
      minute: Math.floor(Math.random() * 360),
    });
  }, []);

  const handleClockTap = () => {
    playClockTick();
    const nextCount = tapCount + 1;
    setTapCount(nextCount);
    localStorage.setItem(getTodayKey(), nextCount.toString());
    setMessage(getPhraseForCurrentTime(nextCount));

    // Slight arbitrary nudge of hands when tapped
    setAngles((prev) => ({
      hour: (prev.hour + 17) % 360,
      minute: (prev.minute + 43) % 360,
    }));
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-10 px-4 select-none">
      {/* Mặt đồng hồ tối giản, không số, kim lệch */}
      <button
        onClick={handleClockTap}
        aria-label="Xem giờ mơ hồ"
        className="group relative w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-[#f0f0f0] border-4 border-[#333333] shadow-inner flex items-center justify-center cursor-pointer transition-transform active:scale-95 focus:outline-none"
      >
        {/* Tâm đồng hồ */}
        <div className="w-4 h-4 rounded-full bg-[#111111] z-20" />

        {/* Kim giờ (ngắn, dày) */}
        <div
          className="absolute w-2 h-20 bg-[#222222] rounded-full origin-bottom z-10 transition-transform duration-300"
          style={{
            transform: `translateY(-50%) rotate(${angles.hour}deg)`,
            transformOrigin: "bottom center",
            bottom: "50%",
          }}
        />

        {/* Kim phút (dài, mảnh) */}
        <div
          className="absolute w-1.5 h-28 bg-[#444444] rounded-full origin-bottom z-10 transition-transform duration-300"
          style={{
            transform: `translateY(-50%) rotate(${angles.minute}deg)`,
            transformOrigin: "bottom center",
            bottom: "50%",
          }}
        />

        {/* Chấm nhỏ ở 4 hướng tượng trưng */}
        <div className="absolute top-3 w-1.5 h-1.5 rounded-full bg-[#888888]" />
        <div className="absolute bottom-3 w-1.5 h-1.5 rounded-full bg-[#888888]" />
        <div className="absolute left-3 w-1.5 h-1.5 rounded-full bg-[#888888]" />
        <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-[#888888]" />
      </button>

      {/* Dòng chữ chết lặng / Deadpan */}
      <div className="mt-8 text-center min-h-[4rem] flex flex-col items-center justify-center">
        <p className="text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight">
          {message}
        </p>
        <p className="text-xs text-[#666666] font-mono mt-2">
          (Chạm vào đồng hồ để hỏi tiếp • Đã hỏi {tapCount} lần)
        </p>
      </div>
    </div>
  );
}
