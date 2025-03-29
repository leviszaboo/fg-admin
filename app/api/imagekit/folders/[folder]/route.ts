import { NextResponse } from "next/server";
import ImageKit from "imagekit";

const IMAGEKIT_PRIVATE_KEY = process.env.IMAGEKIT_PRIVATE_KEY!;
const IMAGEKIT_URL_ENDPOINT = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!;
const IMAGEKIT_PUBLIC_KEY = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!;

export async function DELETE(req: Request, props: { params: Promise<{ folder: string }> }) {
  const params = await props.params;
  try {
    const folder = decodeURIComponent(params.folder); 

    if (!folder) {
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

    await imagekit.deleteFolder(folder); 

    return NextResponse.json({ message: "Folder deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("ImageKit Delete Error:", error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}