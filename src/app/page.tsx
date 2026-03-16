"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MUSEUM_ROOMS } from "@/config/rooms.config";
import { ArrowUpRight, ArrowRight, Shuffle } from "lucide-react";

export default function EditorialMuseumLobby() {
  const router = useRouter();
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const handleRandomRoom = () => {
    const openRooms = MUSEUM_ROOMS.filter((r) => r.status === "open");
    if (openRooms.length === 0) return;
    const randomIndex = Math.floor(Math.random() * openRooms.length);
    const chosenRoom = openRooms[randomIndex];
    router.push(`/rooms/${chosenRoom.id}`);
  };

  const filteredRooms = MUSEUM_ROOMS.filter((room) => {
    if (filterStatus === "open" && room.status !== "open") return false;
    if (filterStatus === "coming-soon" && room.status === "open") return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
      {/* Hero Exhibition Header */}
      <section className="mb-16 sm:mb-24 border-b border-black/10 pb-12 sm:pb-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-3">
              [ TRIỂN LÃM THƯỜNG TRỰC • SỐ DANH MỤC: 2026-FUTILE ]
            </p>
            <h1 className="font-serif font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-black leading-[1.05] uppercase">
              Bảo Tàng <br />
              Đồ Vô Dụng.
            </h1>
            <p className="mt-6 text-neutral-600 text-sm sm:text-base leading-relaxed max-w-2xl font-sans">
              Khảo cứu thị giác và tương tác về 15 hiện vật phần mềm được chế tác kỳ công nhưng triệt để không mang lại bất kỳ giá trị kinh tế nào. 
              Một lời châm biếm nghiêm túc trước nỗi ám ảnh về năng suất công việc của kỷ nguyên số.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={handleRandomRoom}
              className="px-6 py-3.5 bg-black text-white hover:bg-neutral-800 text-xs font-mono uppercase tracking-wider font-semibold flex items-center justify-center gap-2.5 transition-all group"
            >
              <Shuffle className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
              <span>Phòng Ngẫu Nhiên</span>
            </button>
            <a
              href="#exhibits"
              className="px-6 py-3.5 border border-black/20 hover:border-black text-black text-xs font-mono uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <span>Sơ Đồ Danh Mục</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Exhibition Grid Controls */}
      <div id="exhibits" className="mb-10 flex flex-wrap items-baseline justify-between gap-4 border-b border-black pb-4">
        <div className="flex items-baseline gap-3">
          <h2 className="font-serif font-black text-2xl text-black uppercase tracking-tight">
            Danh Mục Hiện Vật
          </h2>
          <span className="font-mono text-xs text-neutral-400">
            ({filteredRooms.length}/15)
          </span>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-3 py-1 transition-colors ${
              filterStatus === "all"
                ? "bg-black text-white font-bold"
                : "text-neutral-500 hover:text-black"
            }`}
          >
            TẤT CẢ ({MUSEUM_ROOMS.length})
          </button>
          <button
            onClick={() => setFilterStatus("open")}
            className={`px-3 py-1 transition-colors ${
              filterStatus === "open"
                ? "bg-black text-white font-bold"
                : "text-neutral-500 hover:text-black"
            }`}
          >
            ĐANG MỞ CỬA ({MUSEUM_ROOMS.filter((r) => r.status === "open").length})
          </button>
          <button
            onClick={() => setFilterStatus("coming-soon")}
            className={`px-3 py-1 transition-colors ${
              filterStatus === "coming-soon"
                ? "bg-black text-white font-bold"
                : "text-neutral-500 hover:text-black"
            }`}
          >
            ĐANG LẮP ĐẶT ({MUSEUM_ROOMS.filter((r) => r.status !== "open").length})
          </button>
        </div>
      </div>

      {/* Minimalist Gallery Placards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRooms.map((room) => {
          const isOpen = room.status === "open";

          return (
            <article
              key={room.id}
              className={`group flex flex-col justify-between p-6 border transition-all duration-300 relative ${
                isOpen
                  ? "border-black/15 hover:border-black bg-white"
                  : "border-dashed border-neutral-300 bg-neutral-50/50 opacity-70"
              }`}
            >
              {/* Placard Meta Header */}
              <div>
                <div className="flex items-baseline justify-between font-mono text-xs pb-4 mb-4 border-b border-neutral-100">
                  <span className="font-bold text-black tracking-widest">
                    № {room.roomNumber < 10 ? `0${room.roomNumber}` : room.roomNumber}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                    {isOpen ? (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-black" />
                        <span className="text-black font-semibold">Đang mở</span>
                      </>
                    ) : (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                        <span className="text-neutral-400">Đang lưu kho</span>
                      </>
                    )}
                  </span>
                </div>

                {/* Exhibit Title */}
                <h3 className="font-serif font-black text-2xl text-black tracking-tight mb-1 group-hover:underline">
                  {room.title}
                </h3>

                <p className="font-mono text-[11px] text-neutral-400 mb-4 uppercase tracking-wider">
                  {room.author} • {room.styleTheme}
                </p>

                {/* Conceptual blurb */}
                <p className="text-xs text-neutral-600 leading-relaxed font-sans mb-6 line-clamp-3">
                  {room.description}
                </p>
              </div>

              {/* Placard Bottom Link */}
              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between font-mono text-xs">
                <div className="flex gap-1.5 text-[10px] text-neutral-400">
                  {room.tags.slice(0, 2).map((t) => (
                    <span key={t}>#{t}</span>
                  ))}
                </div>

                {isOpen ? (
                  <Link
                    href={`/rooms/${room.id}`}
                    className="inline-flex items-center gap-1 font-bold text-black hover:opacity-60 transition-opacity uppercase tracking-wider text-[11px]"
                  >
                    <span>Vào Xem</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <span className="text-[10px] text-neutral-400 uppercase tracking-widest">
                    Chờ duyệt
                  </span>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
