import React, { useEffect, useState } from "react";

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      if (!target) return;

      // Check if hovering over interactive elements
      const isInteractive =
        target.closest("button") ||
        target.closest("a") ||
        target.closest('[role="button"]') ||
        window.getComputedStyle(target).cursor === "pointer";

      setIsHovering(!!isInteractive);
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Outer Ring - Trailing element with smooth follow */}
      <div
        className="absolute top-0 left-0 w-12 h-12 rounded-full border-2 transition-all duration-300 ease-out"
        style={{
          borderColor: isHovering
            ? "rgba(255, 255, 255, 0.8)"
            : "rgba(255, 255, 255, 0.4)",
          transform: `translate3d(${position.x - 24}px, ${position.y - 24}px, 0) scale(${isHovering ? 1.8 : isMouseDown ? 0.7 : 1})`,
          boxShadow: isHovering
            ? "0 0 20px rgba(255, 255, 255, 0.4), 0 0 40px rgba(59, 130, 246, 0.3)"
            : "0 0 10px rgba(255, 255, 255, 0.15)",
          background: isHovering ? "rgba(59, 130, 246, 0.1)" : "transparent",
        }}
      />
      {/* Inner Dot - Bright white center that's always easy to spot */}
      <div
        className="absolute top-0 left-0 w-2.5 h-2.5 rounded-full transition-transform duration-75 ease-out"
        style={{
          background: "white",
          transform: `translate3d(${position.x - 5}px, ${position.y - 5}px, 0) scale(${isHovering ? 0.5 : isMouseDown ? 1.5 : 1})`,
          boxShadow:
            "0 0 6px rgba(255, 255, 255, 0.9), 0 0 12px rgba(56, 189, 248, 0.6)",
        }}
      />
    </div>
  );
};

export default CustomCursor;
