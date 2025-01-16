import useDeleteHandler from "@/app/hooks/useDeleteHandler";
import useSelectImagesStore from "@/app/hooks/UseSelectImages";
import { useFireStoreDocumentsStore } from "@/app/hooks/UseFireStoreDocuments";
import { useAuth } from "@/app/context/AuthContext";
import DeleteDialogWrapper from "@/components/DeleteDialogWrapper";
import { useState } from "react";

export default function DeleteFeaturedDialog() {
  const { loading, error, handleDelete } = useDeleteHandler();
  const auth = useAuth();
  const user = auth.currentUser;

  const {
    isVerticalSelected,
    selectedImages,
    removeFromSelected,
    setSelected,
  } = useSelectImagesStore();

  const { removeFeaturedDocument } =
    useFireStoreDocumentsStore();

  const [dialogOpen, setDialogOpen] = useState<boolean>(false); 

  const handleDeleteClick = async () => {
    await handleDelete({
      fileIds: selectedImages.map((image) => image.fileId),
      documentIds: selectedImages.map((image) => image.id),
      fsPath: `${user?.uid}/featured/${isVerticalSelected ? "vertical" : "horizontal"}`,
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

