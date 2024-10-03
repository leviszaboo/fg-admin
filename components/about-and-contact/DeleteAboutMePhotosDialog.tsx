import useDeleteHandler from "@/app/hooks/useDeleteHandler";
import { useAuth } from "@/app/context/AuthContext";
import useSelectImagesStore from "@/app/hooks/UseSelectImages";
import useImageUrlStore from "@/app/hooks/UseImageUrl";
import { useFireStoreDocumentsStore } from "@/app/hooks/UseFireStoreDocuments";
import DeleteDialogWrapper from "@/components/DeleteDialogWrapper";
import { useState } from "react";

export default function DeleteAboutMePhotosDialog() {
  const { loading, error, handleDelete } = useDeleteHandler();
  const auth = useAuth();
  const user = auth.currentUser;

  const { selectedImages, removeFromSelected, setSelected } =
    useSelectImagesStore();
  const { removeAboutMeUrl } = useImageUrlStore();
  const { removeFeaturedDocument } =
    useFireStoreDocumentsStore();

  const [dialogOpen, setDialogOpen] = useState<boolean>(false); // Manage your dialog state here

  const handleDeleteClick = () => {
    handleDelete({
      selectedImages,
      getFirestorePath: (name) =>
        `${user?.email}/featured/about-me/${name}`, // Custom path for about-me photos
      getStoragePath: (item) => item, // The storage path remains the same for the item
      removeDocument: removeFeaturedDocument,
      removeUrl: removeAboutMeUrl, // Remove the About Me URL
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

