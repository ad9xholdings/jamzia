import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  route: string;
  platformName: string;
  open: (route: string, platformName: string) => void;
  close: () => void;
}

export const useComingSoonStore = create<ModalState>((set) => ({
  isOpen: false,
  route: '',
  platformName: '',
  open: (route, platformName) => set({ isOpen: true, route, platformName }),
  close: () => set({ isOpen: false, route: '', platformName: '' }),
}));
