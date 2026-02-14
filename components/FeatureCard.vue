<template>
  <div 
    class="group p-6 rounded-2xl bg-dark-surface border border-dark-border hover:border-primary-500/50 transition-all duration-300 hover:-translate-y-1"
    :style="{ animationDelay: `${delay}s` }"
  >
    <div class="text-4xl mb-4">{{ icon }}</div>
    <h3 class="text-xl font-semibold mb-2 group-hover:text-primary-400 transition-colors">{{ title }}</h3>
    <p class="text-gray-400">{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  icon: String,
  title: String,
  description: String,
  delay: {
    type: Number,
    default: 0
  }
})
</script>
