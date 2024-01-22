import { create } from "zustand";

interface SelectImagesStore {
  isVerticalSelected: boolean;
  isSelected: boolean;
  selectedImages: string[];
  setIsVerticalSelected(value: boolean): void;
  setSelected(value: boolean): void;
  addToSelected(url: string): void;
  removeFromSelected(url: string): void;
  resetSelected(): void;
}

const useSelectImagesStore = create<SelectImagesStore>((set) => ({
  isVerticalSelected: true,
  isSelected: false,
  selectedImages: [],
  setIsVerticalSelected: (value) => set({ isVerticalSelected: value }),
  setSelected: (value) => set({ isSelected: value }),
  addToSelected: (url) =>
    set((state) => ({
      selectedImages: [url, ...state.selectedImages],
    })),
  removeFromSelected: (url) =>
    set((state) => ({
      selectedImages: state.selectedImages.filter((i) => i !== url),
    })),
  resetSelected: () => set({ selectedImages: [] }),
}));

export default useSelectImagesStore;
