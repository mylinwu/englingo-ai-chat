import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        VitePWA({
          registerType: 'autoUpdate',
          includeAssets: ['robot-favicon.svg'],
          manifest: {
            name: 'EngLingo AI Chat',
            short_name: 'EngLingo',
            description: '智能英语学习助手 - 带语法分析的 AI 对话应用',
            theme_color: '#07c160',
            background_color: '#ffffff',
            display: 'standalone',
            orientation: 'portrait',
            scope: '/',
            start_url: '/',
            icons: [
              {
                src: 'pwa-192x192.svg',
                sizes: '192x192',
                type: 'image/svg+xml'
              },
              {
                src: 'pwa-512x512.svg',
                sizes: '512x512',
                type: 'image/svg+xml'
              },
              {
                src: 'pwa-512x512.svg',
                sizes: '512x512',
                type: 'image/svg+xml',
                purpose: 'any maskable'
              }
            ]
          },
          workbox: {
            globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
            runtimeCaching: [
              {
                urlPattern: /^https:\/\/.*\.(?:png|jpg|jpeg|svg|gif|webp)$/,
                handler: 'CacheFirst',
                options: {
                  cacheName: 'images-cache',
                  expiration: {
                    maxEntries: 50,
                    maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
                  }
                }
              }
            ]
          },
          devOptions: {
            enabled: false,
            type: 'module',
          }
        })
      ],
      define: {
        // OpenAI 兼容 API 配置（仅透传 env，默认值由 services/config.ts 管理）
        'process.env.OPENROUTER_BASE_URL': JSON.stringify(env.OPENROUTER_BASE_URL),
        'process.env.OPENROUTER_API_KEY': JSON.stringify(env.OPENROUTER_API_KEY),
        'process.env.OPENROUTER_MODEL': JSON.stringify(env.OPENROUTER_MODEL),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
