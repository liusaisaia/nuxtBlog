<script setup lang="ts">
definePageMeta({
  layout: 'admin',
})

const name = ref('')
const slug = ref('')
const { data: categories, refresh } = await useFetch('/api/admin/categories')
const categoryList = computed(() => categories.value?.list || [])

async function createCategory() {
  if (!name.value) return
  
  await $fetch('/api/admin/categories', {
    method: 'POST',
    body: { name: name.value, slug: slug.value || name.value.toLowerCase().replace(/\s+/g, '-') }
  })
  
  name.value = ''
  slug.value = ''
  refresh()
}

async function deleteCategory(id: number) {
  if (!confirm('确定删除？')) return
  await $fetch(`/api/admin/categories/${id}`, { method: 'DELETE' })
  refresh()
}
</script>

<template>
  <div>
    <div class="mb-6">
      <div class="text-xs text-text-muted light:text-gray-500 uppercase tracking-wider mb-2">内容组织</div>
      <h1 class="text-3xl font-bold text-white light:text-gray-900">分类管理</h1>
    </div>

    <div class="bg-[#1a1625] dark:bg-[#1a1625] light:bg-white rounded-xl border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 p-6 mb-6">
      <div class="flex flex-col md:flex-row gap-3">
        <input v-model="name" placeholder="分类名称" class="flex-1 px-3 py-2 rounded-lg bg-[#0f0c16] dark:bg-[#0f0c16] light:bg-white border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 text-white light:text-gray-900" />
        <input v-model="slug" placeholder="路径标识（可选）" class="md:w-52 px-3 py-2 rounded-lg bg-[#0f0c16] dark:bg-[#0f0c16] light:bg-white border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 text-white light:text-gray-900" />
        <button @click="createCategory" class="px-5 py-2 rounded-lg bg-accent-purple text-white hover:bg-accent-purple/90 transition-colors">
          新增分类
        </button>
      </div>
    </div>

    <div class="bg-[#1a1625] dark:bg-[#1a1625] light:bg-white rounded-xl border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 overflow-hidden">
      <table class="min-w-full">
        <thead class="bg-[#15121a] dark:bg-[#15121a] light:bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs text-text-muted light:text-gray-500 uppercase">名称</th>
            <th class="px-6 py-3 text-left text-xs text-text-muted light:text-gray-500 uppercase">路径标识</th>
            <th class="px-6 py-3 text-right text-xs text-text-muted light:text-gray-500 uppercase">操作</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#2a2435]/50 dark:divide-[#2a2435]/50 light:divide-gray-100">
          <tr v-for="cat in categoryList" :key="cat.id" class="hover:bg-accent-purple/5 transition-colors">
            <td class="px-6 py-4 text-white light:text-gray-900">{{ cat.name }}</td>
            <td class="px-6 py-4 text-text-secondary light:text-gray-600">{{ cat.slug }}</td>
            <td class="px-6 py-4 text-right">
              <button @click="deleteCategory(cat.id)" class="text-rose-400 hover:text-rose-300 light:text-rose-600 light:hover:text-rose-700">删除</button>
            </td>
          </tr>
          <tr v-if="!categoryList.length">
            <td colspan="3" class="px-6 py-10 text-center text-text-muted light:text-gray-500">暂无分类，请先新增。</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
