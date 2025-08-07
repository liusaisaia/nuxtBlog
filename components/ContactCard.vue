<template>
  <div class="card p-6">
    <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
      {{ title }}
    </h3>
    <div class="space-y-3">
      <a
        v-for="contact in contacts"
        :key="contact.label"
        :href="contact.href"
        :target="contact.target || '_self'"
        class="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors"
      >
        <Icon :name="contact.icon" class="w-5 h-5 mr-3" />
        {{ contact.label }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Contact {
  label: string
  href: string
  icon: string
  target?: string
}

interface Props {
  title: string
  contacts: Contact[]
}

defineProps<Props>()
</script>