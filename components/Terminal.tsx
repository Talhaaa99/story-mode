"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface TerminalProps {
  text: string;
  speed?: number;
  className?: string;
}

export default function Terminal({
  text,
  speed = 50,
  className = "",
}: TerminalProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
    }
  }, [currentIndex, text, speed]);

  return (
    <motion.div
      className={`bg-cyber-black border border-neon-cyan/50 rounded-lg p-4 font-chakra-petch text-neon-cyan ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-2 mb-2">
        <div className="w-3 h-3 bg-neon-pink rounded-full animate-pulse"></div>
        <div className="w-3 h-3 bg-neon-lime rounded-full animate-pulse"></div>
        <div className="w-3 h-3 bg-neon-purple rounded-full animate-pulse"></div>
        <span className="text-neon-cyan/70 text-xs ml-2">MISSION_LOG.exe</span>
      </div>

      <div className="text-sm leading-relaxed">
        <span className="text-neon-lime">$ </span>
        <span>{displayText}</span>
        {isTyping && (
          <motion.span
            className="inline-block w-2 h-4 bg-neon-cyan ml-1"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        )}
      </div>
    </motion.div>
  );
}
