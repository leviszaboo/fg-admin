import { useAuth } from "@/app/context/AuthContext";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import {
  ParagraphDocument,
  useFireStoreDocumentsStore,
} from "@/app/hooks/UseFireStoreDocuments";
import Paragraph from "./Paragraph";
import { useEffect } from "react";

export default function ParagraphCollection() {
  const auth = useAuth();
  const user = auth.currentUser;
  const ref = `${user?.uid}/about-me/paragraphs`;
  const { paragraphDocuments, addParagraphDocument } =
    useFireStoreDocumentsStore();

  async function getParagraphs() {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, ref), orderBy("createdAt", "asc")),
      );
      querySnapshot.forEach((doc) => {
        const document: ParagraphDocument = {
          id: doc.data().id,
          value: doc.data().value,
          createdAt: doc.data().createdAt,
        };

        addParagraphDocument(document);
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (paragraphDocuments.length === 0) {
      getParagraphs();
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
