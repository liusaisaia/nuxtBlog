<template>
  <div class="pt-32 pb-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">全部文章</h1>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          探索关于 Web 开发、设计模式和现代技术的文章合集。
        </p>
      </div>

      <!-- Search & Filter -->
      <div class="flex flex-col sm:flex-row gap-4 mb-8 max-w-2xl mx-auto">
        <div class="relative flex-1">
          <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索文章..."
            class="w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-violet-500/50 focus:outline-none transition-colors text-gray-900 dark:text-white placeholder-gray-500"
          >
        </div>
        <select
          v-model="selectedTag"
          class="px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-violet-500/50 focus:outline-none transition-colors text-gray-900 dark:text-white"
        >
          <option value="" class="bg-white dark:bg-[#0a0a0a]">所有标签</option>
          <option v-for="tag in allTags" :key="tag" :value="tag" class="bg-white dark:bg-[#0a0a0a]">{{ tag }}</option>
        </select>
      </div>

      <!-- Posts Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PostCard
          v-for="post in filteredPosts"
          :key="post.path"
          :post="post"
        />
      </div>

      <!-- Empty State -->
      <div v-if="filteredPosts.length === 0" class="text-center py-20">
        <div class="text-6xl mb-4">🔍</div>
        <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">未找到相关文章</h3>
        <p class="text-gray-600 dark:text-gray-400">请尝试调整搜索关键词或筛选条件</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const searchQuery = ref('')
const selectedTag = ref('')
const route = useRoute()

// Initialize search/tag from query params if available
onMounted(() => {
  if (route.query.search) searchQuery.value = route.query.search
  if (route.query.tag) selectedTag.value = route.query.tag
})

// Watch for changes to update URL
watch([searchQuery, selectedTag], () => {
  const query = {}
  if (searchQuery.value) query.search = searchQuery.value
  if (selectedTag.value) query.tag = selectedTag.value
  navigateTo({ query }, { replace: true })
})

const { data: posts } = await useAsyncData('posts', () =>
  queryCollection('content')
    .order('date', 'DESC')
    .all()
)

const allTags = computed(() => {
  const tags = new Set()
  posts.value?.forEach(post => {
    post.tags?.forEach(tag => tags.add(tag))
  })
  return Array.from(tags).sort()
})

const filteredPosts = computed(() => {
  let result = posts.value || []

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(post =>
      post.title?.toLowerCase().includes(query) ||
      post.description?.toLowerCase().includes(query) ||
      post.tags?.some(tag => tag.toLowerCase().includes(query))
    )
  }

  if (selectedTag.value) {
    result = result.filter(post =>
      post.tags?.includes(selectedTag.value)
    )
  }

  return result
})

useHead({
  title: '文章列表 - 赛赛的前端视界',
  meta: [
    { name: 'description', content: '浏览所有技术文章和教程。' }
  ]
})
</script>
