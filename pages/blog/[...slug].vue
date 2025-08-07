<template>
  <div class="py-12 bg-white dark:bg-gray-900 min-h-screen">
    <div v-if="pending" class="container-main">
      <div class="flex justify-center py-20">
        <div class="loading"></div>
      </div>
    </div>

    <div v-else-if="!data" class="container-main text-center py-20">
      <Icon name="i-heroicons-document-magnifying-glass" class="w-20 h-20 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        文章未找到
      </h1>
      <p class="text-gray-600 dark:text-gray-400 mb-8">
        抱歉，您访问的文章不存在或已被删除。
      </p>
      <UButton to="/blog" icon="i-heroicons-arrow-left" trailing>
        返回博客列表
      </UButton>
    </div>

    <article v-else class="container-main max-w-4xl mx-auto">
      <!-- 文章头部 -->
      <header class="mb-12">
        <!-- 面包屑导航 -->
        <nav class="mb-8">
          <ol class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <li>
              <NuxtLink to="/" class="hover:text-primary-500 transition-colors">
                首页
              </NuxtLink>
            </li>
            <li>
              <Icon name="i-heroicons-chevron-right" class="w-4 h-4" />
            </li>
            <li>
              <NuxtLink to="/blog" class="hover:text-primary-500 transition-colors">
                博客
              </NuxtLink>
            </li>
            <li v-if="data.category">
              <Icon name="i-heroicons-chevron-right" class="w-4 h-4" />
            </li>
            <li v-if="data.category">
              <span class="text-primary-500">{{ data.category }}</span>
            </li>
          </ol>
        </nav>

        <!-- 文章标题 -->
        <h1 class="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
          {{ data.title }}
        </h1>

        <!-- 文章描述 -->
        <p v-if="data.description" class="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          {{ data.description }}
        </p>

        <!-- 文章元信息 -->
        <div class="flex flex-wrap items-center gap-6 text-gray-500 dark:text-gray-400 mb-8">
          <div class="flex items-center">
            <Icon name="i-heroicons-calendar" class="w-5 h-5 mr-2" />
            <time :datetime="data.date">{{ formatDate(data.date) }}</time>
          </div>
          <div class="flex items-center">
            <Icon name="i-heroicons-clock" class="w-5 h-5 mr-2" />
            <span>{{ data.readingTime || '5' }} 分钟阅读</span>
          </div>
          <div v-if="data.author" class="flex items-center">
            <Icon name="i-heroicons-user" class="w-5 h-5 mr-2" />
            <span>{{ data.author }}</span>
          </div>
        </div>

        <!-- 文章标签 -->
        <div v-if="data.tags?.length" class="flex flex-wrap gap-2 mb-8">
          <span
            v-for="tag in data.tags"
            :key="tag"
            class="tag"
          >
            {{ tag }}
          </span>
        </div>

        <!-- 文章封面 -->
        <div v-if="data.image" class="mb-12">
          <img
            :src="data.image"
            :alt="data.title"
            class="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
          >
        </div>
      </header>

      <!-- 文章内容 -->
      <div class="prose prose-lg max-w-none dark:prose-invert">
        <ContentRenderer :value="data" />
      </div>

      <!-- 文章底部 -->
      <footer class="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
        <!-- 分享按钮 -->
        <div class="mb-8">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            分享这篇文章
          </h3>
          <div class="flex items-center gap-4">
            <UButton
              icon="i-simple-icons-twitter"
              size="sm"
              color="neutral"
              variant="outline"
              :to="`https://twitter.com/intent/tweet?text=${encodeURIComponent(data.title || '')}&url=${encodeURIComponent(currentUrl)}`"
              target="_blank"
            >
              Twitter
            </UButton>
            <UButton
              icon="i-simple-icons-facebook"
              size="sm"
              color="neutral"
              variant="outline"
              :to="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`"
              target="_blank"
            >
              Facebook
            </UButton>
            <UButton
              icon="i-heroicons-link"
              size="sm"
              color="neutral"
              variant="outline"
              @click="copyLink"
            >
              复制链接
            </UButton>
          </div>
        </div>

        <!-- 导航到其他文章 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-if="prev" class="card p-6">
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">上一篇</p>
            <NuxtLink
              :to="prev._path"
              class="text-lg font-semibold text-gray-900 dark:text-white hover:text-primary-500 transition-colors"
            >
              {{ prev.title }}
            </NuxtLink>
          </div>
          <div v-if="next" class="card p-6 md:text-right">
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">下一篇</p>
            <NuxtLink
              :to="next._path"
              class="text-lg font-semibold text-gray-900 dark:text-white hover:text-primary-500 transition-colors"
            >
              {{ next.title }}
            </NuxtLink>
          </div>
        </div>

        <!-- 返回博客列表 -->
        <div class="text-center mt-12">
          <UButton
            to="/blog"
            icon="i-heroicons-arrow-left"
            size="lg"
            variant="outline"
          >
            返回博客列表
          </UButton>
        </div>
      </footer>
    </article>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const toast = useToast()

