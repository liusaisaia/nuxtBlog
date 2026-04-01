<script setup lang="ts">
definePageMeta({
  layout: 'admin',
})

const searchQuery = ref('')
const statusFilter = ref('')
const page = ref(1)
const pageSize = 10

const { data, pending, refresh } = await useFetch('/api/admin/comments', {
  query: computed(() => ({
    page: page.value,
    pageSize,
    keyword: searchQuery.value || undefined,
    status: statusFilter.value || undefined,
  })),
})

const comments = computed(() => data.value?.list || [])
const pagination = computed(() => data.value?.pagination || { page: 1, totalPages: 1, total: 0 })

function formatDate(value?: string | null) {
  if (!value) return '-'
  return new Date(value).toLocaleString('zh-CN')
}

function statusText(status?: string | null) {
  switch (status) {
    case 'approved':
      return '已通过'
    case 'rejected':
      return '已驳回'
    case 'spam':
      return '垃圾评论'
    default:
      return '待审核'
  }
}

function statusClass(status?: string | null) {
  switch (status) {
    case 'approved':
      return 'text-emerald-400 light:text-emerald-600'
    case 'rejected':
      return 'text-amber-400 light:text-amber-600'
    case 'spam':
      return 'text-rose-400 light:text-rose-600'
    default:
      return 'text-sky-400 light:text-sky-600'
  }
}

async function updateStatus(id: number, status: 'approved' | 'rejected' | 'spam' | 'pending') {
  await $fetch(`/api/admin/comments/${id}`, {
    method: 'PUT',
    body: { status },
  })
  await refresh()
}

async function deleteComment(id: number) {
  if (!confirm('确定删除该评论吗？')) return
  await $fetch(`/api/admin/comments/${id}`, { method: 'DELETE' })
  await refresh()
}

watch([searchQuery, statusFilter], () => {
  page.value = 1
})

function prevPage() {
  if (page.value <= 1) return
  page.value -= 1
}

function nextPage() {
  if (page.value >= pagination.value.totalPages) return
  page.value += 1
}
</script>

<template>
  <div>
    <div class="mb-8">
      <div class="text-xs text-text-muted light:text-gray-500 uppercase tracking-wider mb-2">互动中心</div>
      <h1 class="text-4xl font-bold text-white light:text-gray-900">评论管理</h1>
    </div>

    <div class="flex flex-col sm:flex-row gap-4 mb-6">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="搜索评论内容/作者/邮箱..."
        class="flex-1 px-4 py-3 bg-[#1a1625] dark:bg-[#1a1625] light:bg-white border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 rounded-lg text-white light:text-gray-900"
      >
      <select v-model="statusFilter" class="px-4 py-3 bg-[#1a1625] dark:bg-[#1a1625] light:bg-white border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 rounded-lg text-white light:text-gray-900">
        <option value="">全部状态</option>
        <option value="pending">待审核</option>
        <option value="approved">已通过</option>
        <option value="rejected">已驳回</option>
        <option value="spam">垃圾评论</option>
      </select>
    </div>

    <div class="bg-[#1a1625] dark:bg-[#1a1625] light:bg-white rounded-xl border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 overflow-hidden">
      <div class="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 text-[10px] text-text-muted light:text-gray-500 uppercase tracking-wider">
        <div class="col-span-4">评论内容</div>
        <div class="col-span-2">作者</div>
        <div class="col-span-2">所属文章</div>
        <div class="col-span-1">状态</div>
        <div class="col-span-2">时间</div>
        <div class="col-span-1 text-right">操作</div>
      </div>

      <div v-if="pending" class="px-6 py-10 text-center text-text-muted light:text-gray-500">加载中...</div>

      <template v-else>
        <div v-for="item in comments" :key="item.id" class="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[#2a2435]/50 dark:border-[#2a2435]/50 light:border-gray-100 items-start hover:bg-accent-purple/5 transition-colors">
          <div class="col-span-4 min-w-0">
            <p class="text-sm text-white light:text-gray-900 line-clamp-2">{{ item.content }}</p>
          </div>
          <div class="col-span-2 min-w-0">
            <p class="text-sm text-white light:text-gray-900 truncate">{{ item.authorName }}</p>
            <p class="text-xs text-text-muted light:text-gray-500 truncate">{{ item.authorEmail || '-' }}</p>
          </div>
          <div class="col-span-2 min-w-0">
            <p class="text-sm text-text-secondary light:text-gray-700 truncate">{{ item.post?.title || '未关联文章' }}</p>
          </div>
          <div class="col-span-1">
            <span class="text-xs" :class="statusClass(item.status)">{{ statusText(item.status) }}</span>
          </div>
          <div class="col-span-2 text-xs text-text-secondary light:text-gray-600">{{ formatDate(item.createdAt) }}</div>
          <div class="col-span-1 flex items-center justify-end gap-2">
            <button class="text-xs text-emerald-400 hover:text-emerald-300 light:text-emerald-600" @click="updateStatus(item.id, 'approved')">通过</button>
            <button class="text-xs text-amber-400 hover:text-amber-300 light:text-amber-600" @click="updateStatus(item.id, 'rejected')">驳回</button>
            <button class="text-xs text-rose-400 hover:text-rose-300 light:text-rose-600" @click="deleteComment(item.id)">删</button>
          </div>
        </div>

        <div v-if="!comments.length" class="px-6 py-10 text-center text-text-muted light:text-gray-500">
          暂无评论数据
        </div>
      </template>
    </div>

    <div class="flex items-center justify-between mt-6">
      <div class="text-xs text-text-muted light:text-gray-500">
        第 {{ pagination.page }} / {{ Math.max(pagination.totalPages, 1) }} 页，共 {{ pagination.total }} 条
      </div>
      <div class="flex items-center gap-2">
        <button class="px-3 py-1.5 rounded border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 text-text-secondary light:text-gray-600 disabled:opacity-40" :disabled="page <= 1" @click="prevPage">上一页</button>
        <button class="px-3 py-1.5 rounded border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 text-text-secondary light:text-gray-600 disabled:opacity-40" :disabled="page >= pagination.totalPages" @click="nextPage">下一页</button>
      </div>
    </div>
  </div>
</template>
