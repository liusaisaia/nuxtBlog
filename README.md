# Nuxt Blog

基于 Nuxt 3 构建的现代博客项目，使用 UnoCSS、Ant Design Vue 和 ESLint，参考 Nuxt 官网设计风格。为未来升级到 Nuxt 4.0 做好准备。

## ✨ 特性

- ⚡️ **Nuxt 3** - 最新稳定版本的全栈框架
- 🎨 **UnoCSS** - 即时的原子化 CSS 引擎
- 🐜 **Ant Design Vue** - 企业级 UI 组件库
- 📝 **Nuxt Content** - 基于文件的内容管理系统
- 🔧 **TypeScript** - 完整的类型安全支持
- 📱 **响应式设计** - 适配各种设备尺寸
- 🌙 **深色模式** - 支持明暗主题切换
- ⚡️ **ESLint** - 代码质量保证和自动格式化
- 🚀 **性能优化** - 利用 Nuxt 3 的最新性能特性
- 🔮 **面向未来** - 为 Nuxt 4.0 升级做好准备

## 技术栈

- **框架**: Nuxt 4.0 + Vue 3
- **样式**: UnoCSS + Ant Design Vue
- **语言**: TypeScript
- **代码规范**: ESLint + @antfu/eslint-config
- **内容管理**: Nuxt Content

## 🚀 快速开始

### 环境要求

- Node.js 18+
- npm 或 yarn 或 pnpm

### 🚨 重要提示

如果遇到依赖问题（如 `vue-tsc` 模块找不到），请先运行：

```bash
npm run fix-deps
```

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

### 类型检查

```bash
npm run typecheck
```

### 代码检查

```bash
npm run lint
```

### 代码修复

```bash
npm run lint:fix
```

### 清理缓存

```bash
npm run clean
```

### 分析构建

```bash
npm run analyze
```

## 项目结构

```
├── components/          # Vue 组件
│   ├── AppHeader.vue   # 头部导航
│   ├── AppFooter.vue   # 底部信息
│   └── BlogCard.vue    # 博客卡片
├── layouts/            # 布局文件
│   └── default.vue     # 默认布局
├── pages/              # 页面文件
│   ├── index.vue       # 首页
│   ├── about.vue       # 关于页面
│   └── blog/           # 博客相关页面
├── plugins/            # 插件文件
├── types/              # TypeScript 类型定义
├── app.vue             # 根组件
├── nuxt.config.ts      # Nuxt 配置
├── unocss.config.ts    # UnoCSS 配置
└── eslint.config.js    # ESLint 配置
```

## 配置说明

### UnoCSS 配置

项目使用 UnoCSS 作为 CSS 框架，配置文件位于 `unocss.config.ts`。包含：

- 预设：Uno、Attributify、Icons、Typography、WebFonts
- 快捷方式：常用的组件样式
- 转换器：指令和变体组支持

### ESLint 配置

使用 @antfu/eslint-config 作为基础配置，支持：

- Vue 3 + TypeScript
- UnoCSS 类名检查
- 代码格式化

### Nuxt 配置

- 集成 UnoCSS、Nuxt Content 和 ESLint 模块
- 配置深色模式支持
- 代码高亮主题配置

## 开发指南

### 添加新页面

在 `pages/` 目录下创建 `.vue` 文件，Nuxt 会自动生成对应路由。

### 添加新组件

在 `components/` 目录下创建 `.vue` 文件，可以在页面中直接使用。

### 样式开发

使用 UnoCSS 原子化类名进行样式开发，支持响应式设计和深色模式。

### 类型定义

在 `types/` 目录下定义 TypeScript 类型，确保类型安全。

## 部署

项目支持多种部署方式：

- **静态生成**: `npm run generate`
- **服务端渲染**: 部署到支持 Node.js 的平台
- **边缘渲染**: 部署到 Vercel、Netlify 等平台

## 许可证

MIT License
# nuxtBlog
