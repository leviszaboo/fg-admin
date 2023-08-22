import { useEffect, useState } from "react";
import { 
  ref, 
  uploadBytes, 
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";

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

export default function ImageStorage() {
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("")
  const [imageUpload, setImageUpload] = useState<FileList | null>(null)
  const [verticalUrls, setVerticalUrls] = useState<string[]>([]);
  const [horizontalUrls, setHorizontalUrls] = useState<string[]>([]);

  const { isVerticalSelected } = selectFeaturedStore();
  const auth = useAuth();
  const user = auth.currentUser
  const imagesListRef = ref(storage, `${user?.email}/featured/${isVerticalSelected ? "vertical" : "horizontal"}/`);

  function handleMouseEnter() {
    setIsHovered(true);
  };

  function handleMouseLeave() {
    setIsHovered(false);
  };

  function handleOpen() {
    setError("");
    setImageUpload(null);
    setSuccessMessage("");
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    setImageUpload(event.target.files);
  }

  async function uploadImage() {
    setLoading(true);
    setError("");
    setSuccessMessage("");

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
      setImageUpload(null);
      setSuccessMessage("Upload successful.")
    } catch(err) {
      setError("Something went wrong. Try again.")
      console.log(err);
    }
    setLoading(false);
  }

  useEffect(() => {
    setHorizontalUrls([]);
    setVerticalUrls([])
    listAll(imagesListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          console.log(url)
          isVerticalSelected ? setVerticalUrls((prev) => [...prev, url]) : setHorizontalUrls((prev) => [...prev, url]);
          console.log(verticalUrls)
        });
      });
    });
  }, [isVerticalSelected]);

  return (
    <>
      <div className="relative h-11/12 overflow-y-scroll rounded-3xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
          <Dialog>
            <DialogTrigger>
              <div className={`border-2 border-lightbrown rounded-lg ${isVerticalSelected ? "h-80" : "h-44"} flex flex-column items-center content-center justify-center text-center`}
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
                {successMessage && <div className="text-sm text-green-500 p-1">{successMessage}</div>}
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
                <Button onClick={uploadImage} disabled={loading}>Upload</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          {isVerticalSelected ? (
            verticalUrls.map((url, index) => (
              <div key={index} className="border-2 border-lightbrown rounded-lg h-80 flex flex-column overflow-hidden items-center content-center justify-center text-center">
                <img className="h-full w-auto -z-50" src={url}/>
              </div>
            ))
          ) : (
            horizontalUrls.map((url, index) => (
              <div key={index} className="border-2 border-lightbrown rounded-lg h-44 flex flex-column overflow-hidden items-center content-center justify-center text-center">
                <img className="h-full w-auto -z-50" src={url}/>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}