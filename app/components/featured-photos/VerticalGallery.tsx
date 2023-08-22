import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";

import { Plus, ImagePlus } from "lucide-react";

export default function VerticalGallery() {

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <div className="relative h-11/12 overflow-y-scroll rounded-3xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
        <Dialog>
          <DialogTrigger>
            <div className="border-2 border-lightbrown rounded-lg h-80 flex flex-column items-center content-center justify-center text-center"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Plus className="w-6 h-6 svg-transition" color={isHovered ? 'grey' : '#a8a29e'}/>
            </div>
          </DialogTrigger>
          <DialogContent className="w-96">
            <DialogHeader>
              <DialogTitle>Select photos to upload</DialogTitle>
            </DialogHeader>
            <div className="pt-4 pb-2">
              <Button 
                type="button" 
                variant="secondary" 
              >
                <ImagePlus className="h-4 w-4 mr-2" />
                Select images
              </Button>
            </div>
            <DialogFooter>
              <Button type="submit">Upload</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        </div>
      </div>
    </>
  )
}
