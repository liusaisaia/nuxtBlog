import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: true,
  unocss: true,
  formatters: {
    css: true,
    html: true,
    markdown: 'prettier'
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/no-multiple-template-root': 'off',
    'no-console': 'warn'
  }
})