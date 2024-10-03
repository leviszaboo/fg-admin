import useDeleteHandler from "@/app/hooks/useDeleteHandler";
import { useFireStoreDocumentsStore } from "@/app/hooks/UseFireStoreDocuments";
import { useAuth } from "@/app/context/AuthContext";
import DeleteDialogWrapper from "@/components/DeleteDialogWrapper";
import useGalleryStore from "@/app/hooks/UseGallery";
import { DialogProps } from "@/app/interfaces/dialogProps";

export default function DeletePostDialog({ id, dialogOpen, setDialogOpen }: DialogProps) {
  const { loading, error, handleDelete } = useDeleteHandler();
  const auth = useAuth();
  const user = auth.currentUser;

  const { isAnalogSelected } = useGalleryStore();
  const { postDocuments, removePostDocument } = useFireStoreDocumentsStore();

  const handleDeleteClick = () => {
    const document = postDocuments.find((doc) => doc.id === id);

    if (document) {
      handleDelete({
        selectedImages: document.imageUrls,
        getFirestorePath: (name) =>
          `${user?.email}/gallery/${isAnalogSelected ? "analog" : "digital"}/${document.id}`,
        getStoragePath: (item, index) => `${user?.email}/gallery/${isAnalogSelected ? "analog" : "digital"}/${document.id}_${index}`,
        removeDocument: removePostDocument,
        removeUrl: () => {}, 
        removeFromSelected: () => {}, 
        document: document,
      });
    }
  };

  return (
    <DeleteDialogWrapper
      loading={loading}
      error={error}
      dialogOpen={dialogOpen}
      setDialogOpen={setDialogOpen}
      handleDelete={handleDeleteClick}
      disabled={false}
      button={false}
    />
  );
}
