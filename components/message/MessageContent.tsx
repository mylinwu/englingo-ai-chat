import React from 'react';
import { Message } from '../../types';
import GrammarBubble from '../GrammarBubble';

interface MessageContentProps {
  message: Message;
}

/**
 * 消息内容组件 - 渲染分析结果或原始文本
 */
const MessageContent: React.FC<MessageContentProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const analysis = message.analysis;

  // 有分析结果时显示富文本视图
  if (analysis) {
    return (
      <div className="flex flex-col min-w-[200px]">
        {/* 英文分析区域 */}
        <div className="p-3 leading-loose text-text">
          {analysis.s.map((segment, idx) => (
            <React.Fragment key={idx}>
              <GrammarBubble segment={segment} />
              {idx < analysis.s.length - 1 && ' '}
            </React.Fragment>
          ))}
        </div>

        {/* 分隔线 */}
        <div className={`h-px w-full ${isUser ? 'bg-text/10' : 'bg-border'}`} />

        {/* 中文翻译区域 */}
        <div className={`p-3 text-base ${isUser ? 'text-text-inverse' : 'text-text-tertiary'}`}>
          {analysis.zh}
        </div>
      </div>
    );
  }

  // 分析中时显示原始文本
  return (
    <div className={`p-3 leading-relaxed ${isUser ? 'text-text-inverse' : 'text-text'}`}>
      <span className="font-medium text-lg">{message.text}</span>
      <div className="mt-2 flex items-center gap-2 opacity-50">
        <span className="text-xs">Analyzing...</span>
      </div>
    </div>
  );
};

export default MessageContent;
