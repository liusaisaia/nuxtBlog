<template>
  <article
    class="blog-card group cursor-pointer"
    :class="{ 'compact': layout === 'compact' }"
    @click="handleClick"
  >
    <div v-if="layout === 'detailed' && post.image" class="md:w-1/3">
      <img
        :src="post.image"
        :alt="post.title"
        class="w-full h-48 md:h-full object-cover rounded-lg"
      >
    </div>

    <div :class="layout === 'detailed' ? 'flex-1' : ''">
      <div class="mb-4">
        <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
          <Icon name="i-heroicons-calendar" class="w-4 h-4 mr-1" />
          {{ formatDate(post.date) }}
          <span v-if="post.date" class="mx-2">·</span>
          <Icon name="i-heroicons-clock" class="w-4 h-4 mr-1" />
          {{ post.readingTime || '5' }} 分钟阅读
          <span v-if="post.category" class="mx-2">·</span>
          <span v-if="post.category" class="text-primary-500 font-medium">
            {{ post.category }}
          </span>
        </div>

        <h3
          class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors mb-2"
          :class="{ 'text-2xl md:text-3xl': layout === 'detailed' }"
        >
          {{ post.title }}
        </h3>

        <p v-if="post.description" class="text-gray-600 dark:text-gray-300 line-clamp-3"
           :class="{ 'text-lg leading-relaxed mb-4': layout === 'detailed' }">
          {{ post.description }}
        </p>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tag in post.tags?.slice(0, layout === 'detailed' ? 4 : 3)"
            :key="tag"
            class="tag"
          >
            {{ tag }}
          </span>
        </div>
        <Icon
          name="i-heroicons-arrow-right"
          class="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors"
        />
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { navigateTo } from '#app'

interface Post {
  _path: string
  title: string
  description?: string
  date?: string
  readingTime?: string
  category?: string
  tags?: string[]
  image?: string
}

interface Props {
  post: Post
  layout?: 'compact' | 'detailed'
}

const props = defineProps<Props>()

const handleClick = () => {
  if (props.post._path) {
    navigateTo(props.post._path)
  }
}

const formatDate = (date?: string) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>
