import { eq } from 'drizzle-orm'
import { db } from '~/server/database'
import { comments } from '~/server/database/schema'

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params?.id as string, 10)
  if (!id) {
    throw createError({ statusCode: 400, message: '无效的评论 ID' })
  }

  const [existing] = await db.select().from(comments).where(eq(comments.id, id)).limit(1)
  if (!existing) {
    throw createError({ statusCode: 404, message: '评论不存在' })
  }

  await db.delete(comments).where(eq(comments.id, id))
  return { success: true }
})

