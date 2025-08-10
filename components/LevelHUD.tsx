"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LevelHUDProps {
  currentLevel: number;
  totalLevels: number;
  levelTitle: string;
  isCompleted: boolean;
}

export default function LevelHUD({
  currentLevel,
  totalLevels,
  levelTitle,
  isCompleted,
}: LevelHUDProps) {
  const [showCompletion, setShowCompletion] = useState(false);

  useEffect(() => {
    if (isCompleted && !showCompletion) {
      setShowCompletion(true);
      setTimeout(() => setShowCompletion(false), 3000);
    }
  }, [isCompleted, showCompletion]);

  return (
    <>
      {/* Desktop HUD - Hidden on mobile */}
      <div className="fixed top-0 left-0 right-0 z-50 p-4 hidden md:block">
        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-cyber-dark-gray/80 backdrop-blur-sm border border-neon-cyan/30 rounded-lg p-3">
            {/* Level Info */}
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-4">
                <motion.div
                  className="text-neon-cyan font-orbitron font-bold text-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.6 }}
                >
                  LEVEL {currentLevel.toString().padStart(2, "0")}
                </motion.div>
                <div className="text-neon-pink font-chakra-petch text-sm">
                  {levelTitle}
                </div>
              </div>
              <div className="text-neon-lime font-chakra-petch text-sm">
                {currentLevel}/{totalLevels}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-cyber-medium-gray rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple"
                initial={{ width: 0 }}
                animate={{ width: `${(currentLevel / totalLevels) * 100}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile HUD - Simplified version */}
      <div className="fixed top-2 left-2 z-50 md:hidden">
        <div className="bg-cyber-dark-gray/90 backdrop-blur-sm border border-neon-cyan/30 rounded-lg px-3 py-2">
          <div className="text-neon-cyan font-orbitron font-bold text-sm">
            {currentLevel}/{totalLevels}
          </div>
        </div>
      </div>

      {/* Level Complete Notification */}
      {showCompletion && (
        <motion.div
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.8 }}
          transition={{ type: "spring", bounce: 0.6 }}
        >
          <div className="bg-cyber-dark-gray border-2 border-neon-lime rounded-lg px-6 py-3 shadow-lg">
            <div className="text-neon-lime font-orbitron font-bold text-center">
              ✓ LEVEL {currentLevel.toString().padStart(2, "0")} COMPLETE
            </div>
            <div className="text-neon-cyan font-chakra-petch text-sm text-center mt-1">
              Mission accomplished!
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
