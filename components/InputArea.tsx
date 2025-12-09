import React, { useState } from 'react';
import { RefreshCcw, MessageSquarePlus, Send } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';

interface InputAreaProps {
  onSend: (text: string) => void;
  onNewTopic: () => void;
  onContinue: () => void;
}

const InputArea: React.FC<InputAreaProps> = ({ onSend, onNewTopic, onContinue }) => {
  const [text, setText] = useState('');
  const { loadingSource } = useChatStore();
  const isLoading = loadingSource !== null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onSend(text.trim());
      setText('');
    }
  };

  return (
    <div className="bg-[#f7f7f7] border-t border-[#dcdcdc] sticky bottom-0 z-20">
      {/* Toolbar */}
      <div className="flex items-center gap-3 px-4 py-2 border-b border-[#ececec]">
        <button
          onClick={onNewTopic}
          disabled={isLoading}
          className="flex items-center gap-1.5 px-3 py-1 text-xs text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors disabled:opacity-50"
        >
          <RefreshCcw size={12} />
          New Chat
        </button>
        <button
          onClick={onContinue}
          disabled={isLoading}
          className="flex items-center gap-1.5 px-3 py-1 text-xs text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors disabled:opacity-50"
        >
          <MessageSquarePlus size={12} />
          Continue
        </button>
      </div>

      {/* Input Form WeUI style */}
      <div className="px-3 py-2">
        <form onSubmit={handleSubmit} className="flex items-center gap-2 m-0">
          <div className="flex-1 bg-white rounded-[6px] h-[40px] flex items-center shadow-sm">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type in English or Chinese..."
              disabled={isLoading}
              className="w-full px-3 py-2 bg-transparent border-none text-slate-800 placeholder:text-slate-400 focus:outline-none text-base h-full"
            />
          </div>
          
          <button
            type="submit"
            disabled={!text.trim() || isLoading}
            className={`
              w-[40px] h-[40px] rounded-[6px] transition-colors flex items-center justify-center
              ${text.trim() && !isLoading 
                ? 'bg-[#07c160] text-white hover:bg-[#06ad56]' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }
            `}
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputArea;