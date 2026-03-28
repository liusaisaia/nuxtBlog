<template>
  <NuxtLink
    :to="post.path"
    class="surface rounded-2xl p-5 md:p-6 h-full group transition-all duration-300 hover:-translate-y-1 hover:border-strong"
  >
    <div class="flex items-center justify-between gap-3 mb-4 text-xs">
      <div class="flex items-center gap-2 flex-wrap">
        <span
          v-for="tag in post.tags?.slice(0, 2)"
          :key="tag"
          class="brand-chip rounded-full px-2.5 py-1"
        >
          {{ tag }}
        </span>
      </div>
      <span class="text-mute whitespace-nowrap">{{ readingLabel }}</span>
    </div>

    <h3 class="text-xl font-semibold tracking-tight mb-2 leading-snug group-hover:text-[var(--brand)] transition-colors">
      {{ post.title }}
    </h3>

    <p class="text-soft text-sm leading-relaxed mb-6 line-clamp-3">
      {{ post.description || '这篇文章没有摘要，请点击进入阅读全文。' }}
    </p>

    <div class="flex items-center justify-between text-sm text-mute border-t border-soft pt-4">
      <span>{{ formatDate(post.date) }}</span>
      <span class="inline-flex items-center gap-1.5 text-[var(--brand)]">
        阅读全文
        <svg
          class="w-4 h-4 transition-transform group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{ post: Record<string, any> }>()

const readingLabel = computed(() => props.post.readingTime || '6 分钟阅读')

function formatDate(date?: string) {
  if (!date) return '未标注日期'
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
</script>
