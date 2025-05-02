import { ImageKitResponse } from "../interfaces/imageKit";
import { upload } from "@imagekit/javascript";

const IMAGEKIT_PUBLIC_KEY = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!;

function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }
  
export const uploadFile = async (file: File, fileName: string, folder: string, useUniqueFileName = true) => {
  const fileBase64 = await fileToBase64(file);

  try {
    const authResponse = await fetch("/api/imagekit");
    const { token, expire, signature } = await authResponse.json();

    const payload = {
      file: fileBase64, 
      fileName, 
      folder, 
      useUniqueFileName,
      signature,
      token,
      expire,
      publicKey: IMAGEKIT_PUBLIC_KEY,
    };
    const response = await upload(payload);
    
    if (!response) {
      throw new Error("File upload failed");
    }
    
    return {
      url: response.url,
      fileId: response.fileId,
    } as ImageKitResponse;
  } catch (error) {
    console.error("ImageKit Upload Error:", error);

    throw new Error("File upload failed");
  }
};

export const deleteFile = async (fileId: string) => {
  const response = await fetch(`/api/imagekit/files/${fileId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("File deletion failed");
  }
}

export const deleteFolder = async (folder: string) => {
  const encodedFolder = encodeURIComponent(folder);
  
  const response = await fetch(`/api/imagekit/folders/${encodedFolder}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Folder deletion failed");
  }
}

  