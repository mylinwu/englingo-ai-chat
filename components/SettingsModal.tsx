import React, { useState, useEffect } from 'react';
import { X, Save, Server, Key, Palette, Sun, Moon, Monitor } from 'lucide-react';
import { useConfigStore } from '../store/useConfigStore';
import { fetchAvailableModels } from '../services/aiService';
import { AIConfig } from '../types';
import { ModelSelector } from './settings';
import { useTheme, type ThemeMode, type ThemeName } from '../theme';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onToast?: (message: string, type: 'success' | 'error' | 'info') => void;
}

/** 主题模式选项 */
const themeModeOptions: { value: ThemeMode; label: string; icon: React.ReactNode }[] = [
  { value: 'light', label: '浅色', icon: <Sun size={16} /> },
  { value: 'dark', label: '深色', icon: <Moon size={16} /> },
  { value: 'system', label: '跟随系统', icon: <Monitor size={16} /> },
];

/** 主题颜色选项 */
const themeColorOptions: { value: ThemeName; label: string; color: string }[] = [
  { value: 'light', label: '微信绿', color: '#07c160' },
  { value: 'blue', label: '天空蓝', color: '#3b82f6' },
  { value: 'purple', label: '优雅紫', color: '#8b5cf6' },
];

/**
 * 设置弹窗组件
 */
const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onToast }) => {
  const { systemInstruction, setSystemInstruction, aiConfig, setAIConfig } = useConfigStore();
  const { mode, themeName, setMode, setTheme } = useTheme();
  
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
    <div className="modal-overlay animate-fade-in">
      <div className="modal-content max-w-lg max-h-[90vh] flex flex-col">
        {/* 头部 */}
        <header className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
          <h2 className="text-lg font-semibold text-text">设置</h2>
          <button
            onClick={onClose}
            className="p-2 text-text-tertiary hover:text-text-secondary rounded-full hover:bg-background-secondary transition-colors"
          >
            <X size={20} />
          </button>
        </header>

        {/* 内容区域 */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* 主题设置 */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-text flex items-center gap-2">
              <Palette size={16} />
              主题设置
            </h3>

            {/* 主题模式 */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                外观模式
              </label>
              <div className="flex gap-2">
                {themeModeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setMode(option.value)}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-lg border transition-colors ${
                      mode === option.value
                        ? 'bg-primary text-text-inverse border-primary'
                        : 'bg-background-secondary text-text-secondary border-border hover:border-primary'
                    }`}
                  >
                    {option.icon}
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 主题颜色 */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                主题颜色
              </label>
              <div className="flex gap-3">
                {themeColorOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setTheme(option.value)}
                    className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg border transition-colors ${
                      themeName === option.value
                        ? 'border-primary bg-primary-light'
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: option.color }}
                    />
                    <span className="text-text-secondary">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <div className="divider" />

          {/* AI 服务配置 */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-text flex items-center gap-2">
              <Server size={16} />
              AI 服务配置
            </h3>

            {/* Base URL */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">
                Base URL
              </label>
              <input
                type="text"
                value={localAIConfig.baseURL}
                onChange={(e) => updateConfig('baseURL', e.target.value)}
                className="input"
                placeholder="https://openrouter.ai/api/v1"
              />
              <p className="text-xs text-warning mt-1">
                ⚠️ 注意：URL 必须以 <code className="bg-warning-light px-1 rounded">/v1</code> 结尾
              </p>
            </div>

            {/* API Key */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5 flex items-center gap-1">
                <Key size={14} />
                API Key
              </label>
              <input
                type="password"
                value={localAIConfig.apiKey}
                onChange={(e) => updateConfig('apiKey', e.target.value)}
                className="input"
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

          <div className="divider" />

          {/* AI 角色设定 */}
          <section>
            <label className="block text-sm font-semibold text-text">
              AI 角色设定
            </label>
            <p className="text-xs text-text-tertiary mb-3">
              定义 AI 的行为方式（如"严格的语法老师"、"轻松的朋友"）
            </p>
            <textarea
              value={localInstruction}
              onChange={(e) => setLocalInstruction(e.target.value)}
              className="input h-36 resize-none"
              placeholder="You are a helpful English tutor..."
            />
          </section>
        </div>

        {/* 底部操作栏 */}
        <footer className="p-4 bg-background-secondary border-t border-border flex justify-end flex-shrink-0">
          <button
            onClick={handleSave}
            className="btn-primary"
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