import { useState } from "react";
import { deleteObject, ref } from "firebase/storage";
import { doc, deleteDoc } from "firebase/firestore";
import { storage, db } from "@/app/firebase/config";
import { FeaturedDocument, PostDocument } from "./UseFireStoreDocuments";

export default function useDeleteHandler() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  async function handleDelete({
    selectedImages,
    getFirestorePath,
    getStoragePath,
    removeDocument,
    removeUrl,
    removeFromSelected,
    document
  }: {
    selectedImages: string[],
    getFirestorePath: (name: string) => string,
    getStoragePath: (item: string, index?: number) => string,
    removeDocument: (doc: any) => void,
    removeUrl: (item: string) => void,
    removeFromSelected: (item: string) => void,
    document?: FeaturedDocument | PostDocument,
  }) {
    try {
      setLoading(true);
      setError("");

      const deletePromises = selectedImages.map(async (item) => {
        const desertRef = ref(storage, getStoragePath(item));
        const name = desertRef.fullPath.split("/").pop(); 

        try {
          await deleteObject(desertRef);
        } catch (err) {
          console.warn("Failed to delete object:", desertRef);
        }

        const path = getFirestorePath(name || "");
        try {
          await deleteDoc(doc(db, path));
          document ? removeDocument(document) : removeDocument({ name });
        } catch (err) {
          setError("Failed to delete document.");
        }

        removeFromSelected(item);
        removeUrl(item);
      });

      await Promise.all(deletePromises);
    } catch (err) {
      console.log(err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, handleDelete };
}
