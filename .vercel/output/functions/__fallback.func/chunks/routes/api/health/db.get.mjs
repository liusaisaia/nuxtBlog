import { d as defineEventHandler, c as createError } from '../../../nitro/nitro.mjs';
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

const db_get = defineEventHandler(async () => {
  {
    throw createError({ statusCode: 404, statusMessage: "Not Found" });
  }
});

export { db_get as default };
//# sourceMappingURL=db.get.mjs.map
