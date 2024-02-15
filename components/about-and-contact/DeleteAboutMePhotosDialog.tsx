import { useState } from "react";
import { deleteObject, ref } from "firebase/storage";
import { doc, deleteDoc } from "firebase/firestore";

import { Button } from "@/components/ui/button";

import useSelectImagesStore from "@/app/hooks/UseSelectImages";
import useImageUrlStore from "@/app/hooks/UseImageUrl";
import { useFireStoreDocumentsStore } from "@/app/hooks/UseFireStoreDocuments";
import { storage, db } from "@/app/firebase/config";
import { useAuth } from "@/app/context/AuthContext";
import DeleteDialog from "../DeleteDialog";

export default function DeleteAboutMePhotosDialog() {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const auth = useAuth();
  const user = auth.currentUser;

  const { selectedImages, removeFromSelected, setSelected } =
    useSelectImagesStore();

  const { removeAboutMeUrl } = useImageUrlStore();

  const { featuredDocuments, removeFeaturedDocument } =
    useFireStoreDocumentsStore();

  async function handleDelete() {
    try {
      setLoading(true);
      const deletePromises = selectedImages.map(async (item) => {
        const desertRef = ref(storage, item);
        const splitPath = desertRef.fullPath.split("/");
        const name = splitPath[splitPath.length - 1];
        await deleteObject(desertRef);

        const document = featuredDocuments.find((doc) => doc.name === name);

        if (document) {
          const path = `${user?.uid}/featured/about-me/${document.id}`;

          await deleteDoc(doc(db, path));

          removeFeaturedDocument(document);
        } else {
          setError("Document not found.");
        }

        removeFromSelected(item);
        removeAboutMeUrl(item);
      });

      await Promise.all(deletePromises);

      setSelected(false);
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
    >
      <Button
        size={"sm"}
        variant={"destructive"}
        disabled={selectedImages.length <= 0}
      >
        Delete
      </Button>
    </DeleteDialog>
  );
}
