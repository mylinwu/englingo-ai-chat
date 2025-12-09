import React from 'react';
import { AnalysisSegment, GrammarType } from '../types';

interface GrammarBubbleProps {
  segment: AnalysisSegment;
}

const getColorClasses = (type: GrammarType): string => {
  switch (type) {
    case GrammarType.SUBJECT: // 主语 - Red
      return 'text-red-900 bg-red-100 border-red-300 hover:bg-red-200';
    case GrammarType.PREDICATE: // 谓语 - Amber (Yellow)
      return 'text-amber-900 bg-amber-100 border-amber-300 hover:bg-amber-200';
    case GrammarType.OBJECT: // 宾语 - Blue
      return 'text-blue-900 bg-blue-100 border-blue-300 hover:bg-blue-200';
    case GrammarType.ATTRIBUTE: // 定语 - Emerald (Green)
      return 'text-emerald-900 bg-emerald-100 border-emerald-300 hover:bg-emerald-200';
    case GrammarType.ADVERBIAL: // 状语 - Violet (Purple)
      return 'text-violet-900 bg-violet-100 border-violet-300 hover:bg-violet-200';
    case GrammarType.COMPLEMENT: // 补语 - Pink (Distinct from Red/Purple)
      return 'text-pink-900 bg-pink-100 border-pink-300 hover:bg-pink-200';
    default: // Other - Slate
      return 'text-slate-700 bg-slate-100 border-slate-300 hover:bg-slate-200';
  }
};

const GrammarBubble: React.FC<GrammarBubbleProps> = ({ segment }) => {
  const colorClass = getColorClasses(segment.ty);

  return (
    <span className={`group relative inline-block cursor-help border-b-2 border-dotted mx-0.5 my-0.5 px-1 rounded transition-colors duration-200 ${colorClass}`}>
      {/* The Text */}
      <span className="font-medium text-lg">{segment.t}</span>
      
      {/* The Tooltip (Bubble) */}
      <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[240px] px-3 py-2 bg-gray-800/95 backdrop-blur-sm text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-xl">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 leading-snug">
          <span className="font-bold text-amber-300 whitespace-nowrap">{segment.lbl}</span>
          {segment.pos && (
            <span className="text-cyan-300 font-medium whitespace-nowrap">{segment.pos}</span>
          )}
          {segment.zh && (
            <>
              {/* Independent Separator */}
              <span className="text-gray-500 font-light select-none">|</span>
              {/* Translation with forced wrap */}
              <span className="text-gray-200 break-all">{segment.zh}</span>
            </>
          )}
        </div>
        
        {/* Triangle arrow */}
        <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800/95"></span>
      </span>
    </span>
  );
};

export default GrammarBubble;