import { useCallback, useState } from "react";
import { getDocs, query, collection, orderBy } from "firebase/firestore";
import {
  FeaturedDocument,
  useFireStoreDocumentsStore,
} from "./UseFireStoreDocuments";
import { db } from "../firebase/config";

export function useFetchImageUrls() {
  const { addFeaturedDocument } = useFireStoreDocumentsStore();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchImageUrls = useCallback(
    async (ref: string, destinationSetter: (url: string) => void) => {
      try {
        setLoading(true);
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
        setError("An error occurred while fetching images.");
      }
      setLoading(false);
    },
    [addFeaturedDocument],
  );

  return { fetchImageUrls, error, loading };
}
