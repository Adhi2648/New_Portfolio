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

    const onMouseEnter = () => {
      gsap.to(cursor, { scale: 2.5, opacity: 0.5, backgroundColor: "#10b981", duration: 0.3 });
    };

    const onMouseLeave = () => {
      gsap.to(cursor, { scale: 1, opacity: 1, backgroundColor: "#10b981", duration: 0.3 });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeaveDocument);
    document.documentElement.addEventListener("mouseenter", onMouseEnterDocument);

    // Add hover effect to interactive elements
    const iteractives = document.querySelectorAll("a, button, input, textarea, [role='button']");
    iteractives.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeaveDocument);
      document.documentElement.removeEventListener("mouseenter", onMouseEnterDocument);
      iteractives.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
      });
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
