import { d as defineEventHandler, g as getCookie, c as createError, v as verifyToken, k as readMultipartFormData } from '../../../nitro/nitro.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { randomUUID } from 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'drizzle-orm/libsql';
import 'drizzle-orm';
import '@libsql/client';
import 'drizzle-orm/sqlite-core';
import 'jose';
import 'better-sqlite3';
import 'node:url';
import 'ipx';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME_TO_EXT = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif"
};
const upload_post = defineEventHandler(async (event) => {
  const token = getCookie(event, "auth_token");
  if (!token) {
    throw createError({ statusCode: 401, message: "\u672A\u767B\u5F55" });
  }
  const payload = await verifyToken(token);
  if (!payload) {
    throw createError({ statusCode: 401, message: "\u767B\u5F55\u5DF2\u8FC7\u671F" });
  }
  const formData = await readMultipartFormData(event);
  if (!formData) {
    throw createError({ statusCode: 400, message: "\u672A\u63A5\u6536\u5230\u4E0A\u4F20\u6587\u4EF6" });
  }
  const fileField = formData.find((item) => item.name === "file");
  if (!fileField || !fileField.data) {
    throw createError({ statusCode: 400, message: "\u8BF7\u63D0\u4F9B\u56FE\u7247\u6587\u4EF6" });
  }
  if (!fileField.type || !(fileField.type in ALLOWED_MIME_TO_EXT)) {
    throw createError({ statusCode: 400, message: "\u4EC5\u652F\u6301 JPG/PNG/WebP/GIF \u56FE\u7247" });
  }
  if (fileField.data.byteLength > MAX_FILE_SIZE) {
    throw createError({ statusCode: 400, message: "\u56FE\u7247\u5927\u5C0F\u4E0D\u80FD\u8D85\u8FC7 5MB" });
  }
  const fromFilename = extname(fileField.filename || "").replace(".", "").toLowerCase();
  const safeExt = /^[a-z0-9]+$/.test(fromFilename) ? fromFilename : "";
  const ext = safeExt || ALLOWED_MIME_TO_EXT[fileField.type];
  const now = /* @__PURE__ */ new Date();
  const year = String(now.getFullYear());
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const relativeDir = `uploads/${year}/${month}`;
  const targetDir = join(process.cwd(), "public", relativeDir);
  await mkdir(targetDir, { recursive: true });
  const filename = `${Date.now()}-${randomUUID().slice(0, 8)}.${ext}`;
  const targetPath = join(targetDir, filename);
  await writeFile(targetPath, fileField.data);
  return {
    success: true,
    url: `/${relativeDir}/${filename}`,
    mimeType: fileField.type,
    size: fileField.data.byteLength
  };
});

export { upload_post as default };
//# sourceMappingURL=upload.post.mjs.map
