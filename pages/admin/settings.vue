<script setup lang="ts">
definePageMeta({
  layout: 'admin',
})

const { data: settings, refresh } = await useFetch('/api/admin/settings')

const siteName = ref('')
const siteDescription = ref('')
const saving = ref(false)

onMounted(() => {
  if (settings.value?.settings) {
    siteName.value = settings.value.settings.siteName || ''
    siteDescription.value = settings.value.settings.siteDescription || ''
  }
})

async function saveSettings() {
  saving.value = true
  try {
    await $fetch('/api/admin/settings', {
      method: 'PUT',
      body: {
        siteName: siteName.value,
        siteDescription: siteDescription.value
      }
    })
    alert('保存成功')
    refresh()
  } catch (e) {
    alert('保存失败')
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div>
    <div class="mb-6">
      <div class="text-xs text-text-muted light:text-gray-500 uppercase tracking-wider mb-2">系统配置</div>
      <h1 class="text-3xl font-bold text-white light:text-gray-900">站点设置</h1>
    </div>

    <div class="bg-[#1a1625] dark:bg-[#1a1625] light:bg-white rounded-xl border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 p-6">
      <div class="space-y-4 max-w-xl">
        <div>
          <label class="block text-sm font-medium mb-1 text-white light:text-gray-900">站点名称</label>
          <input v-model="siteName" type="text" class="w-full px-3 py-2 rounded-lg bg-[#0f0c16] dark:bg-[#0f0c16] light:bg-white border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 text-white light:text-gray-900" />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1 text-white light:text-gray-900">站点描述</label>
          <textarea v-model="siteDescription" class="w-full px-3 py-2 rounded-lg bg-[#0f0c16] dark:bg-[#0f0c16] light:bg-white border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 text-white light:text-gray-900" rows="3"></textarea>
        </div>

        <div>
          <button @click="saveSettings" :disabled="saving" class="px-6 py-2 rounded-lg bg-accent-purple text-white hover:bg-accent-purple/90 disabled:opacity-50 transition-colors">
            {{ saving ? '保存中...' : '保存' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
