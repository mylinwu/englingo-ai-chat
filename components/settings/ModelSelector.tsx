import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, RefreshCw, Bot, Search } from 'lucide-react';

interface ModelSelectorProps {
  value: string;
  onChange: (model: string) => void;
  availableModels: string[];
  isLoading: boolean;
  onFetchModels: () => void;
}

/**
 * 模型选择器组件
 * 支持手动输入和从列表选择，带搜索功能
 */
const ModelSelector: React.FC<ModelSelectorProps> = ({
  value,
  onChange,
  availableModels,
  isLoading,
  onFetchModels,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // 点击外部关闭下拉框
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
        setSearchQuery('');
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showDropdown]);

  // 下拉框打开时聚焦搜索框
  useEffect(() => {
    if (showDropdown && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showDropdown]);

  // 过滤模型列表
  const filteredModels = useMemo(() => {
    if (!searchQuery.trim()) return availableModels;
    const query = searchQuery.toLowerCase();
    return availableModels.filter((model) => model.toLowerCase().includes(query));
  }, [availableModels, searchQuery]);

  const handleSelectModel = (model: string) => {
    onChange(model);
    setShowDropdown(false);
    setSearchQuery('');
  };

  const handleToggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-1">
        <Bot size={14} />
        模型
      </label>

      <div className="flex gap-2">
        <div className="relative flex-1" ref={dropdownRef}>
          {/* 模型输入框 */}
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 text-sm text-slate-800 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#07c160] focus:border-transparent outline-none bg-slate-50 pr-8"
            placeholder="openai/gpt-4o-mini"
          />

          {/* 下拉箭头按钮 */}
          {availableModels.length > 0 && (
            <button
              onClick={handleToggleDropdown}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <ChevronDown
                size={16}
                className={showDropdown ? 'rotate-180 transition-transform' : 'transition-transform'}
              />
            </button>
          )}

          {/* 下拉列表 */}
          {showDropdown && availableModels.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden">
              {/* 搜索框 */}
              <div className="p-2 border-b border-slate-100 sticky top-0 bg-white">
                <div className="relative">
                  <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="搜索模型..."
                    className="w-full pl-8 pr-3 py-1.5 text-sm text-slate-800 border border-slate-200 rounded-md focus:ring-1 focus:ring-[#07c160] focus:border-[#07c160] outline-none bg-slate-50"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>

              {/* 模型列表 */}
              <div className="max-h-48 overflow-y-auto">
                {filteredModels.length > 0 ? (
                  filteredModels.map((model) => (
                    <button
                      key={model}
                      onClick={() => handleSelectModel(model)}
                      className={`w-full px-3 py-2 text-left text-sm hover:bg-slate-50 ${
                        model === value ? 'bg-[#07c160]/10 text-[#07c160]' : 'text-slate-700'
                      }`}
                    >
                      {model}
                    </button>
                  ))
                ) : (
                  <div className="px-3 py-4 text-center text-sm text-slate-400">
                    未找到匹配的模型
                  </div>
                )}
              </div>

              {/* 搜索结果计数 */}
              {searchQuery && (
                <div className="px-3 py-1.5 text-xs text-slate-400 border-t border-slate-100 bg-slate-50">
                  找到 {filteredModels.length} / {availableModels.length} 个模型
                </div>
              )}
            </div>
          )}
        </div>

        {/* 获取模型按钮 */}
        <button
          onClick={onFetchModels}
          disabled={isLoading}
          className="px-3 py-2 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50 flex items-center gap-1"
        >
          <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
          获取
        </button>
      </div>

      <p className="text-xs text-slate-500 mt-1">
        可手动输入或点击获取按钮加载可用模型
      </p>
    </div>
  );
};

export default ModelSelector;
