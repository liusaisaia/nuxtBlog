<template>
  <div class="text-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
    <div class="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
      <Icon :name="tech.icon" class="w-8 h-8" :class="tech.color" />
    </div>
    <h4 class="text-sm font-medium text-gray-900 dark:text-white">{{ tech.name }}</h4>
  </div>
</template>

<script setup lang="ts">
interface Tech {
  name: string
  icon: string
  color: string
}

interface Props {
  tech: Tech
}

defineProps<Props>()
</script>
