# ✨ JADE - 创意平台

一个为创作者设计的完整创意管理平台，集灵感收集、AI 创意工坊和个人作品展厅于一身。

## 🎯 平台特性

### 📚 灵感库
- 收集来自各个平台的灵感（书摘、截图、想法、链接）
- 卡片式浏览体验（类似 Pinterest）
- 标签分类和强大搜索功能
- 半公开：访客可以查看，只有你能编辑

### 💡 创意工坊
- 私密的创意空间，只有你能访问
- 翻看灵感库启发创意
- 与 4 个 AI 同时对话（GPT-4、Claude、Gemini、DeepSeek）
- 自动保存所有创意思路和对话

### 🌟 作品展厅
- 展示你的最终作品（摄影、文案、音乐、手工等）
- 按类型分类展示
- 关联灵感来源（可选）
- 访客可以匿名点赞和评论
- AI 自动审核不合适内容

---

## 🛠️ 技术栈

### 前端
- **框架**：React 18 + Next.js 14
- **样式**：Tailwind CSS + 自定义组件库
- **状态管理**：Zustand
- **UI 组件**：Shadcn/UI

### 后端
- **运行时**：Node.js
- **框架**：Next.js API Routes
- **数据库**：MongoDB Atlas（免费版）
- **认证**：JWT + NextAuth.js
- **文件存储**：Cloudinary（免费版）

### AI 服务
- **GPT-4**：OpenAI API
- **Claude**：Anthropic API
- **Gemini**：Google AI API
- **DeepSeek**：DeepSeek API
- **内容审核**：OpenAI Moderation API（免费）

---

## 📁 项目结构

```
JADE/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (creator)/
│   │   ├── inspiration/page.tsx
│   │   ├── workshop/page.tsx
│   │   └── portfolio/page.tsx
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       ├── inspiration/route.ts
│       ├── workshop/route.ts
│       ├── portfolio/route.ts
│       ├── comments/route.ts
│       └── ai/route.ts
├── components/
├── lib/
├── styles/
├── public/
├── docs/
├── .env.example
└── package.json
```

---

## 🚀 快速开始

### 1️⃣ 克隆项目
```bash
git clone https://github.com/fxeswiftie-hub/JADE.git
cd JADE
```

### 2️⃣ 安装依赖
```bash
npm install
```

### 3️⃣ 配置环境变量
```bash
cp .env.example .env.local
# 编辑 .env.local，填入你的 API 密钥
```

### 4️⃣ 启动开发服务器
```bash
npm run dev
```

访问 http://localhost:3000

---

## 📚 文档

- [部署指南](./docs/DEPLOY.md) - 如何部署到生产环境
- [API 文档](./docs/API.md) - 完整的 API 参考
- [设置指南](./docs/SETUP.md) - 详细的本地开发设置
- [用户指南](./docs/USER_GUIDE.md) - 如何使用 JADE 平台

---

## 🎨 UI 设计风格

**主题**：甜美简约酷炫治愈

- **主色**：紫色系 (#A78BFA - #C4B5FD)
- **辅色**：粉色系 (#FBCFE8 - #FDE2E4)
- **强调色**：青色系 (#67E8F9 - #A5F3FC)
- **背景**：极浅紫 (#F8F8FF)

**设计元素**：
- 圆角卡片（治愈感）
- 柔和阴影
- 平滑过渡动画
- 充分留白
- 手绘风格图标

---

## 👤 创作者作品类型

- 📸 摄影
- ✍️ 文案 / 小说
- 🎵 音乐
- 🧶 手工

---

## 💬 反馈和支持

如果有任何问题或建议，欢迎在 GitHub Issues 中提出！

---

**JADE - 让创意流动，让灵感闪耀** ✨
