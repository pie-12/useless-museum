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
return <div>Bộ đổi đơn vị...</div>;
}