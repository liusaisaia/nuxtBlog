<template>
  <div>
    <!-- Hero Section - 参照 Nuxt 官网风格 -->
    <section class="relative overflow-hidden">
      <!-- 背景渐变 -->
      <div class="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>

      <!-- 装饰性背景元素 -->
      <div class="absolute inset-0">
        <div class="absolute top-20 left-10 w-72 h-72 bg-green-200 dark:bg-green-800 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob"></div>
        <div class="absolute top-40 right-10 w-72 h-72 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div class="absolute -bottom-8 left-20 w-72 h-72 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div class="relative container mx-auto px-4 py-32">
        <div class="text-center max-w-5xl mx-auto">
          <!-- 标签 -->
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 mb-8">
            <span class="text-sm font-medium text-gray-600 dark:text-gray-300">✨ 基于 Nuxt 4.0 构建</span>
          </div>

          <!-- 主标题 -->
          <h1 class="text-6xl md:text-8xl font-black mb-8 leading-tight">
            <span class="block text-gray-900 dark:text-white">现代化的</span>
            <span class="block bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              博客体验
            </span>
          </h1>

          <!-- 副标题 -->
          <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            使用最新的 Nuxt 4.0 和 Nuxt UI 构建，提供快速、优雅、响应式的阅读体验
          </p>

          <!-- 按钮组 -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <UButton
              to="/blog"
              size="xl"
              color="primary"
              class="px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <UIcon name="i-heroicons-rocket-launch" class="w-5 h-5 mr-2" />
              开始探索
            </UButton>
            <UButton
              to="/about"
              variant="outline"
              size="xl"
              class="px-8 py-4 text-lg font-semibold"
            >
              <UIcon name="i-heroicons-information-circle" class="w-5 h-5 mr-2" />
              了解更多
            </UButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section - 参照 Nuxt 官网的特性展示 -->
    <section class="py-24 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <div class="text-center mb-20">
          <h2 class="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            为什么选择我们？
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            基于现代技术栈构建，提供卓越的性能和开发体验
          </p>
        </div>

        <div class="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <!-- 性能优化 -->
          <div class="group relative">
            <div class="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div class="relative bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 transition-all duration-300">
              <div class="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-xl flex items-center justify-center mb-6">
                <UIcon name="i-heroicons-bolt" class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">极速性能</h3>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                基于 Nuxt 4.0 的服务端渲染和静态生成，配合智能预加载，提供闪电般的页面加载速度
              </p>
              <div class="mt-6 flex items-center text-green-600 dark:text-green-400 font-semibold">
                <span>了解更多</span>
                <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          <!-- 开发体验 -->
          <div class="group relative">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div class="relative bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300">
              <div class="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                <UIcon name="i-heroicons-code-bracket-square" class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">开发友好</h3>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                完整的 TypeScript 支持，热重载开发，ESLint 代码规范，让开发过程更加高效愉悦
              </p>
              <div class="mt-6 flex items-center text-blue-600 dark:text-blue-400 font-semibold">
                <span>查看文档</span>
                <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          <!-- 现代设计 -->
          <div class="group relative">
            <div class="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div class="relative bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300">
              <div class="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                <UIcon name="i-heroicons-sparkles" class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">现代设计</h3>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                基于 Nuxt UI 和 Tailwind CSS，支持深色模式，响应式设计，提供一致的用户体验
              </p>
              <div class="mt-6 flex items-center text-purple-600 dark:text-purple-400 font-semibold">
                <span>设计系统</span>
                <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Latest Posts - 参照 Nuxt 官网的内容展示 -->
    <section class="py-24 bg-gray-50 dark:bg-gray-800/30">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            最新文章
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            探索最新的技术趋势和开发实践
          </p>
        </div>

        <div class="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <article
            v-for="(post, index) in latestPosts"
            :key="post.slug"
            class="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
          >
            <!-- 文章封面渐变 -->
            <div class="h-48 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 relative overflow-hidden">
              <div class="absolute inset-0 bg-black/20"></div>
              <div class="absolute bottom-4 left-6 right-6">
                <div class="flex items-center space-x-2 text-white/90 text-sm">
                  <UIcon name="i-heroicons-calendar" class="w-4 h-4" />
                  <span>{{ formatDate(post.date) }}</span>
                  <span>•</span>
                  <UIcon name="i-heroicons-clock" class="w-4 h-4" />
                  <span>{{ post.readTime }} 分钟阅读</span>
                </div>
              </div>
            </div>

            <!-- 文章内容 -->
            <div class="p-6">
              <h3 class="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                <NuxtLink :to="`/blog/${post.slug}`" class="stretched-link">
                  {{ post.title }}
                </NuxtLink>
              </h3>

              <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                {{ post.description }}
              </p>

              <!-- 阅读更多按钮 -->
              <div class="flex items-center text-blue-600 dark:text-blue-400 font-semibold group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                <span>阅读全文</span>
                <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <!-- 文章标签 -->
            <div class="absolute top-4 right-4">
              <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
                {{ index === 0 ? '最新' : index === 1 ? '热门' : '推荐' }}
              </div>
            </div>
          </article>
        </div>

        <!-- 查看更多按钮 -->
        <div class="text-center mt-12">
          <UButton
            to="/blog"
            variant="outline"
            size="lg"
            class="px-8 py-3"
          >
            <UIcon name="i-heroicons-document-text" class="w-5 h-5 mr-2" />
            查看所有文章
          </UButton>
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

<style scoped>
/* 动画效果 */
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

/* 拉伸链接效果 */
.stretched-link::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  content: "";
}
</style>
