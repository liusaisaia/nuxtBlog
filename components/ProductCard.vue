<template>
  <a 
    :href="link"
    target="_blank"
    class="group relative p-8 rounded-3xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10 transition-all duration-300 overflow-hidden"
  >
    <!-- Hover Glow Effect -->
    <span class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/50 to-transparent dark:from-white/[0.05] dark:to-transparent pointer-events-none"></span>
    
    <span class="relative z-10 flex flex-col h-full">
      <span class="flex items-start justify-between mb-6">
        <!-- Icon Container -->
        <span class="w-14 h-14 rounded-2xl bg-white dark:bg-white/10 border border-gray-100 dark:border-white/10 flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform duration-300">
          <span :class="color">{{ icon }}</span>
        </span>
        
        <!-- Arrow Icon -->
        <span class="p-2 rounded-full bg-white dark:bg-white/10 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transform duration-300">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </span>
      </span>
      
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">{{ name }}</h3>
      
      <p class="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed flex-grow">{{ description }}</p>
      
      <span class="flex items-center gap-4 text-sm font-medium text-gray-500 dark:text-gray-500 pt-6 border-t border-gray-200 dark:border-white/5">
        <span class="flex items-center gap-1.5">
          <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          {{ stars }} Stars
        </span>
      </span>
    </span>
  </a>
</template>

<script setup>
defineProps({
  name: String,
  description: String,
  icon: String,
  stars: String,
  link: {
    type: String,
    default: '#'
  },
  color: String
})
</script>
