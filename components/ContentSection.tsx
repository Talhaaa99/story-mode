"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

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
  };
  isDark: boolean;
}

export function ContentSection({ currentData, isDark }: ContentSectionProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const profilesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate content entrance with journey effect
      gsap.fromTo(contentRef.current, 
        { opacity: 0, y: 100, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }
      );

      // Animate floating profile pics
      gsap.fromTo('.profile-pic', 
        { scale: 0, rotation: -180, opacity: 0 },
        { 
          scale: 1, 
          rotation: 0, 
          opacity: 1, 
          duration: 0.8, 
          ease: "back.out(1.7)",
          stagger: 0.2,
          delay: 0.5
        }
      );

      // Floating animation for profile pics
      gsap.to('.profile-pic', {
        y: -10,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.3
      });

      // Code snippet typing effect
      gsap.fromTo('.code-snippet', 
        { width: 0, opacity: 0 },
        { width: "100%", opacity: 1, duration: 1.5, ease: "none", delay: 0.8 }
      );

      // Visual metaphor animations based on the year
      if (currentData.visual === 'car') {
        // Car zooming animation for 2005
        gsap.fromTo('.visual-element',
          { x: -200, opacity: 0, rotate: -10 },
          { x: 200, opacity: 1, rotate: 0, duration: 2, ease: "power2.out" }
        );
      } else if (currentData.visual === 'curtains') {
        // Colorful curtains animation for 2018
        gsap.fromTo('.visual-element',
          { scaleY: 0, transformOrigin: "top" },
          { scaleY: 1, duration: 1.5, ease: "elastic.out(1, 0.5)" }
        );
      } else if (currentData.visual === 'code') {
        // Typing effect for coding years
        gsap.fromTo('.visual-element',
          { width: 0 },
          { width: "100%", duration: 2, ease: "none" }
        );
      } else if (currentData.visual === 'celebration') {
        // Celebration particles
        gsap.fromTo('.visual-element',
          { scale: 0, rotation: 0 },
          { scale: 1, rotation: 360, duration: 1.5, ease: "back.out(1.7)" }
        );
      }
    });

    return () => ctx.revert();
  }, [currentData]);

  const renderVisualMetaphor = () => {
    switch (currentData.visual) {
      case 'car':
        return (
          <div className="visual-element text-6xl opacity-70">
            🚗💨
          </div>
        );
      case 'curtains':
        return (
          <div className="visual-element w-full h-32 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 rounded-lg opacity-60" />
        );
      case 'code':
        return (
          <div className="visual-element font-mono text-sm overflow-hidden whitespace-nowrap border-r-2 border-green-500">
            const life = new Journey(); life.start();
          </div>
        );
      case 'celebration':
        return (
          <div className="visual-element text-4xl">
            🎉✨🎊
          </div>
        );
      case 'rocket':
        return (
          <div className="visual-element text-6xl opacity-70">
            🚀🌟
          </div>
        );
      default:
        return (
          <div className="visual-element w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-60" />
        );
    }
  };

  return (
    <div className="content-container h-full flex flex-col justify-center p-8 md:p-16 relative overflow-hidden">
      {/* Floating Profile Pictures */}
      <div ref={profilesRef} className="absolute inset-0 pointer-events-none">
        {currentData.profilePics.map((profile, index) => (
          <div
            key={index}
            className="profile-pic absolute"
            style={{
              left: `${20 + (index * 25)}%`,
              top: `${15 + (index * 20)}%`,
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

      <div ref={contentRef} className="max-w-lg">
        {/* Visual Metaphor */}
        <div className="mb-8 flex justify-center">
          {renderVisualMetaphor()}
        </div>
        
        {/* Content */}
        <div className="space-y-6">
          <div className="space-y-4 text-lg md:text-xl leading-relaxed opacity-80">
            {currentData.description.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          
          {/* Code Snippet */}
          <div className="mt-8 p-4 bg-black/30 rounded-lg border border-gray-700/50 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <pre className="code-snippet font-mono text-sm text-green-400 overflow-hidden whitespace-pre-wrap">
              {currentData.codeSnippet}
            </pre>
          </div>
          
          {/* Decorative Element */}
          <div className="flex items-center space-x-4 pt-6">
            <div 
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: currentData.color }}
            />
            <div 
              className="w-8 h-0.5 rounded-full opacity-50"
              style={{ backgroundColor: currentData.color }}
            />
            <div 
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: currentData.color }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}