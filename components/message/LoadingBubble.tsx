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
    className={`w-1.5 h-1.5 rounded-full animate-bounce ${isUser ? 'bg-text-inverse/40' : 'bg-text-tertiary'}`}
    style={{ animationDelay: `${delay}ms` }}
  />
);

/**
 * 获取加载气泡样式类名
 */
const getLoadingBubbleClassName = (isUser: boolean): string => {
  const baseClass = 'relative shadow-sm rounded-[6px] px-4 flex items-center gap-1.5 h-10';
  const bgClass = isUser ? 'bg-bubble-user' : 'bg-bubble-ai';

  const arrowBase =
    "before:content-[''] before:absolute before:top-3 before:w-3 before:h-3 before:rotate-45 before:origin-center";
  const arrowClass = isUser
    ? `${arrowBase} before:right-[-6px] before:bg-bubble-user`
    : `${arrowBase} before:left-[-6px] before:bg-bubble-ai`;

  return `${baseClass} ${bgClass} ${arrowClass}`;
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
