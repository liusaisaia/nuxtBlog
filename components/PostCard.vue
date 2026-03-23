<template>
  <NuxtLink
    :to="post.path"
    class="group p-6 rounded-2xl bg-background-secondary border border-border hover:border-border-hover transition-all duration-300 flex flex-col h-full"
  >
    <!-- Tags -->
    <span class="flex items-center gap-2 mb-4">
      <span
        v-for="tag in post.tags?.slice(0, 2)"
        :key="tag"
        class="px-2 py-1 text-xs rounded-full bg-accent-purple text-white"
      >
        {{ tag }}
      </span>
    </span>

    <!-- Title -->
    <h3 class="text-lg font-semibold text-white mb-2 group-hover:text-accent-purple transition-colors line-clamp-2">
      {{ post.title }}
    </h3>

    <!-- Description -->
    <p class="text-sm text-text-secondary mb-4 line-clamp-2 flex-grow">
      {{ post.description }}
    </p>

    <!-- Footer -->
    <span class="flex items-center justify-between text-sm text-text-muted mt-auto">
      <span class="flex items-center gap-2">
        <span>{{ formatDate(post.date) }}</span>
        <span>·</span>
        <span>{{ post.readingTime || '5 分钟阅读' }}</span>
      </span>

      <svg
        class="w-4 h-4 transform group-hover:translate-x-1 transition-transform text-text-secondary group-hover:text-accent-purple"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
      </svg>
    </span>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

function formatDate(date) {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  })
}
</script>
