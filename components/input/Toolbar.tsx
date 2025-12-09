import React from 'react';
import { ArrowRightCircle, MessageSquarePlus } from 'lucide-react';

interface ToolbarProps {
  onNewTopic: () => void;
  onContinue: () => void;
  disabled?: boolean;
}

interface ToolbarButtonProps {
  onClick: () => void;
  disabled?: boolean;
  icon: React.ReactNode;
  label: string;
}

/**
 * 工具栏按钮组件
 */
const ToolbarButton: React.FC<ToolbarButtonProps> = ({ onClick, disabled, icon, label }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="flex items-center gap-1.5 px-3 py-1 text-xs text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors disabled:opacity-50"
  >
    {icon}
    {label}
  </button>
);

/**
 * 输入区工具栏组件
 */
const Toolbar: React.FC<ToolbarProps> = ({ onNewTopic, onContinue, disabled }) => {
  return (
    <div className="flex items-center gap-3 px-4 py-2 border-b border-[#ececec]">
      <ToolbarButton
        onClick={onNewTopic}
        disabled={disabled}
        icon={<MessageSquarePlus size={12} />}
        label="New Chat"
      />
      <ToolbarButton
        onClick={onContinue}
        disabled={disabled}
        icon={<ArrowRightCircle size={12} />}
        label="Continue"
      />
    </div>
  );
};

export default Toolbar;
