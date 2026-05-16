import React, { useId } from "react";
import { motion } from "framer-motion";

interface GridPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: any;
  numSquares?: number;
  className?: string;
  maxOpacity?: number;
  duration?: number;
  repeatDelay?: number;
}

export function GridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 50,
  className,
  maxOpacity = 0.5,
  duration = 4,
  repeatDelay = 0.5,
  ...props
}: GridPatternProps) {
  const id = useId();
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });
  const [squares, setSquares] = React.useState<[number, number][]>([]);

  const getPos = () => {
    return [
      Math.floor((Math.random() * dimensions.width) / width),
      Math.floor((Math.random() * dimensions.height) / height),
    ] as [number, number];
  };

  const generateSquares = (count: number) => {
    return Array.from({ length: count }, getPos);
  };

  React.useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  React.useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      setSquares(generateSquares(numSquares));
    }
  }, [dimensions, numSquares]);

  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full fill-white/5 stroke-white/10 ${className}`}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
      {squares.map((sq, i) => (
        <motion.rect
          key={`${sq[0]}-${sq[1]}-${i}`}
          width={width - 1}
          height={height - 1}
          x={sq[0] * width + 1}
          y={sq[1] * height + 1}
          fill="currentColor"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, maxOpacity, 0] }}
          transition={{
            duration,
            repeat: Infinity,
            delay: Math.random() * 10,
            repeatDelay,
          }}
        />
      ))}
    </svg>
  );
}
