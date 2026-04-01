import { db } from '~/server/database'
import { posts, categories, postTags, tags } from '~/server/database/schema'
import { eq, and } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  
  if (!slug) {
    throw createError({
      statusCode: 400,
      message: '缺少文章 slug'
    })
  }
  
  const result = await db.select({
    id: posts.id,
    title: posts.title,
    slug: posts.slug,
    content: posts.content,
    excerpt: posts.excerpt,
    coverImage: posts.coverImage,
    isFeatured: posts.isFeatured,
    viewCount: posts.viewCount,
    publishedAt: posts.publishedAt,
    createdAt: posts.createdAt,
    updatedAt: posts.updatedAt,
    category: {
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
      color: categories.color
    }
  })
  .from(posts)
  .leftJoin(categories, eq(posts.categoryId, categories.id))
  .where(and(
    eq(posts.slug, slug),
    eq(posts.status, 'published')
  ))
  .limit(1)
  
  if (!result || result.length === 0) {
    throw createError({
      statusCode: 404,
      message: '文章不存在'
    })
  }
  
  const post = result[0]!
  
  const postTagResults = await db.select({
    tag: {
      id: tags.id,
      name: tags.name,
      slug: tags.slug,
      color: tags.color
    }
  })
  .from(postTags)
  .leftJoin(tags, eq(postTags.tagId, tags.id))
  .where(eq(postTags.postId, post.id))
  
  await db.update(posts)
    .set({ viewCount: (post.viewCount || 0) + 1 })
    .where(eq(posts.id, post.id))
  
  return {
    ...post,
    tags: postTagResults.map(pt => pt.tag).filter(Boolean),
    date: post.publishedAt || post.createdAt
  }
})
