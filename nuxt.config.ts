export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxt/eslint'
  ],
  css: ['~/assets/css/main.css'],
  typescript: {
    typeCheck: false
  },
  compatibilityDate: '2024-11-20'
})
