import { create } from "zustand";

interface ActiveLinkProps {
    activeLink: number,
    setActiveLink(index: number): void
}

const useActiveLink = create<ActiveLinkProps>((set) => ({
    activeLink: 0,
    setActiveLink: (index) => set({ activeLink: index }),
}))

export default useActiveLink;