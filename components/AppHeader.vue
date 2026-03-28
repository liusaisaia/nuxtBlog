<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-300"
    :class="scrolled ? 'py-2' : 'py-3'"
  >
      <div
        class="layout-shell rounded-2xl"
        :class="scrolled ? 'surface-strong' : 'bg-transparent border border-transparent'"
      >
      <div class="h-14 flex items-center justify-between px-6 md:px-10">
        <NuxtLink to="/" class="flex items-center gap-3">
          <span class="h-7 w-7 rounded-md brand-chip flex items-center justify-center text-xs font-black">V</span>
          <span class="font-semibold tracking-tight text-base md:text-lg">Void Notes</span>
        </NuxtLink>

        <nav class="hidden md:flex items-center gap-1">
          <NuxtLink
            v-for="item in nav"
            :key="item.to"
            :to="item.to"
            class="px-3 py-2 text-sm rounded-lg transition-colors whitespace-nowrap leading-none"
            :class="route.path === item.to ? 'brand-chip font-medium' : 'text-soft hover:text-[var(--text)] hover:bg-[var(--brand-soft)]'"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-2 md:gap-3">
          <button
            class="theme-toggle w-9 h-9 rounded-lg border border-soft text-soft hover:text-[var(--text)] hover:bg-[var(--brand-soft)] transition-colors inline-flex items-center justify-center"
            @click="toggleTheme"
            aria-label="切换主题"
          >
            <span class="relative block h-4 w-4 shrink-0">
              <Sun
                class="absolute inset-0 h-4 w-4 transition-opacity duration-200"
                :class="isDark ? 'opacity-100' : 'opacity-0'"
                :stroke-width="1.9"
                aria-hidden="true"
              />
              <Moon
                class="absolute inset-0 h-4 w-4 transition-opacity duration-200"
                :class="isDark ? 'opacity-0' : 'opacity-100'"
                :stroke-width="1.9"
                aria-hidden="true"
              />
            </span>
          </button>

          <a
            href="https://github.com/saisaia"
            target="_blank"
            rel="noreferrer"
            class="hidden sm:inline-flex h-9 items-center gap-2 px-3 rounded-lg border border-soft text-sm leading-none text-soft hover:text-[var(--text)] hover:border-strong transition-colors whitespace-nowrap"
          >
            <Github class="w-4 h-4 shrink-0" :stroke-width="2" aria-hidden="true" />
            <span class="leading-none">GitHub</span>
          </a>

          <button
            class="md:hidden w-9 h-9 rounded-lg border border-soft text-soft"
            @click="mobileOpen = !mobileOpen"
            aria-label="打开菜单"
          >
            <Menu class="w-4 h-4 mx-auto" :stroke-width="2" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div v-if="mobileOpen" class="md:hidden px-3 pb-3 motion-fade">
        <nav class="surface rounded-xl p-2 flex flex-col gap-1">
          <NuxtLink
            v-for="item in nav"
            :key="item.to"
            :to="item.to"
            class="px-3 py-2 rounded-lg text-sm"
            :class="route.path === item.to ? 'brand-chip font-medium' : 'text-soft'"
            @click="mobileOpen = false"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Github, Menu, Moon, Sun } from 'lucide-vue-next'

const route = useRoute()
const colorMode = useColorMode()
const mobileOpen = ref(false)
const scrolled = ref(false)

const nav = [
  { label: '首页', to: '/' },
  { label: '文章', to: '/posts' },
  { label: '标签', to: '/tags' },
  { label: '关于', to: '/about' },
]

const isDark = computed(() => colorMode.value === 'dark')

function toggleTheme() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}

onMounted(() => {
  updateScrollState()
  window.addEventListener('scroll', updateScrollState, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateScrollState)
})

function updateScrollState() {
  scrolled.value = window.scrollY > 10
}

watch(
  () => route.path,
  () => {
    mobileOpen.value = false
  },
)
</script>

<style scoped>
.theme-toggle svg {
  color: var(--text-soft);
}

.theme-toggle:hover svg {
  color: var(--text);
}
</style>
