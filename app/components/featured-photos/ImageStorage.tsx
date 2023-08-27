import { useEffect, useState } from "react";
import { 
  ref, 
  uploadBytes, 
  getDownloadURL,
  listAll,
  StorageReference,
} from "firebase/storage";
import {v4 as uuidv4} from 'uuid';

import ImageFrame from "./ImageFrame";
import selectFeaturedStore from "@/app/hooks/selectFeatured";
import { storage } from "@/app/firebase/firebase";
import { useAuth } from "@/app/utils/AuthContext";

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

import { Plus, ImagePlus } from "lucide-react";
import selectImagesStore from "@/app/hooks/selectImages";

export default function ImageStorage() {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [imageUpload, setImageUpload] = useState<FileList | null>(null)
  const [verticalUrls, setVerticalUrls] = useState<string[]>([]);
  const [horizontalUrls, setHorizontalUrls] = useState<string[]>([]);

  const { isVerticalSelected } = selectFeaturedStore();
  const { isSelected } = selectImagesStore();
  const auth = useAuth();
  const user = auth.currentUser
  const verticalListRef = ref(storage, `${user?.email}/featured/vertical/`);
  const horizontalListRef = ref(storage, `${user?.email}/featured/horizontal/`);

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
  
        await uploadBytes(imageRef, imageUpload[i]).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            isVerticalSelected ? setVerticalUrls((prev) => [...prev, url]) : setHorizontalUrls((prev) => [...prev, url]);
          });
        });
      }
      setDialogOpen(false);
    } catch(err) {
      setError("Something went wrong. Try again.")
      console.log(err);
    }

    setLoading(false);
  }

  async function fetchImageUrls(listRef: StorageReference, setterFunction: (urls: string[]) => void) { 
    try {
      const res = await listAll(listRef)
      
      const urlPromises = res.items.map(async (item) => {
        const url = await getDownloadURL(item);
        return url;
      });

      const imageUrls = await Promise.all(urlPromises);
      setterFunction(imageUrls);
    } catch (error) {
      console.error("Error fetching image URLs:", error);
    }
  }

  useEffect(() => {
    fetchImageUrls(verticalListRef, setVerticalUrls);
    fetchImageUrls(horizontalListRef, setHorizontalUrls)
  }, [])

  return (
    <>
      <div className="relative h-11/12 overflow-y-scroll rounded-3xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
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
          {isVerticalSelected ? (
            verticalUrls.map((url, index) => (
              <ImageFrame url={url} key={index}/>
            ))
          ) : (
            horizontalUrls.map((url, index) => (
              <ImageFrame url={url} key={index}/>
            ))
          )}
        </div>
      </div>
    </>
  )
}