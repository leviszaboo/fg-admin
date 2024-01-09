import { MoreHorizontal } from "lucide-react"
import { Button } from "../../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../ui/dropdown-menu"

interface ParagraphOptionsProps {
  open: boolean, 
  setOpen(open: boolean): void,
  setDeleteDialogOpen(open: boolean): void,
  setUpdateDialogOpen(open: boolean): void,
}

export default function ParagraphOptions({open, setOpen, setDeleteDialogOpen, setUpdateDialogOpen }: ParagraphOptionsProps) {
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger>
      <Button variant={"ghost"} size={"xs"}>
        <MoreHorizontal size={28} className="transparent text-black"/>
      </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setUpdateDialogOpen(true)}>
          Edit Paragraph
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setDeleteDialogOpen(true)}>
          <div className="text-red-500">  
            Delete Paragraph
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}