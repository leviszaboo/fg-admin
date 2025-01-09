import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "@/app/context/AuthContext";
import { Plus, GalleryHorizontalEnd } from "lucide-react";

import { db } from "@/app/firebase/config";
import {
  useFireStoreDocumentsStore,
  PostDocument,
} from "@/app/hooks/UseFireStoreDocuments";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ImageKitUpload from "../ImageKitUpload";

export interface PostDescription {
  title: string;
  subTitle: string;
  description: string;
}

export function AddDigitalPostDialog() {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [imageUrls, setImageUrls] = useState<string[]>([]); // For multiple images
  const [coverPhoto, setCoverPhoto] = useState<string | null>(null); // For cover photo URL

  const [postDescription, setPostDescription] = useState<PostDescription>({
    title: "",
    subTitle: "",
    description: "",
  });

  const { addPostDocument } = useFireStoreDocumentsStore();

  const auth = useAuth();
  const user = auth.currentUser;

  const postId = uuidv4();
  const basePath = `${user?.uid}/gallery/digital/${postId}`;

  function handleOpen() {
    setError("");
    setImageUrls([]);
    setCoverPhoto(null);
    setPostDescription({
      title: "",
      subTitle: "",
      description: "",
    });
  }

  function onChange(fieldName: keyof PostDescription, value: string) {
    setPostDescription((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  }

  const handleImageUploadSuccess = (response: any) => {
    const uploadedUrl = response.url;
    setImageUrls((prevUrls) => [...prevUrls, uploadedUrl]); // Append to the list
  };

  const handleCoverPhotoUploadSuccess = (response: any) => {
    const uploadedUrl = response.url;
    setCoverPhoto(uploadedUrl); // Set the cover photo URL
  };

  const handleImageUploadError = (err: any) => {
    console.error("ImageKit Upload Error:", err);
    setError("Image upload failed. Please try again.");
  };

  async function handleSubmit() {
    setError("");
    setLoading(true);

    try {
      if (imageUrls.length === 0 || !coverPhoto) {
        setError("Please upload at least one image and select a cover photo.");
        setLoading(false);
        return;
      }

      const { title, subTitle, description } = postDescription;

      const document: PostDocument = {
        id: postId,
        imageUrls, // List of images
        //coverPhoto, // Cover photo URL
        descriptionLayout: "",
        title,
        subTitle,
        description,
        destinationGallery: "digital",
        createdAt: new Date(),
      };

      await setDoc(
        doc(db, basePath),
        document
      );
      addPostDocument(document);
      setDialogOpen(false);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    }
    setLoading(false);
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger>
        <Button size={"sm"} onClick={handleOpen}>
          <Plus className="w-5 h-5" />
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
              <div className="">Create New Post</div>
            </div>
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex flex-col pt-2 pb-2">
          {error && (
            <div className="text-sm text-red-500 pb-3 font-semibold">
              {error}
            </div>
          )}
          <div className="grid grid-cols-2 w-full items-center gap-4">
            <Label
              htmlFor="pictures"
              className={`text-left ${error ? "text-red-500" : null}`}
            >
              Upload Images
            </Label>
            <ImageKitUpload
              folder={basePath}
              fileName={postDescription.title}
              onSuccessCb={handleImageUploadSuccess}
              onErrorCb={handleImageUploadError}
            />
          </div>
          <div className="grid grid-cols-2 w-full items-center gap-4 mt-4">
            <Label
              htmlFor="cover-photo"
              className={`text-left ${error ? "text-red-500" : null}`}
            >
              Upload Cover Photo
            </Label>
            <ImageKitUpload
              folder={basePath}
              fileName={`${postDescription.title}_cover`}
              onSuccessCb={handleCoverPhotoUploadSuccess}
              onErrorCb={handleImageUploadError}
            />
          </div>
          <Label htmlFor="pictures" className={`text-left py-4`}>
            Add Title
          </Label>
          <Input
            type="text"
            value={postDescription.title}
            onChange={(e) => onChange("title", e.target.value)}
          />
          <Label htmlFor="pictures" className={`text-left py-4`}>
            Add Subtitle
          </Label>
          <Input
            type="text"
            value={postDescription.subTitle}
            onChange={(e) => onChange("subTitle", e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button variant={"black"} disabled={loading} onClick={handleSubmit}>
            {!loading ? "Upload" : "Uploading..."}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
