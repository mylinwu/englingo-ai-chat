import { AIConfig } from '../types';

/** localStorage 中 AI 配置的键名 */
const AI_CONFIG_STORAGE_KEY = 'ai-config';

/** 默认 AI 配置 */
const DEFAULT_CONFIG: AIConfig = {
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: '',
  model: 'openai/gpt-4o-mini',
};

/**
 * 从 localStorage 或环境变量获取 AI 配置
 */
export const getAIConfig = (): AIConfig => {
  // 优先从 localStorage 获取运行时配置
  const stored = localStorage.getItem(AI_CONFIG_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // 解析失败，使用默认配置
    }
  }

  // 使用环境变量或默认值
  return {
    baseURL: process.env.OPENRPUTER_BASE_URL || DEFAULT_CONFIG.baseURL,
    apiKey: process.env.OPENRPUTER_API_KEY || DEFAULT_CONFIG.apiKey,
    model: process.env.OPENRPUTER_MODEL || DEFAULT_CONFIG.model,
  };
};

/**
 * 保存 AI 配置到 localStorage
 */
export const saveAIConfig = (config: AIConfig): void => {
  localStorage.setItem(AI_CONFIG_STORAGE_KEY, JSON.stringify(config));
};
