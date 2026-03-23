import { d as defineEventHandler, g as getCookie, c as createError, v as verifyToken, a as readMultipartFormData } from '../../../nitro/nitro.mjs';
import { d as db, p as posts } from '../../../_/index.mjs';
import { eq } from 'drizzle-orm';
import matter from 'gray-matter';
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
  let title = filename.replace(".md", "");
  let postContent = content;
  let excerpt = "";
  let categoryId;
  let tags = [];
  let coverImage = "";
  try {
    const parsed = matter(content);
    postContent = parsed.content;
    title = parsed.data.title || title;
    excerpt = parsed.data.excerpt || "";
    coverImage = parsed.data.cover || "";
    if (parsed.data.category) {
    }
    if (parsed.data.tags) {
      tags = Array.isArray(parsed.data.tags) ? parsed.data.tags : [parsed.data.tags];
    }
  } catch (e) {
    postContent = content;
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
