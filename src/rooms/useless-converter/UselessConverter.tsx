"use client";

import { useState } from "react";
import { playCalculatorBeep } from "@/lib/sound";

type Category = "length" | "time" | "mass" | "distance";

interface UnitDef {
  id: string;
  name: string;
  factor: number; // 1 unit = factor in base
  margin: string;
}

const UNITS: Record<Category, { baseUnit: string; list: UnitDef[] }> = {
  length: {
    baseUnit: "mét (m)",
    list: [
      { id: "mi-quang", name: "tô mì Quảng kèm rau", factor: 0.8, margin: "±0,3" },
      { id: "tra-da", name: "ly trà đá vỉa hè", factor: 0.08, margin: "±1" },
      { id: "buoc-say", name: "bước chân né vũng nước", factor: 0.45, margin: "±0,5" },
    ],
  },
  time: {
    baseUnit: "phút",
    list: [
      { id: "coi-xe", name: "tiếng còi xe Điện Biên Phủ", factor: 0.0417, margin: "±5" },
      { id: "tho-dai", name: "tiếng thở dài nhìn backlog", factor: 0.2, margin: "±2" },
      { id: "ngong-gio", name: "lần ngóng giờ tan ca", factor: 1.5, margin: "±1" },
    ],
  },
  mass: {
    baseUnit: "kilogram (kg)",
    list: [
      { id: "bao-cat", name: "bao cát dằn mái tôn mùa bão", factor: 35, margin: "±0,2" },
      { id: "che-sau", name: "bịch chè sầu Liên", factor: 0.4, margin: "±0,5" },
      { id: "thung-mi", name: "thùng mì Hảo Hảo cứu lụt", factor: 3.2, margin: "±0,1" },
    ],
  },
  distance: {
    baseUnit: "kilomét (km)",
    list: [
      { id: "hai-van", name: "chiều dài đèo Hải Vân", factor: 21, margin: "±0,1" },
    ],
  },
};

