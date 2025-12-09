import React from 'react';

/**
 * 空状态组件 - 无消息时显示
 */
const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-slate-400">
      <div className="w-16 h-16 bg-slate-200 rounded-lg flex items-center justify-center mb-4">
        <span className="text-2xl">👋</span>
      </div>
      <p>Start a conversation to learn English!</p>
    </div>
  );
};

export default EmptyState;
