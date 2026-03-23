<template>
  <div>
    <!-- 主内容区 -->
    <div class="max-w-page mx-auto px-8">
      <!-- 首屏区域 -->
      <section class="relative pt-32 pb-24">
        <!-- 装饰背景 -->
        <div class="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-purple-500/5 to-transparent pointer-events-none" />

        <div class="max-w-4xl relative z-10">
          <!-- 主标题 -->
          <h1 class="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-6 text-white">
            构建下一代<br>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">虚空工程。</span>
          </h1>

          <!-- 副标题 -->
          <p class="text-lg text-text-secondary mb-8 leading-relaxed max-w-2xl">
            一个专注于系统编程前沿、响应式架构和高性能开发者工具的技术日志。
          </p>

          <!-- 行动按钮 -->
          <div class="flex items-center gap-4">
            <NuxtLink
              to="/posts"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent-purple text-white font-medium hover:bg-accent-purple/80 transition-all"
            >
              <span>探索文档</span>
            </NuxtLink>
            <NuxtLink
              to="/about"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#2a2435] text-white font-medium hover:bg-accent-purple hover:border-accent-purple transition-all border border-[#2a2435]"
            >
              查看项目
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- 最新文章区域 - 非对称网格 -->
      <section class="py-16">
        <div class="flex items-end justify-between mb-8">
          <h2 class="text-2xl font-bold text-white">最新文章</h2>
          <NuxtLink
            to="/posts"
            class="text-sm text-text-secondary hover:text-accent-purple transition-colors"
          >
            查看全部 →
          </NuxtLink>
        </div>

        <!-- 非对称网格布局 -->
        <div class="grid grid-cols-12 gap-6">
          <!-- 大型特色文章 -->
          <NuxtLink
            v-if="recentPosts[0]"
            :to="recentPosts[0].path"
            class="col-span-12 lg:col-span-7 lg:row-span-2 group relative rounded-2xl bg-[#1a1625] border border-[#2a2435] overflow-hidden hover:border-[#4a4060] transition-all min-h-[400px]"
          >
            <!-- 网络节点背景 -->
            <div class="absolute inset-0 overflow-hidden">
              <svg class="w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.3" />
                    <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0" />
                  </radialGradient>
                </defs>
                <!-- 连接线 -->
                <g stroke="#8b5cf6" stroke-width="0.5" opacity="0.3">
                  <line x1="100" y1="80" x2="200" y2="120" />
                  <line x1="200" y1="120" x2="300" y2="80" />
                  <line x1="300" y1="80" x2="400" y2="150" />
                  <line x1="400" y1="150" x2="500" y2="100" />
                  <line x1="150" y1="200" x2="250" y2="180" />
                  <line x1="250" y1="180" x2="350" y2="220" />
                  <line x1="350" y1="220" x2="450" y2="200" />
                  <line x1="80" y1="280" x2="180" y2="250" />
                  <line x1="180" y1="250" x2="280" y2="300" />
                  <line x1="280" y1="300" x2="380" y2="280" />
                  <line x1="380" y1="280" x2="480" y2="320" />
                  <line x1="120" y1="150" x2="180" y2="250" />
                  <line x1="250" y1="180" x2="300" y2="80" />
                  <line x1="350" y1="220" x2="400" y2="150" />
                </g>
                <!-- 节点 -->
                <g fill="#8b5cf6">
                  <circle cx="100" cy="80" r="3" opacity="0.8" />
                  <circle cx="200" cy="120" r="4" opacity="0.9" />
                  <circle cx="300" cy="80" r="3" opacity="0.7" />
                  <circle cx="400" cy="150" r="5" opacity="1" />
                  <circle cx="500" cy="100" r="3" opacity="0.6" />
                  <circle cx="150" cy="200" r="3" opacity="0.7" />
                  <circle cx="250" cy="180" r="4" opacity="0.9" />
                  <circle cx="350" cy="220" r="3" opacity="0.8" />
                  <circle cx="450" cy="200" r="4" opacity="0.7" />
                  <circle cx="80" cy="280" r="3" opacity="0.6" />
                  <circle cx="180" cy="250" r="5" opacity="1" />
                  <circle cx="280" cy="300" r="3" opacity="0.7" />
                  <circle cx="380" cy="280" r="4" opacity="0.8" />
                  <circle cx="480" cy="320" r="3" opacity="0.6" />
                  <circle cx="120" cy="150" r="3" opacity="0.5" />
                </g>
                <!-- 发光效果 -->
                <circle cx="400" cy="150" r="30" fill="url(#nodeGlow)" opacity="0.5" />
                <circle cx="180" cy="250" r="25" fill="url(#nodeGlow)" opacity="0.4" />
              </svg>
            </div>

            <!-- 内容 -->
            <div class="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#1a1625] via-[#1a1625]/90 to-transparent">
              <div class="flex items-center gap-2 mb-3">
                <span class="px-3 py-1 text-xs rounded-full bg-[#8b5cf6]/20 text-[#a78bfa] border border-[#8b5cf6]/30">
                  {{ recentPosts[0].tags?.[0] || '工程' }}
                </span>
              </div>
              <h3 class="text-2xl font-bold text-white mb-3 group-hover:text-[#a78bfa] transition-colors">
                {{ recentPosts[0].title }}
              </h3>
              <p class="text-text-secondary text-sm line-clamp-2 max-w-lg">
                {{ recentPosts[0].description }}
              </p>
            </div>
          </NuxtLink>

          <!-- 侧边文章列表 -->
          <div class="col-span-12 lg:col-span-5 space-y-4">
            <NuxtLink
              v-for="post in recentPosts.slice(1, 4)"
              :key="post.path"
              :to="post.path"
              class="group flex gap-4 p-4 rounded-xl bg-[#1a1625] border border-[#2a2435] hover:border-[#4a4060] transition-all"
            >
              <div class="w-20 h-20 rounded-lg bg-gradient-to-br from-[#2a2435] to-[#1a1625] flex-shrink-0 flex items-center justify-center border border-[#3a3445]">
                <svg class="w-10 h-10 text-[#6b5c8a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-xs text-[#a78bfa]">{{ post.tags?.[0] || '工程' }}</span>
                </div>
                <h4 class="text-sm font-semibold text-white mb-1 group-hover:text-[#a78bfa] transition-colors line-clamp-2">
                  {{ post.title }}
                </h4>
                <p class="text-xs text-text-muted line-clamp-2">{{ post.description }}</p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- 核心基础设施 - 图标网格 -->
      <section class="py-16">
        <h2 class="text-2xl font-bold text-white text-center mb-12">核心基础设施</h2>
        <div class="flex items-center justify-center gap-12 flex-wrap">
          <div v-for="tech in coreTechs" :key="tech.name" class="flex flex-col items-center gap-3 group cursor-pointer">
            <div class="w-16 h-16 rounded-xl bg-[#1a1625] border border-[#2a2435] flex items-center justify-center text-2xl group-hover:border-[#4a4060] group-hover:bg-[#231d2e] transition-all">
              {{ tech.icon }}
            </div>
            <span class="text-sm text-text-secondary group-hover:text-white transition-colors">{{ tech.name }}</span>
          </div>
        </div>
      </section>

      <!-- 活跃部署 - Bento 网格 -->
      <section class="py-16">
        <h2 class="text-2xl font-bold text-white mb-8">活跃部署</h2>
        <div class="grid grid-cols-12 gap-4">
          <!-- 大卡片 - Lumina 运行时 -->
          <div class="col-span-12 md:col-span-6 md:row-span-2 p-8 rounded-2xl bg-[#1a1625] border border-[#2a2435] hover:border-[#4a4060] transition-all group">
            <div class="text-xs text-[#a78bfa] mb-3 tracking-wider">运行时</div>
            <h3 class="text-2xl font-bold text-white mb-3 group-hover:text-[#a78bfa] transition-colors">Lumina 运行时</h3>
            <p class="text-text-secondary text-sm mb-6 leading-relaxed">一个内存安全且高性能的运行时，专为现代大规模数据系统优化。</p>
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span class="text-xs text-text-muted">运行中</span>
            </div>
          </div>

          <!-- 中卡片 - VoidCC -->
          <div class="col-span-12 md:col-span-6 p-6 rounded-2xl bg-[#1a1625] border border-[#2a2435] hover:border-[#4a4060] transition-all group">
            <div class="text-xs text-[#a78bfa] mb-2 tracking-wider">编译器</div>
            <h3 class="text-xl font-bold text-white mb-2 group-hover:text-[#a78bfa] transition-colors">VoidCC</h3>
            <p class="text-text-secondary text-sm leading-relaxed">一个用于领域特定语言的实验性编译器，具有零成本抽象。</p>
          </div>

          <!-- 小卡片行 -->
          <div class="col-span-12 md:col-span-3 p-6 rounded-2xl bg-[#1a1625] border border-[#2a2435] hover:border-[#4a4060] transition-all group">
            <div class="text-xs text-[#a78bfa] mb-2 tracking-wider">库</div>
            <h3 class="text-lg font-bold text-white mb-1 group-hover:text-[#a78bfa] transition-colors">Chronos</h3>
            <p class="text-text-secondary text-xs">时间序列数据结构</p>
          </div>

          <div class="col-span-12 md:col-span-3 p-6 rounded-2xl bg-[#1a1625] border border-[#2a2435] hover:border-[#4a4060] transition-all group">
            <div class="text-xs text-[#a78bfa] mb-2 tracking-wider">协议</div>
            <h3 class="text-lg font-bold text-white mb-1 group-hover:text-[#a78bfa] transition-colors">Spectral</h3>
            <p class="text-text-secondary text-xs">WebSocket 通信层</p>
          </div>
        </div>
      </section>

      <!-- 保持联系 - 行动号召 -->
      <section class="py-16">
        <div class="p-16 rounded-2xl bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] text-center relative overflow-hidden">
          <!-- 背景装饰 -->
          <div class="absolute inset-0 opacity-10">
            <div class="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
            <div class="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/3 translate-y-1/3" />
          </div>

          <div class="relative z-10">
            <h2 class="text-4xl font-bold text-white mb-4">保持联系。</h2>
            <p class="text-white/80 mb-10 max-w-lg mx-auto text-lg">
              接收关于新工程文章、系统设计和开源发布的更新。
            </p>
            <div class="flex items-center gap-4 justify-center flex-wrap">
              <input
                type="email"
                placeholder="your@email.com"
                class="px-6 py-4 rounded-lg bg-[#1a1625] border border-[#2a2435] text-white placeholder:text-text-muted focus:outline-none focus:border-accent-purple/50 w-80 text-base"
              >
              <button class="px-8 py-4 rounded-lg bg-accent-purple text-white font-semibold hover:bg-accent-purple/80 transition-all text-base">
                订阅
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
const coreTechs = [
  { name: 'Rust', icon: '⚙️' },
  { name: 'Go', icon: '🔵' },
  { name: 'TypeScript', icon: '🔷' },
  { name: 'WebAssembly', icon: '⚡' },
  { name: 'Nix', icon: '❄️' },
  { name: 'Zig', icon: '⚡' },
]

const { data: posts } = await useAsyncData('posts', () =>
  queryCollection('content')
    .order('date', 'DESC')
    .select('title', 'description', 'date', 'tags', 'path', 'readingTime')
    .all(),
)

const recentPosts = posts.value?.slice(0, 4) || []

useHead({
  title: 'VOIDZERO - 构建下一代虚空工程',
  meta: [
    { name: 'description', content: '一个专注于系统编程前沿、响应式架构和高性能开发者工具的技术日志。' },
  ],
})
</script>
