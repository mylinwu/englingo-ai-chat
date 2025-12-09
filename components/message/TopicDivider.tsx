import React from 'react';

/**
 * 话题分隔线组件
 */
const TopicDivider: React.FC = () => {
  return (
    <div className="flex items-center justify-center my-12 opacity-70">
      <div className="h-px bg-border w-16 md:w-24" />
      <span className="mx-3 text-xs text-text-tertiary font-medium">新话题</span>
      <div className="h-px bg-border w-16 md:w-24" />
    </div>
  );
};

export default TopicDivider;
