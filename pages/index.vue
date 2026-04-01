<template>
  <div class="container-page pb-16 md:pb-24">
    <section class="pt-8 md:pt-16 motion-fade">
      <div class="surface-strong rounded-3xl p-6 md:p-10 overflow-hidden relative">
        <div class="absolute -top-20 -right-14 w-60 h-60 rounded-full bg-[var(--brand-soft)] blur-3xl" />
        <div class="absolute -bottom-24 -left-10 w-52 h-52 rounded-full bg-cyan-400/10 blur-3xl" />

        <div class="relative reveal-stagger">
          <p class="text-xs tracking-[0.2em] uppercase text-mute">Tech Reading Editorial</p>
          <h1 class="mt-3 text-4xl md:text-6xl font-semibold tracking-tight max-w-4xl leading-[1.05]">
            <transition name="mask">
              <span class="block">为技术博客读者构建 沉浸式阅读界面</span>
            </transition>
          </h1>
          <p class="text-soft mt-5 max-w-2xl text-base md:text-lg leading-relaxed">
            聚焦架构、性能与工程实践。通过分层动效和更清晰的信息结构，让读者更快进入正文、更久停留在文章深处。
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            <NuxtLink to="/posts" class="px-5 py-3 rounded-xl bg-[var(--brand)] text-white text-sm font-medium hover:opacity-90 transition-opacity inline-flex flex-row flex-nowrap items-center justify-center gap-2 whitespace-nowrap leading-none">
              <BookText class="w-4 h-4 shrink-0 block" :stroke-width="2" aria-hidden="true" />
              <span class="leading-none">浏览全部文章</span>
            </NuxtLink>
            <NuxtLink to="/tags" class="px-5 py-3 rounded-xl border border-soft text-soft hover:text-[var(--text)] hover:border-strong transition-colors text-sm font-medium inline-flex flex-row flex-nowrap items-center justify-center gap-2 whitespace-nowrap leading-none">
              <Tags class="w-4 h-4 shrink-0 block" :stroke-width="2" aria-hidden="true" />
              <span class="leading-none">查看主题标签</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <section class="mt-12 md:mt-16">
      <div class="flex items-center justify-between mb-5">
        <h2 class="text-2xl md:text-3xl tracking-tight font-semibold">最新文章</h2>
        <NuxtLink to="/posts" class="text-sm text-soft hover:text-[var(--brand)] transition-colors">查看归档</NuxtLink>
      </div>

      <div v-if="featuredPost" class="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5">
        <NuxtLink
          :to="featuredPost.path"
          class="lg:col-span-7 surface-strong rounded-3xl p-6 md:p-8 group transition-all duration-300 hover:-translate-y-1"
        >
          <div class="flex items-center gap-2 text-xs mb-4">
            <span class="brand-chip rounded-full px-2.5 py-1">主推阅读</span>
            <span class="text-mute">{{ featuredPost.readingTime || '8 分钟阅读' }}</span>
          </div>
          <h3 class="text-2xl md:text-3xl font-semibold tracking-tight leading-snug group-hover:text-[var(--brand)] transition-colors">
            {{ featuredPost.title }}
          </h3>
          <p class="text-soft mt-4 leading-relaxed line-clamp-3">
            {{ featuredPost.description || '点击进入文章查看完整内容。' }}
          </p>
          <div class="mt-8 text-sm text-mute flex items-center justify-between">
            <span>{{ formatDate(featuredPost.date) }}</span>
            <span class="inline-flex items-center gap-1.5 text-[var(--brand)]">
              进入阅读
              <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </NuxtLink>

        <div class="lg:col-span-5 grid gap-4 md:gap-5">
          <NuxtLink
            v-for="post in sidePosts"
            :key="post.path"
            :to="post.path"
            class="surface rounded-2xl p-5 group transition-all duration-300 hover:-translate-y-1"
          >
            <div class="text-xs text-mute mb-2">{{ formatDate(post.date) }}</div>
            <h4 class="text-lg font-medium tracking-tight leading-snug group-hover:text-[var(--brand)] transition-colors line-clamp-2">
              {{ post.title }}
            </h4>
            <p class="text-soft text-sm mt-2 line-clamp-2">
              {{ post.description || '查看文章内容。' }}
            </p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="mt-14 md:mt-20">
      <div class="flex items-end justify-between gap-4 mb-5">
        <h2 class="text-2xl md:text-3xl tracking-tight font-semibold">近期更新</h2>
        <div class="hidden md:flex flex-wrap gap-2 justify-end">
          <span v-for="topic in topTopics" :key="topic" class="brand-chip px-2.5 py-1 rounded-full text-xs">{{ topic }}</span>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
        <PostCard v-for="post in gridPosts" :key="post.path" :post="post" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { BookText, Tags } from 'lucide-vue-next'

interface Post {
  id: number
  title: string
  slug: string
  excerpt?: string | null
  coverImage?: string | null
  isFeatured?: boolean
  isSticky?: boolean
  viewCount?: number
  publishedAt?: string | null
  createdAt?: string | null
  date?: string
  category?: {
    id?: number
    name?: string | null
    slug?: string | null
    color?: string | null
  } | null
  tags?: Array<{
    id?: number
    name?: string | null
    slug?: string | null
    color?: string | null
  }>
  path: string
  description?: string | null
  readingTime?: string
}

const { data: postsData } = await useFetch('/api/posts', {
  query: { pageSize: 20 }
})

const posts = computed<Post[]>(() => (postsData.value?.list || []).map(post => ({
  ...post,
  path: `/posts/${post.slug}`,
  description: post.excerpt,
  readingTime: '8 分钟阅读'
})))

const featuredPost = computed(() => posts.value?.[0] || null)
const sidePosts = computed(() => posts.value?.slice(1, 4) || [])
const gridPosts = computed(() => posts.value?.slice(4, 10) || [])

const topTopics = computed(() => {
  const map = new Map<string, number>()
  for (const post of posts.value || []) {
    for (const tag of post.tags || []) {
      if (tag.name) {
        map.set(tag.name, (map.get(tag.name) || 0) + 1)
      }
    }
  }
  return [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name]) => name)
})

function formatDate(date?: string) {
  if (!date) return '未标注日期'
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

useHead({
  title: 'Void Notes - 技术博客',
  meta: [
    { name: 'description', content: '面向技术博客读者的工程实践与架构深读。' },
  ],
})
</script>

<style scoped>
.mask-enter-active {
  animation: mask-enter 1.5s ease-out forwards;
}

@keyframes mask-enter {
  0% {
    clip-path: polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%);
    opacity: 0;
  }
  100% {
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
    opacity: 1;
  }
}
</style>
