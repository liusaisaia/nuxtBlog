<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// 全局 SEO 配置
useSeoMeta({
  titleTemplate: '%s - Nuxt Blog',
  description: '基于 Nuxt 4.0 的现代博客，使用最新的前端技术栈构建',
  ogTitle: 'Nuxt Blog',
  ogDescription: '基于 Nuxt 4.0 的现代博客',
  ogImage: '/og-image.jpg',
  twitterCard: 'summary_large_image',
})

// 全局样式和配置
useHead({
  htmlAttrs: {
    lang: 'zh-CN'
  },
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: ''
    }
  ]
})
</script>
