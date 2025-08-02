<template>
  <div>
    <div class="max-w-4xl mx-auto">
      <!-- Article Header -->
      <header class="mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
          {{ post.title }}
        </h1>

        <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div class="flex items-center space-x-4 text-gray-600 dark:text-gray-300 mb-4 md:mb-0">
            <span>{{ formatDate(post.date) }}</span>
            <span>•</span>
            <span>{{ post.readTime }} 分钟阅读</span>
            <span>•</span>
            <span>{{ post.author }}</span>
          </div>
        </div>

        <div class="flex flex-wrap gap-2 mb-8">
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
          >
            {{ tag }}
          </span>
        </div>

        <div class="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
      </header>

      <!-- Article Content -->
      <article class="prose prose-lg dark:prose-invert max-w-none">
        <div v-html="post.content"></div>
      </article>

      <!-- Article Footer -->
      <footer class="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <NuxtLink
            to="/blog"
            class="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
          >
            <div class="w-4 h-4 i-carbon-arrow-left" />
            <span>返回博客列表</span>
          </NuxtLink>

          <div class="flex items-center space-x-4">
            <span class="text-gray-600 dark:text-gray-300">分享文章:</span>
            <button class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <div class="w-5 h-5 i-carbon-logo-twitter text-blue-500" />
            </button>
            <button class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <div class="w-5 h-5 i-carbon-link text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

// 模拟文章数据
const posts = {
  'getting-started-with-nuxt4': {
    title: 'Nuxt 4.0 入门指南',
    description: '了解 Nuxt 4.0 的新特性和如何开始你的第一个项目',
    date: '2024-08-01',
    readTime: 5,
    author: '张三',
    tags: ['Nuxt', 'Vue', '前端框架'],
    content: `
      <h2>什么是 Nuxt 4.0？</h2>
      <p>Nuxt 4.0 是基于 Vue 3 的全栈框架，它提供了服务端渲染、静态生成、文件路由等强大功能。</p>

      <h2>主要特性</h2>
      <ul>
        <li><strong>文件路由</strong>：基于文件系统的自动路由生成</li>
        <li><strong>服务端渲染</strong>：提供更好的 SEO 和首屏加载性能</li>
        <li><strong>静态生成</strong>：支持静态站点生成</li>
        <li><strong>模块系统</strong>：丰富的模块生态系统</li>
      </ul>

      <h2>快速开始</h2>
      <p>创建一个新的 Nuxt 项目非常简单：</p>
      <pre><code>npx nuxi@latest init my-nuxt-app
cd my-nuxt-app
npm install
npm run dev</code></pre>

      <h2>项目结构</h2>
      <p>Nuxt 项目有着清晰的目录结构：</p>
      <ul>
        <li><code>pages/</code> - 页面文件，自动生成路由</li>
        <li><code>components/</code> - Vue 组件</li>
        <li><code>layouts/</code> - 布局文件</li>
        <li><code>plugins/</code> - 插件文件</li>
        <li><code>middleware/</code> - 中间件</li>
      </ul>

      <h2>总结</h2>
      <p>Nuxt 4.0 为 Vue 开发者提供了一个强大而灵活的全栈框架。通过其约定优于配置的理念，开发者可以快速构建现代化的 Web 应用。</p>
    `
  },
  'unocss-best-practices': {
    title: 'UnoCSS 最佳实践',
    description: '掌握 UnoCSS 的核心概念和实用技巧',
    date: '2024-07-28',
    readTime: 8,
    author: '李四',
    tags: ['UnoCSS', 'CSS', '样式'],
    content: `
      <h2>UnoCSS 简介</h2>
      <p>UnoCSS 是一个即时的原子化 CSS 引擎，它提供了灵活的配置和强大的功能。</p>

      <h2>核心概念</h2>
      <p>UnoCSS 基于以下核心概念：</p>
      <ul>
        <li><strong>原子化</strong>：每个类名对应一个 CSS 属性</li>
        <li><strong>即时生成</strong>：按需生成 CSS</li>
        <li><strong>可配置</strong>：高度可定制的规则和预设</li>
      </ul>

      <h2>常用类名</h2>
      <pre><code><!-- 布局 -->
flex items-center justify-center
grid grid-cols-3 gap-4

<!-- 间距 -->
p-4 m-2 px-6 py-3

<!-- 颜色 -->
text-blue-500 bg-red-100
border-gray-300

<!-- 响应式 -->
md:text-lg lg:grid-cols-4</code></pre>

      <h2>配置示例</h2>
      <pre><code>// unocss.config.ts
export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-2 rounded bg-blue-500 text-white'],
  ],
  theme: {
    colors: {
      primary: '#3b82f6'
    }
  }
})</code></pre>
    `
  }
}

const post = posts[slug as keyof typeof posts] || {
  title: '文章未找到',
  description: '',
  date: '',
  readTime: 0,
  author: '',
  tags: [],
  content: '<p>抱歉，您访问的文章不存在。</p>'
}

// 页面元数据
useHead({
  title: post.title
})

// 格式化日期
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>
