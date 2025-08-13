"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  createFadeInAnimation,
  createFloatingAnimation,
} from "@/lib/animations";
import TimelineScene from "./TimelineScene";
import LevelHUD from "./LevelHUD";
import Terminal from "./Terminal";
import CyberpunkFrame from "./CyberpunkFrame";

interface SceneAmazonProps {
  onComplete?: () => void;
}

export default function SceneAmazon({ onComplete }: SceneAmazonProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showGlitch, setShowGlitch] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      createFadeInAnimation(contentRef.current, "left");
    }
  }, []);

  const handleAmazonHover = () => {
    setShowGlitch(true);
    setTimeout(() => setShowGlitch(false), 2000);
  };

  const handleLevelComplete = () => {
    setIsCompleted(true);
    onComplete?.();
  };

  return (
    <div className="h-full flex items-center justify-center relative">
      <LevelHUD
        currentLevel={5}
        totalLevels={9}
        levelTitle="CORPORATE INFILTRATION"
        isCompleted={isCompleted}
      />

      <TimelineScene
        id="amazon"
        gradientFrom="from-neon-lime"
        gradientTo="to-neon-lime"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="w-full"
        >
          <CyberpunkFrame variant="mission" className="mb-8">
            <h2
              className="text-5xl md:text-7xl font-bold font-orbitron text-neon-lime mb-6"
              style={{
                textShadow: "0 0 10px #00ff66, 0 0 20px #00ff66",
              }}
            >
              2021
            </h2>

            <Terminal
              text="MISSION: Infiltrate corporate giant. Target: Amazon Web Services. Objective: Learn cloud infrastructure. Status: Successfully embedded as SDE."
              speed={30}
              className="mb-6"
            />
          </CyberpunkFrame>

          <CyberpunkFrame variant="terminal">
            <div ref={contentRef} className="text-center">
              <p className="text-2xl md:text-3xl font-chakra-petch text-neon-lime font-medium mb-6">
                Amazon Web Services
              </p>

              <p className="text-lg md:text-xl font-chakra-petch text-neon-lime max-w-3xl mx-auto leading-relaxed mb-6">
                My first taste of corporate life at AWS.
                <br />
                <span className="font-semibold text-neon-lime">
                  Cloud computing: MASTERED
                </span>
              </p>

              <motion.div
                className="mt-8 p-6 bg-cyber-dark-gray/50 backdrop-blur-sm rounded-2xl border border-neon-lime/30"
                whileHover={{
                  scale: 1.05,
                  borderColor: "rgba(0, 255, 102, 0.8)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <p className="text-neon-lime text-sm italic font-chakra-petch mb-4">
                  "I learned that the cloud is just someone else's computer, and
                  that corporate meetings are mostly about deciding when to have
                  the next meeting."
                </p>

                <motion.div
                  className="text-6xl mb-4 cursor-pointer"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                  onMouseEnter={handleAmazonHover}
                  style={{
                    filter: showGlitch
                      ? "hue-rotate(90deg) saturate(2)"
                      : "none",
                    transition: "filter 0.3s ease",
                  }}
                >
                  📦
                </motion.div>

                <motion.button
                  className="px-4 py-2 bg-neon-lime text-cyber-black font-chakra-petch font-bold rounded hover:bg-neon-lime/80 transition-colors"
                  onClick={handleLevelComplete}
                >
                  COMPLETE MISSION
                </motion.button>
              </motion.div>

              {/* Glitch Error Message */}
              {showGlitch && (
                <motion.div
                  className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-red-900 text-red-100 px-6 py-3 rounded-lg font-mono text-sm border-2 border-red-500">
                    ERROR: Amazon logo corrupted
                    <br />
                    Attempting to restore...
                  </div>
                </motion.div>
              )}

              <motion.div
                className="flex justify-center space-x-4 mt-6"
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                {["📦", "☁️", "⚡", "🔧"].map((icon, i) => (
                  <motion.span
                    key={i}
                    className="text-3xl text-neon-lime"
                    whileHover={{ scale: 1.5, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    {icon}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </CyberpunkFrame>
        </motion.div>
      </TimelineScene>
    </div>
  );
}
