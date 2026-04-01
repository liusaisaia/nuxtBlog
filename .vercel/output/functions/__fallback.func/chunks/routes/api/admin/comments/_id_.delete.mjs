import { d as defineEventHandler, c as createError, a as db, e as comments } from '../../../../nitro/nitro.mjs';
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

const _id__delete = defineEventHandler(async (event) => {
  var _a;
  const id = parseInt((_a = event.context.params) == null ? void 0 : _a.id, 10);
  if (!id) {
    throw createError({ statusCode: 400, message: "\u65E0\u6548\u7684\u8BC4\u8BBA ID" });
  }
  const [existing] = await db.select().from(comments).where(eq(comments.id, id)).limit(1);
  if (!existing) {
    throw createError({ statusCode: 404, message: "\u8BC4\u8BBA\u4E0D\u5B58\u5728" });
  }
  await db.delete(comments).where(eq(comments.id, id));
  return { success: true };
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
