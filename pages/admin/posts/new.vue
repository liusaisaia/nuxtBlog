<script setup lang="ts">
definePageMeta({
  layout: 'admin',
})

const router = useRouter()
const submitting = ref(false)
const form = reactive({
  title: '',
  slug: '',
  content: '',
  excerpt: '',
  status: 'draft',
})

async function createPost() {
  if (!form.title.trim()) {
    alert('请输入文章标题')
    return
  }

  submitting.value = true
  try {
    const res = await $fetch<{ success: boolean; post: { id: number } }>('/api/admin/posts', {
      method: 'POST',
      body: {
        title: form.title,
        slug: form.slug,
        content: form.content,
        excerpt: form.excerpt,
        status: form.status,
      },
    })

    if (res?.post?.id) {
      await router.push(`/admin/posts/${res.post.id}`)
      return
    }

    await router.push('/admin/posts')
  } catch (error: any) {
    alert(error?.data?.message || '创建文章失败')
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="max-w-4xl">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-white light:text-gray-900">新建文章</h1>
      <NuxtLink to="/admin/posts" class="text-sm text-accent-purple hover:underline">返回列表</NuxtLink>
    </div>

    <div class="bg-[#15121a] dark:bg-[#15121a] light:bg-white rounded-xl border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 p-6 space-y-4">
      <div>
        <label class="block text-sm mb-2 text-text-secondary light:text-gray-700">标题</label>
        <input v-model="form.title" class="w-full px-3 py-2 rounded border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 bg-[#1a1625] dark:bg-[#1a1625] light:bg-white text-white light:text-gray-900" placeholder="请输入标题" />
      </div>
      <div>
        <label class="block text-sm mb-2 text-text-secondary light:text-gray-700">Slug（可选）</label>
        <input v-model="form.slug" class="w-full px-3 py-2 rounded border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 bg-[#1a1625] dark:bg-[#1a1625] light:bg-white text-white light:text-gray-900" placeholder="自动生成或手动填写" />
      </div>
      <div>
        <label class="block text-sm mb-2 text-text-secondary light:text-gray-700">摘要</label>
        <textarea v-model="form.excerpt" rows="3" class="w-full px-3 py-2 rounded border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 bg-[#1a1625] dark:bg-[#1a1625] light:bg-white text-white light:text-gray-900" placeholder="可选" />
      </div>
      <div>
        <label class="block text-sm mb-2 text-text-secondary light:text-gray-700">正文</label>
        <textarea v-model="form.content" rows="12" class="w-full px-3 py-2 rounded border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 bg-[#1a1625] dark:bg-[#1a1625] light:bg-white text-white light:text-gray-900 font-mono" placeholder="请输入文章内容" />
      </div>
      <div class="flex items-center gap-3">
        <button :disabled="submitting" class="px-4 py-2 rounded bg-accent-purple text-white hover:bg-accent-purple/90 disabled:opacity-50" @click="createPost">
          {{ submitting ? '创建中...' : '创建并编辑' }}
        </button>
        <NuxtLink to="/admin/posts" class="px-4 py-2 rounded border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 text-text-secondary light:text-gray-700 hover:text-accent-purple">
          取消
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
