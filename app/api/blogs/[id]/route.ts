import { NextRequest } from "next/server";
import { db } from "@/db/drizzle";
import { content } from "@/db/content-schema";
import { eq } from "drizzle-orm";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const [blog] = await db
    .select()
    .from(content)
    .where(eq(content.contentId, id));
  return Response.json(
    {
      blog: blog.blocks,
    },
    { status: 200 }
  );
}
