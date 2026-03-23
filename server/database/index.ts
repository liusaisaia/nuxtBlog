import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import * as schema from './schema'

// 判断是否在 Vercel 环境（生产环境使用 Turso）
const isVercel = process.env.VERCEL === '1'

// 创建数据库客户端
function createDbClient() {
  if (isVercel) {
    // 生产环境：使用 Turso
    if (!process.env.TURSO_DATABASE_URL) {
      throw new Error('TURSO_DATABASE_URL is required in production environment')
    }
    return createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN
    })
  } else {
    // 本地开发：使用本地 SQLite 文件
    return createClient({
      url: 'file:./data/blog.db'
    })
  }
}

const client = createDbClient()
export const db = drizzle(client, { schema })
export { schema }
