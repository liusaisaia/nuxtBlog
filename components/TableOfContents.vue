<template>
  <aside class="w-64 flex-shrink-0 bg-background-secondary rounded-r-lg overflow-hidden">
    <div class="p-6">
      <h3 class="text-sm font-semibold text-text-muted mb-6 uppercase tracking-wider">目录</h3>
      <nav class="space-y-1">
        <a
          v-for="(item, index) in items"
          :key="index"
          :href="`#${item.id}`"
          class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all"
          :class="activeId === item.id ? 'text-accent-purple bg-accent-purple/10' : 'text-text-secondary hover:text-accent-purple hover:bg-accent-purple/10'"
        >
          <span class="w-1 h-1 rounded-full transition-colors" :class="activeId === item.id ? 'bg-accent-purple' : 'bg-text-muted'"></span>
          <span>{{ item.text }}</span>
        </a>
      </nav>
    </div>
  </aside>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const activeId = ref('')

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
        }
      })
    },
    {
      rootMargin: '-20% 0px -80% 0px'
    }
  )

  props.items.forEach((item) => {
    const element = document.getElementById(item.id)
    if (element) {
      observer.observe(element)
    }
  })

  onUnmounted(() => observer.disconnect())
})
</script>
