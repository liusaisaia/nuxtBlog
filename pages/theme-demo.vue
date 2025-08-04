<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <!-- 页面标题 -->
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            主题切换演示
          </h1>
          <p class="text-lg text-gray-600 dark:text-gray-300">
            测试亮色和暗色主题的切换效果
          </p>
        </div>

        <!-- 主题切换按钮 -->
        <div class="flex justify-center mb-12">
          <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <div class="flex items-center space-x-4">
              <span class="text-gray-700 dark:text-gray-300 font-medium">
                当前主题：{{ $colorMode.value === 'dark' ? '暗色' : '亮色' }}
              </span>
              <NuxtUIThemeToggle />
            </div>
          </div>
        </div>

        <!-- 演示卡片 -->
        <div class="grid md:grid-cols-2 gap-6 mb-8">
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              卡片标题
            </h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              这是一个演示卡片，用来展示主题切换的效果。注意文字颜色和背景色的变化。
            </p>
            <UButton color="primary" variant="solid">
              主要按钮
            </UButton>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              另一个卡片
            </h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              观察边框、阴影和文字在不同主题下的表现。
            </p>
            <UButton color="gray" variant="outline">
              次要按钮
            </UButton>
          </div>
        </div>

        <!-- 颜色展示 -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            颜色系统演示
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="text-center">
              <div class="w-16 h-16 bg-primary-500 rounded-lg mx-auto mb-2"></div>
              <span class="text-sm text-gray-600 dark:text-gray-300">Primary</span>
            </div>
            <div class="text-center">
              <div class="w-16 h-16 bg-gray-500 rounded-lg mx-auto mb-2"></div>
              <span class="text-sm text-gray-600 dark:text-gray-300">Gray</span>
            </div>
            <div class="text-center">
              <div class="w-16 h-16 bg-green-500 rounded-lg mx-auto mb-2"></div>
              <span class="text-sm text-gray-600 dark:text-gray-300">Green</span>
            </div>
            <div class="text-center">
              <div class="w-16 h-16 bg-blue-500 rounded-lg mx-auto mb-2"></div>
              <span class="text-sm text-gray-600 dark:text-gray-300">Blue</span>
            </div>
          </div>
        </div>

        <!-- 返回首页 -->
        <div class="text-center mt-8">
          <NuxtLink to="/" class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium">
            ← 返回首页
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 页面元数据
definePageMeta({
  title: '主题切换演示'
})

// SEO
useSeoMeta({
  title: '主题切换演示 - Nuxt Blog',
  description: '测试亮色和暗色主题的切换效果'
})
</script>
