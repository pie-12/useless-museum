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
return <div>Trắc nghiệm bug...</div>;
}