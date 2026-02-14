// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  // 兼容性日期，用于确保未来版本的行为一致性
  compatibilityDate: '2024-11-01',

  // 开启开发者工具
  devtools: { enabled: true },

  // 注册模块
  modules: [
    '@nuxtjs/tailwindcss', // Tailwind CSS 集成
    '@nuxt/content',       // 内容管理 (Markdown 等)
    '@nuxtjs/google-fonts', // Google Fonts 优化加载
    '@pinia/nuxt',         // 状态管理
    '@nuxt/image',         // 图片优化
    // '@nuxtjs/seo',      // SEO 优化 (暂时禁用)
    '@nuxtjs/color-mode'   // 颜色模式 (深色/浅色)
  ],

  // Google Fonts 配置
  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700],
      'JetBrains+Mono': [400, 500, 600]
    }
  },

  // Content 模块配置
  content: {
    // documentDriven: true, // Content v3 中已弃用此选项
    highlight: {
      theme: 'github-dark'
    }
  },

  // 颜色模式配置
  colorMode: {
    classSuffix: '',
    preference: 'system', // 默认跟随系统
    fallback: 'dark'      // 回退到深色模式
  }
})
