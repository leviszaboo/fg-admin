"use client";
import React, { useRef } from "react";
import { ImageKitProvider, IKImage, IKUpload } from "imagekitio-next";
import { Input } from "./ui/input";

const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
const authenticator = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/upload-auth");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (err: any) {
    throw new Error(`Authentication request failed: ${err.message}`);
  }
};

const onError = (err: any) => {
  console.log("Error", err);
};

const onSuccess = (res: any) => {
  console.log("Success", res);
};

export default function ImageKitUpload({ 
  fileName,
  folder = "",
  onErrorCb = onError,
  onSuccessCb = onSuccess,
}: { 
  fileName: string;
  folder?: string;
  onErrorCb?: (err: any) => void;
  onSuccessCb?: (res: any) => void;
}) {
  //const ikUploadRef = useRef<typeof IKUpload>(null);
  
  return (
    <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
      <IKUpload 
        fileName={fileName} 
        onError={onErrorCb} 
        onSuccess={onSuccessCb} 
        useUniqueFileName={true}
        folder={folder}
        //style={{display: 'none'}} // hide the default input and use the custom upload button
        //ref={ikUploadRef}
        type="file"
        accept="image/*"
      />
    </ImageKitProvider>
  );
}
