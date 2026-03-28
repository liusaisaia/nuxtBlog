import { db } from '~/server/database'
import { settings } from '~/server/database/schema'
import { eq } from 'drizzle-orm'
import { verifyToken } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  const token = getCookie(event, 'auth_token')
  if (!token) {
    throw createError({ statusCode: 401, message: '未登录' })
  }
  
  const payload = await verifyToken(token)
  if (!payload) {
    throw createError({ statusCode: 401, message: '登录已过期' })
  }
  
  for (const [key, value] of Object.entries(body)) {
    const [existing] = await db.select().from(settings).where(eq(settings.key, key))
    
    if (existing) {
      await db.update(settings).set({ value: value as string }).where(eq(settings.key, key))
    } else {
      await db.insert(settings).values({ key, value: value as string })
    }
  }
  
  return { success: true, message: '设置保存成功' }
})
