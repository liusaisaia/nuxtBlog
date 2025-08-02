<template>
  <UContainer>
    <div class="flex items-center justify-between h-16">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center space-x-2">
        <UAvatar
          src=""
          alt="N"
          size="sm"
          class="bg-gradient-to-br from-green-400 to-blue-500"
        >
          <span class="text-white font-bold text-sm">N</span>
        </UAvatar>
        <span class="font-bold text-xl">Nuxt Blog</span>
      </NuxtLink>

      <!-- Navigation -->
      <nav class="hidden md:flex items-center space-x-1">
        <UButton
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          variant="ghost"
          color="gray"
          size="sm"
        >
          {{ item.label }}
        </UButton>
      </nav>

      <!-- Theme Toggle -->
      <NuxtUIThemeToggle />
    </div>
  </UContainer>
</template>

<script setup lang="ts">
// 导航项配置
const navItems = [
  { to: '/', label: '首页' },
  { to: '/blog', label: '博客' },
  { to: '/nuxt4-features', label: 'Nuxt 4.0' },
  { to: '/about', label: '关于' }
] as const
</script>
