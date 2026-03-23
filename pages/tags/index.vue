<template>
  <div class="pt-32 pb-20">
    <div class="max-w-page mx-auto px-8">
      <div class="text-center mb-16">
        <h1 class="text-4xl sm:text-5xl font-bold mb-4 text-white">热门话题</h1>
        <p class="text-text-secondary max-w-2xl mx-auto">
          按分类和标签浏览文章
        </p>
      </div>

      <div class="flex flex-wrap justify-center gap-4">
        <NuxtLink 
          v-for="tag in tags" 
          :key="tag.name"
          :to="`/posts?tag=${tag.name}`"
          class="group px-6 py-4 rounded-xl bg-background-secondary border border-border hover:border-accent-purple transition-all flex items-center gap-3"
        >
          <span class="text-lg font-medium text-white group-hover:text-accent-purple transition-colors">{{ tag.name }}</span>
          <span class="px-2 py-0.5 rounded-full bg-accent-purple/20 text-accent-purple text-xs font-mono">{{ tag.count }}</span>
        </NuxtLink>
      </div>
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
  title: '话题标签 - SAISAI(0)',
  meta: [
    { name: 'description', content: '浏览所有文章标签。' }
  ]
})
</script>
