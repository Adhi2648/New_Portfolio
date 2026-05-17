"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Start hidden — only show once the mouse actually enters the viewport
    cursor.style.opacity = "0";

    // Use quickSetter for zero-allocation position updates — orders of magnitude
    // faster than gsap.to() which creates a full tween object on every call.
    const xSetter = gsap.quickSetter(cursor, "x", "px");
    const ySetter = gsap.quickSetter(cursor, "y", "px");

    const onMouseMove = (e: MouseEvent) => {
      cursor.style.opacity = "1";
      xSetter(e.clientX);
      ySetter(e.clientY);
    };

    // Hide cursor when mouse leaves the document/window
    const onMouseLeaveDocument = () => {
      cursor.style.opacity = "0";
    };

    // Show cursor when mouse re-enters the document
    const onMouseEnterDocument = () => {
      cursor.style.opacity = "1";
    };

    let isHovering = false;

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target?.closest("a, button, input, textarea, [role='button']")) {
        if (!isHovering) {
          isHovering = true;
          gsap.to(cursor, { scale: 2.5, opacity: 0.5, backgroundColor: "#10b981", duration: 0.3 });
        }
      } else {
        if (isHovering) {
          isHovering = false;
          gsap.to(cursor, { scale: 1, opacity: 1, backgroundColor: "#10b981", duration: 0.3 });
        }
      }
    };

    const onClick = (e: MouseEvent) => {
      // Small bounce effect on click
      gsap.fromTo(cursor, 
        { scale: isHovering ? 2 : 0.8 }, 
        { scale: isHovering ? 2.5 : 1, duration: 0.3 }
      );
      
      // Re-evaluate after a short delay in case the clicked element unmounts
      setTimeout(() => {
        const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
        if (el && !el.closest("a, button, input, textarea, [role='button']")) {
          isHovering = false;
          gsap.to(cursor, { scale: 1, opacity: 1, backgroundColor: "#10b981", duration: 0.3 });
        }
      }, 50);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", checkHover, { passive: true });
    window.addEventListener("click", onClick, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeaveDocument);
    document.documentElement.addEventListener("mouseenter", onMouseEnterDocument);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", checkHover);
      window.removeEventListener("click", onClick);
      document.documentElement.removeEventListener("mouseleave", onMouseLeaveDocument);
      document.documentElement.removeEventListener("mouseenter", onMouseEnterDocument);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-3 h-3 bg-accent rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 hidden lg:block mix-blend-difference"
      style={{ willChange: "transform", opacity: 0 }}
    />
  );
};
