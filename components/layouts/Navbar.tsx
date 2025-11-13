"use client";

import React, { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  Variants,
  AnimatePresence,
} from "framer-motion";
import { Settings, Languages, Search, Sun, Moon, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Library", href: "/library" },
  { name: "Recitation", href: "/recitation" },
  { name: "About", href: "/about" },
];

export function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;

    if (latest < previous || latest < 10) {
      setIsVisible(true);
    } else if (latest > previous && latest > 80) {
      setIsVisible(false);
      setIsMobileMenuOpen(false);
    }

    setIsScrolled(latest > 10);
    lastScrollY.current = latest;
  });

  // const toggleTheme = () => {
  //   setIsDarkMode(!isDarkMode);
  //   document.documentElement.classList.toggle("dark");
  // };

  // Subtle, smooth animations
  const navbarVariants: Variants = {
    visible: {
      y: 0,
      transition: {
        duration: 0.35,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    hidden: {
      y: -100,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const logoVariants: Variants = {
    initial: { opacity: 0, x: -20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const linkVariants: Variants = {
    initial: { opacity: 0, y: -10 },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.1 + index * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  const iconVariants: Variants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: (index: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        delay: 0.3 + index * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  const mobileMenuVariants: Variants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.05,
        delayChildren: 0.05,
      },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.25,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const mobileMenuItemVariants: Variants = {
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    closed: {
      opacity: 0,
      x: -16,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <>
      <motion.nav
        variants={navbarVariants}
        animate={isVisible ? "visible" : "hidden"}
        initial="visible"
        className={cn(
          "fixed top-0  left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? `${
                isScrolled && isMobileMenuOpen
                  ? "dark:bg-zinc-950/90"
                  : "dark:bg-zinc-950/30"
              } shadow-sm backdrop-blur-sm border-b border-zinc-200/50 dark:border-zinc-800/50`
            : `${
                isMobileMenuOpen ? "dark:bg-zinc-950/90" : "bg-transparent"
              }  backdrop-blur-[2px] shadow-none`
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo with subtle animation */}

            <a
              href="/"
              className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
            >
              Al-Hedayah
            </a>

            {/* Desktop Navigation with stagger animation */}
            {/* Desktop Navigation with smooth hover */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  custom={index}
                  variants={linkVariants}
                  initial="initial"
                  animate="animate"
                  onHoverStart={() => setHoveredLink(link.name)}
                  onHoverEnd={() => setHoveredLink(null)}
                >
                  <motion.a
                    href={link.href}
                    onClick={() => setActiveLink(link.href)}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium rounded-md transition-colors block",
                      activeLink === link.href
                        ? "text-zinc-900 dark:text-zinc-100"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                    )}
                    whileHover={{ y: -2 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                      mass: 0.5,
                    }}
                  >
                    {link.name}

                    {/* Active indicator with smooth animation */}
                    {activeLink === link.href && (
                      <motion.div
                        layoutId="activeLink"
                        className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800 rounded-md -z-10"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}

                    {/* Hover indicator */}
                    <AnimatePresence>
                      {hoveredLink === link.name &&
                        activeLink !== link.href && (
                          <motion.div
                            className="absolute inset-0 bg-zinc-50 dark:bg-zinc-900 rounded-md -z-10"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{
                              duration: 0.15,
                              ease: "easeOut",
                            }}
                          />
                        )}
                    </AnimatePresence>
                  </motion.a>
                </motion.div>
              ))}
            </div>
            {/* Desktop Icons with subtle animations */}
            <div className="hidden md:flex items-center space-x-1">
              {[
                { icon: Settings, label: "Settings", index: 0 },
                { icon: Languages, label: "Language", index: 1 },
                { icon: Search, label: "Search", index: 2 },
              ].map(({ icon: Icon, label, index }) => (
                <motion.div
                  key={label}
                  custom={index}
                  variants={iconVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}

              <motion.div
                className="w-px h-5 bg-zinc-200 dark:bg-zinc-800 mx-1"
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              />

              {/* <motion.div
                custom={3}
                variants={iconVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="h-9 w-9 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                  aria-label="Toggle theme"
                >
                  <AnimatePresence mode="wait">
                    {isDarkMode ? (
                      <motion.div
                        key="moon"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Moon className="h-4 w-4" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="sun"
                        initial={{ scale: 0, rotate: 180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: -180 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Sun className="h-4 w-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div> */}
            </div>

            {/* Mobile Menu Button with rotation */}
            <motion.div className="md:hidden" whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="h-9 w-9"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Menu with stagger animation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden overflow-hidden bg-white/95 dark:bg-zinc-950/95 backdrop-blur-sm border-t border-zinc-200/50 dark:border-zinc-800/50"
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <motion.div
                    key={link.name}
                    variants={mobileMenuItemVariants}
                    whileTap={{ scale: 0.98 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => {
                        setActiveLink(link.href);
                        setIsMobileMenuOpen(false);
                      }}
                      className={cn(
                        "block px-4 py-2.5 text-sm font-medium rounded-md transition-all",
                        activeLink === link.href
                          ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                          : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100"
                      )}
                    >
                      {link.name}
                    </a>
                  </motion.div>
                ))}

                <motion.div
                  className="h-px bg-zinc-200 dark:bg-zinc-800 my-2"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                />

                <motion.div
                  className="flex items-center justify-start gap-1 px-2"
                  variants={mobileMenuItemVariants}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-zinc-600 dark:text-zinc-400"
                    aria-label="Settings"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-zinc-600 dark:text-zinc-400"
                    aria-label="Language"
                  >
                    <Languages className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-zinc-600 dark:text-zinc-400"
                    aria-label="Search"
                  >
                    <Search className="h-4 w-4" />
                  </Button>

                  <div className="w-px h-5 bg-zinc-200 dark:bg-zinc-800 mx-1" />

                  {/* <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                    className="h-9 w-9 text-zinc-600 dark:text-zinc-400"
                    aria-label="Toggle theme"
                  >
                    <AnimatePresence mode="wait">
                      {isDarkMode ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          <Moon className="h-4 w-4" />
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          <Sun className="h-4 w-4" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button> */}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
