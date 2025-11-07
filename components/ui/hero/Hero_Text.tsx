import React, { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { quranAyahs } from "@/jsons/hero_text_quran_ayah.json";
import { useParams } from "next/navigation";

interface quranAyahProps {
  ayah: string;
  translation: string;
  ref: string;
  random: number;
}

export const HeroText = ({ onLoaded }: { onLoaded: () => void }) => {
  const [QuranAyah, setQuranAyah] = useState<quranAyahProps>({
    ayah: "",
    translation: "",
    ref: "",
    random: 0,
  });
  const randomNumberRef = useRef<number>(0);
  const params = useParams();
  const t = useTranslations("hero");

  useEffect(() => {
    if (!quranAyahs || quranAyahs.length == 0) return;
    if (randomNumberRef.current === 0) {
      const randomNumber = Math.floor(Math.random() * quranAyahs.length);
      randomNumberRef.current = randomNumber; // Store it in the ref
    }
    const selectQuranAyah = quranAyahs[randomNumberRef.current];
    setQuranAyah({
      ayah: selectQuranAyah.ayah,
      translation: selectQuranAyah.translation,
      ref: selectQuranAyah.ref,
      random: randomNumberRef.current,
    });
    onLoaded();
    console.log("Current locale:", params.locale);
  }, [params.locale]);

  if (!QuranAyah) return null;

  const { ayah, translation, ref, random } = QuranAyah;
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      {/* Reference */}

      <p className="text-zinc-500 text-base max-sm:text-sm uppercase tracking-[0.2em] font-medium">
        {ref}
      </p>

      {/* Main Ayah */}

      <h1 className="text-xl smooth-fade sm:text-2xl md:text-3xl lg:text-4xl">
        <span className="bg-clip-text text-transparent bg-linear-to-b from-white via-zinc-200 to-zinc-400 leading-[1.4]">
          {ayah}
        </span>
      </h1>

      {/* Translation */}
      <p className="text-sm md:text-base lg:text-lg text-zinc-400 max-w-3xl mx-auto leading-relaxed font-light px-4">
        {params.locale === "ar"
          ? null
          : params.locale === "en"
          ? translation
          : t(`text_${random + 1}`)}
      </p>
    </div>
  );
};
