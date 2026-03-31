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
return <div>Trắc nghiệm bug...</div>;
}