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
  const activeClass = 'bg-[#07c160] text-white hover:bg-[#06ad56]';
  const disabledClass = 'bg-slate-200 text-slate-400 cursor-not-allowed';

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
