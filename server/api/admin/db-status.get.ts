import { checkDbConnection, dbDialect, dbTarget } from '~/server/database'
import { verifyToken } from '~/server/utils/auth'

function maskTarget(target: string) {
  if (target.startsWith('file:')) {
    return target
  }
  try {
    const url = new URL(target)
    return `${url.protocol}//${url.host}${url.pathname}`
  } catch {
    return 'configured'
  }
}

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token')
  if (!token) {
    throw createError({ statusCode: 401, message: '未登录' })
  }

  const payload = await verifyToken(token)
  if (!payload) {
    throw createError({ statusCode: 401, message: '登录已过期' })
  }

  try {
    await checkDbConnection()
    return {
      ok: true,
      dialect: dbDialect,
      target: maskTarget(dbTarget),
      message: '数据库连接正常',
    }
  } catch (error: any) {
    return {
      ok: false,
      dialect: dbDialect,
      target: maskTarget(dbTarget),
      message: error?.message || '数据库连接失败',
    }
  }
})
