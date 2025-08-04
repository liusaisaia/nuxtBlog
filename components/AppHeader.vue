<template>
  <header class="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50">
    <div class="container mx-auto px-4">
      <div class="flex items-center h-16">
        <!-- Logo - 左侧 -->
        <div class="flex-shrink-0">
          <NuxtLink to="/" class="flex items-center space-x-3 group">
            <div class="relative">
              <div class="w-10 h-10 bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <span class="text-white font-bold text-lg">N</span>
              </div>
              <div class="absolute inset-0 bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            </div>
            <div class="flex flex-col">
              <span class="font-bold text-xl text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Nuxt Blog
              </span>
              <span class="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                现代化博客
              </span>
            </div>
          </NuxtLink>
        </div>

        <!-- Navigation - 居中 -->
        <div class="flex-1 flex justify-center">
          <nav class="hidden md:flex items-center space-x-1">
            <NuxtLink
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              class="px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 font-medium"
            >
              {{ item.label }}
            </NuxtLink>
          </nav>
        </div>

        <!-- Right side actions - 右侧 -->
        <div class="flex-shrink-0 flex items-center space-x-3">
          <!-- Search Button -->
          <UButton
            variant="ghost"
            size="sm"
            class="hidden sm:flex"
          >
            <UIcon name="i-heroicons-magnifying-glass" class="w-4 h-4" />
          </UButton>

          <!-- Theme Toggle -->
          <NuxtUIThemeToggle />

          <!-- Mobile Menu Button -->
          <UButton
            variant="ghost"
            size="sm"
            class="md:hidden"
            @click="toggleMobileMenu"
          >
            <UIcon name="i-heroicons-bars-3" class="w-5 h-5" />
          </UButton>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div v-if="isMobileMenuOpen" class="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
        <nav class="flex flex-col space-y-2">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
            @click="closeMobileMenu"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
// 导航项配置
const navItems = [
  { to: '/', label: '首页' },
  { to: '/blog', label: '博客' },
  { to: '/theme-demo', label: '主题演示' },
  { to: '/about', label: '关于' }
] as const

// 移动端菜单状态
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// 主题切换由 UColorModeButton 自动处理

// 监听路由变化，关闭移动端菜单
const route = useRoute()
watch(() => route.path, () => {
  isMobileMenuOpen.value = false
})
</script>
