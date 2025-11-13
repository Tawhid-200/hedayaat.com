import { NextRequest } from "next/server";
import { Language, QuranClient } from "@quranjs/api";

export const quran = new QuranClient({
  clientId: process.env.QURAN_CLIENT_ID!,
  clientSecret: process.env.QURAN_CLIENT_SECRET!,
  defaults: {
    language: Language.ENGLISH,
  },
});

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    if (slug === "chapters") {
      return Response.json(await quran.chapters.findAll());
    }
    return Response.json({ error: "Invalid resource." }, { status: 404 });
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
