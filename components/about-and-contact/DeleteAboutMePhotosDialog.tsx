import useDeleteHandler from "@/app/hooks/useDeleteHandler";
import { useAuth } from "@/app/context/AuthContext";
import useSelectImagesStore from "@/app/hooks/UseSelectImages";
import { useFireStoreDocumentsStore } from "@/app/hooks/UseFireStoreDocuments";
import DeleteDialogWrapper from "@/components/DeleteDialogWrapper";
import { useState } from "react";

export default function DeleteAboutMePhotosDialog() {
  const { loading, error, handleDelete } = useDeleteHandler();
  const auth = useAuth();
  const user = auth.currentUser;

  const { selectedImages, removeFromSelected, setSelected } =
    useSelectImagesStore();
  const { removeFeaturedDocument } =
    useFireStoreDocumentsStore();

  const [dialogOpen, setDialogOpen] = useState<boolean>(false); 

  const handleDeleteClick = async () => {
    await handleDelete({
      fileIds: selectedImages.map((image) => image.fileId), 
      documentIds: selectedImages.map((image) => image.id),
      fsPath: `${user?.uid}/featured/about-me`,
      remover: removeFeaturedDocument,
      removeFromSelected,
    });

    setSelected(false);
  };

  return (
    <DeleteDialogWrapper
      loading={loading}
      error={error}
      dialogOpen={dialogOpen}
      setDialogOpen={setDialogOpen}
      handleDelete={handleDeleteClick}
      disabled={selectedImages.length <= 0}
    />
  );
}

