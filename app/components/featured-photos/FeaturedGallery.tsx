"use client";

import ComboBox from "./ComboBox";
import ImageStorage from "./ImageStorage";

import selectFeaturedStore from "@/app/hooks/selectFeatured";


export default function FeaturedGallery() {
  const { isVerticalSelected } = selectFeaturedStore()

  return (
    <>
      <div className="absolute p-4 mt-7 bg-orange-50 rounded-3xl w-10/12 h-4/5 top-2/4 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative flex top-0 w-full justify-between items-center">
          <div className="p-1 pl-4 text-amber-900 text-3xl font-semibold">Featured Photos</div>
          <div className="self-end">
            <ComboBox />
          </div>
        </div>
        <ImageStorage />
      </div>
    </>
  )
}