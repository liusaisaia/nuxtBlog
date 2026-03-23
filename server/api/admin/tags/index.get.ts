import { db } from '~/server/database'
import { tags } from '~/server/database/schema'
import { desc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const list = await db.select().from(tags).orderBy(desc(tags.createdAt))
  return { list }
})
