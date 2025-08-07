export default defineNuxtConfig({
  devtools: { enabled: true },

  // 禁用欢迎页面
  ssr: true,

  // 模块配置
  modules: [
    '@nuxt/ui',
    '@unocss/nuxt',
    '@nuxt/content',
    '@nuxtjs/color-mode'
  ],

  // TypeScript配置
  typescript: {
    strict: true,
    typeCheck: true
  },


  // 颜色模式配置
  colorMode: {
    preference: 'system',
    fallback: 'light',
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
  },

  // UnoCSS配置
  unocss: {
    uno: true,
    icons: true,
    attributify: true,
    shortcuts: [
      ['btn', 'px-4 py-2 rounded inline-block bg-primary-500 text-white cursor-pointer hover:bg-primary-600 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50 transition-colors'],
      ['btn-primary', 'bg-primary-500 hover:bg-primary-600 text-white'],
      ['btn-secondary', 'bg-gray-500 hover:bg-gray-600 text-white'],
      ['card', 'bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700'],
      ['container-main', 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8']
    ],
    theme: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#00dc82',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d'
        }
      }
    }
  },

  // 内容配置
  content: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark'
      }
    },
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3
      }
    }
  },

  // 应用配置
  app: {
    head: {
      title: '现代博客',
      bodyAttrs: { style: 'height: 100%; margin:0; padding: 0;' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '基于Nuxt 4的现代化博客系统' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap' }
      ]
    }
  },

  // 兼容性配置
  compatibilityDate: '2024-08-06'
})
