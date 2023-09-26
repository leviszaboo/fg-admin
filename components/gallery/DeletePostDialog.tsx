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
import useDeletePostDialogStore from "@/app/hooks/UseDeletePostDialog";
import useGalleryStore from "@/app/hooks/UseGallery";

interface DeltePostDialogProps {
  postId: string
}

export default function DeletePostDialog({ postId }: DeltePostDialogProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("")

  const { isAnalogSelected } = useGalleryStore()
  const { dialogOpen, setDialogOpen } = useDeletePostDialogStore()
  const { postDocuments, removePostDocument } = useFireStoreDocumentsStore()

  const auth = useAuth()
  const user = auth.currentUser

 
  async function handleDelete() {
    try {
      setLoading(true);
      setError("");
      const document = postDocuments.find((doc) => doc.id === postId);

      if (document) {
        //needs work
        const deletePromises = document.imageUrls.map(async (item) => {
          const desertRef = ref(storage, item);
          await deleteObject(desertRef);
        });
          
        await Promise.all(deletePromises);

        await deleteDoc(doc(db, `${user?.email}/gallery/${isAnalogSelected ? "analog" : "digital"}/${document.id}`));
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