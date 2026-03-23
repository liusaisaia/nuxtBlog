import { db } from '~/server/database'
import { categories } from '~/server/database/schema'
import { eq } from 'drizzle-orm'
import { verifyToken } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params?.id as string)
  
  const token = getCookie(event, 'auth_token')
  if (!token) {
    throw createError({ statusCode: 401, message: '未登录' })
  }
  
  const payload = verifyToken(token)
  if (!payload) {
    throw createError({ statusCode: 401, message: '登录已过期' })
  }
  
  if (!id) {
    throw createError({ statusCode: 400, message: '无效的分类ID' })
  }
  
  await db.delete(categories).where(eq(categories.id, id))
  
  return { success: true, message: '分类删除成功' }
})
