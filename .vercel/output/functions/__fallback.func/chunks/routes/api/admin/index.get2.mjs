import { d as defineEventHandler, f as getQuery, e as comments, a as db, p as posts } from '../../../nitro/nitro.mjs';
import { or, like, eq, and, desc, count } from 'drizzle-orm';
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

const index_get = defineEventHandler(async (event) => {
  var _a, _b, _c;
  const query = getQuery(event);
  const page = Math.max(parseInt(query.page || "1", 10), 1);
  const pageSize = Math.min(Math.max(parseInt(query.pageSize || "10", 10), 1), 50);
  const keyword = (_a = query.keyword) == null ? void 0 : _a.trim();
  const status = (_b = query.status) == null ? void 0 : _b.trim();
  const postId = query.postId ? parseInt(query.postId, 10) : void 0;
  const whereConditions = [];
  if (keyword) {
    whereConditions.push(
      or(
        like(comments.authorName, `%${keyword}%`),
        like(comments.authorEmail, `%${keyword}%`),
        like(comments.content, `%${keyword}%`)
      )
    );
  }
  if (status) {
    whereConditions.push(eq(comments.status, status));
  }
  if (postId) {
    whereConditions.push(eq(comments.postId, postId));
  }
  const where = whereConditions.length ? and(...whereConditions) : void 0;
  const [list, totalResult] = await Promise.all([
    db.select({
      id: comments.id,
      postId: comments.postId,
      parentId: comments.parentId,
      authorName: comments.authorName,
      authorEmail: comments.authorEmail,
      content: comments.content,
      status: comments.status,
      ip: comments.ip,
      userAgent: comments.userAgent,
      createdAt: comments.createdAt,
      post: {
        id: posts.id,
        title: posts.title,
        slug: posts.slug
      }
    }).from(comments).leftJoin(posts, eq(comments.postId, posts.id)).where(where).orderBy(desc(comments.createdAt)).limit(pageSize).offset((page - 1) * pageSize),
    db.select({ count: count() }).from(comments).where(where)
  ]);
  const total = ((_c = totalResult[0]) == null ? void 0 : _c.count) || 0;
  return {
    list,
    pagination: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize)
    }
  };
});

export { index_get as default };
//# sourceMappingURL=index.get2.mjs.map
