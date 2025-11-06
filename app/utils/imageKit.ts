import { ImageKitResponse } from "../interfaces/imageKit";
import { upload } from "@imagekit/javascript";

const IMAGEKIT_PUBLIC_KEY = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!;

interface AuthCredentials {
  token: string;
  expire: number;
  signature: string;
}

export interface UploadProgress {
  currentFile: number;
  totalFiles: number;
  fileName: string;
  percentage: number;
}

export type ProgressCallback = (progress: UploadProgress) => void;

// Fetch auth credentials once for reuse across multiple uploads
async function getAuthCredentials(): Promise<AuthCredentials> {
  const authResponse = await fetch("/api/imagekit");
  return await authResponse.json();
}

// Single file upload using pre-fetched auth credentials
async function uploadSingleFile(
  file: File,
  fileName: string,
  folder: string,
  authCredentials: AuthCredentials,
  useUniqueFileName = true
): Promise<ImageKitResponse> {
  try {
    const payload = {
      file: file, // Direct file upload, no base64 encoding
      fileName,
      folder,
      useUniqueFileName,
      signature: authCredentials.signature,
      token: authCredentials.token,
      expire: authCredentials.expire,
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
    throw new Error(`File upload failed: ${fileName}`);
  }
}

// Batch upload with chunked parallelism and progress tracking
export const uploadBatch = async (
  files: File[],
  fileNames: string[],
  folder: string,
  onProgress?: ProgressCallback,
  useUniqueFileName = true,
  chunkSize = 4
): Promise<ImageKitResponse[]> => {
  if (files.length !== fileNames.length) {
    throw new Error("Files and fileNames arrays must have the same length");
  }

  // Fetch auth credentials in parallel for all uploads (each token is single-use)
  const authCredentialsPromises = files.map(() => getAuthCredentials());
  const authCredentialsArray = await Promise.all(authCredentialsPromises);

  const results: ImageKitResponse[] = [];
  const chunks: number[][] = [];

  // Split files into chunks for controlled parallel uploads
  for (let i = 0; i < files.length; i += chunkSize) {
    chunks.push(Array.from({ length: Math.min(chunkSize, files.length - i) }, (_, j) => i + j));
  }

  let completedFiles = 0;

  // Process chunks sequentially, but files within each chunk in parallel
  for (const chunk of chunks) {
    const chunkPromises = chunk.map(async (index) => {
      const file = files[index];
      const fileName = fileNames[index];
      const authCredentials = authCredentialsArray[index];

      if (onProgress) {
        onProgress({
          currentFile: completedFiles + 1,
          totalFiles: files.length,
          fileName,
          percentage: Math.round((completedFiles / files.length) * 100),
        });
      }

      const result = await uploadSingleFile(file, fileName, folder, authCredentials, useUniqueFileName);
      completedFiles++;

      if (onProgress) {
        onProgress({
          currentFile: completedFiles,
          totalFiles: files.length,
          fileName,
          percentage: Math.round((completedFiles / files.length) * 100),
        });
      }

      return result;
    });

    const chunkResults = await Promise.all(chunkPromises);
    results.push(...chunkResults);
  }

  return results;
};

// Legacy single file upload (kept for backwards compatibility)
export const uploadFile = async (file: File, fileName: string, folder: string, useUniqueFileName = true) => {
  const authCredentials = await getAuthCredentials();
  return uploadSingleFile(file, fileName, folder, authCredentials, useUniqueFileName);
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

  