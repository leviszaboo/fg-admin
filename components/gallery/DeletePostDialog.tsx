import { useState } from "react";
import { deleteObject, ref } from "firebase/storage";
import { doc, deleteDoc } from "firebase/firestore";

import { useFireStoreDocumentsStore } from "@/app/hooks/UseFireStoreDocuments";
import { storage, db } from "@/app/firebase/config";
import { useAuth } from "@/app/context/AuthContext";
import DeleteDialog from "../DeleteDialog";
import useGalleryStore from "@/app/hooks/UseGallery";
import { DialogProps } from "@/app/interfaces/dialogProps";

export default function DeletePostDialog({
  id,
  dialogOpen,
  setDialogOpen,
}: DialogProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { isAnalogSelected } = useGalleryStore();
  const { postDocuments, removePostDocument } = useFireStoreDocumentsStore();

  const auth = useAuth();
  const user = auth.currentUser;

  async function handleDelete() {
    try {
      setLoading(true);
      setError("");
      const document = postDocuments.find((doc) => doc.id === id);
      console.log(id, document);

      if (document) {
        const path = `${user?.email}/gallery/${isAnalogSelected ? "analog" : "digital"}/${document.id}`;

        const deletePromises = document.imageUrls.map(async (_, index) => {
          const imagePath = path + `_${index}`;
          const desertRef = ref(storage, imagePath);
          await deleteObject(desertRef);
        });

        await Promise.all(deletePromises);

        await deleteDoc(doc(db, path));
        removePostDocument(document);
      } else {
        setError("Document not found.");
      }
      setDialogOpen(false);
    } catch (err) {
      console.log(err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <DeleteDialog
      loading={loading}
      error={error}
      handleDelete={handleDelete}
      dialogOpen={dialogOpen}
      setDialogOpen={setDialogOpen}
    />
  );
}
