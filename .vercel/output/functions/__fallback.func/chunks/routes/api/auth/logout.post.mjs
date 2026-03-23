import { d as defineEventHandler, s as setCookie } from '../../../nitro/nitro.mjs';
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

const logout_post = defineEventHandler(async (event) => {
  setCookie(event, "auth_token", "", {
    httpOnly: true,
    maxAge: 0,
    path: "/"
  });
  return { success: true, message: "\u9000\u51FA\u767B\u5F55\u6210\u529F" };
});

export { logout_post as default };
//# sourceMappingURL=logout.post.mjs.map
