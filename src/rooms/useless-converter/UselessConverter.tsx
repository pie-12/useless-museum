"use client";

import { useState } from "react";
import { Calculator, X, Minus, Square, Sparkles, ArrowRightLeft } from "lucide-react";

type UnitType = "distance" | "time" | "money";

export function UselessConverter() {
  const [unitType, setUnitType] = useState<UnitType>("distance");
  const [inputValue, setInputValue] = useState<number>(5);
  const [calculated, setCalculated] = useState<boolean>(true);

  // Tính toán kết quả
  const getResults = () => {
    const val = Number(inputValue) || 0;

    if (unitType === "distance") {
      // Input tính bằng kilomet (km)
      const spacebars = Math.round((val * 1000) / 0.006); // 1 spacebar ~ 6mm
      const traDaGlasses = Math.round((val * 1000) / 0.12); // 1 cốc trà đá ~ 12cm
      const banhMiBaguettes = Math.round((val * 1000) / 0.22); // 1 bánh mì ~ 22cm
      const pacingSteps = Math.round(val * 1350); // bước chân vò đầu bứt tai

      return [
        { label: "Số lần nhấn phím Space nối tiếp nhau", val: spacebars.toLocaleString("vi-VN"), unit: "lần bấm" },
        { label: "Cốc trà đá vỉa hè xếp thẳng hàng", val: traDaGlasses.toLocaleString("vi-VN"), unit: "ly" },
        { label: "Bánh mì Sài Gòn xếp dọc tuyến đường", val: banhMiBaguettes.toLocaleString("vi-VN"), unit: "ổ bánh mì" },
        { label: "Bước chân đi lại vò đầu khi gặp bug", val: pacingSteps.toLocaleString("vi-VN"), unit: "bước đi vô thức" },
      ];
    }

    if (unitType === "time") {
      // Input tính bằng giờ
      const sighs = Math.round(val * 75); // 75 tiếng thở dài mỗi giờ
      const fridgePeeks = Math.round(val * 8); // 8 lần mở tủ lạnh nhìn vào rồi đóng lại
      const fanRotations = Math.round(val * 12000); // vòng quay quạt trần
      const yawnMinutes = Math.round(val * 14); // số phút ngáp

      return [
        { label: "Số tiếng thở dài bất lực trước màn hình", val: sighs.toLocaleString("vi-VN"), unit: "tiếng phù..." },
        { label: "Số lần mở tủ lạnh ra nhìn rồi đóng lại", val: fridgePeeks.toLocaleString("vi-VN"), unit: "lần mở tủ" },
        { label: "Số vòng quay chóng mặt của quạt trần", val: fanRotations.toLocaleString("vi-VN"), unit: "vòng quay" },
        { label: "Tổng thời lượng ngáp chảy nước mắt", val: yawnMinutes.toLocaleString("vi-VN"), unit: "phút ngáp" },
      ];
    }

    // Input tính bằng nghìn VNĐ (k VND)
    const bubbleTeas = (val / 55).toFixed(1); // 55k trà sữa
    const instantNoodles = Math.round((val * 1000) / 4500); // 4.5k mì Hảo Hảo
    const houseFraction = ((val * 1000) / 5000000000 * 100).toFixed(6); // nhà 5 tỷ

    return [
      { label: "Ly trà sữa trân châu full đường 70% đá", val: bubbleTeas, unit: "ly trà sữa" },
      { label: "Gói mì tôm Hảo Hảo chua cay cứu đói", val: instantNoodles.toLocaleString("vi-VN"), unit: "gói mì" },
      { label: "Tỷ lệ mua được căn nhà mặt tiền trung tâm", val: `${houseFraction}%`, unit: "giấc mơ xa vời" },
    ];
  };

  const results = getResults();

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Khung cửa sổ Windows 98 cổ điển */}
      <div className="win98-box p-1 font-mono text-sm max-w-xl mx-auto shadow-2xl">
        {/* Title Bar màu xanh gradient Win98 */}
        <div className="bg-gradient-to-r from-[#000080] via-[#1034a6] to-[#1084d0] text-white font-bold px-2 py-1 flex items-center justify-between select-none">
          <div className="flex items-center gap-1.5 text-xs">
            <Calculator className="w-3.5 h-3.5" />
            <span>UselessUnitConverter.exe - [Phiên Bản 1998]</span>
          </div>
          <div className="flex items-center gap-1">
            <button className="win98-btn w-4 h-4 text-[10px] text-black font-black flex items-center justify-center">
              <Minus className="w-2.5 h-2.5" />
            </button>
            <button className="win98-btn w-4 h-4 text-[10px] text-black font-black flex items-center justify-center">
              <Square className="w-2 h-2" />
            </button>
            <button className="win98-btn w-4 h-4 text-[10px] text-black font-black flex items-center justify-center">
              <X className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>

        {/* Nội dung bên trong cửa sổ */}
        <div className="p-4 bg-[#c0c0c0] text-black">
          {/* Menu chọn loại đại lượng */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => {
                setUnitType("distance");
                setInputValue(5);
              }}
              className={`win98-btn px-3 py-1.5 text-xs font-bold ${
                unitType === "distance" ? "bg-[#dfdfdf] border-inset" : ""
              }`}
            >
              📏 Khoảng Cách (km)
            </button>
            <button
              onClick={() => {
                setUnitType("time");
                setInputValue(2);
              }}
              className={`win98-btn px-3 py-1.5 text-xs font-bold ${
                unitType === "time" ? "bg-[#dfdfdf] border-inset" : ""
              }`}
            >
              ⏳ Thời Gian (giờ)
            </button>
            <button
              onClick={() => {
                setUnitType("money");
                setInputValue(100);
              }}
              className={`win98-btn px-3 py-1.5 text-xs font-bold ${
                unitType === "money" ? "bg-[#dfdfdf] border-inset" : ""
              }`}
            >
              💰 Tiền Tệ (k VNĐ)
            </button>
          </div>

          {/* Ô nhập liệu */}
          <div className="mb-4">
            <label className="block text-xs font-bold mb-1">
              Nhập giá trị cần quy đổi:
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                min="0"
                value={inputValue}
                onChange={(e) => setInputValue(Math.max(0, Number(e.target.value)))}
                className="w-full bg-white border-2 border-t-[#808080] border-l-[#808080] border-r-white border-b-white px-3 py-2 text-base font-mono outline-none shadow-inner"
              />
              <span className="win98-box px-3 py-2 font-bold text-xs flex items-center">
                {unitType === "distance" ? "km" : unitType === "time" ? "giờ" : ".000 đ"}
              </span>
            </div>
          </div>

          {/* Bảng kết quả quy đổi */}
          <div className="bg-white border-2 border-t-[#808080] border-l-[#808080] border-r-white border-b-white p-3 mb-4 space-y-3">
            <p className="text-[11px] font-bold text-[#000080] border-b border-gray-300 pb-1">
              KẾT QUẢ ĐÃ ĐƯỢC CHỨNG NHẬN VÔ NGHĨA:
            </p>

            {results.map((res, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                <span className="text-gray-700">{res.label}:</span>
                <span className="font-bold text-black bg-[#f0f0f0] px-2 py-0.5 rounded border border-gray-300 font-mono">
                  {res.val} <span className="text-[10px] text-gray-500 font-normal">{res.unit}</span>
                </span>
              </div>
            ))}
          </div>

          {/* Chân cửa sổ Win98 */}
          <div className="flex items-center justify-between text-[11px] text-gray-600 border-t border-gray-400 pt-2">
            <span>Trạng thái: 100% Không có giá trị thực tế</span>
            <button
              onClick={() => setInputValue(Math.floor(Math.random() * 50) + 1)}
              className="win98-btn px-2 py-1 text-[11px] font-bold flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>Số ngẫu nhiên</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
