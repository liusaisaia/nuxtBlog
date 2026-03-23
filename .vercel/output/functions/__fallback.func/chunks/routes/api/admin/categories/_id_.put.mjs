import { d as defineEventHandler, r as readBody, g as getCookie, c as createError, v as verifyToken } from '../../../../nitro/nitro.mjs';
import { d as db, c as categories } from '../../../../_/index.mjs';
import { eq } from 'drizzle-orm';
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
import 'drizzle-orm/better-sqlite3';
import 'drizzle-orm/sqlite-core';
import 'path';

const _id__put = defineEventHandler(async (event) => {
  var _a;
  const id = parseInt((_a = event.context.params) == null ? void 0 : _a.id);
  const body = await readBody(event);
  const token = getCookie(event, "auth_token");
  if (!token) {
    throw createError({ statusCode: 401, message: "\u672A\u767B\u5F55" });
  }
  const payload = verifyToken(token);
  if (!payload) {
    throw createError({ statusCode: 401, message: "\u767B\u5F55\u5DF2\u8FC7\u671F" });
  }
  if (!id || !body.name) {
    throw createError({ statusCode: 400, message: "\u65E0\u6548\u7684\u53C2\u6570" });
  }
  const [category] = await db.update(categories).set({
    name: body.name,
    slug: body.slug,
    description: body.description
  }).where(eq(categories.id, id)).returning();
  return { success: true, category };
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
