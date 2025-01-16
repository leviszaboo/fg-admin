import { useCallback, useState } from "react";
import { getDocs, query, collection, orderBy } from "firebase/firestore";
import {
  useFireStoreDocumentsStore,
} from "./UseFireStoreDocuments";
import { db } from "../firebase/config";
import { FeaturedDocument, FsDocument, PostDocument } from "../interfaces/documents";

export function useFetchDocs() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchDocs = 
    async <T extends FsDocument>(ref: string, setter: (doc: T) => void) => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(
          query(collection(db, ref), orderBy("createdAt", "asc")),
        );
        querySnapshot.forEach((doc) => {
          const document: T = {
            id: doc.data().id,
            ...doc.data(),
          } as T;

          setter(document);
        });
      } catch (error) {
        console.error("Error fetching image URLs:", error);
        setError("An error occurred while fetching images.");
      }
      setLoading(false);
    }

  return { fetchDocs, error, loading };
}
