import { drizzle } from 'drizzle-orm/libsql'
import { sql } from 'drizzle-orm'
import { createClient } from '@libsql/client'
import * as schema from './schema'

// 创建数据库客户端
function createDbClient() {
  // Any environment with TURSO_DATABASE_URL set will use Turso/libSQL.
  if (process.env.TURSO_DATABASE_URL) {
    return createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    })
  }

  // Fallback for local development without cloud database credentials.
  return createClient({
    url: 'file:./data/blog.db',
  })
}

const client = createDbClient()
export const db = drizzle(client, { schema })
export { schema }

export const dbDialect = process.env.TURSO_DATABASE_URL ? 'turso' : 'sqlite-local'
export const dbTarget = process.env.TURSO_DATABASE_URL || 'file:./data/blog.db'

export async function checkDbConnection() {
  await db.run(sql`select 1`)
}
