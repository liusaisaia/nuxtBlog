<script setup lang="ts">
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
    <h1 class="text-2xl font-bold mb-6">站点设置</h1>
    
    <div class="bg-white rounded-lg shadow p-6">
      <div class="space-y-4 max-w-xl">
        <div>
          <label class="block text-sm font-medium mb-1">站点名称</label>
          <input v-model="siteName" type="text" class="w-full border rounded px-3 py-2" />
        </div>
        
        <div>
          <label class="block text-sm font-medium mb-1">站点描述</label>
          <textarea v-model="siteDescription" class="w-full border rounded px-3 py-2" rows="3"></textarea>
        </div>
        
        <div>
          <button @click="saveSettings" :disabled="saving" class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50">
            {{ saving ? '保存中...' : '保存' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
