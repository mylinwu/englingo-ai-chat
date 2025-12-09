import { create } from 'zustand';
import { AIConfig } from '../types';

interface ConfigState {
  systemInstruction: string;
  setSystemInstruction: (instruction: string) => void;
  
  // AI Config
  aiConfig: AIConfig;
  setAIConfig: (config: AIConfig) => void;
}

export const DEFAULT_INSTRUCTION = "You are a friendly and encouraging English tutor. Keep conversation natural but educational. (Please do not use Markdown in your responses.)";

// Load AI config from localStorage or use defaults
const loadAIConfig = (): AIConfig => {
  const stored = localStorage.getItem('ai-config');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // Fall through to defaults
    }
  }
  return {
    baseURL: process.env.OPENRPUTER_BASE_URL || 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENRPUTER_API_KEY || '',
    model: process.env.OPENRPUTER_MODEL || 'openai/gpt-4o-mini',
  };
};

// Save AI config to localStorage
const saveAIConfig = (config: AIConfig) => {
  localStorage.setItem('ai-config', JSON.stringify(config));
};

export const useConfigStore = create<ConfigState>((set) => ({
  systemInstruction: DEFAULT_INSTRUCTION,
  setSystemInstruction: (instruction) => set({ systemInstruction: instruction }),
  
  aiConfig: loadAIConfig(),
  setAIConfig: (config) => {
    saveAIConfig(config);
    set({ aiConfig: config });
  },
}));
