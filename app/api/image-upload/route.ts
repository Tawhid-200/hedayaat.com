import { NextRequest, NextResponse } from "next/server";
import ImageKit from "imagekit";

const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData();
    const file = body.get("file") as File | null;

    if (!file) {
      return new Response(JSON.stringify({ erros: "File not Found" }), {
        status: 400,
      });
    }

    const buffer = await file?.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    if (!base64)
      return new Response(
        JSON.stringify({ error: "File unable to convert base64" })
      );

    const uploadImage = await imageKit.upload({
      file: base64,
      fileName: file.name,
      folder: "/uploads",
    });

    return Response.json({ url: uploadImage.url }, { status: 200 });
  } catch (error: any) {
    console.error("Upload error:", error);
    return new Response(
      JSON.stringify({ error: `${error.message} Failed to upload file` }),
      {
        status: 500,
      }
    );
  }
}
