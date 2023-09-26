import useSelectImagesStore from "@/app/hooks/UseSelectImages"

import ComboBox from "../ComboBox"
import { Button } from "@/components/ui/button"

import DeleteFeaturedDialog from "./DeleteFeaturedDialog";

const comboBoxOptions = [
  {
    value: "vertical",
    label: "Vertical",
  },
  {
    value: "horizontal",
    label: "Horizontal",
  },
]


export default function FeaturedGalleryHeader() {
  const { 
    isSelected,  
    setSelected, 
    resetSelected,
    setIsVerticalSelected 
  } = useSelectImagesStore();

  function handleCancel() {
    setSelected(!isSelected);
    resetSelected();
  }

  function onSelect(currentValue: string) {
    setIsVerticalSelected(currentValue === "vertical" ? true : false)
  }

  return (
    <>
      <div className="relative flex top-0 w-full justify-between items-center">
        <div className="p-1 pl-4 text-amber-900 text-3xl font-semibold">Featured Photos</div>
        <div className="self-end grid grid-flow-col gap-4 items-center pr-4 h-full">
          {!isSelected && (
            <>
              <ComboBox optionsList={comboBoxOptions} onSelect={onSelect}/>
              <Button size={"xs"} onClick={() => setSelected(!isSelected)}>
                Select
              </Button>
            </>
          )}
          {isSelected && (
            <>
              <DeleteFeaturedDialog />
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
