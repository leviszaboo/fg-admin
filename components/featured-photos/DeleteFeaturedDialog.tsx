import useDeleteHandler from "@/app/hooks/useDeleteHandler";
import useSelectImagesStore from "@/app/hooks/UseSelectImages";
import useImageUrlStore from "@/app/hooks/UseImageUrl";
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

  const { removeHorizontalUrl, removeVerticalUrl } = useImageUrlStore();
  const { featuredDocuments, removeFeaturedDocument } =
    useFireStoreDocumentsStore();

  const [dialogOpen, setDialogOpen] = useState<boolean>(false); 

  const handleDeleteClick = () => {
    handleDelete({
      selectedImages,
      getFirestorePath: (name) =>
        `${user?.email}/featured/${isVerticalSelected ? "vertical" : "horizontal"}/${name}`,
      getStoragePath: (item) => item,
      removeDocument: removeFeaturedDocument,
      removeUrl: isVerticalSelected ? removeVerticalUrl : removeHorizontalUrl,
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

