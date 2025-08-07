<template>
  <div class="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
    <div class="container-main">
      <!-- 页面标题 -->
      <div class="text-center mb-12">
        <div class="flex items-center justify-center mb-4">
          <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mr-4">
            <Icon :name="getCategoryIcon(categoryName)" class="w-8 h-8 text-primary-500" />
          </div>
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            {{ categoryName }}
          </h1>
        </div>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-4">
          {{ getCategoryDescription(categoryName) }}
        </p>
        <div class="text-gray-500 dark:text-gray-400">
          共 {{ totalPosts }} 篇文章
        </div>
      </div>

      <!-- 面包屑导航 -->
      <nav class="mb-8">
        <ol class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <li>
            <NuxtLink to="/" class="hover:text-primary-500 transition-colors">
              首页
            </NuxtLink>
          </li>
          <li>
            <Icon name="i-heroicons-chevron-right" class="w-4 h-4" />
          </li>
          <li>
            <NuxtLink to="/categories" class="hover:text-primary-500 transition-colors">
              分类
            </NuxtLink>
          </li>
          <li>
            <Icon name="i-heroicons-chevron-right" class="w-4 h-4" />
          </li>
          <li>
            <span class="text-primary-500">{{ categoryName }}</span>
          </li>
        </ol>
      </nav>

      <!-- 文章列表 -->
      <div v-if="pending" class="flex justify-center py-12">
        <div class="loading"></div>
      </div>

      <div v-else-if="paginatedPosts?.length" class="space-y-8">
        <TransitionGroup name="slide-up" tag="div" class="space-y-8">
          <article
            v-for="post in paginatedPosts"
            :key="post._path"
            class="blog-card group cursor-pointer"
            @click="navigateTo(post._path)"
          >
            <div class="flex flex-col md:flex-row gap-6">
              <!-- 文章封面 -->
              <div v-if="post.image" class="md:w-1/3">
                <img
                  :src="post.image"
                  :alt="post.title"
                  class="w-full h-48 md:h-full object-cover rounded-lg"
                >
              </div>

              <!-- 文章内容 -->
              <div class="flex-1">
                <div class="mb-4">
                  <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <Icon name="i-heroicons-calendar" class="w-4 h-4 mr-1" />
                    {{ formatDate(post.date) }}
                    <span class="mx-2">·</span>
                    <Icon name="i-heroicons-clock" class="w-4 h-4 mr-1" />
                    {{ post.readingTime || '5' }} 分钟阅读
                    <span v-if="post.author" class="mx-2">·</span>
                    <span v-if="post.author" class="text-gray-600 dark:text-gray-300">
                      {{ post.author }}
                    </span>
                  </div>

                  <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors mb-3">
                    {{ post.title }}
                  </h2>

                  <p class="text-gray-600 dark:text-gray-300 text-lg leading-relaxed line-clamp-3 mb-4">
                    {{ post.description }}
                  </p>
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="tag in post.tags?.slice(0, 4)"
                      :key="tag"
                      class="tag"
                    >
                      {{ tag }}
                    </span>
                  </div>
                  <div class="flex items-center text-primary-500 group-hover:text-primary-600 transition-colors">
                    <span class="mr-2 font-medium">阅读更多</span>
                    <Icon name="i-heroicons-arrow-right" class="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </article>
        </TransitionGroup>

        <!-- 分页 -->
        <div v-if="totalPages > 1" class="flex justify-center mt-12">
          // 分页组件（第121行）- 移除activeButton配置
          <UPagination
            v-model="currentPage"
            :page-count="pageSize"
            :total="totalPosts"
            :ui="{
              item: 'outline'  // 直接使用item属性设置outline样式
            }"
          />
        </div>
      </div>

      <!-- 空状态 -->
      <div v-else class="text-center py-16">
        <Icon name="i-heroicons-document-magnifying-glass" class="w-20 h-20 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          该分类下暂无文章
        </h3>
        <p class="text-gray-500 dark:text-gray-400 mb-6">
          {{ categoryName }} 分类下还没有发布任何文章
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <UButton to="/categories">
            浏览其他分类
          </UButton>
          <UButton to="/blog" variant="outline">
            查看所有文章
          </UButton>
        </div>
      </div>

      <!-- 相关分类推荐 -->
      <div v-if="relatedCategories.length" class="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          其他分类
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <NuxtLink
            v-for="category in relatedCategories"
            :key="category.name"
            :to="`/categories/${encodeURIComponent(category.name)}`"
            class="card p-4 text-center hover:shadow-lg transition-all duration-300 group"
          >
            <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-primary-200 dark:group-hover:bg-primary-800/30 transition-colors">
              <Icon :name="getCategoryIcon(category.name)" class="w-6 h-6 text-primary-500" />
            </div>
            <h4 class="font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors text-sm">
              {{ category.name }}
            </h4>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {{ category.count }} 篇
            </p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const categoryName = route.params.category as string
