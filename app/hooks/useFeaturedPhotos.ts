import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useSelectImagesStore from "./UseSelectImages";
import { FeaturedDocument } from "../interfaces/documents";
import { uploadFile } from "../utils/imageKit";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useFireStoreDocumentsStore } from "./UseFireStoreDocuments";

export default function useFeaturedPhotos() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { addFeaturedDocument } = useFireStoreDocumentsStore();

  async function createFeaturedPhotos({ files, basePath, type, setDialogOpen }: {
    files: File[];
    basePath: string;
    type: "vertical" | "horizontal" | "about-me";
    setDialogOpen: (open: boolean) => void;
  }
  ) {
    setLoading(true);
    setError("");

    if (files.length === 0) {
      setError("Please select the files to upload.");
      setLoading(false);
      return;
    }

    try {
    const uploadPromises = files.map((file) =>
        uploadFile(file, file.name, basePath)
    );

    const res = await Promise.all(uploadPromises);

    const documentPromises = res.map(async (item) => {
        const documentId = uuidv4();
        const document: FeaturedDocument = {
            id: documentId,
            name: `${item.name}`,
            fileId: item.fileId,
            url: item.url,
            type,
            createdAt: new Date(),
        };
        await setDoc(
            doc(
                db,
                `${basePath}/${documentId}`,
            ),
            document,
        );
        addFeaturedDocument(document);
    });

    await Promise.all(documentPromises);

      setDialogOpen(false);
    } catch (err) {
      setError("Something went wrong. Try again.");
      console.log(err);
    }

    setLoading(false);
  }

  return {
    loading,
    error,
    setError,
    createFeaturedPhotos
  };
}