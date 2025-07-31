"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TimelineSection } from './TimelineSection';
import { ContentSection } from './ContentSection';
import { BackgroundElements } from './BackgroundElements';
import { ThemeToggle } from './ThemeToggle';
import { timelineData } from '@/lib/timelineData';

gsap.registerPlugin(ScrollTrigger);

export function Portfolio() {
  const [currentYearIndex, setCurrentYearIndex] = useState(0);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create scroll-triggered timeline progression
      ScrollTrigger.create({
        trigger: scrollTriggerRef.current,
        start: "top top",
        end: `+=${timelineData.length * 200}vh`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          // Ensure we don't go beyond the last index
          const newIndex = Math.min(Math.floor(progress * timelineData.length), timelineData.length - 1);
          const clampedIndex = Math.min(newIndex, timelineData.length - 1);
          
          if (clampedIndex !== currentYearIndex) {
            setCurrentYearIndex(clampedIndex);
            
            // Animate year transition with journey effect
            gsap.fromTo('.year-display', 
              { opacity: 0, scale: 0.8, y: -50 },
              { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" }
            );
            
            // Journey illusion - content slides up
            gsap.fromTo('.content-container', 
              { y: 100, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
            );
          }
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, [currentYearIndex]);

  return (
    <div
      ref={containerRef}
      className={`transition-all duration-500 ${
        isDarkTheme ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      <div 
        ref={scrollTriggerRef}
        className="h-screen overflow-hidden"
      >
        <BackgroundElements isDark={isDarkTheme} />
        
        <ThemeToggle isDark={isDarkTheme} onToggle={setIsDarkTheme} />
        
        <div className="flex h-full">
          {/* Left Side - Timeline */}
          <div className="w-1/2 relative flex items-center justify-center border-r border-gray-800/30">
            <TimelineSection 
              currentYear={timelineData[currentYearIndex]}
              isDark={isDarkTheme}
            />
          </div>
          
          {/* Right Side - Content */}
          <div className="w-1/2 relative">
            <ContentSection 
              currentData={timelineData[currentYearIndex]}
              isDark={isDarkTheme}
            />
          </div>
        </div>
      </div>
      
      {/* Spacer for scroll */}
      <div style={{ height: `${timelineData.length * 200}vh` }} />
    </div>
  );
}