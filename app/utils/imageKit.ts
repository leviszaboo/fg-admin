import { ImageKitResponse } from "../interfaces/imageKit";

function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }
  
export const uploadFile = async (file: File, fileName: string, folder: string) => {
  const fileBase64 = await fileToBase64(file);
  const payload = { file: fileBase64, fileName, folder };

  const response = await fetch("/api/imagekit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("File upload failed");
  }

  const data = await response.json();
  
  return {
    url: data.url,
    fileId: data.fileId,
  } as ImageKitResponse;
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

  