<template>
  <div class="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-20">
    <!-- Clean Background (Light Mode) -->
    <div class="absolute inset-0 bg-white dark:bg-dark-bg transition-colors duration-300"></div>

    <div class="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center">
      <!-- Badge -->
      <div class="mb-12 animate-fade-in">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-sm">
          <span class="relative flex h-2 w-2">
            <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span class="text-[13px] font-mono text-gray-500 dark:text-gray-400">持续构建中 / building</span>
        </div>
      </div>

      <!-- Main Title -->
      <h1 class="text-6xl sm:text-7xl lg:text-[80px] leading-[1.1] font-bold tracking-tight mb-8 text-gray-900 dark:text-white animate-slide-up">
        赛赛的
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#4f46e5] to-[#9333ea]">前端视界</span>
      </h1>

      <!-- Subtitle -->
      <p class="text-lg text-gray-600 dark:text-gray-400 mb-12 leading-relaxed max-w-xl mx-auto animate-slide-up [animation-delay:200ms]">
        探索 Web 技术无限可能，分享开发经验与心得。
      </p>

      <!-- Hero CTA Button -->
      <div class="animate-slide-up [animation-delay:400ms]">
        <NuxtLink
          to="/posts"
          class="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0A0A0A] text-white overflow-hidden transition-all hover:scale-105"
        >
          <!-- Gradient Border Glow -->
          <span class="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-[1px] opacity-100 mask-image-linear-gradient">
            <span class="absolute inset-0 bg-[#0A0A0A] rounded-[11px]"></span>
          </span>
          
          <!-- Button Content -->
          <span class="relative flex items-center gap-2 z-10">
            <!-- Icon -->
            <span class="text-blue-400">⚡</span>
            <span class="font-medium">开始阅读</span>
          </span>
          
          <!-- Outer Glow -->
          <span class="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
