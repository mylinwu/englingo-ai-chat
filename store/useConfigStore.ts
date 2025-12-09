import { create } from 'zustand';
import { AIConfig } from '../types';
import { getAIConfig, saveAIConfig, getSystemInstruction, saveSystemInstruction } from '../services/config';

interface ConfigState {
  systemInstruction: string;
  setSystemInstruction: (instruction: string) => void;

  // AI Config
  aiConfig: AIConfig;
  setAIConfig: (config: AIConfig) => void;
}

export const DEFAULT_INSTRUCTION = "You are a friendly and encouraging English tutor. Keep conversation natural but educational. (Please do not use Markdown in your responses.)";

export const useConfigStore = create<ConfigState>((set) => ({
  systemInstruction: getSystemInstruction() || DEFAULT_INSTRUCTION,
  setSystemInstruction: (instruction) => {
    saveSystemInstruction(instruction);
    set({ systemInstruction: instruction });
  },

  aiConfig: getAIConfig(),
  setAIConfig: (config) => {
    saveAIConfig(config);
    set({ aiConfig: config });
  },
}));
