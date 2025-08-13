"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, ReactNode } from "react";
import { createFadeInAnimation } from "@/lib/animations";

interface TimelineSceneProps {
  id: string;
  children: ReactNode;
  className?: string;
  gradientFrom: string;
  gradientTo: string;
}

export default function TimelineScene({
  id,
  children,
  className = "",
  gradientFrom,
  gradientTo,
}: TimelineSceneProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      createFadeInAnimation(contentRef.current, "up");
    }
  }, []);

  return (
    <section
      id={id}
      className={`
        relative min-h-screen w-full flex items-center justify-center 
        overflow-visible
        ${className}
      `}
    >
      {/* Content Container - Always Visible */}
      <div
        ref={contentRef}
        className="relative z-30 max-w-4xl mx-auto px-6 text-center min-h-[200px] flex items-center justify-center w-full"
      >
        {children}
      </div>

      {/* Subtle Scanline */}
      <div className="absolute inset-0 pointer-events-none opacity-10 z-10">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent animate-pulse"></div>
      </div>
    </section>
  );
}
