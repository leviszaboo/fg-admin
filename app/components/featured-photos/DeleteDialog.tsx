import { useState } from "react";
import { 
  deleteObject,
  ref
  } from "firebase/storage";

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
import { storage } from "@/app/firebase/config";

export default function DeleteDialog() {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { 
    isVerticalSelected,
    selectedForDeletion, 
    removeFromSelected, 
    setSelected
  } = useSelectImagesStore();

  const {
    removeHorizontalUrl,
    removeVerticalUrl
  } = useImageUrlStore()

  async function handleDelete() {
    try {
      setLoading(true);
      selectedForDeletion.forEach((item) => {
        const desertRef = ref(storage, item);
        console.log(item)
        deleteObject(desertRef);
        removeFromSelected(item);
        isVerticalSelected ? removeVerticalUrl(item) : removeHorizontalUrl(item)
      })
      setSelected(false)
      setDialogOpen(false);
    } catch(err) {
      console.log(err);
    }

    setLoading(false);
  }

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger>
          <Button size={"sm"} variant={"destructive"} disabled={selectedForDeletion.length <= 0}>
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
            <Button variant={"destructive"} onClick={handleDelete} disabled={loading}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}


