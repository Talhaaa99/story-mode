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

interface SceneIntroProps {
  onComplete?: () => void;
}

export default function SceneIntro({ onComplete }: SceneIntroProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (titleRef.current) {
      createFadeInAnimation(titleRef.current, "up");
    }
    if (subtitleRef.current) {
      createFadeInAnimation(subtitleRef.current, "down");
    }
  }, []);

  const handleLevelComplete = () => {
    setIsCompleted(true);
    onComplete?.();
  };

  return (
    <div className="h-full flex items-center justify-center relative">
      <LevelHUD
        currentLevel={1}
        totalLevels={9}
        levelTitle="THE ORIGIN STORY"
        isCompleted={isCompleted}
      />

      <TimelineScene
        id="birth"
        gradientFrom="from-neon-lime"
        gradientTo="to-neon-lime"
        levelNumber={1}
        levelTitle="THE ORIGIN STORY"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="w-full"
        >
          <CyberpunkFrame variant="mission" className="mb-8">
            <h1
              ref={titleRef}
              className="text-6xl md:text-8xl font-bold font-orbitron text-neon-lime mb-6"
              style={{
                textShadow: "0 0 10px #00ff66, 0 0 20px #00ff66",
              }}
            >
              1999
            </h1>

            <Terminal
              text="MISSION: Establish baseline human parameters. Target: Newborn with potential for world domination. Status: Successfully spawned in 1999."
              speed={30}
              className="mb-6"
            />
          </CyberpunkFrame>

          <CyberpunkFrame variant="terminal">
            <p
              ref={subtitleRef}
              className="text-xl md:text-2xl font-chakra-petch text-neon-lime font-medium leading-relaxed max-w-2xl mx-auto mb-6"
            >
              Born in 1999 — already plotting world domination.
              <br />
              <span className="text-lg opacity-75 text-neon-lime">
                (Or at least figuring out how to build cool websites)
              </span>
            </p>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 1.2,
                duration: 0.8,
                type: "spring",
                bounce: 0.4,
              }}
              className="mt-8"
            >
              <motion.button
                className="text-6xl cursor-pointer text-neon-lime hover:scale-110 transition-transform"
                whileHover={{
                  scale: 1.2,
                  rotate: [0, -10, 10, -10, 0],
                  transition: { duration: 0.5 },
                }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  alert("🎉 Happy Birthday to... me! 25 years of awesome!");
                  handleLevelComplete();
                }}
              >
                🎂
              </motion.button>
              <p className="text-neon-lime mt-4 text-sm font-chakra-petch">
                Click the cake to complete the mission! (Easter Egg #1)
              </p>
            </motion.div>
          </CyberpunkFrame>
        </motion.div>
      </TimelineScene>
    </div>
  );
}
