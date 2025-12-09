import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        // OpenAI 兼容 API 配置
        'process.env.OPENRPUTER_BASE_URL': JSON.stringify(env.OPENRPUTER_BASE_URL || 'https://api.openai.com/v1'),
        'process.env.OPENRPUTER_API_KEY': JSON.stringify(env.OPENRPUTER_API_KEY || ''),
        'process.env.OPENRPUTER_MODEL': JSON.stringify(env.OPENRPUTER_MODEL || 'gpt-4o-mini'),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
