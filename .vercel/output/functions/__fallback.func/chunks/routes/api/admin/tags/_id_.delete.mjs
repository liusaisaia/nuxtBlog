import { d as defineEventHandler, g as getCookie, c as createError, v as verifyToken, a as db, l as postTags, t as tags } from '../../../../nitro/nitro.mjs';
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
  const id = parseInt((_a = event.context.params) == null ? void 0 : _a.id);
  const token = getCookie(event, "auth_token");
  if (!token) {
    throw createError({ statusCode: 401, message: "\u672A\u767B\u5F55" });
  }
  const payload = await verifyToken(token);
  if (!payload) {
    throw createError({ statusCode: 401, message: "\u767B\u5F55\u5DF2\u8FC7\u671F" });
  }
  if (!id) {
    throw createError({ statusCode: 400, message: "\u65E0\u6548\u7684\u6807\u7B7EID" });
  }
  await db.delete(postTags).where(eq(postTags.tagId, id));
  await db.delete(tags).where(eq(tags.id, id));
  return { success: true, message: "\u6807\u7B7E\u5220\u9664\u6210\u529F" };
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
