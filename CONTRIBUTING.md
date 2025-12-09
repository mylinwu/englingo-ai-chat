# 贡献指南

感谢你对 EngLingo AI Chat 的关注！我们欢迎各种形式的贡献。

## 如何贡献

### 报告 Bug

1. 在 [Issues](https://github.com/your-username/englingo-ai-chat/issues) 中搜索是否已有相同问题
2. 如果没有，创建新 Issue，包含：
   - 清晰的问题描述
   - 复现步骤
   - 期望行为 vs 实际行为
   - 环境信息（浏览器、操作系统等）

### 功能建议

1. 在 Issues 中创建 Feature Request
2. 描述你想要的功能及其使用场景
3. 如果可能，提供实现思路

### 提交代码

1. Fork 本仓库
2. 创建功能分支：`git checkout -b feature/your-feature`
3. 提交更改：`git commit -m 'feat: add some feature'`
4. 推送分支：`git push origin feature/your-feature`
5. 创建 Pull Request

## 开发指南

### 环境准备

```bash
# 克隆仓库
git clone https://github.com/your-username/englingo-ai-chat.git
cd englingo-ai-chat

# 安装依赖
pnpm install

# 复制环境变量配置
cp .env.example .env.local
# 编辑 .env.local 填入你的 API Key

# 启动开发服务器
pnpm dev
```

### 项目结构

```text
├── components/       # React 组件
│   ├── input/       # 输入相关组件
│   ├── message/     # 消息相关组件
│   └── settings/    # 设置相关组件
├── services/        # API 服务
├── store/           # Zustand 状态管理
├── theme/           # 主题系统
└── src/styles/      # 全局样式
```

### 代码规范

- 使用 TypeScript 编写代码
- 组件使用函数式组件 + Hooks
- 遵循现有代码风格
- 添加必要的注释

### Commit 规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

- `feat:` 新功能
- `fix:` Bug 修复
- `docs:` 文档更新
- `style:` 代码格式（不影响功能）
- `refactor:` 重构
- `test:` 测试相关
- `chore:` 构建/工具相关

## 行为准则

- 尊重所有贡献者
- 保持友善和专业的交流
- 接受建设性的批评

## 许可证

贡献的代码将采用 [MIT License](LICENSE) 许可。
