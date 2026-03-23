<template>
  <div class="min-h-screen bg-background-primary text-text-primary flex flex-col font-sans">
    <AppHeader />
    <main class="flex-grow">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
