<template>
  <div>
    <div class="max-w-4xl mx-auto">
      <!-- Page Header -->
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">关于我们</h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          我们致力于分享前端技术和开发经验，帮助开发者构建更好的 Web 应用
        </p>
      </div>

      <!-- About Content -->
      <div class="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">我们的使命</h2>
          <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
            在快速发展的前端技术领域，我们希望通过分享实用的技术文章和最佳实践，
            帮助开发者跟上技术发展的步伐，提升开发效率和代码质量。
          </p>
          <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
            我们专注于 Vue.js、Nuxt.js、TypeScript 等现代前端技术栈，
            通过深入浅出的文章和实际项目案例，为开发者提供有价值的学习资源。
          </p>
        </div>
        <div class="bg-gradient-to-br from-green-400 to-blue-500 rounded-lg p-8 text-white">
          <h3 class="text-2xl font-bold mb-4">技术栈</h3>
          <ul class="space-y-2">
            <li class="flex items-center">
              <div class="w-2 h-2 bg-white rounded-full mr-3"></div>
              Nuxt 4.0 & Vue 3
            </li>
            <li class="flex items-center">
              <div class="w-2 h-2 bg-white rounded-full mr-3"></div>
              TypeScript
            </li>
            <li class="flex items-center">
              <div class="w-2 h-2 bg-white rounded-full mr-3"></div>
              UnoCSS
            </li>
            <li class="flex items-center">
              <div class="w-2 h-2 bg-white rounded-full mr-3"></div>
              Ant Design Vue
            </li>
            <li class="flex items-center">
              <div class="w-2 h-2 bg-white rounded-full mr-3"></div>
              ESLint & Prettier
            </li>
          </ul>
        </div>
      </div>

      <!-- Features -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">为什么选择我们</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <div class="w-8 h-8 i-carbon-book text-green-600 dark:text-green-400" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">深度内容</h3>
            <p class="text-gray-600 dark:text-gray-300">不仅介绍如何使用，更深入探讨技术原理和最佳实践</p>
          </div>
          <div class="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <div class="w-8 h-8 i-carbon-time text-blue-600 dark:text-blue-400" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">及时更新</h3>
            <p class="text-gray-600 dark:text-gray-300">紧跟技术发展趋势，及时分享最新的技术动态和工具</p>
          </div>
          <div class="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <div class="w-8 h-8 i-carbon-user-multiple text-purple-600 dark:text-purple-400" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">社区驱动</h3>
            <p class="text-gray-600 dark:text-gray-300">鼓励读者参与讨论，共同学习和成长</p>
          </div>
        </div>
      </div>

      <!-- Contact -->
      <div class="text-center bg-gray-50 dark:bg-gray-800 rounded-lg p-12">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">联系我们</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          如果您有任何问题、建议或想要投稿，欢迎随时联系我们
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:contact@example.com"
            class="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            <div class="w-5 h-5 i-carbon-email mr-2" />
            发送邮件
          </a>
          <a
            href="https://github.com"
            target="_blank"
            class="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-semibold transition-colors"
          >
            <div class="w-5 h-5 i-carbon-logo-github mr-2" />
            GitHub
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 页面元数据
useHead({
  title: '关于我们'
})
</script>
