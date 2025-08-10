import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        orbitron: ["var(--font-orbitron)", "monospace"],
        "chakra-petch": ["var(--font-chakra-petch)", "monospace"],
      },
      colors: {
        neon: {
          pink: "#ff00ff",
          cyan: "#00ffff",
          purple: "#a020f0",
          lime: "#00ff66",
        },
        cyber: {
          black: "#0a0a0a",
          "dark-gray": "#1a1a1a",
          "medium-gray": "#2a2a2a",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        glitch: {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "neon-glow": {
          "0%, 100%": {
            textShadow:
              "0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 15px #ff00ff, 0 0 20px #ff00ff",
          },
          "50%": {
            textShadow:
              "0 0 2px #ff00ff, 0 0 5px #ff00ff, 0 0 7px #ff00ff, 0 0 10px #ff00ff",
          },
        },
        "cyber-rain": {
          "0%": { transform: "translateY(-100vh)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        glitch: "glitch 0.3s ease-in-out infinite",
        flicker: "flicker 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        scanline: "scanline 2s linear infinite",
        "neon-glow": "neon-glow 2s ease-in-out infinite",
        "cyber-rain": "cyber-rain 1s linear infinite",
      },
      textShadow: {
        "neon-pink":
          "0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 15px #ff00ff, 0 0 20px #ff00ff",
        "neon-cyan":
          "0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 15px #00ffff, 0 0 20px #00ffff",
        "neon-purple":
          "0 0 5px #a020f0, 0 0 10px #a020f0, 0 0 15px #a020f0, 0 0 20px #a020f0",
        "neon-lime":
          "0 0 5px #00ff66, 0 0 10px #00ff66, 0 0 15px #00ff66, 0 0 20px #00ff66",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }: any) {
      const newUtilities = {
        ".text-shadow-neon-pink": {
          textShadow:
            "0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 15px #ff00ff, 0 0 20px #ff00ff",
        },
        ".text-shadow-neon-cyan": {
          textShadow:
            "0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 15px #00ffff, 0 0 20px #00ffff",
        },
        ".text-shadow-neon-purple": {
          textShadow:
            "0 0 5px #a020f0, 0 0 10px #a020f0, 0 0 15px #a020f0, 0 0 20px #a020f0",
        },
        ".text-shadow-neon-lime": {
          textShadow:
            "0 0 5px #00ff66, 0 0 10px #00ff66, 0 0 15px #00ff66, 0 0 20px #00ff66",
        },
      };
      addUtilities(newUtilities);
    },
  ],
} satisfies Config;

export default config;
