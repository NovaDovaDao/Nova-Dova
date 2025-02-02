import { create } from "zustand";

interface AppState {
  isChatOpen: boolean;
  isAgentModalOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  setIsAgentModalOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isChatOpen: false,
  isAgentModalOpen: false,
  setIsChatOpen: (open) => set({ isChatOpen: open }),
  setIsAgentModalOpen: (open) => set({ isAgentModalOpen: open }),
}));
