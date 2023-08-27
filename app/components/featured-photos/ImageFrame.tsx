import { useState } from "react";

import selectImagesStore from "@/app/hooks/selectImages"
import selectFeaturedStore from "@/app/hooks/selectFeatured"

import { Checkbox } from "@/components/ui/checkbox"
import { CheckedState } from "@radix-ui/react-checkbox";

interface ImageFrameProps {
	url: string
}

export default function ImageFrame({ url }: ImageFrameProps) {
	const { isVerticalSelected } = selectFeaturedStore();
	const { isSelected, addToSelected, removeFromSelected } = selectImagesStore();
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

  return (
    <>
		  <div onClick={handleClick} className={`border-2 border-brown rounded-lg ${isVerticalSelected ? "h-80" : "h-44"} ${isSelected ? "cursor-pointer" : null} flex flex-column overflow-hidden items-center content-center justify-center text-center`}>
				<div className="h-full w-full flex flex-column justify-center items-center image-radius-inner border-4 border-white overflow-hidden">
					<div className="relative">
						{isSelected && (
							<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
								<Checkbox checked={checked} onCheckedChange={setChecked}/>
							</div>
						)}
						<img className={`min-h-full min-w-full -z-50 ${isSelected ? "opacity-80 blur-xs" : null}`} src={url}/>
					</div>
				</div>
			</div>
		</>
  )
}
