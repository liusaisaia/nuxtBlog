# 现代博客 - Modern Blog

基于 Nuxt 4.0.2 构建的现代化博客系统，集成了最新的前端技术栈。

## ✨ 特性

- 🚀 **极速性能** - 基于 Nuxt 4 和 Vue 3
- 🎨 **现代设计** - 参考 Nuxt 官网的设计语言
- 📱 **响应式布局** - 完美适配各种设备
- 🌙 **暗黑模式** - 支持明暗主题切换
- 📝 **Markdown 支持** - 丰富的内容渲染
- 🏷️ **分类标签** - 灵活的内容组织
- 🔍 **全文搜索** - 快速找到所需内容
- ⚡ **原子化 CSS** - UnoCSS 提供高性能样式
- 🛡️ **TypeScript** - 完整的类型安全
- 📊 **SEO 优化** - 搜索引擎友好

## 🛠️ 技术栈

- **框架**: Nuxt 4.0.2
- **前端**: Vue 3.5.18
- **语言**: TypeScript 5.6.3
- **样式**: UnoCSS 0.63.6
- **组件库**: Nuxt UI 3.3.0
- **内容管理**: Nuxt Content 2.13.4
- **代码规范**: ESLint (Antfu Config)
- **主题**: Nuxt Color Mode

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 8.0.0

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:3000

### 构建生产版本

```bash
# 静态站点生成
npm run generate

# 服务端渲染
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 📝 内容管理

### 创建文章

在 `content/` 目录下创建 `.md` 文件：

```markdown
---
title: '文章标题'
description: '文章描述'
date: '2024-01-15'
category: '分类名称'
tags: ['标签1', '标签2']
author: '作者名称'
readingTime: '5'
image: '/images/cover.jpg'
---

# 文章内容

这里是文章的正文内容...
```

### 支持的分类

- 前端开发
- 后端开发
- DevOps
- 数据库
- 移动开发
- 人工智能
- 设计
- 工具
- 教程
- 思考

## 🎨 自定义样式

项目使用 UnoCSS 作为 CSS 引擎，支持：

- 原子化 CSS 类
- 自定义快捷方式
- 响应式设计
- 暗黑模式变量

### 主要 CSS 变量

```css
:root {
  --primary-color: #00dc82;
  --text-color: #1f2937;
  --bg-color: #ffffff;
  --border-color: #e5e7eb;
}

.dark {
  --text-color: #f9fafb;
  --bg-color: #111827;
  --border-color: #374151;
}
```

## 📦 部署

### 静态部署

```bash
npm run generate
```

生成的文件在 `.output/public` 目录，可部署到：
- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

### 服务端部署

```bash
npm run build
```

支持部署到：
- Vercel
- Railway
- Heroku
- 自建服务器

### Docker 部署

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔧 开发指南

### 项目结构

```
├── assets/          # 静态资源
├── components/      # Vue 组件
├── content/         # Markdown 文章
├── layouts/         # 布局组件
├── pages/           # 页面组件
├── public/          # 公共文件
├── server/          # 服务端 API
└── types/           # TypeScript 类型
```

### 代码规范

项目使用 Antfu ESLint 配置：

```bash
# 检查代码
npm run lint

# 自动修复
npm run lint:fix
```

### 类型检查

```bash
# TypeScript 类型检查
npx vue-tsc --noEmit
```

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- [Nuxt](https://nuxt.com) - 全栈 Vue 框架
- [Vue](https://vuejs.org) - 渐进式 JavaScript 框架
- [UnoCSS](https://unocss.dev) - 即时原子化 CSS 引擎
- [Nuxt UI](https://ui.nuxt.com) - Vue 组件库

## 📞 联系我们

- 📧 Email: contact@example.com
- 🐙 GitHub: https://github.com
- 🐦 Twitter: https://twitter.com

---

⭐ 如果这个项目对你有帮助，请给个 Star！