"use client";

import { HeroSection } from "@/components/HeroSection";
import { Portfolio } from "@/components/Portfolio";

export default function Home() {
  return (
    <div className="bg-black">
      <HeroSection />
      <div id="timeline">
        <Portfolio />
      </div>
      {/* Spacer to ensure proper scroll behavior */}
      <div style={{ height: "100vh" }} />
    </div>
  );
}
