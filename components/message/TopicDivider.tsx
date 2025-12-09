import React from 'react';

/**
 * 话题分隔线组件
 */
const TopicDivider: React.FC = () => {
  return (
    <div className="flex items-center justify-center my-6 opacity-70">
      <div className="h-px bg-slate-300 w-16 md:w-24" />
      <span className="mx-3 text-xs text-slate-500 font-medium">新话题</span>
      <div className="h-px bg-slate-300 w-16 md:w-24" />
    </div>
  );
};

export default TopicDivider;
