<div align="center">

# 🎓 EngLingo AI Chat

**智能英语学习助手 - 带语法分析的 AI 对话应用**

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC.svg)](https://tailwindcss.com/)

</div>

---

## ✨ 功能特性

- 🤖 **AI 对话** - 支持 OpenAI、OpenRouter 等多种 AI 服务
- 📝 **语法分析** - 自动分析英文句子结构（主语、谓语、宾语等）
- 🌐 **中英翻译** - 自动翻译中文输入为英文，并提供句子翻译
- 🎨 **主题切换** - 支持亮色/暗色/跟随系统，多种主题颜色
- 📱 **响应式设计** - 适配桌面和移动设备
- ⚡ **WeUI 风格** - 简洁优雅的微信风格 UI

## 🖼️ 截图预览

<!-- 可以在这里添加应用截图 -->

## 🚀 快速开始

### 环境要求

- Node.js 18+
- pnpm (推荐) / npm / yarn

### 安装步骤

```bash
# 克隆仓库
git clone https://github.com/your-username/englingo-ai-chat.git
cd englingo-ai-chat

# 安装依赖
pnpm install

# 复制环境变量配置
cp .env.example .env.local

# 编辑 .env.local，填入你的 API Key
# 推荐使用 OpenRouter: https://openrouter.ai/keys

# 启动开发服务器
pnpm dev
```

访问 http://localhost:3000 查看应用。

## ⚙️ 配置说明

### 环境变量

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `OPENRPUTER_BASE_URL` | API 基础 URL（必须以 `/v1` 结尾） | `https://openrouter.ai/api/v1` |
| `OPENRPUTER_API_KEY` | API 密钥 | `sk-or-v1-xxx` |
| `OPENRPUTER_MODEL` | 默认模型 | `openai/gpt-4o-mini` |

### 支持的 API 服务

- [OpenRouter](https://openrouter.ai/) (推荐，支持多种模型)
- [OpenAI](https://platform.openai.com/)
- 其他 OpenAI 兼容 API

## 🏗️ 技术栈

- **框架**: React 19 + TypeScript
- **构建工具**: Vite 6
- **样式**: Tailwind CSS 4
- **状态管理**: Zustand
- **AI SDK**: Vercel AI SDK + OpenRouter Provider
- **图标**: Lucide React

## 📁 项目结构

```text
├── components/          # React 组件
│   ├── input/          # 输入相关组件
│   ├── message/        # 消息相关组件
│   └── settings/       # 设置相关组件
├── services/           # API 服务层
├── store/              # Zustand 状态管理
├── theme/              # 主题系统
├── src/styles/         # 全局样式
├── App.tsx             # 主应用组件
└── types.ts            # TypeScript 类型定义
```

## 🤝 贡献

欢迎贡献代码！请查看 [贡献指南](CONTRIBUTING.md)。

## 📄 许可证

本项目采用 [MIT License](LICENSE) 许可证。

## 🙏 致谢

- [Vercel AI SDK](https://sdk.vercel.ai/)
- [OpenRouter](https://openrouter.ai/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
