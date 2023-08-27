import { create } from "zustand";

interface SelectImagesProps {
  isSelected: boolean,
  setSelected(value: boolean): void,
  selectedForDeletion: string[]
  addToSelected(url: string): void,
  removeFromSelected(url: string): void
  resetSelected(): void
}

const selectImagesStore= create<SelectImagesProps>((set) => ({
  isSelected: false,
  selectedForDeletion: [],
  setSelected: (value) => set({ isSelected: value }),
  addToSelected: (url) => set((state) => ({
    selectedForDeletion: [...state.selectedForDeletion, url],
  })),
  removeFromSelected: (url) => set((state) => ({
    selectedForDeletion: state.selectedForDeletion.filter((i) => i !== url)
  })),
  resetSelected: () => set({ selectedForDeletion: [] }),
}))

export default selectImagesStore;