import { db } from '~/server/database'
import { posts, postTags } from '~/server/database/schema'
import { eq } from 'drizzle-orm'
import { verifyToken } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params?.id as string)
  
  const token = getCookie(event, 'auth_token')
  if (!token) {
    throw createError({ statusCode: 401, message: '未登录' })
  }
  
  const payload = await verifyToken(token)
  if (!payload) {
    throw createError({ statusCode: 401, message: '登录已过期' })
  }
  
  if (!id) {
    throw createError({ statusCode: 400, message: '无效的文章ID' })
  }
  
  const [existing] = await db.select().from(posts).where(eq(posts.id, id))
  if (!existing) {
    throw createError({ statusCode: 404, message: '文章不存在' })
  }
  
  await db.delete(postTags).where(eq(postTags.postId, id))
  await db.delete(posts).where(eq(posts.id, id))
  
  return { success: true, message: '文章删除成功' }
})
