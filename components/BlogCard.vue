<template>
  <article class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-300 group">
    <div class="p-6">
      <div class="flex items-center justify-between mb-3">
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs font-medium"
          >
            {{ tag }}
          </span>
        </div>
        <span class="text-sm text-gray-500 dark:text-gray-400">
          {{ formatDate(post.date) }}
        </span>
      </div>

      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        <NuxtLink :to="`/blog/${post.slug}`">
          {{ post.title }}
        </NuxtLink>
      </h3>

      <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
        {{ post.description }}
      </p>

      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div class="w-4 h-4 i-carbon-time" />
          <span>{{ post.readTime }} 分钟阅读</span>
        </div>
        <NuxtLink
          :to="`/blog/${post.slug}`"
          class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm flex items-center space-x-1 group-hover:translate-x-1 transition-transform"
        >
          <span>阅读更多</span>
          <div class="w-4 h-4 i-carbon-arrow-right" />
        </NuxtLink>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
// 使用 Vue 3.6 的改进类型推断
interface Post {
  slug: string
  title: string
  description: string
  date: string
  readTime: number
  tags: string[]
}

const props = defineProps<{
  post: Post
}>()

// 使用计算属性优化日期格式化
const formattedDate = computed(() => {
  return new Date(props.post.date).toLocaleDateString('zh-CN', {
    month: 'short',
    day: 'numeric'
  })
})

// 计算属性：博客链接
const blogLink = computed(() => `/blog/${props.post.slug}`)

// 计算属性：阅读时间文本
const readTimeText = computed(() => `${props.post.readTime} 分钟阅读`)
</script>
