"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const SearchBar = () => {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <div className="max-w-2xl mx-auto">
      <div
        className={`
                relative transition-all duration-300 ease-out
                ${searchFocused ? "scale-[1.02]" : "scale-100"}
              `}
      >
        {/* Glow effect on focus */}
        <div
          className={`
                  absolute -inset-1 bg-linear-to-r from-zinc-600/20 via-zinc-500/20 to-zinc-600/20 
                  rounded-lg blur-xl transition-opacity duration-300
                  ${searchFocused ? "opacity-100" : "opacity-0"}
                `}
        />

        <div className="relative flex items-center">
          <Search
            className={`
                    absolute left-4 max-sm:left-3 w-5 h-5 max-sm:w-4 max-sm:h-4 
                    transition-all duration-300
                    ${searchFocused ? "text-zinc-300" : "text-zinc-500"}
                  `}
          />
          <Input
            type="text"
            placeholder="Search Surahs, verses, or topics..."
            className="
                    w-full pl-12 max-sm:pl-10 pr-4 h-14 max-sm:h-12
                    bg-zinc-900/50
                    border-zinc-800/50
                    hover:border-zinc-700/50
                    focus-visible:border-zinc-600/50
                    text-zinc-200 placeholder:text-zinc-600
                    transition-all duration-300
                    text-base max-sm:text-sm
                  "
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>

        {/* Bottom shine effect */}
        <div
          className={`
                  absolute -bottom-px left-1/2 -translate-x-1/2 h-px
                  bg-linear-to-r from-transparent via-zinc-500 to-transparent
                  transition-all duration-500
                  ${searchFocused ? "w-full opacity-100" : "w-0 opacity-0"}
                `}
        />
      </div>

      {/* Search hints */}
      <div
        className={`
                mt-3 text-xs text-zinc-600 transition-all duration-300
                ${
                  searchFocused
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2"
                }
              `}
      >
        <span className="max-sm:hidden">
          Try: "Al-Fatiha", "Patience", or "Ayat al-Kursi"
        </span>
        <span className="sm:hidden">Try: "Al-Fatiha" or "Patience"</span>
      </div>
    </div>
  );
};
