<script setup lang="ts">
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
    <h1 class="text-2xl font-bold mb-6">分类管理</h1>
    
    <div class="bg-white rounded-lg shadow p-6 mb-6">
      <div class="flex gap-4">
        <input v-model="name" placeholder="分类名称" class="flex-1 border rounded px-3 py-2" />
        <input v-model="slug" placeholder="Slug (可选)" class="w-40 border rounded px-3 py-2" />
        <button @click="createCategory" class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
          添加
        </button>
      </div>
    </div>
    
    <div class="bg-white rounded-lg shadow">
      <table class="min-w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left">名称</th>
            <th class="px-6 py-3 text-left">Slug</th>
            <th class="px-6 py-3 text-right">操作</th>
          </tr>
        </thead>
        <tbody class="divide-y">
          <tr v-for="cat in categoryList" :key="cat.id">
            <td class="px-6 py-4">{{ cat.name }}</td>
            <td class="px-6 py-4 text-gray-500">{{ cat.slug }}</td>
            <td class="px-6 py-4 text-right">
              <button @click="deleteCategory(cat.id)" class="text-red-500 hover:text-red-700">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
