"use client";

import { motion } from "framer-motion";

interface LevelCurtainProps {
  level: number;
}

export default function LevelCurtain({ level }: LevelCurtainProps) {
  return (
    <motion.div
      className="fixed inset-0 z-40 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Curtain that drops from top */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-cyber-black via-cyber-black to-cyber-dark-gray"
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
          delay: 0.1,
        }}
      >
        {/* Level text */}
        <div className="flex items-center justify-center h-full">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.4,
              ease: "easeOut",
            }}
          >
            <motion.h1
              className="text-8xl md:text-9xl font-orbitron font-bold text-neon-lime mb-4"
              style={{
                textShadow: "0 0 10px #00ff66, 0 0 20px #00ff66",
              }}
            >
              LEVEL {level.toString().padStart(2, "0")}
            </motion.h1>
            <motion.div
              className="text-neon-lime font-chakra-petch text-xl md:text-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.6,
                ease: "easeOut",
              }}
            >
              MISSION INITIALIZING...
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Curtain slides down and disappears */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-cyber-black via-cyber-black to-cyber-dark-gray"
        initial={{ y: 0 }}
        animate={{ y: "100%" }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
          delay: 1.2,
        }}
      />
    </motion.div>
  );
}
