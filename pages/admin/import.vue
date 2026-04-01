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
      <div class="text-xs text-text-muted light:text-gray-500 uppercase tracking-wider mb-2">导入中心</div>
      <h1 class="text-2xl font-bold text-white light:text-gray-900">导入文档</h1>
      <p class="text-text-secondary light:text-gray-600 mt-1">支持 Markdown / JSON 导入文章或笔记</p>
    </div>

    <div class="bg-[#15121a] dark:bg-[#15121a] light:bg-white rounded-xl border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 p-6 shadow-card">
      <div class="mb-4">
        <label class="block text-sm font-medium text-white light:text-gray-800 mb-2">
          选择导入文件
        </label>
        <input
          type="file"
          accept=".md,.markdown,.json"
          @change="handleFileChange"
          class="block w-full text-sm text-text-muted light:text-gray-500
            file:mr-4 file:py-2.5 file:px-4
            file:rounded-lg file:border file:border-[#2a2435] dark:file:border-[#2a2435] light:file:border-gray-200
            file:text-sm file:font-semibold
            file:bg-accent-purple/15 file:text-accent-purple
            hover:file:bg-accent-purple/25"
        >
      </div>

      <p class="text-sm text-text-secondary light:text-gray-600 mb-5 leading-relaxed">
        支持语雀导出的 Markdown 文件<br>
        支持 JSON / frontmatter 字段：title, tags, category, excerpt, cover
      </p>

      <button
        @click="uploadFile"
        :disabled="uploading || !file"
        class="px-5 py-2.5 bg-accent-purple text-white rounded-lg hover:bg-accent-purple/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all inline-flex items-center gap-2 hover:shadow-lg hover:shadow-accent-purple/25"
      >
        <svg v-if="uploading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-30" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
        {{ uploading ? '导入中...' : '开始导入' }}
      </button>

      <div
        v-if="message"
        :class="[
          'mt-4 p-3 rounded-lg border text-sm',
          messageType === 'success'
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 light:bg-emerald-50 light:text-emerald-700 light:border-emerald-200'
            : 'bg-rose-500/10 border-rose-500/30 text-rose-300 light:bg-rose-50 light:text-rose-700 light:border-rose-200'
        ]"
      >
        {{ message }}
      </div>

      <div v-if="importedPost" class="mt-4 p-4 bg-accent-purple/10 border border-accent-purple/25 rounded-lg">
        <p class="font-medium text-white light:text-gray-900">导入完成：</p>
        <p class="text-lg font-semibold mt-1 text-white light:text-gray-900">{{ importedPost.title }}</p>
        <p class="text-sm text-text-secondary light:text-gray-600 mt-1">路径标识: {{ importedPost.slug }}</p>
        <p class="text-sm text-text-secondary light:text-gray-600 mt-1">状态: {{ importedPost.status }}</p>
        <NuxtLink
          :to="`/admin/posts/${importedPost.id}`"
          class="inline-flex mt-3 text-accent-purple hover:opacity-80 font-medium"
        >
          编辑文章 →
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
