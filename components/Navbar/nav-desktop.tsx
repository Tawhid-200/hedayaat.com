"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, NAV_ACTIONS } from "./constants";

export const NavDesktop = () => {
  return (
    <>
      {/* Middle: Navigation Links */}
      <ul className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm  tracking-wide text-foreground/80 hover:text-primary transition-colors duration-300 relative group"
            >
              {link.label}
              {/* Subtle underline animation */}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          </li>
        ))}
      </ul>

      {/* Right: Action Buttons */}
      <div className="hidden md:flex items-center gap-2">
        {NAV_ACTIONS.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
            aria-label={item.label}
          >
            <item.icon className="w-5 h-5" />
          </Button>
        ))}
      </div>
    </>
  );
};
