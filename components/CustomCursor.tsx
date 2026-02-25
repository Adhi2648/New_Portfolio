import React, { useEffect, useState, useRef } from "react";

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = -100;
    let mouseY = -100;
    let outerX = -100;
    let outerY = -100;

    // Use requestAnimationFrame for smooth follower interpolation
    const render = () => {
      // Linear interpolation for the trailing "outer ring" effect
      outerX += (mouseX - outerX) * 0.2;
      outerY += (mouseY - outerY) * 0.2;

      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${mouseX - 5}px, ${mouseY - 5}px, 0)`;
      }
      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${outerX - 24}px, ${outerY - 24}px, 0)`;
      }

      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);

    const updatePosition = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const target = e.target as HTMLElement;
      if (!target) return;

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

    window.addEventListener("mousemove", updatePosition, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });

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
      <div
        ref={outerRef}
        className="absolute top-0 left-0 w-12 h-12 rounded-full border-2 transition-colors duration-300 ease-out will-change-transform"
        style={{
          borderColor: isHovering
            ? "rgba(255, 255, 255, 0.8)"
            : "rgba(255, 255, 255, 0.4)",
          transform: `scale(${isHovering ? 1.8 : isMouseDown ? 0.7 : 1})`,
          boxShadow: isHovering
            ? "0 0 20px rgba(255, 255, 255, 0.4), 0 0 40px rgba(59, 130, 246, 0.3)"
            : "0 0 10px rgba(255, 255, 255, 0.15)",
          background: isHovering ? "rgba(59, 130, 246, 0.1)" : "transparent",
        }}
      >
        <div
          className="w-full h-full rounded-full transition-transform duration-300 ease-out"
          style={{ transform: `scale(${isHovering ? 1.8 : isMouseDown ? 0.7 : 1})` }}
        />
      </div>

      <div
        ref={innerRef}
        className="absolute top-0 left-0 w-2.5 h-2.5 rounded-full will-change-transform"
      >
        <div
          className="w-full h-full bg-white rounded-full transition-transform duration-100 ease-out"
          style={{
            transform: `scale(${isHovering ? 0.5 : isMouseDown ? 1.5 : 1})`,
            boxShadow: "0 0 6px rgba(255, 255, 255, 0.9), 0 0 12px rgba(56, 189, 248, 0.6)",
          }}
        />
      </div>
    </div>
  );
};

export default CustomCursor;
