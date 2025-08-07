<template>
  <div class="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
    <div class="container-main">
      <!-- 页面标题 -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          文章分类
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          按分类浏览所有文章，快速找到您感兴趣的内容
        </p>
      </div>

      <div v-if="pending" class="flex justify-center py-12">
        <div class="loading"></div>
      </div>

      <div v-else-if="categories.length" class="space-y-8">
        <!-- 分类统计 -->
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          <div
            v-for="category in categories"
            :key="category.name"
            class="card p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer group"
            @click="navigateTo(`/categories/${encodeURIComponent(category.name)}`)"
          >
            <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 dark:group-hover:bg-primary-800/30 transition-colors">
              <Icon :name="getCategoryIcon(category.name)" class="w-8 h-8 text-primary-500" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors">
              {{ category.name }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm mb-3">
              {{ category.count }} 篇文章
            </p>
            <div class="flex items-center justify-center text-primary-500 group-hover:text-primary-600 transition-colors">
              <span class="text-sm font-medium mr-1">查看全部</span>
              <Icon name="i-heroicons-arrow-right" class="w-4 h-4" />
            </div>
          </div>
        </div>

        <!-- 最新文章预览 -->
        <div class="space-y-12">
          <div
            v-for="category in categories.slice(0, 3)"
            :key="category.name"
            class="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm"
          >
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mr-4">
                  <Icon :name="getCategoryIcon(category.name)" class="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                    {{ category.name }}
                  </h2>
                  <p class="text-gray-600 dark:text-gray-400">
                    {{ category.count }} 篇文章
                  </p>
                </div>
              </div>
              <UButton
                :to="`/categories/${encodeURIComponent(category.name)}`"
                variant="outline"
                icon="i-heroicons-arrow-right"
                trailing
              >
                查看全部
              </UButton>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <article
                v-for="post in category.posts.slice(0, 3)"
                :key="post._path"
                class="group cursor-pointer"
                @click="navigateTo(post._path)"
              >
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 h-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <div class="mb-3">
                    <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                      <Icon name="i-heroicons-calendar" class="w-4 h-4 mr-1" />
                      {{ formatDate(post.date) }}
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors line-clamp-2 mb-2">
                      {{ post.title }}
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                      {{ post.description }}
                    </p>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <div class="flex flex-wrap gap-1">
                      <span
                        v-for="tag in post.tags?.slice(0, 2)"
                        :key="tag"
                        class="inline-block bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 px-2 py-1 rounded text-xs font-medium"
                      >
                        {{ tag }}
                      </span>
                    </div>
                    <Icon name="i-heroicons-arrow-right" class="w-4 h-4 text-gray-400 group-hover:text-primary-500 transition-colors" />
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-else class="text-center py-16">
        <Icon name="i-heroicons-folder-open" class="w-20 h-20 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          暂无分类
        </h3>
        <p class="text-gray-500 dark:text-gray-400 mb-6">
          还没有创建任何文章分类
        </p>
        <UButton to="/blog">
          浏览所有文章
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// SEO 配置
useSeoMeta({
  title: '文章分类 - 现代博客',
  description: '按分类浏览所有文章，快速找到您感兴趣的内容。涵盖前端开发、后端技术、DevOps等多个技术领域。',
  ogTitle: '文章分类 - 现代博客',
  ogDescription: '按分类浏览所有文章，快速找到您感兴趣的内容。涵盖前端开发、后端技术、DevOps等多个技术领域。'
})

// 获取所有文章
const { data: posts, pending } = await useAsyncData('all-posts', () =>
  queryContent()
    .where({ _partial: false })
    .sort({ date: -1 })
    .find()
)

// 处理分类数据
const categories = computed(() => {
  if (!posts.value) return []
  
  const categoryMap = new Map()
  
  posts.value.forEach(post => {
    if (post.category) {
      if (!categoryMap.has(post.category)) {
        categoryMap.set(post.category, {
          name: post.category,
          count: 0,
          posts: []
        })
      }
      
      const category = categoryMap.get(post.category)
      category.count++
      category.posts.push(post)
    }
  })
  
  return Array.from(categoryMap.values())
    .sort((a, b) => b.count - a.count)
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

// 格式化日期
function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>