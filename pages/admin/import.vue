<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const file = ref<File | null>(null)
const uploading = ref(false)
const message = ref('')
const messageType = ref<'success' | 'error'>('success')
const importedPost = ref<any>(null)

function handleFileChange(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) {
    file.value = target.files[0]
  }
}

async function uploadFile() {
  if (!file.value) {
    message.value = '请选择文件'
    messageType.value = 'error'
    return
  }

  uploading.value = true
  message.value = ''
  importedPost.value = null

  const formData = new FormData()
  formData.append('file', file.value)

  try {
    const response = await $fetch('/api/admin/import', {
      method: 'POST',
      body: formData
    })
    
    message.value = '导入成功！'
    messageType.value = 'success'
    importedPost.value = response.post
  } catch (error: any) {
    message.value = error.message || '导入失败'
    messageType.value = 'error'
  } finally {
    uploading.value = false
  }
}
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold">导入文档</h1>
      <p class="text-gray-600 mt-1">从 Markdown 文件导入文章</p>
    </div>

    <div class="bg-white rounded-lg shadow p-6">
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          选择 Markdown 文件
        </label>
        <input
          type="file"
          accept=".md,.markdown"
          @change="handleFileChange"
          class="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        >
      </div>

      <p class="text-sm text-gray-500 mb-4">
        支持语雀导出的 Markdown 文件<br>
        支持 frontmatter：title, tags, category, excerpt, cover
      </p>

      <button
        @click="uploadFile"
        :disabled="uploading || !file"
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ uploading ? '导入中...' : '导入' }}
      </button>

      <div
        v-if="message"
        :class="[
          'mt-4 p-3 rounded-md',
          messageType === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        ]"
      >
        {{ message }}
      </div>

      <div v-if="importedPost" class="mt-4 p-4 bg-blue-50 rounded-md">
        <p class="font-medium">导入的文章：</p>
        <p class="text-lg font-semibold mt-1">{{ importedPost.title }}</p>
        <p class="text-sm text-gray-600 mt-1">Slug: {{ importedPost.slug }}</p>
        <p class="text-sm text-gray-600 mt-1">状态: {{ importedPost.status }}</p>
        <NuxtLink
          :to="`/admin/posts/${importedPost.id}`"
          class="inline-block mt-3 text-blue-600 hover:underline"
        >
          编辑文章 →
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
