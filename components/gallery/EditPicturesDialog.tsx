import { useEffect, useState } from "react";
import { 
  doc, 
  updateDoc
} from "firebase/firestore";

import { useFireStoreDocumentsStore } from "@/app/hooks/UseFireStoreDocuments";
import { db, storage } from "@/app/firebase/config";
import { useAuth } from "@/app/context/AuthContext";
import useGalleryStore from "@/app/hooks/UseGallery";

import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

import { GalleryHorizontalEnd } from "lucide-react";
import { EditPicturesDialogProps } from "@/app/interfaces/dialogProps";
import imageCompression from "browser-image-compression";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function EditPicturesDialog({ id, urls, dialogOpen, setDialogOpen }: EditPicturesDialogProps) {
  const auth = useAuth();
  const user = auth.currentUser;

  const { postDocuments, updatePostDocumentFields } = useFireStoreDocumentsStore();
  const { isAnalogSelected } = useGalleryStore();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [imageUpload, setImageUpload] = useState<FileList | null>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    setImageUpload(event.target.files);
  }

  useEffect(() => {
    const document = postDocuments.find((doc) => doc.id === id);
    if (document) {
     
    }
  }, [id, postDocuments]);

  async function handleUpdate() {
    setLoading(true);
    setError("");
    try {
      if (imageUpload && imageUpload.length === urls.length) {
        const options = {
          maxSizeMB: 0.6,
          maxWidthOrHeight: 1920,
        }
        const newUrls = []
        for (let i = 0; i < imageUpload.length; i++) {
          const compressedFile = await imageCompression(imageUpload[i], options);
          const imageRef = ref(storage, `${user?.email}/gallery/${isAnalogSelected ? "analog" : "digital"}/${id}_${i}`);
          const snapshot = await uploadBytes(imageRef, compressedFile);
          const url = await getDownloadURL(snapshot.ref);
          newUrls.push(url)
        }
        await updateDoc(doc(db, `${user?.email}/gallery/${isAnalogSelected ? "analog" : "digital"}/${id}`), {
          imageUrls: newUrls
        });
        updatePostDocumentFields(id, {
          imageUrls: newUrls
        });
        setDialogOpen(false);
      } else {
        setError("Please upload the same number of images as the original post.");
      }
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
              Edit Pictures
            </div>
          </div>
        </DialogTitle>
      </DialogHeader>
      <div className="flex flex-col pt-2 pb-2 gap-3">
        {error && <div className="text-sm text-red-500 pb-3 font-semibold">{error}</div>}
        <div className="flex align-center justify-center gap-6">
          {imageUpload && Array.from(imageUpload).map((file) => <img key={file.name} className={`${imageUpload.length > 1 ? "w-1/3" : "w-2/3"} rounded-xl outline outline-2 outline-amber-400 outline-offset-1`} src={URL.createObjectURL(file)}></img>)}
          {(!imageUpload || imageUpload.length === 0) && urls.map(url => <img key={url} className={`${urls.length > 1 ? "w-1/3" : "w-2/3"} rounded-xl outline outline-2 outline-amber-400 outline-offset-1`} src={url}></img>)}
        </div>
        <div className="flex flex-col pt-4 pb-4 gap-3 w-10/12 self-center">
          <Label htmlFor="pictures" className={`text-left ${error ? "text-red-500" : null}`}>
            Upload Image(s)
          </Label>
          <Input 
            className="hover:cursor-pointer" 
            id="picture" 
            type="file" 
            accept="image/*" 
            multiple
            onChange={handleFileChange}
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant={"black"} disabled={loading} onClick={handleUpdate}>{!loading ? "Update Post" : "Updating..."}</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}