import { db } from '~/server/database'
import { categories } from '~/server/database/schema'
import { desc } from 'drizzle-orm'

export default defineEventHandler(async () => {
  const list = await db.select().from(categories).orderBy(desc(categories.createdAt))
  return { list }
})
