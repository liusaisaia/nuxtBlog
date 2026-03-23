import { db } from '~/server/database'
import { categories } from '~/server/database/schema'
import { eq, desc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const list = await db.select().from(categories).orderBy(desc(categories.createdAt))
  return { list }
})
