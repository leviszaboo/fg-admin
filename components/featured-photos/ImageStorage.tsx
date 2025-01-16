import { useEffect } from "react";

import UploadDialog from "./UploadDialog";
import useSelectImagesStore from "@/app/hooks/UseSelectImages";
import {
  useFireStoreDocumentsStore,
} from "@/app/hooks/UseFireStoreDocuments";
import { useAuth } from "@/app/context/AuthContext";
import ImageFrameGroup from "../ImageFrameGroup";
import { useFetchDocs } from "@/app/hooks/useFetchDocs";

export default function ImageStorage() {
  const { isVerticalSelected } = useSelectImagesStore();
  const { featuredDocuments, addFeaturedDocument } = useFireStoreDocumentsStore();

  const auth = useAuth();
  const user = auth.currentUser;
  const verticalRef = `${user?.uid}/featured/vertical`;
  const horizontalRef = `${user?.uid}/featured/horizontal`;

  const { fetchDocs } = useFetchDocs();

  useEffect(() => {
    if (featuredDocuments.length === 0) {
      fetchDocs(verticalRef, addFeaturedDocument);
      fetchDocs(horizontalRef, addFeaturedDocument);
    }
  }, []);

  return (
    <div className="h-11/12 overflow-y-scroll rounded-3xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
        <UploadDialog />
        {isVerticalSelected && <ImageFrameGroup docs={featuredDocuments.filter(doc => doc.type === "vertical")} />}
        {!isVerticalSelected && <ImageFrameGroup docs={featuredDocuments.filter(doc => doc.type === "horizontal")} />}
      </div>
    </div>
  );
}
