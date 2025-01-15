import { create } from "zustand";
import { FeaturedDocument } from "../interfaces/documents";

interface SelectImagesStore {
  isVerticalSelected: boolean;
  isSelected: boolean;
  selectedImages: FeaturedDocument[];
  setIsVerticalSelected(value: boolean): void;
  setSelected(value: boolean): void;
  addToSelected(doc: FeaturedDocument): void;
  removeFromSelected(doc: FeaturedDocument): void;
  resetSelected(): void;
}

const useSelectImagesStore = create<SelectImagesStore>((set) => ({
  isVerticalSelected: true,
  isSelected: false,
  selectedImages: [],
  setIsVerticalSelected: (value) => set({ isVerticalSelected: value }),
  setSelected: (value) => set({ isSelected: value }),
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
