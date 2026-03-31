"use client";

import { useState, useRef, useEffect } from "react";
import { playMechanicalClick, playCalculatorBeep } from "@/lib/sound";
import { Download, RotateCcw } from "lucide-react";

interface Question {
  q: string;
  options: { label: string; bugType: number }[];
}

const QUESTIONS: Question[] = [
  {
    q: "Sáng dậy bạn nghĩ gì?",
    options: [
      { label: "Ngủ tiếp", bugType: 1 },
      { label: "Thở dài", bugType: 3 },
      { label: "Quên rồi", bugType: 2 },
    ],
  },
  {
    q: "Đi làm bằng gì?",
    options: [
      { label: "Xe máy", bugType: 5 },
      { label: "Đi bộ", bugType: 2 },
      { label: "Không đi", bugType: 1 },
    ],
  },
  {
    q: "Khi gặp khó khăn?",
    options: [
      { label: "Bỏ qua", bugType: 1 },
      { label: "Đổ lỗi", bugType: 4 },
      { label: "Đi ngủ", bugType: 3 },
    ],
  },
  {
    q: "Món ăn yêu thích?",
    options: [
      { label: "Cơm tấm", bugType: 4 },
      { label: "Mì gói", bugType: 3 },
      { label: "Nhịn đói", bugType: 5 },
    ],
  },
  {
    q: "Mục tiêu tương lai?",
    options: [
      { label: "Không có", bugType: 1 },
      { label: "Giàu có", bugType: 4 },
      { label: "Bình yên", bugType: 2 },
    ],
  },
];

interface BugResult {
  code: string;
  name: string;
  desc: string;
  color: string;
}

const BUG_PROFILES: Record<number, BugResult> = {
  1: {
    code: "NPE-001",
    name: "NullPointerException",
    desc: "Luôn biến mất đúng lúc người khác cần nhất.",
    color: "#b71c1c",
  },
  2: {
    code: "OBO-002",
    name: "Off-by-one Error",
    desc: "Lúc nào cũng đến lệch đúng một bước.",
    color: "#e65100",
  },
  3: {
    code: "INF-003",
    name: "Infinite Loop",
    desc: "Nói đi nói lại một chuyện từ năm này qua năm khác.",
    color: "#4a148c",
  },
  4: {
    code: "ZIN-004",
    name: "CSS z-index: 99999",
    desc: "Cố đè bẹp tất cả nhưng vẫn bị che khuất.",
    color: "#0d47a1",
  },
  5: {
    code: "RAC-005",
    name: "Race Condition",
    desc: "Chạy rất nhanh nhưng không biết mình đang đi đâu.",
    color: "#004d40",
  },
};