export function UselessConverter() {
  const [category, setCategory] = useState<Category>("length");
  const [selectedUnitId, setSelectedUnitId] = useState<string>("mi-quang");
  const [inputVal, setInputVal] = useState<string>("10");
  const [resultString, setResultString] = useState<string>("≈ 12,5 tô mì Quảng kèm rau (±0,3)");

  const handleCompute = (valStr: string, cat: Category, unitId: string) => {
    playCalculatorBeep();
    const num = parseFloat(valStr.replace(",", "."));
    if (isNaN(num) || num <= 0) {
      setResultString("≈ 0 đơn vị (±0)");
      return;
    }

    const currentList = UNITS[cat].list;
    const unit = currentList.find((u) => u.id === unitId) || currentList[0];
    const rawResult = num / unit.factor;

    const formatted = rawResult >= 100
      ? Math.round(rawResult).toLocaleString("vi-VN")
      : (Math.round(rawResult * 10) / 10).toLocaleString("vi-VN");

    setResultString(`≈ ${formatted} ${unit.name} (${unit.margin})`);
  };

  const handleCategoryChange = (newCat: Category) => {
    playCalculatorBeep();
    setCategory(newCat);
    const firstUnit = UNITS[newCat].list[0];
    setSelectedUnitId(firstUnit.id);
    handleCompute(inputVal, newCat, firstUnit.id);
  };

  const handleUnitChange = (unitId: string) => {
    playCalculatorBeep();
    setSelectedUnitId(unitId);
    handleCompute(inputVal, category, unitId);
  };

  const handleDigit = (digit: string) => {
    playCalculatorBeep();
    const next = inputVal === "0" ? digit : inputVal + digit;
    setInputVal(next);
    handleCompute(next, category, selectedUnitId);
  };

  const handleClear = () => {
    playCalculatorBeep();
    setInputVal("0");
    handleCompute("0", category, selectedUnitId);
  };

  const handleBackspace = () => {
    playCalculatorBeep();
    const next = inputVal.length > 1 ? inputVal.slice(0, -1) : "0";
    setInputVal(next);
    handleCompute(next, category, selectedUnitId);
  };

  return (
    <div className="w-full max-w-md mx-auto py-6 px-3 select-none font-mono">
      {/* Thân máy tính Calc kiểu Win98 */}
      <div className="bg-[#c0c0c0] p-4 win98-box shadow-md">
        {/* Menu chọn loại đơn vị */}
        <div className="grid grid-cols-4 gap-1 mb-3 text-xs">
          <button
            onClick={() => handleCategoryChange("length")}
            className={`win98-btn py-1 font-bold ${category === "length" ? "bg-[#d4d0c8] shadow-inner font-black" : ""}`}
          >
            Dài (m)
          </button>
          <button
            onClick={() => handleCategoryChange("time")}
            className={`win98-btn py-1 font-bold ${category === "time" ? "bg-[#d4d0c8] shadow-inner font-black" : ""}`}
          >
            Thời gian
          </button>
          <button
            onClick={() => handleCategoryChange("mass")}
            className={`win98-btn py-1 font-bold ${category === "mass" ? "bg-[#d4d0c8] shadow-inner font-black" : ""}`}
          >
            Nặng (kg)
          </button>
          <button
            onClick={() => handleCategoryChange("distance")}
            className={`win98-btn py-1 font-bold ${category === "distance" ? "bg-[#d4d0c8] shadow-inner font-black" : ""}`}
          >
            Xa (km)
          </button>
        </div>

        {/* Màn hình số đầu vào */}
        <div className="bg-white win98-window-sunken px-3 py-2 text-right mb-2">
          <span className="text-xs text-gray-500 mr-2">Nhập ({UNITS[category].baseUnit}):</span>
          <span className="text-xl font-bold tracking-wider text-black">{inputVal}</span>
        </div>

        {/* Dropdown chọn quy đổi sang đơn vị nào */}
        <div className="mb-3">
          <label className="text-[11px] text-gray-700 block mb-1">Quy đổi sang:</label>
          <select
            value={selectedUnitId}
            onChange={(e) => handleUnitChange(e.target.value)}
            className="w-full win98-window-sunken bg-white text-xs p-1.5 focus:outline-none"
          >
            {UNITS[category].list.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.margin})
              </option>
            ))}
          </select>
        </div>

        {/* Màn hình kết quả duy nhất (Deadpan, có sai số) */}
        <div className="bg-[#e8f0d8] win98-window-sunken p-3 text-center mb-4 min-h-[4rem] flex items-center justify-center border-2 border-[#808080]">
          <span className="text-sm sm:text-base font-bold text-[#1a2e05] tracking-tight">
            {resultString}
          </span>
        </div>

        {/* Bàn phím số máy tính Win98 */}
        <div className="grid grid-cols-4 gap-1.5 text-sm font-bold">
          <button onClick={() => handleDigit("7")} className="win98-btn py-2">7</button>
          <button onClick={() => handleDigit("8")} className="win98-btn py-2">8</button>
          <button onClick={() => handleDigit("9")} className="win98-btn py-2">9</button>
          <button onClick={handleBackspace} className="win98-btn py-2 text-red-700 font-bold">←</button>

          <button onClick={() => handleDigit("4")} className="win98-btn py-2">4</button>
          <button onClick={() => handleDigit("5")} className="win98-btn py-2">5</button>
          <button onClick={() => handleDigit("6")} className="win98-btn py-2">6</button>
          <button onClick={handleClear} className="win98-btn py-2 text-red-700 font-bold">C</button>

          <button onClick={() => handleDigit("1")} className="win98-btn py-2">1</button>
          <button onClick={() => handleDigit("2")} className="win98-btn py-2">2</button>
          <button onClick={() => handleDigit("3")} className="win98-btn py-2">3</button>
          <button
            onClick={() => handleCompute(inputVal, category, selectedUnitId)}
            className="win98-btn py-2 row-span-2 flex items-center justify-center text-blue-900 font-black text-lg bg-[#d0d0d0]"
          >
            =
          </button>

          <button onClick={() => handleDigit("0")} className="win98-btn py-2 col-span-2">0</button>
          <button
            onClick={() => {
              if (!inputVal.includes(".")) handleDigit(".");
            }}
            className="win98-btn py-2"
          >
            .
          </button>
        </div>
      </div>
    </div>
  );
}
