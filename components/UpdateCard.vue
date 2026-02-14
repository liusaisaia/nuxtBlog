<template>
  <NuxtLink
    :to="_path"
    class="group flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-300"
  >
    <!-- Tag -->
    <span 
      class="flex-shrink-0 px-2 py-1 text-xs rounded-full border"
      :class="getTagClass()"
    >
      {{ getTag() }}
    </span>
    
    <!-- Content -->
    <div class="flex-1 min-w-0">
      <h3 class="text-sm font-medium text-white group-hover:text-violet-400 transition-colors truncate">
        {{ title }}
      </h3>
    </div>
    
    <!-- Arrow -->
    <svg 
      class="flex-shrink-0 w-4 h-4 text-gray-500 group-hover:text-violet-400 transition-colors" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
    </svg>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  title: String,
  description: String,
  date: String,
  tags: Array,
  _path: String
})

function getTag() {
  // 根据文章标题或标签决定显示什么标签
  if (props.title?.toLowerCase().includes('announce')) return 'announcement'
  if (props.title?.toLowerCase().includes('beta')) return 'announcement'
  if (props.title?.toLowerCase().includes('alpha')) return 'announcement'
  return 'update'
}

function getTagClass() {
  const tag = getTag()
  if (tag === 'announcement') {
    return 'bg-violet-500/10 text-violet-400 border-violet-500/20'
  }
  return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
}
</script>
