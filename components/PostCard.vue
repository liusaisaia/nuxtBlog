<template>
  <NuxtLink
    :to="post.path"
    class="group p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-violet-500/50 hover:shadow-lg transition-all duration-300 flex flex-col h-full"
  >
    <!-- Tags -->
    <span class="flex items-center gap-2 mb-4">
      <span
        v-for="tag in post.tags?.slice(0, 2)"
        :key="tag"
        class="px-2 py-1 text-xs rounded-full bg-violet-100 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-500/20"
      >
        {{ tag }}
      </span>
    </span>

    <!-- Title -->
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors line-clamp-2">
      {{ post.title }}
    </h3>

    <!-- Description -->
    <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 flex-grow">
      {{ post.description }}
    </p>

    <!-- Footer -->
    <span class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500 mt-auto">
      <span class="flex items-center gap-2">
        <span>{{ formatDate(post.date) }}</span>
        <span>·</span>
        <span>{{ post.readingTime || '5 分钟阅读' }}</span>
      </span>

      <svg
        class="w-4 h-4 transform group-hover:translate-x-1 transition-transform text-gray-400 dark:text-gray-500 group-hover:text-violet-600 dark:group-hover:text-violet-400"
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
  // Use a simple consistent formatting that ignores timezone
  const d = new Date(date)
  // Ensure we display the date as intended in the metadata, assuming it's meant to be "local" day
  // But to be safe across timezones, we can use UTC methods if the input is UTC-midnight
  // Or just simple string manipulation if it's ISO
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC' // Force UTC to avoid server/client mismatch
  })
}
</script>
