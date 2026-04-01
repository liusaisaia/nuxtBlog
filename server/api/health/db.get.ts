import { checkDbConnection, dbDialect, dbTarget } from '~/server/database'

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

export default defineEventHandler(async () => {
  // Dev-only health endpoint to avoid leaking infra info in production.
  if (process.env.NODE_ENV === 'production') {
    throw createError({ statusCode: 404, statusMessage: 'Not Found' })
  }

  try {
    await checkDbConnection()
    return {
      ok: true,
      dialect: dbDialect,
      target: maskTarget(dbTarget),
      message: '数据库连接正常',
      timestamp: new Date().toISOString(),
    }
  } catch (error: any) {
    return {
      ok: false,
      dialect: dbDialect,
      target: maskTarget(dbTarget),
      message: error?.message || '数据库连接失败',
      timestamp: new Date().toISOString(),
    }
  }
})
