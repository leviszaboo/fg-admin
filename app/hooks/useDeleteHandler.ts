import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { deleteFile } from "../utils/imageKit";
import { FsDocument } from "../interfaces/documents";

export default function useDeleteHandler() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  async function handleDelete<T extends FsDocument>({
    fileIds,
    documentIds,
    fsPath,
    remover,
    removeFromSelected,
  }: {
    fileIds: string[],
    documentIds: string[],
    fsPath: string,
    remover: (id: string) => void,
    removeFromSelected: (doc: T) => void,
  }) {
    try {
      setLoading(true);
      setError("");

      const ikDeletePromises = fileIds.map(async (item) => {
        try {
          await deleteFile(item);
        } catch (err) {
          console.warn("Failed to delete object:", item); 
        }
      });

      await Promise.all(ikDeletePromises);

      const fsDeletePromises = documentIds.map(async (id) => {
        await deleteDoc(doc(db, `${fsPath}/${id}`));

        remover(id);
        removeFromSelected({ id } as T);
      });

      await Promise.all(fsDeletePromises);
    } catch (err) {
      console.log(err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, handleDelete };
}
