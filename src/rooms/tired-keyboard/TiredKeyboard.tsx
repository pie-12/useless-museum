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

return <div>Máy đánh chữ...</div>;
}