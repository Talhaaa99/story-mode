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

interface SceneFarcasterProps {
  onComplete?: () => void;
}

export default function SceneFarcaster({ onComplete }: SceneFarcasterProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  useEffect(() => {
    if (contentRef.current) {
      createFadeInAnimation(contentRef.current, "left");
    }
  }, []);

  const handleFarcasterClick = () => {
    setShowTerminal(true);
    setTerminalLogs([]);

    const logs = [
      "Initializing deployment sequence...",
      "Connecting to Base network...",
      "Compiling smart contract...",
      "Deploying contract to Base...",
      "Contract deployed successfully!",
      "Gas used: 0.001 ETH",
      "Transaction hash: 0x1234...5678",
      "Contract address: 0xabcd...efgh",
      "Deployment complete! 🚀",
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setTerminalLogs((prev) => [...prev, log]);
      }, index * 500);
    });

    setTimeout(() => {
      setShowTerminal(false);
    }, logs.length * 500 + 2000);
  };

  const handleLevelComplete = () => {
    setIsCompleted(true);
    onComplete?.();
  };

  return (
    <div className="h-full flex items-center justify-center relative">
      <LevelHUD
        currentLevel={8}
        totalLevels={9}
        levelTitle="DECENTRALIZED SOCIAL"
        isCompleted={isCompleted}
      />

      <TimelineScene
        id="farcaster"
        gradientFrom="from-neon-lime"
        gradientTo="to-neon-lime"
        levelNumber={8}
        levelTitle="DECENTRALIZED SOCIAL"
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
              2024
            </h2>

            <Terminal
              text="MISSION: Build decentralized social platform. Target: Farcaster ecosystem. Objective: Create innovative social experiences. Status: Base deployment successful."
              speed={30}
              className="mb-6"
            />
          </CyberpunkFrame>

          <CyberpunkFrame variant="terminal">
            <div ref={contentRef} className="text-center">
              <p className="text-2xl md:text-3xl font-chakra-petch text-neon-lime font-medium mb-6">
                Farcaster & Base
              </p>

              <p className="text-lg md:text-xl font-chakra-petch text-neon-lime max-w-3xl mx-auto leading-relaxed mb-6">
                Building the future of decentralized social media.
                <br />
                <span className="font-semibold text-neon-lime">
                  Social: DECENTRALIZED
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
                  "Farcaster is like Twitter, but you actually own your data.
                  It's like having your own social media server in your pocket."
                </p>

                <motion.div
                  className="text-6xl mb-4 cursor-pointer"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleFarcasterClick}
                >
                  🐦
                </motion.div>

                <motion.button
                  className="px-4 py-2 bg-neon-lime text-cyber-black font-chakra-petch font-bold rounded hover:bg-neon-lime/80 transition-colors"
                  onClick={handleLevelComplete}
                >
                  COMPLETE MISSION
                </motion.button>
              </motion.div>

              {/* Terminal Easter Egg */}
              <AnimatePresence>
                {showTerminal && (
                  <motion.div
                    className="fixed inset-0 flex items-center justify-center z-50 bg-black/80"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="bg-cyber-black border-2 border-neon-lime rounded-lg p-6 max-w-md w-full mx-4"
                      initial={{ scale: 0, rotate: -5 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 5 }}
                      transition={{ type: "spring", bounce: 0.6 }}
                    >
                      <div className="text-neon-lime font-mono text-sm mb-4">
                        <div className="flex items-center mb-2">
                          <span className="text-neon-lime">$</span>
                          <span className="ml-2">deploy-contract</span>
                        </div>
                        {terminalLogs.map((log, index) => (
                          <motion.div
                            key={index}
                            className="text-neon-lime mb-1"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {log}
                          </motion.div>
                        ))}
                        <div className="text-neon-lime mt-4">
                          Press any key to continue...
                        </div>
                      </div>
                      <button
                        className="text-neon-lime hover:text-neon-lime/80 transition-colors"
                        onClick={() => setShowTerminal(false)}
                      >
                        Close Terminal
                      </button>
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
                {["🐦", "🔗", "💬", "🚀"].map((icon, i) => (
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
