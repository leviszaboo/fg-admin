import { create } from "zustand";

interface Document {
  id: string,
  createdAt: Date
}

export interface FeaturedDocument extends Document {
  name: string,
  url: string,
}

export interface PostDocument extends Document {
  imageUrls: string[],
  descriptionLayout: string,
  title: string,
  subTitle: string,
  description: string,
  destinationGallery: string
}

interface FirestoreDocumentStore {
  postDocuments: PostDocument[],
  featuredDocuments: FeaturedDocument[],
  addPostDocument(doc: PostDocument): void,
  removePostDocument(doc: PostDocument): void,
  addFeaturedDocument(doc: FeaturedDocument): void,
  removeFeaturedDocument(doc: FeaturedDocument): void,
  updatePostDocumentFields(docId: string, fields: Partial<PostDocument>): void,
  updateFeaturedDocumentFields(docId: string, fields: Partial<FeaturedDocument>): void,
}

export const useFireStoreDocumentsStore = create<FirestoreDocumentStore>((set) => ({
  postDocuments: [],
  featuredDocuments: [],
  addPostDocument: (doc) => set((state) => ({
    postDocuments: [...state.postDocuments, doc]
  })), 
  removePostDocument: (doc) => set((state) => ({
    postDocuments: state.postDocuments.filter((i) => i !== doc)
  })),
  addFeaturedDocument: (doc) => set((state) => ({
    featuredDocuments: [...state.featuredDocuments, doc]
  })), 
  removeFeaturedDocument: (doc) => set((state) => ({
    featuredDocuments: state.featuredDocuments.filter((i) => i !== doc)
  })),
  updatePostDocumentFields: (docId, fields) => set((state) => ({
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
  updateFeaturedDocumentFields: (docId, fields) => set((state) => ({
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
}));

