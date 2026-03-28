# Vercel 页面部署失败修复计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 修复 Vercel 部署后页面无法打开的问题

**Architecture:** 问题根因是数据库连接在模块加载时执行，生产环境缺少 TURSO_DATABASE_URL 环境变量导致 Nitro 服务器启动失败。需要：1) 延迟数据库连接 2) 添加环境变量验证 3) 添加健康检查端点

**Tech Stack:** Nuxt 4, Nitro, Vercel, Turso/Drizzle

---

### Task 1: 诊断验证 - 检查环境变量配置

**Files:**
- Modify: `.env.example`

**Step 1: 确认 Vercel 环境变量配置**

登录 Vercel Dashboard → 你的项目 → Settings → Environment Variables
检查是否配置了以下变量：
- `TURSO_DATABASE_URL`
- `TURSO_AUTH_TOKEN`
- `JWT_SECRET`

如果未配置，这是问题根因。

**Step 2: 记录诊断结果**

如果环境变量已配置但仍失败，问题可能在代码层面，继续 Task 2。

---

### Task 2: 修复数据库连接 - 延迟初始化

**Files:**
- Modify: `server/database/index.ts`

**Step 1: 修改数据库连接为延迟初始化**

```typescript
import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import * as schema from './schema'

// 判断是否在 Vercel 环境（生产环境使用 Turso）
const isVercel = process.env.VERCEL === '1'

// 延迟创建数据库客户端
let _db: ReturnType<typeof drizzle> | null = null

function createDbClient() {
  if (isVercel) {
    // 生产环境：使用 Turso
    if (!process.env.TURSO_DATABASE_URL) {
      console.error('Missing TURSO_DATABASE_URL environment variable')
      return null
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

export function getDb() {
  if (!_db) {
    const client = createDbClient()
    if (!client) {
      throw new Error('Failed to create database client')
    }
    _db = drizzle(client, { schema })
  }
  return _db
}

// 为兼容现有代码，保留 db 导出但使用 getter
export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_, prop) {
    return getDb()[prop as keyof typeof _db]
  }
})

export { schema }
```

**Step 2: 提交代码**

```bash
git add server/database/index.ts
git commit -m "fix: 延迟初始化数据库连接，防止环境变量缺失导致启动失败"
```

---

### Task 3: 添加环境变量验证

**Files:**
- Modify: `server/utils/env.ts` (新建)
- Modify: `server/plugins/00-env.ts` (新建)

**Step 1: 创建环境变量验证插件**

```typescript
// server/plugins/00-env.ts
export default defineNitroPlugin((nitro) => {
  const requiredEnvVars = ['TURSO_DATABASE_URL', 'TURSO_AUTH_TOKEN', 'JWT_SECRET']
  const missing = requiredEnvVars.filter(key => !process.env[key])

  if (missing.length > 0 && process.env.VERCEL === '1') {
    console.error(`Missing required environment variables: ${missing.join(', ')}`)
  }
})
```

**Step 2: 提交代码**

```bash
git add server/plugins/00-env.ts
git commit -m "fix: 添加环境变量验证插件"
```

---

### Task 4: 添加健康检查端点

**Files:**
- Modify: `server/api/health.get.ts` (新建)

**Step 1: 创建健康检查端点**

```typescript
export default defineEventHandler(async (event) => {
  const db = await import('../database').then(m => m.getDb?.() || m.db).catch(() => null)

  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: db ? 'connected' : 'disconnected',
    environment: process.env.VERCEL === '1' ? 'production' : 'development'
  }
})
```

**Step 2: 测试健康检查**

本地运行 `pnpm dev`，访问 `http://localhost:3000/api/health` 验证返回。

**Step 3: 提交代码**

```bash
git add server/api/health.get.ts
git commit -m "feat: 添加健康检查端点用于调试"
```

---

### Task 5: 重新部署验证

**Step 1: 推送代码**

```bash
git push origin main
```

**Step 2: 等待 Vercel 自动部署**

**Step 3: 访问健康检查端点**

```
https://你的域名.vercel.app/api/health
```

如果返回 `"database": "connected"` 表示问题已修复。

---

## 快速修复方案（如果不想改代码）

1. 登录 Vercel Dashboard
2. 进入项目 Settings → Environment Variables
3. 添加 `TURSO_DATABASE_URL` 和 `TURSO_AUTH_TOKEN`
4. 重新部署

---

## 验证命令

```bash
# 本地验证
pnpm build && pnpm start

# 检查 API 健康状态
curl http://localhost:3000/api/health
```
