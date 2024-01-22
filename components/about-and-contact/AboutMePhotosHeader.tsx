import useSelectImagesStore from "@/app/hooks/UseSelectImages";

import { Button } from "@/components/ui/button";

import DeleteAboutMePhotosDialog from "./DeleteAboutMePhotosDialog";

export default function AboutMePhotosHeader() {
  const { isSelected, setSelected, resetSelected } = useSelectImagesStore();

  function handleCancel() {
    setSelected(!isSelected);
    resetSelected();
  }

  return (
    <div className="relative flex top-0 w-full justify-between items-center">
      <div className="p-1 pl-4 text-amber-900 text-3xl font-semibold">
        Featured Photos &nbsp;&#40;About Page&#41;
      </div>
      <div className="self-end grid grid-flow-col gap-4 items-center pr-4 h-full">
        {!isSelected && (
          <Button size={"xs"} onClick={() => setSelected(!isSelected)}>
            Select
          </Button>
        )}
        {isSelected && (
          <>
            <DeleteAboutMePhotosDialog />
            <Button variant={"outline"} size={"xs"} onClick={handleCancel}>
              Cancel
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
