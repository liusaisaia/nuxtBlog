<template>
  <a
    :href="link"
    target="_blank"
    class="group relative p-6 rounded-2xl bg-background-secondary border border-border hover:border-border-hover transition-all duration-300 overflow-hidden"
  >
    <!-- Gradient background on hover -->
    <div class="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300" :class="color"></div>

    <div class="relative">
      <!-- Header -->
      <div class="flex items-start justify-between mb-4">
        <div class="w-12 h-12 rounded-xl bg-[#2a2435] flex items-center justify-center text-2xl group-hover:bg-accent-purple/20 transition-colors">
          {{ icon }}
        </div>
        <div class="flex items-center gap-1 text-sm text-text-muted">
          <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          {{ stars }}
        </div>
      </div>

      <!-- Content -->
      <h3 class="text-xl font-bold mb-2 group-hover:text-accent-purple transition-colors text-white">{{ name }}</h3>
      <p class="text-text-secondary text-sm leading-relaxed">{{ description }}</p>

      <!-- Arrow -->
      <div class="mt-4 flex items-center gap-2 text-sm text-text-muted group-hover:text-accent-purple transition-colors">
        <span>了解更多</span>
        <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
        </svg>
      </div>
    </div>
  </a>
</template>

<script setup>
defineProps({
  name: String,
  description: String,
  icon: String,
  stars: String,
  link: String,
  color: String,
  delay: {
    type: Number,
    default: 0
  }
})
</script>
