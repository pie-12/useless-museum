import Link from "next/link";
import { Heart, Compass, ShieldCheck } from "lucide-react";

export function MuseumFooter() {
  return (
    <footer className="border-t border-[#d8d0c0] bg-[#f4eee1] py-10 mt-16 text-museum-sepia">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-[#dfd6c6]">
          {/* Cột 1: Thông điệp bảo tàng */}
          <div>
            <h4 className="font-serif font-bold text-museum-wood text-base mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-museum-stamp inline-block" />
              Tuyên Cáo Vô Nghiệp
            </h4>
            <p className="text-xs leading-relaxed text-museum-sepia">
              Mọi sản phẩm trong bảo tàng này đều không có giá trị thương mại hay năng suất công việc. 
              Mục đích duy nhất là mang lại tiếng cười cho người xem và giúp bạn xả stress giữa những dòng code dài vô tận.
            </p>
          </div>

          {/* Cột 2: Triết lý vận hành */}
          <div>
            <h4 className="font-serif font-bold text-museum-wood text-base mb-2">
              Chính Sách Khách Tham Quan
            </h4>
            <ul className="text-xs space-y-1.5 list-disc list-inside">
              <li>Không yêu cầu tạo tài khoản</li>
              <li>Không gắn cookie theo dõi</li>
              <li>Không bán khóa học làm giàu</li>
              <li>Được phép bấm hỏng chuột thoải mái</li>
            </ul>
          </div>

          {/* Cột 3: Con dấu niêm phong */}
          <div className="flex flex-col items-start md:items-end justify-between">
            <div className="border-2 border-dashed border-[#bda68c] p-3 rounded-md bg-[#faf7f0] text-center w-full max-w-xs">
              <p className="text-[10px] uppercase font-mono tracking-widest text-museum-stamp font-bold">
                ★ CHỨNG NHẬN VÔ NGHĨA ★
              </p>
              <p className="text-xs font-serif italic text-museum-wood mt-0.5">
                Cấp bởi Hội Đồng Rảnh Rỗi Quốc Tế
              </p>
              <p className="text-[10px] font-mono text-gray-500 mt-1">
                Ký duyệt: Năm 2026
              </p>
            </div>
          </div>
        </div>

        {/* Bản quyền & Tác giả */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <p>© 2026 Bảo Tàng Đồ Vô Dụng. Mọi quyền vô dụng được bảo lưu.</p>
          <p className="flex items-center gap-1">
            Thiết kế với <Heart className="w-3.5 h-3.5 text-museum-stamp fill-museum-stamp" /> bởi sinh viên Kỹ thuật Phần mềm.
          </p>
        </div>
      </div>
    </footer>
  );
}
