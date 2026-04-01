import { d as defineEventHandler, y as queryCollection, z as setResponseHeader } from '../nitro/nitro.mjs';
import RSS from 'rss';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'drizzle-orm/libsql';
import 'drizzle-orm';
import '@libsql/client';
import 'drizzle-orm/sqlite-core';
import 'jose';
import 'better-sqlite3';
import 'node:url';
import 'ipx';

const rss_xml = defineEventHandler(async (event) => {
  var _a;
  const feed = new RSS({
    title: "VoidZero Blog",
    description: "The Modern Developer Blog",
    site_url: "https://example.com",
    // Replace with actual URL
    feed_url: `https://example.com/rss.xml`,
    language: "en",
    pubDate: (/* @__PURE__ */ new Date()).toUTCString(),
    copyright: `All rights reserved ${(/* @__PURE__ */ new Date()).getFullYear()}, VoidZero Blog`
  });
  const docs = await queryCollection("content").order("date", "DESC").all();
  for (const doc of docs) {
    feed.item({
      title: (_a = doc.title) != null ? _a : "-",
      url: `https://example.com${doc.path}`,
      guid: doc.path,
      date: doc.date,
      description: doc.description,
      categories: doc.tags || []
    });
  }
  const feedString = feed.xml({ indent: true });
  setResponseHeader(event, "Content-Type", "text/xml");
  return feedString;
});

export { rss_xml as default };
//# sourceMappingURL=rss.xml.mjs.map
