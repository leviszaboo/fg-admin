"use client";

import FeaturedGalleryHeader from "./FeaturedGalleryHeader";
import ImageStorage from "./ImageStorage";


export default function FeaturedGallery() {

  return (
    <>
      <div className="absolute p-4 mt-7 bg-orange-50 rounded-3xl w-10/12 h-4/5 top-2/4 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <FeaturedGalleryHeader />
        <ImageStorage />
      </div>
    </>
  )
}