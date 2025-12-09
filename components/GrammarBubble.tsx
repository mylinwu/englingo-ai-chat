import React, { useId, useCallback } from 'react';
import { AnalysisSegment, GrammarType } from '../types';
import { useTooltip } from './TooltipContext';

interface GrammarBubbleProps {
  segment: AnalysisSegment;
}

/** 语法成分颜色映射 */
const GRAMMAR_COLOR_MAP: Record<GrammarType, string> = {
  [GrammarType.SUBJECT]: 'text-rose-900 bg-rose-200 border-rose-200 hover:bg-rose-200',      // 主语 - 柔和珊瑚红
  [GrammarType.PREDICATE]: 'text-amber-900 bg-amber-100 border-amber-200 hover:bg-amber-200', // 谓语 - 奶油杏色
  [GrammarType.OBJECT]: 'text-sky-900 bg-sky-100 border-sky-200 hover:bg-sky-200',           // 宾语 - 天空蓝
  [GrammarType.ATTRIBUTE]: 'text-emerald-900 bg-emerald-100 border-emerald-200 hover:bg-emerald-200', // 定语 - 薄荷绿
  [GrammarType.ADVERBIAL]: 'text-violet-900 bg-violet-100 border-violet-200 hover:bg-violet-200',     // 状语 - 浅薰衣草紫
  [GrammarType.COMPLEMENT]: 'text-pink-900 bg-pink-50 border-pink-200 hover:bg-pink-200',    // 补语 - 马卡龙粉
  [GrammarType.OTHER]: 'text-slate-900 bg-slate-100 border-slate-200 hover:bg-slate-200',    // 其他 - 柔和中性灰
};

/** 默认颜色样式 */
const DEFAULT_COLOR = GRAMMAR_COLOR_MAP[GrammarType.OTHER];

/**
 * 获取语法成分对应的颜色类名
 */
const getColorClasses = (type: GrammarType): string => {
  return GRAMMAR_COLOR_MAP[type] || DEFAULT_COLOR;
};

const GrammarBubble: React.FC<GrammarBubbleProps> = ({ segment }) => {
  const colorClass = getColorClasses(segment.ty);
  const tooltipId = useId();
  const { activeTooltipId, setActiveTooltipId } = useTooltip();
  
  const isActive = activeTooltipId === tooltipId;

  // 处理点击/触摸事件（移动端）
  const handleClick = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    // 切换当前 tooltip 的显示状态
    setActiveTooltipId(isActive ? null : tooltipId);
  }, [isActive, tooltipId, setActiveTooltipId]);

  return (
    <span 
      className={`group relative inline-block cursor-help border-b-2 border-dotted mx-0.5 my-0.5 px-1 rounded transition-colors duration-200 ${colorClass}`}
      onClick={handleClick}
      data-tooltip-trigger
    >
      {/* The Text */}
      <span className="font-medium text-lg">{segment.t}</span>
      
      {/* The Tooltip (Bubble) - 支持 hover（桌面端）和点击（移动端） */}
      <span 
        className={`pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[240px] px-3 py-2 bg-gray-800/95 backdrop-blur-sm text-white text-xs rounded transition-opacity z-50 shadow-xl ${
          isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
        data-tooltip-content
      >
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