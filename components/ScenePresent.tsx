"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  createFadeInAnimation,
  createFloatingAnimation,
} from "@/lib/animations";
import TimelineScene from "./TimelineScene";
import LevelHUD from "./LevelHUD";
import Terminal from "./Terminal";
import CyberpunkFrame from "./CyberpunkFrame";

interface ScenePresentProps {
  onComplete?: () => void;
}

export default function ScenePresent({ onComplete }: ScenePresentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showContactPanel, setShowContactPanel] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      createFadeInAnimation(contentRef.current, "up");
    }
  }, []);

  const handleLevelComplete = () => {
    setIsCompleted(true);
    onComplete?.();
  };

  const handleMissionAccept = () => {
    setShowContactPanel(true);
  };

  return (
    <div className="h-full flex items-center justify-center relative">
      <LevelHUD
        currentLevel={9}
        totalLevels={9}
        levelTitle="FINAL MISSION"
        isCompleted={isCompleted}
      />

      <TimelineScene
        id="present"
        gradientFrom="from-neon-lime"
        gradientTo="to-neon-lime"
        levelNumber={9}
        levelTitle="FINAL MISSION"
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
              2025
            </h2>

            <Terminal
              text="MISSION: Complete portfolio journey. Target: Future opportunities. Objective: Connect with potential collaborators. Status: Ready for next mission."
              speed={30}
              className="mb-6"
            />
          </CyberpunkFrame>

          <CyberpunkFrame variant="terminal">
            <div ref={contentRef} className="text-center">
              <p className="text-2xl md:text-3xl font-chakra-petch text-neon-lime font-medium mb-6">
                Mission Complete
              </p>

              <p className="text-lg md:text-xl font-chakra-petch text-neon-lime max-w-3xl mx-auto leading-relaxed mb-6">
                You've completed the journey through THE TALHA FILES.
                <br />
                <span className="font-semibold text-neon-lime">
                  All missions accomplished! 🎯
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
                  "From a car-obsessed kid to a Web3 developer, this journey has
                  been nothing short of amazing. Ready for the next adventure!"
                </p>

                <div className="text-4xl text-neon-lime mb-4">🚀✨</div>

                <motion.button
                  className="px-4 py-2 bg-neon-lime text-cyber-black font-chakra-petch font-bold rounded hover:bg-neon-lime/80 transition-colors"
                  onClick={handleLevelComplete}
                >
                  COMPLETE MISSION
                </motion.button>
              </motion.div>

              {/* End Screen */}
              <motion.div
                className="mt-12 p-8 bg-cyber-black/80 backdrop-blur-sm rounded-2xl border-2 border-neon-lime/50"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <div className="text-center">
                  <motion.h3
                    className="text-3xl md:text-4xl font-orbitron text-neon-lime mb-6"
                    style={{
                      textShadow: "0 0 10px #00ff66, 0 0 20px #00ff66",
                    }}
                  >
                    Next mission — yours, if you choose to give it.
                  </motion.h3>

                  <div className="text-neon-lime font-mono text-lg mb-6">
                    <span>Ready to collaborate?</span>
                    <motion.span
                      className="ml-2 text-neon-lime"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      |
                    </motion.span>
                  </div>

                  <motion.button
                    className="px-6 py-3 bg-neon-lime text-cyber-black font-chakra-petch font-bold rounded-lg hover:bg-neon-lime/80 transition-colors border-2 border-neon-lime hover:border-neon-lime/80"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleMissionAccept}
                  >
                    ACCEPT MISSION
                  </motion.button>
                </div>
              </motion.div>

              {/* Contact Panel */}
              <AnimatePresence>
                {showContactPanel && (
                  <motion.div
                    className="fixed inset-0 flex items-center justify-center z-50 bg-black/80"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="bg-cyber-black border-2 border-neon-lime rounded-lg p-8 max-w-md w-full mx-4"
                      initial={{ scale: 0, rotate: -5 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 5 }}
                      transition={{ type: "spring", bounce: 0.6 }}
                    >
                      <div className="text-center">
                        <h3 className="text-2xl font-orbitron text-neon-lime mb-6">
                          MISSION ACCEPTED
                        </h3>

                        <div className="space-y-4 text-left">
                          <div>
                            <div className="text-neon-lime font-chakra-petch font-bold mb-2">
                              Contact Information:
                            </div>
                            <div className="text-neon-lime font-mono text-sm space-y-1">
                              <div>Email: talha@example.com</div>
                              <div>LinkedIn: linkedin.com/in/talha</div>
                              <div>GitHub: github.com/talha</div>
                              <div>Twitter: @talha_dev</div>
                            </div>
                          </div>

                          <div>
                            <div className="text-neon-lime font-chakra-petch font-bold mb-2">
                              Skills:
                            </div>
                            <div className="text-neon-lime font-mono text-sm">
                              React • TypeScript • Web3 • Blockchain • UI/UX
                            </div>
                          </div>
                        </div>

                        <motion.button
                          className="mt-6 px-4 py-2 bg-neon-lime text-cyber-black font-chakra-petch font-bold rounded hover:bg-neon-lime/80 transition-colors"
                          onClick={() => setShowContactPanel(false)}
                        >
                          CLOSE
                        </motion.button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                className="flex justify-center space-x-4 mt-6"
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                {["🚀", "✨", "🎯", "💫"].map((icon, i) => (
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
