import { useState } from "react";

import { doc, setDoc } from "firebase/firestore";
import { PencilLine } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { useAuth } from "@/app/context/AuthContext";
import { db } from "@/app/firebase/config";
import { Textarea } from "../../ui/textarea";
import {
  ParagraphDocument,
  useFireStoreDocumentsStore,
} from "@/app/hooks/UseFireStoreDocuments";

export default function AddParagraphDialog() {
  const [paragraph, setParagraph] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { addParagraphDocument } = useFireStoreDocumentsStore();

  const auth = useAuth();
  const user = auth.currentUser;

  async function addParagraph() {
    setLoading(true);
    setError("");

    try {
      const paragraphId = uuidv4();

      const document: ParagraphDocument = {
        id: paragraphId,
        value: paragraph,
        createdAt: new Date(),
      };

      await setDoc(
        doc(db, `${user?.email}/about-me/paragraphs/${paragraphId}`),
        document
      );
      addParagraphDocument(document);
      setDialogOpen(false);
    } catch (err) {
      setError("Something went wrong. Try again.");
      console.log(err);
    }

    setLoading(false);
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger>
        <Button className="w-full mt-auto self-end">Add Paragraph</Button>
      </DialogTrigger>
      <DialogContent className="w-96">
        <DialogHeader>
          <DialogTitle>
            <div className="flex h-6 pb-1 items-end">
              <div>
                <PencilLine className="h-5 w-5 mr-2" />
              </div>
              <div className="">Add Paragraph</div>
            </div>
          </DialogTitle>
          <DialogDescription>
            Create a paragraph for the About me page.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col pt-2 pb-2">
          {error && <div className="text-sm text-red-500 p-1">{error}</div>}
          <div className="grid w-full items-center gap-1.5">
            <Textarea onChange={(e) => setParagraph(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button variant={"black"} onClick={addParagraph} disabled={loading}>
            {!loading ? "Upload" : "Uploading..."}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
