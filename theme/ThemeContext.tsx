/**
 * 主题上下文 - 提供主题切换功能
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { ThemeMode, ThemeColors } from './types';
import { themes, type ThemeName } from './themes';

interface ThemeContextValue {
  /** 当前主题模式 */
  mode: ThemeMode;
  /** 当前主题名称 */
  themeName: ThemeName;
  /** 当前主题颜色 */
  colors: ThemeColors;
  /** 是否为暗色模式 */
  isDark: boolean;
  /** 设置主题模式 */
  setMode: (mode: ThemeMode) => void;
  /** 设置主题 */
  setTheme: (name: ThemeName) => void;
  /** 切换暗色/亮色模式 */
  toggleDark: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY_MODE = 'theme-mode';
const STORAGE_KEY_THEME = 'theme-name';

/** 应用主题到 DOM */
function applyTheme(colors: ThemeColors, isDark: boolean) {
  const root = document.documentElement;
  
  // 设置 data-theme 属性
  root.setAttribute('data-theme', isDark ? 'dark' : 'light');
  
  // 设置 CSS 变量
  root.style.setProperty('--color-primary', colors.primary);
  root.style.setProperty('--color-primary-hover', colors.primaryHover);
  root.style.setProperty('--color-primary-light', colors.primaryLight);
  root.style.setProperty('--color-primary-dark', colors.primaryDark);
  root.style.setProperty('--color-secondary', colors.secondary);
  root.style.setProperty('--color-secondary-hover', colors.secondaryHover);
  root.style.setProperty('--color-bg', colors.bg);
  root.style.setProperty('--color-bg-secondary', colors.bgSecondary);
  root.style.setProperty('--color-bg-tertiary', colors.bgTertiary);
  root.style.setProperty('--color-bg-elevated', colors.bgElevated);
  root.style.setProperty('--color-text', colors.text);
  root.style.setProperty('--color-text-secondary', colors.textSecondary);
  root.style.setProperty('--color-text-tertiary', colors.textTertiary);
  root.style.setProperty('--color-text-inverse', colors.textInverse);
  root.style.setProperty('--color-border', colors.border);
  root.style.setProperty('--color-border-light', colors.borderLight);
  root.style.setProperty('--color-success', colors.success);
  root.style.setProperty('--color-success-light', colors.successLight);
  root.style.setProperty('--color-warning', colors.warning);
  root.style.setProperty('--color-warning-light', colors.warningLight);
  root.style.setProperty('--color-error', colors.error);
  root.style.setProperty('--color-error-light', colors.errorLight);
  root.style.setProperty('--color-info', colors.info);
  root.style.setProperty('--color-info-light', colors.infoLight);
  root.style.setProperty('--color-bubble-user', colors.bubbleUser);
  root.style.setProperty('--color-bubble-ai', colors.bubbleAi);
}

/** 获取系统主题偏好 */
function getSystemPreference(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: ThemeMode;
  defaultTheme?: ThemeName;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultMode = 'system',
  defaultTheme = 'light',
}) => {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    const stored = localStorage.getItem(STORAGE_KEY_MODE);
    return (stored as ThemeMode) || defaultMode;
  });
  
  const [themeName, setThemeNameState] = useState<ThemeName>(() => {
    const stored = localStorage.getItem(STORAGE_KEY_THEME);
    return (stored as ThemeName) || defaultTheme;
  });
  
  const [systemDark, setSystemDark] = useState(getSystemPreference);
  
  // 计算实际是否为暗色模式
  const isDark = mode === 'dark' || (mode === 'system' && systemDark);
  
  // 获取当前主题颜色
  const colors = isDark ? themes.dark : themes[themeName];
  
  // 监听系统主题变化
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  
  // 应用主题
  useEffect(() => {
    applyTheme(colors, isDark);
  }, [colors, isDark]);
  
  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
    localStorage.setItem(STORAGE_KEY_MODE, newMode);
  }, []);
  
  const setTheme = useCallback((name: ThemeName) => {
    setThemeNameState(name);
    localStorage.setItem(STORAGE_KEY_THEME, name);
  }, []);
  
  const toggleDark = useCallback(() => {
    setMode(isDark ? 'light' : 'dark');
  }, [isDark, setMode]);
  
  return (
    <ThemeContext.Provider
      value={{
        mode,
        themeName,
        colors,
        isDark,
        setMode,
        setTheme,
        toggleDark,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

/** 使用主题 Hook */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default ThemeContext;
