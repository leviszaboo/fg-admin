import { create } from "zustand";
import { FeaturedDocument, FsDocumentType } from "../interfaces/documents";

interface SelectImagesStore {
  isSelected: boolean;
  typeSelected: FsDocumentType | null;
  selectedImages: FeaturedDocument[];
  setSelected(value: boolean, type: FsDocumentType | null): void;
  addToSelected(doc: FeaturedDocument): void;
  removeFromSelected(doc: FeaturedDocument): void;
  resetSelected(): void;
}

const useSelectImagesStore = create<SelectImagesStore>((set) => ({
  isSelected: false,
  typeSelected: null,
  selectedImages: [],
  setSelected: (value, type) => set({ isSelected: value, typeSelected: type }),
  addToSelected: (doc) =>
    set((state) => ({
      selectedImages: [doc, ...state.selectedImages],
    })),
  removeFromSelected: (doc) =>
    set((state) => ({
      selectedImages: state.selectedImages.filter((i) => i !== doc),
    })),
  resetSelected: () => set({ selectedImages: [] }),
}));

export default useSelectImagesStore;
