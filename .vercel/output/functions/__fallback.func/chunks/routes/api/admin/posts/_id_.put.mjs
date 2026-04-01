import { d as defineEventHandler, r as readBody, g as getCookie, c as createError, v as verifyToken, a as db, p as posts, l as postTags } from '../../../../nitro/nitro.mjs';
import { eq } from 'drizzle-orm';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'drizzle-orm/libsql';
import '@libsql/client';
import 'drizzle-orm/sqlite-core';
import 'jose';
import 'better-sqlite3';
import 'node:url';
import 'ipx';

const _id__put = defineEventHandler(async (event) => {
  var _a, _b, _c, _d;
  const id = parseInt((_a = event.context.params) == null ? void 0 : _a.id);
  const body = await readBody(event);
  const token = getCookie(event, "auth_token");
  if (!token) {
    throw createError({ statusCode: 401, message: "\u672A\u767B\u5F55" });
  }
  const payload = await verifyToken(token);
  if (!payload) {
    throw createError({ statusCode: 401, message: "\u767B\u5F55\u5DF2\u8FC7\u671F" });
  }
  if (!id) {
    throw createError({ statusCode: 400, message: "\u65E0\u6548\u7684\u6587\u7AE0ID" });
  }
  const [existing] = await db.select().from(posts).where(eq(posts.id, id));
  if (!existing) {
    throw createError({ statusCode: 404, message: "\u6587\u7AE0\u4E0D\u5B58\u5728" });
  }
  const updateData = {
    title: body.title,
    content: body.content,
    excerpt: body.excerpt,
    coverImage: body.coverImage,
    status: body.status,
    isFeatured: (_c = (_b = body.isFeatured) != null ? _b : body.featured) != null ? _c : false,
    isSticky: (_d = body.isSticky) != null ? _d : false,
    categoryId: body.categoryId,
    updatedAt: /* @__PURE__ */ new Date()
  };
  if (body.status === "published" && !existing.publishedAt) {
    updateData.publishedAt = /* @__PURE__ */ new Date();
  }
  if (body.slug && body.slug !== existing.slug) {
    updateData.slug = body.slug;
  }
  const [post] = await db.update(posts).set(updateData).where(eq(posts.id, id)).returning();
  if (body.tagIds) {
    await db.delete(postTags).where(eq(postTags.postId, id));
    if (body.tagIds.length > 0) {
      const tagRelations = body.tagIds.map((tagId) => ({
        postId: id,
        tagId
      }));
      await db.insert(postTags).values(tagRelations);
    }
  }
  return { success: true, post };
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
