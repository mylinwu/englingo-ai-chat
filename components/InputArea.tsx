import React, { useState, useCallback } from 'react';
import { useChatStore } from '../store/useChatStore';
import { Toolbar, SendButton } from './input';

interface InputAreaProps {
  onSend: (text: string) => void;
  onNewTopic: () => void;
  onContinue: () => void;
}

/**
 * 输入区组件 - WeUI 风格
 */
const InputArea: React.FC<InputAreaProps> = ({ onSend, onNewTopic, onContinue }) => {
  const [text, setText] = useState('');
  const { loadingSource } = useChatStore();
  
  const isLoading = loadingSource !== null;
  const canSend = text.trim().length > 0 && !isLoading;

  /** 处理表单提交 */
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (canSend) {
        onSend(text.trim());
        setText('');
      }
    },
    [canSend, text, onSend]
  );

  return (
    <div className="bg-background-secondary border-t border-border sticky bottom-0 z-20">
      <Toolbar
        onNewTopic={onNewTopic}
        onContinue={onContinue}
        disabled={isLoading}
      />

      {/* 输入表单 */}
      <div className="px-3 py-2">
        <form onSubmit={handleSubmit} className="flex items-center gap-2 m-0">
          {/* 输入框容器 */}
          <div className="flex-1 bg-background-elevated rounded-[6px] h-[40px] flex items-center shadow-sm">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type in English or Chinese..."
              disabled={isLoading}
              className="w-full px-3 py-2 bg-transparent border-none text-text placeholder:text-text-tertiary focus:outline-none text-base h-full"
            />
          </div>

          <SendButton disabled={!canSend} />
        </form>
      </div>
    </div>
  );
};

export default InputArea;