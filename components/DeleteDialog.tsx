import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ReactNode } from "react";

interface DeleteDialogProps {
  children?: ReactNode;
  error?: string;
  loading: boolean;
  dialogOpen?: boolean;
  setDialogOpen?(open: boolean): void;
  handleDelete(): void;
}

export default function DeleteDialog({
  children,
  dialogOpen,
  setDialogOpen,
  handleDelete,
  loading,
  error,
}: DeleteDialogProps) {
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {children && <DialogTrigger>{children}</DialogTrigger>}
      <DialogContent className="w-96">
        <DialogHeader>
          <DialogTitle>
            <div className="flex h-6 pb-1 items-end">
              <div>
                <Trash2 className="h-5 w-5 mr-2" />
              </div>
              <div className="">Are you sure you want to delete?</div>
            </div>
          </DialogTitle>
          <DialogDescription>
            This action will permanently delete all selected items.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col pt-2 pb-2">
          {error && (
            <div className="text-sm text-red-500 pb-3 font-semibold">
              {error}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            variant={"destructive"}
            onClick={handleDelete}
            disabled={loading}
          >
            {!loading ? "Delete" : "Deleting..."}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
