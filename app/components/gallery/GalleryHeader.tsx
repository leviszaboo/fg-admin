import ComboBox from "../ComboBox"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"



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

  function onSelect() {
    return
  }

  return (
    <>
      <div className="relative flex top-0 w-full justify-between items-center">
        <div className="p-1 pl-4 text-amber-900 text-3xl font-semibold">Gallery</div>
        <div className="self-end grid grid-flow-col gap-4 items-center pr-4 h-full">
          <ComboBox optionsList={comboBoxOptions} onSelect={onSelect}/>
          <Button size={"sm"}>
            <Plus className="w-5 h-5"/>
            <div className="pl-1">Add Post</div>
          </Button>
        </div>
      </div>
    </>
  )
}