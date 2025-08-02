<template>
  <div>
    <!-- Page Header -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4">博客文章</h1>
      <p class="text-xl text-gray-600 dark:text-gray-300">分享技术见解和开发经验</p>
    </div>

    <!-- Blog Posts -->
    <div class="space-y-6">
      <UCard
        v-for="post in posts"
        :key="post.slug"
        class="hover:shadow-lg transition-shadow"
      >
        <template #header>
          <div class="flex flex-col md:flex-row md:items-center md:justify-between">
            <h2 class="text-2xl font-bold mb-2 md:mb-0">
              <NuxtLink :to="`/blog/${post.slug}`" class="hover:text-primary">
                {{ post.title }}
              </NuxtLink>
            </h2>
            <div class="flex items-center space-x-4 text-sm text-gray-500">
              <span>{{ formatDate(post.date) }}</span>
              <span>{{ post.readTime }} 分钟阅读</span>
            </div>
          </div>
        </template>

        <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          {{ post.description }}
        </p>

        <template #footer>
          <div class="flex items-center justify-between">
            <div class="flex flex-wrap gap-2">
              <UBadge
                v-for="tag in post.tags"
                :key="tag"
                variant="soft"
                size="sm"
              >
                {{ tag }}
              </UBadge>
            </div>
            <UButton
              :to="`/blog/${post.slug}`"
              variant="ghost"
              size="sm"
              trailing-icon="i-heroicons-arrow-right-20-solid"
            >
              阅读更多
            </UButton>
          </div>
        </template>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
// 页面元数据
useHead({
  title: '博客'
})

// 模拟博客文章数据
const posts = [
  {
    slug: 'getting-started-with-nuxt4',
    title: 'Nuxt 4.0 入门指南',
    description: '了解 Nuxt 4.0 的新特性和如何开始你的第一个项目。本文将带你了解 Nuxt 4.0 的核心概念，包括文件路由、服务端渲染、静态生成等功能，以及如何配置和优化你的 Nuxt 应用。',
    date: '2024-08-01',
    readTime: 5,
    tags: ['Nuxt', 'Vue', '前端框架']
  },
  {
    slug: 'unocss-best-practices',
    title: 'UnoCSS 最佳实践',
    description: '掌握 UnoCSS 的核心概念和实用技巧。UnoCSS 是一个即时的原子化 CSS 引擎，它提供了灵活的配置和强大的功能。本文将介绍如何在项目中有效使用 UnoCSS，包括预设配置、自定义规则和性能优化。',
    date: '2024-07-28',
    readTime: 8,
    tags: ['UnoCSS', 'CSS', '样式']
  },
  {
    slug: 'vue3-composition-api',
    title: 'Vue 3 Composition API 深入解析',
    description: '深入理解 Vue 3 Composition API 的设计理念和使用方法。Composition API 为 Vue 3 带来了更好的逻辑复用和类型推断能力。本文将通过实例讲解如何使用 Composition API 构建可维护的 Vue 应用。',
    date: '2024-07-25',
    readTime: 12,
    tags: ['Vue 3', 'Composition API', 'JavaScript']
  },
  {
    slug: 'typescript-in-vue',
    title: '在 Vue 项目中使用 TypeScript',
    description: 'TypeScript 为 Vue 项目带来了类型安全和更好的开发体验。本文将介绍如何在 Vue 项目中配置和使用 TypeScript，包括组件类型定义、Props 类型检查和常见问题解决方案。',
    date: '2024-07-20',
    readTime: 10,
    tags: ['TypeScript', 'Vue', '类型安全']
  }
]

// 格式化日期
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>
