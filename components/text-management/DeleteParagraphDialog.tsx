import { useState } from "react";
import { 
  doc, 
  deleteDoc 
} from "firebase/firestore";

import { useFireStoreDocumentsStore } from "@/app/hooks/UseFireStoreDocuments";
import { db } from "@/app/firebase/config";
import { useAuth } from "@/app/context/AuthContext";
import DeleteDialog from "../DeleteDialog";

interface DeleteParagraphDialogProps {
  paragraphId: string,
  dialogOpen: boolean,
  setDialogOpen(open: boolean): void
}

export default function DeleteParagraphDialog({ paragraphId, dialogOpen, setDialogOpen }: DeleteParagraphDialogProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("")

  const { paragraphDocuments, removeParagraphDocument } = useFireStoreDocumentsStore()

  const auth = useAuth();
  const user = auth.currentUser;

 
  async function handleDelete() {
    try {
      setLoading(true);
      setError("");
      const document = paragraphDocuments.find((doc) => doc.id === paragraphId);

      if (document) {
        const path = `${user?.email}/about-me/paragraphs/${document.id}`

        await deleteDoc(doc(db, path));
        removeParagraphDocument(document);
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