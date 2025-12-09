import { create } from 'zustand';
import { Message, AnalysisData } from '../types';

interface ChatState {
  messages: Message[];
  loadingSource: 'user' | 'model' | null;
  addMessage: (message: Message) => void;
  updateMessageAnalysis: (id: string, analysis: AnalysisData) => void;
  setLoadingSource: (source: 'user' | 'model' | null) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  loadingSource: null,
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  updateMessageAnalysis: (id, analysis) =>
    set((state) => ({
      messages: state.messages.map((m) => (m.id === id ? { ...m, analysis } : m)),
    })),
  setLoadingSource: (source) => set({ loadingSource: source }),
}));
