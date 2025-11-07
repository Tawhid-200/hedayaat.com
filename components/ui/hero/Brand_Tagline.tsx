import React from "react";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";

export const BrandTagline = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <Badge
        variant="secondary"
        className="bg-zinc-900/30 backdrop-blur-sm border-zinc-800/30 hover:bg-zinc-900/50 transition-colors"
      >
        <BookOpen className="w-4 h-4 max-sm:w-3 max-sm:h-3 mr-2 text-zinc-500" />
        <span className="text-sm max-sm:text-xs uppercase tracking-wider text-zinc-500">
          {children}
        </span>
      </Badge>
    </div>
  );
};
