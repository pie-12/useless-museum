"use client";

import { useState, useEffect, useRef } from "react";
import { playClockTick } from "@/lib/sound";

const PX_TO_METERS = 0.00026458;

const LANDMARKS = [
  { name: "Trụ Cầu Rồng", dist: 37.5 },
  { name: "Tượng Phật Bà Linh Ứng", dist: 67 },
  { name: "Đỉnh Bà Nà", dist: 1487 },
  { name: "Cáp Treo Bà Nà", dist: 5771 },
];

export function ScrollMile() {
  const [meters, setMeters] = useState<number>(0);
  const touchStartY = useRef<number>(0);
  const lastTickDist = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("scroll_odometer_meters");
      if (saved) {
        setMeters(parseFloat(saved) || 0);
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  const addScrollDistance = (deltaPx: number) => {
    const addedMeters = Math.abs(deltaPx) * PX_TO_METERS;
    setMeters((prev) => {
      const next = prev + addedMeters;
      try {
        localStorage.setItem("scroll_odometer_meters", next.toFixed(2));
      } catch {
        // Ignore storage errors
      }

      // Play tick sound every ~0.5 meters of scrolling
      if (next - lastTickDist.current > 0.5) {
        lastTickDist.current = next;
        playClockTick();
      }

      return next;
    });
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      addScrollDistance(e.deltaY);
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const delta = touchStartY.current - currentY;
      touchStartY.current = currentY;
      addScrollDistance(delta * 1.5);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
return <div>Đồng hồ cây số...</div>;
}