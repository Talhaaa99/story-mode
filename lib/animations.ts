import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { seededRandom } from "./utils";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const initScrollTrigger = () => {
  if (typeof window === "undefined") return;

  // Initialize GSAP ScrollTrigger
  ScrollTrigger.config({
    ignoreMobileResize: true,
  });

  // Set up smooth scrolling
  gsap.set("html, body", {
    scrollBehavior: "smooth",
  });
};

export const createFadeInAnimation = (
  element: Element,
  direction: "up" | "down" | "left" | "right" = "up"
) => {
  if (typeof window === "undefined") return;

  const directions = {
    up: { y: 50, opacity: 0 },
    down: { y: -50, opacity: 0 },
    left: { x: 50, opacity: 0 },
    right: { x: -50, opacity: 0 },
  };

  const initial = directions[direction];
  const final = { x: 0, y: 0, opacity: 1 };

  gsap.set(element, initial);

  ScrollTrigger.create({
    trigger: element,
    start: "top 80%",
    end: "bottom 20%",
    onEnter: () => {
      gsap.to(element, {
        ...final,
        duration: 0.8,
        ease: "power2.out",
      });
    },
    onLeave: () => {
      gsap.set(element, initial);
    },
    onEnterBack: () => {
      gsap.to(element, {
        ...final,
        duration: 0.8,
        ease: "power2.out",
      });
    },
    onLeaveBack: () => {
      gsap.set(element, initial);
    },
  });
};

export const createFloatingAnimation = (elements: string | Element[]) => {
  if (typeof window === "undefined") return null;

  const elementsArray = Array.isArray(elements) ? elements : [elements];

  elementsArray.forEach((element, index) => {
    const seed = index * 12345;
    gsap.to(element, {
      y: `${seededRandom(seed) * 30 - 15}px`,
      x: `${seededRandom(seed + 1) * 20 - 10}px`,
      rotation: `${seededRandom(seed + 2) * 10 - 5}deg`,
      duration: 3 + seededRandom(seed + 3) * 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay: index * 0.3,
    });
  });
};

// Enhanced animation for level content with proper reset
export const createLevelAnimation = (element: Element, delay: number = 0) => {
  if (typeof window === "undefined") return;

  gsap.set(element, { opacity: 0, y: 30 });

  ScrollTrigger.create({
    trigger: element,
    start: "top 85%",
    onEnter: () => {
      gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: delay,
        ease: "power2.out",
      });
    },
    onLeave: () => {
      gsap.set(element, { opacity: 0, y: 30 });
    },
    onEnterBack: () => {
      gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: delay,
        ease: "power2.out",
      });
    },
    onLeaveBack: () => {
      gsap.set(element, { opacity: 0, y: 30 });
    },
  });
};

// Animation for terminal typing effect
export const createTerminalAnimation = (element: Element) => {
  if (typeof window === "undefined") return;

  gsap.set(element, { opacity: 0, scale: 0.95 });

  ScrollTrigger.create({
    trigger: element,
    start: "top 80%",
    onEnter: () => {
      gsap.to(element, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
      });
    },
    onLeave: () => {
      gsap.set(element, { opacity: 0, scale: 0.95 });
    },
    onEnterBack: () => {
      gsap.to(element, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
      });
    },
    onLeaveBack: () => {
      gsap.set(element, { opacity: 0, scale: 0.95 });
    },
  });
};

// Animation for cyberpunk frame entrance
export const createFrameAnimation = (element: Element) => {
  if (typeof window === "undefined") return;

  gsap.set(element, { opacity: 0, scale: 0.9, rotationY: 15 });

  ScrollTrigger.create({
    trigger: element,
    start: "top 80%",
    onEnter: () => {
      gsap.to(element, {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    },
    onLeave: () => {
      gsap.set(element, { opacity: 0, scale: 0.9, rotationY: 15 });
    },
    onEnterBack: () => {
      gsap.to(element, {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    },
    onLeaveBack: () => {
      gsap.set(element, { opacity: 0, scale: 0.9, rotationY: 15 });
    },
  });
};

// Animation for neon text glow
export const createNeonGlowAnimation = (element: Element) => {
  if (typeof window === "undefined") return;

  gsap.set(element, { opacity: 0.7 });

  ScrollTrigger.create({
    trigger: element,
    start: "top 85%",
    onEnter: () => {
      gsap.to(element, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    },
    onLeave: () => {
      gsap.set(element, { opacity: 0.7 });
    },
    onEnterBack: () => {
      gsap.to(element, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    },
    onLeaveBack: () => {
      gsap.set(element, { opacity: 0.7 });
    },
  });
};
