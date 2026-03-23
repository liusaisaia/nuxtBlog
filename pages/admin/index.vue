<template>
  <div>
    <!-- 页面标题 -->
    <div class="mb-8">
      <div class="text-xs text-text-muted light:text-gray-500 uppercase tracking-wider mb-2">System Overview</div>
      <div class="flex items-start justify-between">
        <div>
          <h1 class="text-4xl font-bold text-white light:text-gray-900 mb-2">
            CORE_ANALYTICS
          </h1>
          <p class="text-text-secondary light:text-gray-600 text-sm max-w-xl">
            Performance metrics for DevBlog ecosystem. Live traffic monitoring and content engagement matrix.
          </p>
        </div>
        <div class="flex gap-3">
          <div class="px-4 py-2 bg-[#1a1625] dark:bg-[#1a1625] light:bg-white rounded-lg border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200">
            <div class="text-[10px] text-text-muted light:text-gray-500 uppercase">Uptime</div>
            <div class="text-lg font-bold text-white light:text-gray-900">99.98%</div>
          </div>
          <div class="px-4 py-2 bg-[#1a1625] dark:bg-[#1a1625] light:bg-white rounded-lg border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200">
            <div class="text-[10px] text-text-muted light:text-gray-500 uppercase">Region</div>
            <div class="text-lg font-bold text-white light:text-gray-900">US-EAST-1</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div class="p-5 bg-[#1a1625] dark:bg-[#1a1625] light:bg-white rounded-xl border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200">
        <div class="flex items-center justify-between mb-4">
          <div class="w-10 h-10 rounded-lg bg-[#2a2435] dark:bg-[#2a2435] light:bg-accent-purple/10 flex items-center justify-center">
            <svg class="w-5 h-5 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <span class="text-xs text-green-500 flex items-center gap-1">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            +12.4%
          </span>
        </div>
        <div class="text-xs text-text-muted light:text-gray-500 uppercase mb-1">Total Views</div>
        <div class="text-2xl font-bold text-white light:text-gray-900">124.5k</div>
      </div>

      <div class="p-5 bg-[#1a1625] dark:bg-[#1a1625] light:bg-white rounded-xl border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200">
        <div class="flex items-center justify-between mb-4">
          <div class="w-10 h-10 rounded-lg bg-[#2a2435] dark:bg-[#2a2435] light:bg-accent-purple/10 flex items-center justify-center">
            <svg class="w-5 h-5 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <span class="text-xs text-green-500 flex items-center gap-1">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            +8.1%
          </span>
        </div>
        <div class="text-xs text-text-muted light:text-gray-500 uppercase mb-1">Unique Visitors</div>
        <div class="text-2xl font-bold text-white light:text-gray-900">42.2k</div>
      </div>

      <div class="p-5 bg-[#1a1625] dark:bg-[#1a1625] light:bg-white rounded-xl border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200">
        <div class="flex items-center justify-between mb-4">
          <div class="w-10 h-10 rounded-lg bg-[#2a2435] dark:bg-[#2a2435] light:bg-accent-purple/10 flex items-center justify-center">
            <svg class="w-5 h-5 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
        <div class="text-xs text-text-muted light:text-gray-500 uppercase mb-1">Total Posts</div>
        <div class="text-2xl font-bold text-white light:text-gray-900">156</div>
        <div class="text-[10px] text-text-muted light:text-gray-500 mt-1">142 Published · 14 Drafts</div>
      </div>

      <div class="p-5 bg-[#1a1625] dark:bg-[#1a1625] light:bg-white rounded-xl border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200">
        <div class="flex items-center justify-between mb-4">
          <div class="w-10 h-10 rounded-lg bg-[#2a2435] dark:bg-[#2a2435] light:bg-accent-purple/10 flex items-center justify-center">
            <svg class="w-5 h-5 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
          </div>
        </div>
        <div class="text-xs text-text-muted light:text-gray-500 uppercase mb-1">Total Comments</div>
        <div class="text-2xl font-bold text-white light:text-gray-900">1,892</div>
      </div>
    </div>

    <!-- 主要内容区 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <!-- 流量图表 -->
      <div class="lg:col-span-2 p-6 bg-[#1a1625] dark:bg-[#1a1625] light:bg-white rounded-xl border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-sm font-semibold text-white light:text-gray-900 uppercase tracking-wider">Traffic Frequency</h3>
            <p class="text-xs text-text-muted light:text-gray-500 mt-1">Real-time session analysis over 24 hours</p>
          </div>
          <div class="flex gap-2">
            <button class="px-3 py-1 text-xs bg-accent-purple text-white rounded hover:bg-accent-purple/80 transition-colors">Daily</button>
            <button class="px-3 py-1 text-xs bg-[#2a2435] dark:bg-[#2a2435] light:bg-gray-100 text-text-secondary light:text-gray-600 rounded hover:bg-accent-purple/20 hover:text-accent-purple transition-colors">Weekly</button>
          </div>
        </div>

        <!-- 柱状图 -->
        <div class="h-48 flex items-end justify-between gap-2">
          <div v-for="(bar, index) in trafficData" :key="index" class="flex-1 flex flex-col items-center gap-2">
            <div
              class="w-full bg-accent-purple/30 rounded-t-sm relative group cursor-pointer"
              :style="{ height: `${bar.value}%` }"
            >
              <div class="absolute bottom-0 left-0 right-0 bg-accent-purple rounded-t-sm transition-all group-hover:bg-accent-purple/80" :style="{ height: '100%' }" />
            </div>
            <span v-if="index % 3 === 0" class="text-[10px] text-text-muted light:text-gray-500">{{ bar.time }}</span>
          </div>
        </div>
      </div>

      <!-- 热门文章 -->
      <div class="p-6 bg-[#1a1625] dark:bg-[#1a1625] light:bg-white rounded-xl border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200">
        <h3 class="text-sm font-semibold text-white light:text-gray-900 uppercase tracking-wider mb-6">Top Articles</h3>
        <div class="space-y-4">
          <div v-for="(article, index) in topArticles" :key="index" class="flex gap-3">
            <span class="text-lg font-bold text-text-muted light:text-gray-400 w-6">0{{ index + 1 }}</span>
            <div class="flex-1">
              <h4 class="text-sm text-white light:text-gray-900 font-medium leading-snug mb-1">{{ article.title }}</h4>
              <p class="text-[10px] text-text-muted light:text-gray-500">{{ article.views }} views · {{ article.readTime }}</p>
            </div>
          </div>
        </div>
        <button class="w-full mt-6 py-2 text-xs text-accent-purple hover:text-white transition-colors border border-accent-purple/30 rounded-lg hover:bg-accent-purple hover:border-accent-purple">
          View Full Report
        </button>
      </div>
    </div>

    <!-- 最近活动 -->
    <div class="p-6 bg-[#1a1625] dark:bg-[#1a1625] light:bg-white rounded-xl border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h3 class="text-sm font-semibold text-white light:text-gray-900 uppercase tracking-wider">Recent Activity</h3>
          <p class="text-xs text-text-muted light:text-gray-500 mt-1">Log of latest system and user interactions</p>
        </div>
        <button class="p-2 text-text-secondary light:text-gray-500 hover:text-accent-purple transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      <!-- 活动表格 -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="text-left border-b border-[#2a2435] dark:border-[#2a2435] light:border-gray-200">
              <th class="pb-3 text-[10px] text-text-muted light:text-gray-500 uppercase tracking-wider font-medium">User</th>
              <th class="pb-3 text-[10px] text-text-muted light:text-gray-500 uppercase tracking-wider font-medium">Action</th>
              <th class="pb-3 text-[10px] text-text-muted light:text-gray-500 uppercase tracking-wider font-medium">Target</th>
              <th class="pb-3 text-[10px] text-text-muted light:text-gray-500 uppercase tracking-wider font-medium">Status</th>
              <th class="pb-3 text-[10px] text-text-muted light:text-gray-500 uppercase tracking-wider font-medium text-right">Timestamp</th>
            </tr>
          </thead>
          <tbody class="text-sm">
            <tr v-for="activity in recentActivity" :key="activity.id" class="border-b border-[#2a2435]/50 dark:border-[#2a2435]/50 light:border-gray-100">
              <td class="py-4">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                    {{ activity.user.charAt(0) }}
                  </div>
                  <span class="text-white light:text-gray-900">{{ activity.user }}</span>
                </div>
              </td>
              <td class="py-4 text-text-secondary light:text-gray-600">{{ activity.action }}</td>
              <td class="py-4 text-text-secondary light:text-gray-600 font-mono text-xs">{{ activity.target }}</td>
              <td class="py-4">
                <span
                  class="px-2 py-1 text-[10px] rounded uppercase font-medium"
                  :class="{
                    'bg-green-500/20 text-green-500': activity.status === 'success',
                    'bg-yellow-500/20 text-yellow-600': activity.status === 'modified',
                    'bg-blue-500/20 text-blue-500': activity.status === 'complete'
                  }"
                >
                  {{ activity.status }}
                </span>
              </td>
              <td class="py-4 text-right text-text-muted light:text-gray-500 text-xs">{{ activity.time }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
// 页面布局
definePageMeta({
  layout: 'admin'
})

// 流量数据
const trafficData = [
  { time: '00:00', value: 35 },
  { time: '03:00', value: 28 },
  { time: '06:00', value: 45 },
  { time: '09:00', value: 62 },
  { time: '12:00', value: 55 },
  { time: '15:00', value: 48 },
  { time: '18:00', value: 70 },
  { time: '21:00', value: 58 },
  { time: '23:59', value: 42 },
]

// 热门文章
const topArticles = [
  { title: 'Rust Microservices at Scale', views: '12.4k', readTime: '4min read' },
  { title: 'Designing for Void Protocol', views: '9.8k', readTime: '12min read' },
  { title: 'Advanced Tailwind Patterns', views: '7.2k', readTime: '8min read' },
  { title: 'Next.js 14 Server Actions', views: '5.5k', readTime: '6min read' },
]

// 最近活动
const recentActivity = [
  { id: 1, user: 'alex.dev', action: 'Published Post', target: 'ID: RUST-891', status: 'success', time: '2m ago' },
  { id: 2, user: 'sarah_ux', action: 'Deleted Draft', target: 'ID: DESIGN-X', status: 'modified', time: '14m ago' },
  { id: 3, user: 'system_root', action: 'Database Backup', target: 'ID: BKUP-LNDN', status: 'complete', time: '1h ago' },
]
</script>
