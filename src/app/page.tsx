"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MUSEUM_ROOMS } from "@/config/rooms.config";
import { Sparkles, Compass, DoorOpen, Hammer, Tag, ArrowRight, Dices } from "lucide-react";

export default function MuseumLobby() {
  const router = useRouter();
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Xử lý nút dịch chuyển ngẫu nhiên
  const handleRandomRoom = () => {
    const openRooms = MUSEUM_ROOMS.filter((r) => r.status === "open");
    if (openRooms.length === 0) return;
    const randomIndex = Math.floor(Math.random() * openRooms.length);
    const chosenRoom = openRooms[randomIndex];
    router.push(`/rooms/${chosenRoom.id}`);
  };

  const filteredRooms = MUSEUM_ROOMS.filter((room) => {
    if (filterCategory !== "all" && room.category !== filterCategory) return false;
    if (filterStatus === "open" && room.status !== "open") return false;
    if (filterStatus === "coming-soon" && room.status === "open") return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
      {/* Tiền sảnh / Hero Section */}
      <section className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eee5d3] border border-[#d8c8b0] text-xs font-mono text-museum-wood mb-4">
          <Sparkles className="w-3.5 h-3.5 text-museum-stamp" />
          <span>Triển lãm thường trực • Mở cửa 24/7 không nghỉ lễ</span>
        </div>

        <h1 className="font-serif font-black text-3xl sm:text-5xl tracking-tight text-museum-wood leading-tight mb-4">
          Bảo Tàng Đồ Vô Dụng
        </h1>

        <p className="text-museum-sepia text-sm sm:text-base leading-relaxed mb-8">
          Nơi lưu giữ 15 công trình phần mềm được chế tác kỳ công nhưng hoàn toàn vô nghĩa. 
          Không tạo ra giá trị kinh tế, không giúp bạn thăng tiến, chỉ giúp bạn cười một cái rồi quay lại làm việc tiếp.
        </p>

        {/* Nút bấm chủ đạo: Dắt tôi đến phòng ngẫu nhiên */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleRandomRoom}
            className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-museum-stamp hover:bg-[#8f2727] text-white font-serif font-bold text-base flex items-center justify-center gap-2.5 shadow-ticket transition-all hover:scale-105 active:scale-95"
          >
            <Dices className="w-5 h-5 animate-pulse" />
            <span>Dắt Tôi Tới Một Phòng Ngẫu Nhiên</span>
          </button>

          <a
            href="#room-list"
            className="w-full sm:w-auto px-5 py-3.5 rounded-lg bg-[#efe7d8] hover:bg-[#e4dac7] text-museum-wood border border-[#d5c7b3] font-serif text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
return <div className='min-h-screen bg-museum-paper'></div>;
}