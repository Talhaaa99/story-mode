"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TimelineSection } from "./TimelineSection";
import { ContentSection } from "./ContentSection";
import { BackgroundElements } from "./BackgroundElements";
import { timelineData } from "@/lib/timelineData";

gsap.registerPlugin(ScrollTrigger);

export function Portfolio() {
  const [currentYearIndex, setCurrentYearIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create scroll-triggered timeline progression
      ScrollTrigger.create({
        trigger: scrollTriggerRef.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          // Calculate which year to show based on progress
          const totalYears = timelineData.length;
          const yearIndex = Math.floor(progress * totalYears);
          const clampedIndex = Math.min(Math.max(yearIndex, 0), totalYears - 1);

          if (clampedIndex !== currentYearIndex) {
            setCurrentYearIndex(clampedIndex);

            // ComPsych-style year transition
            gsap.fromTo(
              ".year-display",
              { opacity: 0, scale: 0.8, y: -50, rotation: -5 },
              {
                opacity: 1,
                scale: 1,
                y: 0,
                rotation: 0,
                duration: 1,
                ease: "power3.out",
              }
            );

            // Smooth content reveal
            gsap.fromTo(
              ".content-container",
              { opacity: 0, y: 100, scale: 0.95 },
              { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out" }
            );
          }
        },
      });

      // Parallax effects for timeline and content sections
      ScrollTrigger.create({
        trigger: scrollTriggerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          // Timeline parallax
          if (timelineRef.current) {
            gsap.to(timelineRef.current, {
              x: progress * -50,
              scale: 1 - progress * 0.1,
              ease: "power2.out",
            });
          }

          // Content parallax
          if (contentRef.current) {
            gsap.to(contentRef.current, {
              x: progress * 30,
              scale: 1 + progress * 0.05,
              ease: "power2.out",
            });
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [currentYearIndex]);

  return (
    <div ref={containerRef} className="bg-black text-white">
      <div ref={scrollTriggerRef} className="h-screen overflow-hidden">
        <BackgroundElements isDark={true} />

        <div className="flex h-full">
          {/* Left Side - Timeline */}
          <div
            ref={timelineRef}
            className="w-1/2 relative flex items-center justify-center border-r border-white/10"
          >
            <TimelineSection
              currentYear={timelineData[currentYearIndex]}
              isDark={true}
            />
          </div>

          {/* Right Side - Content */}
          <div ref={contentRef} className="w-1/2 relative">
            <ContentSection
              currentData={timelineData[currentYearIndex]}
              isDark={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
