import React, { useEffect, useRef } from 'react';
import { Message } from '../types';
import GrammarBubble from './GrammarBubble';
import { useChatStore } from '../store/useChatStore';

const MessageList: React.FC = () => {
  const { messages, loadingSource } = useChatStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const isAtBottomRef = useRef(true);

  // Helper to scroll to bottom
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Track scroll position to determine if we should auto-scroll
  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    // User is considered "at bottom" if they are within 50px of the bottom
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
    isAtBottomRef.current = isAtBottom;
  };

  // Smart Scroll Effect
  useEffect(() => {
    // Only scroll to bottom if the user was already at the bottom.
    // This prevents jumping when analysis loads while the user is reading history.
    if (isAtBottomRef.current) {
      scrollToBottom();
    }
  }, [messages, loadingSource]); 

  const renderContent = (msg: Message) => {
    const isUser = msg.role === 'user';
    const data = msg.analysis;

    // If analysis is ready, show rich view
    if (data) {
      return (
        <div className="flex flex-col min-w-[200px]">
          {/* Top: English Analysis */}
          <div className="p-3 leading-loose text-slate-900">
            {data.s.map((seg, idx) => (
              <React.Fragment key={idx}>
                <GrammarBubble segment={seg} />
                {idx < data.s.length - 1 && ' '} 
              </React.Fragment>
            ))}
          </div>

          {/* Divider */}
          <div className={`h-px w-full ${isUser ? 'bg-slate-900/10' : 'bg-slate-100'}`}></div>

          {/* Bottom: Chinese Translation */}
          <div className={`p-3 text-base ${isUser ? 'text-slate-700' : 'text-slate-500'}`}>
            {data.zh}
          </div>
        </div>
      );
    }

    // Fallback: Show raw text while analyzing
    return (
      <div className="p-3 leading-relaxed">
        <span className="font-medium text-lg">{msg.text}</span>
        <div className="mt-2 flex items-center gap-2 opacity-50">
           <span className="text-xs">Analyzing...</span>
        </div>
      </div>
    );
  };

  const renderLoadingBubble = (isUser: boolean) => (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[90%] md:max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-3`}>
        {/* Avatar */}
        <div className="flex-shrink-0 w-10 h-10 rounded-[4px] overflow-hidden shadow-sm">
          {isUser ? (
            <div className="w-full h-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm">
              ME
            </div>
          ) : (
            <div className="w-full h-full bg-white flex items-center justify-center">
              <img src="https://api.dicebear.com/7.x/bottts/svg?seed=EngLingo" alt="AI" className="w-8 h-8" />
            </div>
          )}
        </div>

        {/* Bubble */}
        <div 
          className={`
            relative shadow-sm rounded-[6px] px-4 flex items-center gap-1.5 h-10
            ${isUser ? 'bg-[#95EC69]' : 'bg-white'}
            before:content-[''] before:absolute before:top-3 
            ${isUser 
              ? 'before:right-[-6px] before:border-l-[#95EC69] before:border-r-0 before:border-y-transparent before:border-l-[6px] before:border-y-[6px]' 
              : 'before:left-[-6px] before:border-r-white before:border-l-0 before:border-y-transparent before:border-r-[6px] before:border-y-[6px]'
            }
          `}
        >
            <span className={`w-1.5 h-1.5 rounded-full animate-bounce ${isUser ? 'bg-green-800/40' : 'bg-slate-400'}`} style={{ animationDelay: '0ms' }}></span>
            <span className={`w-1.5 h-1.5 rounded-full animate-bounce ${isUser ? 'bg-green-800/40' : 'bg-slate-400'}`} style={{ animationDelay: '150ms' }}></span>
            <span className={`w-1.5 h-1.5 rounded-full animate-bounce ${isUser ? 'bg-green-800/40' : 'bg-slate-400'}`} style={{ animationDelay: '300ms' }}></span>
        </div>
      </div>
    </div>
  );

  return (
    <div 
      ref={containerRef}
      onScroll={handleScroll}
      className="flex-1 overflow-y-auto px-4 pt-8 pb-4 space-y-6"
    >
      {messages.length === 0 && !loadingSource && (
        <div className="flex flex-col items-center justify-center h-full text-slate-400">
          <div className="w-16 h-16 bg-slate-200 rounded-lg flex items-center justify-center mb-4">
             <span className="text-2xl">👋</span>
          </div>
          <p>Start a conversation to learn English!</p>
        </div>
      )}

      {messages.map((msg) => {
        if (msg.type === 'divider') {
          return (
            <div key={msg.id} className="flex items-center justify-center my-6 opacity-70">
               <div className="h-px bg-slate-300 w-16 md:w-24"></div>
               <span className="mx-3 text-xs text-slate-500 font-medium">新话题</span>
               <div className="h-px bg-slate-300 w-16 md:w-24"></div>
            </div>
          );
        }

        const isUser = msg.role === 'user';
        return (
          <div
            key={msg.id}
            className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[90%] md:max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-3`}>
              
              {/* Avatar - WeUI style: Square with small radius */}
              <div className="flex-shrink-0 w-10 h-10 rounded-[4px] overflow-hidden shadow-sm">
                {isUser ? (
                  <div className="w-full h-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                    ME
                  </div>
                ) : (
                  <div className="w-full h-full bg-white flex items-center justify-center">
                    <img src="https://api.dicebear.com/7.x/bottts/svg?seed=EngLingo" alt="AI" className="w-8 h-8" />
                  </div>
                )}
              </div>

              {/* Content Bubble */}
              <div 
                className={`
                  relative shadow-sm rounded-[6px] text-base
                  ${isUser ? 'bg-[#95EC69]' : 'bg-white'}
                  before:content-[''] before:absolute before:top-3 
                  ${isUser 
                    ? 'before:right-[-6px] before:border-l-[#95EC69] before:border-r-0 before:border-y-transparent before:border-l-[6px] before:border-y-[6px]' 
                    : 'before:left-[-6px] before:border-r-white before:border-l-0 before:border-y-transparent before:border-r-[6px] before:border-y-[6px]'
                  }
                `}
              >
                {renderContent(msg)}
              </div>
            </div>
          </div>
        );
      })}

      {loadingSource === 'user' && renderLoadingBubble(true)}
      {loadingSource === 'model' && renderLoadingBubble(false)}
      
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;