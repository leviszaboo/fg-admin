import { MoreHorizontal } from "lucide-react"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"

interface PostOptionsProps {
  open: boolean, 
  setOpen(open: boolean): void,
  setDialogOpen(Open: boolean): void,
}

export default function PostOptions({open, setOpen, setDialogOpen}: PostOptionsProps) {
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger>
      <Button variant={"ghost"} size={"xs"}>
        <MoreHorizontal size={28} className="transparent text-white"/>
      </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Edit Post</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setDialogOpen(true)}>
          <div className="text-red-500">  
            Delete Post
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
