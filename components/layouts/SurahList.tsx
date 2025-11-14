"use cache";

import { cacheLife } from "next/cache";
import { SurahCard } from "../ui/surahlist/Surah_Card";

export const SurahList = async () => {
  cacheLife("yearly");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL || ""}/api/quran/chapters`
  );
  const data = await res.json();
  console.log(data);
  return <div className="w-full lg:p-8 p-0">{<SurahCard surahs={data} />}</div>;
};
