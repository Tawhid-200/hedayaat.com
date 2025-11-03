import { NextRequest } from "next/server";
import { db } from "@/db/drizzle";
import { content, contentInfo } from "@/db/content-schema";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";

const contentInfo_fakeData: typeof contentInfo.$inferInsert = {
  authorId: randomUUID(),
  authorName: "tawhid",
  title: "This is backend testing data",
  thumbnail:
    "https://i.pinimg.com/736x/5d/fb/2c/5dfb2c2d27934c1a675e7b4a5f1d5f9b.jpg",
};

export async function POST(req: NextRequest) {
  const body = await req.formData();
  const dataString = body.get("blocks") as string;
  const data = JSON.parse(dataString);

  const [info] = await db
    .insert(contentInfo)
    .values(contentInfo_fakeData)
    .returning({ id: contentInfo.id });

  await db.insert(content).values({
    contentId: info.id,
    blocks: data,
  });

  const [inserted_content] = await db
    .select()
    .from(content)
    .where(eq(content.contentId, info.id));

  return Response.json({ data: inserted_content.blocks }, { status: 200 });
}
