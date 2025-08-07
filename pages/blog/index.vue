<template>
  <div class="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
    <div class="container-main">
      <!-- 页面标题 -->
      <PageHeader
        title="博客文章"
        description="探索技术世界，分享编程经验与思考"
      />

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
          <ArticleCard
            v-for="post in filteredPosts"
            :key="post._path"
            :post="post"
            layout="detailed"
          />
        </TransitionGroup>
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

  // 类型转换：将ParsedContent转换为Post类型，确保必需属性存在
  return posts
    .slice(start, end)
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
