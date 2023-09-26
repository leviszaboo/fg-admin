import { create } from "zustand";

interface DeletePostDialogStore {
  dialogOpen: boolean,
  setDialogOpen(value: boolean): void
}

const useDeletePostDialogStore= create<DeletePostDialogStore>((set) => ({
  dialogOpen: false,
  setDialogOpen: (value) => set({ dialogOpen: value }),
}))

export default useDeletePostDialogStore;