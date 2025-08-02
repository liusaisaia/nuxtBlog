<template>
  <div>
    <div class="max-w-6xl mx-auto">
      <!-- Page Header -->
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Nuxt 4.0 新特性预览
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          了解即将到来的 Nuxt 4.0 革命性改进和新功能，为升级做好准备
        </p>
        <div class="mt-4 inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
          <div class="w-4 h-4 i-carbon-information mr-2" />
          当前项目基于 Nuxt 3，为 Nuxt 4.0 升级做好准备
        </div>
      </div>

      <!-- Features Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div class="card p-6">
          <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
            <div class="w-6 h-6 i-carbon-rocket text-green-600 dark:text-green-400" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            更快的构建速度
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            优化的构建流程和智能缓存机制，构建速度提升高达 50%
          </p>
        </div>

        <div class="card p-6">
          <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
            <div class="w-6 h-6 i-carbon-code text-blue-600 dark:text-blue-400" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            类型化路由
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            完整的 TypeScript 路由类型推断，提供更好的开发体验
          </p>
        </div>

        <div class="card p-6">
          <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
            <div class="w-6 h-6 i-carbon-layers text-purple-600 dark:text-purple-400" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            组件岛屿
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            支持在服务端渲染页面中嵌入独立的客户端交互组件
          </p>
        </div>

        <div class="card p-6">
          <div class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mb-4">
            <div class="w-6 h-6 i-carbon-data-vis-4 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            性能优化
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            更小的包体积，更快的运行时性能，优化的资源加载
          </p>
        </div>

        <div class="card p-6">
          <div class="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-4">
            <div class="w-6 h-6 i-carbon-debug text-red-600 dark:text-red-400" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            增强的开发体验
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            改进的热重载，更好的错误提示，增强的调试工具
          </p>
        </div>

        <div class="card p-6">
          <div class="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
            <div class="w-6 h-6 i-carbon-cloud text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            现代化部署
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            支持边缘计算，WebAssembly，以及各种现代部署平台
          </p>
        </div>
      </div>

      <!-- Interactive Demo -->
      <div class="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 mb-16">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            组件岛屿演示
          </h2>
          <p class="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            下面的组件使用了 Nuxt 4.0 的组件岛屿功能，可以在服务端渲染的页面中独立进行客户端交互
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <StatsCounter label="文章总数" :initial-count="25" />
          <StatsCounter label="用户访问" :initial-count="1024" />
        </div>
      </div>

      <!-- Nuxt 4.0 综合演示 -->
      <div class="mb-16">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Nuxt 4.0 综合演示
          </h2>
          <p class="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            实时展示 Nuxt 4.0 的各项特性和性能指标
          </p>
        </div>
        <Nuxt4Demo />
      </div>

      <!-- Migration Guide -->
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          准备升级到 Nuxt 4.0？
        </h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          查看我们的迁移指南，了解如何将现有项目升级到 Nuxt 4.0
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/MIGRATION.md"
            target="_blank"
            class="btn bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            查看迁移指南
          </a>
          <NuxtLink
            to="/blog"
            class="btn-outline px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            阅读相关文章
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 页面元数据
useHead({
  title: 'Nuxt 4.0 新特性'
})

useSeoMeta({
  title: 'Nuxt 4.0 新特性 - Nuxt Blog',
  description: '探索 Nuxt 4.0 带来的革命性改进和新功能，包括组件岛屿、类型化路由、性能优化等',
  ogTitle: 'Nuxt 4.0 新特性',
  ogDescription: '探索 Nuxt 4.0 带来的革命性改进和新功能'
})
</script>
