import React from "react";

export const SimpleTextFeatures = () => {
  return (
    <div className="max-w-3xl mx-auto">
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
  );
};
