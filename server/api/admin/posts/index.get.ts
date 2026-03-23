import { db } from '~/server/database'
import { posts, categories, tags, postTags } from '~/server/database/schema'
import { eq, desc, like, and, or, count } from 'drizzle-orm'
import { verifyToken } from '~/server/utils/auth'

// 获取文章列表
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = parseInt(query.page as string) || 1
  const pageSize = parseInt(query.pageSize as string) || 10
  const keyword = query.keyword as string | undefined
  const categoryId = query.categoryId ? parseInt(query.categoryId as string) : undefined
  const status = query.status as string | undefined
  
  const whereConditions = []
  
  if (keyword) {
    whereConditions.push(or(
      like(posts.title, `%${keyword}%`),
      like(posts.content, `%${keyword}%`)
    ))
  }
  
  if (categoryId) {
    whereConditions.push(eq(posts.categoryId, categoryId))
  }
  
  if (status) {
    whereConditions.push(eq(posts.status, status))
  }
  
  const where = whereConditions.length > 0 ? and(...whereConditions) : undefined
  
  const [list, totalResult] = await Promise.all([
    db.select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      excerpt: posts.excerpt,
      status: posts.status,
      featured: posts.featured,
      viewCount: posts.viewCount,
      publishedAt: posts.publishedAt,
      createdAt: posts.createdAt,
      updatedAt: posts.updatedAt,
      category: {
        id: categories.id,
        name: categories.name,
        slug: categories.slug
      }
    })
    .from(posts)
    .leftJoin(categories, eq(posts.categoryId, categories.id))
    .where(where)
    .orderBy(desc(posts.publishedAt))
    .limit(pageSize)
    .offset((page - 1) * pageSize),
    db.select({ count: count() }).from(posts).where(where)
  ])
  
  const total = totalResult[0]?.count || 0
  
  return {
    list: list.map(post => ({
      ...post,
      tags: []
    })),
    pagination: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize)
    }
  }
})
