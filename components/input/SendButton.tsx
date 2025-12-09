import React from 'react';
import { Send } from 'lucide-react';

interface SendButtonProps {
  disabled?: boolean;
}

/**
 * 发送按钮组件 - WeUI 风格
 */
const SendButton: React.FC<SendButtonProps> = ({ disabled }) => {
  const baseClass = 'w-[40px] h-[40px] rounded-[6px] transition-colors flex items-center justify-center';
  const activeClass = 'bg-primary text-text-inverse hover:bg-primary-hover';
  const disabledClass = 'bg-background-secondary text-text-tertiary cursor-not-allowed';

  return (
    <button
      type="submit"
      disabled={disabled}
      className={`${baseClass} ${disabled ? disabledClass : activeClass}`}
    >
      <Send size={18} />
    </button>
  );
};

export default SendButton;
