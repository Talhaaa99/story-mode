"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface ContentSectionProps {
  currentData: {
    year: string;
    title: string;
    description: string;
    codeSnippet: string;
    profilePics: Array<{
      name: string;
      description: string;
      emoji: string;
    }>;
    visual: string;
    color: string;
    category?: string;
  };
  isDark: boolean;
}

export function ContentSection({ currentData, isDark }: ContentSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  // Animate description change
  useEffect(() => {
    if (descriptionRef.current) {
      const tl = gsap.timeline();
      tl.to(descriptionRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power2.out",
      })
        .set(descriptionRef.current, { y: -20 })
        .to(descriptionRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        });
    }
  }, [currentData]);

  // Animate visual elements (floating, rotation, scale)
  useEffect(() => {
    const visualElements =
      containerRef.current?.querySelectorAll(".visual-element");
    if (visualElements) {
      gsap.to(visualElements, {
        rotation: "random(-5, 5)",
        scale: "random(0.95, 1.05)",
        duration: "random(2, 4)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2,
      });
    }
  }, []);

  // Helper for category color (fallback to currentData.color)
  function getCategoryColor(category?: string) {
    // You can expand this mapping as needed
    if (!category) return "";
    switch (category.toLowerCase()) {
      case "career":
        return "bg-blue-500";
      case "education":
        return "bg-green-500";
      case "project":
        return "bg-purple-500";
      default:
        return "";
    }
  }

  return (
    <div
      ref={containerRef}
      className="h-full bg-gradient-to-br from-background to-muted/10 relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid opacity-10" />

      {/* Content overlay */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8 lg:px-12">
        <div className="space-y-8">
          {/* Main description */}
          <p
            ref={descriptionRef}
            className="text-2xl lg:text-4xl leading-relaxed text-foreground/90 font-light"
          >
            {currentData.description}
          </p>

          {/* Category indicator (if available) */}
          {currentData.category && (
            <div className="flex items-center space-x-3">
              <div
                className={`w-3 h-3 rounded-full visual-element ${
                  getCategoryColor(currentData.category) || ""
                }`}
                style={{
                  backgroundColor: !getCategoryColor(currentData.category)
                    ? currentData.color
                    : undefined,
                }}
              />
              <span className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
                {currentData.category}
              </span>
            </div>
          )}
        </div>

        {/* Code Snippet Window */}
        <div className="mt-8 p-4 bg-black/30 rounded-lg border border-gray-700/50 backdrop-blur-sm max-w-xl">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <pre className="code-snippet font-mono text-sm text-green-400 overflow-hidden whitespace-pre-wrap">
            {currentData.codeSnippet}
          </pre>
        </div>
      </div>

      {/* Floating accent elements (visuals) */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="visual-element absolute w-1 h-1 bg-primary/20 rounded-full"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
        />
      ))}

      {/* Floating Profile Pictures (pfps) */}
      <div className="absolute inset-0 pointer-events-none">
        {currentData.profilePics.map((profile, index) => (
          <div
            key={index}
            className="profile-pic absolute"
            style={{
              left: `${20 + index * 25}%`,
              top: `${15 + index * 20}%`,
            }}
          >
            <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-sm rounded-full px-3 py-2 border border-white/10">
              <span className="text-2xl">{profile.emoji}</span>
              <div className="text-xs">
                <div className="font-semibold">{profile.name}</div>
                <div className="opacity-70">{profile.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
