import { Button } from "@/components/ui/button";
import DeleteDialog from "./DeleteDialog";

interface DeleteDialogWrapperProps {
  loading: boolean;
  error: string;
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  handleDelete: () => void;
  disabled: boolean;
  button?: boolean;
}

export default function DeleteDialogWrapper({
  loading,
  error,
  dialogOpen,
  setDialogOpen,
  handleDelete,
  disabled,
  button = true,
}: DeleteDialogWrapperProps) {
  return (
    <DeleteDialog
      loading={loading}
      error={error}
      handleDelete={handleDelete}
      dialogOpen={dialogOpen}
      setDialogOpen={setDialogOpen}
    >
      {button && (
        <Button size={"sm"} variant={"destructive"} disabled={disabled}>
          Delete
        </Button>
      )}
    </DeleteDialog>
  );
}
