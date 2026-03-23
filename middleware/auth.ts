export default defineNuxtRouteMiddleware(async (to) => {
  const tokenCookie = useCookie('auth_token')
  const token = tokenCookie.value
  
  if (!token) {
    return navigateTo('/admin/login')
  }
  
  try {
    const { data, error } = await useFetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
    
    if (error.value || !data.value) {
      tokenCookie.value = null
      return navigateTo('/admin/login')
    }
  } catch (e) {
    tokenCookie.value = null
    return navigateTo('/admin/login')
  }
})
