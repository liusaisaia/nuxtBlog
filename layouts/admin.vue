<template>
  <div class="min-h-screen bg-[#0d0b12] dark:bg-[#0d0b12] light:bg-gray-50 flex">
    <!-- 侧边栏 -->
    <aside class="w-64 bg-[#15121a] dark:bg-[#15121a] light:bg-white border-r border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 flex flex-col fixed h-full">
      <!-- Logo -->
      <div class="p-6 border-b border-[#2a2435] dark:border-[#2a2435] light:border-gray-200">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-accent-purple flex items-center justify-center text-white font-bold text-sm">
            V
          </div>
          <div>
            <div class="text-xs text-accent-purple font-semibold uppercase tracking-wider">ADMIN CORE</div>
            <div class="text-[10px] text-text-muted light:text-gray-500">V1.0.4-STABLE</div>
          </div>
        </div>
      </div>

      <!-- 主导航 -->
      <nav class="flex-1 p-4 space-y-1">
        <NuxtLink
          to="/admin"
          class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all"
          :class="route.path === '/admin'
            ? 'bg-[#2a2435] dark:bg-[#2a2435] light:bg-accent-purple/10 text-white dark:text-white light:text-accent-purple'
            : 'text-text-secondary light:text-gray-600 hover:text-accent-purple hover:bg-accent-purple/10'"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span>Dashboard</span>
        </NuxtLink>

        <NuxtLink
          to="/admin/posts"
          class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all"
          :class="route.path.startsWith('/admin/posts')
            ? 'bg-[#2a2435] dark:bg-[#2a2435] light:bg-accent-purple/10 text-white dark:text-white light:text-accent-purple'
            : 'text-text-secondary light:text-gray-600 hover:text-accent-purple hover:bg-accent-purple/10'"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Posts</span>
        </NuxtLink>

        <NuxtLink
          to="/admin/categories"
          class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all"
          :class="route.path === '/admin/categories'
            ? 'bg-[#2a2435] dark:bg-[#2a2435] light:bg-accent-purple/10 text-white dark:text-white light:text-accent-purple'
            : 'text-text-secondary light:text-gray-600 hover:text-accent-purple hover:bg-accent-purple/10'"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <span>Categories</span>
        </NuxtLink>

        <NuxtLink
          to="/admin/comments"
          class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all"
          :class="route.path === '/admin/comments'
            ? 'bg-[#2a2435] dark:bg-[#2a2435] light:bg-accent-purple/10 text-white dark:text-white light:text-accent-purple'
            : 'text-text-secondary light:text-gray-600 hover:text-accent-purple hover:bg-accent-purple/10'"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span>Comments</span>
        </NuxtLink>

        <NuxtLink
          to="/admin/settings"
          class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all"
          :class="route.path === '/admin/settings'
            ? 'bg-[#2a2435] dark:bg-[#2a2435] light:bg-accent-purple/10 text-white dark:text-white light:text-accent-purple'
            : 'text-text-secondary light:text-gray-600 hover:text-accent-purple hover:bg-accent-purple/10'"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Settings</span>
        </NuxtLink>
      </nav>

      <!-- 底部操作区 -->
      <div class="p-4 border-t border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 space-y-3">
        <button class="w-full py-3 px-4 bg-accent-purple hover:bg-accent-purple/90 text-white text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          New Post
        </button>

        <div class="pt-2 space-y-1">
          <NuxtLink to="/docs" class="flex items-center gap-3 px-4 py-2 text-xs text-text-muted light:text-gray-500 hover:text-accent-purple hover:bg-accent-purple/10 rounded transition-colors">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Documentation
          </NuxtLink>
          <NuxtLink to="/support" class="flex items-center gap-3 px-4 py-2 text-xs text-text-muted light:text-gray-500 hover:text-accent-purple hover:bg-accent-purple/10 rounded transition-colors">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Support
          </NuxtLink>
        </div>
      </div>
    </aside>

    <!-- 主内容区 -->
    <main class="flex-1 ml-64">
      <!-- 顶部导航栏 -->
      <header class="h-16 bg-[#15121a]/80 dark:bg-[#15121a]/80 light:bg-white/80 backdrop-blur-xl border-b border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 flex items-center justify-between px-8 sticky top-0 z-40">
        <div class="flex items-center gap-6">
          <span class="text-lg font-bold text-white dark:text-white light:text-gray-900">VOID_PROTOCOL</span>
          <nav class="flex items-center gap-6 text-sm">
            <a href="#" class="text-accent-purple font-medium">Docs</a>
            <a href="#" class="text-text-secondary light:text-gray-600 hover:text-accent-purple transition-colors">Changelog</a>
            <a href="#" class="text-text-secondary light:text-gray-600 hover:text-accent-purple transition-colors">Status</a>
          </nav>
        </div>

        <div class="flex items-center gap-4">
          <!-- 主题切换 -->
          <button
            class="w-9 h-9 rounded-lg flex items-center justify-center text-text-secondary light:text-gray-600 hover:text-accent-purple hover:bg-accent-purple/10 transition-all"
            @click="toggleTheme"
          >
            <!-- 太阳图标 (深色模式时显示) -->
            <svg
              v-if="isDark"
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <!-- 月亮图标 (浅色模式时显示) -->
            <svg
              v-else
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </button>

          <!-- 通知 -->
          <button class="w-9 h-9 rounded-lg flex items-center justify-center text-text-secondary light:text-gray-600 hover:text-accent-purple hover:bg-accent-purple/10 transition-all relative">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-purple rounded-full" />
          </button>

          <!-- 设置 -->
          <button class="w-9 h-9 rounded-lg flex items-center justify-center text-text-secondary light:text-gray-600 hover:text-accent-purple hover:bg-accent-purple/10 transition-all">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>

          <!-- 用户头像 -->
          <div class="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin" class="w-full h-full object-cover">
          </div>
        </div>
      </header>

      <!-- 页面内容 -->
      <div class="p-8 bg-[#0d0b12] dark:bg-[#0d0b12] light:bg-gray-50 min-h-[calc(100vh-4rem)]">
        <slot />
      </div>
    </main>

    <!-- 悬浮添加按钮 -->
    <button class="fixed bottom-8 right-8 w-14 h-14 bg-accent-purple hover:bg-accent-purple/90 text-white rounded-full shadow-lg shadow-accent-purple/30 flex items-center justify-center transition-all hover:scale-110">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
    </button>
  </div>
</template>

<script setup>
const route = useRoute()
const colorMode = useColorMode()

// 计算属性：是否为深色模式
const isDark = computed(() => colorMode.preference === 'dark')

// 切换主题
const toggleTheme = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>
