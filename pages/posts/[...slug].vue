<template>
  <article class="layout-shell pb-20">
    <div class="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-black/0">
      <div class="h-full bg-[var(--brand)] transition-[width] duration-150" :style="{ width: progress + '%' }" />
    </div>

    <header class="pt-8 md:pt-14">
      <div class="surface-strong rounded-3xl p-6 md:p-10 motion-rise">
        <div class="flex flex-wrap items-center gap-2 text-xs mb-4">
          <span v-for="tag in doc?.tags || []" :key="tag" class="brand-chip rounded-full px-2.5 py-1">{{ tag }}</span>
          <span class="text-mute">{{ doc?.readingTime || '8 分钟阅读' }}</span>
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
            作者：{{ doc?.author || 'Void Notes' }}
          </span>
          <span class="inline-flex items-center gap-1.5">
            <Gauge class="w-4 h-4" :stroke-width="1.9" aria-hidden="true" />
            阅读进度 {{ Math.round(progress) }}%
          </span>
        </div>
      </div>
    </header>

    <div class="mt-8 grid grid-cols-1 xl:grid-cols-12 2xl:grid-cols-14 gap-5 xl:gap-6">
      <aside class="2xl:col-span-3 hidden 2xl:block">
        <div class="surface rounded-2xl p-4 sticky top-24">
          <p class="text-xs uppercase tracking-[0.2em] text-mute mb-3">目录</p>
          <nav class="space-y-1.5 max-h-[65vh] overflow-auto pr-1">
            <a
              v-for="item in headings"
              :key="item.id"
              :href="`#${item.id}`"
              class="block px-3 py-2 rounded-lg text-sm transition-colors"
              :class="activeHeadingId === item.id ? 'brand-chip font-medium' : 'text-soft hover:text-[var(--text)] hover:bg-[var(--brand-soft)]'"
            >
              {{ item.text }}
            </a>
          </nav>
        </div>
      </aside>

      <div class="xl:col-span-8 2xl:col-span-7">
        <div class="surface-strong rounded-3xl p-6 md:p-8">
          <ContentRenderer :value="docValue" class="prose prose-lg article-prose max-w-none" />
        </div>
      </div>

      <aside class="xl:col-span-4 2xl:col-span-4 space-y-4">
        <div class="surface rounded-2xl p-4">
          <p class="text-xs uppercase tracking-[0.2em] text-mute mb-3">同标签阅读</p>
          <div class="space-y-2.5">
            <NuxtLink
              v-for="post in relatedPosts"
              :key="post.path"
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

const { data: doc } = await useAsyncData(`content-${route.path}`, () =>
  queryCollection('content').path(route.path).first(),
)

if (doc.value == null) {
  throw createError({ statusCode: 404, statusMessage: '文章不存在' })
}

const { data: allPosts } = await useAsyncData('all-content-posts', () =>
  queryCollection('content')
    .order('date', 'DESC')
    .select('title', 'path', 'date', 'tags')
    .all(),
)

const surround = computed(() => {
  const posts = allPosts.value || []
  const index = posts.findIndex(p => p.path === route.path)
  if (index < 0) return [null, null]
  return [posts[index + 1] || null, posts[index - 1] || null]
})

const prev = computed(() => surround.value[0])
const next = computed(() => surround.value[1])

const relatedPosts = computed(() => {
  const current = doc.value
  if (current == null) return []
  const tags = new Set(current.tags || [])
  return (allPosts.value || [])
    .filter((post) => post.path !== current.path)
    .filter((post) => (post.tags || []).some(tag => tags.has(tag)))
    .slice(0, 4)
})

const docValue = computed(() => doc.value || {})

const headings = computed(() => {
  const links = doc.value?.body?.toc?.links || []
  const flat: Array<{ id: string; text: string }> = []

  for (const link of links) {
    if (link.id && link.text) flat.push({ id: link.id, text: link.text })
    for (const child of link.children || []) {
      if (child.id && child.text) flat.push({ id: child.id, text: `- ${child.text}` })
    }
  }

  return flat
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

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && entry.target.id) {
          activeHeadingId.value = entry.target.id
        }
      }
    },
    { rootMargin: '-22% 0px -62% 0px' },
  )

  const bindHeadings = () => {
    for (const item of headings.value) {
      const element = document.getElementById(item.id)
      if (element) observer.observe(element)
    }
  }

  bindHeadings()
  updateProgress()

  window.addEventListener('scroll', updateProgress, { passive: true })
  detachHeadingObserver = () => {
    window.removeEventListener('scroll', updateProgress)
    observer.disconnect()
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
      content: doc.value?.description || '技术博客文章阅读页。',
    },
  ],
}))
</script>
