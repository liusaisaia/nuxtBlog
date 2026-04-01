<script setup lang="ts">
definePageMeta({
  layout: 'admin',
})

type PostRow = {
  id: number
  title: string
  slug: string
  status?: string | null
  createdAt?: string | null
  updatedAt?: string | null
  category?: {
    id?: number
    name?: string | null
    slug?: string | null
  } | null
}

const router = useRouter()
const searchQuery = ref('')
const statusFilter = ref<string | undefined>(undefined)
const page = ref(1)
const pageSize = 10

const { data: postsData, pending, refresh } = await useFetch('/api/admin/posts', {
  query: computed(() => ({
    page: page.value,
    pageSize,
    keyword: searchQuery.value || undefined,
    status: statusFilter.value || undefined,
  })),
})

const posts = computed<PostRow[]>(() => postsData.value?.list || [])
const pagination = computed(() => postsData.value?.pagination || { page: 1, totalPages: 1, total: 0 })

watch([searchQuery, statusFilter], () => {
  page.value = 1
})

function formatDate(value?: string | null) {
  if (!value) return '-'
  return new Date(value).toLocaleString('zh-CN')
}

function statusText(status?: string | null) {
  return status === 'published' ? '已发布' : '草稿'
}

function statusClass(status?: string | null) {
  return status === 'published' 
    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
}

function goToNewPost() {
  router.push('/admin/new-post').catch(() => {
    window.location.href = '/admin/new-post'
  })
}

function goToEditPost(id: number) {
  const target = `/admin/posts/${id}`
  router.push(target).catch(() => {
    window.location.href = target
  })
}

async function deletePost(id: number) {
  if (!confirm('确定删除这篇文章吗？')) return
  await $fetch(`/api/admin/posts/${id}`, { method: 'DELETE' })
  await refresh()
}

function handlePageChange(newPage: number) {
  page.value = newPage
}
</script>

<template>
  <div class="container-page px-4 py-8">
    <div class="mb-8">
      <div class="text-xs text-text-muted light:text-gray-500 uppercase tracking-wider mb-2">内容中心</div>
      <div class="flex items-start justify-between gap-4 flex-wrap">
        <h1 class="text-3xl font-bold text-white light:text-gray-900">文章归档</h1>
        <button 
          @click="goToNewPost"
          class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors"
        >
          新建文章
        </button>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row gap-4 mb-6">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="按标题或正文搜索..." 
        class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select 
        v-model="statusFilter" 
        class="sm:w-48 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">筛选状态</option>
        <option value="published">已发布</option>
        <option value="draft">草稿</option>
      </select>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full border border-gray-300 dark:border-gray-700 rounded-md">
        <thead class="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th class="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border-b dark:border-gray-700">标题</th>
            <th class="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border-b dark:border-gray-700">Slug</th>
            <th class="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border-b dark:border-gray-700">分类</th>
            <th class="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border-b dark:border-gray-700">状态</th>
            <th class="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border-b dark:border-gray-700">更新时间</th>
            <th class="py-3 px-4 text-right text-sm font-medium text-gray-700 dark:text-gray-300 border-b dark:border-gray-700">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in posts" :key="post.id" class="hover:bg-gray-50 dark:hover:bg-gray-800">
            <td class="py-3 px-4 border-b dark:border-gray-700">
              <a :href="`/admin/posts/${post.id}`" class="text-blue-500 hover:underline">{{ post.title }}</a>
            </td>
            <td class="py-3 px-4 border-b dark:border-gray-700">
              <span class="text-xs text-text-muted">/{{ post.slug }}</span>
            </td>
            <td class="py-3 px-4 border-b dark:border-gray-700">
              {{ post.category?.name || '未分类' }}
            </td>
            <td class="py-3 px-4 border-b dark:border-gray-700">
              <span :class="['px-2 py-1 text-xs rounded-full', statusClass(post.status)]">
                {{ statusText(post.status) }}
              </span>
            </td>
            <td class="py-3 px-4 border-b dark:border-gray-700">
              {{ formatDate(post.updatedAt || post.createdAt || null) }}
            </td>
            <td class="py-3 px-4 border-b dark:border-gray-700 text-right">
              <div class="flex items-center justify-end gap-2">
                <button 
                  @click="goToEditPost(post.id)"
                  class="text-blue-500 hover:text-blue-700 text-sm"
                >
                  编辑
                </button>
                <button 
                  @click="deletePost(post.id)"
                  class="text-red-500 hover:text-red-700 text-sm"
                >
                  删除
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="posts.length === 0">
            <td colspan="6" class="py-8 text-center text-gray-500 dark:text-gray-400">
              暂无文章数据
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex items-center justify-between mt-6 flex-wrap gap-4">
      <div class="text-xs text-text-muted light:text-gray-500">
        第 {{ pagination.page }} / {{ Math.max(pagination.totalPages, 1) }} 页，共 {{ pagination.total }} 条数据
      </div>
      <div class="flex items-center gap-2">
        <button 
          @click="handlePageChange(page - 1)" 
          :disabled="page <= 1"
          class="px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ←
        </button>
        <span class="px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          {{ page }}
        </span>
        <button 
          @click="handlePageChange(page + 1)" 
          :disabled="page >= Math.max(pagination.totalPages, 1)"
          class="px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          →
        </button>
      </div>
    </div>
  </div>
</template>
