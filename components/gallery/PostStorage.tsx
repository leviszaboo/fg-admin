import { useEffect } from "react";

import Post from "./Post";
import {
  PostDocument,
  useFireStoreDocumentsStore,
} from "@/app/hooks/UseFireStoreDocuments";
import useGalleryStore from "@/app/hooks/UseGallery";
import { useAuth } from "@/app/context/AuthContext";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/app/firebase/config";

export default function PostStorage() {
  const { postDocuments, addPostDocument } = useFireStoreDocumentsStore();
  const { isAnalogSelected } = useGalleryStore();

  const auth = useAuth();
  const user = auth.currentUser;
  const analogRef = `${user?.uid}/gallery/analog`;
  const digitalRef = `${user?.uid}/gallery/digital`;

  async function fetchImageUrls(ref: string) {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, ref), orderBy("createdAt", "asc")),
      );
      querySnapshot.forEach((doc) => {
        const document: PostDocument = {
          id: doc.data().id,
          imageUrls: doc.data().imageUrls,
          title: doc.data().title,
          subTitle: doc.data().subTitle,
          destinationGallery: doc.data().destinationGallery,
          description: doc.data().description,
          descriptionLayout: doc.data().descriptionLayout,
          createdAt: doc.data().createdAt,
        };

        addPostDocument(document);
      });
    } catch (error) {
      console.error("Error fetching image URLs:", error);
    }
  }

  const analog = postDocuments.filter(
    (doc) => doc.destinationGallery === "analog",
  );
  const digital = postDocuments.filter(
    (doc) => doc.destinationGallery === "digital",
  );

  useEffect(() => {
    if (analog.length === 0) {
      fetchImageUrls(analogRef);
    }
    if (digital.length === 0) {
      fetchImageUrls(digitalRef);
    }
  }, []);

  return (
    <div className="h-11/12 overflow-y-scroll rounded-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
        {isAnalogSelected &&
          analog.map((doc) => (
            <Post
              key={doc.id}
              id={doc.id}
              urls={doc.imageUrls}
              title={doc.title}
              subTitle={doc.subTitle}
            />
          ))}
        {!isAnalogSelected &&
          digital.map((doc) => (
            <Post
              key={doc.id}
              id={doc.id}
              urls={doc.imageUrls}
              title={doc.title}
              subTitle={doc.subTitle}
            />
          ))}
      </div>
    </div>
  );
}
