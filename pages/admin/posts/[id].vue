<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const isNew = route.params.id === 'new'

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

// 获取文章详情（如果是编辑）
onMounted(async () => {
  if (!isNew) {
    const { data } = await useFetch(`/api/admin/posts/${route.params.id}`)
    if (data.value) {
      title.value = data.value.title
      content.value = data.value.content || ''
      slug.value = data.value.slug || ''
      description.value = data.value.excerpt || ''
      coverImage.value = data.value.coverImage || ''
      published.value = data.value.status === 'published'
      categoryId.value = data.value.categoryId
    }
  }
})

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
    
    if (isNew) {
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
      <h1 class="text-2xl font-bold">{{ isNew ? '新建文章' : '编辑文章' }}</h1>
      <NuxtLink to="/admin/posts" class="text-gray-500 hover:text-gray-700">
        返回列表
      </NuxtLink>
    </div>

    <div class="bg-white rounded-lg shadow p-6">
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">标题</label>
          <input v-model="title" type="text" class="w-full border rounded px-3 py-2" placeholder="文章标题" />
        </div>
        
        <div>
          <label class="block text-sm font-medium mb-1">Slug</label>
          <input v-model="slug" type="text" class="w-full border rounded px-3 py-2" placeholder="url-slug" />
        </div>
        
        <div>
          <label class="block text-sm font-medium mb-1">描述</label>
          <textarea v-model="description" class="w-full border rounded px-3 py-2" rows="2" placeholder="文章描述"></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">封面图</label>
          <div class="space-y-3">
            <input v-model="coverImage" type="text" class="w-full border rounded px-3 py-2" placeholder="封面图 URL（可粘贴或上传）" />
            <div class="flex items-center gap-3">
              <label class="inline-flex items-center px-3 py-2 border rounded cursor-pointer hover:bg-gray-50 text-sm">
                <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" class="hidden" @change="uploadCover">
                {{ uploadingCover ? '上传中...' : '上传图片' }}
              </label>
              <span class="text-xs text-gray-500">支持 JPG / PNG / WebP / GIF，最大 5MB</span>
            </div>
            <img v-if="coverImage" :src="coverImage" alt="封面预览" class="w-full max-w-md h-40 object-cover rounded border">
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium mb-1">分类</label>
          <select v-model="categoryId" class="w-full border rounded px-3 py-2">
            <option :value="null">选择分类</option>
            <option v-for="cat in categoryList" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium mb-1">内容 (Markdown)</label>
          <textarea v-model="content" class="w-full border rounded px-3 py-2 font-mono" rows="20" placeholder="文章内容"></textarea>
        </div>
        
        <div class="flex items-center">
          <input v-model="published" type="checkbox" id="published" class="mr-2" />
          <label for="published">发布</label>
        </div>
        
        <div class="flex justify-end">
          <button @click="savePost" :disabled="saving" class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50">
            {{ saving ? '保存中...' : '保存' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
