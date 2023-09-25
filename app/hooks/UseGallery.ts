import { create } from "zustand";

interface GalleryProps {
  isAnalogSelected: boolean,
  setIsAnalogSelected(value: boolean): void
}

const useGalleryStore= create<GalleryProps>((set) => ({
  isAnalogSelected: true,
  setIsAnalogSelected: (value) => set({ isAnalogSelected: value }),
}))

export default useGalleryStore;