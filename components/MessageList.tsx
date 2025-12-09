import React, { useEffect, useRef } from 'react';
import { useChatStore } from '../store/useChatStore';
import {
  MessageBubble,
  LoadingBubble,
  TopicDivider,
  EmptyState,
} from './message';

/** 滚动阈值：距离底部多少像素内视为"在底部" */
const SCROLL_THRESHOLD = 50;

/**
 * 消息列表组件
 * 负责渲染聊天消息、加载状态和空状态
 */
const MessageList: React.FC = () => {
  const { messages, loadingSource } = useChatStore();

  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const isAtBottomRef = useRef(true);

  /** 平滑滚动到底部 */
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  /** 跟踪滚动位置，判断是否需要自动滚动 */
  const handleScroll = () => {
    if (!containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < SCROLL_THRESHOLD;
    isAtBottomRef.current = isAtBottom;
  };

  // 智能滚动：仅当用户在底部时自动滚动
  useEffect(() => {
    if (isAtBottomRef.current) {
      scrollToBottom();
    }
  }, [messages, loadingSource]);

  const isEmpty = messages.length === 0 && !loadingSource;

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className={`flex-1 ${
        isEmpty ? 'overflow-hidden' : 'overflow-y-auto overflow-x-hidden px-4 pt-8 pb-4 space-y-6'
      }`}
    >
      {isEmpty && <EmptyState />}

      {messages.map((msg) => {
        if (msg.type === 'divider') {
          return <TopicDivider key={msg.id} />;
        }
        return <MessageBubble key={msg.id} message={msg} />;
      })}

      {loadingSource === 'user' && <LoadingBubble isUser />}
      {loadingSource === 'model' && <LoadingBubble isUser={false} />}

      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
