import { useState } from "react";
import { 
  deleteObject,
  ref
  } from "firebase/storage";
import { 
  doc, 
  deleteDoc 
} from "firebase/firestore";

import { useFireStoreDocumentsStore } from "@/app/hooks/UseFireStoreDocuments";
import { storage, db } from "@/app/firebase/config";
import { useAuth } from "@/app/context/AuthContext";
import DeleteDialog from "../DeleteDialog";
import useGalleryStore from "@/app/hooks/UseGallery";

interface DeltePostDialogProps {
  postId: string,
  dialogOpen: boolean,
  setDialogOpen(open: boolean): void
}

export default function DeletePostDialog({ postId, dialogOpen, setDialogOpen }: DeltePostDialogProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("")

  const { isAnalogSelected } = useGalleryStore()
  const { postDocuments, removePostDocument } = useFireStoreDocumentsStore()

  const auth = useAuth()
  const user = auth.currentUser

 
  async function handleDelete() {
    try {
      setLoading(true);
      setError("");
      const document = postDocuments.find((doc) => doc.id === postId);
      console.log(postId, document)

      if (document) {
        const path = `${user?.email}/gallery/${isAnalogSelected ? "analog" : "digital"}/${document.id}`

        const deletePromises = document.imageUrls.map(async (_, index) => {
          const imagePath = path + `_${index}`
          const desertRef = ref(storage, imagePath);
          await deleteObject(desertRef);
        });
          
        await Promise.all(deletePromises);

        await deleteDoc(doc(db, path));
        removePostDocument(document);
      } else {
        setError("Document not found.")
      }
      setDialogOpen(false);
    } catch (err) {
      console.log(err);
      setError("Something went wrong.")
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <DeleteDialog loading={loading} error={error} handleDelete={handleDelete} dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
  )
}