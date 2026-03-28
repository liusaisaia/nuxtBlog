# nuxtBlog 项目上下文

## 项目概述

**Void Notes** — 一个基于 Nuxt 4 构建的技术博客系统，包含前台阅读界面和后台管理面板。

- 前台：展示文章、标签、分类，支持深色/浅色主题切换
- 后台：完整 CMS，支持文章管理、分类管理、标签管理、Markdown 导入
- 部署目标：Vercel（Nitro preset: vercel）

---

## 技术栈

| 层次 | 技术 |
|------|------|
| 框架 | Nuxt 4 (`nuxt ^4.3.1`) + Vue 3 |
| 语言 | TypeScript（全项目） |
| 样式 | Tailwind CSS v3 (`@nuxtjs/tailwindcss`) |
| 状态管理 | Pinia (`@pinia/nuxt`) |
| 数据库 | SQLite（本地：`better-sqlite3`，远端：Turso/libSQL） |
| ORM | Drizzle ORM (`drizzle-orm`) |
| 内容管理 | `@nuxt/content` v3（Markdown 文件） |
| 认证 | JWT (`jose`) + bcryptjs（密码哈希） |
| 图片 | `@nuxt/image` |
| 主题 | `@nuxtjs/color-mode`（classSuffix 为空，dataValue: 'theme'） |
| 字体 | Space Grotesk + IBM Plex Mono（Google Fonts） |
| 测试 | Vitest + `@nuxt/test-utils` + happy-dom |
| Lint | oxlint |
| 包管理 | pnpm@9.0.0 |

---

## 开发命令

```bash
# 开发服务器（自动确保 better-sqlite3 已构建）
pnpm dev

# 构建生产包
pnpm build

# 数据库操作
pnpm db:generate    # 生成迁移文件
pnpm db:migrate     # 执行迁移
pnpm db:push        # 直接推送 schema（无迁移文件）
pnpm db:studio      # 打开 Drizzle Studio

# 代码检查
pnpm lint:oxc

# 测试
pnpm vitest
```

---

## 项目结构约定

```
pages/              # 页面路由（文件系统路由）
  index.vue         # 首页
  posts/            # 文章列表 & 详情
  tags/             # 标签页
  about.vue         # 关于页
  admin/            # 后台管理页面（受 auth 中间件保护）

components/         # 全局组件（Nuxt 自动导入）
layouts/
  default.vue       # 前台布局
  admin.vue         # 后台布局

server/
  api/              # API 路由（defineEventHandler）
    admin/          # 后台 API（需鉴权）
    auth/           # 登录/登出/验证
  database/
    index.ts        # Drizzle db 实例
    schema.ts       # 数据库表定义
  utils/
    auth.ts         # JWT 工具函数

content/posts/      # Markdown 文章源文件（@nuxt/content）
middleware/
  auth.ts           # 路由守卫（后台页面鉴权）
```

---

## 数据库 Schema

| 表名 | 描述 |
|------|------|
| `users` | 管理员用户（username, password hash, role） |
| `posts` | 文章（title, slug, content, status, categoryId, isFeatured…） |
| `categories` | 分类（name, slug, color, sortOrder） |
| `tags` | 标签（name, slug, color） |
| `post_tags` | 文章与标签多对多关联 |
| `pages` | 静态页面 |
| `comments` | 评论（status: pending/approved/spam） |
| `settings` | 全局键值对配置 |

> **注意**：SQLite 中 boolean 用 `integer({ mode: 'boolean' })` 存储，timestamp 用 `integer({ mode: 'timestamp' })`。

---

## 认证机制

- 使用 JWT（`jose` 库），HS256 算法，7 天有效期
- Token 存储在 Cookie `auth_token` 中
- 中间件 `middleware/auth.ts` 保护所有 `/admin/*` 路由
- **重要**：`JWT_SECRET` 必须在生产环境通过环境变量配置，绝不使用默认值

---

## 环境变量

| 变量 | 用途 | 必须 |
|------|------|------|
| `JWT_SECRET` | JWT 签名密钥 | **生产必须** |
| `TURSO_DATABASE_URL` | Turso/libSQL 远端数据库 URL | 远端部署时 |
| `SITE_URL` | 站点公开 URL | 可选 |

---

## 主题 / 样式约定

- 颜色模式：CSS 变量驱动，`colorMode.classSuffix = ''`，`dataValue = 'theme'`
- 主要 CSS 类约定：
  - `surface-strong` — 主内容容器背景
  - `text-soft` / `text-mute` — 辅助文字颜色
  - `brand-chip` — 品牌强调标签
  - `container-page` — 页面最大宽度容器
  - `reveal-stagger` — 层叠进场动画容器
- 字体：正文 Space Grotesk，代码 IBM Plex Mono

---

## @nuxt/content 使用

- 内容目录：`content/posts/*.md`
- Schema 字段：`title`, `description`, `date`, `tags[]`, `author?`, `readingTime?`
- 通过 `queryCollection` composable 查询内容

---

## 代码规范

1. **不可变性**：使用展开运算符创建新对象，不直接修改
2. **API 响应**：服务端统一使用 `defineEventHandler` + `createError`
3. **组件**：Nuxt 自动导入，无需手动 `import`
4. **TypeScript**：所有新代码必须有完整类型（不使用 `any`）
5. **测试**：组件测试放 `tests/components/*.nuxt.spec.ts`，使用 `mountSuspended`

---

## 安全注意事项

- 所有后台 API 都需要验证 JWT token（使用 `verifyToken` 工具函数）
- 密码使用 bcryptjs 哈希存储，不可明文
- 输入参数使用 `getQuery` / `readBody` 获取后必须校验
- `JWT_SECRET` 默认值 `'your-secret-key-change-in-production'` **仅限开发**

---

## 已知限制 / 待办

- `@nuxtjs/seo` 模块已注释，暂时禁用
- 评论系统 schema 已定义但前台 UI 尚未实现
- `test.md` 为临时测试文件
