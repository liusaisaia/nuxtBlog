<template>
  <NuxtLink
    :to="post._path"
    class="group flex flex-col sm:flex-row gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300 card-hover"
    :style="{ animationDelay: `${delay}s` }"
  >
    <!-- Content -->
    <div class="flex-1">
      <!-- Tags -->
      <div class="flex items-center gap-2 mb-3">
        <span
          v-for="tag in post.tags?.slice(0, 2)"
          :key="tag"
          class="px-2 py-1 text-xs rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20"
        >
          {{ tag }}
        </span>
        <span class="text-xs text-gray-500">{{ formatDate(post.date) }}</span>
      </div>

      <!-- Title -->
      <h3 class="text-xl font-bold mb-2 group-hover:text-violet-400 transition-colors line-clamp-2">
        {{ post.title }}
      </h3>

      <!-- Description -->
      <p class="text-gray-400 text-sm line-clamp-2 mb-4">
        {{ post.description }}
      </p>

      <!-- Read more -->
      <div class="flex items-center gap-2 text-sm text-gray-500 group-hover:text-violet-400 transition-colors">
        <span>Read article</span>
        <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
        </svg>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  post: {
    type: Object,
    required: true
  },
  delay: {
    type: Number,
    default: 0
  }
})

function formatDate(date) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>
