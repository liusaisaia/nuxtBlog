import { _ as __nuxt_component_0 } from './PostCard-DoTikjDI.mjs';
import { defineComponent, ref, withAsyncContext, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderComponent } from 'vue/server-renderer';
import { u as useAsyncData } from './asyncData-D5CYTES7.mjs';
import { q as queryCollection } from './client-BfRTNG13.mjs';
import { u as useHead } from './server.mjs';
import './nuxt-link-CNNFjuF7.mjs';
import '../nitro/nitro.mjs';
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
import 'perfect-debounce';
import 'pinia';
import 'vue-router';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const searchQuery = ref("");
    const activeTag = ref("all");
    const sortBy = ref("latest");
    const { data: posts } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "posts-archive",
      () => queryCollection("content").order("date", "DESC").select("title", "description", "date", "tags", "path", "readingTime").all()
    )), __temp = await __temp, __restore(), __temp);
    const allTags = computed(() => {
      const set = /* @__PURE__ */ new Set();
      for (const post of posts.value || []) {
        for (const tag of post.tags || []) {
          set.add(tag);
        }
      }
      return [...set];
    });
    const filteredPosts = computed(() => {
      const keyword = searchQuery.value.trim().toLowerCase();
      let list = [...posts.value || []];
      if (activeTag.value !== "all") {
        list = list.filter((post) => (post.tags || []).includes(activeTag.value));
      }
      if (keyword) {
        list = list.filter((post) => {
          const title = post.title?.toLowerCase() || "";
          const desc = post.description?.toLowerCase() || "";
          const tags = (post.tags || []).join(" ").toLowerCase();
          return title.includes(keyword) || desc.includes(keyword) || tags.includes(keyword);
        });
      }
      if (sortBy.value === "title") {
        list.sort((a, b) => a.title.localeCompare(b.title, "zh-CN"));
      } else if (sortBy.value === "oldest") {
        list.sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date)));
      } else {
        list.sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
      }
      return list;
    });
    useHead({
      title: "文章归档 - Void Notes",
      meta: [
        { name: "description", content: "按主题、关键词和时间快速检索技术文章。" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PostCard = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container-page pb-20" }, _attrs))}><section class="pt-8 md:pt-14"><div class="surface-strong rounded-3xl p-6 md:p-8 motion-rise"><p class="text-xs uppercase tracking-[0.2em] text-mute">Article Archive</p><h1 class="text-3xl md:text-5xl font-semibold tracking-tight mt-3">技术文章归档</h1><p class="text-soft mt-4 max-w-2xl">围绕前端工程、系统设计、开发工具与性能优化，快速找到你要读的那篇文章。</p><div class="grid grid-cols-1 lg:grid-cols-12 gap-3 mt-6"><label class="lg:col-span-6 surface rounded-xl px-4 py-3 flex items-center gap-3"><svg class="w-4 h-4 text-mute" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M21 21l-4.35-4.35M16 10.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z"></path></svg><input${ssrRenderAttr("value", unref(searchQuery))} type="text" class="w-full bg-transparent outline-none text-sm" placeholder="搜索标题、摘要或标签"></label><label class="lg:col-span-3 relative"><select class="themed-select w-full surface rounded-xl px-4 py-3 pr-10 text-sm outline-none"><option value="all"${ssrIncludeBooleanAttr(Array.isArray(unref(activeTag)) ? ssrLooseContain(unref(activeTag), "all") : ssrLooseEqual(unref(activeTag), "all")) ? " selected" : ""}>全部标签</option><!--[-->`);
      ssrRenderList(unref(allTags), (tag) => {
        _push(`<option${ssrRenderAttr("value", tag)}${ssrIncludeBooleanAttr(Array.isArray(unref(activeTag)) ? ssrLooseContain(unref(activeTag), tag) : ssrLooseEqual(unref(activeTag), tag)) ? " selected" : ""}>${ssrInterpolate(tag)}</option>`);
      });
      _push(`<!--]--></select><svg class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mute" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M6 9l6 6 6-6"></path></svg></label><label class="lg:col-span-3 relative"><select class="themed-select w-full surface rounded-xl px-4 py-3 pr-10 text-sm outline-none"><option value="latest"${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "latest") : ssrLooseEqual(unref(sortBy), "latest")) ? " selected" : ""}>最新优先</option><option value="oldest"${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "oldest") : ssrLooseEqual(unref(sortBy), "oldest")) ? " selected" : ""}>最早优先</option><option value="title"${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "title") : ssrLooseEqual(unref(sortBy), "title")) ? " selected" : ""}>标题排序</option></select><svg class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mute" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M6 9l6 6 6-6"></path></svg></label></div></div></section><section class="mt-8"><div class="flex items-center justify-between mb-4"><p class="text-sm text-mute">共 ${ssrInterpolate(unref(filteredPosts).length)} 篇文章</p><div class="hidden md:flex flex-wrap gap-2 justify-end"><!--[-->`);
      ssrRenderList(unref(allTags).slice(0, 8), (tag) => {
        _push(`<button class="${ssrRenderClass([unref(activeTag) === tag ? "brand-chip border-transparent" : "border-soft text-soft hover:border-strong", "px-2.5 py-1 rounded-full text-xs border transition-colors"])}">${ssrInterpolate(tag)}</button>`);
      });
      _push(`<!--]--></div></div>`);
      if (unref(filteredPosts).length > 0) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5"><!--[-->`);
        ssrRenderList(unref(filteredPosts), (post) => {
          _push(ssrRenderComponent(_component_PostCard, {
            key: post.path,
            post
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="surface rounded-2xl p-8 text-center"><h2 class="text-lg font-medium">没有匹配结果</h2><p class="text-soft mt-2 text-sm">换个关键词或切换标签试试。</p></div>`);
      }
      _push(`</section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/posts/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-KOTSW47z.mjs.map
