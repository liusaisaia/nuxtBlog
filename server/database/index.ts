import { drizzle } from 'drizzle-orm/libsql'
import { sql } from 'drizzle-orm'
import { createClient } from '@libsql/client'
import { join } from 'node:path'
import * as schema from './schema'

const localDbFile = join(process.cwd(), 'data', 'blog.db')
const localDbUrl = `file:${localDbFile}`

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
    url: localDbUrl,
  })
}

const client = createDbClient()
export const db = drizzle(client, { schema })
export { schema }

export const dbDialect = process.env.TURSO_DATABASE_URL ? 'turso' : 'sqlite-local'
export const dbTarget = process.env.TURSO_DATABASE_URL || localDbUrl

let schemaReady: Promise<void> | null = null

export function ensureLocalSchema() {
  if (dbDialect !== 'sqlite-local') return Promise.resolve()
  if (schemaReady) return schemaReady

  schemaReady = (async () => {
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        email TEXT,
        display_name TEXT,
        avatar TEXT,
        role TEXT DEFAULT 'admin',
        created_at INTEGER,
        updated_at INTEGER
      )
    `)
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        slug TEXT NOT NULL UNIQUE,
        description TEXT,
        color TEXT DEFAULT '#3b82f6',
        sort_order INTEGER DEFAULT 0,
        created_at INTEGER,
        updated_at INTEGER
      )
    `)
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS tags (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        slug TEXT NOT NULL UNIQUE,
        color TEXT DEFAULT '#10b981',
        created_at INTEGER
      )
    `)
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        content TEXT,
        excerpt TEXT,
        cover_image TEXT,
        category_id INTEGER,
        status TEXT DEFAULT 'draft',
        is_featured INTEGER DEFAULT 0,
        is_sticky INTEGER DEFAULT 0,
        view_count INTEGER DEFAULT 0,
        published_at INTEGER,
        created_at INTEGER,
        updated_at INTEGER,
        FOREIGN KEY (category_id) REFERENCES categories(id)
      )
    `)
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS post_tags (
        post_id INTEGER,
        tag_id INTEGER,
        FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
        FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
      )
    `)
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS pages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        content TEXT,
        cover_image TEXT,
        status TEXT DEFAULT 'draft',
        sort_order INTEGER DEFAULT 0,
        created_at INTEGER,
        updated_at INTEGER
      )
    `)
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        post_id INTEGER,
        parent_id INTEGER,
        author_name TEXT NOT NULL,
        author_email TEXT,
        content TEXT NOT NULL,
        status TEXT DEFAULT 'pending',
        ip TEXT,
        user_agent TEXT,
        created_at INTEGER,
        FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
      )
    `)
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        key TEXT NOT NULL UNIQUE,
        value TEXT,
        type TEXT DEFAULT 'string',
        created_at INTEGER,
        updated_at INTEGER
      )
    `)
  })()

  return schemaReady
}

export async function checkDbConnection() {
  await ensureLocalSchema()
  await db.run(sql`select 1`)
}
