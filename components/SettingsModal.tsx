import React, { useState, useEffect } from 'react';
import { X, Save, Server, Key } from 'lucide-react';
import { useConfigStore } from '../store/useConfigStore';
import { fetchAvailableModels } from '../services/aiService';
import { AIConfig } from '../types';
import { ModelSelector } from './settings';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onToast?: (message: string, type: 'success' | 'error' | 'info') => void;
}

/** 输入框通用样式 */
const INPUT_CLASS = 'w-full px-3 py-2 text-sm text-slate-800 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#07c160] focus:border-transparent outline-none bg-slate-50';

/**
 * 设置弹窗组件
 */
const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onToast }) => {
  const { systemInstruction, setSystemInstruction, aiConfig, setAIConfig } = useConfigStore();
  
  // 本地状态
  const [localInstruction, setLocalInstruction] = useState(systemInstruction);
  const [localAIConfig, setLocalAIConfig] = useState<AIConfig>(aiConfig);
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const [isLoadingModels, setIsLoadingModels] = useState(false);

  // 弹窗打开时同步状态
  useEffect(() => {
    if (isOpen) {
      setLocalInstruction(systemInstruction);
      setLocalAIConfig(aiConfig);
    }
  }, [isOpen, systemInstruction, aiConfig]);

  if (!isOpen) return null;

  /** 获取可用模型列表 */
  const handleFetchModels = async () => {
    if (!localAIConfig.apiKey || !localAIConfig.baseURL) {
      onToast?.('请先填写 API Key 和 Base URL', 'error');
      return;
    }

    setIsLoadingModels(true);
    try {
      // 临时保存配置用于请求
      localStorage.setItem('ai-config', JSON.stringify(localAIConfig));
      const models = await fetchAvailableModels();
      setAvailableModels(models);
      
      if (models.length === 0) {
        onToast?.('未找到可用模型', 'info');
      }
    } catch (error) {
      console.error('Failed to fetch models:', error);
      onToast?.('获取模型列表失败，请检查配置', 'error');
    } finally {
      setIsLoadingModels(false);
    }
  };

  /** 更新配置字段 */
  const updateConfig = <K extends keyof AIConfig>(key: K, value: AIConfig[K]) => {
    setLocalAIConfig((prev) => ({ ...prev, [key]: value }));
  };

  /** 保存设置 */
  const handleSave = () => {
    setSystemInstruction(localInstruction);
    setAIConfig(localAIConfig);
    onToast?.('设置已保存', 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* 头部 */}
        <header className="flex items-center justify-between p-4 border-b border-slate-100 flex-shrink-0">
          <h2 className="text-lg font-semibold text-slate-800">设置</h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X size={20} />
          </button>
        </header>

        {/* 内容区域 */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* AI 服务配置 */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
              <Server size={16} />
              AI 服务配置
            </h3>

            {/* Base URL */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Base URL
              </label>
              <input
                type="text"
                value={localAIConfig.baseURL}
                onChange={(e) => updateConfig('baseURL', e.target.value)}
                className={INPUT_CLASS}
                placeholder="https://openrouter.ai/api/v1"
              />
              <p className="text-xs text-amber-600 mt-1">
                ⚠️ 注意：URL 必须以 <code className="bg-amber-50 px-1 rounded">/v1</code> 结尾
              </p>
            </div>

            {/* API Key */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-1">
                <Key size={14} />
                API Key
              </label>
              <input
                type="password"
                value={localAIConfig.apiKey}
                onChange={(e) => updateConfig('apiKey', e.target.value)}
                className={INPUT_CLASS}
                placeholder="sk-..."
              />
            </div>

            {/* 模型选择 */}
            <ModelSelector
              value={localAIConfig.model}
              onChange={(model) => updateConfig('model', model)}
              availableModels={availableModels}
              isLoading={isLoadingModels}
              onFetchModels={handleFetchModels}
            />
          </section>

          <div className="border-t border-slate-100" />

          {/* AI 角色设定 */}
          <section>
            <label className="block text-sm font-semibold text-slate-800">
              AI 角色设定
            </label>
            <p className="text-xs text-slate-500 mb-3">
              定义 AI 的行为方式（如"严格的语法老师"、"轻松的朋友"）
            </p>
            <textarea
              value={localInstruction}
              onChange={(e) => setLocalInstruction(e.target.value)}
              className={`${INPUT_CLASS} h-36 resize-none`}
              placeholder="You are a helpful English tutor..."
            />
          </section>
        </div>

        {/* 底部操作栏 */}
        <footer className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end flex-shrink-0">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-[#07c160] text-white rounded-lg hover:bg-[#06ad56] font-medium transition-colors text-sm"
          >
            <Save size={16} />
            保存设置
          </button>
        </footer>
      </div>
    </div>
  );
};

export default SettingsModal;