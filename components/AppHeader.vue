<template>
  <header class="fixed top-0 left-0 right-0 z-50 w-full bg-[rgba(21,18,26,0.7)] backdrop-blur-[24px] shadow-header">
    <div class="max-w-page mx-auto px-8 h-16 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-2 group">
        <span class="font-bold text-xl tracking-tight text-white">VOIDZERO</span>
      </NuxtLink>

      <!-- Navigation -->
      <nav class="flex items-center gap-8">
        <NuxtLink 
          to="/" 
          class="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
          :class="{ 'text-text-primary': route.path === '/' }"
        >
          首页
        </NuxtLink>

        <NuxtLink 
          to="/posts" 
          class="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
          :class="{ 'text-text-primary': route.path === '/posts' }"
        >
          文章
        </NuxtLink>

        <NuxtLink 
          to="/tags" 
          class="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
          :class="{ 'text-text-primary': route.path === '/tags' }"
        >
          标签
        </NuxtLink>
        
        <NuxtLink 
          to="/about" 
          class="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
          :class="{ 'text-text-primary': route.path === '/about' }"
        >
          关于
        </NuxtLink>
      </nav>

      <!-- Right Side -->
      <div class="flex items-center gap-4">
        <!-- Theme Toggle -->
        <button
          class="w-9 h-9 rounded-lg flex items-center justify-center text-text-secondary hover:text-accent-purple hover:bg-accent-purple/10 transition-all"
          @click="toggleTheme"
        >
          <!-- Sun Icon (Light Mode) -->
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
          <!-- Moon Icon (Dark Mode) -->
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

        <a
          href="https://github.com/saisaia"
          target="_blank"
          class="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          <span class="text-sm font-semibold">saisaia</span>
        </a>

        <a
          href="#"
          class="px-4 py-1.5 text-sm font-medium text-white bg-[#2a2435] border border-[#2a2435] rounded-lg hover:bg-accent-purple hover:border-accent-purple transition-all"
        >
          探索 Vite+
        </a>
      </div>
    </div>
  </header>
</template>

<script setup>
const route = useRoute()

// 主题切换 - 使用 color-mode 模块
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

function toggleTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>