// 获取文章内容
const { data, pending } = await useAsyncData(`content-${route.path}`, () => {
  return queryContent(route.path).findOne()
})

// 获取上一篇和下一篇文章
const [prev, next] = await queryContent()
  .where({ _partial: false })
  .only(['_path', 'title'])
  .sort({ date: -1 })
  .findSurround(route.path)

// 当前页面URL
const currentUrl = computed(() => {
  if (process.client) {
    return window.location.href
  }
  return ''
})

// SEO 配置
watchEffect(() => {
  if (data.value) {
    useSeoMeta({
      title: `${data.value.title} - 现代博客`,
      description: data.value.description,
      ogTitle: data.value.title,
      ogDescription: data.value.description,
      ogImage: data.value.image,
      ogType: 'article',
      articleAuthor: data.value.author,
      articlePublishedTime: data.value.date,
      articleModifiedTime: data.value.updatedAt || data.value.date,
      articleTag: data.value.tags
    })
  }
})

// 格式化日期
function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 复制链接
async function copyLink() {
  try {
    await navigator.clipboard.writeText(currentUrl.value)
    toast.add({
      title: '链接已复制',
      description: '文章链接已复制到剪贴板',
      icon: 'i-heroicons-check-circle'
    })
  } catch (error) {
    toast.add({
      title: '复制失败',
      description: '无法复制链接，请手动复制',
      color: 'error',
      icon: 'i-heroicons-x-circle'
    })
  }
}

// 404 处理
if (!pending.value && !data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: '文章未找到'
  })
}
</script>

<style>
/* 自定义 prose 样式 */
.prose {
  color: #1f2937;
}
.dark .prose {
  color: #e5e7eb;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  color: #111827;
  font-weight: 600;
}
.dark .prose h1,
.dark .prose h2,
.dark .prose h3,
.dark .prose h4,
.dark .prose h5,
.dark .prose h6 {
  color: #ffffff;
}

.prose h1 {
  font-size: 1.875rem;
  margin-bottom: 1.5rem;
  margin-top: 2rem;
}

.prose h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  margin-top: 2rem;
}

.prose h3 {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  margin-top: 1.5rem;
}

.prose h4 {
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
  margin-top: 1rem;
}

.prose p {
  margin-bottom: 1rem;
  line-height: 1.625;
}

.prose a {
  color: #3b82f6;
  font-weight: 500;
  text-decoration: none;
}
.prose a:hover {
  color: #2563eb;
  text-decoration: underline;
}

.prose ul,
.prose ol {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.prose li {
  margin-bottom: 0.5rem;
}

.prose blockquote {
  border-left: 4px solid #3b82f6;
  padding-left: 1rem;
  font-style: italic;
  color: #4b5563;
  margin: 1.5rem 0;
}
.dark .prose blockquote {
  color: #9ca3af;
}

.prose code {
  background-color: #f3f4f6;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-family: monospace;
}
.dark .prose code {
  background-color: #1f2937;
}

.prose pre {
  background-color: #f9fafb;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1.5rem 0;
}
.dark .prose pre {
  background-color: #1f2937;
}

.prose pre code {
  background-color: transparent;
  padding: 0;
}

.prose img {
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  margin: 1.5rem 0;
}

.prose table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
}

.prose th,
.prose td {
  border: 1px solid #d1d5db;
  padding: 1rem;
  text-align: left;
}
.dark .prose th,
.dark .prose td {
  border-color: #4b5563;
}

.prose th {
  background-color: #f9fafb;
  font-weight: 600;
}
.dark .prose th {
  background-color: #1f2937;
}

.prose hr {
  border-color: #d1d5db;
  margin: 2rem 0;
}
.dark .prose hr {
  border-color: #4b5563;
}
</style>
