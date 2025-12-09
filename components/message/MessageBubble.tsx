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

  // 改用旋转方块形成箭头，避免边缘锯齿和白边
  const arrowBase =
    "before:content-[''] before:absolute before:top-3 before:w-3 before:h-3 before:rotate-45 before:origin-center";
  const arrowClass = isUser
    ? `${arrowBase} before:right-[-6px] before:bg-bubble-user`
    : `${arrowBase} before:left-[-6px] before:bg-bubble-ai`;

  return `${baseClass} ${bgClass} ${arrowClass}`;
};

/**
 * 消息气泡组件 - 包含头像和消息内容
 */
const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[100%] md:max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-3`}>
        <Avatar isUser={isUser} />
        <div className={getBubbleClassName(isUser)}>
          <MessageContent message={message} />
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
