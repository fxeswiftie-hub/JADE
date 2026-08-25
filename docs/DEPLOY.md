# JADE Platform - Deployment Guide

## 🚀 快速开始部署

本指南将帮助你将 JADE 平台部署到生产环境。

### 前置条件
- Node.js 18+
- MongoDB Atlas 账户（或其他 MongoDB 服务）
- API 密钥（OpenAI、Claude、Gemini、DeepSeek）

---

## 📋 部署选项

### 选项 1：Vercel（推荐）- 免费

**优点：**
- Next.js 官方推荐
- 免费额度足够个人使用
- 自动化部署
- 无需配置服务器

**步骤：**

1. **注册 Vercel**
   - 访问 https://vercel.com
   - 用 GitHub 账户登录

2. **导入项目**
   - 点击 "New Project"
   - 选择你的 JADE 仓库
   - 点击 "Import"

3. **配置环境变量**
   - 在 "Environment Variables" 部分添加：
   ```
   MONGODB_URI=your_mongodb_uri
   NEXTAUTH_SECRET=your_random_secret
   NEXTAUTH_URL=your_domain.vercel.app
   OPENAI_API_KEY=your_key
   ANTHROPIC_API_KEY=your_key
   GOOGLE_API_KEY=your_key
   DEEPSEEK_API_KEY=your_key
   CLOUDINARY_API_KEY=your_key
   CLOUDINARY_API_SECRET=your_secret
   ```

4. **部署**
   - 点击 "Deploy"
   - 等待部署完成

5. **获取你的 URL**
   - 部署完成后，Vercel 会给你一个 `.vercel.app` URL

---

### 选项 2：Railway - 免费试用 $5

**步骤：**

1. **注册 Railway**
   - 访问 https://railway.app
   - 连接 GitHub

2. **创建项目**
   - 选择 "New Project"
   - "Deploy from GitHub"
   - 选择 JADE 仓库

3. **配置数据库**
   - 添加 MongoDB 插件
   - 或连接你的 MongoDB Atlas

4. **设置环境变量**
   - 在 "Variables" 中添加所有 API 密钥

5. **部署**
   - Railway 会自动部署

---

### 选项 3：本地部署 + Cloudflare

如果你有自己的服务器：

```bash
# 1. 克隆仓库
git clone https://github.com/your-username/JADE.git
cd JADE

# 2. 安装依赖
npm install

# 3. 配置环境变量
cp .env.example .env.local
# 编辑 .env.local，填入你的密钥

# 4. 构建
npm run build

# 5. 启动
npm start
```

---

## 🗄️ 数据库设置

### MongoDB Atlas（免费）

1. **访问** https://www.mongodb.com/cloud/atlas
2. **注册并登录**
3. **创建集群**
   - 选择 "Build a Database"
   - 选择免费方案
   - 选择地区（推荐 Asia）
4. **获取连接字符串**
   - 点击 "Connect"
   - 选择 "Drivers"
   - 复制连接字符串
   - 替换 `<password>` 为你的数据库密码
5. **在环境变量中设置**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jade
   ```

---

## 🔑 API 密钥获取

### 1. OpenAI (GPT-4)

```
1. 访问 https://platform.openai.com/api-keys
2. 创建新的 API 密钥
3. 充值账户（可选，有 $5 试用额度）
4. 复制密钥到 OPENAI_API_KEY
```

**成本估算：**
- 100 条对话 ≈ $1
- 1000 条对话 ≈ $10

### 2. Claude (Anthropic)

```
1. 访问 https://console.anthropic.com/
2. 创建账户
3. 生成 API 密钥
4. 复制到 ANTHROPIC_API_KEY
```

**成本估算：**
- 比 OpenAI 便宜 10 倍
- 100 条对话 ≈ $0.1

### 3. Gemini (Google)

```
1. 访问 https://ai.google.dev/
2. 点击 "Get API Key"
3. 选择项目（自动创建）
4. 生成 API 密钥
5. 复制到 GOOGLE_API_KEY
```

**成本估算：**
- 有免费额���：60 请求/分钟
- 免费足以支撑个人使用

### 4. DeepSeek

```
1. 访问 https://platform.deepseek.com/
2. 注册账户
3. 生成 API 密钥
4. 复制到 DEEPSEEK_API_KEY
```

**成本估算：**
- 非常便宜（中国AI，推荐）
- 100 条对话 ≈ ¥0.1

### 5. Cloudinary（图片存储）

```
1. 访问 https://cloudinary.com/
2. 注册免费账户
3. 获取 Cloud Name、API Key、API Secret
4. 复制到环境变量
```

**免费额度：**
- 25 GB 存储
- 25 GB 带宽
- 足够个人使用

---

## ✅ 部署检查清单

- [ ] MongoDB 连接成功
- [ ] 所有 API 密钥已配置
- [ ] 环境变量已设置
- [ ] 登录/注册功能正常
- [ ] 灵感库可以保存数据
- [ ] AI 对话正常工作
- [ ] 图片上传正常

---

## 🆘 故障排除

### 连接数据库失败

```
检查：
1. MONGODB_URI 是否正确
2. MongoDB 账户是否已注册
3. IP 白名单是否添加了你的服务器 IP
```

### API 密钥不工作

```
检查：
1. 密钥是否正确复制
2. 账户是否已充值（OpenAI）
3. 密钥是否已过期
4. API 配额是否已用尽
```

### 部署后 500 错误

```
查看日志：
1. Vercel: 点击 "Functions" 标签
2. Railway: 点击 "Logs" 标签
3. 查找错误信息
```

---

## 🎉 部署完成！

你现在有了一个完整的 JADE 平台！

**下一步：**
1. 访问你的网址
2. 注册账户
3. 开始创作！

有任何问题，欢迎提出 Issue！
