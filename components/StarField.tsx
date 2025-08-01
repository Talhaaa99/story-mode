"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
  isShooting?: boolean;
}

const STAR_COUNT = 60;

export function StarField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stars, setStars] = useState<Star[]>([]);
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  // Initialize stars
  useEffect(() => {
    const newStars = Array.from({ length: STAR_COUNT }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 1.5,
      opacity: Math.random() * 0.5 + 0.2,
      delay: Math.random() * 2,
      isShooting: false,
    }));
    setStars(newStars);
  }, []);

  // Mouse movement with inertia
  useEffect(() => {
    let target = { x: mouse.current.x, y: mouse.current.y };
    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    function animate() {
      mouse.current.x += (target.x - mouse.current.x) * 0.08;
      mouse.current.y += (target.y - mouse.current.y) * 0.08;
      rafId = requestAnimationFrame(animate);
    }
    animate();
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Animate stars with GSAP
  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      stars.forEach((star) => {
        const starElement = containerRef.current?.querySelector(
          `[data-star-id="${star.id}"]`
        );
        if (!starElement) return;
        // Animate twinkling
        gsap.to(starElement, {
          opacity: `random(0.2,0.8)`,
          duration: `random(1.5,3.5)`,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: star.delay,
        });
        // Animate floating
        gsap.to(starElement, {
          y: `+=${Math.random() * 20 - 10}`,
          x: `+=${Math.random() * 20 - 10}`,
          duration: `random(3,6)`,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: star.delay,
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, [stars]);

  // Mouse proximity effect (smooth GSAP follow)
  useEffect(() => {
    if (!containerRef.current) return;
    const updateFns: (() => void)[] = [];
    const ctx = gsap.context(() => {
      stars.forEach((star) => {
        const starElement = containerRef.current?.querySelector(
          `[data-star-id="${star.id}"]`
        );
        if (!starElement) return;
        // Animate scale and glow based on proximity
        const update = () => {
          const starX = (star.x / 100) * window.innerWidth;
          const starY = (star.y / 100) * window.innerHeight;
          const dx = mouse.current.x - starX;
          const dy = mouse.current.y - starY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 200;
          const intensity = Math.max(0, 1 - dist / maxDist);
          gsap.to(starElement, {
            scale: 1 + intensity * 0.7,
            boxShadow:
              intensity > 0.1
                ? `0 0 ${10 + intensity * 30}px 2px #fff8`
                : "none",
            duration: 0.5,
            ease: "power2.out",
          });
        };
        gsap.ticker.add(update);
        updateFns.push(update);
      });
    }, containerRef);
    return () => {
      updateFns.forEach((fn) => gsap.ticker.remove(fn));
      ctx.revert();
    };
  }, [stars]);

  // Shooting star effect
  useEffect(() => {
    if (!containerRef.current) return;
    let intervalId: NodeJS.Timeout;
    function shootStar() {
      const available = stars.filter((s) => !s.isShooting);
      if (available.length === 0) return;
      const star = available[Math.floor(Math.random() * available.length)];
      const starElement = containerRef.current?.querySelector(
        `[data-star-id="${star.id}"]`
      );
      if (!starElement) return;
      star.isShooting = true;
      gsap.to(starElement, {
        x: window.innerWidth * 0.7,
        y: window.innerHeight * (Math.random() * 0.5 - 0.25),
        opacity: 1,
        scale: 1.8,
        duration: 0.7,
        ease: "power4.in",
        onComplete: () => {
          gsap.set(starElement, {
            x: 0,
            y: 0,
            scale: 1,
            opacity: star.opacity,
          });
          star.isShooting = false;
        },
      });
    }
    intervalId = setInterval(() => {
      if (Math.random() < 0.3) shootStar();
    }, 1200);
    return () => clearInterval(intervalId);
  }, [stars]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          data-star-id={star.id}
          className="absolute rounded-full bg-white shadow-lg"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            transform: "translate(-50%, -50%)",
            filter: "blur(0.5px)",
            transition: "box-shadow 0.3s",
          }}
        />
      ))}
    </div>
  );
}
