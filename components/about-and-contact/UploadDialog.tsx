import { useState } from "react";

import { Plus, ImagePlus } from "lucide-react";

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
import { Input } from "@/components/ui/input";

import useSelectImagesStore from "@/app/hooks/UseSelectImages";
import {
  useFireStoreDocumentsStore,
} from "@/app/hooks/UseFireStoreDocuments";
import { useAuth } from "@/app/context/AuthContext";
import { createFeaturedPhotos } from "@/app/utils/featuredPhotos";

export default function UploadDialog() {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);

  const auth = useAuth();
  const user = auth.currentUser;

  const { isSelected } = useSelectImagesStore();
  const { addFeaturedDocument } = useFireStoreDocumentsStore();

  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
  }

  function handleOpen() {
    if (isSelected) return;
    setError("");
    setFiles([]);
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  }

  async function uploadImage() {
    setLoading(true);
    setError("");

    if (files.length === 0) { 
      setError("Please select the files to upload.");
      setLoading(false);

      return;
    }

    try {
      const type = "about-me"
      const basePath = `${user?.uid}/featured/${type}`;

      await createFeaturedPhotos({ basePath, files, type });

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
        <div
          className="border-2 border-lightbrown rounded-lg h-80 cursor-pointer flex flex-column items-center content-center justify-center text-center"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleOpen}
        >
          <Plus
            className="w-6 h-6 svg-transition"
            color={isHovered ? "grey" : "#a8a29e"}
          />
        </div>
      </DialogTrigger>
      <DialogContent className="w-96">
        <DialogHeader>
          <DialogTitle>
            <div className="flex h-6 pb-1 items-end">
              <div>
                <ImagePlus className="h-5 w-5 mr-2" />
              </div>
              <div className="">Select photos to upload</div>
            </div>
          </DialogTitle>
          <DialogDescription>
            Select the photos to be featured on the About Me page.
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
          <Button variant={"black"} onClick={uploadImage} disabled={loading}>
            {!loading ? "Upload" : "Uploading..."}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
