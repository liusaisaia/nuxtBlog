import { d as defineEventHandler } from '../../../nitro/nitro.mjs';
import { d as db, c as categories } from '../../../_/index.mjs';
import { desc } from 'drizzle-orm';
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

const index_get = defineEventHandler(async () => {
  const list = await db.select().from(categories).orderBy(desc(categories.createdAt));
  return { list };
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
