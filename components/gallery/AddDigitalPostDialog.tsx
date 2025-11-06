import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "@/app/context/AuthContext";
import { Plus, GalleryHorizontalEnd } from "lucide-react";
import { uploadFile, uploadBatch, UploadProgress } from "@/app/utils/imageKit";
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
import { resizeImageIfNeeded, getAspectRatio } from "@/app/utils/resizeImage";

export function AddDigitalPostDialog() {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [imageAspectRatios, setImageAspectRatios] = useState<number[]>([]);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null);
  const [uploadStage, setUploadStage] = useState<string>("");

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
    setUploadProgress(null);
    setUploadStage("");
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

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);

      const resizedImages = await Promise.all(
        filesArray.map((file) => resizeImageIfNeeded(file))
      );

      const aspectRatios = await Promise.all(resizedImages.map((image) => getAspectRatio(image)));

      setFiles(resizedImages);
      setImageAspectRatios(aspectRatios);
    }
  } 

  const handleCoverFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const resizedCover = await resizeImageIfNeeded(event.target.files[0]);


      setCoverFile(resizedCover);
    }
  };

  async function handleSubmit() {
    setError("");
    setLoading(true);
    setUploadProgress(null);

    try {
      if (files.length === 0 || !coverFile) {
        setError("Please upload at least one image and a cover photo.");
        setLoading(false);
        return;
      }

      // Upload gallery images with progress tracking
      setUploadStage("Uploading gallery images...");
      const fileNames = files.map((_, i) => `${postId}_${i}`);

      const result = await uploadBatch(
        files,
        fileNames,
        basePath,
        (progress) => {
          setUploadProgress(progress);
        }
      );

      const imageUrls = result.map((file) => file.url);
      const fileIds = result.map((file) => file.fileId);

      // Upload cover photo
      setUploadStage("Uploading cover photo...");
      setUploadProgress(null);

      const coverPhoto = await uploadFile(
        coverFile,
        `${postDescription.title}_cover`,
        basePath
      );

      // Save to database
      setUploadStage("Saving to database...");
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
        imageAspectRatios,
        createdAt: new Date(),
      };

      await setDoc(doc(db, basePath), document);
      addPostDocument(document);

      setUploadStage("Complete!");
      setDialogOpen(false);
    } catch (err) {
      console.error("Error creating post:", err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
      setUploadProgress(null);
      setUploadStage("");
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

          {loading && uploadProgress && (
            <div className="mb-4 p-3 bg-secondary rounded-md">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">{uploadStage}</span>
                <span className="text-muted-foreground">
                  {uploadProgress.currentFile} / {uploadProgress.totalFiles}
                </span>
              </div>
              <div className="w-full bg-secondary-foreground/20 rounded-full h-2 mb-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress.percentage}%` }}
                />
              </div>
              <div className="text-xs text-muted-foreground truncate">
                {uploadProgress.fileName}
              </div>
            </div>
          )}

          {loading && !uploadProgress && uploadStage && (
            <div className="mb-4 p-3 bg-secondary rounded-md">
              <div className="text-sm font-medium">{uploadStage}</div>
            </div>
          )}

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
          <Label className="mt-4">Add Subtitle/Date</Label>
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
