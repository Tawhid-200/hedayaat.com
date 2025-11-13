"use client";
import React, { useRef } from "react";
import { MagicCard } from "@/components/ui/magic-card";
import { AnimatedCircularProgressBar } from "@/components/ui/animated-circular-progress-bar";
import { Card, CardTitle, CardDescription } from "../card";
import { BookOpenIcon, BookOpenIconHandle } from "../../icons/BookOpenIcon";
import { MapPinIcon, MapPinIconHandle } from "../../icons/MapPinIcon";

type Surah = {
  id: number;
  nameSimple: string;
  translatedName: { name: string };
  versesCount: number;
  revelationPlace: string;
};

export const SurahCard = ({ surahs }: { surahs: Surah[] }) => {
  if (!surahs?.length) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-4 gap-0">
      {surahs.map((surah) => (
        <SurahCardItem key={surah.id} surah={surah} />
      ))}
    </div>
  );
};

const SurahCardItem = ({ surah }: { surah: Surah }) => {
  const bookRef = useRef<BookOpenIconHandle>(null);
  const pinRef = useRef<MapPinIconHandle>(null);

  return (
    <Card
      className="p-0 overflow-hidden cursor-pointer group lg:rounded-xl max-md:border-none rounded-none"
      onMouseEnter={() => {
        bookRef.current?.startAnimation();
        pinRef.current?.startAnimation();
      }}
    >
      <MagicCard
        gradientSize={150}
        gradientOpacity={0.9}
        className="w-full min-h-fit p-4 overflow-hidden "
      >
        <h1
          aria-hidden="true"
          className="font-surah pointer-events-none select-none absolute inset-0 z-0 flex items-center justify-end -right-2 text-[7rem] text-muted"
        >
          {`surah${String(surah.id).padStart(3, "0")}`}
        </h1>

        <div className="relative z-10 w-full flex items-center justify-between">
          <div className="flex items-center justify-start gap-2">
            <AnimatedCircularProgressBar
              value={0}
              max={100}
              text={surah.id}
              gaugePrimaryColor="rgb(255,255,255)"
              gaugeSecondaryColor="rgb(23,23,23)"
              className="w-10 h-10 text-sm"
            />
            <div>
              <CardTitle className="leading-7">{surah.nameSimple}</CardTitle>
              <CardDescription>{surah.translatedName.name}</CardDescription>
            </div>
          </div>

          <div className="flex items-center justify-end flex-col">
            <CardDescription className="flex items-center justify-center gap-2 leading-7">
              <BookOpenIcon size={15} ref={bookRef} duration={1} />
              {surah.versesCount} Ayah
            </CardDescription>
            <CardDescription className="flex items-center justify-center gap-2">
              <MapPinIcon size={15} ref={pinRef} duration={1} />
              {surah.revelationPlace}
            </CardDescription>
          </div>
        </div>
      </MagicCard>
    </Card>
  );
};
