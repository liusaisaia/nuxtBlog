import { d as defineEventHandler, g as getCookie, c as createError, v as verifyToken, h as checkDbConnection, i as dbDialect, j as dbTarget } from '../../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'drizzle-orm/libsql';
import 'drizzle-orm';
import '@libsql/client';
import 'drizzle-orm/sqlite-core';
import 'jose';
import 'better-sqlite3';
import 'node:url';
import 'ipx';

function maskTarget(target) {
  if (target.startsWith("file:")) {
    return target;
  }
  try {
    const url = new URL(target);
    return `${url.protocol}//${url.host}${url.pathname}`;
  } catch {
    return "configured";
  }
}
const dbStatus_get = defineEventHandler(async (event) => {
  const token = getCookie(event, "auth_token");
  if (!token) {
    throw createError({ statusCode: 401, message: "\u672A\u767B\u5F55" });
  }
  const payload = await verifyToken(token);
  if (!payload) {
    throw createError({ statusCode: 401, message: "\u767B\u5F55\u5DF2\u8FC7\u671F" });
  }
  try {
    await checkDbConnection();
    return {
      ok: true,
      dialect: dbDialect,
      target: maskTarget(dbTarget),
      message: "\u6570\u636E\u5E93\u8FDE\u63A5\u6B63\u5E38"
    };
  } catch (error) {
    return {
      ok: false,
      dialect: dbDialect,
      target: maskTarget(dbTarget),
      message: (error == null ? void 0 : error.message) || "\u6570\u636E\u5E93\u8FDE\u63A5\u5931\u8D25"
    };
  }
});

export { dbStatus_get as default };
//# sourceMappingURL=db-status.get.mjs.map
