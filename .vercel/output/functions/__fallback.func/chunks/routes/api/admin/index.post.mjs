import { d as defineEventHandler, r as readBody, g as getCookie, c as createError, v as verifyToken } from '../../../nitro/nitro.mjs';
import { d as db, c as categories } from '../../../_/index.mjs';
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
  const payload = await verifyToken(token);
  if (!payload) {
    throw createError({ statusCode: 401, message: "\u767B\u5F55\u5DF2\u8FC7\u671F" });
  }
  if (!body.name) {
    throw createError({ statusCode: 400, message: "\u5206\u7C7B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A" });
  }
  const slug = body.slug || body.name.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-").replace(/^-|-$/g, "");
  const [category] = await db.insert(categories).values({
    name: body.name,
    slug,
    description: body.description || ""
  }).returning();
  return { success: true, category };
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
