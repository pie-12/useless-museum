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
        color: "text-amber-600",
      };
    }
    if (hour >= 7 && hour < 9) {
      return {
        title: "Đầu Giờ Sáng Bận Rộn",
        quote: "Sáng rồi đấy. Giờ là lúc tranh nhau ổ bánh mì hay bát phở vỉa hè rồi lao vào dòng kẹt xe.",
        vibe: "Hối hả",
        icon: Coffee,
        color: "text-orange-600",
      };
    }
    if (hour >= 9 && hour < 11) {
      return {
        title: "Giờ Làm Việc Giả Vờ",
        quote: "Mở máy tính lên, gõ lách cách nhiệt tình để trông có vẻ bận rộn.",
        vibe: "Chăm chỉ bề ngoài",
        icon: Clock,
        color: "text-amber-700",
      };
    }
    if (hour >= 11 && hour < 13) {
      return {
        title: "Đại Tiệc Nghĩ Xem Trưa Nay Ăn Gì",
        quote: "Gần trưa rồi. Nhiệm vụ sống còn lúc này là lướt app tìm đồ ăn giảm giá.",
        vibe: "Bụng đói cồn cào",
        icon: Sun,
        color: "text-yellow-600",
      };
    }
    if (hour >= 13 && hour < 15) {
      return {
        title: "Cơn Buồn Ngủ Vực Sâu",
        quote: "Đầu giờ chiều. Cả văn phòng chìm vào trạng thái hôn mê nhẹ, cơ thể kêu gào đòi caffeine.",
        vibe: "Hôn mê",
        icon: Coffee,
        color: "text-stone-600",
      };
    }
    if (hour >= 15 && hour < 17) {
      return {
        title: "Khung Giờ Vàng Trà Sữa",
        quote: "Nửa buổi chiều rồi! Ai gom đơn trà sữa 50% đường 70% đá không?",
        vibe: "Thèm ngọt",
        icon: Sparkles,
        color: "text-pink-600",
      };
    }
    if (hour >= 17 && hour < 19) {
      return {
        title: "Hồi Chuông Tan Tầm",
        quote: "Hết giờ hành chính! Bắt đầu cuộc phiêu lưu vượt ngàn chướng ngại vật kẹt xe về nhà.",
        vibe: "Giải phóng",
        icon: Sun,
        color: "text-red-600",
      };
    }
    if (hour >= 19 && hour < 22) {
      return {
        title: "Buổi Tối Thảnh Thơi",
        quote: "Cơm nước xong xuôi. Giờ là lúc lướt Reels và TikTok vô tri không lối thoát.",
        vibe: "Thư giãn",
        icon: Moon,
        color: "text-indigo-600",
      };
    }
    if (hour >= 22 && hour < 24) {
      return {
        title: "Đêm Muộn Tâm Trạng",
        quote: "Chuẩn bị đi ngủ thôi... trừ khi bạn bất ngờ nhớ ra một chuyện ngượng ngùng từ 5 năm trước.",
        vibe: "Overthinking",
        icon: Moon,
        color: "text-purple-600",
      };
    }
    // Từ 0h đến 5h sáng: đồng hồ lười nói
    return {
      title: "Đồng Hồ Đã Đi Ngủ...",
      quote: "Khò... khò... Muộn thế này mà còn thức xem giờ à? Tắt màn hình đi ngủ ngay!",
      vibe: "Bất cần",
      icon: Moon,
      color: "text-gray-500",
    };
  };

  const vagueData = getVagueDescription(activeHour, activeMinute);
  const IconComponent = vagueData.icon;

  // Xử lý khi user bấm nút "Hỏi lại xem mấy giờ"
  const handleNagClock = () => {
    const nextAnnoyance = annoyanceLevel + 1;
    setAnnoyanceLevel(nextAnnoyance);

    const grumpyResponses = [
      "Vừa mới nói xong mà, hỏi lại làm chi?",
      "Trời đất ơi, nhìn bóng nắng ngoài cửa sổ đi chứ!",
      "Hỏi nữa là đồng hồ đình công đấy nhé.",
      "Bạn rảnh rỗi thật sự, đúng là khách quý của bảo tàng đồ vô dụng.",
      "Đã bảo là không biết giờ chính xác rồi mà!",
      "... (Đồng hồ giả vờ chết lâm sàng)",
    ];

    const message = grumpyResponses[Math.min(nextAnnoyance - 1, grumpyResponses.length - 1)];
    setGrumpyMessage(message);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Khung đồng hồ phong cách Vintage Paper / Gỗ cổ điển */}
      <div className="bg-[#fffdf9] border-2 border-[#d5c7b3] rounded-3xl p-6 sm:p-10 shadow-ticket text-center relative overflow-hidden">
return <div>Đang xem giờ...</div>;
}