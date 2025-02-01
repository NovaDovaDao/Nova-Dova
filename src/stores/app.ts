import { create } from "zustand";

interface AppState {
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isChatOpen: false,
  setIsChatOpen: (open) => set({ isChatOpen: open }),
}));
