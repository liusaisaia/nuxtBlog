<script setup lang="ts">
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
    <h1 class="text-2xl font-bold mb-6">标签管理</h1>
    
    <div class="bg-white rounded-lg shadow p-6 mb-6">
      <div class="flex gap-4">
        <input v-model="name" placeholder="标签名称" class="flex-1 border rounded px-3 py-2" />
        <button @click="createTag" class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
          添加
        </button>
      </div>
    </div>
    
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex flex-wrap gap-2">
        <span v-for="tag in tagList" :key="tag.id" class="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2">
          {{ tag.name }}
          <button @click="deleteTag(tag.id)" class="text-red-500 hover:text-red-700">&times;</button>
        </span>
        <span v-if="!tagList.length" class="text-gray-500">暂无标签</span>
      </div>
    </div>
  </div>
</template>
