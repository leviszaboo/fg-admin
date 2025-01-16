"use client";

import UploadDialog from "./UploadDialog";
import { useAuth } from "@/app/context/AuthContext";
import { useEffect } from "react";
import ImageFrameGroup from "../ImageFrameGroup";
import AboutMePhotosHeader from "./AboutMePhotosHeader";
import { useFireStoreDocumentsStore } from "@/app/hooks/UseFireStoreDocuments";
import { useFetchDocs } from "@/app/hooks/useFetchDocs";

export default function AboutMePhotos() {
  const auth = useAuth();
  const user = auth.currentUser;

  const { featuredDocuments, addFeaturedDocument } = useFireStoreDocumentsStore();
  const { fetchDocs } = useFetchDocs();

  const aboutMeDocs = featuredDocuments.filter(
    (doc) => doc.type === "about-me",
  );

  const ref = `${user?.uid}/featured/about-me`;

  useEffect(() => {
    if (aboutMeDocs.length === 0) {
      fetchDocs(ref, addFeaturedDocument);
    }
  }, []);

  return (
    <div className="p-4 mt-1 mb-4 bg-orange-50 rounded-3xl w-10/12  h-3/5 ">
      <AboutMePhotosHeader />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
        <UploadDialog />
        <ImageFrameGroup docs={aboutMeDocs} />
      </div>
    </div>
  );
}
