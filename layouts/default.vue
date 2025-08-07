<template>
  <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
    <!-- 导航栏 -->
    <nav class="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm flex-shrink-0">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo区域 -->
          <div class="flex items-center">
            <NuxtLink to="/" class="flex items-center space-x-3 hover:opacity-80 transition-opacity no-underline">
              <div class="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center shadow-lg">
                <Icon name="i-heroicons-document-text" class="w-5 h-5 text-white" />
              </div>
              <span class="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                前端开发者
              </span>
            </NuxtLink>
          </div>

          <!-- 导航菜单 -->
          <div class="hidden md:flex items-center space-x-8">
            <NuxtLink
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              class="relative px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-white font-medium transition-all duration-300 group overflow-hidden no-underline"
              active-class="text-white bg-gradient-to-r from-green-500 to-green-600 shadow-lg"
            >
              <!-- 渐变背景层 -->
              <div class="absolute inset-0 bg-gradient-to-r from-green-400/10 via-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <!-- 悬停时的渐变背景 -->
              <div class="absolute inset-0 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>

              <!-- 文本内容 -->
              <span class="relative z-10">{{ item.name }}</span>

              <!-- 底部边框动画 -->
              <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-purple-400 transition-all duration-300 group-hover:w-full"></span>

              <!-- 悬停时的光泽效果 -->
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-[-100%] group-hover:translate-x-[100%]"></div>
            </NuxtLink>
          </div>

          <!-- 右侧操作 -->
          <div class="flex items-center space-x-4">
            <!-- 主题切换 -->
            <button
              @click="toggleDark"
              class="relative p-3 transition-all duration-200 border-0 focus:outline-none focus:ring-0 cursor-pointer hover:scale-105 active:scale-95 border-rd-3xl bg-transparent"
              :aria-label="isDark ? '切换到亮色模式' : '切换到暗色模式'"
            >
              <div class="relative w-5 h-5">
                <Transition name="theme-switch" mode="out-in">
                  <!-- 太阳图标（亮色模式） -->
                  <svg
                    v-if="isDark"
                    key="sun"
                    class="absolute inset-0 w-5 h-5 text-yellow-500 transform transition-all duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>

                  <!-- 月亮图标（暗色模式） -->
                  <svg
                    v-else
                    key="moon"
                    class="absolute inset-0 w-5 h-5 text-gray-600 transform transition-all duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                </Transition>
              </div>

              <!-- 悬停时的背景效果 -->
              <div class="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 dark:from-blue-400/20 dark:to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
            </button>

            <!-- 移动端菜单 -->
            <UButton
              icon="i-heroicons-bars-3"
              size="sm"
              color="neutral"
              variant="ghost"
              class="md:hidden"
              @click="mobileMenuOpen = !mobileMenuOpen"
            />
          </div>
        </div>
      </div>
    </nav>

    <!-- 主要内容 -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- 页脚 -->
    <footer class="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-32 flex-shrink-0">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
          <!-- 品牌信息 -->
          <div class="col-span-1 md:col-span-2">
            <div class="flex items-center space-x-3 mb-6">
              <div class="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center shadow-lg">
                <Icon name="i-heroicons-document-text" class="w-6 h-6 text-white" />
              </div>
              <span class="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                现代博客
              </span>
            </div>
            <p class="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              基于 Nuxt 4 构建的现代化博客系统，采用最新的前端技术栈，提供优秀的用户体验。
            </p>
            <div class="flex space-x-4">
              <UButton
                icon="i-simple-icons-github"
                size="sm"
                color="neutral"
                variant="ghost"
                to="https://github.com"
                target="_blank"
                class="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              />
              <UButton
                icon="i-simple-icons-twitter"
                size="sm"
                color="neutral"
                variant="ghost"
                to="https://twitter.com"
                target="_blank"
                class="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              />
            </div>
          </div>

          <!-- 快速链接 -->
          <div>
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-6">
              快速链接
            </h3>
            <ul class="space-y-3">
              <li>
                <NuxtLink to="/" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  首页
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/blog" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  博客
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/categories" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  分类
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/about" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  关于
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- 技术栈 -->
          <div>
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-6">
              技术栈
            </h3>
            <ul class="space-y-3">
              <li class="text-gray-600 dark:text-gray-400">Nuxt 4</li>
              <li class="text-gray-600 dark:text-gray-400">Vue 3</li>
              <li class="text-gray-600 dark:text-gray-400">TypeScript</li>
              <li class="text-gray-600 dark:text-gray-400">Tailwind CSS</li>
            </ul>
          </div>
        </div>

        <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p class="text-center text-gray-500 dark:text-gray-400">
            © {{ new Date().getFullYear() }} 现代博客. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 导航配置
const navigation = [
  { name: '首页', href: '/' },
  { name: '博客', href: '/blog' },
  { name: '分类', href: '/categories' },
  { name: '关于', href: '/about' }
]

// 主题切换
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

const toggleDark = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  console.log(
    '\n%c aomyh == colorMode.preference',
    'color: #fff; border-radius: 12px; padding: 3px 10px; background: linear-gradient(315deg, #1fd1f9 0%, #b621fe 74%)',
    '\n',
    '\n',
    colorMode.preference,
  );
}

// 移动端菜单
const mobileMenuOpen = ref(false)
</script>

<style scoped>
/* 主题切换动画 - 更流畅的缓动效果 */
.theme-switch-enter-active,
.theme-switch-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.theme-switch-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0.8);
}

.theme-switch-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.8);
}

.theme-switch-enter-to,
.theme-switch-leave-from {
  opacity: 1;
  transform: rotate(0deg) scale(1);
}

/* 按钮交互效果 */
button {
  position: relative;
  overflow: hidden;
}

button:hover {
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}
</style>
