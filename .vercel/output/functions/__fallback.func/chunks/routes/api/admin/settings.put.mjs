import { d as defineEventHandler, r as readBody, g as getCookie, c as createError, v as verifyToken } from '../../../nitro/nitro.mjs';
import { d as db, s as settings } from '../../../_/index.mjs';
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
import 'drizzle-orm/libsql';
import '@libsql/client';
import 'drizzle-orm/sqlite-core';

const settings_put = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const token = getCookie(event, "auth_token");
  if (!token) {
    throw createError({ statusCode: 401, message: "\u672A\u767B\u5F55" });
  }
  const payload = verifyToken(token);
  if (!payload) {
    throw createError({ statusCode: 401, message: "\u767B\u5F55\u5DF2\u8FC7\u671F" });
  }
  for (const [key, value] of Object.entries(body)) {
    const [existing] = await db.select().from(settings).where(eq(settings.key, key));
    if (existing) {
      await db.update(settings).set({ value }).where(eq(settings.key, key));
    } else {
      await db.insert(settings).values({ key, value });
    }
  }
  return { success: true, message: "\u8BBE\u7F6E\u4FDD\u5B58\u6210\u529F" };
});

export { settings_put as default };
//# sourceMappingURL=settings.put.mjs.map
