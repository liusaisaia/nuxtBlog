import { db } from '~/server/database'
import { posts, tags, postTags } from '~/server/database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params?.id as string)
  
  if (!id) {
    throw createError({
      statusCode: 400,
      message: '无效的文章ID'
    })
  }
  
  const [post] = await db.select({
    id: posts.id,
    title: posts.title,
    slug: posts.slug,
    content: posts.content,
    excerpt: posts.excerpt,
    coverImage: posts.coverImage,
    status: posts.status,
    featured: posts.isFeatured,
    viewCount: posts.viewCount,
    publishedAt: posts.publishedAt,
    createdAt: posts.createdAt,
    updatedAt: posts.updatedAt,
    categoryId: posts.categoryId
  })
  .from(posts)
  .where(eq(posts.id, id))
  
  if (!post) {
    throw createError({
      statusCode: 404,
      message: '文章不存在'
    })
  }
  
  const postTagsResult = await db.select({
    id: tags.id,
    name: tags.name,
    slug: tags.slug
  })
  .from(postTags)
  .leftJoin(tags, eq(postTags.tagId, tags.id))
  .where(eq(postTags.postId, id))
  
  return {
    ...post,
    tags: postTagsResult
  }
})
