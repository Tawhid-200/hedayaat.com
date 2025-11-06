"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

interface LightRaysProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  color?: string;
  blur?: number;
  speed?: number;
  length?: string;
  intensity?: number;
  glowStrength?: number;
  position?: "top" | "bottom" | "left" | "right";
  width?: number; // Changed from spread to width for clarity
  coneAngle?: number; // Control the cone opening angle
}

export function LightRays({
  className,
  style,
  color = "rgba(160, 210, 255, 0.5)",
  blur = 20,
  speed = 3,
  length = "50vh",
  intensity = 0.8,
  glowStrength = 1.5,
  position = "top",
  width = 300, // Width in pixels
  coneAngle = 45, // Angle in degrees (how wide the cone opens)
  ref,
  ...props
}: LightRaysProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  // Determine position and rotation based on direction
  const getPositionStyles = () => {
    switch (position) {
      case "top":
        return {
          top: "0",
          left: "50%",
          transform: "translateX(-50%)",
          transformOrigin: "top center",
        };
      case "bottom":
        return {
          bottom: "0",
          left: "50%",
          transform: "translateX(-50%) rotate(180deg)",
          transformOrigin: "bottom center",
        };
      case "left":
        return {
          left: "0",
          top: "50%",
          transform: "translateY(-50%) rotate(90deg)",
          transformOrigin: "left center",
        };
      case "right":
        return {
          right: "0",
          top: "50%",
          transform: "translateY(-50%) rotate(-90deg)",
          transformOrigin: "right center",
        };
      default:
        return {
          top: "0",
          left: "50%",
          transform: "translateX(-50%)",
          transformOrigin: "top center",
        };
    }
  };

  const positionStyles = getPositionStyles();

  // Calculate the polygon points based on cone angle
  const calculateConeClipPath = (angle: number) => {
    const halfAngle = angle / 2;
    const bottomLeft = 50 - halfAngle;
    const bottomRight = 50 + halfAngle;
    return `polygon(50% 0%, ${bottomLeft}% 100%, ${bottomRight}% 100%)`;
  };

  return (
    <div
      ref={ref}
      className={cn(
        "pointer-events-none absolute inset-0 isolate overflow-hidden rounded-[inherit]",
        className,
      )}
      style={
        {
          "--light-rays-color": color,
          "--light-rays-blur": `${blur}px`,
          "--light-rays-length": length,
          "--light-rays-intensity": intensity,
          "--light-rays-glow": glowStrength,
          "--light-rays-width": `${width}px`,
          ...style,
        } as CSSProperties
      }
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* Main ambient glow background */}
        <motion.div
          aria-hidden
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: isAnimating ? 0.3 * glowStrength : 0 }}
          transition={{ duration: speed, ease: "easeOut" }}
          style={
            {
              background: `radial-gradient(
                ellipse ${width * 1.5}px ${width}px at 50% ${position === "bottom" ? "100%" : "0%"},
                color-mix(in srgb, var(--light-rays-color) ${50 * glowStrength}%, transparent),
                transparent 70%
              )`,
              filter: `blur(${blur * 2}px)`,
            } as CSSProperties
          }
        />

        {/* Enhanced center glow - smaller and more focused */}
        <motion.div
          aria-hidden
          className="absolute"
          initial={{ opacity: 0 }}
          animate={{ opacity: isAnimating ? 0.5 * glowStrength : 0 }}
          transition={{ duration: speed * 0.8, ease: "easeOut" }}
          style={{
            ...positionStyles,
            width: `${width}px`,
            height: `${width * 0.6}px`,
            background: `radial-gradient(
              ellipse closest-side at 50% ${position === "bottom" ? "100%" : "0%"},
              color-mix(in srgb, var(--light-rays-color) ${80 * glowStrength}%, transparent) 0%,
              transparent 100%
            )`,
            filter: `blur(${blur * 1.5}px)`,
          }}
        />

        {/* Main half-cylinder light ray */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            ...positionStyles,
            width: `var(--light-rays-width)`,
            height: `var(--light-rays-length)`,
          }}
          initial={{ opacity: 0, scaleY: 0.8 }}
          animate={{
            opacity: isAnimating ? intensity : 0,
            scaleY: isAnimating ? 1 : 0.8,
          }}
          transition={{
            duration: speed,
            ease: "easeOut",
          }}
        >
          {/* Soft outer glow cone */}
          <div
            className="absolute inset-0"
            style={
              {
                background: `linear-gradient(
                  to bottom,
                  color-mix(in srgb, var(--light-rays-color) ${30 * glowStrength}%, transparent) 0%,
                  color-mix(in srgb, var(--light-rays-color) ${15 * glowStrength}%, transparent) 30%,
                  transparent 100%
                )`,
                filter: `blur(${blur * 1.5}px)`,
                mixBlendMode: "screen",
                clipPath: calculateConeClipPath(coneAngle * 1.2),
              } as CSSProperties
            }
          />

          {/* Main cone gradient */}
          <div
            className="absolute inset-0"
            style={
              {
                background: `linear-gradient(
                  to bottom,
                  color-mix(in srgb, var(--light-rays-color) ${60 * glowStrength}%, transparent) 0%,
                  color-mix(in srgb, var(--light-rays-color) ${30 * glowStrength}%, transparent) 40%,
                  transparent 100%
                )`,
                filter: `blur(${blur}px)`,
                mixBlendMode: "screen",
                clipPath: calculateConeClipPath(coneAngle),
              } as CSSProperties
            }
          />

          {/* Inner bright core - narrower to avoid harsh lines */}
          <div
            className="absolute inset-0"
            style={
              {
                background: `linear-gradient(
                  to bottom,
                  color-mix(in srgb, var(--light-rays-color) ${90 * glowStrength}%, transparent) 0%,
                  color-mix(in srgb, var(--light-rays-color) ${40 * glowStrength}%, transparent) 25%,
                  transparent 80%
                )`,
                filter: `blur(${Math.max(blur / 3, 2)}px)`,
                mixBlendMode: "screen",
                clipPath: calculateConeClipPath(coneAngle * 0.3),
              } as CSSProperties
            }
          />
        </motion.div>

        {/* Soft edge fade to prevent harsh lines */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            ...positionStyles,
            width: `calc(var(--light-rays-width) * 1.2)`,
            height: `var(--light-rays-length)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isAnimating ? 0.2 * glowStrength : 0 }}
          transition={{
            duration: speed * 1.2,
            ease: "easeOut",
            delay: speed * 0.1,
          }}
        >
          <div
            className="absolute inset-0"
            style={
              {
                background: `radial-gradient(
                  ellipse ${width * 1.2}px ${length} at 50% 0%,
                  transparent 30%,
                  color-mix(in srgb, var(--light-rays-color) ${20 * glowStrength}%, transparent) 50%,
                  transparent 70%
                )`,
                filter: `blur(${blur * 2.5}px)`,
                mixBlendMode: "screen",
              } as CSSProperties
            }
          />
        </motion.div>
      </div>
    </div>
  );
}

// Optional: Simplified version with preset configurations
export function SimpleSpotlight({
  className,
  brightness = "normal", // "dim" | "normal" | "bright" | "intense"
  size = "medium", // "small" | "medium" | "large" | "xlarge"
  color,
  ...props
}: Omit<
  LightRaysProps,
  "glowStrength" | "intensity" | "blur" | "width" | "coneAngle"
> & {
  brightness?: "dim" | "normal" | "bright" | "intense";
  size?: "small" | "medium" | "large" | "xlarge";
}) {
  const brightnessPresets = {
    dim: { intensity: 0.4, glowStrength: 0.8, blur: 35 },
    normal: { intensity: 0.6, glowStrength: 1.2, blur: 25 },
    bright: { intensity: 0.8, glowStrength: 1.8, blur: 20 },
    intense: { intensity: 1, glowStrength: 2.5, blur: 15 },
  };

  const sizePresets = {
    small: { width: 200, coneAngle: 30 },
    medium: { width: 300, coneAngle: 45 },
    large: { width: 500, coneAngle: 60 },
    xlarge: { width: 700, coneAngle: 75 },
  };

  const brightnessConfig = brightnessPresets[brightness];
  const sizeConfig = sizePresets[size];

  return (
    <LightRays
      className={className}
      color={color}
      intensity={brightnessConfig.intensity}
      glowStrength={brightnessConfig.glowStrength}
      blur={brightnessConfig.blur}
      width={sizeConfig.width}
      coneAngle={sizeConfig.coneAngle}
      {...props}
    />
  );
}
