import { d as defineEventHandler } from '../../../nitro/nitro.mjs';
import { d as db, s as settings } from '../../../_/index.mjs';
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
import 'drizzle-orm';

const settings_get = defineEventHandler(async () => {
  const allSettings = await db.select().from(settings);
  const result = {};
  for (const s of allSettings) {
    result[s.key] = s.value || "";
  }
  return { settings: result };
});

export { settings_get as default };
//# sourceMappingURL=settings.get.mjs.map
