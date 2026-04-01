<script setup lang="ts">
definePageMeta({
  layout: 'admin',
})

const route = useRoute()
const router = useRouter()
const isNew = computed(() => route.params.id === 'new')

const title = ref('')
const content = ref('')
const slug = ref('')
const description = ref('')
const coverImage = ref('')
const published = ref(false)
const categoryId = ref<number | null>(null)
const saving = ref(false)
const uploadingCover = ref(false)

// 获取分类
const { data: categories } = await useFetch('/api/admin/categories')
const categoryList = computed(() => categories.value?.list || [])

async function loadPostDetail() {
  if (isNew.value) return

  const data = await $fetch(`/api/admin/posts/${route.params.id}`)
  title.value = data.title
  content.value = data.content || ''
  slug.value = data.slug || ''
  description.value = data.excerpt || ''
  coverImage.value = data.coverImage || ''
  published.value = data.status === 'published'
  categoryId.value = data.categoryId
}

watch(
  () => route.params.id,
  async () => {
    await loadPostDetail()
  },
  { immediate: true },
)

// 保存文章
async function savePost() {
  if (!title.value || !content.value) {
    alert('请填写标题和内容')
    return
  }
  
  saving.value = true
  
  try {
    const body = {
      title: title.value,
      content: content.value,
      slug: slug.value || title.value.toLowerCase().replace(/\s+/g, '-'),
      excerpt: description.value,
      coverImage: coverImage.value,
      status: published.value ? 'published' : 'draft',
      categoryId: categoryId.value
    }
    
    if (isNew.value) {
      await $fetch('/api/admin/posts', { method: 'POST', body })
    } else {
      await $fetch(`/api/admin/posts/${route.params.id}`, { method: 'PUT', body })
    }
    
    router.push('/admin/posts')
  } catch (e) {
    alert('保存失败')
  } finally {
    saving.value = false
  }
}

async function uploadCover(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  const formData = new FormData()
  formData.append('file', file)

  uploadingCover.value = true
  try {
    const response = await $fetch<{ success: boolean; url: string }>('/api/admin/upload', {
      method: 'POST',
      body: formData,
    })
    coverImage.value = response.url
  } catch (error: any) {
    alert(error?.data?.message || error?.message || '封面上传失败')
  } finally {
    uploadingCover.value = false
    input.value = ''
  }
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-white light:text-gray-900">{{ isNew ? '新建文章' : '编辑文章' }}</h1>
      <NuxtLink to="/admin/posts" class="text-text-secondary light:text-gray-600 hover:text-accent-purple">
        返回列表
      </NuxtLink>
    </div>

    <div class="bg-[#1a1625] dark:bg-[#1a1625] light:bg-white rounded-xl border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 p-6">
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1 text-white light:text-gray-900">标题</label>
          <input v-model="title" type="text" class="w-full px-3 py-2 rounded-lg bg-[#0f0c16] dark:bg-[#0f0c16] light:bg-white border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 text-white light:text-gray-900" placeholder="文章标题" />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1 text-white light:text-gray-900">路径标识（Slug）</label>
          <input v-model="slug" type="text" class="w-full px-3 py-2 rounded-lg bg-[#0f0c16] dark:bg-[#0f0c16] light:bg-white border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 text-white light:text-gray-900" placeholder="url-slug" />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1 text-white light:text-gray-900">描述</label>
          <textarea v-model="description" class="w-full px-3 py-2 rounded-lg bg-[#0f0c16] dark:bg-[#0f0c16] light:bg-white border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 text-white light:text-gray-900" rows="2" placeholder="文章描述"></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1 text-white light:text-gray-900">封面图</label>
          <div class="space-y-3">
            <input v-model="coverImage" type="text" class="w-full px-3 py-2 rounded-lg bg-[#0f0c16] dark:bg-[#0f0c16] light:bg-white border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 text-white light:text-gray-900" placeholder="封面图 URL（可粘贴或上传）" />
            <div class="flex items-center gap-3">
              <label class="inline-flex items-center px-3 py-2 border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 rounded cursor-pointer hover:bg-accent-purple/10 text-sm text-text-secondary light:text-gray-700">
                <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" class="hidden" @change="uploadCover">
                {{ uploadingCover ? '上传中...' : '上传图片' }}
              </label>
              <span class="text-xs text-text-muted light:text-gray-500">支持 JPG / PNG / WebP / GIF，最大 5MB</span>
            </div>
            <img v-if="coverImage" :src="coverImage" alt="封面预览" class="w-full max-w-md h-40 object-cover rounded border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200">
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1 text-white light:text-gray-900">分类</label>
          <select v-model="categoryId" class="w-full px-3 py-2 rounded-lg bg-[#0f0c16] dark:bg-[#0f0c16] light:bg-white border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 text-white light:text-gray-900">
            <option :value="null">选择分类</option>
            <option v-for="cat in categoryList" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1 text-white light:text-gray-900">内容（Markdown）</label>
          <textarea v-model="content" class="w-full px-3 py-2 rounded-lg bg-[#0f0c16] dark:bg-[#0f0c16] light:bg-white border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 text-white light:text-gray-900 font-mono" rows="20" placeholder="文章内容"></textarea>
        </div>

        <div class="flex items-center text-text-secondary light:text-gray-700">
          <input v-model="published" type="checkbox" id="published" class="mr-2" />
          <label for="published">发布</label>
        </div>

        <div class="flex justify-end">
          <button @click="savePost" :disabled="saving" class="bg-accent-purple text-white px-6 py-2 rounded-lg hover:bg-accent-purple/90 disabled:opacity-50 transition-colors">
            {{ saving ? '保存中...' : '保存' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
