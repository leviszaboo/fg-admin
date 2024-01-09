import { useEffect, useState } from "react";
import { 
  doc, 
  updateDoc
} from "firebase/firestore";

import { useFireStoreDocumentsStore } from "@/app/hooks/UseFireStoreDocuments";
import { db } from "@/app/firebase/config";
import { useAuth } from "@/app/context/AuthContext";

import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";

import { GalleryHorizontalEnd } from "lucide-react";
import { DialogProps } from "@/app/interfaces/dialogProps";

export default function UpdateParagraphDialog({ id, dialogOpen, setDialogOpen }: DialogProps) {
  const auth = useAuth();
  const user = auth.currentUser;

  const { paragraphDocuments, updateParagraph } = useFireStoreDocumentsStore();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [paragraph, setParagraph] = useState<string>("");


  useEffect(() => {
    const document = paragraphDocuments.find((doc) => doc.id === id);
    if (document) {
      setParagraph(document.value || "")
    }
  }, [id, paragraphDocuments]);

  async function handleUpdate() {
    setLoading(true);
    setError("");
    try {
      const document = paragraphDocuments.find((doc) => doc.id === id);
      if (document) {
        const path = `${user?.email}/about-me/paragraphs/${document.id}`
        const ref = doc(db, path);
        await updateDoc(ref, {
          value: paragraph,
        })

        updateParagraph(id, paragraph);
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
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
    <DialogContent className="w-96">
      <DialogHeader>
        <DialogTitle>
          <div className="flex h-6 pb-1 items-end">
            <div>
              <GalleryHorizontalEnd className="h-5 w-5 mr-2" />
            </div>
            <div className="">
              Update Description
            </div>
          </div>
        </DialogTitle>
      </DialogHeader>
      <div className="flex flex-col pt-2 pb-2">
        {error && <div className="text-sm text-red-500 pb-3 font-semibold">{error}</div>}
        <Textarea
          value={paragraph}
          onChange={(e) => setParagraph(e.target.value)}
        />
      </div>
      <DialogFooter>
        <Button variant={"black"} disabled={loading} onClick={handleUpdate}>{!loading ? "Update Post" : "Updating..."}</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}