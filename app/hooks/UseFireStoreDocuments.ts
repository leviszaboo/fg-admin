import { create } from "zustand";

interface Document {
  id: string,
  name: string,
  url: string,
  createdAt: Date
}

interface DocumentStoreProps {
  documents: Document[],
  addDocument(doc: Document): void,
  removeDocument(doc: Document): void
}

const useFireStoreDocumentsStore = create<DocumentStoreProps>((set) => ({
  documents: [],
  addDocument: (doc) => set((state) => ({
    documents: [...state.documents, doc]
  })), 
  removeDocument: (doc) => set((state) => ({
    documents: state.documents.filter((i) => i !== doc)
  }))
}))

export default useFireStoreDocumentsStore