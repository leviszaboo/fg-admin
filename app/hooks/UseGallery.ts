import { create } from "zustand";

interface GalleryStore {
  isAnalogSelected: boolean;
  setIsAnalogSelected(value: boolean): void;
}

const useGalleryStore = create<GalleryStore>((set) => ({
  isAnalogSelected: true,
  setIsAnalogSelected: (value) => set({ isAnalogSelected: value }),
}));

export default useGalleryStore;
