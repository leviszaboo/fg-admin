import { useEffect, useState } from "react";

import useSelectImagesStore from "@/app/hooks/UseSelectImages"

import { Checkbox } from "@/components/ui/checkbox"
import { CheckedState } from "@radix-ui/react-checkbox";

interface ImageFrameProps {
	url: string
}

export default function ImageFrame({ url }: ImageFrameProps) {
	const { 
    isVerticalSelected, 
    isSelected, 
    selectedImages, 
    addToSelected, 
    removeFromSelected 
  } = useSelectImagesStore();

	const [checked, setChecked] = useState<CheckedState>(false);

	function handleClick() {
		if (isSelected) {
			setChecked(!checked)
		} else {
			return
		}

		if (!checked) {
			addToSelected(url)
		} else {
			removeFromSelected(url)
		}
	}

  useEffect(() => {
    if (!isSelected) setChecked(false);
    if (selectedImages.length === 0) setChecked(false);
  }, [isSelected, selectedImages])

  return (
    <>
		  <div onClick={handleClick} className={` flex flex-column border-2 border-brown rounded-lg ${isVerticalSelected ? "h-80" : "h-44"} ${isSelected ? "cursor-pointer" : null} overflow-hidden items-center content-center justify-center text-center`}>
				<div className="h-full w-full flex flex-column justify-center items-center image-radius-inner border-4 border-white overflow-hidden">
					<div className="relative h-full w-full">
						{isSelected && (
							<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
								<Checkbox checked={checked} onCheckedChange={setChecked}/>
							</div>
						)}
						<img className={`object-cover min-h-full -z-50 ${isSelected ? "opacity-80 blur-xs" : null}`} src={url}/>
					</div>
				</div>
			</div>
		</>
  )
}
