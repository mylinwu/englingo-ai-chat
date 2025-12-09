/**
 * 预设主题配置
 * 可以在这里添加更多主题
 */

import type { ThemeColors } from './types';

/** 亮色主题 - WeUI 风格 */
export const lightTheme: ThemeColors = {
  primary: '#07c160',
  primaryHover: '#06ad56',
  primaryLight: 'rgba(7, 193, 96, 0.1)',
  primaryDark: '#059048',
  secondary: '#576b95',
  secondaryHover: '#4a5d82',
  bg: '#ededed',
  bgSecondary: '#f7f7f7',
  bgTertiary: '#ffffff',
  bgElevated: '#ffffff',
  text: '#1a1a1a',
  textSecondary: '#666666',
  textTertiary: '#999999',
  textInverse: '#ffffff',
  border: '#e5e5e5',
  borderLight: 'rgba(0, 0, 0, 0.05)',
  success: '#07c160',
  successLight: 'rgba(7, 193, 96, 0.1)',
  warning: '#f59e0b',
  warningLight: 'rgba(245, 158, 11, 0.1)',
  error: '#ef4444',
  errorLight: 'rgba(239, 68, 68, 0.1)',
  info: '#3b82f6',
  infoLight: 'rgba(59, 130, 246, 0.1)',
  bubbleUser: '#07c160',
  bubbleAi: '#ffffff',
};

/** 暗色主题 */
export const darkTheme: ThemeColors = {
  primary: '#1aad5f',
  primaryHover: '#22c96e',
  primaryLight: 'rgba(26, 173, 95, 0.15)',
  primaryDark: '#148a4a',
  secondary: '#8fa3c7',
  secondaryHover: '#a3b5d4',
  bg: '#1a1a1a',
  bgSecondary: '#242424',
  bgTertiary: '#2d2d2d',
  bgElevated: '#333333',
  text: '#f5f5f5',
  textSecondary: '#a0a0a0',
  textTertiary: '#707070',
  textInverse: '#1a1a1a',
  border: '#3d3d3d',
  borderLight: 'rgba(255, 255, 255, 0.08)',
  success: '#1aad5f',
  successLight: 'rgba(26, 173, 95, 0.15)',
  warning: '#fbbf24',
  warningLight: 'rgba(251, 191, 36, 0.15)',
  error: '#f87171',
  errorLight: 'rgba(248, 113, 113, 0.15)',
  info: '#60a5fa',
  infoLight: 'rgba(96, 165, 250, 0.15)',
  bubbleUser: '#1aad5f',
  bubbleAi: '#2d2d2d',
};

/** 蓝色主题 - 可选 */
export const blueTheme: ThemeColors = {
  ...lightTheme,
  primary: '#3b82f6',
  primaryHover: '#2563eb',
  primaryLight: 'rgba(59, 130, 246, 0.1)',
  primaryDark: '#1d4ed8',
  bubbleUser: '#3b82f6',
};

/** 紫色主题 - 可选 */
export const purpleTheme: ThemeColors = {
  ...lightTheme,
  primary: '#8b5cf6',
  primaryHover: '#7c3aed',
  primaryLight: 'rgba(139, 92, 246, 0.1)',
  primaryDark: '#6d28d9',
  bubbleUser: '#8b5cf6',
};

/** 所有可用主题 */
export const themes = {
  light: lightTheme,
  dark: darkTheme,
  blue: blueTheme,
  purple: purpleTheme,
} as const;

export type ThemeName = keyof typeof themes;
