<template>
  <div class="card p-8">
    <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
      Nuxt 4.0 特性演示
    </h3>

    <!-- 类型化路由演示 -->
    <div class="mb-8">
      <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
        🔗 类型化路由
      </h4>
      <p class="text-gray-600 dark:text-gray-300 mb-4">
        Nuxt 4.0 提供完整的路由类型推断，确保类型安全的导航。
      </p>
      <div class="flex flex-wrap gap-2">
        <NuxtLink
          to="/"
          class="btn bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1"
        >
          首页
        </NuxtLink>
        <NuxtLink
          to="/blog"
          class="btn bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1"
        >
          博客
        </NuxtLink>
        <NuxtLink
          to="/nuxt4-features"
          class="btn bg-purple-600 hover:bg-purple-700 text-white text-sm px-3 py-1"
        >
          Nuxt 4.0 特性
        </NuxtLink>
      </div>
    </div>

    <!-- 性能指标 -->
    <div class="mb-8">
      <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
        ⚡ 性能指标
      </h4>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {{ buildTime }}ms
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-300">构建时间</div>
        </div>
        <div class="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div class="text-2xl font-bold text-green-600 dark:text-green-400">
            {{ bundleSize }}KB
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-300">包体积</div>
        </div>
        <div class="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {{ loadTime }}ms
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-300">加载时间</div>
        </div>
        <div class="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div class="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {{ memoryUsage }}MB
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-300">内存使用</div>
        </div>
      </div>
    </div>

    <!-- 实验性特性状态 -->
    <div class="mb-8">
      <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
        🧪 实验性特性状态
      </h4>
      <div class="space-y-2">
        <div class="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
          <span class="text-sm">组件岛屿 (Component Islands)</span>
          <span class="text-green-600 dark:text-green-400 text-sm font-medium">✅ 已启用</span>
        </div>
        <div class="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
          <span class="text-sm">类型化页面 (Typed Pages)</span>
          <span class="text-green-600 dark:text-green-400 text-sm font-medium">✅ 已启用</span>
        </div>
        <div class="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
          <span class="text-sm">JSON Payload 渲染</span>
          <span class="text-green-600 dark:text-green-400 text-sm font-medium">✅ 已启用</span>
        </div>
        <div class="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
          <span class="text-sm">构建缓存优化</span>
          <span class="text-green-600 dark:text-green-400 text-sm font-medium">✅ 已启用</span>
        </div>
      </div>
    </div>

    <!-- 开发体验改进 -->
    <div>
      <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
        🛠️ 开发体验改进
      </h4>
      <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
        <li class="flex items-center">
          <div class="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
          更快的热重载和模块替换
        </li>
        <li class="flex items-center">
          <div class="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
          改进的错误提示和调试信息
        </li>
        <li class="flex items-center">
          <div class="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
          增强的 TypeScript 支持和类型推断
        </li>
        <li class="flex items-center">
          <div class="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
          优化的构建流程和缓存机制
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// 模拟性能数据 (在实际应用中可以从真实的性能 API 获取)
const buildTime = ref(1250)
const bundleSize = ref(245)
const loadTime = ref(180)
const memoryUsage = ref(28)

// 模拟性能数据更新
onMounted(() => {
  const interval = setInterval(() => {
    // 模拟轻微的性能波动
    buildTime.value = 1250 + Math.floor(Math.random() * 100) - 50
    bundleSize.value = 245 + Math.floor(Math.random() * 20) - 10
    loadTime.value = 180 + Math.floor(Math.random() * 40) - 20
    memoryUsage.value = 28 + Math.floor(Math.random() * 8) - 4
  }, 3000)

  // 清理定时器
  onUnmounted(() => {
    clearInterval(interval)
  })
})

// 页面元数据
definePageMeta({
  title: 'Nuxt 4.0 演示组件'
})
</script>
