<template>
  <div class="pt-24 min-h-screen">
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
        <div class="flex-1 min-w-0">
          <!-- 页面标题 -->
          <div class="mb-10">
            <h1 class="text-5xl font-bold text-white mb-3">
              文章归档<span class="text-accent-purple">.</span>
            </h1>
            <p class="text-text-secondary max-w-xl">
              精心策划的工程见解、架构模式和现代技术栈深度解析的精选索引。
            </p>
          </div>

          <!-- 搜索和筛选 -->
          <div class="flex flex-col sm:flex-row gap-4 mb-10">
            <div class="relative flex-1">
              <svg
                class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="搜索文章、标签或主题..."
                class="w-full pl-11 pr-4 py-2.5 rounded-lg bg-[#1a1625] border border-[#2a2435] text-white placeholder:text-text-muted focus:outline-none focus:border-[#4a4060] transition-colors text-sm"
              >
            </div>
            <div class="flex gap-2">
              <button
                v-for="filter in filters"
                :key="filter.id"
                class="px-4 py-2 rounded-lg text-sm font-medium transition-all border"
                :class="activeFilter === filter.id
                  ? 'bg-accent-purple/20 text-accent-purple border-accent-purple/30'
                  : 'bg-[#1a1625] text-text-secondary border-[#2a2435] hover:border-[#4a4060]'"
                @click="activeFilter = filter.id"
              >
                {{ filter.text }}
              </button>
            </div>
          </div>

          <!-- 分类卡片网格 -->
          <div id="categories" class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
            <div
              v-for="category in categories"
              :key="category.name"
              class="group p-6 rounded-xl bg-[#1a1625] border border-[#2a2435] hover:border-[#4a4060] transition-all cursor-pointer"
            >
              <div class="flex items-start justify-between mb-4">
                <span class="text-xs text-text-muted uppercase tracking-wider">{{ category.tag }}</span>
                <svg
                  class="w-5 h-5 text-text-muted group-hover:text-accent-purple transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="category.icon" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-2 group-hover:text-accent-purple transition-colors">
                {{ category.name }}
              </h3>
              <p class="text-text-secondary text-sm mb-4 line-clamp-2">
                {{ category.description }}
              </p>
              <div class="flex items-center gap-1 text-sm text-accent-purple">
                <span>探索</span>
                <svg
                  class="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>

          <!-- 文章时间线 -->
          <div id="timeline" class="space-y-12">
            <div v-for="(posts, year) in groupedPosts" :key="year">
              <!-- 年份标题 -->
              <h2 class="text-3xl font-bold text-white mb-6">{{ year }}</h2>

              <!-- 文章列表 -->
              <div class="space-y-4">
                <NuxtLink
                  v-for="post in posts"
                  :key="post.path"
                  :to="post.path"
                  class="group flex gap-6 p-4 rounded-xl hover:bg-[#1a1625]/50 transition-colors"
                >
                  <!-- 日期 -->
                  <div class="w-16 flex-shrink-0 text-right">
                    <span class="text-xs text-text-muted uppercase">{{ formatMonth(post.date) }}</span>
                    <div class="text-lg font-bold text-white">{{ formatDay(post.date) }}</div>
                  </div>

                  <!-- 内容 -->
                  <div class="flex-1 min-w-0 border-l border-[#2a2435] pl-6">
                    <div class="flex items-center gap-2 mb-2">
                      <span
                        v-for="tag in post.tags?.slice(0, 2)"
                        :key="tag"
                        class="px-2 py-0.5 text-xs rounded bg-accent-purple/10 text-accent-purple"
                      >
                        {{ tag }}
                      </span>
                    </div>
                    <h3 class="text-lg font-semibold text-white mb-1 group-hover:text-accent-purple transition-colors">
                      {{ post.title }}
                    </h3>
                    <p class="text-text-secondary text-sm line-clamp-2">
                      {{ post.description }}
                    </p>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- 订阅区域 -->
          <div id="subscribe" class="mt-16 p-8 rounded-2xl bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] relative overflow-hidden">
            <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 class="text-2xl font-bold text-white mb-2">
                  加入虚空<span class="text-white/80">.</span>
                </h3>
                <p class="text-white/70 text-sm max-w-md">
                  每周获取技术深度解析，直接送达你的收件箱。
                </p>
              </div>
              <div class="flex gap-3 w-full md:w-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  class="flex-1 md:w-64 px-4 py-3 rounded-lg bg-[#1a1625] border border-[#2a2435] text-white placeholder:text-text-muted focus:outline-none focus:border-accent-purple/50 text-sm"
                >
                <button class="px-6 py-3 rounded-lg bg-accent-purple text-white font-semibold hover:bg-accent-purple/80 transition-all text-sm whitespace-nowrap">
                  订阅
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 目录项
const tocItems = [
  { id: 'categories', text: '技术分类' },
  { id: 'timeline', text: '文章时间线' },
  { id: 'subscribe', text: '订阅更新' },
]

// 当前活跃的目录项
const activeSection = ref('categories')

// 筛选器
const filters = [
  { id: 'all', text: '全部' },
  { id: 'tutorial', text: '教程' },
  { id: 'architecture', text: '架构' },
]
const activeFilter = ref('all')
const searchQuery = ref('')

// 分类数据
const categories = [
  {
    name: '前端',
    tag: '开发',
    description: '深入 React、Vue 和不断演进的 UI 工程生态系统。',
    icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  },
  {
    name: '后端',
    tag: '架构',
    description: '可扩展系统、数据库优化和高性能 API。',
    icon: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01',
  },
  {
    name: 'DevOps',
    tag: '自动化',
    description: 'CI/CD 流水线、容器化和云原生基础设施。',
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
  },
]

// 获取文章数据
const { data: allPosts } = await useAsyncData('all-posts', () =>
  queryCollection('content')
    .order('date', 'DESC')
    .select('title', 'description', 'date', 'tags', 'path')
    .all(),
)

// 筛选后的文章
const filteredPosts = computed(() => {
  if (!allPosts.value) return []
  let posts = allPosts.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    posts = posts.filter(post =>
      post.title.toLowerCase().includes(query)
      || post.description?.toLowerCase().includes(query),
    )
  }

  return posts
})

// 按年份分组
const groupedPosts = computed(() => {
  const groups = {}
  filteredPosts.value.forEach((post) => {
    const year = new Date(post.date).getFullYear()
    if (!groups[year]) {
      groups[year] = []
    }
    groups[year].push(post)
  })
  return groups
})

// 格式化日期
function formatMonth(date) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('zh-CN', {
    month: 'short',
    timeZone: 'UTC',
  })
}

function formatDay(date) {
  if (!date) return ''
  return new Date(date).getDate()
}

// 监听滚动更新目录
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      })
    },
    { threshold: 0.5 },
  )

  tocItems.forEach((item) => {
    const element = document.getElementById(item.id)
    if (element) observer.observe(element)
  })
})

useHead({
  title: '文章归档 - VOIDZERO',
  meta: [
    { name: 'description', content: '精心策划的工程见解、架构模式和现代技术栈深度解析。' },
  ],
})
</script>
