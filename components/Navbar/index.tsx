"use client";
import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { NavDesktop } from "./nav-desktop";
import { NavMobile } from "./nav-mobile";

export function Navbar() {
  const { scrollY } = useScroll();

  // State for UI logic
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle Scroll Logic
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    // 1. Check if we are scrolled down more than 20px
    if (latest > 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    // 2. Hide logic: Scrolled down AND moving down AND not at the very top
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  // If mobile menu is open, force dark background even at top
  const isBackgroundDark = scrolled || mobileMenuOpen;

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden && !mobileMenuOpen ? "hidden" : "visible"} // Don't hide if mobile menu is open
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full h-16 flex items-center transition-colors duration-300",
        isBackgroundDark
          ? "bg-background/60 backdrop-blur-md border-b border-border/10 shadow-sm"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between w-full h-full">
        {/* LEFT: Logo */}
        <div className="shrink-0">
          <a href="/" className="flex items-center gap-2">
            <h1 className="font-bold text-xl tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Al - Hedayah
            </h1>
          </a>
        </div>

        {/* MIDDLE & RIGHT: Desktop View */}
        <NavDesktop />

        {/* RIGHT: Mobile Menu Toggle */}
        <NavMobile isOpen={mobileMenuOpen} setIsOpen={setMobileMenuOpen} />
      </div>
    </motion.header>
  );
}
