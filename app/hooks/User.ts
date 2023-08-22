import { create } from "zustand";

interface UserState {
    isUser: boolean;
    onSignIn: () => void;
    onSignOut: () => void;
}

const toggleUserState = create<UserState>((set) => ({
    isUser: false,
    onSignIn: () => set({ isUser: true }),
    onSignOut: () => set({ isUser: false }),
}))

export default toggleUserState;