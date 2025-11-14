"use cache";

import { cacheLife } from "next/cache";
import { SurahCard } from "../ui/surahlist/Surah_Card";
import { Language, QuranClient } from "@quranjs/api";

export const quran = new QuranClient({
  clientId: process.env.QURAN_CLIENT_ID!,
  clientSecret: process.env.QURAN_CLIENT_SECRET!,
  defaults: {
    language: Language.ENGLISH,
  },
});

export const SurahList = async () => {
  cacheLife("yearly");
  const data = await quran.chapters.findAll();
  console.log(data);
  return <div className="w-full lg:p-8 p-0">{<SurahCard surahs={data} />}</div>;
};
