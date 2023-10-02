import { useEffect, useState } from "react";
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
import useGalleryStore from "@/app/hooks/UseGallery";

import { 
  descriptionOptions, 
  imageNumberOptions,
  PostDescription
} from "./AddPostDialog";
import ComboBox from "../ComboBox";

import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

import { GalleryHorizontalEnd } from "lucide-react";

interface UpdatePostDialogProps {
  postId: string,
  dialogOpen: boolean,
  setDialogOpen(open: boolean): void
}

export default function UpdatePostDialog({ postId, dialogOpen, setDialogOpen }: UpdatePostDialogProps) {
  const auth = useAuth()
  const user = auth.currentUser

  const { postDocuments, removePostDocument } = useFireStoreDocumentsStore()

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("")
  const [imageUpload, setImageUpload] = useState<FileList | null>(null);
  const [descriptionLayoutValue, setdescriptionLayoutValue] = useState<string>("");
  const [imageCount, setImageCount] = useState<number>(0);

  const [postDescription, setPostDescription] = useState<PostDescription>({
    title: "",
    subTitle: "",
    description: "",
  });

  function onChange(fieldName: keyof PostDescription, value: string) {
    setPostDescription((prevState) => ({
      ...prevState,
      [fieldName]: value
    }))
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    setImageUpload(event.target.files);
  }

  useEffect(() => {
    const document = postDocuments.find((doc) => doc.id === postId);
    console.log(document)
    if (document) {
      setdescriptionLayoutValue(document.descriptionLayout || "");
      setImageCount(document.imageUrls.length || 0);
      setPostDescription({
        title: document.title || "",
        subTitle: document.subTitle || "",
        description: document.description || "",
      });
    }
  }, [postId, postDocuments]);

  async function handleUpdate() {
    try {
      setLoading(true);
      setError("");
      
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
              Update Post
            </div>
          </div>
        </DialogTitle>
      </DialogHeader>
      <div className="flex flex-col pt-2 pb-2">
        {error && <div className="text-sm text-red-500 pb-3 font-semibold">{error}</div>}
        <div className="grid grid-cols-2 w-full items-center gap-4">
          <Label htmlFor="pictures" className={`text-left ${error ? "text-red-500" : null}`}>
            How many pictures to display?
          </Label>
          <div className="ml-auto mr-auto">
            <ComboBox optionsList={imageNumberOptions} autoSelect={imageCount !== 0} autoSelectIndex={imageCount - 1}/>
          </div>
          <Label htmlFor="pictures" className={`text-left ${error ? "text-red-500" : null}`}>
            Description on which side?
          </Label>
          <div className="ml-auto mr-auto">
            <ComboBox 
              optionsList={descriptionOptions} 
              autoSelect={descriptionLayoutValue === "left" || descriptionLayoutValue === "right"} 
              autoSelectIndex={descriptionOptions.findIndex((option) => option.value === descriptionLayoutValue)}
            />
          </div>
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
        <Label htmlFor="pictures" className={`text-left py-4`}>
          Add Title
        </Label>
        <Input 
          type="text" 
          value={postDescription.title}
          onChange={(e) => onChange('title', e.target.value)}
        />
        <Label htmlFor="pictures" className={`text-left py-4`}>
          Add Subtitle
        </Label>
        <Input 
          type="text" 
          value={postDescription.subTitle }
          onChange={(e) => onChange('subTitle', e.target.value)}
        />
        <Label htmlFor="pictures" className={`text-left py-4`}>
          Add Description
        </Label>
        <Textarea
          value={postDescription.description}
          onChange={(e) => onChange('description', e.target.value)}
        />
      </div>
      <DialogFooter>
        <Button variant={"black"} disabled={loading} onClick={handleUpdate}>{!loading ? "Upload" : "Uploading..."}</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}