<template>
  <div class="container-page pb-20">
    <section class="pt-8 md:pt-14">
      <div class="surface-strong rounded-3xl p-6 md:p-8 motion-rise">
        <p class="text-xs uppercase tracking-[0.2em] text-mute">Article Archive</p>
        <h1 class="text-3xl md:text-5xl font-semibold tracking-tight mt-3">技术文章归档</h1>
        <p class="text-soft mt-4 max-w-2xl">围绕前端工程、系统设计、开发工具与性能优化，快速找到你要读的那篇文章。</p>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-3 mt-6">
          <label class="lg:col-span-6 surface rounded-xl px-4 py-3 flex items-center gap-3">
            <svg class="w-4 h-4 text-mute" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M21 21l-4.35-4.35M16 10.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z" />
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              class="w-full bg-transparent outline-none text-sm"
              placeholder="搜索标题、摘要或标签"
            >
          </label>

          <label class="lg:col-span-3 relative">
            <select v-model="activeTag" class="themed-select w-full surface rounded-xl px-4 py-3 pr-10 text-sm outline-none">
              <option value="all">全部标签</option>
              <option v-for="tag in allTags" :key="tag" :value="tag">{{ tag }}</option>
            </select>
            <svg class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mute" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M6 9l6 6 6-6" />
            </svg>
          </label>

          <label class="lg:col-span-3 relative">
            <select v-model="sortBy" class="themed-select w-full surface rounded-xl px-4 py-3 pr-10 text-sm outline-none">
              <option value="latest">最新优先</option>
              <option value="oldest">最早优先</option>
              <option value="title">标题排序</option>
            </select>
            <svg class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mute" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M6 9l6 6 6-6" />
            </svg>
          </label>
        </div>
      </div>
    </section>

    <section class="mt-8">
      <div class="flex items-center justify-between mb-4">
        <p class="text-sm text-mute">共 {{ filteredPosts.length }} 篇文章</p>
        <div class="hidden md:flex flex-wrap gap-2 justify-end">
          <button
            v-for="tag in allTags.slice(0, 8)"
            :key="tag"
            class="px-2.5 py-1 rounded-full text-xs border transition-colors"
            :class="activeTag === tag ? 'brand-chip border-transparent' : 'border-soft text-soft hover:border-strong'"
            @click="activeTag = activeTag === tag ? 'all' : tag"
          >
            {{ tag }}
          </button>
        </div>
      </div>

      <div v-if="filteredPosts.length > 0" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
        <PostCard v-for="post in filteredPosts" :key="post.path" :post="post" />
      </div>

      <div v-else class="surface rounded-2xl p-8 text-center">
        <h2 class="text-lg font-medium">没有匹配结果</h2>
        <p class="text-soft mt-2 text-sm">换个关键词或切换标签试试。</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const searchQuery = ref('')
const activeTag = ref('all')
const sortBy = ref('latest')

const { data: posts } = await useAsyncData('posts-archive', () =>
  queryCollection('content')
    .order('date', 'DESC')
    .select('title', 'description', 'date', 'tags', 'path', 'readingTime')
    .all(),
)

const allTags = computed(() => {
  const set = new Set<string>()
  for (const post of posts.value || []) {
    for (const tag of post.tags || []) {
      set.add(tag)
    }
  }
  return [...set]
})

const filteredPosts = computed(() => {
  const keyword = searchQuery.value.trim().toLowerCase()

  let list = [...(posts.value || [])]

  if (activeTag.value !== 'all') {
    list = list.filter(post => (post.tags || []).includes(activeTag.value))
  }

  if (keyword) {
    list = list.filter((post) => {
      const title = post.title?.toLowerCase() || ''
      const desc = post.description?.toLowerCase() || ''
      const tags = (post.tags || []).join(' ').toLowerCase()
      return title.includes(keyword) || desc.includes(keyword) || tags.includes(keyword)
    })
  }

  if (sortBy.value === 'title') {
    list.sort((a, b) => a.title.localeCompare(b.title, 'zh-CN'))
  } else if (sortBy.value === 'oldest') {
    list.sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date)))
  } else {
    list.sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
  }

  return list
})

useHead({
  title: '文章归档 - Void Notes',
  meta: [
    { name: 'description', content: '按主题、关键词和时间快速检索技术文章。' },
  ],
})
</script>
