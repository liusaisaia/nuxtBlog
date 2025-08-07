<template>
  <div class="text-center mb-12">
    <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
      {{ title }}
    </h1>
    <p v-if="description" class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description?: string
}

defineProps<Props>()
</script>