import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface TooltipContextType {
  activeTooltipId: string | null;
  setActiveTooltipId: (id: string | null) => void;
}

const TooltipContext = createContext<TooltipContextType>({
  activeTooltipId: null,
  setActiveTooltipId: () => {},
});

export const useTooltip = () => useContext(TooltipContext);

interface TooltipProviderProps {
  children: React.ReactNode;
}

export const TooltipProvider: React.FC<TooltipProviderProps> = ({ children }) => {
  const [activeTooltipId, setActiveTooltipId] = useState<string | null>(null);

  // 点击空白处关闭 tooltip
  const handleGlobalClick = useCallback((e: MouseEvent | TouchEvent) => {
    const target = e.target as HTMLElement;
    // 如果点击的不是 tooltip 相关元素，则关闭
    if (!target.closest('[data-tooltip-trigger]') && !target.closest('[data-tooltip-content]')) {
      setActiveTooltipId(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleGlobalClick);
    document.addEventListener('touchend', handleGlobalClick);
    
    return () => {
      document.removeEventListener('click', handleGlobalClick);
      document.removeEventListener('touchend', handleGlobalClick);
    };
  }, [handleGlobalClick]);

  return (
    <TooltipContext.Provider value={{ activeTooltipId, setActiveTooltipId }}>
      {children}
    </TooltipContext.Provider>
  );
};
