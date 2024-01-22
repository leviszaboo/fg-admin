"use client";

import useImageUrlStore from "@/app/hooks/UseImageUrl";
import UploadDialog from "./UploadDialog";
import { useFetchImageUrls } from "@/app/hooks/useFetchImageUrls";
import { useAuth } from "@/app/context/AuthContext";
import { useEffect } from "react";
import ImageFrameGroup from "../ImageFrameGroup";
import AboutMePhotosHeader from "./AboutMePhotosHeader";

export default function AboutMePhotos() {
  const auth = useAuth();
  const user = auth.currentUser;

  const { aboutMeUrls, addAboutMeUrl } = useImageUrlStore();
  const { fetchImageUrls } = useFetchImageUrls();

  const ref = `${user?.email}/featured/about-me`;

  useEffect(() => {
    if (aboutMeUrls.length === 0) {
      fetchImageUrls(ref, addAboutMeUrl);
    }
  }, []);

  return (
    <div className="p-4 mt-1 mb-4 bg-orange-50 rounded-3xl w-10/12  h-3/5 ">
      <AboutMePhotosHeader />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
        <UploadDialog />
        <ImageFrameGroup urls={aboutMeUrls} />
      </div>
    </div>
  );
}
