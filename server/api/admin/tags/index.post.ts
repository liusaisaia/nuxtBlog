import { db } from '~/server/database'
import { tags } from '~/server/database/schema'
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
  
  if (!body.name) {
    throw createError({ statusCode: 400, message: '标签名称不能为空' })
  }
  
  const slug = body.slug || body.name.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-').replace(/^-|-$/g, '')
  
  const [tag] = await db.insert(tags).values({
    name: body.name,
    slug
  }).returning()
  
  return { success: true, tag }
})
