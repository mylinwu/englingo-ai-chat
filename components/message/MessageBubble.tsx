import React from 'react';
import { Message } from '../../types';
import Avatar from './Avatar';
import MessageContent from './MessageContent';

interface MessageBubbleProps {
  message: Message;
}

/**
 * 获取气泡样式类名
 */
const getBubbleClassName = (isUser: boolean): string => {
  const baseClass = 'relative shadow-sm rounded-[6px] text-base';
  const bgClass = isUser ? 'bg-bubble-user' : 'bg-bubble-ai';
  
  // WeUI 风格的三角箭头 - 使用 CSS 变量
  const arrowClass = isUser
    ? "before:right-[-6px] before:border-l-bubble-user before:border-r-0 before:border-y-transparent before:border-l-[6px] before:border-y-[6px]"
    : "before:left-[-6px] before:border-r-bubble-ai before:border-l-0 before:border-y-transparent before:border-r-[6px] before:border-y-[6px]";

  return `${baseClass} ${bgClass} before:content-[''] before:absolute before:top-3 ${arrowClass}`;
};

/**
 * 消息气泡组件 - 包含头像和消息内容
 */
const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[90%] md:max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-3`}>
        <Avatar isUser={isUser} />
        <div className={getBubbleClassName(isUser)}>
          <MessageContent message={message} />
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
