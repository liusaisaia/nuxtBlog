<template>
  <footer class="border-t border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg transition-colors duration-300">
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-6 h-6 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19 7-7 3 3-7 7-3-3z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="m2 2 7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>
            </div>
            <span class="font-bold text-gray-900 dark:text-white">SAISAI(0)</span>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-4 max-w-xs">
            基于 Nuxt 4、Vite 和 Tailwind CSS 构建的高性能博客模板。专为现代 Web 开发而设计。
          </p>
          <div class="flex gap-4">
            <a href="#" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
              <span class="sr-only">GitHub</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
              <span class="sr-only">Twitter</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
          </div>
        </div>
        
        <div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-4">资源</h3>
          <ul class="space-y-2 text-sm text-gray-500 dark:text-gray-400">
            <li><NuxtLink to="/posts" class="hover:text-primary-500">文章</NuxtLink></li>
            <li><NuxtLink to="/tags" class="hover:text-primary-500">标签</NuxtLink></li>
            <li><a href="/rss.xml" class="hover:text-primary-500">RSS 订阅</a></li>
          </ul>
        </div>

        <div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-4">关于</h3>
          <ul class="space-y-2 text-sm text-gray-500 dark:text-gray-400">
            <li><a href="#" class="hover:text-primary-500">隐私政策</a></li>
            <li><a href="#" class="hover:text-primary-500">服务条款</a></li>
          </ul>
        </div>
      </div>
      <div class="mt-8 pt-8 border-t border-gray-100 dark:border-dark-border text-center text-sm text-gray-400">
        &copy; {{ new Date().getFullYear() }} SAISAI(0). 保留所有权利.
      </div>
    </div>
  </footer>
</template>
