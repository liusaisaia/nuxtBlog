import { db } from '~/server/database'
import { users } from '~/server/database/schema'
import { eq } from 'drizzle-orm'
import { verifyToken } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token')
  
  if (!token) {
    throw createError({
      statusCode: 401,
      message: '未登录'
    })
  }
  
  const payload = verifyToken(token)
  
  if (!payload) {
    throw createError({
      statusCode: 401,
      message: '登录已过期'
    })
  }
  
  const [user] = await db.select({
    id: users.id,
    username: users.username,
    email: users.email,
    createdAt: users.createdAt
  }).from(users).where(eq(users.id, payload.userId))
  
  if (!user) {
    throw createError({
      statusCode: 404,
      message: '用户不存在'
    })
  }
  
  return { user }
})
