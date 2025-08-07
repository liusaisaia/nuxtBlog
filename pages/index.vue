<template>
  <div>
    <!--  采用Nuxt官网风格 -->
    <section class="relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <!-- 背景装饰 -->
      <div class="absolute inset-0">
        <div class="absolute top-20 left-20 w-72 h-72 bg-green-100 dark:bg-green-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div class="absolute top-40 right-20 w-72 h-72 bg-blue-100 dark:bg-blue-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div class="absolute -bottom-8 left-40 w-72 h-72 bg-purple-100 dark:bg-purple-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div class="text-center">
          <div class="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-sm font-medium mb-8">
            <Icon name="i-heroicons-sparkles" class="w-4 h-4 mr-2" />
            欢迎来到我的技术博客
          </div>

          <h1 class="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            你好，我是
            <span class="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              前端开发者
            </span>
          </h1>

          <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            专注于现代前端技术，分享 Vue、React、TypeScript 等技术经验，
            记录我的学习成长和项目实践。
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <UButton
              to="/blog"
              size="lg"
              icon="i-heroicons-book-open"
              class="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              开始阅读
            </UButton>
            <UButton
              to="/about"
              size="lg"
              color="neutral"
              variant="outline"
              icon="i-heroicons-information-circle"
              class="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 hover:border-green-500 dark:hover:border-green-400 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-semibold transition-all duration-300"
            >
              了解更多
            </UButton>
          </div>
        </div>
      </div>
    </section>

    <!-- 特性介绍 -->
    <section class="py-20 bg-white dark:bg-gray-900">
      <div class="container-main">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            我的技能特长
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            专注于现代前端开发，掌握多种技术栈，热爱分享和学习
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="i-heroicons-code-bracket" class="w-8 h-8 text-primary-500" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              前端开发
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              精通 Vue、React、TypeScript 等现代前端技术栈，专注用户体验
            </p>
          </div>

          <div class="text-center p-6">
            <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="i-heroicons-device-phone-mobile" class="w-8 h-8 text-primary-500" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              响应式设计
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              擅长移动端适配和响应式布局，确保在各种设备上的完美体验
            </p>
          </div>

          <div class="text-center p-6">
            <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="i-heroicons-academic-cap" class="w-8 h-8 text-primary-500" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              技术分享
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              热爱学习新技术，乐于分享开发经验和最佳实践
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 最新文章 -->
    <section class="py-20 bg-gray-50 dark:bg-gray-800">
      <div class="container-main">
        <div class="flex items-center justify-between mb-12">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              最新文章
            </h2>
            <p class="text-xl text-gray-600 dark:text-gray-300">
              探索我们最新的技术分享和思考
            </p>
          </div>
          <UButton
            to="/blog"
            variant="outline"
            icon="i-heroicons-arrow-right"
            trailing
          >
            查看全部
          </UButton>
        </div>

        <div v-if="pending" class="flex justify-center py-12">
          <div class="loading"></div>
        </div>

        <div v-else-if="recentPosts?.length" class="blog-grid">
          <article
            v-for="post in recentPosts"
            :key="post._path"
            class="blog-card group cursor-pointer"
            @click="navigateTo(post._path)"
          >
            <div class="mb-4">
              <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                <Icon name="i-heroicons-calendar" class="w-4 h-4 mr-1" />
                {{ formatDate(post.date) }}
                <span class="mx-2">·</span>
                <Icon name="i-heroicons-clock" class="w-4 h-4 mr-1" />
                {{ post.readingTime || '5' }} 分钟阅读
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors mb-2">
                {{ post.title }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300 line-clamp-3">
                {{ post.description }}
              </p>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in post.tags?.slice(0, 3)"
                  :key="tag"
                  class="tag"
                >
                  {{ tag }}
                </span>
              </div>
              <Icon name="i-heroicons-arrow-right" class="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors" />
            </div>
          </article>
        </div>

        <div v-else class="text-center py-12">
          <Icon name="i-heroicons-document-text" class="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p class="text-gray-500 dark:text-gray-400 text-lg">
            暂无文章，敬请期待...
          </p>
        </div>
      </div>
    </section>

    <!-- 技术栈展示 -->
    <section class="py-20 bg-white dark:bg-gray-900">
      <div class="container-main">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            技术栈
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            我们使用最新、最优秀的前端技术构建这个博客系统
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          <div
            v-for="tech in techStack"
            :key="tech.name"
            class="text-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <div class="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <Icon :name="tech.icon" class="w-8 h-8" :class="tech.color" />
            </div>
            <h3 class="font-medium text-gray-900 dark:text-white text-sm">
              {{ tech.name }}
            </h3>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// SEO 配置
useSeoMeta({
  title: '现代博客 - 基于 Nuxt 4 的现代化博客系统',
  description: '基于 Nuxt 4 构建的现代化博客系统，采用最新的前端技术栈，为您提供优秀的阅读和写作体验。',
  ogTitle: '现代博客 - 基于 Nuxt 4 的现代化博客系统',
  ogDescription: '基于 Nuxt 4 构建的现代化博客系统，采用最新的前端技术栈，为您提供优秀的阅读和写作体验。',
  ogType: 'website'
})

// 获取最新文章
const { data: recentPosts, pending } = await useAsyncData('recent-posts', () =>
  queryContent()
    .where({ _partial: false })
    .sort({ date: -1 })
    .limit(6)
    .find()
)

// 技术栈数据
const techStack = [
  { name: 'Nuxt 4', icon: 'i-simple-icons-nuxtdotjs', color: 'text-green-500' },
  { name: 'Vue 3', icon: 'i-simple-icons-vuedotjs', color: 'text-green-600' },
  { name: 'TypeScript', icon: 'i-simple-icons-typescript', color: 'text-blue-600' },
  { name: 'UnoCSS', icon: 'i-simple-icons-unocss', color: 'text-gray-600' },
  { name: 'Nuxt UI', icon: 'i-heroicons-squares-2x2', color: 'text-primary-500' },
  { name: 'ESLint', icon: 'i-simple-icons-eslint', color: 'text-purple-600' }
]

// 格式化日期
function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
