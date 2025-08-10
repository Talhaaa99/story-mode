import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Deterministic random number generator to fix hydration issues
export function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Generate deterministic random position for floating elements
export function getRandomPosition(
  index: number,
  maxX: number = 80,
  maxY: number = 80,
  minX: number = 10,
  minY: number = 10
) {
  const seed = index * 12345; // Use index as seed for deterministic randomness
  const x = seededRandom(seed) * (maxX - minX) + minX;
  const y = seededRandom(seed + 1) * (maxY - minY) + minY;
  return { x, y };
}
