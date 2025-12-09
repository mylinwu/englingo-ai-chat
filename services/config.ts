import { AIConfig } from '../types';

/** localStorage 中 AI 配置的键名 */
export const AI_CONFIG_STORAGE_KEY = 'ai-config';

/** 默认 AI 配置（OpenRouter + Gemini 轻量模型） */
export const DEFAULT_CONFIG: AIConfig = {
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: '',
  model: 'google/gemini-2.5-flash-lite',
};

/** 从环境变量读取配置 */
const getEnvConfig = (): AIConfig => ({
  baseURL: process.env.OPENROUTER_BASE_URL || DEFAULT_CONFIG.baseURL,
  apiKey: process.env.OPENROUTER_API_KEY || DEFAULT_CONFIG.apiKey,
  model: process.env.OPENROUTER_MODEL || DEFAULT_CONFIG.model,
});

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

  // 环境变量或默认值
  return getEnvConfig();
};

/**
 * 保存 AI 配置到 localStorage
 */
export const saveAIConfig = (config: AIConfig): void => {
  localStorage.setItem(AI_CONFIG_STORAGE_KEY, JSON.stringify(config));
};
