import { d as defineEventHandler, a as db, t as tags } from '../../../nitro/nitro.mjs';
import { desc } from 'drizzle-orm';
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

const index_get = defineEventHandler(async () => {
  const list = await db.select().from(tags).orderBy(desc(tags.createdAt));
  return { list };
});

export { index_get as default };
//# sourceMappingURL=index.get4.mjs.map
