"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { quranAyahs } from "@/jsons/hero_text_quran_ayah.json";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, BookOpen, Headphones, Bookmark, Sparkles } from "lucide-react";

interface quranAyahProps {
  ayah: string;
  translation: string;
  ref: string;
}

export function HeroSection() {
  const [heroText, setHeroText] = useState<quranAyahProps>();
  const [isLoading, setIsLoading] = useState(true);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    // Simulate loading delay for smooth animation
    const timer = setTimeout(() => {
      const rdm = Math.floor(Math.random() * quranAyahs.length);
      setHeroText(quranAyahs[rdm]);
      setIsLoading(false);
    }, 1000); // 1 second delay for skeleton

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#353b48e0_5%,#000_100%)] max-sm:bg-[radial-gradient(circle_at_top,#353b48e0_-30%,#000_100%)] overflow-hidden -z-10 smooth-fade w-full" />

      {/* Animated background elements */}
      <div className="overflow-hidden bg-animation -z-10">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <div id="stars4"></div>
      </div>

      {/* Floating badges - Top corners */}
      <div className="absolute top-16 right-8 max-sm:right-4 max-sm:top-4 z-20 animate-in fade-in slide-in-from-right duration-700 delay-150">
        <Badge
          variant="outline"
          className="bg-zinc-900/40 backdrop-blur-md border-zinc-800/50 px-4 py-2 max-sm:px-3 max-sm:py-1.5 text-zinc-400 hover:bg-zinc-900/60 transition-colors"
        >
          <Sparkles className="w-3 h-3 text-amber-400 mr-2" />
          <span className="text-xs max-sm:text-[10px]">Verse of the Day</span>
        </Badge>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <div className="text-center max-w-6xl mx-auto mt-16 max-sm:mt-8 w-full space-y-8 max-sm:space-y-6">
          {/* Brand Tagline */}
          <div className="animate-in fade-in zoom-in duration-500">
            <Badge
              variant="secondary"
              className="bg-zinc-900/30 backdrop-blur-sm border-zinc-800/30 hover:bg-zinc-900/50 transition-colors"
            >
              <BookOpen className="w-4 h-4 max-sm:w-3 max-sm:h-3 mr-2 text-zinc-500" />
              <span className="text-sm max-sm:text-xs uppercase tracking-wider text-zinc-500">
                Experience the Divine Word
              </span>
            </Badge>
          </div>

          {/* Reference - with skeleton */}
          <div className="animate-in fade-in mb-4 slide-in-from-bottom duration-400 delay-100">
            {isLoading ? (
              <Skeleton className="h-5 w-32 max-sm:w-24 mx-auto bg-zinc-800/50" />
            ) : (
              <p className="text-zinc-500 text-base max-sm:text-sm uppercase tracking-[0.2em] font-medium animate-in fade-in slide-in-from-bottom duration-500">
                {heroText?.ref}
              </p>
            )}
          </div>

          {/* Main Ayah - with skeleton */}
          <div className="animate-in fade-in slide-in-from-bottom duration-700 delay-200">
            {
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold px-4 animate-in fade-in zoom-in duration-700">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-zinc-200 to-zinc-400 leading-[1.4]">
                  {heroText?.ayah}
                </span>
              </h1>
            }
          </div>

          {/* Translation - with skeleton */}
          <div className="animate-in fade-in slide-in-from-bottom duration-700 delay-300">
            {
              <p className="text-sm md:text-base lg:text-lg text-zinc-400 max-w-3xl mx-auto leading-relaxed font-light px-4 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
                {heroText?.translation}
              </p>
            }
          </div>

          {/* Animated Search Bar */}
          <div className="max-w-2xl mx-auto animate-in fade-in zoom-in duration-500 delay-500">
            <div
              className={`
                relative transition-all duration-300 ease-out
                ${searchFocused ? "scale-[1.02]" : "scale-100"}
              `}
            >
              {/* Glow effect on focus */}
              <div
                className={`
                  absolute -inset-1 bg-gradient-to-r from-zinc-600/20 via-zinc-500/20 to-zinc-600/20 
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
                  bg-gradient-to-r from-transparent via-zinc-500 to-transparent
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

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 max-sm:gap-2 animate-in fade-in zoom-in duration-500 delay-700">
            <Button
              variant="outline"
              size="lg"
              className="
                bg-zinc-900/50 backdrop-blur-sm border-zinc-800/50 
                hover:bg-zinc-800/50 hover:border-zinc-700/50
                text-zinc-300 
                max-sm:text-xs max-sm:h-9
                transition-all duration-300
                group
              "
            >
              <BookOpen className="w-4 h-4 max-sm:w-3 max-sm:h-3 mr-2 group-hover:scale-110 transition-transform" />
              Continue Reading
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="
                bg-zinc-900/50 backdrop-blur-sm border-zinc-800/50 
                hover:bg-zinc-800/50 hover:border-zinc-700/50
                text-zinc-300 
                max-sm:text-xs max-sm:h-9
                transition-all duration-300
                group
              "
            >
              <Headphones className="w-4 h-4 max-sm:w-3 max-sm:h-3 mr-2 group-hover:scale-110 transition-transform" />
              Listen Now
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="
                bg-zinc-900/50 backdrop-blur-sm border-zinc-800/50 
                hover:bg-zinc-800/50 hover:border-zinc-700/50
                text-zinc-300 
                max-sm:text-xs max-sm:h-9
                transition-all duration-300
                group
              "
            >
              <Bookmark className="w-4 h-4 max-sm:w-3 max-sm:h-3 mr-2 group-hover:scale-110 transition-transform" />
              Bookmarks
            </Button>
          </div>

          {/* Simple Text Features */}
          <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom duration-500 delay-[800ms]">
            <div className="flex flex-wrap items-center justify-center gap-6 max-sm:gap-4 text-zinc-500 text-sm max-sm:text-xs">
              <span className="hover:text-zinc-300 transition-colors cursor-default">
                40+ Languages
              </span>
              <span className="text-zinc-700">•</span>
              <span className="hover:text-zinc-300 transition-colors cursor-default">
                20+ Reciters
              </span>
              <span className="text-zinc-700">•</span>
              <span className="hover:text-zinc-300 transition-colors cursor-default max-sm:hidden">
                24/7 Access
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
