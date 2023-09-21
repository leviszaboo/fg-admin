import { useState } from "react";

import { 
  ref, 
  uploadBytes, 
  getDownloadURL,
} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { Plus, ImagePlus, GalleryHorizontalEnd } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import ComboBox from "../ComboBox";
import { Textarea } from "@/components/ui/textarea";

const comboBoxOptions = [
  {
    value: "1",
    label: "1",
  },
  {
    value: "2",
    label: "2",
  },
]


const descriptionOptions = [
  {
    value: "left",
    label: "Left",
  },
  {
    value: "left",
    label: "Left",
  },
]

export default function AddPostDialog() {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [imageUpload, setImageUpload] = useState<FileList | null>(null)

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    setImageUpload(event.target.files);
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger>
          <Button size={"sm"}>
            <Plus className="w-5 h-5"/>
            <div className="pl-1">Add Post</div>
          </Button>
      </DialogTrigger>
      <DialogContent className="w-96">
        <DialogHeader>
          <DialogTitle>
            <div className="flex h-6 pb-1 items-end">
              <div>
                <GalleryHorizontalEnd className="h-5 w-5 mr-2" />
              </div>
              <div className="">
                Create New Post
              </div>
            </div>
          </DialogTitle>
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col pt-2 pb-2">
          {error && <div className="text-sm text-red-500 p-1">{error}</div>}
          <div className="grid grid-cols-2 w-full items-center gap-2">
            <Label htmlFor="pictures" className={`text-left ${error ? "text-red-500" : null}`}>
              How many pictures to display?
            </Label>
            <ComboBox optionsList={comboBoxOptions}/>
            <Label htmlFor="pictures" className={`text-left ${error ? "text-red-500" : null}`}>
              Description on which side?
            </Label>
            <ComboBox optionsList={descriptionOptions} />
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
          <Label htmlFor="pictures" className={`text-left ${error ? "text-red-500" : null} py-4`}>
            Add Title
          </Label>
          <Input 
            type="text" 
          />
          <Label htmlFor="pictures" className={`text-left ${error ? "text-red-500" : null} py-4`}>
            Add Subtitle
          </Label>
          <Input 
            type="text" 
          />
          <Label htmlFor="pictures" className={`text-left ${error ? "text-red-500" : null} py-4`}>
            Add Description
          </Label>
          <Textarea
          />
        </div>
        <DialogFooter>
          <Button variant={"black"} disabled={loading}>{!loading ? "Upload" : "Uploading..."}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}