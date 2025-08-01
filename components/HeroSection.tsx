"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { StarField } from "./StarField";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ComPsych-style scroll animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Parallax effect for title
      tl.to(
        titleRef.current,
        {
          y: -100,
          scale: 0.8,
          opacity: 0.3,
          ease: "power2.out",
        },
        0
      );

      // Subtitle animation
      tl.to(
        subtitleRef.current,
        {
          y: -50,
          opacity: 0.5,
          ease: "power2.out",
        },
        0.2
      );

      // Description animation
      tl.to(
        descriptionRef.current,
        {
          y: -30,
          opacity: 0.3,
          ease: "power2.out",
        },
        0.4
      );

      // CTA button animation
      tl.to(
        ctaRef.current,
        {
          y: -20,
          opacity: 0.2,
          ease: "power2.out",
        },
        0.6
      );

      // Initial entrance animations
      const entranceTl = gsap.timeline();

      entranceTl.fromTo(
        titleRef.current,
        { opacity: 0, y: 100, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          delay: 0.5,
        }
      );

      entranceTl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power2.out", delay: 1.2 }
      );

      entranceTl.fromTo(
        descriptionRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 1.8 }
      );

      entranceTl.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.8, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: 2.2,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen bg-black relative overflow-hidden"
    >
      {/* Star Field Background */}
      <StarField />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Title */}
          <h1
            ref={titleRef}
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white"
          >
            <span className="text-gradient">Talha</span>
          </h1>

          {/* Subtitle */}
          <h2
            ref={subtitleRef}
            className="text-2xl md:text-3xl lg:text-4xl font-light text-white/80 tracking-wide"
          >
            Developer & Innovator
          </h2>

          {/* Description */}
          <p
            ref={descriptionRef}
            className="text-lg md:text-xl lg:text-2xl text-white/60 max-w-2xl mx-auto leading-relaxed"
          >
            Crafting digital experiences with precision and creativity.
            Transforming ideas into elegant, scalable solutions.
          </p>

          {/* CTA Button */}
          <div ref={ctaRef} className="pt-8">
            <button
              onClick={() => {
                // Scroll to the timeline section
                document.getElementById("timeline")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white font-medium tracking-wide hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              Explore My Journey
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-8 left-8 text-white/30 text-sm font-mono">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-white/50 rounded-full animate-pulse"></div>
          <span>Ready to build the future</span>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 text-white/30 text-sm font-mono">
        <div className="flex items-center space-x-2">
          <span>Scroll to explore</span>
          <div className="w-2 h-2 bg-white/50 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
