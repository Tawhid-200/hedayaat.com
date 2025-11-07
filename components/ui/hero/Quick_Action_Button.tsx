import React from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Headphones, Bookmark } from "lucide-react";

export const QuickActionButton = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 max-sm:gap-2 ">
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
  );
};
