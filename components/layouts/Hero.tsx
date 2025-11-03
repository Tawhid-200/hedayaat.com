"use client";

import { motion } from "framer-motion";
import { StarsBackground } from "@/components/ui/stars-background";

export function HeroSection() {
  return (
    <StarsBackground
      speed={140}
      factor={0.03}
      enableParallax={false}
      glowProbability={1} // 20% of stars will have glow
      starColors={{
        small: "#ffffff",
        medium: "#d4d4d8", // zinc-300
        large: "#fafafa", // zinc-50
      }}
    >
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Small subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-zinc-500 text-xs sm:text-sm md:text-base mb-4 uppercase tracking-widest font-medium"
          >
            Welcome to the Divine Path
          </motion.p>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-linear-to-b from-white via-zinc-200 to-zinc-400">
              Al-Hedayah
            </span>
          </h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Experience authentic Islamic knowledge through a modern platform
            designed for seekers of divine guidance
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button className="group relative px-6 py-3 bg-white text-black font-medium rounded-lg overflow-hidden transition-all duration-200 shadow-lg hover:shadow-xl min-w-[140px]">
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-zinc-100 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
            </button>
            <button className="px-6 py-3 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 text-white font-medium rounded-lg hover:bg-zinc-800/50 hover:border-zinc-700 transition-all duration-200 min-w-[140px]">
              Learn More
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-20 grid grid-cols-3 gap-8 text-center"
          >
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
          </motion.div>
        </motion.div>

        {/* Enhanced glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="w-[600px] h-[600px] bg-zinc-800/20 rounded-full blur-3xl animate-pulse-subtle" />
        </div>

        {/* Additional accent glows */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      </div>
    </StarsBackground>
  );
}
