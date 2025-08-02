<template>
  <div class="min-h-screen">
    <UHeader>
      <AppHeader />
    </UHeader>

    <UMain>
      <UContainer class="py-8">
        <slot />
      </UContainer>
    </UMain>

    <UFooter>
      <AppFooter />
    </UFooter>
  </div>
</template>

<script setup lang="ts">
// 默认布局
</script>
