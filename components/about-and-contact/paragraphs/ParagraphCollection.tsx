import { useAuth } from "@/app/context/AuthContext";
import {
  useFireStoreDocumentsStore,
} from "@/app/hooks/UseFireStoreDocuments";
import Paragraph from "./Paragraph";
import { useEffect } from "react";
import { useFetchDocs } from "@/app/hooks/useFetchDocs";

export default function ParagraphCollection() {
  const auth = useAuth();
  const user = auth.currentUser;
  const ref = `${user?.uid}/about-me/paragraphs`;
  const { paragraphDocuments, addParagraphDocument } =
    useFireStoreDocumentsStore();
  const { fetchDocs } = useFetchDocs();

  useEffect(() => {
    if (paragraphDocuments.length === 0) {
      fetchDocs(ref, addParagraphDocument);
    }
  }, []);

  return (
    <div className="overflow-y-scroll">
      <div className="grid grid-cols-3 gap-2">
        {paragraphDocuments.map((document) => (
          <Paragraph key={document.id} paragraph={document} />
        ))}
      </div>
    </div>
  );
}
