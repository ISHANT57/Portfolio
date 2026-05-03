import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Don't show on touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      const isClickable =
        target.matches('a, button, [role="button"], input, textarea, select, label') ||
        !!target.closest('a, button, [role="button"]');
      setIsPointer(isClickable);
    };

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    // Smooth ring follow
    const animate = () => {
      const lerp = 0.12;
      ringPos.current.x += (pos.current.x - ringPos.current.x) * lerp;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * lerp;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isVisible]);

  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
    return null;
  }

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>

      {/* Outer glow ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] transition-opacity duration-300"
        style={{
          width: isPointer ? "48px" : "36px",
          height: isPointer ? "48px" : "36px",
          borderRadius: "9999px",
          border: `1.5px solid rgba(139,92,246,${isPointer ? 0.8 : 0.5})`,
          background: `rgba(99,102,241,${isPointer ? 0.08 : 0.04})`,
          boxShadow: `0 0 ${isPointer ? 20 : 12}px rgba(139,92,246,${isPointer ? 0.4 : 0.2})`,
          transition: "width 0.2s ease, height 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
          opacity: isVisible ? 1 : 0,
          willChange: "transform",
        }}
      />

      {/* Inner dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          width: isPointer ? "6px" : "5px",
          height: isPointer ? "6px" : "5px",
          borderRadius: "9999px",
          background: "rgba(167,139,250,1)",
          boxShadow: "0 0 8px rgba(167,139,250,0.8)",
          transition: "width 0.15s ease, height 0.15s ease",
          opacity: isVisible ? 1 : 0,
          willChange: "transform",
        }}
      />
    </>
  );
}
