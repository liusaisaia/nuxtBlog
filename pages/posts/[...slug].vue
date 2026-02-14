<template>
  <article class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Header -->
    <header class="mb-12 text-center">
      <div class="flex items-center justify-center gap-2 mb-6">
        <span
          v-for="tag in doc.tags"
          :key="tag"
          class="px-3 py-1 text-sm rounded-full bg-violet-100 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-500/20"
        >
          {{ tag }}
        </span>
      </div>

      <h1 class="text-4xl sm:text-5xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">{{ doc.title }}</h1>

      <div class="flex items-center justify-center gap-4 text-gray-500 dark:text-gray-400">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-sm">
            {{ doc.author?.charAt(0) || 'A' }}
          </div>
          <div class="text-left">
            <div class="text-gray-900 dark:text-white font-medium text-sm">{{ doc.author || 'Anonymous' }}</div>
            <div class="text-xs">{{ formatDate(doc.date) }}</div>
          </div>
        </div>
        <span>·</span>
        <span class="text-sm">{{ doc.readingTime || '5 分钟阅读' }}</span>
      </div>
    </header>

    <!-- Content -->
    <div class="prose prose-lg prose-gray dark:prose-invert max-w-none">
      <ContentRenderer :value="doc" />
    </div>

    <!-- Tags Footer -->
    <div class="mt-12 pt-8 border-t border-gray-200 dark:border-white/10">
      <div class="flex items-center gap-2 flex-wrap">
        <span class="text-gray-500 dark:text-gray-400 font-medium">Tags:</span>
        <NuxtLink
          v-for="tag in doc.tags"
          :key="tag"
          :to="`/posts?tag=${tag}`"
          class="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-violet-500/50 hover:text-violet-600 dark:hover:text-violet-400 transition-colors text-gray-700 dark:text-gray-300"
        >
          {{ tag }}
        </NuxtLink>
      </div>
    </div>

    <!-- Navigation -->
    <div class="mt-8 pt-8 border-t border-gray-200 dark:border-white/10">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <NuxtLink
          v-if="prev"
          :to="prev.path"
          class="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors group"
        >
          <svg class="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          <div class="text-left">
            <div class="text-xs text-gray-400">上一篇</div>
            <div class="font-medium text-gray-900 dark:text-white">{{ prev.title }}</div>
          </div>
        </NuxtLink>
        <div v-else></div>

        <NuxtLink
          v-if="next"
          :to="next.path"
          class="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors text-right group"
        >
          <div class="text-right">
            <div class="text-xs text-gray-400">下一篇</div>
            <div class="font-medium text-gray-900 dark:text-white">{{ next.title }}</div>
          </div>
          <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </NuxtLink>
      </div>
    </div>
    
    <!-- Comments Section -->
    <div class="mt-16">
      <h3 class="text-2xl font-bold mb-8 text-gray-900 dark:text-white">评论</h3>
      <div class="p-8 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-center text-gray-500 dark:text-gray-400">
        <p>评论系统 (Giscus) 占位符。</p>
        <p class="text-sm mt-2">配置 Giscus repo ID 以启用评论。</p>
      </div>
    </div>
  </article>
</template>

<script setup>
const { path } = useRoute()

const { data: doc } = await useAsyncData(`content-${path}`, () =>
  queryCollection('content').path(path).first()
)

const { data: surround } = await useAsyncData(`surround-${path}`, async () => {
  const posts = await queryCollection('content')
    .order('date', 'DESC')
    .select('title', 'path')
    .all()
  
  const index = posts.findIndex(p => p.path === path)
  if (index === -1) return [null, null]
  
  return [
    posts[index + 1] || null, // prev (older)
    posts[index - 1] || null  // next (newer)
  ]
})

const [prev, next] = surround.value || []

function formatDate(date) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC' // Force UTC to avoid mismatch
  })
}

useHead(() => ({
  title: doc.value?.title,
  meta: [
    { name: 'description', content: doc.value?.description },
    { property: 'og:title', content: doc.value?.title },
    { property: 'og:description', content: doc.value?.description },
    { name: 'twitter:card', content: 'summary_large_image' }
  ]
}))
</script>
