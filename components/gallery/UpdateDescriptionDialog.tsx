import { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";

import { useFireStoreDocumentsStore } from "@/app/hooks/UseFireStoreDocuments";
import { db } from "@/app/firebase/config";
import { useAuth } from "@/app/context/AuthContext";
import useGalleryStore from "@/app/hooks/UseGallery";

import { descriptionOptions, PostDescription } from "./AddAnalogPostDialog";
import ComboBox from "../ComboBox";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

import { GalleryHorizontalEnd } from "lucide-react";
import { DialogProps } from "@/app/interfaces/dialogProps";

export default function UpdateDescriptionDialog({
  id,
  dialogOpen,
  setDialogOpen,
}: DialogProps) {
  const auth = useAuth();
  const user = auth.currentUser;

  const { postDocuments, updatePostDocumentFields } =
    useFireStoreDocumentsStore();
  const { isAnalogSelected } = useGalleryStore();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [descriptionLayoutValue, setdescriptionLayoutValue] =
    useState<string>("");
  const [postDescription, setPostDescription] = useState<PostDescription>({
    title: "",
    subTitle: "",
    description: "",
  });

  function onChange(fieldName: keyof PostDescription, value: string) {
    setPostDescription((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  }

  function onSelectDescription(value: string) {
    setdescriptionLayoutValue(value);
  }

  useEffect(() => {
    const document = postDocuments.find((doc) => doc.id === id);
    if (document) {
      setdescriptionLayoutValue(document.descriptionLayout || "");
      setPostDescription({
        title: document.title || "",
        subTitle: document.subTitle || "",
        description: document.description || "",
      });
    }
  }, [id, postDocuments]);

  async function handleUpdate() {
    setLoading(true);
    setError("");
    try {
      if (
        isAnalogSelected &&
        descriptionLayoutValue !== "left" &&
        descriptionLayoutValue !== "right"
      ) {
        setError(
          "Some required elements are missing. Make sure to choose a description layout value.",
        );
        setLoading(false);

        return;
      }
      const document = postDocuments.find((doc) => doc.id === id);
      if (document) {
        const path = `${user?.email}/gallery/${isAnalogSelected ? "analog" : "digital"}/${document.id}`;
        const ref = doc(db, path);
        await updateDoc(ref, {
          title: postDescription.title,
          subTitle: postDescription.subTitle,
          description: postDescription.description,
          descriptionLayout: descriptionLayoutValue,
        });

        updatePostDocumentFields(document.id, {
          title: postDescription.title,
          subTitle: postDescription.subTitle,
          description: postDescription.description,
          descriptionLayout: descriptionLayoutValue,
        });
      }

      setDialogOpen(false);
    } catch (err) {
      console.log(err);
      setError("Something went wrong.");
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
              <div className="">Update Description</div>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col pt-2 pb-2">
          {error && (
            <div className="text-sm text-red-500 pb-3 font-semibold">
              {error}
            </div>
          )}
          {isAnalogSelected && (
            <div className="grid grid-cols-2 w-full items-center gap-4">
              <Label
                htmlFor="pictures"
                className={`text-left ${error ? "text-red-500" : null}`}
              >
                Description on which side?
              </Label>
              <div className="ml-auto mr-auto">
                <ComboBox
                  optionsList={descriptionOptions}
                  onSelect={onSelectDescription}
                  autoSelect={
                    descriptionLayoutValue === "left" ||
                    descriptionLayoutValue === "right"
                  }
                  autoSelectIndex={descriptionOptions.findIndex(
                    (option) => option.value === descriptionLayoutValue,
                  )}
                />
              </div>
            </div>
          )}
          <Label className={`text-left py-4`}>Add Title</Label>
          <Input
            type="text"
            value={postDescription.title}
            onChange={(e) => onChange("title", e.target.value)}
          />
          <Label className={`text-left py-4`}>Add Subtitle</Label>
          <Input
            type="text"
            value={postDescription.subTitle}
            onChange={(e) => onChange("subTitle", e.target.value)}
          />
          {isAnalogSelected && (
            <>
              <Label htmlFor="description" className={`text-left py-4`}>
                Add Description
              </Label>
              <Textarea
                value={postDescription.description}
                onChange={(e) => onChange("description", e.target.value)}
              />
            </>
          )}
        </div>
        <DialogFooter>
          <Button variant={"black"} disabled={loading} onClick={handleUpdate}>
            {!loading ? "Update Post" : "Updating..."}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
