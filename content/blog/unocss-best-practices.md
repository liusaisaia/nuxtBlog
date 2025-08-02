---
title: 'UnoCSS 最佳实践'
description: '掌握 UnoCSS 的核心概念和实用技巧'
date: '2024-07-28'
readTime: 8
author: '李四'
tags: ['UnoCSS', 'CSS', '样式']
---

# UnoCSS 最佳实践

## UnoCSS 简介

UnoCSS 是一个即时的原子化 CSS 引擎，它提供了灵活的配置和强大的功能。

## 核心概念

UnoCSS 基于以下核心概念：

- **原子化**：每个类名对应一个 CSS 属性
- **即时生成**：按需生成 CSS
- **可配置**：高度可定制的规则和预设

## 常用类名

```html
<!-- 布局 -->
<div class="flex items-center justify-center">
<div class="grid grid-cols-3 gap-4">

<!-- 间距 -->
<div class="p-4 m-2 px-6 py-3">

<!-- 颜色 -->
<div class="text-blue-500 bg-red-100 border-gray-300">

<!-- 响应式 -->
<div class="md:text-lg lg:grid-cols-4">
```

## 配置示例

```typescript
// unocss.config.ts
export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-2 rounded bg-blue-500 text-white'],
  ],
  theme: {
    colors: {
      primary: '#3b82f6'
    }
  }
})
```

## 最佳实践

1. **使用预设**：充分利用官方预设
2. **定义快捷方式**：为常用组合创建快捷方式
3. **响应式设计**：使用响应式前缀
4. **主题配置**：统一管理设计令牌
