"use client";

import { useState, useEffect } from "react";
import { Clock, RefreshCw, Sun, Moon, Coffee, SlidersHorizontal, Sparkles } from "lucide-react";

export function VagueClock() {
  const [realTime, setRealTime] = useState<Date | null>(null);
  const [simulatedHour, setSimulatedHour] = useState<number | null>(null);
  const [annoyanceLevel, setAnnoyanceLevel] = useState<number>(0);
  const [grumpyMessage, setGrumpyMessage] = useState<string | null>(null);

  useEffect(() => {
    setRealTime(new Date());
    const timer = setInterval(() => {
      setRealTime(new Date());
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const activeHour = simulatedHour !== null ? simulatedHour : (realTime ? realTime.getHours() : 12);
  const activeMinute = simulatedHour !== null ? 30 : (realTime ? realTime.getMinutes() : 0);

  // Bộ dịch thời gian mơ hồ
  const getVagueDescription = (hour: number, minute: number) => {
    if (hour >= 5 && hour < 7) {
      return {
        title: "Trời Tờ Mờ Sáng",
        quote: "Mắt nhắm mắt mở... Khuyên thật là nên kéo chăn trùm đầu ngủ tiếp.",
        vibe: "Ngái ngủ",
        icon: Sun,
return <div>Đang xem giờ...</div>;
}