import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface PostOptionsProps {
  open: boolean;
  setOpen(open: boolean): void;
  setDeleteDialogOpen(open: boolean): void;
  setUpdateDialogOpen(open: boolean): void;
  setEditDialogOpen(open: boolean): void;
}

export default function PostOptions({
  open,
  setOpen,
  setDeleteDialogOpen,
  setUpdateDialogOpen,
  setEditDialogOpen,
}: PostOptionsProps) {
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger>
        <Button variant={"ghost"} size={"xs"}>
          <MoreHorizontal size={28} className="transparent text-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setUpdateDialogOpen(true)}>
          Edit Post
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setEditDialogOpen(true)}>
          Edit Pictures
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setDeleteDialogOpen(true)}>
          <div className="text-red-500">Delete Post</div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
