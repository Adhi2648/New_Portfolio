import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '', delay = 0 }) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  // Simple word splitting
  const words = text.split(' ');

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      '.word-inner',
      {
        y: '120%',
      },
      {
        y: '0%',
        duration: 0.8,
        delay,
        stagger: 0.05,
        ease: 'power4.out',
      }
    );
  }, { scope: containerRef });

  return (
    <span ref={containerRef} className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}>
      {words.map((word, index) => (
        <span key={index} className="overflow-hidden inline-flex">
          <span className="word-inner translate-y-[120%] inline-block">
            {word}
          </span>
        </span>
      ))}
    </span>
  );
};

export default AnimatedText;
