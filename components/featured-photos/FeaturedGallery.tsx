"use client";

import FeaturedGalleryHeader from "./FeaturedGalleryHeader";
import ImageStorage from "./ImageStorage";

export default function FeaturedGallery() {
  return (
    <>
      <div className="absolute p-4 bg-orange-50 rounded-3xl w-10/12 h-4/5 left-1/2 -translate-x-1/2">
        <FeaturedGalleryHeader />
        <ImageStorage />
      </div>
    </>
  );
}
