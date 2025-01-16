import { useEffect } from "react";

import Post from "./Post";
import {
  useFireStoreDocumentsStore,
} from "@/app/hooks/UseFireStoreDocuments";
import useGalleryStore from "@/app/hooks/UseGallery";
import { useAuth } from "@/app/context/AuthContext";
import { useFetchDocs } from "@/app/hooks/useFetchDocs";

export default function PostStorage() {
  const { postDocuments, addPostDocument } = useFireStoreDocumentsStore();
  const { isAnalogSelected } = useGalleryStore();
  const { fetchDocs } = useFetchDocs();

  const auth = useAuth();
  const user = auth.currentUser;
  const analogRef = `${user?.uid}/gallery/analog`;
  const digitalRef = `${user?.uid}/gallery/digital`;

  const analog = postDocuments.filter(
    (doc) => doc.destinationGallery === "analog",
  );
  const digital = postDocuments.filter(
    (doc) => doc.destinationGallery === "digital",
  );

  useEffect(() => {
    if (analog.length === 0) {
      fetchDocs(analogRef, addPostDocument);
    }
    if (digital.length === 0) {
      fetchDocs(digitalRef, addPostDocument);
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
