import React, { Suspense } from "react";
import { HeroSection } from "@/components/layouts/Hero";
import { SurahList } from "@/components/layouts/SurahList";

export default function Home() {
  return (
    <>
      <HeroSection />
      <main className="p-0">
        <Suspense fallback={<div>Loading...</div>}>
          <SurahList />
        </Suspense>
      </main>
    </>
  );
}
