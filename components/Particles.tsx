"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "../lib/utils";

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  color?: string;
}

export const Particles: React.FC<ParticlesProps> = ({
  className = "",
  quantity = 100,
  staticity = 50,
  ease = 50,
  color = "#10b981", // Brand accent color
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<any[]>([]);
  const mousePosition = useRef({ x: 0, y: 0 });
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const canvasRect = useRef<DOMRect | null>(null);
  const rafId = useRef<number>(0);
  // Cap DPR at 1.5 for particles — tiny dots don't need retina rendering
  // and this saves 1.8x–4x GPU fill-rate vs DPR 2–3
  const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 1.5) : 1;

  useEffect(() => {
    // Respect user's reduced-motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d", { alpha: true });
    }

    // Defer particle animation start until the browser is idle
    // This prevents competing with initial page render/paint for GPU time
    const startAnimation = () => {
      initCanvas();
      rafId.current = window.requestAnimationFrame(animate);
    };

    let idleHandle: number | undefined;
    let timeoutHandle: ReturnType<typeof setTimeout> | undefined;
    if ("requestIdleCallback" in window) {
      idleHandle = (window as any).requestIdleCallback(startAnimation, { timeout: 1500 });
    } else {
      // Fallback: defer by 500ms to let initial paint settle
      timeoutHandle = setTimeout(startAnimation, 500);
    }

    window.addEventListener("resize", initCanvas);

    return () => {
      window.removeEventListener("resize", initCanvas);
      window.cancelAnimationFrame(rafId.current);
      if (idleHandle !== undefined) {
        (window as any).cancelIdleCallback(idleHandle);
      }
      if (timeoutHandle !== undefined) {
        clearTimeout(timeoutHandle);
      }
    };
  }, []);

  const initCanvas = () => {
    resizeCanvas();
    drawParticles();
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Use cached rect instead of calling getBoundingClientRect every move
    const rect = canvasRect.current;
    if (rect) {
      const { w, h } = canvasSize.current;
      const x = e.clientX - rect.left - w / 2;
      const y = e.clientY - rect.top - h / 2;
      const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
      if (inside) {
        mousePosition.current.x = e.clientX - rect.left;
        mousePosition.current.y = e.clientY - rect.top;
      }
    }
  };

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      circles.current.length = 0;
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;
      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.scale(dpr, dpr);
      // Cache the bounding rect — only update on resize
      canvasRect.current = canvasRef.current.getBoundingClientRect();
    }
  };

  const circleParams = () => {
    const x = Math.floor(Math.random() * canvasSize.current.w);
    const y = Math.floor(Math.random() * canvasSize.current.h);
    const translateX = 0;
    const translateY = 0;
    const size = Math.floor(Math.random() * 2) + 0.1;
    const alpha = 0;
    const targetAlpha = Math.random() * 0.8 + 0.2;
    const dx = (Math.random() - 0.5) * 0.2;
    const dy = (Math.random() - 0.5) * 0.2;
    const magnetism = 0.1 + Math.random() * 4;
    return {
      x,
      y,
      translateX,
      translateY,
      size,
      alpha,
      targetAlpha,
      dx,
      dy,
      magnetism,
    };
  };

  const hexToRgb = (hex: string): number[] => {
    hex = hex.replace("#", "");
    if (hex.length === 3) {
      hex = hex.split("").map((char) => char + char).join("");
    }
    const hexInt = parseInt(hex, 16);
    const red = (hexInt >> 16) & 255;
    const green = (hexInt >> 8) & 255;
    const blue = hexInt & 255;
    return [red, green, blue];
  };

  const rgb = hexToRgb(color);
  // Pre-compute the RGB string once instead of joining every draw call
  const rgbString = rgb.join(", ");

  const drawCircle = (circle: any, update = false) => {
    if (context.current) {
      const { x, y, translateX, translateY, size, alpha } = circle;
      context.current.translate(translateX, translateY);
      context.current.beginPath();
      context.current.arc(x, y, size, 0, 2 * Math.PI);
      context.current.fillStyle = `rgba(${rgbString}, ${alpha})`;
      context.current.fill();
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!update) {
        circles.current.push(circle);
      }
    }
  };

  const clearContext = () => {
    if (context.current) {
      context.current.clearRect(
        0,
        0,
        canvasSize.current.w,
        canvasSize.current.h,
      );
    }
  };

  const drawParticles = () => {
    clearContext();
    const particleCount = quantity;
    for (let i = 0; i < particleCount; i++) {
      const circle = circleParams();
      drawCircle(circle);
    }
  };

  const remapValue = (
    value: number,
    start1: number,
    end1: number,
    start2: number,
    end2: number,
  ): number => {
    const remapped =
      ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
    return remapped > 0 ? remapped : 0;
  };

  const animate = () => {
    clearContext();
    const arr = circles.current;
    const len = arr.length;
    const w = canvasSize.current.w;
    const h = canvasSize.current.h;
    const mx = mouse.current.x;
    const my = mouse.current.y;

    // Collect indices of out-of-bounds particles to replace after the loop
    const toReplace: number[] = [];

    for (let i = 0; i < len; i++) {
      const circle = arr[i];

      // Handle the alpha value
      const edgeLeft = circle.x + circle.translateX - circle.size;
      const edgeRight = w - circle.x - circle.translateX - circle.size;
      const edgeTop = circle.y + circle.translateY - circle.size;
      const edgeBottom = h - circle.y - circle.translateY - circle.size;
      const closestEdge = Math.min(edgeLeft, edgeRight, edgeTop, edgeBottom);
      const remapClosestEdge = remapValue(closestEdge, 0, 20, 0, 1);

      if (remapClosestEdge > 1) {
        circle.alpha += 0.02;
        if (circle.alpha > circle.targetAlpha) {
          circle.alpha = circle.targetAlpha;
        }
      } else {
        circle.alpha = circle.targetAlpha * remapClosestEdge;
      }

      // Update position in-place (no spread)
      circle.x += circle.dx;
      circle.y += circle.dy;
      circle.translateX +=
        (mx / (staticity / circle.magnetism) - circle.translateX) / ease;
      circle.translateY +=
        (my / (staticity / circle.magnetism) - circle.translateY) / ease;

      if (
        circle.x < -circle.size ||
        circle.x > w + circle.size ||
        circle.y < -circle.size ||
        circle.y > h + circle.size
      ) {
        toReplace.push(i);
      } else {
        drawCircle(circle, true);
      }
    }

    // Replace out-of-bounds particles without mutating the array during iteration
    for (let j = 0; j < toReplace.length; j++) {
      const newCircle = circleParams();
      drawCircle(newCircle, true); // update=true avoids pushing to array
      arr[toReplace[j]] = newCircle;
    }

    rafId.current = window.requestAnimationFrame(animate);
  };

  return (
    <div
      className={cn("pointer-events-none", className)}
      ref={canvasContainerRef}
      aria-hidden="true"
      onMouseMove={onMouseMove}
    >
      <canvas ref={canvasRef} />
    </div>
  );
};
