import ComboBox from "../ComboBox"
import { AddAnalogPostDialog } from "./AddAnalogPostDialog"
import { AddDigitalPostDialog } from "./AddDigitalPostDialog"
import useGalleryStore from "@/app/hooks/UseGallery"

export default function GalleryHeader() {
  const comboBoxOptions = [
    {
      value: "analog",
      label: "Analog",
    },
    {
      value: "digital",
      label: "Digital",
    },
  ]

  const { isAnalogSelected, setIsAnalogSelected } = useGalleryStore()

  function onSelect(value: string) {
    setIsAnalogSelected(value === "analog" ? true : false)
  }

  return (
    <>
      <div className="relative flex top-0 w-full justify-between items-center">
        <div className="p-1 pl-4 text-amber-900 text-3xl font-semibold">Gallery</div>
        <div className="self-end grid grid-flow-col gap-4 items-center pr-4 h-full">
          <ComboBox optionsList={comboBoxOptions} onSelect={onSelect}/>
          {isAnalogSelected && <AddAnalogPostDialog />}
          {!isAnalogSelected && <AddDigitalPostDialog />}
        </div>
      </div>
    </>
  )
}