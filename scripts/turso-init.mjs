import { createClient } from '@libsql/client'
import bcrypt from 'bcryptjs'

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

const stmts = [
  "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL UNIQUE, password TEXT NOT NULL, email TEXT, display_name TEXT, avatar TEXT, role TEXT DEFAULT 'admin', created_at INTEGER, updated_at INTEGER)",
  "CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL UNIQUE, slug TEXT NOT NULL UNIQUE, description TEXT, color TEXT DEFAULT '#3b82f6', sort_order INTEGER DEFAULT 0, created_at INTEGER, updated_at INTEGER)",
  "CREATE TABLE IF NOT EXISTS tags (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL UNIQUE, slug TEXT NOT NULL UNIQUE, color TEXT DEFAULT '#10b981', created_at INTEGER)",
  "CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, slug TEXT NOT NULL UNIQUE, content TEXT, excerpt TEXT, cover_image TEXT, category_id INTEGER, status TEXT DEFAULT 'draft', is_featured INTEGER DEFAULT 0, is_sticky INTEGER DEFAULT 0, view_count INTEGER DEFAULT 0, published_at INTEGER, created_at INTEGER, updated_at INTEGER, FOREIGN KEY (category_id) REFERENCES categories(id))",
  "CREATE TABLE IF NOT EXISTS post_tags (post_id INTEGER, tag_id INTEGER, FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE, FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE)",
  "CREATE TABLE IF NOT EXISTS pages (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, slug TEXT NOT NULL UNIQUE, content TEXT, cover_image TEXT, status TEXT DEFAULT 'draft', sort_order INTEGER DEFAULT 0, created_at INTEGER, updated_at INTEGER)",
  "CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY AUTOINCREMENT, post_id INTEGER, parent_id INTEGER, author_name TEXT NOT NULL, author_email TEXT, content TEXT NOT NULL, status TEXT DEFAULT 'pending', ip TEXT, user_agent TEXT, created_at INTEGER, FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE)",
  "CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY AUTOINCREMENT, key TEXT NOT NULL UNIQUE, value TEXT, type TEXT DEFAULT 'string', created_at INTEGER, updated_at INTEGER)",
]

for (const sql of stmts) {
  await client.execute(sql)
}

const hashed = await bcrypt.hash('admin123', 10)
const now = Date.now()

await client.execute({
  sql: `INSERT INTO users (username, password, email, display_name, role, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(username) DO UPDATE SET
          password = excluded.password,
          role = excluded.role,
          updated_at = excluded.updated_at`,
  args: ['admin', hashed, 'admin@example.com', '管理员', 'admin', now, now],
})

const check = await client.execute("SELECT id, username, role FROM users WHERE username='admin' LIMIT 1")
console.log(JSON.stringify({ ok: true, admin: check.rows?.[0] || null }, null, 2))
