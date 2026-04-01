import { d as defineEventHandler, r as readBody, m as getRequestIP, c as createError, n as checkLoginBlocked, a as db, u as users, o as recordLoginFailure, q as clearLoginFailure, w as createToken, x as setCookie } from '../../../nitro/nitro.mjs';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
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

const login_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, password } = body;
  const ip = getRequestIP(event, { xForwardedFor: true }) || "unknown";
  if (!username || !password) {
    throw createError({
      statusCode: 400,
      message: "\u8BF7\u8F93\u5165\u7528\u6237\u540D\u548C\u5BC6\u7801"
    });
  }
  const blockedIn = checkLoginBlocked(ip, username);
  if (blockedIn) {
    throw createError({
      statusCode: 429,
      message: `\u767B\u5F55\u5931\u8D25\u6B21\u6570\u8FC7\u591A\uFF0C\u8BF7 ${blockedIn} \u79D2\u540E\u91CD\u8BD5`
    });
  }
  const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
  if (!result || result.length === 0) {
    recordLoginFailure(ip, username);
    throw createError({
      statusCode: 401,
      message: "\u7528\u6237\u540D\u6216\u5BC6\u7801\u9519\u8BEF"
    });
  }
  const user = result[0];
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    recordLoginFailure(ip, username);
    throw createError({
      statusCode: 401,
      message: "\u7528\u6237\u540D\u6216\u5BC6\u7801\u9519\u8BEF"
    });
  }
  clearLoginFailure(ip, username);
  const token = await createToken(user);
  setCookie(event, "auth_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/"
  });
  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      email: user.email,
      avatar: user.avatar,
      role: user.role
    }
  };
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
