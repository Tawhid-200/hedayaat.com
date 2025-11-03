"use client";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { HeroSection } from "@/components/layouts/Hero";

export default function Home() {
  // useEffect(() => {
  //   const getBlogInfo = async () => {
  //     const res = await fetch(
  //       `/api/blogs/c0667659-7de2-4ff3-92d5-88ddef64c137`
  //     );
  //     const data = await res.json();
  //     console.log(data.blog);
  //   };
  //   getBlogInfo();
  // }, []);

  return (
    <main className="p-0 relative">
      <HeroSection />
      <div className="relative bg-white dark:bg-zinc-950">
        {/* Additional sections */}
      </div>
    </main>
  );
}
