<script setup lang="ts">
definePageMeta({
  layout: 'admin',
})

const { data: dbStatus } = await useFetch('/api/admin/db-status')
const { data: postsAll } = await useFetch('/api/admin/posts', {
  query: { page: 1, pageSize: 1 },
})
const { data: postsPublished } = await useFetch('/api/admin/posts', {
  query: { page: 1, pageSize: 1, status: 'published' },
})
const { data: postsDraft } = await useFetch('/api/admin/posts', {
  query: { page: 1, pageSize: 1, status: 'draft' },
})
const { data: categoriesData } = await useFetch('/api/admin/categories')
const { data: tagsData } = await useFetch('/api/admin/tags')

const totalPosts = computed(() => postsAll.value?.pagination?.total || 0)
const publishedPosts = computed(() => postsPublished.value?.pagination?.total || 0)
const draftPosts = computed(() => postsDraft.value?.pagination?.total || 0)
const totalCategories = computed(() => categoriesData.value?.list?.length || 0)
const totalTags = computed(() => tagsData.value?.list?.length || 0)

const latestPosts = computed(() => postsAll.value?.list || [])
</script>

<template>
  <div>
    <div class="mb-8">
      <div class="text-xs text-text-muted light:text-gray-500 uppercase tracking-wider mb-2">系统概览</div>
      <h1 class="text-4xl font-bold text-white light:text-gray-900 mb-2">管理面板</h1>
      <p class="text-text-secondary light:text-gray-600 text-sm max-w-2xl">仅展示真实数据与可执行操作，去除演示数据和无效交互。</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 mb-8">
      <div class="p-5 bg-[#1a1625] dark:bg-[#1a1625] light:bg-white rounded-xl border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200">
        <div class="text-xs text-text-muted light:text-gray-500 uppercase mb-1">文章总数</div>
        <div class="text-2xl font-bold text-white light:text-gray-900">{{ totalPosts }}</div>
      </div>
      <div class="p-5 bg-[#1a1625] dark:bg-[#1a1625] light:bg-white rounded-xl border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200">
        <div class="text-xs text-text-muted light:text-gray-500 uppercase mb-1">已发布</div>
        <div class="text-2xl font-bold text-green-500">{{ publishedPosts }}</div>
      </div>
      <div class="p-5 bg-[#1a1625] dark:bg-[#1a1625] light:bg-white rounded-xl border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200">
        <div class="text-xs text-text-muted light:text-gray-500 uppercase mb-1">草稿</div>
        <div class="text-2xl font-bold text-yellow-500">{{ draftPosts }}</div>
      </div>
      <div class="p-5 bg-[#1a1625] dark:bg-[#1a1625] light:bg-white rounded-xl border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200">
        <div class="text-xs text-text-muted light:text-gray-500 uppercase mb-1">分类数</div>
        <div class="text-2xl font-bold text-white light:text-gray-900">{{ totalCategories }}</div>
      </div>
      <div class="p-5 bg-[#1a1625] dark:bg-[#1a1625] light:bg-white rounded-xl border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200">
        <div class="text-xs text-text-muted light:text-gray-500 uppercase mb-1">标签数</div>
        <div class="text-2xl font-bold text-white light:text-gray-900">{{ totalTags }}</div>
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div class="xl:col-span-2 p-6 bg-[#1a1625] dark:bg-[#1a1625] light:bg-white rounded-xl border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-white light:text-gray-900">最近文章</h2>
          <NuxtLink to="/admin/posts" class="text-sm text-accent-purple hover:underline">查看全部</NuxtLink>
        </div>

        <div v-if="!latestPosts.length" class="text-sm text-text-muted light:text-gray-500 py-8 text-center">
          暂无文章，去 <NuxtLink to="/admin/new-post" class="text-accent-purple hover:underline">新建文章</NuxtLink>
        </div>

        <div v-else class="space-y-3">
          <NuxtLink
            v-for="post in latestPosts"
            :key="post.id"
            :to="`/admin/posts/${post.id}`"
            class="block p-4 rounded-lg border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 hover:border-accent-purple/40 transition-colors"
          >
            <div class="flex items-start justify-between gap-4">
              <div class="min-w-0">
                <p class="text-white light:text-gray-900 font-medium truncate">{{ post.title }}</p>
                <p class="text-xs text-text-muted light:text-gray-500 mt-1">/{{ post.slug }}</p>
              </div>
              <span class="text-xs" :class="post.status === 'published' ? 'text-green-500' : 'text-yellow-600'">
                {{ post.status === 'published' ? '已发布' : '草稿' }}
              </span>
            </div>
          </NuxtLink>
        </div>
      </div>

      <div class="p-6 bg-[#1a1625] dark:bg-[#1a1625] light:bg-white rounded-xl border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200">
        <h2 class="text-lg font-semibold text-white light:text-gray-900 mb-4">系统状态</h2>
        <div class="space-y-3 text-sm">
          <div class="flex items-center justify-between">
            <span class="text-text-secondary light:text-gray-600">数据库连接</span>
            <span :class="dbStatus?.ok ? 'text-green-500' : 'text-red-500'">{{ dbStatus?.ok ? '正常' : '异常' }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-text-secondary light:text-gray-600">数据库类型</span>
            <span class="text-white light:text-gray-900">{{ dbStatus?.dialect || '-' }}</span>
          </div>
          <div class="text-xs text-text-muted light:text-gray-500 break-all">{{ dbStatus?.target || '-' }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
