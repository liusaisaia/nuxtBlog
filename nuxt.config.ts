export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss'
  ],
  ui: {
    colorMode: { enabled: true }
  },
  typescript: {
    typeCheck: false
  },
  compatibilityDate: '2024-11-20'
})
