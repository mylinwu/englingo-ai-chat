/**
 * 主题类型定义
 */

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeColors {
  primary: string;
  primaryHover: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  secondaryHover: string;
  bg: string;
  bgSecondary: string;
  bgTertiary: string;
  bgElevated: string;
  text: string;
  textSecondary: string;
  textTertiary: string;
  textInverse: string;
  border: string;
  borderLight: string;
  success: string;
  successLight: string;
  warning: string;
  warningLight: string;
  error: string;
  errorLight: string;
  info: string;
  infoLight: string;
  bubbleUser: string;
  bubbleAi: string;
}

export interface ThemeConfig {
  mode: ThemeMode;
  colors: ThemeColors;
}
