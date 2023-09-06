import { create } from "zustand";

interface SelectImagesProps {
  isVerticalSelected: boolean,
  isSelected: boolean,
  selectedForDeletion: string[]
  setIsVerticalSelected(value: boolean): void
  setSelected(value: boolean): void,
  addToSelected(url: string): void,
  removeFromSelected(url: string): void
  resetSelected(): void
}

const useSelectImagesStore= create<SelectImagesProps>((set) => ({
  isVerticalSelected: true,
  isSelected: false,
  selectedForDeletion: [],
  setIsVerticalSelected: (value) => set({ isVerticalSelected: value }),
  setSelected: (value) => set({ isSelected: value }),
  addToSelected: (url) => set((state) => ({
    selectedForDeletion: [...state.selectedForDeletion, url],
  })),
  removeFromSelected: (url) => set((state) => ({
    selectedForDeletion: state.selectedForDeletion.filter((i) => i !== url)
  })),
  resetSelected: () => set({ selectedForDeletion: [] }),
}))

export default useSelectImagesStore;