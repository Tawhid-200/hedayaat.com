"use state";
import React, { useState } from "react";
import { Navbar } from "@/components/layouts/Navbar";
import { HeroText } from "@/components/ui/hero/Hero_Text";
import { BrandTagline } from "@/components/ui/hero/Brand_Tagline";
import { SearchBar } from "@/components/ui/hero/Search_bar";
import { QuickActionButton } from "@/components/ui/hero/Quick_Action_Button";
import { SimpleTextFeatures } from "@/components/ui/hero/Simple_Text_Features";

export function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  return (
    <header>
      <Navbar />
      <div
        className={`relative w-full min-h-screen overflow-hidden ${
          loaded ? "smooth-fade" : "opacity-0"
        }`}
      >
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#353b48e0_5%,#000_100%)] max-sm:bg-[radial-gradient(circle_at_top,#353b48e0_-30%,#000_100%)] overflow-hidden -z-10 smooth-fade w-full" />

        {/* Animated background elements */}
        <div className="overflow-hidden bg-animation -z-10">
          <div id="stars"></div>
          <div id="stars2"></div>
          <div id="stars3"></div>
          <div id="stars4"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
          <div className="text-center max-w-6xl mx-auto md:mt-16 -mt-8 w-full space-y-8 max-sm:space-y-6">
            <BrandTagline>Experience the Divine Word</BrandTagline>
            <HeroText onLoaded={() => setLoaded(true)} />
            <SearchBar />
            <QuickActionButton />
            <SimpleTextFeatures />
          </div>
        </div>
      </div>
    </header>
  );
}
