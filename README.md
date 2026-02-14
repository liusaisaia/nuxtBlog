# VoidZero 风格博客模板 (Nuxt 4)

这是一个基于 **Nuxt 4** 构建的高性能博客模板，完美复刻了 [VoidZero.dev](https://voidzero.dev/) 的现代工业风设计美学。项目集成了最新的前端工具链，旨在提供极致的开发体验和用户体验。

## ✨ 特性

*   **⚡️ 核心技术栈**：
    *   **Nuxt 4.3+**：使用最新的 Nuxt 版本，享受极致性能。
    *   **Content v3**：基于 SQL 的高性能内容查询引擎。
    *   **Tailwind CSS**：高度定制的原子化 CSS。
*   **🎨 视觉设计**：
    *   **像素级复刻**：完美还原 VoidZero 官网的排版、间距和配色。
    *   **高级动效**：Hero 区域光晕 (Spotlight)、背景网格 (Grid)、渐变文字和呼吸灯 Badge。
    *   **深色/浅色模式**：完整的主题切换支持，适配所有 UI 组件。
    *   **Glassmorphism**：精细的毛玻璃效果 Header 和卡片。
*   **🛠 工程化**：
    *   **OXC (oxlint)**：极速代码检查。
    *   **Vitest**：单元测试集成。
    *   **TypeScript**：全量类型支持。

## 📦 安装与使用

### 前置要求
*   Node.js 18+
*   pnpm (推荐)

### 1. 安装依赖

```bash
pnpm install
```

### 2. 启动开发服务器

```bash
pnpm dev
```

访问 `http://localhost:3000` 查看效果。

### 3. 构建生产版本

```bash
pnpm build
```

构建产物将位于 `.output` 目录。

### 4. 代码检查与测试

```bash
# 运行 Lint 检查
npm run lint:oxc

# 运行单元测试
npx vitest run
```

## 📂 目录结构

```
.
├── components/          # Vue 组件 (HeroSection, AppHeader, ProductCard 等)
├── content/             # Markdown 内容文件 (博客文章)
├── layouts/             # 页面布局
├── pages/               # 页面路由
├── public/              # 静态资源
├── server/              # 服务端路由 (RSS 等)
├── app.vue              # 应用入口
├── content.config.ts    # Content v3 集合配置
├── nuxt.config.ts       # Nuxt 配置文件
└── tailwind.config.ts   # Tailwind 样式配置
```

## 🧩 主要组件说明

*   **`HeroSection.vue`**: 首页首屏区域，包含光晕背景、动态 Badge 和发光 CTA 按钮。
*   **`ProductCard.vue`**: 展示技术栈的卡片，带有 Hover 聚光灯效果。
*   **`AppHeader.vue`**: 顶部导航栏，支持毛玻璃效果和响应式布局。

## 📄 License

MIT License. 
本项目仅供学习和研究使用，设计风格归 VoidZero 所有。
