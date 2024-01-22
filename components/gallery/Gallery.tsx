"use client";

import GalleryHeader from "./GalleryHeader";
import PostStorage from "./PostStorage";

export default function Gallery() {
  return (
    <div className="absolute p-4 bg-orange-50 rounded-3xl w-10/12 h-4/5 left-1/2 -translate-x-1/2">
      <GalleryHeader />
      <PostStorage />
    </div>
  );
}
