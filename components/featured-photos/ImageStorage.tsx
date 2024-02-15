import { useEffect } from "react";

import { getDocs, collection, orderBy, query } from "firebase/firestore";

import UploadDialog from "./UploadDialog";
import useSelectImagesStore from "@/app/hooks/UseSelectImages";
import useImageUrlStore from "@/app/hooks/UseImageUrl";
import {
  useFireStoreDocumentsStore,
  FeaturedDocument,
} from "@/app/hooks/UseFireStoreDocuments";
import { db } from "@/app/firebase/config";
import { useAuth } from "@/app/context/AuthContext";
import ImageFrameGroup from "../ImageFrameGroup";

export default function ImageStorage() {
  const { verticalUrls, horizontalUrls, addHorizontalUrl, addVerticalUrl } =
    useImageUrlStore();

  const { isVerticalSelected } = useSelectImagesStore();
  const { addFeaturedDocument } = useFireStoreDocumentsStore();

  const auth = useAuth();
  const user = auth.currentUser;
  const verticalRef = `${user?.uid}/featured/vertical`;
  const horizontalRef = `${user?.uid}/featured/horizontal`;

  async function fetchImageUrls(
    ref: string,
    destinationSetter: (url: string) => void,
  ) {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, ref), orderBy("createdAt", "asc")),
      );
      querySnapshot.forEach((doc) => {
        destinationSetter(doc.data().url);
        const document: FeaturedDocument = {
          id: doc.data().id,
          name: doc.data().name,
          url: doc.data().url,
          createdAt: doc.data().createdAt,
        };

        addFeaturedDocument(document);
      });
    } catch (error) {
      console.error("Error fetching image URLs:", error);
    }
  }

  useEffect(() => {
    if (verticalUrls.length === 0) {
      fetchImageUrls(verticalRef, addVerticalUrl);
    }
    if (horizontalUrls.length === 0) {
      fetchImageUrls(horizontalRef, addHorizontalUrl);
    }
  }, []);

  return (
    <div className="h-11/12 overflow-y-scroll rounded-3xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
        <UploadDialog />
        {isVerticalSelected && <ImageFrameGroup urls={verticalUrls} />}
        {!isVerticalSelected && <ImageFrameGroup urls={horizontalUrls} />}
      </div>
    </div>
  );
}
