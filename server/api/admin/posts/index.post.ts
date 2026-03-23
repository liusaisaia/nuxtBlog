import { db } from '~/server/database'
import { posts, postTags, tags } from '~/server/database/schema'
import { eq } from 'drizzle-orm'
import { verifyToken } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  const token = getCookie(event, 'auth_token')
  if (!token) {
    throw createError({ statusCode: 401, message: '未登录' })
  }
  
  const payload = verifyToken(token)
  if (!payload) {
    throw createError({ statusCode: 401, message: '登录已过期' })
  }
  
  const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-').replace(/^-|-$/g, '')
  
  const [post] = await db.insert(posts).values({
    title: body.title,
    slug,
    content: body.content || '',
    excerpt: body.excerpt || '',
    coverImage: body.coverImage || '',
    status: body.status || 'draft',
    featured: body.featured || false,
    categoryId: body.categoryId || null,
    seoTitle: body.seoTitle || body.title,
    seoDescription: body.seoDescription || body.excerpt || '',
    publishedAt: body.status === 'published' ? new Date() : null,
    viewCount: 0
  }).returning()
  
  if (body.tagIds && body.tagIds.length > 0) {
    const tagRelations = body.tagIds.map((tagId: number) => ({
      postId: post.id,
      tagId
    }))
    await db.insert(postTags).values(tagRelations)
  }
  
  return { success: true, post }
})
