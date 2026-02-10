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
          >
            <Compass className="w-4 h-4" />
            <span>Xem Toàn Bộ Sơ Đồ Bảo Tàng</span>
          </a>
        </div>
      </section>

      {/* Thanh bộ lọc danh mục */}
      <div id="room-list" className="pt-4 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#dfd6c6]">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-museum-wood text-lg">
              Sơ Đồ 15 Gian Trưng Bày
            </span>
            <span className="text-xs font-mono bg-[#e8ded0] text-museum-sepia px-2 py-0.5 rounded-full border border-[#d4c6b2]">
              {filteredRooms.length} phòng
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                filterStatus === "all"
                  ? "bg-museum-wood text-white font-bold"
                  : "bg-[#eee4d2] text-museum-sepia hover:bg-[#e3d7c3]"
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setFilterStatus("open")}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                filterStatus === "open"
                  ? "bg-emerald-800 text-white font-bold"
                  : "bg-[#eee4d2] text-museum-sepia hover:bg-[#e3d7c3]"
              }`}
            >
              Đang mở cửa
            </button>
            <button
              onClick={() => setFilterStatus("coming-soon")}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                filterStatus === "coming-soon"
                  ? "bg-amber-800 text-white font-bold"
                  : "bg-[#eee4d2] text-museum-sepia hover:bg-[#e3d7c3]"
              }`}
            >
              Sắp ra mắt
            </button>
          </div>
        </div>
      </div>

      {/* Lưới các phòng triển lãm */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room) => {
          const isOpen = room.status === "open";

          return (
            <div
              key={room.id}
              className={`relative flex flex-col justify-between rounded-xl border transition-all duration-300 ${
                isOpen
                  ? "bg-[#fffdfa] border-[#d8cdb9] shadow-sm hover:shadow-ticket hover:-translate-y-1 hover:border-[#bfae95]"
                  : "bg-[#f5ede2]/60 border-[#ded3c2] opacity-80"
              }`}
            >
              {/* Header của thẻ phòng */}
              <div className="p-5 pb-3">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-xs font-bold text-museum-stamp px-2 py-0.5 rounded bg-[#f7e6e6] border border-[#f0cccc]">
                    PHÒNG {room.roomNumber < 10 ? `0${room.roomNumber}` : room.roomNumber}
                  </span>

                  <span
                    className={`text-[11px] font-mono px-2 py-0.5 rounded-full flex items-center gap-1 ${
                      isOpen
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}
                  >
                    {isOpen ? (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Đang mở cửa
                      </>
                    ) : (
                      <>
                        <Hammer className="w-3 h-3" />
                        Đang lắp đặt
                      </>
                    )}
                  </span>
                </div>

                <h3 className="font-serif font-black text-xl text-museum-wood mb-1">
                  {room.title}
                </h3>
                <p className="text-xs font-serif italic text-museum-stamp mb-3">
return <div className='min-h-screen bg-museum-paper'></div>;
}