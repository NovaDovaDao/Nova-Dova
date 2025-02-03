import { create } from "zustand";

interface AppState {
  isChatOpen: boolean;
  isNavOpen: boolean;
  isAgentModalOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  setIsNavOpen: (open: boolean) => void;
  setIsAgentModalOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isChatOpen: false,
  isNavOpen: false,
  isAgentModalOpen: false,
  setIsChatOpen: (open) => set({ isChatOpen: open }),
  setIsNavOpen: (open) => set({ isNavOpen: open }),
  setIsAgentModalOpen: (open) => set({ isAgentModalOpen: open }),
}));
