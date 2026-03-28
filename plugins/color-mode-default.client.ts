export default defineNuxtPlugin(() => {
  const colorMode = useColorMode()

  // Migrate old "system" preference so refresh won't be forced by OS theme.
  if (colorMode.preference === 'system') {
    colorMode.preference = 'light'
  }
})
