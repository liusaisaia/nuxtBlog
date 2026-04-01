import { d as defineEventHandler, c as createError, r as readBody, a as db, e as comments } from '../../../../nitro/nitro.mjs';
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

const ALLOWED_STATUS = ["pending", "approved", "rejected", "spam"];
const _id__put = defineEventHandler(async (event) => {
  var _a;
  const id = parseInt((_a = event.context.params) == null ? void 0 : _a.id, 10);
  if (!id) {
    throw createError({ statusCode: 400, message: "\u65E0\u6548\u7684\u8BC4\u8BBA ID" });
  }
  const body = await readBody(event);
  const status = ((body == null ? void 0 : body.status) || "").trim();
  if (!ALLOWED_STATUS.includes(status)) {
    throw createError({ statusCode: 400, message: "\u65E0\u6548\u7684\u8BC4\u8BBA\u72B6\u6001" });
  }
  const [existing] = await db.select().from(comments).where(eq(comments.id, id)).limit(1);
  if (!existing) {
    throw createError({ statusCode: 404, message: "\u8BC4\u8BBA\u4E0D\u5B58\u5728" });
  }
  const [comment] = await db.update(comments).set({ status }).where(eq(comments.id, id)).returning();
  return { success: true, comment };
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
