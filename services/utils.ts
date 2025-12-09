/**
 * 清理 JSON 字符串中的 Markdown 代码块标记
 */
export const cleanJsonString = (str: string): string => {
  let cleaned = str.trim();
  
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json/, '');
  }
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```/, '');
  }
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.replace(/```$/, '');
  }
  
  return cleaned.trim();
};

/**
 * 检测文本是否包含中文字符
 */
export const containsChinese = (text: string): boolean => {
  return /[\u4e00-\u9fa5]/.test(text);
};
