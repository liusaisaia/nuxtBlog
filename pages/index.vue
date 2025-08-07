<template>
  <div>
    <!-- Hero区域 -->
    <HeroSection
      title="你好，我是"
      highlight="前端开发者"
      description="专注于现代前端技术，分享 Vue、React、TypeScript 等技术经验，记录我的学习成长和项目实践。"
      :badge="{ text: '欢迎来到我的技术博客', icon: 'i-heroicons-sparkles' }"
      :buttons="[
        { label: '开始阅读', to: '/blog', icon: 'i-heroicons-book-open', class: 'px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300' },
        { label: '了解更多', to: '/about', icon: 'i-heroicons-information-circle', color: 'neutral', variant: 'outline', class: 'px-8 py-4 border-2 border-gray-300 dark:border-gray-600 hover:border-green-500 dark:hover:border-green-400 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-semibold transition-all duration-300' }
      ]"
    />

    <!-- 特性介绍 -->
    <section class="py-20 bg-white dark:bg-gray-900">
      <div class="container-main">
        <PageHeader
          title="我的技能特长"
          description="专注于现代前端开发，掌握多种技术栈，热爱分享和学习"
        />

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon="i-heroicons-code-bracket"
            title="前端开发"
            description="精通 Vue、React、TypeScript 等现代前端技术栈，专注用户体验"
          />
          <FeatureCard
            icon="i-heroicons-device-phone-mobile"
            title="响应式设计"
            description="擅长移动端适配和响应式布局，确保在各种设备上的完美体验"
          />
          <FeatureCard
            icon="i-heroicons-academic-cap"
            title="技术分享"
            description="热爱学习新技术，乐于分享开发经验和最佳实践"
          />
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

        <div v-else-if="typedRecentPosts?.length" class="blog-grid">
          <ArticleCard
            v-for="post in typedRecentPosts"
            :key="post._path"
            :post="post"
            layout="compact"
          />
        </div>
      </div>
    </section>

    <!-- 技术栈展示 -->
    <section class="py-20 bg-white dark:bg-gray-900">
      <div class="container-main">
        <PageHeader
          title="技术栈"
          description="我们使用最新、最优秀的前端技术构建这个博客系统"
        />

        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          <TechStackCard
            v-for="tech in techStack"
            :key="tech.name"
            :tech="tech"
          />
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

// 类型转换：将ParsedContent转换为Post类型
const typedRecentPosts = computed(() => {
  if (!recentPosts.value) return []
  return recentPosts.value
    .filter(post => post._path && post.title) // 过滤掉没有_path或title的文章
    .map(post => ({
      _path: post._path!, // 使用非空断言，因为已经过滤掉了undefined
      title: post.title!, // 使用非空断言，因为已经过滤掉了undefined
      description: post.description,
      date: post.date,
      readingTime: post.readingTime,
      category: post.category,
      tags: post.tags,
      image: post.image
    }))
})

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
