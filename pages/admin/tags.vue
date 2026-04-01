<script setup lang="ts">
definePageMeta({
  layout: 'admin',
})

const name = ref('')
const { data: tags, refresh } = await useFetch('/api/admin/tags')
const tagList = computed(() => tags.value?.list || [])

async function createTag() {
  if (!name.value) return
  
  await $fetch('/api/admin/tags', {
    method: 'POST',
    body: { name: name.value }
  })
  
  name.value = ''
  refresh()
}

async function deleteTag(id: number) {
  if (!confirm('确定删除？')) return
  await $fetch(`/api/admin/tags/${id}`, { method: 'DELETE' })
  refresh()
}
</script>

<template>
  <div>
    <div class="mb-6">
      <div class="text-xs text-text-muted light:text-gray-500 uppercase tracking-wider mb-2">内容组织</div>
      <h1 class="text-3xl font-bold text-white light:text-gray-900">标签管理</h1>
    </div>

    <div class="bg-[#1a1625] dark:bg-[#1a1625] light:bg-white rounded-xl border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 p-6 mb-6">
      <div class="flex flex-col md:flex-row gap-3">
        <input v-model="name" placeholder="标签名称" class="flex-1 px-3 py-2 rounded-lg bg-[#0f0c16] dark:bg-[#0f0c16] light:bg-white border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 text-white light:text-gray-900" />
        <button @click="createTag" class="px-5 py-2 rounded-lg bg-accent-purple text-white hover:bg-accent-purple/90 transition-colors">
          新增标签
        </button>
      </div>
    </div>

    <div class="bg-[#1a1625] dark:bg-[#1a1625] light:bg-white rounded-xl border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 p-6">
      <div class="flex flex-wrap gap-2">
        <span v-for="tag in tagList" :key="tag.id" class="bg-[#2a2435] dark:bg-[#2a2435] light:bg-gray-100 text-white light:text-gray-800 px-3 py-1 rounded-full flex items-center gap-2">
          {{ tag.name }}
          <button @click="deleteTag(tag.id)" class="text-rose-400 hover:text-rose-300 light:text-rose-600 light:hover:text-rose-700">&times;</button>
        </span>
        <span v-if="!tagList.length" class="text-text-muted light:text-gray-500">暂无标签，请先新增。</span>
      </div>
    </div>
  </div>
</template>
