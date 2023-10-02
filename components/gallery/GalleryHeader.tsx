import ComboBox from "../ComboBox"
import { AddPostDialog } from "./AddPostDialog"
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

  const { setIsAnalogSelected } = useGalleryStore()

  function onSelect(value: string) {
    setIsAnalogSelected(value === "analog" ? true : false)
  }

  return (
    <>
      <div className="relative flex top-0 w-full justify-between items-center">
        <div className="p-1 pl-4 text-amber-900 text-3xl font-semibold">Gallery</div>
        <div className="self-end grid grid-flow-col gap-4 items-center pr-4 h-full">
          <ComboBox optionsList={comboBoxOptions} onSelect={onSelect}/>
          <AddPostDialog />
        </div>
      </div>
    </>
  )
}