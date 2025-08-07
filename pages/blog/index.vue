<template>
  <div class="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
    <div class="container-main">
      <!-- 页面标题 -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          博客文章
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          探索技术世界，分享编程经验与思考
        </p>
      </div>

      <!-- 搜索和筛选 -->
      <div class="mb-8">
        <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
          <!-- 搜索框 -->
          <div class="w-full md:w-96">
            <UInput
              v-model="searchQuery"
              icon="i-heroicons-magnifying-glass"
              placeholder="搜索文章..."
              size="lg"
              :ui="{ trailing: 'pointer-events-none' }"
            >
              <template #trailing>
                <UButton
                  v-show="searchQuery !== ''"
                  color="neutral"
                  variant="link"
                  icon="i-heroicons-x-mark-20-solid"
                  :padded="false"
                  @click="searchQuery = ''"
                />
              </template>
            </UInput>
          </div>

          <!-- 分类筛选 -->
          <div class="flex items-center gap-4">
            <USelectMenu
              v-model="selectedCategory"
              :options="categoryOptions"
              placeholder="选择分类"
              size="lg"
              class="w-48"
            />
            <UButton
              v-if="selectedCategory || searchQuery"
              color="neutral"
              variant="outline"
              icon="i-heroicons-x-mark"
              @click="clearFilters"
            >
              清除筛选
            </UButton>
          </div>
        </div>
      </div>

      <!-- 文章列表 -->
      <div v-if="pending" class="flex justify-center py-12">
        <div class="loading"></div>
      </div>

      <div v-else-if="filteredPosts?.length" class="space-y-8">
        <TransitionGroup name="slide-up" tag="div" class="space-y-8">
          <article
            v-for="post in filteredPosts"
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
                    <span v-if="post.category" class="mx-2">·</span>
                    <span v-if="post.category" class="text-primary-500 font-medium">
                      {{ post.category }}
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
          // 搜索框清除按钮（第29行）- 保持不变
          <UButton
            icon="i-heroicons-x-mark-20-solid"
            variant="ghost"
            color="neutral"
            class="absolute right-2 top-1/2 -translate-y-1/2"
            @click="clearSearch"
          />

          // 分页组件（第135行）- 移除activeButton配置
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
          {{ searchQuery || selectedCategory ? '未找到匹配的文章' : '暂无文章' }}
        </h3>
        <p class="text-gray-500 dark:text-gray-400 mb-6">
          {{ searchQuery || selectedCategory ? '尝试调整搜索条件或筛选器' : '敬请期待更多精彩内容' }}
        </p>
        <UButton
          v-if="searchQuery || selectedCategory"
          @click="clearFilters"
        >
          清除筛选条件
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// SEO 配置
useSeoMeta({
  title: '博客文章 - 现代博客',
  description: '探索技术世界，分享编程经验与思考。涵盖前端开发、后端技术、DevOps等多个领域的技术文章。',
  ogTitle: '博客文章 - 现代博客',
  ogDescription: '探索技术世界，分享编程经验与思考。涵盖前端开发、后端技术、DevOps等多个领域的技术文章。'
})

// 响应式数据
const searchQuery = ref('')
const selectedCategory = ref('')
const currentPage = ref(1)
const pageSize = 10

// 获取所有文章
const { data: allPosts, pending } = await useAsyncData('blog-posts', () =>
  queryContent()
    .where({ _partial: false })
    .sort({ date: -1 })
    .find()
)

// 获取分类选项
const categoryOptions = computed(() => {
  if (!allPosts.value) return []

  const categories = [...new Set(allPosts.value
    .map(post => post.category)
    .filter(Boolean)
  )]

  return [
    { label: '全部分类', value: '' },
    ...categories.map(cat => ({ label: cat, value: cat }))
  ]
})

// 筛选后的文章
const filteredPosts = computed(() => {
  if (!allPosts.value) return []

  let posts = allPosts.value

  // 搜索筛选
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    posts = posts.filter(post =>
      post.title?.toLowerCase().includes(query) ||
      post.description?.toLowerCase().includes(query) ||
      post.tags?.some((tag: string) => tag.toLowerCase().includes(query))
    )
  }

  // 分类筛选
  if (selectedCategory.value) {
    posts = posts.filter(post => post.category === selectedCategory.value)
  }

  // 分页
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize

  return posts.slice(start, end)
})

// 总文章数和总页数
const totalPosts = computed(() => {
  if (!allPosts.value) return 0

  let posts = allPosts.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    posts = posts.filter(post =>
      post.title?.toLowerCase().includes(query) ||
      post.description?.toLowerCase().includes(query) ||
      post.tags?.some((tag: string) => tag.toLowerCase().includes(query))
    )
  }

  if (selectedCategory.value) {
    posts = posts.filter(post => post.category === selectedCategory.value)
  }

  return posts.length
})

const totalPages = computed(() => Math.ceil(totalPosts.value / pageSize))

// 清除搜索条件
function clearSearch() {
  searchQuery.value = ''
}

// 清除筛选条件
function clearFilters() {
  searchQuery.value = ''
  selectedCategory.value = ''
  currentPage.value = 1
}

// 格式化日期
function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 监听筛选条件变化，重置页码
watch([searchQuery, selectedCategory], () => {
  currentPage.value = 1
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
