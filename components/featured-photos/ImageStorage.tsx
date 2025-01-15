import { useEffect } from "react";

import { getDocs, collection, orderBy, query } from "firebase/firestore";

import UploadDialog from "./UploadDialog";
import useSelectImagesStore from "@/app/hooks/UseSelectImages";
import {
  useFireStoreDocumentsStore,
} from "@/app/hooks/UseFireStoreDocuments";
import { db } from "@/app/firebase/config";
import { useAuth } from "@/app/context/AuthContext";
import ImageFrameGroup from "../ImageFrameGroup";
import { FeaturedDocument } from "@/app/interfaces/documents";
import { useFetchImageUrls } from "@/app/hooks/useFetchImageUrls";

export default function ImageStorage() {
  const { isVerticalSelected } = useSelectImagesStore();
  const { featuredDocuments, addFeaturedDocument } = useFireStoreDocumentsStore();

  const auth = useAuth();
  const user = auth.currentUser;
  const verticalRef = `${user?.uid}/featured/vertical`;
  const horizontalRef = `${user?.uid}/featured/horizontal`;

  const { fetchImageUrls } = useFetchImageUrls();

  // async function fetchImageUrls(
  //   ref: string,
  // ) {
  //   try {
  //     const querySnapshot = await getDocs(
  //       query(collection(db, ref), orderBy("createdAt", "asc")),
  //     );
  //     querySnapshot.forEach((doc) => {
  //       const document: FeaturedDocument = {
  //         id: doc.data().id,
  //         name: doc.data().name,
  //         url: doc.data().url,
  //         fileId: doc.data().fileId,
  //         type: doc.data().type,
  //         createdAt: doc.data().createdAt,
  //       };

  //       addFeaturedDocument(document);
  //     });
  //   } catch (error) {
  //     console.error("Error fetching image URLs:", error);
  //   }
  // }

  useEffect(() => {
    if (featuredDocuments.length === 0) {
      fetchImageUrls(verticalRef);
      fetchImageUrls(horizontalRef);
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
