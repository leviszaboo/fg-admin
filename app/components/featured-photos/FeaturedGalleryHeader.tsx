import selectImagesStore from "@/app/hooks/selectImages"

import ComboBox from "./ComboBox"
import { Button } from "@/components/ui/button"

import DeleteDialog from "./DeleteDialog";


export default function FeaturedGalleryHeader() {
  const { 
    isSelected,  
    setSelected, 
    resetSelected 
  } = selectImagesStore();

  function handleCancel() {
    setSelected(!isSelected);
    resetSelected();
  }

  return (
    <>
    <div className="relative flex top-0 w-full justify-between items-center">
        <div className="p-1 pl-4 text-amber-900 text-3xl font-semibold">Featured Photos</div>
        <div className="self-end grid grid-flow-col gap-4 items-center pr-4 h-full">
          {!isSelected && (
            <>
              <ComboBox />
              <Button size={"xs"} onClick={() => setSelected(!isSelected)}>
                Select
              </Button>
            </>
          )}
            {isSelected && (
            <>
              <DeleteDialog />
              <Button variant={"outline"} size={"xs"} onClick={handleCancel}>
                Cancel
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  )
}
