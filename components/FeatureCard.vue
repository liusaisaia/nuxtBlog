<template>
  <div class="text-center p-6">
    <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
      <Icon :name="icon" class="w-8 h-8 text-primary-500" />
    </div>
    <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
      {{ title }}
    </h3>
    <p class="text-gray-600 dark:text-gray-300">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon: string
  title: string
  description: string
}

defineProps<Props>()
</script>
