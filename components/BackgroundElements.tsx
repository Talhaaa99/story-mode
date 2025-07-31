"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface BackgroundElementsProps {
  isDark: boolean;
}

export function BackgroundElements({ isDark }: BackgroundElementsProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated grid
      gsap.to('.grid-line', {
        opacity: 0.3,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.1
      });

      // Floating particles
      gsap.to('.particle', {
        y: -30,
        x: 20,
        opacity: 0.8,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.2
      });

      // Rotating rings
      gsap.to('.rotating-ring', {
        rotation: 360,
        duration: 30,
        ease: "none",
        repeat: -1
      });

      // Journey particles - moving upward to create scroll illusion
      gsap.to('.journey-particle', {
        y: -100,
        opacity: 0,
        duration: 3,
        ease: "none",
        repeat: -1,
        stagger: 0.5
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating Particles */}
      <div ref={particlesRef} className="absolute inset-0">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className={`particle absolute w-1 h-1 rounded-full ${
              isDark ? 'bg-white' : 'bg-black'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Journey Particles - create upward movement illusion */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className={`journey-particle absolute w-2 h-2 rounded-full opacity-30 ${
              isDark ? 'bg-white' : 'bg-black'
            }`}
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: '100%',
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Rotating Rings */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 opacity-5">
        <div className={`rotating-ring absolute inset-0 rounded-full border ${
          isDark ? 'border-white' : 'border-black'
        }`} />
        <div className={`rotating-ring absolute inset-8 rounded-full border ${
          isDark ? 'border-white' : 'border-black'
        }`} style={{ animationDelay: '5s' }} />
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 opacity-3">
        <div className={`w-full h-full bg-gradient-radial ${
          isDark 
            ? 'from-white via-transparent to-transparent' 
            : 'from-black via-transparent to-transparent'
        }`} />
      </div>
    </div>
  );
}