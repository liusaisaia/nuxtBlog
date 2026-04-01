<template>
  <article class="layout-shell pb-20">
    <div class="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-black/0">
      <div class="h-full bg-[var(--brand)] transition-[width] duration-150" :style="{ width: progress + '%' }" />
    </div>

    <header class="pt-8 md:pt-14">
      <div class="surface-strong rounded-3xl p-6 md:p-10 motion-rise">
        <div class="flex flex-wrap items-center gap-2 text-xs mb-4">
          <span v-for="tag in doc?.tags || []" :key="tag.id" class="brand-chip rounded-full px-2.5 py-1">{{ tag.name }}</span>
          <span class="text-mute">8 分钟阅读</span>
        </div>

        <h1 class="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] max-w-4xl">
          {{ doc?.title }}
        </h1>

        <div class="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-mute">
          <span class="inline-flex items-center gap-1.5">
            <CalendarDays class="w-4 h-4" :stroke-width="1.9" aria-hidden="true" />
            {{ formatDate(doc?.date) }}
          </span>
          <span class="inline-flex items-center gap-1.5">
            <UserRound class="w-4 h-4" :stroke-width="1.9" aria-hidden="true" />
            作者：Void Notes
          </span>
          <span class="inline-flex items-center gap-1.5">
            <Gauge class="w-4 h-4" :stroke-width="1.9" aria-hidden="true" />
            阅读进度 {{ Math.round(progress) }}%
          </span>
        </div>
      </div>
    </header>

    <div class="mt-8 grid grid-cols-1 xl:grid-cols-12 2xl:grid-cols-14 gap-5 xl:gap-6">
      <div class="xl:col-span-8 2xl:col-span-7">
        <div class="surface-strong rounded-3xl p-6 md:p-8">
          <div 
            class="prose prose-lg article-prose max-w-none" 
            v-html="doc?.content"
          />
        </div>
      </div>

      <aside class="xl:col-span-4 2xl:col-span-4 space-y-4">
        <div class="surface rounded-2xl p-4">
          <p class="text-xs uppercase tracking-[0.2em] text-mute mb-3">同标签阅读</p>
          <div class="space-y-2.5">
            <NuxtLink
              v-for="post in relatedPosts"
              :key="post.id"
              :to="post.path"
              class="block rounded-xl border border-soft p-3 hover:border-strong transition-colors"
            >
              <h3 class="font-medium text-sm leading-snug">{{ post.title }}</h3>
              <p class="text-xs text-mute mt-1">{{ formatDate(post.date) }}</p>
            </NuxtLink>
            <p v-if="relatedPosts.length === 0" class="text-sm text-soft">暂无同标签文章。</p>
          </div>
        </div>

        <div class="surface rounded-2xl p-4">
          <p class="text-xs uppercase tracking-[0.2em] text-mute mb-3">文章导航</p>
          <div class="space-y-2.5 text-sm">
            <NuxtLink v-if="prev" :to="prev.path" class="block rounded-xl border border-soft p-3 hover:border-strong transition-colors">
              <p class="text-xs text-mute mb-1">上一篇</p>
              <p>{{ prev.title }}</p>
            </NuxtLink>
            <NuxtLink v-if="next" :to="next.path" class="block rounded-xl border border-soft p-3 hover:border-strong transition-colors">
              <p class="text-xs text-mute mb-1">下一篇</p>
              <p>{{ next.title }}</p>
            </NuxtLink>
          </div>
        </div>
      </aside>
    </div>
  </article>
</template>

<script setup lang="ts">
import { CalendarDays, Gauge, UserRound } from 'lucide-vue-next'

const route = useRoute()

interface Post {
  id: number
  title: string
  slug: string
  content?: string | null
  excerpt?: string | null
  coverImage?: string | null
  isFeatured?: boolean
  isSticky?: boolean
  viewCount?: number
  publishedAt?: string | null
  createdAt?: string | null
  updatedAt?: string | null
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
}

const slug = computed(() => route.params.slug as string[])
const slugStr = computed(() => slug.value.join('/'))

const { data: doc } = await useFetch(`/api/posts/${slugStr.value}`)

if (!doc.value) {
  throw createError({ statusCode: 404, statusMessage: '文章不存在' })
}

const { data: postsData } = await useFetch('/api/posts', {
  query: { pageSize: 100 }
})

const allPosts = computed<Post[]>(() => (postsData.value?.list || []).map(post => ({
  ...post,
  path: `/posts/${post.slug}`,
  description: post.excerpt
})))

const surround = computed(() => {
  const posts = allPosts.value || []
  const index = posts.findIndex(p => p.slug === slugStr.value)
  if (index < 0) return [null, null]
  return [posts[index + 1] || null, posts[index - 1] || null]
})

const prev = computed(() => surround.value[0])
const next = computed(() => surround.value[1])

const relatedPosts = computed(() => {
  const current = doc.value
  if (!current) return []
  const currentTagIds = new Set((current.tags || []).map(t => t.id))
  return (allPosts.value || [])
    .filter((post) => post.slug !== slugStr.value)
    .filter((post) => (post.tags || []).some(tag => currentTagIds.has(tag.id)))
    .slice(0, 4)
})

const activeHeadingId = ref('')
const progress = ref(0)
let detachHeadingObserver: (() => void) | null = null

onMounted(() => {
  const updateProgress = () => {
    const total = document.documentElement.scrollHeight - window.innerHeight
    if (total <= 0) {
      progress.value = 0
      return
    }
    progress.value = Math.min(100, Math.max(0, (window.scrollY / total) * 100))
  }

  updateProgress()

  window.addEventListener('scroll', updateProgress, { passive: true })
  detachHeadingObserver = () => {
    window.removeEventListener('scroll', updateProgress)
  }
})

onBeforeUnmount(() => {
  if (detachHeadingObserver) detachHeadingObserver()
})

function formatDate(date?: string) {
  if (date == null) return '未标注日期'
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

useHead(() => ({
  title: `${doc.value?.title || '文章'} - Void Notes`,
  meta: [
    {
      name: 'description',
      content: doc.value?.excerpt || '技术博客文章阅读页。',
    },
  ],
}))
</script>
