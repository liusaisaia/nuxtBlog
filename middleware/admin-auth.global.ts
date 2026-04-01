export default defineNuxtRouteMiddleware(async (to) => {
  const path = typeof to?.path === 'string' ? to.path : ''
  console.log('[admin-auth] middleware enter', { to: path })

  // Guard all admin routes except login page.
  if (!path.startsWith('/admin') || path === '/admin/login') {
    console.log('[admin-auth] skip guard for route', { to: path })
    return
  }

  try {
    const headers = process.server ? useRequestHeaders(['cookie']) : undefined
    const data = await $fetch<{ user?: { role?: string } }>('/api/auth/me', {
      method: 'GET',
      credentials: 'include',
      headers,
    })

    const role = data?.user?.role || ''
    console.log('[admin-auth] /api/auth/me success', { role })
    if (!['admin', 'editor'].includes(role)) {
      console.warn('[admin-auth] invalid role, redirect to login', { role })
      return navigateTo('/admin/login')
    }
  } catch {
    console.error('[admin-auth] /api/auth/me failed, redirect to login')
    return navigateTo('/admin/login')
  }
})
