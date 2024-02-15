import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Plus, GalleryHorizontalEnd } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

import { db, storage } from "@/app/firebase/config";
import { useAuth } from "@/app/context/AuthContext";
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
import imageCompression from "browser-image-compression";
import { imageUploadOptions as options } from "@/app/config/imageUploadOptions";

export interface PostDescription {
  title: string;
  subTitle: string;
  description: string;
}

export function AddDigitalPostDialog() {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [imageUpload, setImageUpload] = useState<FileList | null>(null);

  const [postDescription, setPostDescription] = useState<PostDescription>({
    title: "",
    subTitle: "",
    description: "",
  });

  const { addPostDocument } = useFireStoreDocumentsStore();

  const auth = useAuth();
  const user = auth.currentUser;

  function handleOpen() {
    setError("");
    setImageUpload(null);
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

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    setImageUpload(event.target.files);
  }

  async function handleSubmit() {
    setError("");
    setLoading(true);

    try {
      if (!imageUpload || imageUpload.length !== 1) {
        setError(
          "Some required elements are missing. Check if you uploaded the correct number of images.",
        );
        setLoading(false);

        return;
      }

      const { title, subTitle, description } = postDescription;

      const postId = uuidv4();
      const urls = [];

      for (let i = 0; i < imageUpload.length; i++) {
        const compressedFile = await imageCompression(imageUpload[i], options);

        const imageRef = ref(
          storage,
          `${user?.uid}/gallery/digital/${postId}_${i}`,
        );
        const snapshot = await uploadBytes(imageRef, compressedFile);
        const url = await getDownloadURL(snapshot.ref);
        urls.push(url);
      }

      const document: PostDocument = {
        id: postId,
        imageUrls: urls,
        descriptionLayout: "",
        title,
        subTitle,
        description,
        destinationGallery: "digital",
        createdAt: new Date(),
      };

      await setDoc(
        doc(db, `${user?.uid}/gallery/digital/${postId}`),
        document,
      );
      addPostDocument(document);
      setDialogOpen(false);
    } catch (err) {
      console.log(err);
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
              Upload Image(s)
            </Label>
            <Input
              className="hover:cursor-pointer"
              id="picture"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
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
