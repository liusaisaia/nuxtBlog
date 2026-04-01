import { and, count, desc, eq, like, or } from 'drizzle-orm'
import { db } from '~/server/database'
import { comments, posts } from '~/server/database/schema'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = Math.max(parseInt((query.page as string) || '1', 10), 1)
  const pageSize = Math.min(Math.max(parseInt((query.pageSize as string) || '10', 10), 1), 50)
  const keyword = (query.keyword as string | undefined)?.trim()
  const status = (query.status as string | undefined)?.trim()
  const postId = query.postId ? parseInt(query.postId as string, 10) : undefined

  const whereConditions = []

  if (keyword) {
    whereConditions.push(
      or(
        like(comments.authorName, `%${keyword}%`),
        like(comments.authorEmail, `%${keyword}%`),
        like(comments.content, `%${keyword}%`),
      ),
    )
  }

  if (status) {
    whereConditions.push(eq(comments.status, status))
  }

  if (postId) {
    whereConditions.push(eq(comments.postId, postId))
  }

  const where = whereConditions.length ? and(...whereConditions) : undefined

  const [list, totalResult] = await Promise.all([
    db
      .select({
        id: comments.id,
        postId: comments.postId,
        parentId: comments.parentId,
        authorName: comments.authorName,
        authorEmail: comments.authorEmail,
        content: comments.content,
        status: comments.status,
        ip: comments.ip,
        userAgent: comments.userAgent,
        createdAt: comments.createdAt,
        post: {
          id: posts.id,
          title: posts.title,
          slug: posts.slug,
        },
      })
      .from(comments)
      .leftJoin(posts, eq(comments.postId, posts.id))
      .where(where)
      .orderBy(desc(comments.createdAt))
      .limit(pageSize)
      .offset((page - 1) * pageSize),
    db.select({ count: count() }).from(comments).where(where),
  ])

  const total = totalResult[0]?.count || 0

  return {
    list,
    pagination: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    },
  }
})

