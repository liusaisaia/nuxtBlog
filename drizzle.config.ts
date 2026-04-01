import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'sqlite',
  schema: './server/database/schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL || 'file:./data/blog.db',
  },
})
