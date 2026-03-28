import { db } from '~/server/database'
import { settings } from '~/server/database/schema'

export default defineEventHandler(async () => {
  const allSettings = await db.select().from(settings)
  
  const result: Record<string, string> = {}
  for (const s of allSettings) {
    result[s.key] = s.value || ''
  }
  
  return { settings: result }
})
