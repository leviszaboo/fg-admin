import { NextResponse } from "next/server";
import ImageKit from "imagekit";

const IMAGEKIT_PRIVATE_KEY = process.env.IMAGEKIT_PRIVATE_KEY!;
const IMAGEKIT_URL_ENDPOINT = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!;
const IMAGEKIT_PUBLIC_KEY = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!;

export async function POST(req: Request) {
  try {
    const body = await req.json(); 
    const { file, fileName, folder } = body;

    if (!file || !fileName || !folder) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const payload = {
      file, 
      fileName,
      folder,
      useUniqueFileName: true,
    };

    const imagekit = new ImageKit({
      publicKey: IMAGEKIT_PUBLIC_KEY,
      privateKey: IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: IMAGEKIT_URL_ENDPOINT,
    });

    const response = await imagekit.upload(payload);

    console.log(response);

      if (!response) {
        return NextResponse.json(
          { message: "ImageKit upload failed" },
          { status: 500 }
        );
      }
  
      return NextResponse.json(response, { status: 200 });
    } catch (error: any) {
      console.error("ImageKit Upload Error:", error);
      return NextResponse.json(
        { message: error.message || "Internal Server Error" },
        { status: 500 }
      );
    }
  }
  
