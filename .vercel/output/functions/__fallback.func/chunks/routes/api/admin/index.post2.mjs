import { d as defineEventHandler, r as readBody, g as getCookie, c as createError, v as verifyToken } from '../../../nitro/nitro.mjs';
import { d as db, p as posts, a as postTags } from '../../../_/index.mjs';
import 'jose';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'better-sqlite3';
import 'node:url';
import 'ipx';
import 'drizzle-orm/libsql';
import '@libsql/client';
import 'drizzle-orm/sqlite-core';
import 'drizzle-orm';

const index_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const token = getCookie(event, "auth_token");
  if (!token) {
    throw createError({ statusCode: 401, message: "\u672A\u767B\u5F55" });
  }
  const payload = verifyToken(token);
  if (!payload) {
    throw createError({ statusCode: 401, message: "\u767B\u5F55\u5DF2\u8FC7\u671F" });
  }
  const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-").replace(/^-|-$/g, "");
  const [post] = await db.insert(posts).values({
    title: body.title,
    slug,
    content: body.content || "",
    excerpt: body.excerpt || "",
    coverImage: body.coverImage || "",
    status: body.status || "draft",
    featured: body.featured || false,
    categoryId: body.categoryId || null,
    seoTitle: body.seoTitle || body.title,
    seoDescription: body.seoDescription || body.excerpt || "",
    publishedAt: body.status === "published" ? /* @__PURE__ */ new Date() : null,
    viewCount: 0
  }).returning();
  if (body.tagIds && body.tagIds.length > 0) {
    const tagRelations = body.tagIds.map((tagId) => ({
      postId: post.id,
      tagId
    }));
    await db.insert(postTags).values(tagRelations);
  }
  return { success: true, post };
});

export { index_post as default };
//# sourceMappingURL=index.post2.mjs.map
