<template>
  <div>
    <!-- Hero Section -->
    <HeroSection />

    <!-- Products Section -->
    <section id="products" class="relative py-32 overflow-hidden">
      <!-- Section Divider Glow -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent"></div>

      <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div class="mb-16 text-center">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">技术栈</h2>
          <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            利用 JavaScript 生态系统中最先进的工具，提供无与伦比的开发体验。
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-6 lg:gap-8">
          <ProductCard
            v-for="product in products"
            :key="product.name"
            v-bind="product"
          />
        </div>
      </div>
    </section>

    <!-- Recent Posts Section -->
    <section id="posts" class="py-32 border-t border-gray-200 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02]">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="flex items-end justify-between mb-12">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">最新文章</h2>
            <p class="text-gray-600 dark:text-gray-400">深入探讨现代 Web 开发技术。</p>
          </div>
          <NuxtLink
            to="/posts"
            class="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            查看全部
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </NuxtLink>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <PostCard
            v-for="post in recentPosts"
            :key="post.path"
            :post="post"
          />
        </div>

        <div class="mt-12 text-center sm:hidden">
           <NuxtLink
            to="/posts"
            class="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            查看全部
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const products = [
  {
    name: 'Nuxt',
    description: '直观的 Vue 框架，用于构建支持服务端渲染的现代 Web 应用程序。',
    icon: '⚡',
    stars: '78.0k',
    link: 'https://nuxt.com',
    color: 'text-green-500'
  },
  {
    name: 'Tailwind CSS',
    description: '一个实用优先的 CSS 框架，无需离开 HTML 即可快速构建自定义设计。',
    icon: '🎨',
    stars: '82.5k',
    link: 'https://tailwindcss.com',
    color: 'text-cyan-400'
  },
  {
    name: 'TypeScript',
    description: 'TypeScript 为 JavaScript 添加了静态类型检查，及早发现错误并改善开发体验。',
    icon: '🔷',
    stars: '103k',
    link: 'https://typescriptlang.org',
    color: 'text-blue-500'
  },
  {
    name: 'Vue',
    description: '用于构建用户界面的渐进式 JavaScript 框架，拥有易于上手的生态系统。',
    icon: '💚',
    stars: '208k',
    link: 'https://vuejs.org',
    color: 'text-emerald-500'
  }
]

const { data: recentPosts } = await useAsyncData('recent-posts', () =>
  queryCollection('content')
    .order('date', 'DESC')
    .limit(6)
    .all()
)

useHead({
  title: '赛赛的前端视界 - 探索 Web 技术',
  meta: [
    { name: 'description', content: '基于 Nuxt 4、Vite 和 Tailwind CSS 构建的高性能博客模板。复刻 VoidZero 设计美学。' }
  ]
})
</script>
