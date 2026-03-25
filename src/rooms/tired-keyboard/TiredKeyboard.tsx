"use client";

import { useState, useEffect, useRef } from "react";
import { playTypewriterClack } from "@/lib/sound";

const PRIORITY_KEYS = ["E", "A", "O", "I", "N", "T", "H", "C", "R", "S", "L", "M", "D", "U", "B", "G", "V", "K", "Y", "P"];

const KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

export function TiredKeyboard() {
  const [text, setText] = useState<string>("");
  const [restingKeys, setRestingKeys] = useState<string[]>([]);
  const [typedSinceLastRest, setTypedSinceLastRest] = useState<number>(0);

  const lastTypedAtRef = useRef<number>(Date.now());
  const restingKeysRef = useRef<string[]>([]);
  restingKeysRef.current = restingKeys;

  // Auto recover 1 key every 5s after 30s of inactivity
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const idleTime = now - lastTypedAtRef.current;

      if (idleTime >= 30000 && restingKeysRef.current.length > 0) {
        setRestingKeys((prev) => prev.slice(0, prev.length - 1));
        lastTypedAtRef.current = now - 25000; // Next key in 5s
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const triggerNextRestingKey = () => {
    setRestingKeys((prev) => {
      if (prev.length >= 8) return prev;
      // Find candidate from priority keys
      const candidate = PRIORITY_KEYS.find((k) => !prev.includes(k));
      if (candidate) {
        return [...prev, candidate];
      }
      return prev;
    });
  };

  const handleCharInput = (char: string) => {
    const upper = char.toUpperCase();
    if (restingKeys.includes(upper)) {
      // Key on strike - reject input
      return;
    }

    playTypewriterClack();
    lastTypedAtRef.current = Date.now();
    setText((prev) => prev + char);

    const nextCount = typedSinceLastRest + 1;
    if (nextCount >= 60) {
      setTypedSinceLastRest(0);
      triggerNextRestingKey();
    } else {
      setTypedSinceLastRest(nextCount);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Backspace") {
      playTypewriterClack();
      setText((prev) => prev.slice(0, -1));
      return;
    }
    if (e.key === "Enter") {
      playTypewriterClack();
      setText((prev) => prev + "\n");
      return;
    }
    if (e.key === " ") {
      playTypewriterClack();
      setText((prev) => prev + " ");
      return;
    }

    if (e.key.length === 1) {
      e.preventDefault();
      handleCharInput(e.key);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-4 px-2 select-none font-mono">
      {/* Tờ giấy máy đánh chữ cổ điển */}
      <div className="bg-[#faf8f2] border-2 border-[#d0c8b8] p-5 shadow-inner mb-6 min-h-[14rem] relative">
        <div className="absolute top-2 right-3 text-[10px] text-gray-400 uppercase tracking-widest font-mono">
          Máy đánh chữ cơ học
        </div>

        <textarea
          value={text}
          onChange={() => {}}
          onKeyDown={handleKeyDown}
          placeholder="Gõ thử vào đây... Hãy xem bạn gõ được bao lâu trước khi các phím rủ nhau đi ngủ."
          className="w-full h-40 bg-transparent resize-none focus:outline-none text-[#222222] font-mono text-base leading-relaxed"
          autoFocus
        />

        <div className="mt-2 pt-2 border-t border-[#e5dfd3] flex justify-between text-xs text-gray-500">
          <span>Ký tự đã gõ: {text.length}</span>
          <span>Phím nghỉ phép: {restingKeys.length}/8</span>
        </div>
      </div>

      {/* Bàn phím ảo mô phỏng trạng thái phím */}
      <div className="bg-[#dcdcdc] p-3 win98-box">
        <div className="flex flex-col items-center gap-1.5">
          {KEYBOARD_ROWS.map((row, rowIdx) => (
            <div key={rowIdx} className="flex gap-1 justify-center w-full">
              {row.map((k) => {
                const isResting = restingKeys.includes(k);
                return (
                  <button
                    key={k}
                    type="button"
                    disabled={isResting}
                    onClick={() => handleCharInput(k.toLowerCase())}
                    className={`h-11 sm:h-12 flex-1 max-w-[48px] rounded flex flex-col items-center justify-center font-bold transition-colors ${
                      isResting
                        ? "bg-[#b0b0b0] text-gray-600 border border-gray-400 cursor-not-allowed shadow-inner opacity-60"
                        : "win98-btn bg-[#efefef] text-gray-900 active:bg-gray-300 cursor-pointer"
                    }`}
                  >
                    {isResting ? (
                      <>
                        <span className="text-[9px] line-through text-red-700 leading-none">{k}</span>
                        <span className="text-[8px] text-red-900 font-normal leading-none mt-0.5">Nghỉ phép</span>
                      </>
                    ) : (
                      <span className="text-sm sm:text-base leading-none">{k}</span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}

          {/* Hàng phím Space & Xóa */}
          <div className="flex gap-1 justify-center w-full mt-1">
            <button
              type="button"
              onClick={() => {
                playTypewriterClack();
                setText((prev) => prev.slice(0, -1));
              }}
              className="win98-btn px-4 py-2 text-xs font-bold text-gray-800"
            >
              Xóa
            </button>
            <button
              type="button"
              onClick={() => handleCharInput(" ")}
              className="win98-btn flex-1 py-2 text-xs font-bold text-gray-700"
            >
              Space
            </button>
            <button
              type="button"
              onClick={() => handleCharInput("\n")}
              className="win98-btn px-4 py-2 text-xs font-bold text-gray-800"
            >
              Enter
            </button>
          </div>
        </div>

        {/* Chú thích Deadpan */}
        <div className="text-center text-[11px] text-gray-600 mt-3">
          {restingKeys.length > 0
            ? "Các phím đang nghỉ phép sẽ trở lại nếu bạn ngồi yên 30 giây."
            : "Gõ mỗi 60 ký tự sẽ có một phím tự dán nhãn nghỉ phép."}
        </div>
      </div>
    </div>
  );
}
