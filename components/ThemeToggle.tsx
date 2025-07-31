"use client";

import { Button } from '@/components/ui/button';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: (isDark: boolean) => void;
}

export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <div className="fixed top-8 right-8 z-50">
      <Button
        onClick={() => onToggle(!isDark)}
        variant="outline"
        size="sm"
        className={`
          border-2 transition-all duration-300 hover:scale-110
          ${isDark 
            ? 'border-white/30 text-white hover:bg-white hover:text-black' 
            : 'border-black/30 text-black hover:bg-black hover:text-white'
          }
        `}
      >
        {isDark ? '☀️' : '🌙'}
      </Button>
    </div>
  );
}