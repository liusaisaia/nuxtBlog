import { d as defineEventHandler, c as createError } from '../../../../nitro/nitro.mjs';
import { d as db, p as posts, t as tags, a as postTags } from '../../../../_/index.mjs';
import { eq } from 'drizzle-orm';
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
import 'drizzle-orm/better-sqlite3';
import 'drizzle-orm/sqlite-core';
import 'path';

const _id__get = defineEventHandler(async (event) => {
  var _a;
  const id = parseInt((_a = event.context.params) == null ? void 0 : _a.id);
  if (!id) {
    throw createError({
      statusCode: 400,
      message: "\u65E0\u6548\u7684\u6587\u7AE0ID"
    });
  }
  const [post] = await db.select({
    id: posts.id,
    title: posts.title,
    slug: posts.slug,
    content: posts.content,
    excerpt: posts.excerpt,
    coverImage: posts.coverImage,
    status: posts.status,
    featured: posts.featured,
    viewCount: posts.viewCount,
    seoTitle: posts.seoTitle,
    seoDescription: posts.seoDescription,
    publishedAt: posts.publishedAt,
    createdAt: posts.createdAt,
    updatedAt: posts.updatedAt,
    categoryId: posts.categoryId
  }).from(posts).where(eq(posts.id, id));
  if (!post) {
    throw createError({
      statusCode: 404,
      message: "\u6587\u7AE0\u4E0D\u5B58\u5728"
    });
  }
  const postTagsResult = await db.select({
    id: tags.id,
    name: tags.name,
    slug: tags.slug
  }).from(postTags).leftJoin(tags, eq(postTags.tagId, tags.id)).where(eq(postTags.postId, id));
  return {
    ...post,
    tags: postTagsResult
  };
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
