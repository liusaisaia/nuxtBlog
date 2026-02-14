<template>
  <div class="pt-32 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
    <div class="text-center mb-16">
      <h1 class="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">热门话题</h1>
      <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        按分类和标签浏览文章。
      </p>
    </div>

    <div class="flex flex-wrap justify-center gap-4">
      <NuxtLink 
        v-for="tag in tags" 
        :key="tag.name"
        :to="`/posts?tag=${tag.name}`"
        class="group px-6 py-4 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-violet-500 hover:shadow-lg transition-all flex items-center gap-3"
      >
        <span class="text-lg font-medium text-gray-700 dark:text-gray-200 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">{{ tag.name }}</span>
        <span class="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/10 text-xs text-gray-500 dark:text-gray-400 font-mono">{{ tag.count }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { data: posts } = await useAsyncData('all-posts-tags', () => queryCollection('content').all())

const tags = computed(() => {
  const map = {}
  posts.value?.forEach(p => {
    p.tags?.forEach(t => {
      map[t] = (map[t] || 0) + 1
    })
  })
  return Object.entries(map)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
})

useHead({
  title: '话题标签 - 赛赛的前端视界',
  meta: [
    { name: 'description', content: '浏览所有文章标签。' }
  ]
})
</script>
