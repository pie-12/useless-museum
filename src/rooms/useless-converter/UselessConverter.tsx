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
return <div>Bộ đổi đơn vị...</div>;
}