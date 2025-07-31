"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface TimelineSectionProps {
  currentYear: {
    year: string;
    title: string;
    description: string;
    visual: string;
    color: string;
  };
  isDark: boolean;
}

export function TimelineSection({ currentYear, isDark }: TimelineSectionProps) {
  const yearRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating animation for the year
      gsap.to(yearRef.current, {
        y: -20,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
      });

      // Pulsing glow effect
      gsap.to('.year-glow', {
        scale: 1.1,
        opacity: 0.8,
        duration: 1.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
      });
    });

    return () => ctx.revert();
  }, [currentYear]);

  return (
    <div className="relative z-10 text-center">
      {/* Year Display with Glow */}
      <div className="relative">
        <div 
          className={`year-glow absolute inset-0 blur-3xl rounded-full opacity-60`}
          style={{ backgroundColor: currentYear.color }}
        />
        <div 
          ref={yearRef}
          className="year-display relative text-8xl md:text-9xl lg:text-[12rem] font-black tracking-tighter"
          style={{ 
            textShadow: `0 0 50px ${currentYear.color}`,
            color: isDark ? 'white' : 'black'
          }}
        >
          {currentYear.year}
        </div>
      </div>
      
      {/* Title */}
      <div 
        ref={titleRef}
        className="mt-8 text-xl md:text-2xl font-light tracking-wide opacity-80"
      >
        {currentYear.title}
      </div>
      
      {/* Animated Line */}
      <div className="mt-6 flex justify-center">
        <div 
          className="h-0.5 w-24 rounded-full animate-pulse"
          style={{ backgroundColor: currentYear.color }}
        />
      </div>
    </div>
  );
}