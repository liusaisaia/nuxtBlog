import { d as defineEventHandler, g as getCookie, c as createError, v as verifyToken } from '../../../../nitro/nitro.mjs';
import { d as db, p as posts, a as postTags } from '../../../../_/index.mjs';
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

const _id__delete = defineEventHandler(async (event) => {
  var _a;
  const id = parseInt((_a = event.context.params) == null ? void 0 : _a.id);
  const token = getCookie(event, "auth_token");
  if (!token) {
    throw createError({ statusCode: 401, message: "\u672A\u767B\u5F55" });
  }
  const payload = verifyToken(token);
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
  await db.delete(postTags).where(eq(postTags.postId, id));
  await db.delete(posts).where(eq(posts.id, id));
  return { success: true, message: "\u6587\u7AE0\u5220\u9664\u6210\u529F" };
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
