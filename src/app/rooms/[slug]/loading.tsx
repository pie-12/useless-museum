import { Hourglass } from "lucide-react";

export default function RoomLoading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 rounded-full bg-[#eee5d3] border border-[#d8c8b0] flex items-center justify-center mb-4 animate-spin">
        <Hourglass className="w-8 h-8 text-museum-sepia" />
      </div>
      <h2 className="font-serif font-bold text-xl text-museum-wood mb-2">
        Đang Mở Khóa Cửa Phòng...
      </h2>
      <p className="text-xs text-museum-sepia font-mono">
        Bác bảo vệ đang tìm chùm chìa khóa rỉ sét, quý khách vui lòng đợi giây lát.
      </p>
    </div>
  );
}
