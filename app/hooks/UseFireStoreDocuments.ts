import { create } from "zustand";

import { FeaturedDocument, ParagraphDocument, PostDocument } from "@/app/interfaces/documents";

interface FirestoreDocumentStore {
  postDocuments: PostDocument[];
  paragraphDocuments: ParagraphDocument[];
  featuredDocuments: FeaturedDocument[];
  addPostDocument(doc: PostDocument): void;
  addParagraphDocument(doc: ParagraphDocument): void;
  removeParagraphDocument(doc: ParagraphDocument): void;
  removePostDocument(doc: PostDocument): void;
  addFeaturedDocument(doc: FeaturedDocument): void;
  removeFeaturedDocument(doc: FeaturedDocument): void;
  updatePostDocumentFields(docId: string, fields: Partial<PostDocument>): void;
  updateFeaturedDocumentFields(
    docId: string,
    fields: Partial<FeaturedDocument>,
  ): void;
  updateParagraph(id: string, value: string): void;
}

export const useFireStoreDocumentsStore = create<FirestoreDocumentStore>(
  (set) => ({
    postDocuments: [],
    paragraphDocuments: [],
    featuredDocuments: [],
    addPostDocument: (doc) =>
      set((state) => ({
        postDocuments: [doc, ...state.postDocuments],
      })),
    removePostDocument: (doc) =>
      set((state) => ({
        postDocuments: state.postDocuments.filter((i) => i !== doc),
      })),
    addParagraphDocument: (doc) =>
      set((state) => ({
        paragraphDocuments: [doc, ...state.paragraphDocuments],
      })),
    removeParagraphDocument: (doc) =>
      set((state) => ({
        paragraphDocuments: state.paragraphDocuments.filter((i) => i !== doc),
      })),
    addFeaturedDocument: (doc) =>
      set((state) => ({
        featuredDocuments: [...state.featuredDocuments, doc],
      })),
    removeFeaturedDocument: (doc) =>
      set((state) => ({
        featuredDocuments: state.featuredDocuments.filter((i) => i !== doc),
      })),
    updatePostDocumentFields: (docId, fields) =>
      set((state) => ({
        postDocuments: state.postDocuments.map((doc) => {
          if (doc.id === docId) {
            return {
              ...doc,
              ...fields,
            };
          }
          return doc;
        }),
      })),
    updateFeaturedDocumentFields: (docId, fields) =>
      set((state) => ({
        featuredDocuments: state.featuredDocuments.map((doc) => {
          if (doc.id === docId) {
            return {
              ...doc,
              ...fields,
            };
          }
          return doc;
        }),
      })),
    updateParagraph: (id, value) =>
      set((state) => ({
        paragraphDocuments: state.paragraphDocuments.map((doc) => {
          if (doc.id === id) {
            return {
              ...doc,
              value,
            };
          }
          return doc;
        }),
      })),
  }),
);
