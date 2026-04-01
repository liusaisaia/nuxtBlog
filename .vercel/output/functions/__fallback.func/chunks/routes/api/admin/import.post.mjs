import { d as defineEventHandler, g as getCookie, c as createError, v as verifyToken, k as readMultipartFormData, a as db, p as posts } from '../../../nitro/nitro.mjs';
import { eq } from 'drizzle-orm';
import matter from 'gray-matter';
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

const import_post = defineEventHandler(async (event) => {
  const token = getCookie(event, "auth_token");
  if (!token) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }
  const payload = await verifyToken(token);
  if (!payload) {
    throw createError({ statusCode: 401, message: "Invalid token" });
  }
  const formData = await readMultipartFormData(event);
  if (!formData) {
    throw createError({ statusCode: 400, message: "No file uploaded" });
  }
  const fileField = formData.find((f) => f.name === "file");
  if (!fileField || !fileField.data) {
    throw createError({ statusCode: 400, message: "No file found" });
  }
  const content = fileField.data.toString("utf-8");
  const filename = fileField.filename || "untitled.md";
  const lowerName = filename.toLowerCase();
  let title = filename.replace(".md", "");
  let postContent = content;
  let excerpt = "";
  const categoryId = void 0;
  let coverImage = "";
  if (lowerName.endsWith(".json")) {
    try {
      const parsedJson = JSON.parse(content);
      const source = Array.isArray(parsedJson) ? parsedJson[0] : parsedJson;
      if (!source || typeof source !== "object") {
        throw new Error("Invalid JSON format");
      }
      title = source.title || source.name || source.subject || filename.replace(".json", "") || "untitled";
      postContent = source.content || source.markdown || source.body || source.text || "";
      excerpt = source.excerpt || source.summary || "";
      coverImage = source.cover || source.coverImage || source.thumbnail || "";
    } catch {
      throw createError({ statusCode: 400, message: "JSON \u89E3\u6790\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u6587\u4EF6\u683C\u5F0F" });
    }
  } else {
    try {
      const parsed = matter(content);
      postContent = parsed.content;
      title = parsed.data.title || title;
      excerpt = parsed.data.excerpt || "";
      coverImage = parsed.data.cover || "";
      if (parsed.data.category) {
      }
    } catch {
      postContent = content;
    }
  }
  const slug = title.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-").replace(/^-+|-+$/g, "") || "untitled";
  const existing = await db.query.posts.findFirst({
    where: eq(posts.slug, slug)
  });
  const finalSlug = existing ? `${slug}-${Date.now()}` : slug;
  const result = await db.insert(posts).values({
    title,
    slug: finalSlug,
    content: postContent,
    excerpt: excerpt || postContent.slice(0, 200),
    coverImage,
    categoryId,
    status: "draft",
    isFeatured: false,
    isSticky: false,
    viewCount: 0,
    publishedAt: null
  });
  const lastId = result.lastInsertRowid;
  const post = await db.query.posts.findFirst({
    where: eq(posts.id, Number(lastId))
  });
  if (!post) {
    throw createError({ statusCode: 500, message: "Failed to create post" });
  }
  return {
    success: true,
    message: "Post imported successfully",
    post: {
      id: post.id,
      title: post.title,
      slug: post.slug,
      status: post.status
    }
  };
});

export { import_post as default };
//# sourceMappingURL=import.post.mjs.map
