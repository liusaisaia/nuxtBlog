<script setup lang="ts">
const router = useRouter()

// 获取文章列表
const { data: posts, refresh } = await useFetch('/api/admin/posts')

// 删除文章
async function deletePost(id: number) {
  if (!confirm('确定要删除这篇文章吗？')) return

  await $fetch(`/api/admin/posts/${id}`, { method: 'DELETE' })
  refresh()
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-6 mt-20">
      <h1 class="text-2xl font-bold">文章管理</h1>
      <NuxtLink to="/admin/posts/new" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        新建文章
      </NuxtLink>
    </div>

    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">标题</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">创建时间</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">操作</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="post in posts" :key="post.id" class="hover:bg-gray-50">
            <td class="px-6 py-4">
              <NuxtLink :to="`/admin/posts/${post.id}`" class="text-blue-500 hover:text-blue-700">
                {{ post.title }}
              </NuxtLink>
            </td>
            <td class="px-6 py-4">
              <span :class="post.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'" class="px-2 py-1 rounded text-xs">
                {{ post.published ? '已发布' : '草稿' }}
              </span>
            </td>
            <td class="px-6 py-4 text-gray-500">
              {{ new Date(post.createdAt).toLocaleDateString('zh-CN') }}
            </td>
            <td class="px-6 py-4 text-right">
              <NuxtLink :to="`/admin/posts/${post.id}`" class="text-blue-500 hover:text-blue-700 mr-4">
                编辑
              </NuxtLink>
              <button @click="deletePost(post.id)" class="text-red-500 hover:text-red-700">
                删除
              </button>
            </td>
          </tr>
          <tr v-if="!posts?.length">
            <td colspan="4" class="px-6 py-8 text-center text-gray-500">
              暂无文章，<NuxtLink to="/admin/posts/new" class="text-blue-500">创建第一篇</NuxtLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
