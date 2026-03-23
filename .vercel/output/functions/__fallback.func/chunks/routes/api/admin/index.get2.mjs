import { d as defineEventHandler, b as getQuery } from '../../../nitro/nitro.mjs';
import { p as posts, d as db, c as categories } from '../../../_/index.mjs';
import { or, like, eq, and, desc, count } from 'drizzle-orm';
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

const index_get = defineEventHandler(async (event) => {
  var _a;
  const query = getQuery(event);
  const page = parseInt(query.page) || 1;
  const pageSize = parseInt(query.pageSize) || 10;
  const keyword = query.keyword;
  const categoryId = query.categoryId ? parseInt(query.categoryId) : void 0;
  const status = query.status;
  const whereConditions = [];
  if (keyword) {
    whereConditions.push(or(
      like(posts.title, `%${keyword}%`),
      like(posts.content, `%${keyword}%`)
    ));
  }
  if (categoryId) {
    whereConditions.push(eq(posts.categoryId, categoryId));
  }
  if (status) {
    whereConditions.push(eq(posts.status, status));
  }
  const where = whereConditions.length > 0 ? and(...whereConditions) : void 0;
  const [list, totalResult] = await Promise.all([
    db.select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      excerpt: posts.excerpt,
      status: posts.status,
      featured: posts.featured,
      viewCount: posts.viewCount,
      publishedAt: posts.publishedAt,
      createdAt: posts.createdAt,
      updatedAt: posts.updatedAt,
      category: {
        id: categories.id,
        name: categories.name,
        slug: categories.slug
      }
    }).from(posts).leftJoin(categories, eq(posts.categoryId, categories.id)).where(where).orderBy(desc(posts.publishedAt)).limit(pageSize).offset((page - 1) * pageSize),
    db.select({ count: count() }).from(posts).where(where)
  ]);
  const total = ((_a = totalResult[0]) == null ? void 0 : _a.count) || 0;
  return {
    list: list.map((post) => ({
      ...post,
      tags: []
    })),
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
