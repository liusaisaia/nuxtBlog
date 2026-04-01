<script setup lang="ts">
definePageMeta({
  layout: false
})

const router = useRouter()
const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

async function handleLogin() {
  if (!username.value || !password.value) {
    error.value = '请输入用户名和密码'
    return
  }
  
  loading.value = true
  error.value = ''
  
  try {
    console.log('[admin-login] start login request', { username: username.value })
    await $fetch('/api/auth/login', {
      method: 'POST',
      credentials: 'include',
      body: {
        username: username.value,
        password: password.value
      }
    })

    console.log('[admin-login] login request succeeded, navigating to /admin/posts')
    await router.push('/admin/posts')
    console.log('[admin-login] router.push resolved, current route:', router.currentRoute.value.fullPath)
    if (router.currentRoute.value.path !== '/admin/posts') {
      window.location.href = '/admin/posts'
    }
  } catch (e) {
    console.error('[admin-login] login failed', e)
    error.value = (e as any)?.data?.message || '登录失败，请稍后重试'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center mb-6 text-gray-800">管理后台登录</h1>
      
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            用户名
          </label>
          <input
            v-model="username"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="请输入用户名"
          />
        </div>
        
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            密码
          </label>
          <input
            v-model="password"
            type="password"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="请输入密码"
          />
        </div>
        
        <div v-if="error" class="mb-4 text-red-500 text-sm text-center">
          {{ error }}
        </div>
        
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {{ loading ? '登录中...' : '登录' }}
        </button>
      </form>
      
      <div class="mt-4 text-center">
        <NuxtLink to="/" class="text-blue-500 hover:text-blue-600 text-sm">
          返回首页
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
