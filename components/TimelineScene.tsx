"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, ReactNode, useState } from "react";
import { createFadeInAnimation } from "@/lib/animations";

interface TimelineSceneProps {
  id: string;
  children: ReactNode;
  className?: string;
  gradientFrom: string;
  gradientTo: string;
  levelNumber?: number;
  levelTitle?: string;
}

export default function TimelineScene({
  id,
  children,
  className = "",
  gradientFrom,
  gradientTo,
  levelNumber,
  levelTitle,
}: TimelineSceneProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [showLevelOverlay, setShowLevelOverlay] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      createFadeInAnimation(contentRef.current, "up");
    }
  }, []);

  useEffect(() => {
    if (levelNumber && !hasTriggered) {
      setShowLevelOverlay(true);
      setHasTriggered(true);

      // Hide overlay after animation
      const timer = setTimeout(() => {
        setShowLevelOverlay(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [levelNumber, hasTriggered]);

  return (
    <section
      id={id}
      className={`
        relative min-h-screen w-full flex items-center justify-center 
        overflow-visible
        ${className}
      `}
    >
      {/* Level Overlay with TV Blip-off Effect */}
      {showLevelOverlay && levelNumber && levelTitle && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-50 bg-cyber-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
        >
          {/* CRT Screen Flicker */}
          <motion.div
            className="absolute inset-0 bg-neon-cyan/5"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.1, repeat: 3, delay: 0.5 }}
          />

          {/* Main Level Title */}
          <motion.div
            className="text-center relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="text-8xl md:text-9xl font-orbitron font-bold text-neon-cyan mb-4"
              initial={{ textShadow: "0 0 20px #00ffff" }}
              animate={{
                textShadow: [
                  "0 0 20px #00ffff",
                  "0 0 40px #00ffff, 0 0 60px #00ffff",
                  "0 0 20px #00ffff",
                ],
              }}
              transition={{
                duration: 2,
                repeat: 2,
                ease: "easeInOut",
              }}
            >
              LEVEL {levelNumber.toString().padStart(2, "0")}
            </motion.div>

            <motion.div
              className="text-2xl md:text-3xl font-chakra-petch text-neon-pink"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {levelTitle}
            </motion.div>

            {/* TV Blip-off Effect */}
            <motion.div
              className="absolute inset-0 bg-cyber-black"
              initial={{ scale: 1, opacity: 0 }}
              animate={{
                scale: [1, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 0.4,
                delay: 2.5,
                ease: "easeInOut",
                times: [0, 0.5, 1],
              }}
              style={{ transformOrigin: "center" }}
            />
          </motion.div>
        </motion.div>
      )}

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
