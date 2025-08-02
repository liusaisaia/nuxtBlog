export default defineNuxtConfig({
  // 开发工具
  devtools: { enabled: true },

  // 模块配置
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

  // 兼容性日期
  compatibilityDate: '2024-11-20'
})
