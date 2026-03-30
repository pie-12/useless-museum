"use client";

import { useState, useEffect, useRef } from "react";
import { playClockTick } from "@/lib/sound";

export function IdleBonsai() {
  const [idleSeconds, setIdleSeconds] = useState<number>(0);
  const [leavesCount, setLeavesCount] = useState<number>(0);
  const [hasFlower, setHasFlower] = useState<boolean>(false);
  const [fallenLeaves, setFallenLeaves] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>("Đang lớn...");

  const idleSecondsRef = useRef<number>(0);
  const leavesCountRef = useRef<number>(0);
  const hasFlowerRef = useRef<boolean>(false);
  const lastMovedAtRef = useRef<number>(Date.now());

  idleSecondsRef.current = idleSeconds;
  leavesCountRef.current = leavesCount;
  hasFlowerRef.current = hasFlower;

  // Timer loop
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const timeSinceMove = Math.floor((now - lastMovedAtRef.current) / 1000);
      setIdleSeconds(timeSinceMove);

      // 15s per leaf, up to 4 leaves
      const calculatedLeaves = Math.min(4, Math.floor(timeSinceMove / 15));
      setLeavesCount(calculatedLeaves);

      // 60s = flower
      const flowerBloomed = timeSinceMove >= 60;
      setHasFlower(flowerBloomed);

      if (timeSinceMove > 0) {
        setStatusText("Đang lớn...");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Motion detection handler
  const handleUserMovement = () => {
    const now = Date.now();
    // Only react if previously was idle for at least 3 seconds
    if (now - lastMovedAtRef.current >= 3000) {
      if (leavesCountRef.current > 0 || hasFlowerRef.current) {
return <div>Cây bonsai...</div>;
}