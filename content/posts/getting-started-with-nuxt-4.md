---
title: Getting Started with Nuxt 4
description: A comprehensive guide to building modern web applications with Nuxt 4, the intuitive Vue framework.
date: 2025-01-15
author: Alex Chen
tags: [Nuxt, Vue, JavaScript]
readingTime: 8 min read
---

# Getting Started with Nuxt 4

Nuxt 4 is the latest version of the intuitive Vue framework that makes web development simple and powerful. In this guide, we'll explore the key features and learn how to build a modern web application.

## Why Nuxt 4?

Nuxt 4 brings several improvements over previous versions:

- **Better Performance**: Optimized build process and runtime performance
- **Enhanced DX**: Improved developer experience with better error handling
- **Vue 3**: Full support for Vue 3's Composition API
- **TypeScript**: First-class TypeScript support

## Installation

Getting started with Nuxt 4 is straightforward:

```bash
npx nuxi@latest init my-project
cd my-project
npm install
npm run dev
```

## Project Structure

A typical Nuxt 4 project has the following structure:

```
my-project/
├── .nuxt/           # Build output
├── assets/          # Uncompiled assets
├── components/      # Vue components
├── composables/     # Vue composables
├── layouts/         # Layout components
├── middleware/      # Middleware
├── pages/           # Page components
├── public/          # Static files
├── server/          # Server API
├── utils/           # Utility functions
├── app.vue          # App entry
└── nuxt.config.ts   # Nuxt configuration
```

## Key Features

### File-based Routing

Nuxt automatically creates routes based on your file structure in the `pages/` directory:

```vue
<!-- pages/index.vue -->
<template>
  <h1>Welcome to Nuxt 4!</h1>
</template>
```

### Auto-imports

Components, composables, and utilities are automatically imported:

```vue
<script setup>
// No need to import ref or computed
const count = ref(0)
const doubled = computed(() => count.value * 2)
</script>
```

### Server API

Create server-side API endpoints easily:

```ts
// server/api/hello.get.ts
export default defineEventHandler((event) => {
  return {
    message: 'Hello from Nuxt server!'
  }
})
```

## Conclusion

Nuxt 4 provides an excellent foundation for building modern web applications. With its intuitive API and powerful features, you can focus on building great user experiences.

Happy coding! 🚀
