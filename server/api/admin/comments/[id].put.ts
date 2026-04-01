import { eq } from 'drizzle-orm'
import { db } from '~/server/database'
import { comments } from '~/server/database/schema'

const ALLOWED_STATUS = ['pending', 'approved', 'rejected', 'spam']

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params?.id as string, 10)
  if (!id) {
    throw createError({ statusCode: 400, message: '无效的评论 ID' })
  }

  const body = await readBody<{ status?: string }>(event)
  const status = (body?.status || '').trim()

  if (!ALLOWED_STATUS.includes(status)) {
    throw createError({ statusCode: 400, message: '无效的评论状态' })
  }

  const [existing] = await db.select().from(comments).where(eq(comments.id, id)).limit(1)
  if (!existing) {
    throw createError({ statusCode: 404, message: '评论不存在' })
  }

  const [comment] = await db.update(comments).set({ status }).where(eq(comments.id, id)).returning()
  return { success: true, comment }
})

