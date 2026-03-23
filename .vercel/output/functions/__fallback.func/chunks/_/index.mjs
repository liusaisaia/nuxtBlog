import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  displayName: text("display_name"),
  avatar: text("avatar"),
  role: text("role").default("admin"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => /* @__PURE__ */ new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => /* @__PURE__ */ new Date())
});
const categories = sqliteTable("categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  color: text("color").default("#3b82f6"),
  sortOrder: integer("sort_order").default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => /* @__PURE__ */ new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => /* @__PURE__ */ new Date())
});
const tags = sqliteTable("tags", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  color: text("color").default("#10b981"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => /* @__PURE__ */ new Date())
});
const posts = sqliteTable("posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content"),
  excerpt: text("excerpt"),
  coverImage: text("cover_image"),
  categoryId: integer("category_id").references(() => categories.id),
  status: text("status").default("draft"),
  isFeatured: integer("is_featured", { mode: "boolean" }).default(false),
  isSticky: integer("is_sticky", { mode: "boolean" }).default(false),
  viewCount: integer("view_count").default(0),
  publishedAt: integer("published_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => /* @__PURE__ */ new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => /* @__PURE__ */ new Date())
});
const postTags = sqliteTable("post_tags", {
  postId: integer("post_id").references(() => posts.id, { onDelete: "cascade" }),
  tagId: integer("tag_id").references(() => tags.id, { onDelete: "cascade" })
});
const pages = sqliteTable("pages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content"),
  coverImage: text("cover_image"),
  status: text("status").default("draft"),
  sortOrder: integer("sort_order").default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => /* @__PURE__ */ new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => /* @__PURE__ */ new Date())
});
const comments = sqliteTable("comments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  postId: integer("post_id").references(() => posts.id, { onDelete: "cascade" }),
  parentId: integer("parent_id"),
  authorName: text("author_name").notNull(),
  authorEmail: text("author_email"),
  content: text("content").notNull(),
  status: text("status").default("pending"),
  ip: text("ip"),
  userAgent: text("user_agent"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => /* @__PURE__ */ new Date())
});
const settings = sqliteTable("settings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  key: text("key").notNull().unique(),
  value: text("value"),
  type: text("type").default("string"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => /* @__PURE__ */ new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => /* @__PURE__ */ new Date())
});
const postsRelations = relations(posts, ({ one, many }) => ({
  category: one(categories, {
    fields: [posts.categoryId],
    references: [categories.id]
  }),
  postTags: many(postTags)
}));
const categoriesRelations = relations(categories, ({ many }) => ({
  posts: many(posts)
}));
const tagsRelations = relations(tags, ({ many }) => ({
  postTags: many(postTags)
}));
const postTagsRelations = relations(postTags, ({ one }) => ({
  post: one(posts, {
    fields: [postTags.postId],
    references: [posts.id]
  }),
  tag: one(tags, {
    fields: [postTags.tagId],
    references: [tags.id]
  })
}));
const commentsRelations = relations(comments, ({ one }) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id]
  })
}));

const schema = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  categories: categories,
  categoriesRelations: categoriesRelations,
  comments: comments,
  commentsRelations: commentsRelations,
  pages: pages,
  postTags: postTags,
  postTagsRelations: postTagsRelations,
  posts: posts,
  postsRelations: postsRelations,
  settings: settings,
  tags: tags,
  tagsRelations: tagsRelations,
  users: users
}, Symbol.toStringTag, { value: 'Module' }));

const isVercel = process.env.VERCEL === "1";
function createDbClient() {
  if (isVercel) {
    if (!process.env.TURSO_DATABASE_URL) {
      throw new Error("TURSO_DATABASE_URL is required in production environment");
    }
    return createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN
    });
  } else {
    return createClient({
      url: "file:./data/blog.db"
    });
  }
}
const client = createDbClient();
const db = drizzle(client, { schema });

export { postTags as a, categories as c, db as d, posts as p, settings as s, tags as t, users as u };
//# sourceMappingURL=index.mjs.map
