import { d as defineEventHandler, r as readBody, c as createError, e as createToken, s as setCookie } from '../../../nitro/nitro.mjs';
import { d as db, u as users } from '../../../_/index.mjs';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
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

const login_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, password } = body;
  if (!username || !password) {
    throw createError({
      statusCode: 400,
      message: "Username and password are required"
    });
  }
  const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
  if (!result || result.length === 0) {
    throw createError({
      statusCode: 401,
      message: "Invalid credentials - user not found"
    });
  }
  const user = result[0];
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw createError({
      statusCode: 401,
      message: "Invalid credentials"
    });
  }
  const token = await createToken(user);
  setCookie(event, "auth_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7
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
