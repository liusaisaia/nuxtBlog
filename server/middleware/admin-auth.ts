import { verifyToken } from '~/server/utils/auth'

const ADMIN_ONLY_PREFIXES = [
  '/api/admin/settings',
  '/api/admin/categories',
  '/api/admin/tags',
]

export default defineEventHandler(async (event) => {
  const path = event.path || event.node.req.url || ''
  if (!path.startsWith('/api/admin')) {
    return
  }

  const token = getCookie(event, 'auth_token')
  if (!token) {
    throw createError({ statusCode: 401, message: '未登录' })
  }

  const payload = await verifyToken(token)
  if (!payload) {
    throw createError({ statusCode: 401, message: '登录已过期' })
  }

  const role = payload.role || 'editor'
  const isAdminOnly = ADMIN_ONLY_PREFIXES.some((prefix) => path.startsWith(prefix))

  if (isAdminOnly && role !== 'admin') {
    throw createError({ statusCode: 403, message: '需要管理员权限' })
  }

  if (!['admin', 'editor'].includes(role)) {
    throw createError({ statusCode: 403, message: '角色无权限访问后台接口' })
  }
})
