<template>
  <div class="p-8">
    <h1 class="text-4xl font-bold text-blue-600 mb-4">测试页面</h1>
    <div class="bg-red-100 p-4 rounded-lg mb-4">
      <p class="text-red-800">如果你能看到红色背景，说明 Tailwind CSS 正在工作</p>
    </div>
    <UButton color="primary" size="lg">
      Nuxt UI 按钮测试
    </UButton>
  </div>
</template>

<script setup>
useHead({
  title: '样式测试'
})
</script>