export function BugQuiz() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [resultBug, setResultBug] = useState<BugResult | null>(null);
  const [holderName, setHolderName] = useState<string>("Một Lập Trình Viên");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleSelectOption = (bugType: number) => {
    playMechanicalClick();
    const nextAnswers = [...answers, bugType];
    setAnswers(nextAnswers);

    if (currentStep + 1 < QUESTIONS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate most frequent bugType
      const counts: Record<number, number> = {};
      nextAnswers.forEach((t) => {
        counts[t] = (counts[t] || 0) + 1;
      });
      let bestType = 1;
      let maxCount = 0;
      Object.entries(counts).forEach(([t, count]) => {
        if (count > maxCount) {
          maxCount = count;
          bestType = parseInt(t, 10);
        }
      });
      setResultBug(BUG_PROFILES[bestType]);
      setCurrentStep(QUESTIONS.length);
    }
  };

  const handleRestart = () => {
    playMechanicalClick();
    setCurrentStep(0);
    setAnswers([]);
    setResultBug(null);
  };

  // Draw Bug ID Card on Canvas
  useEffect(() => {
    if (!resultBug || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background card (Win98 gray / ID plastic)
    ctx.fillStyle = "#f5f5f5";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border
    ctx.strokeStyle = "#333333";
    ctx.lineWidth = 4;
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

    // Top banner
    ctx.fillStyle = "#000080";
    ctx.fillRect(10, 10, canvas.width - 20, 40);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 15px 'Be Vietnam Pro', Tahoma, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("THẺ CĂN CƯỚC LỖI • BUG IDENTITY CARD", canvas.width / 2, 35);

    // Avatar box
    ctx.fillStyle = "#e0e0e0";
    ctx.fillRect(30, 65, 90, 110);
    ctx.strokeStyle = "#999999";
    ctx.lineWidth = 1;
    ctx.strokeRect(30, 65, 90, 110);

    ctx.font = "42px sans-serif";
    ctx.fillText("🐛", 75, 135);

    // Info details
    ctx.textAlign = "left";
    ctx.fillStyle = "#666666";
    ctx.font = "10px 'Be Vietnam Pro', monospace";
    ctx.fillText("HỌ VÀ TÊN:", 135, 80);

    ctx.fillStyle = "#111111";
    ctx.font = "bold 14px 'Be Vietnam Pro', sans-serif";
    ctx.fillText(holderName || "Một Lập Trình Viên", 135, 100);

    ctx.fillStyle = "#666666";
    ctx.font = "10px 'Be Vietnam Pro', monospace";
    ctx.fillText("BẢN NGÃ LỖI:", 135, 125);

    ctx.fillStyle = resultBug.color;
    ctx.font = "bold 15px 'Be Vietnam Pro', monospace";
    ctx.fillText(resultBug.name, 135, 145);

    // Description quote
    ctx.fillStyle = "#333333";
    ctx.font = "italic 11px 'Be Vietnam Pro', sans-serif";
    ctx.fillText(`"${resultBug.desc}"`, 135, 170);

    // Barcode at bottom
    ctx.fillStyle = "#000000";
    for (let i = 0; i < 40; i++) {
      const x = 30 + i * 9;
      const w = (i % 3 === 0) ? 4 : (i % 2 === 0 ? 2 : 1);
      ctx.fillRect(x, 195, w, 24);
    }

    ctx.font = "10px monospace";
    ctx.textAlign = "right";
    ctx.fillStyle = "#555555";
    ctx.fillText(`MÃ SỐ: ${resultBug.code}`, canvas.width - 30, 212);
  }, [resultBug, holderName]);

  const handleDownloadCard = () => {
    if (!canvasRef.current) return;
    playCalculatorBeep();
    const link = document.createElement("a");
    link.download = `the-can-cuoc-bug-${resultBug?.code || "id"}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="w-full max-w-lg mx-auto py-8 px-4 select-none font-mono flex flex-col items-center justify-center text-center">
      {/* Khi đang trả lời trắc nghiệm */}
      {currentStep < QUESTIONS.length ? (
        <div className="w-full bg-[#f0f0f0] p-6 win98-box shadow-md">
          {/* Header tiến độ */}
          <div className="flex justify-between items-center text-xs text-gray-500 pb-2 border-b border-gray-400 mb-4">
            <span className="font-bold text-black uppercase">Trắc Nghiệm Bản Ngã Bug</span>
            <span>Câu {currentStep + 1} / {QUESTIONS.length}</span>
          </div>

          {/* Câu hỏi Deadpan */}
          <h3 className="text-xl sm:text-2xl font-bold text-black mb-6 text-center">
            {QUESTIONS[currentStep].q}
          </h3>

          {/* 3 Lựa chọn cộc lốc */}
          <div className="space-y-3">
            {QUESTIONS[currentStep].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(opt.bugType)}
                className="w-full win98-btn py-3 px-4 text-left font-bold text-sm sm:text-base hover:bg-gray-100 flex items-center justify-between"
              >
                <span>{String.fromCharCode(65 + idx)}. {opt.label}</span>
                <span className="text-xs text-gray-400 font-normal">→</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Khi hoàn thành và xuất thẻ căn cước */
        <div className="w-full bg-[#dcdcdc] p-5 win98-box shadow-md flex flex-col items-center">
          <div className="w-full text-left text-xs font-bold text-black pb-2 border-b border-gray-400 mb-3 flex items-center justify-between">
            <span>KẾT QUẢ GIÁM ĐỊNH BẢN THÂN</span>
            <span className="text-emerald-700">[Hoàn thành]</span>
          </div>

          {/* Input nhập tên chủ thẻ */}
          <div className="w-full mb-3 flex items-center gap-2 text-xs">
            <label className="text-gray-700 font-bold whitespace-nowrap">Tên trên thẻ:</label>
            <input
              type="text"
              value={holderName}
              onChange={(e) => setHolderName(e.target.value)}
              maxLength={26}
              className="flex-1 win98-window-sunken bg-white px-2 py-1 text-xs focus:outline-none"
            />
          </div>

          {/* Canvas thẻ căn cước */}
          <div className="overflow-hidden mb-4 win98-window-sunken">
            <canvas
              ref={canvasRef}
              width={440}
              height={235}
              className="max-w-full h-auto"
            />
          </div>

          {/* Nút tải ảnh & làm lại */}
          <div className="w-full flex gap-2 justify-center">
            <button
              onClick={handleDownloadCard}
              className="win98-btn flex-1 py-2 text-xs font-bold flex items-center justify-center gap-1.5 text-blue-900"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải Thẻ Căn Cước (PNG)</span>
            </button>
            <button
              onClick={handleRestart}
              className="win98-btn px-4 py-2 text-xs flex items-center justify-center gap-1 text-gray-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Làm Lại</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
