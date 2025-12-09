import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { generateText } from 'ai';
import { AnalysisData, GrammarType, Message, AIConfig } from '../types';
import { getAIConfig } from './config';
import { cleanJsonString } from './utils';
import { TRANSLATE_TO_ENGLISH_PROMPT, ANALYZE_TEXT_PROMPT } from './prompts';

// ============================================================================
// AI Client
// ============================================================================

/**
 * 创建 AI 客户端
 */
const createAIClient = (config?: AIConfig) => {
  const aiConfig = config || getAIConfig();
  return createOpenRouter({
    baseURL: aiConfig.baseURL,
    apiKey: aiConfig.apiKey,
  });
};

/**
 * 验证 API Key 是否存在
 */
const validateApiKey = (config: AIConfig): void => {
  if (!config.apiKey) {
    throw new Error('API Key missing');
  }
};

// ============================================================================
// Model Management
// ============================================================================

/** 模型过滤关键词 - 包含这些关键词的模型会被保留 */
const MODEL_INCLUDE_KEYWORDS = ['gpt', 'claude', 'gemini', 'deepseek', 'qwen'];

/** 模型排除关键词 - 包含这些关键词的模型会被排除 */
const MODEL_EXCLUDE_KEYWORDS = ['thinking', 'embedding'];

/**
 * 过滤模型列表
 */
const filterModels = (models: Array<{ id: string }>): string[] => {
  return models
    .map((m) => m.id)
    .filter((id) => {
      const lowerId = id.toLowerCase();
      
      // 排除包含排除关键词的模型
      if (MODEL_EXCLUDE_KEYWORDS.some((kw) => lowerId.includes(kw))) {
        return false;
      }
      
      // 保留包含包含关键词的模型
      return MODEL_INCLUDE_KEYWORDS.some((kw) => lowerId.includes(kw));
    })
    .sort();
};

/**
 * 获取可用模型列表
 */
export const fetchAvailableModels = async (): Promise<string[]> => {
  const config = getAIConfig();
  validateApiKey(config);

  const response = await fetch(`${config.baseURL}/models`, {
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch models: ${response.statusText}`);
  }

  const data = await response.json();
  return filterModels(data.data || []);
};

// ============================================================================
// Translation & Analysis
// ============================================================================

/**
 * 将文本翻译为英文
 */
export const translateTextToEnglish = async (text: string): Promise<string> => {
  const config = getAIConfig();
  validateApiKey(config);

  const client = createAIClient(config);

  const { text: result } = await generateText({
    model: client(config.model),
    prompt: TRANSLATE_TO_ENGLISH_PROMPT(text),
  });

  return result?.trim() || text;
};

/**
 * 分析英文句子结构
 */
export const analyzeText = async (text: string): Promise<AnalysisData> => {
  const config = getAIConfig();
  validateApiKey(config);

  const client = createAIClient(config);

  const { text: result } = await generateText({
    model: client(config.model),
    prompt: ANALYZE_TEXT_PROMPT(text),
    temperature: 0.1,
  });

  const jsonText = cleanJsonString(result || '{}');
  
  try {
    return JSON.parse(jsonText) as AnalysisData;
  } catch (error) {
    console.error('Failed to parse analysis response:', error);
    
    // 解析失败时返回降级结果
    return {
      zh: 'Translation unavailable',
      s: [{ t: text, ty: GrammarType.OTHER, lbl: 'Text', pos: 'Unknown', zh: '' }],
    };
  }
};

// ============================================================================
// Chat
// ============================================================================

/** 聊天消息格式 */
type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

/**
 * 构建聊天消息列表
 */
const buildChatMessages = (
  history: Message[],
  userInput: string,
  systemInstruction: string
): ChatMessage[] => {
  const messages: ChatMessage[] = [];

  // 添加系统指令
  if (systemInstruction) {
    messages.push({ role: 'system', content: systemInstruction });
  }

  // 添加历史消息（排除分隔符）
  history
    .filter((msg) => msg.type !== 'divider')
    .forEach((msg) => {
      messages.push({
        role: msg.role === 'model' ? 'assistant' : 'user',
        content: msg.text,
      });
    });

  // 添加当前用户输入
  messages.push({ role: 'user', content: userInput });

  return messages;
};

/**
 * 生成聊天回复
 */
export const generateChatResponse = async (
  history: Message[],
  userInput: string,
  systemInstruction: string
): Promise<string> => {
  const config = getAIConfig();
  validateApiKey(config);

  const client = createAIClient(config);
  const messages = buildChatMessages(history, userInput, systemInstruction);

  const { text: result } = await generateText({
    model: client(config.model),
    messages,
    temperature: 0.7,
  });

  return result?.trim() || "I'm sorry, I couldn't generate a response.";
};
