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
import { AnimatePresence } from "framer-motion";

interface SceneAbacusProps {
  onComplete?: () => void;
}

export default function SceneAbacus({ onComplete }: SceneAbacusProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showXpPopup, setShowXpPopup] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      createFadeInAnimation(contentRef.current, "up");
    }
  }, []);

  const handleAbacusClick = () => {
    setShowXpPopup(true);
    setTimeout(() => setShowXpPopup(false), 3000);
  };

  const handleLevelComplete = () => {
    setIsCompleted(true);
    onComplete?.();
  };

  return (
    <div className="h-full flex items-center justify-center relative">
      <LevelHUD
        currentLevel={3}
        totalLevels={9}
        levelTitle="THE ABACUS TRIALS"
        isCompleted={isCompleted}
      />

      <TimelineScene
        id="abacus"
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
              2011
            </h2>

            <Terminal
              text="MISSION: Master ancient calculation device. Target: 12-year-old human. Objective: Achieve mental math supremacy. Status: Abacus training initiated."
              speed={30}
              className="mb-6"
            />
          </CyberpunkFrame>

          <CyberpunkFrame variant="terminal">
            <div ref={contentRef} className="text-center">
              <p className="text-2xl md:text-3xl font-chakra-petch text-neon-lime font-medium mb-6">
                The Abacus Chronicles
              </p>

              <p className="text-lg md:text-xl font-chakra-petch text-neon-lime max-w-3xl mx-auto leading-relaxed mb-6">
                At 12, I discovered the ancient art of the abacus.
                <br />
                <span className="font-semibold text-neon-lime">
                  Mental math skills: MAXIMUM OVERDRIVE
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
                  "I could calculate faster than a calculator. My teachers were
                  confused, my classmates were amazed, and my parents were
                  slightly concerned."
                </p>

                <motion.div
                  className="text-6xl mb-4 cursor-pointer"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleAbacusClick}
                >
                  🧮
                </motion.div>

                <motion.button
                  className="px-4 py-2 bg-neon-lime text-cyber-black font-chakra-petch font-bold rounded hover:bg-neon-lime/80 transition-colors"
                  onClick={handleLevelComplete}
                >
                  COMPLETE MISSION
                </motion.button>
              </motion.div>

              {/* XP Popup */}
              <AnimatePresence>
                {showXpPopup && (
                  <motion.div
                    className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-neon-lime text-cyber-black px-6 py-3 rounded-lg font-chakra-petch font-bold text-xl border-2 border-neon-lime">
                      +999 Mental Math XP
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                className="flex justify-center space-x-4 mt-6"
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                {["🧮", "⚡", "🧠", "💯"].map((icon, i) => (
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
