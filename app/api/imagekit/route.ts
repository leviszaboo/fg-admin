import { NextResponse } from "next/server";
import ImageKit from "imagekit";

const IMAGEKIT_PRIVATE_KEY = process.env.IMAGEKIT_PRIVATE_KEY!;
const IMAGEKIT_URL_ENDPOINT = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!;
const IMAGEKIT_PUBLIC_KEY = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!;

export async function GET(req: Request) {
  try {
    const imagekit = new ImageKit({
      publicKey: IMAGEKIT_PUBLIC_KEY,
      privateKey: IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: IMAGEKIT_URL_ENDPOINT,
    });

    const { token, expire, signature } = imagekit.getAuthenticationParameters();

    return NextResponse.json(
      { token, expire, signature },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("ImageKit Authentication Error:", error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

  
