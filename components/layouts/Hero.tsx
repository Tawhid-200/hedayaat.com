"use client";
import React from "react";
import { useTranslations } from "next-intl";

export function HeroSection() {
  // const t = useTranslations("hello");
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <div className=" absolute inset-0 bg-[radial-gradient(circle_at_top,#353b48e0_5%,#000_100%)]  max-sm:bg-[radial-gradient(circle_at_top,#353b48e0_-30%,#000_100%)] overflow-hidden -z-10 smooth-fade w-full" />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">
        <div className="text-center max-w-5xl mx-auto mt-16 max-sm:mt-0">
          {/* Small subtitle */}
          <p className="text-zinc-500 text-xs sm:text-sm md:text-base mb-4 uppercase tracking-widest font-medium animate-fade-in">
            Welcome to the Divine Path
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up">
            <span className="bg-clip-text text-transparent bg-linear-to-b from-white via-zinc-200 to-zinc-400">
              {/* {t("check")} */}
            </span>
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed animate-fade-in-delay">
            Experience authentic Islamic knowledge through a modern platform
            designed for seekers of divine guidance
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up-delay">
            <button className="group relative px-6 py-3 bg-white text-black font-medium rounded-lg overflow-hidden transition-all duration-200 shadow-lg hover:shadow-xl min-w-[140px]">
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-zinc-100 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
            </button>
            <button className="px-6 py-3 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 text-white font-medium rounded-lg hover:bg-zinc-800/50 hover:border-zinc-700 transition-all duration-200 min-w-[140px]">
              Learn More
            </button>
          </div>

          <div className="mt-20 grid grid-cols-3 gap-8 text-center animate-fade-in-stats">
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white">1000+</p>
              <p className="text-xs sm:text-sm text-zinc-500 mt-1">Lectures</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white">50+</p>
              <p className="text-xs sm:text-sm text-zinc-500 mt-1">Scholars</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white">24/7</p>
              <p className="text-xs sm:text-sm text-zinc-500 mt-1">Access</p>
            </div>
          </div>
          <div className="overflow-hidden bg-animation -z-10">
            <div id="stars"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>
            <div id="stars4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
