<template>
  <section class="relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
    <!-- 背景装饰 -->
    <div class="absolute inset-0">
      <div class="absolute top-20 left-20 w-72 h-72 bg-green-100 dark:bg-green-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div class="absolute top-40 right-20 w-72 h-72 bg-blue-100 dark:bg-blue-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div class="absolute -bottom-8 left-40 w-72 h-72 bg-purple-100 dark:bg-purple-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
      <div class="text-center">
        <!-- 徽章 -->
        <div v-if="badge" class="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-sm font-medium mb-8">
          <Icon :name="badge.icon || 'i-heroicons-sparkles'" class="w-4 h-4 mr-2" />
          {{ badge.text }}
        </div>

        <!-- 标题 -->
        <h1 class="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
          {{ title }}
          <span v-if="highlight" class="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            {{ highlight }}
          </span>
        </h1>

        <!-- 描述 -->
        <p v-if="description" class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          {{ description }}
        </p>

        <!-- 按钮组 -->
        <div v-if="buttons && buttons.length > 0" class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <UButton
            v-for="(button, index) in buttons"
            :key="index"
            :to="button.to"
            :size="button.size || 'lg'"
            :icon="button.icon"
            :color="button.color || 'primary'"
            :variant="button.variant || 'solid'"
            :class="button.class || ''"
            @click="button.click"
          >
            {{ button.label }}
          </UButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Badge {
  text: string
  icon?: string
}

interface Button {
  label: string
  to?: string
  icon?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "neutral" | undefined
  variant?: 'solid' | 'outline' | 'ghost' | 'link'
  class?: string
  click?: () => void
}

interface Props {
  title: string
  highlight?: string
  description?: string
  badge?: Badge
  buttons?: Button[]
}

defineProps<Props>()
</script>
