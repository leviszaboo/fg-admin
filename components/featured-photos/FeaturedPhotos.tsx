"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useFireStoreDocumentsStore } from "@/app/hooks/UseFireStoreDocuments";
import { useFetchDocs } from "@/app/hooks/useFetchDocs";
import { FeaturedPhotoType } from "@/app/interfaces/documents";
import { useEffect } from "react";
import ImageFrameGroup from "../ImageFrameGroup";
import UploadDialog from "./UploadDialog";
import FeaturedPhotosHeader from "./FeaturedPhotosHeader";

interface FeaturedPhotosProps {
  type: FeaturedPhotoType;
  title: string;
}

export default function FeaturedPhotos({ type, title }: FeaturedPhotosProps) {
  const auth = useAuth();
  const user = auth.currentUser;

  const { featuredDocuments, addFeaturedDocument } = useFireStoreDocumentsStore();
  const { fetchDocs } = useFetchDocs();

  const docs = featuredDocuments.filter(
    (doc) => doc.type === type,
  );

  const basePath = `${user?.uid}/featured/${type}`;

  useEffect(() => {
    if (docs.length === 0) {
      fetchDocs(basePath, addFeaturedDocument);
    }
  }, []);

  return (
    <div className="p-4 mt-1 mb-4 bg-orange-50 rounded-3xl w-10/12  h-3/5 ">
      <FeaturedPhotosHeader type={type} title={title} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
        <UploadDialog type={type} basePath={basePath} />
        <ImageFrameGroup docs={docs} />
      </div>
    </div>
  );
}
