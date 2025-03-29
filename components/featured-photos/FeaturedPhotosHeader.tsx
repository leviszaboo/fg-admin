import useSelectImagesStore from "@/app/hooks/UseSelectImages";

import { Button } from "@/components/ui/button";

import { FeaturedPhotoType } from "@/app/interfaces/documents";
import DeleteFeaturedPhotosDialog from "./DeleteFeaturedDialog";

interface FeaturedPhotosHeaderProps {
  type: FeaturedPhotoType;
  title: string;
}

export default function FeaturedPhotosHeader({ type, title }: FeaturedPhotosHeaderProps) {
  const { isSelected, typeSelected, setSelected, resetSelected } = useSelectImagesStore();

  function handleCancel() {
    setSelected(false, null);
    resetSelected();
  }

  function toggleSelected() {
    if (isSelected) {
      setSelected(false, null);
    } else {
      setSelected(true, type);
    }
  }

  return (
    <div className="relative flex top-0 w-full justify-between items-center">
      <div className="p-1 pl-4 text-amber-900 text-3xl font-semibold">
        {title}
      </div>
      <div className="grid grid-flow-col gap-4 items-center pr-4 h-full">
        {!(isSelected && typeSelected === type) && (
          <Button size={"xs"} onClick={toggleSelected}>
            Select
          </Button>
        )}
        {isSelected && typeSelected === type &&(
          <>
            <DeleteFeaturedPhotosDialog type={type} />
            <Button variant={"outline"} size={"xs"} onClick={handleCancel}>
              Cancel
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
