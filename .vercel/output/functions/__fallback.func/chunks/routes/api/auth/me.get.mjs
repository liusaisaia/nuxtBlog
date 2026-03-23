import { d as defineEventHandler, g as getCookie, c as createError, v as verifyToken } from '../../../nitro/nitro.mjs';
import { d as db, u as users } from '../../../_/index.mjs';
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

const me_get = defineEventHandler(async (event) => {
  const token = getCookie(event, "auth_token");
  if (!token) {
    throw createError({
      statusCode: 401,
      message: "\u672A\u767B\u5F55"
    });
  }
  const payload = verifyToken(token);
  if (!payload) {
    throw createError({
      statusCode: 401,
      message: "\u767B\u5F55\u5DF2\u8FC7\u671F"
    });
  }
  const [user] = await db.select({
    id: users.id,
    username: users.username,
    email: users.email,
    createdAt: users.createdAt
  }).from(users).where(eq(users.id, payload.userId));
  if (!user) {
    throw createError({
      statusCode: 404,
      message: "\u7528\u6237\u4E0D\u5B58\u5728"
    });
  }
  return { user };
});

export { me_get as default };
//# sourceMappingURL=me.get.mjs.map
