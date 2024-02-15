import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";

import { useFireStoreDocumentsStore } from "@/app/hooks/UseFireStoreDocuments";
import { db } from "@/app/firebase/config";
import { useAuth } from "@/app/context/AuthContext";
import DeleteDialog from "../../DeleteDialog";
import { DialogProps } from "@/app/interfaces/dialogProps";

export default function DeleteParagraphDialog({
  id,
  dialogOpen,
  setDialogOpen,
}: DialogProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { paragraphDocuments, removeParagraphDocument } =
    useFireStoreDocumentsStore();

  const auth = useAuth();
  const user = auth.currentUser;

  async function handleDelete() {
    try {
      setLoading(true);
      setError("");
      const document = paragraphDocuments.find((doc) => doc.id === id);

      if (document) {
        const path = `${user?.uid}/about-me/paragraphs/${document.id}`;

        await deleteDoc(doc(db, path));
        removeParagraphDocument(document);
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
