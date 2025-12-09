import { create } from 'zustand';

interface ConfigState {
  systemInstruction: string;
  setSystemInstruction: (instruction: string) => void;
}

export const DEFAULT_INSTRUCTION = "You are a friendly and encouraging English tutor. Keep conversation natural but educational.";

export const useConfigStore = create<ConfigState>((set) => ({
  systemInstruction: DEFAULT_INSTRUCTION,
  setSystemInstruction: (instruction) => set({ systemInstruction: instruction }),
}));