const currentPage = ref(1)
const pageSize = 10

// SEO 配置
useSeoMeta({
  title: `${categoryName} - 文章分类 - 现代博客`,
  description: `浏览 ${categoryName} 分类下的所有文章，${getCategoryDescription(categoryName)}`,
  ogTitle: `${categoryName} - 文章分类 - 现代博客`,
  ogDescription: `浏览 ${categoryName} 分类下的所有文章，${getCategoryDescription(categoryName)}`
})

// 获取该分类下的所有文章
const { data: categoryPosts, pending } = await useAsyncData(`category-${categoryName}`, () =>
  queryContent()
    .where({
      _partial: false,
      category: categoryName
    })
    .sort({ date: -1 })
    .find()
)

// 获取所有分类（用于相关分类推荐）
const { data: allPosts } = await useAsyncData('all-posts-for-categories', () =>
  queryContent()
    .where({ _partial: false })
    .only(['category'])
    .find()
)

// 计算分页数据
const totalPosts = computed(() => categoryPosts.value?.length || 0)
const totalPages = computed(() => Math.ceil(totalPosts.value / pageSize))

const paginatedPosts = computed(() => {
  if (!categoryPosts.value) return []

  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize

  return categoryPosts.value.slice(start, end)
})

// 相关分类推荐
const relatedCategories = computed(() => {
  if (!allPosts.value) return []

  const categoryMap = new Map()

  allPosts.value.forEach(post => {
    if (post.category && post.category !== categoryName) {
      if (!categoryMap.has(post.category)) {
        categoryMap.set(post.category, {
          name: post.category,
          count: 0
        })
      }
      categoryMap.get(post.category).count++
    }
  })

  return Array.from(categoryMap.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 8)
})

// 获取分类图标
function getCategoryIcon(categoryName: string) {
  const iconMap: Record<string, string> = {
    '前端开发': 'i-heroicons-computer-desktop',
    '后端开发': 'i-heroicons-server',
    'DevOps': 'i-heroicons-cog-6-tooth',
    '数据库': 'i-heroicons-circle-stack',
    '移动开发': 'i-heroicons-device-phone-mobile',
    '人工智能': 'i-heroicons-cpu-chip',
    '设计': 'i-heroicons-paint-brush',
    '工具': 'i-heroicons-wrench-screwdriver',
    '教程': 'i-heroicons-academic-cap',
    '思考': 'i-heroicons-light-bulb',
    '生活': 'i-heroicons-heart',
    '技术': 'i-heroicons-code-bracket'
  }

  return iconMap[categoryName] || 'i-heroicons-folder'
}

// 获取分类描述
function getCategoryDescription(categoryName: string) {
  const descriptionMap: Record<string, string> = {
    '前端开发': '探索现代前端技术，包括 Vue、React、Angular 等框架的最佳实践',
    '后端开发': '深入后端技术栈，涵盖 Node.js、Python、Java 等服务端开发',
    'DevOps': '运维自动化、CI/CD、容器化等现代运维实践分享',
    '数据库': '数据库设计、优化、NoSQL 等数据存储相关技术',
    '移动开发': 'iOS、Android、跨平台移动应用开发技术分享',
    '人工智能': '机器学习、深度学习、AI 应用开发相关内容',
    '设计': 'UI/UX 设计、用户体验、设计系统等设计相关内容',
    '工具': '开发工具、效率工具、实用软件推荐与使用技巧',
    '教程': '详细的技术教程和学习指南',
    '思考': '技术思考、职业发展、行业观察等个人见解',
    '生活': '工作生活平衡、个人成长等生活感悟',
    '技术': '通用技术话题和技术趋势分析'
  }

  return descriptionMap[categoryName] || `${categoryName} 相关的技术文章和经验分享`
}

// 格式化日期
function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 404 处理
if (!pending.value && (!categoryPosts.value || categoryPosts.value.length === 0)) {
  // 这里不抛出 404，而是显示空状态，因为分类可能存在但暂无文章
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
