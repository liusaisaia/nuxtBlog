import { db } from '~/server/database'
import { posts, postTags } from '~/server/database/schema'
import { eq } from 'drizzle-orm'
import { verifyToken } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params?.id as string)
  const body = await readBody(event)
  
  const token = getCookie(event, 'auth_token')
  if (!token) {
    throw createError({ statusCode: 401, message: '未登录' })
  }
  
  const payload = verifyToken(token)
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
  
  const updateData: any = {
    title: body.title,
    content: body.content,
    excerpt: body.excerpt,
    coverImage: body.coverImage,
    status: body.status,
    featured: body.featured,
    categoryId: body.categoryId,
    seoTitle: body.seoTitle,
    seoDescription: body.seoDescription,
    updatedAt: new Date()
  }
  
  if (body.status === 'published' && !existing.publishedAt) {
    updateData.publishedAt = new Date()
  }
  
  if (body.slug && body.slug !== existing.slug) {
    updateData.slug = body.slug
  }
  
  const [post] = await db.update(posts).set(updateData).where(eq(posts.id, id)).returning()
  
  if (body.tagIds) {
    await db.delete(postTags).where(eq(postTags.postId, id))
    if (body.tagIds.length > 0) {
      const tagRelations = body.tagIds.map((tagId: number) => ({
        postId: id,
        tagId
      }))
      await db.insert(postTags).values(tagRelations)
    }
  }
  
  return { success: true, post }
})
