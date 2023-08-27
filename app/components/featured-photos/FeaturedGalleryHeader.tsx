import selectImagesStore from "@/app/hooks/selectImages"
import { storage } from "@/app/firebase/firebase";

import ComboBox from "./ComboBox"
import { Button } from "@/components/ui/button"

import { ref, deleteObject } from "firebase/storage";


export default function FeaturedGalleryHeader() {
  const { isSelected, setSelected, selectedForDeletion} = selectImagesStore();

  async function handleDelete() {
    try {
      selectedForDeletion.forEach((item) => {
        const desertRef = ref(storage, item)
        deleteObject(desertRef);
      })
    } catch(err) {
      console.log(err)
    }
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
              <Button size={"sm"} variant={"destructive"} onClick={handleDelete} disabled={selectedForDeletion.length <= 0}>
                Delete
              </Button>
              <Button variant={"secondary"} size={"xs"} onClick={() => setSelected(!isSelected)}>
                Cancel
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  )
}
