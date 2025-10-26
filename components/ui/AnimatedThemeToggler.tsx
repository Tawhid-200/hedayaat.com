"use client";

import { useCallback, useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const THEMES = ["light", "dark"];

export const ThemeSwitch = ({ duration = 400 }: { duration?: number }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [animatingFrom, setAnimatingFrom] = useState<{
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Clean up all theme classes from html element
  const cleanupThemeClasses = () => {
    const htmlElement = document.documentElement;
    // Remove all theme classes
    THEMES.forEach((themeName) => {
      htmlElement.classList.remove(themeName);
    });
    // Also remove dark class if present
    htmlElement.classList.remove("dark");
  };

  const handleThemeClick = useCallback(
    async (newTheme: string, event: React.MouseEvent) => {
      if (!mounted) return;

      const rect = (event.target as HTMLElement).getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      setAnimatingFrom({ x, y });

      const isNewThemeDark = newTheme.includes("_dark") || newTheme === "dark";

      if (!document.startViewTransition) {
        // Clean up old classes before setting new theme
        cleanupThemeClasses();
        setTheme(newTheme);
        // Only add dark class if needed, not the theme name
        if (isNewThemeDark) {
          document.documentElement.classList.add("dark");
        }
        setAnimatingFrom(null);
        return;
      }

      const transition = document.startViewTransition(() => {
        flushSync(() => {
          // Clean up old classes before setting new theme
          cleanupThemeClasses();
          setTheme(newTheme);
          // Only add dark class if needed
          if (isNewThemeDark) {
            document.documentElement.classList.add("dark");
          }
        });
      });

      await transition.ready;

      const maxRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      );

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        },
      );

      setTimeout(() => setAnimatingFrom(null), duration);
    },
    [setTheme, duration, mounted],
  );

  if (!mounted) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <div className="flex flex-col gap-2">
          {THEMES.map((themeName) => (
            <Button key={themeName} size="sm" className="w-40" disabled>
              {themeName.replace(/_/g, " ")}
            </Button>
          ))}
        </div>
      </div>
    );
  }

  // Format theme name for display
  const formatName = (name: string) => {
    return name
      .replace(/_/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="">
      <div className="w-full flex flex-wrap gap-2 overflow-y-auto p-2 bg-background/80 backdrop-blur-md rounded-lg border border-divider">
        {THEMES.map((themeName) => (
          <Button
            key={themeName}
            color={theme === themeName ? "primary" : "default"}
            onClick={(e) => handleThemeClick(themeName, e)}
            disabled={animatingFrom !== null}
            className={cn(
              "justify-start",
              theme === themeName && "font-semibold",
            )}
          >
            {formatName(themeName)}
          </Button>
        ))}
      </div>
    </div>
  );
};
