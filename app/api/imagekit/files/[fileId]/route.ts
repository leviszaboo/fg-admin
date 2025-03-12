import { NextResponse } from "next/server";
import ImageKit from "imagekit";

const IMAGEKIT_PRIVATE_KEY = process.env.IMAGEKIT_PRIVATE_KEY!;
const IMAGEKIT_URL_ENDPOINT = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!;
const IMAGEKIT_PUBLIC_KEY = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!;

export async function DELETE(req: Request, { params }: { params: Promise<{ fileId: string }>}) {
  try {
    const { fileId } = await params;

    if (!fileId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const imagekit = new ImageKit({
      publicKey: IMAGEKIT_PUBLIC_KEY,
      privateKey: IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: IMAGEKIT_URL_ENDPOINT,
    });

    const response = await imagekit.deleteFile(fileId);

    if (!response) {
      return NextResponse.json(
        { message: "ImageKit delete failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ status: 200 });
  } catch (error: any) {
    console.error("ImageKit Delete Error:", error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
  