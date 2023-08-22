import { create } from "zustand";

interface SelectFeaturedProps {
    isVerticalSelected: boolean,
    setIsVerticalSelected(value: boolean): void
}

const selectFeaturedStore= create<SelectFeaturedProps>((set) => ({
    isVerticalSelected: true,
    setIsVerticalSelected: (value) => set({ isVerticalSelected: value }),
}))

export default selectFeaturedStore;