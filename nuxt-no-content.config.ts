export default defineNuxtConfig({
  // Nuxt 4.0 已经是默认版本，不需要 future 配置

  // 开发工具
  devtools: { enabled: true },

  // 模块配置 (移除 @nuxt/content)
  modules: [
    '@nuxt/ui',
    '@nuxt/eslint'
  ],

  // 应用配置
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Nuxt Blog',
      meta: [
        { name: 'description', content: '基于 Nuxt 4.0 的现代博客' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  // TypeScript 配置
  typescript: {
    typeCheck: false
  },

  // ESLint 配置
  eslint: {
    config: {
      stylistic: true
    }
  },

  // Nuxt 4.0 实验性特性
  experimental: {
    // 启用类型化页面路由
    typedPages: true,
    // 启用新的渲染优化
    renderJsonPayloads: true,
    // 启用构建缓存
    buildCache: true
  },

  // 兼容性日期
  compatibilityDate: '2024-11-20'
})
