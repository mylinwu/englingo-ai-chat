import React from 'react';
import Avatar from './Avatar';

interface LoadingBubbleProps {
  isUser: boolean;
}

/**
 * 加载动画点
 */
const LoadingDot: React.FC<{ delay: number; isUser: boolean }> = ({ delay, isUser }) => (
  <span
    className={`w-1.5 h-1.5 rounded-full animate-bounce ${isUser ? 'bg-green-800/40' : 'bg-slate-400'}`}
    style={{ animationDelay: `${delay}ms` }}
  />
);

/**
 * 获取加载气泡样式类名
 */
const getLoadingBubbleClassName = (isUser: boolean): string => {
  const baseClass = 'relative shadow-sm rounded-[6px] px-4 flex items-center gap-1.5 h-10';
  const bgClass = isUser ? 'bg-[#95EC69]' : 'bg-white';
  
  const arrowClass = isUser
    ? "before:right-[-6px] before:border-l-[#95EC69] before:border-r-0 before:border-y-transparent before:border-l-[6px] before:border-y-[6px]"
    : "before:left-[-6px] before:border-r-white before:border-l-0 before:border-y-transparent before:border-r-[6px] before:border-y-[6px]";

  return `${baseClass} ${bgClass} before:content-[''] before:absolute before:top-3 ${arrowClass}`;
};

/**
 * 加载中气泡组件 - 显示打字动画
 */
const LoadingBubble: React.FC<LoadingBubbleProps> = ({ isUser }) => {
  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[90%] md:max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-3`}>
        <Avatar isUser={isUser} />
        <div className={getLoadingBubbleClassName(isUser)}>
          <LoadingDot delay={0} isUser={isUser} />
          <LoadingDot delay={150} isUser={isUser} />
          <LoadingDot delay={300} isUser={isUser} />
        </div>
      </div>
    </div>
  );
};

export default LoadingBubble;
