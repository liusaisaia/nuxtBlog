import { db } from '~/server/database'
import { posts, categories, postTags, tags } from '~/server/database/schema'
import { eq, desc, like, and, or, count } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = parseInt(query.page as string) || 1
  const pageSize = parseInt(query.pageSize as string) || 10
  const keyword = query.keyword as string | undefined
  const categoryId = query.categoryId ? parseInt(query.categoryId as string) : undefined
  const tag = query.tag as string | undefined
  
  const whereConditions = [
    eq(posts.status, 'published')
  ]
  
  if (keyword) {
    whereConditions.push(or(
      like(posts.title, `%${keyword}%`),
      like(posts.content, `%${keyword}%`),
      like(posts.excerpt, `%${keyword}%`)
    ))
  }
  
  if (categoryId) {
    whereConditions.push(eq(posts.categoryId, categoryId))
  }
  
  const where = and(...whereConditions)
  
  const [list, totalResult] = await Promise.all([
    db.select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      excerpt: posts.excerpt,
      coverImage: posts.coverImage,
      isFeatured: posts.isFeatured,
      isSticky: posts.isSticky,
      viewCount: posts.viewCount,
      publishedAt: posts.publishedAt,
      createdAt: posts.createdAt,
      category: {
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
        color: categories.color
      }
    })
    .from(posts)
    .leftJoin(categories, eq(posts.categoryId, categories.id))
    .where(where)
    .orderBy(desc(posts.isSticky), desc(posts.publishedAt))
    .limit(pageSize)
    .offset((page - 1) * pageSize),
    
    db.select({ count: count() }).from(posts).where(where)
  ])
  
  const total = totalResult[0]?.count || 0
  
  const listWithTags = await Promise.all(
    list.map(async (post) => {
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
      
      return {
        ...post,
        tags: postTagResults.map(pt => pt.tag).filter(Boolean),
        date: post.publishedAt || post.createdAt
      }
    })
  )
  
  return {
    list: listWithTags,
    pagination: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize)
    }
  }
})
