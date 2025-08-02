# 🎨 Nuxt UI 博客项目

现在项目已经完全迁移到 Nuxt UI，提供更简单、更一致的用户界面。

## ✨ 主要变化

### 🔄 从 Ant Design Vue + UnoCSS 迁移到 Nuxt UI
- ✅ 移除了 Ant Design Vue 依赖
- ✅ 移除了 UnoCSS 配置
- ✅ 使用 Nuxt UI 组件系统
- ✅ 内置主题切换功能
- ✅ 更好的 TypeScript 支持

### 🎯 新的技术栈
- **框架**: Nuxt 4.0.0 (最新版)
- **Vue**: 3.5.13 (最新版)
- **UI 库**: Nuxt UI 2.18.7 (基于 Tailwind CSS)
- **图标**: Heroicons (内置)
- **主题**: 自动深色/浅色模式切换
- **内容**: Nuxt Content 2.13.4
- **TypeScript**: 5.6.3

## 🚀 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 启动开发服务器
```bash
npm run dev
```

### 3. 访问应用
打开浏览器访问: http://localhost:3000

## 🎨 主题切换

现在主题切换功能使用 Nuxt UI 的内置支持：
- 点击右上角的太阳/月亮图标
- 自动跟随系统主题设置
- 设置会保存在本地存储中

## 🧩 主要组件

### 导航栏 (AppHeader.vue)
- 使用 `UButton` 组件
- 内置响应式设计
- 集成主题切换按钮

### 卡片 (UCard)
- 统一的卡片样式
- 支持 header 和 footer 插槽
- 自动适配深色模式

### 按钮 (UButton)
- 多种变体：default, outline, ghost
- 多种尺寸：sm, md, lg
- 内置图标支持

### 容器 (UContainer)
- 响应式容器
- 自动居中和边距

## 📱 响应式设计

Nuxt UI 提供了完整的响应式支持：
- 移动端优先设计
- 自动适配不同屏幕尺寸
- 触摸友好的交互

## 🎯 优势

### 相比之前的配置：
1. **更简单**: 无需复杂的 UnoCSS 配置
2. **更一致**: 所有组件遵循统一的设计系统
3. **更可靠**: 主题切换功能开箱即用
4. **更现代**: 基于最新的 Tailwind CSS
5. **更易维护**: 更少的依赖和配置文件

## 🔧 自定义主题

如果需要自定义主题，可以在 `app.config.ts` 中配置：

```typescript
export default defineAppConfig({
  ui: {
    primary: 'green',
    gray: 'slate'
  }
})
```

## 📚 文档参考

- [Nuxt UI 官方文档](https://ui.nuxt.com/)
- [Tailwind CSS 文档](https://tailwindcss.com/)
- [Heroicons 图标库](https://heroicons.com/)

## 🎉 开始使用

现在你可以：
1. 运行 `npm install` 安装新的依赖
2. 运行 `npm run dev` 启动项目
3. 享受更简单、更可靠的主题切换功能！

主题切换现在应该完美工作了！ 🎨✨
