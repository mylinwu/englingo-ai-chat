import React, { useState, useCallback } from 'react';
import { Settings } from 'lucide-react';
import MessageList from './components/MessageList';
import InputArea from './components/InputArea';
import SettingsModal from './components/SettingsModal';
import { ToastContainer, useToast } from './components/Toast';
import { AlertDialog } from './components/Alert';
import { TooltipProvider } from './components/TooltipContext';
import { Message } from './types';
import { translateTextToEnglish, generateChatResponse, analyzeText } from './services/aiService';
import { useChatStore } from './store/useChatStore';
import { useConfigStore } from './store/useConfigStore';

const App: React.FC = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [alertState, setAlertState] = useState<{
    isOpen: boolean;
    type: 'error' | 'warning' | 'info' | 'success';
    title: string;
    message: string;
  }>({ isOpen: false, type: 'error', title: '', message: '' });
  
  const { toasts, addToast, removeToast } = useToast();
  const { addMessage, updateMessageAnalysis, setLoadingSource } = useChatStore();
  const { systemInstruction } = useConfigStore();

  const showAlert = (type: 'error' | 'warning' | 'info' | 'success', title: string, message: string) => {
    setAlertState({ isOpen: true, type, title, message });
  };

  const closeAlert = () => {
    setAlertState(prev => ({ ...prev, isOpen: false }));
  };

  const handleSend = useCallback(async (text: string, isHidden: boolean = false) => {
    // 1. Start User Turn
    setLoadingSource(isHidden ? 'model' : 'user');
    
    try {
      // Step A: Translate User Input (if needed)
      let englishInput = text;
      if (/[\u4e00-\u9fa5]/.test(text)) {
         englishInput = await translateTextToEnglish(text);
      }

      // Step B: Display User Message (if not hidden)
      if (!isHidden) {
        const userId = Date.now().toString();
        const userMsg: Message = {
          id: userId,
          role: 'user',
          type: 'chat',
          text: englishInput, // Show text immediately
          analysis: undefined // Analysis loads later
        };
        addMessage(userMsg);
        
        // Async: Trigger analysis for user message independently
        analyzeText(englishInput).then(analysis => {
           updateMessageAnalysis(userId, analysis);
        });

        // Switch visual loading state to AI
        setLoadingSource('model');
      }

      // Step C: Prepare Context for Chat
      // We need to fetch the current messages from the store to build the history.
      const currentMessages = useChatStore.getState().messages; 

      // CRITICAL FIX: 
      // If we just added the user message to the store (isHidden === false), it is now the last item in 'currentMessages'.
      // However, 'generateChatResponse' service manually appends 'englishInput' to the API payload.
      // Therefore, we must EXCLUDE the message we just added from 'historyForApi' to prevent sending the user's input twice.
      
      let historyForApi = currentMessages;
      if (!isHidden) {
         historyForApi = currentMessages.slice(0, -1);
      }

      // Filter by the last 'divider' to support "New Topic" functionality
      const lastDividerIndex = historyForApi.map(m => m.type).lastIndexOf('divider');
      const relevantHistory = lastDividerIndex === -1 ? historyForApi : historyForApi.slice(lastDividerIndex + 1);
      
      // Step D: Call AI Chat (Standard Text Response)
      const aiTextResponse = await generateChatResponse(
        relevantHistory, 
        englishInput,
        systemInstruction
      );

      // Step E: Display AI Message
      const aiId = (Date.now() + 1).toString();
      const aiMsg: Message = {
        id: aiId,
        role: 'model',
        type: 'chat',
        text: aiTextResponse,
        analysis: undefined
      };

      addMessage(aiMsg);
      setLoadingSource(null);

      // Async: Trigger analysis for AI message independently
      analyzeText(aiTextResponse).then(analysis => {
        updateMessageAnalysis(aiId, analysis);
      });

    } catch (error) {
      console.error("Error in chat flow:", error);
      const errorMessage = error instanceof Error ? error.message : '未知错误';
      if (errorMessage.includes('API Key')) {
        showAlert('warning', '配置缺失', '请先在设置中配置 API Key');
      } else {
        showAlert('error', '请求失败', `发生错误: ${errorMessage}`);
      }
      setLoadingSource(null);
    }
  }, [systemInstruction, addMessage, updateMessageAnalysis, setLoadingSource]);

  const handleNewTopic = useCallback(() => {
    // Append a divider
    const dividerMsg: Message = {
      id: Date.now().toString(),
      role: 'system',
      type: 'divider',
      text: ''
    };
    addMessage(dividerMsg);
  }, [addMessage]);

  const handleContinue = useCallback(async () => {
    // Check if there is anything to continue from
    const currentMessages = useChatStore.getState().messages;
    const lastDividerIndex = currentMessages.map(m => m.type).lastIndexOf('divider');
    const activeMessages = lastDividerIndex === -1 ? currentMessages : currentMessages.slice(lastDividerIndex + 1);

    if (activeMessages.length === 0) return;
    
    // Send "继续" but hide it from the UI
    await handleSend("继续", true);
  }, [handleSend]);

  return (
    <TooltipProvider>
    <div className="flex flex-col h-screen bg-background font-sans">
      {/* Header - WeUIish style */}
      <header className="flex-none bg-background border-b border-border-light px-4 py-3 flex items-center justify-between z-10">
        <div className="flex items-center gap-2 text-text">
          <span className="font-medium text-lg tracking-tight">EngLingo AI</span>
        </div>
        <button 
          onClick={() => setIsSettingsOpen(true)}
          className="p-2 text-text-secondary hover:bg-background-secondary rounded-full transition-colors"
        >
          <Settings size={20} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-0 mx-auto w-full">
        <MessageList />
        <InputArea 
          onSend={(text) => handleSend(text, false)} 
          onNewTopic={handleNewTopic} 
          onContinue={handleContinue}
        />
      </main>

      {/* Modals */}
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
        onToast={addToast}
      />

      {/* Toast Container */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Alert Dialog */}
      <AlertDialog
        isOpen={alertState.isOpen}
        type={alertState.type}
        title={alertState.title}
        message={alertState.message}
        onConfirm={closeAlert}
      />
    </div>
    </TooltipProvider>
  );
};

export default App;