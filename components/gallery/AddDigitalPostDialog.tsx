import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "@/app/context/AuthContext";
import { Plus, GalleryHorizontalEnd } from "lucide-react";
import { uploadFile } from "@/app/utils/imageKit";
import { PostDescription } from "@/app/interfaces/gallery";
import { PostDocument } from "@/app/interfaces/documents";

import { db } from "@/app/firebase/config";
import {
  useFireStoreDocumentsStore,
} from "@/app/hooks/UseFireStoreDocuments";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AddDigitalPostDialog() {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [coverFile, setCoverFile] = useState<File | null>(null);

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
    setFiles([]);
    setCoverFile(null);
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleCoverFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setCoverFile(event.target.files[0]);
    }
  };

  async function handleSubmit() {
    setError("");
    setLoading(true);

    try {
      if (files.length === 0 || !coverFile) {
        setError("Please upload at least one image and a cover photo.");
        setLoading(false);
        return;
      }

      const imageUploadPromises = files.map((file, i) => 
        uploadFile(file, `${postId}_${i}`, basePath)
      );

      const result = await Promise.all(imageUploadPromises);
      const imageUrls = result.map((file) => file.url);
      const fileIds = result.map((file) => file.fileId);

      const coverPhoto = await uploadFile(
        coverFile,
        `${postDescription.title}_cover`,
        basePath
      );

      const { title, subTitle, description } = postDescription;

      const document: PostDocument = {
        id: postId,
        imageUrls,
        fileIds,
        coverPhoto: coverPhoto.url,
        descriptionLayout: "",
        title,
        subTitle,
        description,
        destinationGallery: "digital",
        createdAt: new Date(),
      };

      await setDoc(doc(db, basePath), document);
      addPostDocument(document);
      setDialogOpen(false);
    } catch (err) {
      console.error("Error creating post:", err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
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
              <GalleryHorizontalEnd className="h-5 w-5 mr-2" />
              <div>Create New Post</div>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col pt-2 pb-2">
          {error && <div className="text-sm text-red-500 pb-3">{error}</div>}
          <Label>Upload Images</Label>
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="mt-2"
          />
          <Label className="mt-4">Upload Cover Photo</Label>
          <Input 
            type="file" 
            accept="image/*"
            onChange={handleCoverFileChange} 
            className="mt-2" 
          />
          <Label className="mt-4">Add Title</Label>
          <Input
            className="mt-2"
            type="text"
            value={postDescription.title}
            onChange={(e) => onChange("title", e.target.value)}
          />
          <Label className="mt-4">Add Subtitle</Label>
          <Input
            className="mt-2"
            type="text"
            value={postDescription.subTitle}
            onChange={(e) => onChange("subTitle", e.target.value)}
          />
          <Label className="mt-4">Add Description</Label>
          <Input
            className="mt-2"
            type="text"
            value={postDescription.description}
            onChange={(e) => onChange("description", e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button disabled={loading} onClick={handleSubmit}>
            {!loading ? "Upload" : "Uploading..."}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
