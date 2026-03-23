<template>
  <article class="pt-24 min-h-screen">
    <div class="max-w-page mx-auto px-8 pb-20">
      <div class="flex gap-12">
        <!-- 左侧边栏 - 目录 -->
        <aside class="w-56 flex-shrink-0 hidden lg:block">
          <div class="sticky top-24">
            <h3 class="text-xs font-semibold text-text-muted mb-4 uppercase tracking-wider">
              目录
            </h3>
            <nav class="space-y-1">
              <a
                v-for="item in tocItems"
                :key="item.id"
                :href="`#${item.id}`"
                class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all group"
                :class="activeSection === item.id ? 'text-accent-purple bg-accent-purple/10' : 'text-text-secondary hover:text-white'"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full transition-colors"
                  :class="activeSection === item.id ? 'bg-accent-purple' : 'bg-text-muted group-hover:bg-text-secondary'"
                />
                <span>{{ item.text }}</span>
              </a>
            </nav>
          </div>
        </aside>

        <!-- 主内容区 -->
        <div class="flex-1 min-w-0 max-w-3xl">
          <!-- 文章头部 -->
          <header class="mb-12">
            <!-- 标签和阅读时间 -->
            <div class="flex items-center gap-3 mb-6">
              <span
                v-for="tag in doc.tags?.slice(0, 2)"
                :key="tag"
                class="px-3 py-1 text-xs rounded-full bg-accent-purple/20 text-accent-purple border border-accent-purple/30"
              >
                {{ tag }}
              </span>
              <span class="text-text-muted text-xs">{{ doc.readingTime || '12 分钟阅读' }}</span>
            </div>

            <!-- 标题 -->
            <h1 class="text-4xl sm:text-5xl font-bold text-white mb-8 leading-tight">
              重塑现代<br>
              <span class="text-accent-purple">打包器架构。</span>
            </h1>

            <!-- 作者信息 -->
            <div class="flex items-center justify-between pt-6 border-t border-[#2a2435]">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold overflow-hidden">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                    alt="头像"
                    class="w-full h-full object-cover"
                  >
                </div>
                <div>
                  <div class="text-white text-sm font-medium">{{ doc.author || 'Alex Rivera' }}</div>
                  <div class="text-text-muted text-xs">核心贡献者</div>
                </div>
              </div>
              <div class="text-right">
                <div class="text-white text-sm">{{ formatDate(doc.date) }}</div>
                <div class="text-text-muted text-xs">发布于 {{ doc.category || 'Technical' }}</div>
              </div>
            </div>
          </header>

          <!-- 特色图片/网络节点图 -->
          <div class="mb-12 rounded-xl overflow-hidden bg-[#1a1625] border border-[#2a2435]">
            <div class="aspect-[21/9] relative">
              <svg class="w-full h-full" viewBox="0 0 800 340" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <radialGradient id="articleNodeGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.4" />
                    <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0" />
                  </radialGradient>
                </defs>
                <!-- 连接线 -->
                <g stroke="#8b5cf6" stroke-width="0.5" opacity="0.2">
                  <line x1="100" y1="80" x2="200" y2="120" />
                  <line x1="200" y1="120" x2="300" y2="80" />
                  <line x1="300" y1="80" x2="400" y2="150" />
                  <line x1="400" y1="150" x2="500" y2="100" />
                  <line x1="500" y1="100" x2="600" y2="180" />
                  <line x1="150" y1="200" x2="250" y2="180" />
                  <line x1="250" y1="180" x2="350" y2="220" />
                  <line x1="350" y1="220" x2="450" y2="200" />
                  <line x1="450" y1="200" x2="550" y2="250" />
                  <line x1="80" y1="280" x2="180" y2="250" />
                  <line x1="180" y1="250" x2="280" y2="300" />
                  <line x1="280" y1="300" x2="380" y2="280" />
                  <line x1="380" y1="280" x2="480" y2="320" />
                  <line x1="120" y1="150" x2="180" y2="250" />
                  <line x1="250" y1="180" x2="300" y2="80" />
                  <line x1="350" y1="220" x2="400" y2="150" />
                  <line x1="450" y1="200" x2="500" y2="100" />
                </g>
                <!-- 节点 -->
                <g fill="#8b5cf6">
                  <circle cx="100" cy="80" r="3" opacity="0.8" />
                  <circle cx="200" cy="120" r="4" opacity="0.9" />
                  <circle cx="300" cy="80" r="3" opacity="0.7" />
                  <circle cx="400" cy="150" r="5" opacity="1" />
                  <circle cx="500" cy="100" r="3" opacity="0.6" />
                  <circle cx="600" cy="180" r="4" opacity="0.8" />
                  <circle cx="150" cy="200" r="3" opacity="0.7" />
                  <circle cx="250" cy="180" r="4" opacity="0.9" />
                  <circle cx="350" cy="220" r="3" opacity="0.8" />
                  <circle cx="450" cy="200" r="4" opacity="0.7" />
                  <circle cx="550" cy="250" r="3" opacity="0.6" />
                  <circle cx="80" cy="280" r="3" opacity="0.6" />
                  <circle cx="180" cy="250" r="5" opacity="1" />
                  <circle cx="280" cy="300" r="3" opacity="0.7" />
                  <circle cx="380" cy="280" r="4" opacity="0.8" />
                  <circle cx="480" cy="320" r="3" opacity="0.6" />
                  <circle cx="120" cy="150" r="3" opacity="0.5" />
                </g>
                <!-- 发光效果 -->
                <circle cx="400" cy="150" r="40" fill="url(#articleNodeGlow)" opacity="0.6" />
                <circle cx="180" cy="250" r="30" fill="url(#articleNodeGlow)" opacity="0.5" />
              </svg>
            </div>
          </div>

          <!-- 文章内容 -->
          <div class="prose prose-lg prose-invert max-w-none">
            <ContentRenderer :value="doc" />
          </div>

          <!-- 特性卡片 -->
          <div id="features" class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-6 rounded-xl bg-[#1a1625] border border-[#2a2435]">
              <div class="w-10 h-10 rounded-lg bg-accent-purple/20 flex items-center justify-center mb-4">
                <svg class="w-5 h-5 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-white mb-2">即时启动</h3>
              <p class="text-text-secondary text-sm">
                通过延迟加载和智能缓存，实现毫秒级开发服务器启动时间。
              </p>
            </div>
            <div class="p-6 rounded-xl bg-[#1a1625] border border-[#2a2435]">
              <div class="w-10 h-10 rounded-lg bg-accent-purple/20 flex items-center justify-center mb-4">
                <svg class="w-5 h-5 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-white mb-2">智能缓存</h3>
              <p class="text-text-secondary text-sm">
                细粒度的模块级缓存，在维护正确性的同时最大化缓存命中率。
              </p>
            </div>
          </div>

          <!-- 作者卡片 -->
          <div id="author" class="mt-12 p-6 rounded-xl bg-[#1a1625] border border-[#2a2435]">
            <div class="flex items-start gap-4">
              <div class="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold overflow-hidden flex-shrink-0">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                  alt="头像"
                  class="w-full h-full object-cover"
                >
              </div>
              <div class="flex-1">
                <div class="text-xs text-text-muted mb-1">作者</div>
                <h3 class="text-lg font-semibold text-white mb-2">Alex Rivera</h3>
                <p class="text-text-secondary text-sm leading-relaxed">
                  软件架构师，专注于构建工具和开发者体验设计。目前在 VOIDZERO 领导工具链开发，热衷于创造高性能的开发工具。
                </p>
                <div class="flex items-center gap-4 mt-4">
                  <a href="#" class="text-xs text-accent-purple hover:text-white transition-colors">Twitter</a>
                  <a href="#" class="text-xs text-accent-purple hover:text-white transition-colors">GitHub</a>
                  <a href="#" class="text-xs text-accent-purple hover:text-white transition-colors">个人网站</a>
                </div>
              </div>
            </div>
          </div>

          <!-- 讨论区 -->
          <div id="discussion" class="mt-12">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-bold text-white">
                讨论 <span class="text-text-muted text-base font-normal">(12)</span>
              </h3>
              <button class="px-4 py-2 rounded-lg bg-accent-purple text-white text-sm font-medium hover:bg-accent-purple/90 transition-all">
                加入讨论
              </button>
            </div>

            <!-- 评论列表 -->
            <div class="space-y-4">
              <div
                v-for="comment in comments"
                :key="comment.id"
                class="p-4 rounded-xl bg-[#1a1625] border border-[#2a2435]"
              >
                <div class="flex items-start gap-3">
                  <div class="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold overflow-hidden flex-shrink-0">
                    {{ comment.author.charAt(0) }}
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                      <span class="text-white text-sm font-medium">{{ comment.author }}</span>
                      <span class="text-text-muted text-xs">{{ comment.time }}</span>
                    </div>
                    <p class="text-text-secondary text-sm">{{ comment.content }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 文章导航 -->
          <div class="mt-12 pt-8 border-t border-[#2a2435]">
            <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
              <NuxtLink
                v-if="prev"
                :to="prev.path"
                class="flex items-center gap-3 text-text-secondary hover:text-accent-purple transition-colors group w-full sm:w-auto"
              >
                <svg class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                <div class="text-left">
                  <div class="text-xs text-text-muted">上一篇</div>
                  <div class="font-medium text-white text-sm">{{ prev.title }}</div>
                </div>
              </NuxtLink>
              <div v-else class="w-full sm:w-auto" />

              <NuxtLink
                v-if="next"
                :to="next.path"
                class="flex items-center gap-3 text-text-secondary hover:text-accent-purple transition-colors text-right group w-full sm:w-auto"
              >
                <div class="text-right">
                  <div class="text-xs text-text-muted">下一篇</div>
                  <div class="font-medium text-white text-sm">{{ next.title }}</div>
                </div>
                <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
const route = useRoute()

const { data: doc } = await useAsyncData(`content-${route.path}`, () =>
  queryCollection('content').path(route.path).first())

const { data: surround } = await useAsyncData(`surround-${route.path}`, async () => {
  const posts = await queryCollection('content')
    .order('date', 'DESC')
    .select('title', 'path')
    .all()

  const index = posts.findIndex(p => p.path === route.path)
  if (index === -1) return [null, null]

  return [
    posts[index + 1] || null,
    posts[index - 1] || null,
  ]
})

const [prev, next] = surround.value || []

// 目录项
const tocItems = computed(() => {
  if (!doc.value?.body?.toc?.links) return []
  const items = [
    { id: 'introduction', text: '引言' },
    { id: 'core-concept', text: '核心概念' },
    { id: 'features', text: '特性' },
    { id: 'author', text: '关于作者' },
    { id: 'discussion', text: '讨论' },
  ]
  return items
})

// 当前活跃的目录项
const activeSection = ref('introduction')

// 评论数据
const comments = [
  {
    id: 1,
    author: 'Sarah Chen',
    time: '2 天前',
    content: '这篇文章对现代打包器的解释非常清晰！特别是关于零延迟开发的部分，让我对 Vite 的架构有了更深的理解。',
  },
  {
    id: 2,
    author: 'Marcus Holloway',
    time: '1 周前',
    content: '关于智能缓存的策略很有意思。我在我们的项目中尝试了类似的方案，确实能显著提升构建速度。',
  },
]

function formatDate(date) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

useHead(() => ({
  title: doc.value?.title,
  meta: [
    { name: 'description', content: doc.value?.description },
    { property: 'og:title', content: doc.value?.title },
    { property: 'og:description', content: doc.value?.description },
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
}))
</script>

<style scoped>
.prose :deep(h1),
.prose :deep(h2),
.prose :deep(h3),
.prose :deep(h4) {
  @apply text-white;
}

.prose :deep(p) {
  @apply text-text-secondary leading-relaxed;
}

.prose :deep(a) {
  @apply text-accent-purple hover:text-purple-400 transition-colors;
}

.prose :deep(code) {
  @apply bg-[#1a1625] px-2 py-1 rounded text-sm text-accent-purple;
}

.prose :deep(pre) {
  @apply bg-[#1a1625] border border-[#2a2435] rounded-lg p-6 overflow-x-auto;
}

.prose :deep(pre code) {
  @apply bg-transparent p-0;
}

.prose :deep(img) {
  @apply rounded-xl border border-[#2a2435];
}

.prose :deep(blockquote) {
  @apply border-l-4 border-accent-purple pl-6 italic text-text-muted;
}
</style>
