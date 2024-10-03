import { Button } from "@/components/ui/button";
import DeleteDialog from "./DeleteDialog";

export default function DeleteDialogWrapper({
  loading,
  error,
  dialogOpen,
  setDialogOpen,
  handleDelete,
  disabled,
}: {
  loading: boolean;
  error: string;
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  handleDelete: () => void;
  disabled: boolean;
}) {
  return (
    <DeleteDialog
      loading={loading}
      error={error}
      handleDelete={handleDelete}
      dialogOpen={dialogOpen}
      setDialogOpen={setDialogOpen}
    >
      <Button size={"sm"} variant={"destructive"} disabled={disabled}>
        Delete
      </Button>
    </DeleteDialog>
  );
}
