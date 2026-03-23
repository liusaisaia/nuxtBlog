import { readBody } from 'h3'
import { db } from '~/server/database'
import { posts } from '~/server/database/schema'
import { verifyToken } from '~/server/utils/auth'
import { eq } from 'drizzle-orm'
import matter from 'gray-matter'

export default defineEventHandler(async (event) => {
  // Verify auth
  const token = getCookie(event, 'auth_token')
  if (!token) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }
  
  const payload = await verifyToken(token)
  if (!payload) {
    throw createError({ statusCode: 401, message: 'Invalid token' })
  }

  // Get form data
  const formData = await readMultipartFormData(event)
  if (!formData) {
    throw createError({ statusCode: 400, message: 'No file uploaded' })
  }

  // Find the file
  const fileField = formData.find(f => f.name === 'file')
  if (!fileField || !fileField.data) {
    throw createError({ statusCode: 400, message: 'No file found' })
  }

  const content = fileField.data.toString('utf-8')
  const filename = fileField.filename || 'untitled.md'

  // Parse frontmatter
  let title = filename.replace('.md', '')
  let postContent = content
  let excerpt = ''
  let categoryId: number | undefined
  let tags: string[] = []
  let coverImage = ''

  try {
    const parsed = matter(content)
    postContent = parsed.content
    title = parsed.data.title || title
    excerpt = parsed.data.excerpt || ''
    coverImage = parsed.data.cover || ''
    
    if (parsed.data.category) {
      // TODO: Look up category by name/slug
    }
    
    if (parsed.data.tags) {
      tags = Array.isArray(parsed.data.tags) ? parsed.data.tags : [parsed.data.tags]
    }
  } catch (e) {
    // If parsing fails, use the whole content
    postContent = content
  }

  // Generate slug from title
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '')
    || 'untitled'

  // Check if slug exists
  const existing = await db.query.posts.findFirst({
    where: eq(posts.slug, slug)
  })

  const finalSlug = existing ? `${slug}-${Date.now()}` : slug

  // Insert post
  const result = await db.insert(posts).values({
    title,
    slug: finalSlug,
    content: postContent,
    excerpt: excerpt || postContent.slice(0, 200),
    coverImage,
    categoryId,
    status: 'draft',
    isFeatured: false,
    isSticky: false,
    viewCount: 0,
    publishedAt: null
  })

  // Get the last inserted ID
  const lastId = result.lastInsertRowid

  // Fetch the created post
  const post = await db.query.posts.findFirst({
    where: eq(posts.id, Number(lastId))
  })

  if (!post) {
    throw createError({ statusCode: 500, message: 'Failed to create post' })
  }

  return {
    success: true,
    message: 'Post imported successfully',
    post: {
      id: post.id,
      title: post.title,
      slug: post.slug,
      status: post.status
    }
  }
})
