import { useState } from "react";
import { 
  deleteObject,
  ref
  } from "firebase/storage";
import { 
  doc, 
  deleteDoc 
} from "firebase/firestore";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

import useSelectImagesStore from "@/app/hooks/UseSelectImages";
import useImageUrlStore from "@/app/hooks/UseImageUrl";
import useFireStoreDocumentsStore from "@/app/hooks/UseFireStoreDocuments";
import { storage, db } from "@/app/firebase/config";
import { useAuth } from "@/app/context/AuthContext";

export default function DeleteDialog() {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const auth = useAuth()
  const user = auth.currentUser

  const { 
    isVerticalSelected,
    selectedImages, 
    removeFromSelected, 
    setSelected
  } = useSelectImagesStore();

  const {
    removeHorizontalUrl,
    removeVerticalUrl
  } = useImageUrlStore()

  const {
    documents,
    removeDocument
  } = useFireStoreDocumentsStore()

  async function handleDelete() {
    try {
      setLoading(true);
      const deletePromises = selectedImages.map(async (item) => {
        const desertRef = ref(storage, item);
        const splitPath = desertRef.fullPath.split('/')
        const name = splitPath[splitPath.length - 1]
        await deleteObject(desertRef);
        console.log(name)
  
        const document = documents.find((doc) => doc.name === name);
        console.log(documents, document)
        if (document) {
          await deleteDoc(doc(db, `${user?.email}/featured/${isVerticalSelected ? "vertical" : "horizontal"}/${document.id}`));
          removeDocument(document);
        }
        
        removeFromSelected(item);
        isVerticalSelected ? removeVerticalUrl(item) : removeHorizontalUrl(item);
      });
  
      await Promise.all(deletePromises);
  
      setSelected(false);
      setDialogOpen(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger>
        <Button size={"sm"} variant={"destructive"} disabled={selectedImages.length <= 0}>
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="w-96">
        <DialogHeader>
          <DialogTitle>
            <div className="flex h-6 pb-1 items-end">
              <div>
                <Trash2 className="h-5 w-5 mr-2" />
              </div>
              <div className="">
                Are you sure you want to delete?
              </div>
            </div>
          </DialogTitle>
          <DialogDescription>
            This action will permanently delete all selected images from your gallery.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant={"destructive"} onClick={handleDelete} disabled={loading}>{!loading ? "Delete" : "Deleting..."}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


