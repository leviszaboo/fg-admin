import { useState } from "react";

import { 
  ref, 
  uploadBytes, 
  getDownloadURL,
} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { Plus, ImagePlus } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';

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
import { Input } from "@/components/ui/input";

import useImageUrlStore from "@/app/hooks/UseImageUrl";
import useSelectImagesStore from "@/app/hooks/UseSelectImages";
import useFireStoreDocumentsStore from "@/app/hooks/UseFireStoreDocuments";
import { useAuth } from "@/app/context/AuthContext";
import { storage, db } from "@/app/firebase/config";

export default function UploadDialog() {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [imageUpload, setImageUpload] = useState<FileList | null>(null)

  const auth = useAuth();
  const user = auth.currentUser

  const { 
    isSelected, 
    isVerticalSelected,
  } = useSelectImagesStore()

  const {
    addHorizontalUrl,
    addVerticalUrl
  } = useImageUrlStore()

  const {
    addDocument
  } = useFireStoreDocumentsStore()

  function handleMouseEnter() {
    setIsHovered(true);
  };

  function handleMouseLeave() {
    setIsHovered(false);
  };

  function handleOpen() {
    if (isSelected) return;
    setError("");
    setImageUpload(null);
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    setImageUpload(event.target.files);
  }

  async function uploadImage() {
    setLoading(true);
    setError("");

    if (!imageUpload) {
      setError("Please select the files to upload.");
      setLoading(false);
      return
    };

    try {
      for (let i = 0; i < imageUpload.length; i++) {
        const imageRef = ref(storage, `${user?.email}/featured/${isVerticalSelected ? "vertical" : "horizontal"}/${imageUpload[i].name}`);

        const snapshot = await uploadBytes(imageRef, imageUpload[i]);
        const url = await getDownloadURL(snapshot.ref);
    
        if (isVerticalSelected) {
          addVerticalUrl(url);
        } else {
          addHorizontalUrl(url);
        }

        const documentId = uuidv4();
        const document = {
          id: documentId,
          name: `${imageUpload[i].name}`,
          url: url,
          createdAt: new Date()
        }
        await setDoc(doc(db, `${user?.email}/featured/${isVerticalSelected ? "vertical" : "horizontal"}/${documentId}`), document);
        addDocument(document);
      }

      setDialogOpen(false);
    } catch(err) {
      setError("Something went wrong. Try again.")
      console.log(err);
    }

    setLoading(false);
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger>
        <div className={`border-2 border-lightbrown rounded-lg ${isVerticalSelected ? "h-80" : "h-44"} cursor-pointer flex flex-column items-center content-center justify-center text-center`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleOpen}
        >
          <Plus className="w-6 h-6 svg-transition" color={isHovered ? 'grey' : '#a8a29e'}/>
        </div>
      </DialogTrigger>
      <DialogContent className="w-96">
        <DialogHeader>
          <DialogTitle>
            <div className="flex h-6 pb-1 items-end">
              <div>
                <ImagePlus className="h-5 w-5 mr-2" />
              </div>
              <div className="">
                Select photos to upload
              </div>
            </div>
          </DialogTitle>
          <DialogDescription>
            {`Select the photos to be featured on the homepage of your website on ${isVerticalSelected ? "small-screen" : "large-screen"} devices.`}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col pt-2 pb-2">
          {error && <div className="text-sm text-red-500 p-1">{error}</div>}
          <div className="grid w-full items-center gap-1.5">
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
          <Button variant={"black"} onClick={uploadImage} disabled={loading}>Upload</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
