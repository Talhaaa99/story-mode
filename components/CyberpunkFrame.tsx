"use client";

import { motion } from "framer-motion";
import { ReactNode, useRef, useEffect } from "react";
import { createFrameAnimation } from "@/lib/animations";

interface CyberpunkFrameProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "mission" | "terminal" | "hud";
}

export default function CyberpunkFrame({
  children,
  className = "",
  variant = "default",
}: CyberpunkFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (frameRef.current) {
      createFrameAnimation(frameRef.current);
    }
  }, []);

  const frameStyles = {
    default: "border-neon-cyan bg-cyber-dark-gray/20",
    mission: "border-neon-pink bg-cyber-dark-gray/30",
    terminal: "border-neon-lime bg-cyber-black/80",
    hud: "border-neon-purple bg-cyber-dark-gray/40",
  };

  return (
    <motion.div
      ref={frameRef}
      className={`relative ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Main Frame */}
      <div
        className={`border-2 ${frameStyles[variant]} rounded-lg p-6 backdrop-blur-sm relative overflow-hidden`}
      >
        {/* Corner Decorations */}
        <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-neon-cyan"></div>
        <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-neon-cyan"></div>
        <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-neon-cyan"></div>
        <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-neon-cyan"></div>

        {/* Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-30 animate-pulse"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">{children}</div>

        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-neon-cyan/5 via-transparent to-neon-purple/5 pointer-events-none"></div>
      </div>
    </motion.div>
  );
}
