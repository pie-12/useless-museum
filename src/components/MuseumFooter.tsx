export function MuseumFooter() {
  return (
    <footer className="border-t border-black/10 bg-[#fafafa] py-16 mt-20 text-neutral-600 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-black/10">
          {/* Cột 1: Curator Statement */}
          <div className="md:col-span-2 space-y-3">
            <p className="text-[11px] font-bold text-black uppercase tracking-widest">
              LỜI ĐỀ TỪ GIÁM TUYỂN (CURATORIAL STATEMENT)
            </p>
            <p className="text-xs text-neutral-500 leading-relaxed font-sans max-w-lg">
              Bảo tàng được sáng lập nhằm bảo tồn các sáng kiến phần mềm không phục vụ mục đích thương mại hay năng suất công việc. 
              Trong một thế giới bị ám ảnh bởi sự tối ưu hóa và hiệu quả kinh tế, chúng tôi tôn vinh sự vô nghĩa như một hình thái tự do thuần khiết.
            </p>
          </div>

          {/* Cột 2: Danh mục */}
          <div className="space-y-3">
            <p className="text-[11px] font-bold text-black uppercase tracking-widest">
              QUY CHẾ THAM QUAN
            </p>
            <ul className="text-xs space-y-1.5 text-neutral-500">
              <li>• Không thu thập dữ liệu cá nhân</li>
              <li>• Không bán vé hoặc quảng cáo</li>
              <li>• Tự do rời đi bất kỳ lúc nào</li>
            </ul>
          </div>

          {/* Cột 3: Niên giám */}
          <div className="space-y-3">
            <p className="text-[11px] font-bold text-black uppercase tracking-widest">
              LƯU TRỮ VĨNH VIỄN
            </p>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Niên giám: 2026<br />
              Đơn vị chủ quản: Hội đồng Vô Nghiệp Đương Đại.<br />
              Phiên bản: 0.1.0-alpha
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4 pt-8 text-[11px] text-neutral-400">
          <p>© 2026 BẢO TÀNG ĐỒ VÔ DỤNG. ALL MEANINGLESS RIGHTS RESERVED.</p>
          <p className="font-sans text-neutral-500">
            Khảo cứu và phát triển bởi sinh viên Kỹ thuật Phần mềm.
          </p>
        </div>
      </div>
    </footer>
  );
}
