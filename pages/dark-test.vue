<template>
  <div class="min-h-screen p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        暗色模式测试页面
      </h1>

      <div class="mb-8">
        <p class="text-lg mb-4 text-gray-700 dark:text-gray-300">
          当前主题：<strong>{{ $colorMode.value }}</strong>
        </p>
        <p class="text-lg mb-4 text-gray-700 dark:text-gray-300">
          主题偏好：<strong>{{ $colorMode.preference }}</strong>
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-6 mb-8">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            测试卡片 1
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            这个卡片应该在暗色模式下显示为深色背景和浅色文字。
          </p>
        </div>

        <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg">
          <h2 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            测试卡片 2
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            这个卡片使用不同的背景色来测试暗色模式效果。
          </p>
        </div>
      </div>

      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          主题切换按钮
        </h2>
        <NuxtUIThemeToggle />
      </div>

      <div class="text-center">
        <NuxtLink to="/" class="text-blue-600 dark:text-blue-400 hover:underline">
          返回首页
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: '暗色模式测试'
})
</script>
