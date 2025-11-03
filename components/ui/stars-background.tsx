"use client";

import * as React from "react";
import {
  type HTMLMotionProps,
  motion,
  useMotionValue,
  useSpring,
  type SpringOptions,
  type Transition,
} from "framer-motion";

import { cn } from "@/lib/utils";

type StarLayerProps = HTMLMotionProps<"div"> & {
  count: number;
  size: number;
  transition: Transition;
  starColor: string;
  glowProbability?: number;
};

function generateStars(
  count: number,
  starColor: string,
  size: number,
  glowProbability: number = 0.15
) {
  const shadows: string[] = [];
  const glowShadows: string[] = [];

  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 2000) - 1000;
    const y = Math.floor(Math.random() * 2000) - 1000;

    // Random size variation (50% to 150% of base size)
    const sizeVariation = 0.5 + Math.random();
    const randomSize = Math.max(0.5, size * sizeVariation);

    // Determine if this star should glow
    const shouldGlow = Math.random() < glowProbability;

    if (shouldGlow) {
      // Glowing stars with blur effect
      const glowIntensity = 2 + Math.random() * 4; // Random glow size
      glowShadows.push(`${x}px ${y}px ${glowIntensity}px ${starColor}`);
    } else {
      // Normal stars
      shadows.push(`${x}px ${y}px ${starColor}`);
    }
  }

  return {
    normal: shadows.join(", "),
    glow: glowShadows.join(", "),
  };
}

function StarLayer({
  count = 1000,
  size = 1,
  transition = { repeat: Infinity, duration: 50, ease: "linear" },
  starColor = "#ffffff",
  glowProbability = 0.15,
  className,
  ...props
}: StarLayerProps) {
  const [shadows, setShadows] = React.useState<{
    normal: string;
    glow: string;
  }>({ normal: "", glow: "" });

  React.useEffect(() => {
    setShadows(generateStars(count, starColor, size, glowProbability));
  }, [count, starColor, size, glowProbability]);

  return (
    <motion.div
      animate={{ y: [0, -1000] }}
      transition={transition}
      className={cn("absolute inset-0 w-full h-full", className)}
      {...props}
    >
      {/* Normal stars */}
      {shadows.normal && (
        <div
          className="absolute left-1/2 top-1/2 bg-white rounded-full"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            boxShadow: shadows.normal,
            transform: "translate(-50%, -50%)",
          }}
        />
      )}

      {/* Glowing stars */}
      {shadows.glow && (
        <div
          className="absolute left-1/2 top-1/2 bg-white rounded-full animate-pulse-subtle"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            boxShadow: shadows.glow,
            transform: "translate(-50%, -50%)",
            filter: "blur(0.5px)",
          }}
        />
      )}

      {/* Duplicate for seamless loop - Normal */}
      {shadows.normal && (
        <div
          className="absolute left-1/2 bg-white rounded-full"
          style={{
            top: "calc(50% + 1000px)",
            width: `${size}px`,
            height: `${size}px`,
            boxShadow: shadows.normal,
            transform: "translateX(-50%)",
          }}
        />
      )}

      {/* Duplicate for seamless loop - Glow */}
      {shadows.glow && (
        <div
          className="absolute left-1/2 bg-white rounded-full animate-pulse-subtle"
          style={{
            top: "calc(50% + 1000px)",
            width: `${size}px`,
            height: `${size}px`,
            boxShadow: shadows.glow,
            transform: "translateX(-50%)",
            filter: "blur(0.5px)",
          }}
        />
      )}
    </motion.div>
  );
}

type StarsBackgroundProps = React.ComponentProps<"div"> & {
  factor?: number;
  speed?: number;
  transition?: SpringOptions;
  starColors?: {
    small?: string;
    medium?: string;
    large?: string;
  };
  enableParallax?: boolean;
  glowProbability?: number;
};

export function StarsBackground({
  children,
  className,
  factor = 0.02,
  speed = 100,
  transition = { stiffness: 50, damping: 15 },
  starColors = {
    small: "#ffffff",
    medium: "#e4e4e7", // zinc-200
    large: "#d4d4d8", // zinc-300
  },
  enableParallax = true,
  glowProbability = 0.15,
  ...props
}: StarsBackgroundProps) {
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);

  const springX = useSpring(offsetX, transition);
  const springY = useSpring(offsetY, transition);

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!enableParallax) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const newOffsetX = (mouseX - centerX) * factor;
      const newOffsetY = (mouseY - centerY) * factor;

      offsetX.set(newOffsetX);
      offsetY.set(newOffsetY);
    },
    [offsetX, offsetY, factor, enableParallax]
  );

  const handleMouseLeave = React.useCallback(() => {
    offsetX.set(0);
    offsetY.set(0);
  }, [offsetX, offsetY]);

  return (
    <div
      className={cn(
        "relative w-full min-h-screen overflow-hidden",
        "bg-linear-to-b from-zinc-950 via-zinc-900 to-black",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* Dark gradient overlay for better star visibility */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

      {/* Stars container with parallax */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Tiny stars - Very small, numerous, subtle glow */}
        <StarLayer
          count={600}
          size={0.5}
          transition={{
            repeat: Infinity,
            duration: speed * 0.8,
            ease: "linear",
          }}
          starColor={starColors.small!}
          glowProbability={0.05}
          style={{ opacity: 0.6 }}
        />

        {/* Small stars - Fast moving, many stars */}
        <StarLayer
          count={400}
          size={1}
          transition={{
            repeat: Infinity,
            duration: speed,
            ease: "linear",
          }}
          starColor={starColors.small!}
          glowProbability={0.12}
          style={{ opacity: 0.8 }}
        />

        {/* Medium stars - Medium speed, moderate glow */}
        <StarLayer
          count={250}
          size={1.5}
          transition={{
            repeat: Infinity,
            duration: speed * 1.5,
            ease: "linear",
          }}
          starColor={starColors.medium!}
          glowProbability={0.18}
          style={{ opacity: 0.9 }}
        />

        {/* Large stars - Slower, prominent glow */}
        <StarLayer
          count={100}
          size={2}
          transition={{
            repeat: Infinity,
            duration: speed * 2,
            ease: "linear",
          }}
          starColor={starColors.large!}
          glowProbability={0.25}
          style={{ opacity: 1 }}
        />

        {/* Extra large stars - Very slow, strong glow */}
        <StarLayer
          count={30}
          size={3}
          transition={{
            repeat: Infinity,
            duration: speed * 2.5,
            ease: "linear",
          }}
          starColor="#ffffff"
          glowProbability={0.4}
          style={{ opacity: 1 }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export type { StarLayerProps, StarsBackgroundProps };
