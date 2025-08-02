<template>
  <div>
    <!-- Hero Section -->
    <section class="py-20 text-center">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-5xl md:text-6xl font-bold mb-6">
          欢迎来到
          <span class="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Nuxt Blog
          </span>
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          基于 Nuxt 4.0 构建的现代博客，使用 Nuxt UI 提供优雅的阅读体验
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <UButton
            to="/blog"
            size="lg"
            class="bg-gradient-to-r from-green-400 to-blue-500"
          >
            开始阅读
          </UButton>
          <UButton
            to="/about"
            variant="outline"
            size="lg"
          >
            了解更多
          </UButton>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold text-center mb-12">
          特色功能
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <UCard>
            <template #header>
              <div class="flex items-center space-x-3">
                <UIcon name="i-heroicons-rocket-launch" class="w-6 h-6 text-green-500" />
                <h3 class="text-xl font-semibold">快速响应</h3>
              </div>
            </template>
            <p class="text-gray-600 dark:text-gray-300">
              基于 Nuxt 4.0 的服务端渲染，提供极速的页面加载体验
            </p>
          </UCard>

          <UCard>
            <template #header>
              <div class="flex items-center space-x-3">
                <UIcon name="i-heroicons-paint-brush" class="w-6 h-6 text-blue-500" />
                <h3 class="text-xl font-semibold">现代设计</h3>
              </div>
            </template>
            <p class="text-gray-600 dark:text-gray-300">
              使用 Nuxt UI 打造的现代化界面，支持深色模式
            </p>
          </UCard>

          <UCard>
            <template #header>
              <div class="flex items-center space-x-3">
                <UIcon name="i-heroicons-code-bracket" class="w-6 h-6 text-purple-500" />
                <h3 class="text-xl font-semibold">开发友好</h3>
              </div>
            </template>
            <p class="text-gray-600 dark:text-gray-300">
              集成 ESLint 和 TypeScript，提供优秀的开发体验
            </p>
          </UCard>
        </div>
      </div>
    </section>

    <!-- Latest Posts -->
    <section class="py-16 bg-gray-50 dark:bg-gray-800/50">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold text-center mb-12">
          最新文章
        </h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <UCard
            v-for="post in latestPosts"
            :key="post.slug"
            class="hover:shadow-lg transition-shadow"
          >
            <template #header>
              <h3 class="text-xl font-semibold">
                <NuxtLink :to="`/blog/${post.slug}`" class="hover:text-primary">
                  {{ post.title }}
                </NuxtLink>
              </h3>
            </template>

            <p class="text-gray-600 dark:text-gray-300 mb-4">
              {{ post.description }}
            </p>

            <template #footer>
              <div class="flex items-center justify-between text-sm text-gray-500">
                <span>{{ formatDate(post.date) }}</span>
                <span>{{ post.readTime }} 分钟阅读</span>
              </div>
            </template>
          </UCard>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// 页面元数据
useHead({
  title: '首页'
})

// 模拟最新文章数据
const latestPosts = [
  {
    slug: 'getting-started-with-nuxt4',
    title: 'Nuxt 4.0 入门指南',
    description: '了解 Nuxt 4.0 的新特性和如何开始你的第一个项目',
    date: '2024-12-01',
    readTime: 5
  },
  {
    slug: 'nuxt-ui-best-practices',
    title: 'Nuxt UI 最佳实践',
    description: '掌握 Nuxt UI 的核心概念和实用技巧',
    date: '2024-11-28',
    readTime: 8
  },
  {
    slug: 'vue3-composition-api',
    title: 'Vue 3 Composition API 深入解析',
    description: '深入理解 Vue 3 Composition API 的设计理念和使用方法',
    date: '2024-11-25',
    readTime: 12
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
