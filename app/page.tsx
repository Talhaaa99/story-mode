"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { initScrollTrigger } from "@/lib/animations";
import { easterEggManager } from "@/lib/easterEggs";
import SceneIntro from "@/components/SceneIntro";
import SceneCars from "@/components/SceneCars";
import SceneAbacus from "@/components/SceneAbacus";
import SceneCollege from "@/components/SceneCollege";
import SceneAmazon from "@/components/SceneAmazon";
import SceneFrontend from "@/components/SceneFrontend";
import SceneWeb3 from "@/components/SceneWeb3";
import SceneFarcaster from "@/components/SceneFarcaster";
import ScenePresent from "@/components/ScenePresent";
import LevelCurtain from "@/components/LevelCurtain";

// Level data for THE TALHA FILES
const levels = [
  { id: "intro", number: 0, title: "THE TALHA FILES", year: "99" },
  { id: "birth", number: 1, title: "THE ORIGIN STORY", year: "99" },
  { id: "cars", number: 2, title: "VEHICLE OBSESSION", year: "01" },
  { id: "abacus", number: 3, title: "THE ABACUS TRIALS", year: "11" },
  { id: "college", number: 4, title: "ACADEMIC QUEST", year: "17" },
  { id: "amazon", number: 5, title: "CORPORATE INFILTRATION", year: "21" },
  { id: "frontend", number: 6, title: "FRONTEND AWAKENING", year: "22" },
  { id: "web3", number: 7, title: "WEB3 ADVENTURE", year: "23" },
  { id: "farcaster", number: 8, title: "DECENTRALIZED SOCIAL", year: "24" },
  { id: "present", number: 9, title: "FINAL MISSION", year: "25" },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("intro");
  const [completedLevels, setCompletedLevels] = useState<Set<string>>(
    new Set()
  );
  const [showIntro, setShowIntro] = useState(true);
  const [showCurtain, setShowCurtain] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [curtainShown, setCurtainShown] = useState<Set<string>>(new Set());
  const [contentRevealed, setContentRevealed] = useState<Set<string>>(
    new Set()
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize GSAP ScrollTrigger
    initScrollTrigger();

    // Initialize easter egg manager on client side
    if (typeof window !== "undefined") {
      easterEggManager.init();
    }

    // Set up intersection observer for navigation and curtain triggers
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const sectionId = entry.target.id;
            setActiveSection(sectionId);

            if (sectionId !== "intro") {
              setShowIntro(false);

              // Find level number for curtain (only show once per section)
              const level = levels.find((l) => l.id === sectionId);
              if (level && !curtainShown.has(sectionId)) {
                setCurrentLevel(level.number);
                setShowCurtain(true);
                setCurtainShown((prev) => new Set([...prev, sectionId]));

                // Hide curtain after animation and reveal content
                setTimeout(() => {
                  setShowCurtain(false);
                  setContentRevealed((prev) => new Set([...prev, sectionId]));
                }, 2000);
              }
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [curtainShown]);

  const handleLevelComplete = (levelId: string) => {
    setCompletedLevels((prev) => new Set([...prev, levelId]));
  };

  return (
    <main className="relative bg-cyber-black h-screen overflow-hidden">
      {/* Initial Intro Screen */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-cyber-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center">
              <motion.h1
                className="text-6xl md:text-9xl font-orbitron font-bold text-neon-lime mb-8"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                style={{
                  textShadow: "0 0 10px #00ff66, 0 0 20px #00ff66",
                }}
              >
                THE TALHA FILES
              </motion.h1>

              <motion.div
                className="text-neon-lime font-chakra-petch text-lg md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                Scroll to begin your mission
              </motion.div>

              <motion.div
                className="text-neon-lime text-4xl mt-8"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ↓
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Level Curtain Overlay */}
      <AnimatePresence>
        {showCurtain && currentLevel > 0 && (
          <LevelCurtain level={currentLevel} />
        )}
      </AnimatePresence>

      {/* Main Scroll Container */}
      <div
        ref={containerRef}
        className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth"
        style={{ scrollSnapType: "y mandatory" }}
      >
        {/* Intro Section */}
        <section
          id="intro"
          className="h-screen snap-start flex items-center justify-center relative"
        >
          <div className="text-center">
            <motion.h1
              className="text-6xl md:text-9xl font-orbitron font-bold text-neon-lime mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{
                textShadow: "0 0 10px #00ff66, 0 0 20px #00ff66",
              }}
            >
              THE TALHA FILES
            </motion.h1>
            <motion.p
              className="text-neon-lime font-chakra-petch text-xl md:text-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              A cyberpunk journey through time and code
            </motion.p>
          </div>
        </section>

        {/* Level Sections */}
        <section id="birth" className="h-screen snap-start">
          {contentRevealed.has("birth") ? (
            <SceneIntro onComplete={() => handleLevelComplete("birth")} />
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-neon-lime font-chakra-petch text-xl">
                  Loading mission data...
                </div>
              </div>
            </div>
          )}
        </section>

        <section id="cars" className="h-screen snap-start">
          {contentRevealed.has("cars") ? (
            <SceneCars onComplete={() => handleLevelComplete("cars")} />
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-neon-lime font-chakra-petch text-xl">
                  Loading mission data...
                </div>
              </div>
            </div>
          )}
        </section>

        <section id="abacus" className="h-screen snap-start">
          {contentRevealed.has("abacus") ? (
            <SceneAbacus onComplete={() => handleLevelComplete("abacus")} />
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-neon-lime font-chakra-petch text-xl">
                  Loading mission data...
                </div>
              </div>
            </div>
          )}
        </section>

        <section id="college" className="h-screen snap-start">
          {contentRevealed.has("college") ? (
            <SceneCollege onComplete={() => handleLevelComplete("college")} />
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-neon-lime font-chakra-petch text-xl">
                  Loading mission data...
                </div>
              </div>
            </div>
          )}
        </section>

        <section id="amazon" className="h-screen snap-start">
          {contentRevealed.has("amazon") ? (
            <SceneAmazon onComplete={() => handleLevelComplete("amazon")} />
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-neon-lime font-chakra-petch text-xl">
                  Loading mission data...
                </div>
              </div>
            </div>
          )}
        </section>

        <section id="frontend" className="h-screen snap-start">
          {contentRevealed.has("frontend") ? (
            <SceneFrontend onComplete={() => handleLevelComplete("frontend")} />
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-neon-lime font-chakra-petch text-xl">
                  Loading mission data...
                </div>
              </div>
            </div>
          )}
        </section>

        <section id="web3" className="h-screen snap-start">
          {contentRevealed.has("web3") ? (
            <SceneWeb3 onComplete={() => handleLevelComplete("web3")} />
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-neon-lime font-chakra-petch text-xl">
                  Loading mission data...
                </div>
              </div>
            </div>
          )}
        </section>

        <section id="farcaster" className="h-screen snap-start">
          {contentRevealed.has("farcaster") ? (
            <SceneFarcaster
              onComplete={() => handleLevelComplete("farcaster")}
            />
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-neon-lime font-chakra-petch text-xl">
                  Loading mission data...
                </div>
              </div>
            </div>
          )}
        </section>

        <section id="present" className="h-screen snap-start">
          {contentRevealed.has("present") ? (
            <ScenePresent onComplete={() => handleLevelComplete("present")} />
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-neon-lime font-chakra-petch text-xl">
                  Loading mission data...
                </div>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Mission Progress Indicator */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-cyber-dark-gray/80 backdrop-blur-sm border border-neon-lime/30 rounded-lg p-3">
          <div className="text-neon-lime font-chakra-petch text-xs mb-2">
            MISSION PROGRESS
          </div>
          <div className="w-32 bg-cyber-medium-gray rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-neon-lime"
              initial={{ width: 0 }}
              animate={{
                width: `${(completedLevels.size / (levels.length - 1)) * 100}%`,
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <div className="text-neon-lime font-chakra-petch text-xs mt-1">
            {Math.round((completedLevels.size / (levels.length - 1)) * 100)}%
            COMPLETE
          </div>
        </div>
      </div>

      {/* Navigation dots */}
      <nav className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 space-y-4">
        {levels.map(({ id, number, year }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`group flex items-center transition-all duration-300 ${
              activeSection === id ? "scale-125" : "hover:scale-110"
            }`}
            title={`LEVEL ${number.toString().padStart(2, "0")} - 20${year}`}
          >
            <span
              className={`text-xs font-mono mr-3 transition-all duration-300 font-chakra-petch ${
                activeSection === id
                  ? "text-neon-lime opacity-100 font-bold"
                  : "text-neon-lime/60 opacity-0 group-hover:opacity-100"
              }`}
            >
              {number.toString().padStart(2, "0")}
            </span>
            <div
              className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                completedLevels.has(id)
                  ? "border-neon-lime bg-neon-lime shadow-lg shadow-neon-lime/50"
                  : activeSection === id
                  ? "border-neon-lime bg-neon-lime shadow-lg shadow-neon-lime/50"
                  : "border-neon-lime/60 bg-transparent group-hover:bg-neon-lime/80 group-hover:border-neon-lime"
              }`}
            >
              {activeSection === id && (
                <div className="w-full h-full rounded-full bg-neon-lime animate-pulse"></div>
              )}
              {completedLevels.has(id) && (
                <div className="w-full h-full rounded-full bg-neon-lime animate-pulse"></div>
              )}
            </div>
          </a>
        ))}
      </nav>
    </main>
  );
}
