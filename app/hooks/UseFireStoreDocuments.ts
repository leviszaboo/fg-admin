import { create } from "zustand";

import { FeaturedDocument, ParagraphDocument, PostDocument } from "@/app/interfaces/documents";

interface FirestoreDocumentStore {
  postDocuments: PostDocument[];
  paragraphDocuments: ParagraphDocument[];
  featuredDocuments: FeaturedDocument[];
  addPostDocument(doc: PostDocument): void;
  addParagraphDocument(doc: ParagraphDocument): void;
  removeParagraphDocument(id: string): void;
  removePostDocument(id: string): void;
  addFeaturedDocument(doc: FeaturedDocument): void;
  removeFeaturedDocument(id: string): void;
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
    removePostDocument: (id) =>
      set((state) => ({
        postDocuments: state.postDocuments.filter((i) => i.id !== id),
      })),
    addParagraphDocument: (doc) =>
      set((state) => ({
        paragraphDocuments: [doc, ...state.paragraphDocuments],
      })),
    removeParagraphDocument: (id) =>
      set((state) => ({
        paragraphDocuments: state.paragraphDocuments.filter((i) => i.id !== id),
      })),
    addFeaturedDocument: (doc) =>
      set((state) => ({
        featuredDocuments: [...state.featuredDocuments, doc],
      })),
    removeFeaturedDocument: (id) =>
      set((state) => ({
        featuredDocuments: state.featuredDocuments.filter((i) => i.id !== id),
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
