import { _ as __nuxt_component_0 } from './nuxt-link-CNNFjuF7.mjs';
import { defineComponent, withAsyncContext, computed, unref, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { u as useFetch } from './fetch-CHkX7ai1.mjs';
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
import './server.mjs';
import 'pinia';
import 'vue-router';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import '@vue/shared';
import './asyncData-D5CYTES7.mjs';
import 'perfect-debounce';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: dbStatus } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/admin/db-status",
      "$ZzvrlWnZZb"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const { data: postsAll } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/admin/posts",
      {
        query: { page: 1, pageSize: 1 }
      },
      "$4uiGcZPsi_"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const { data: postsPublished } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/admin/posts",
      {
        query: { page: 1, pageSize: 1, status: "published" }
      },
      "$g5EdAuw5xP"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const { data: postsDraft } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/admin/posts",
      {
        query: { page: 1, pageSize: 1, status: "draft" }
      },
      "$9ULP5s36rG"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const { data: categoriesData } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/admin/categories",
      "$nsPRGjMoJa"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const { data: tagsData } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/admin/tags",
      "$7RYYTDKCYL"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const totalPosts = computed(() => postsAll.value?.pagination?.total || 0);
    const publishedPosts = computed(() => postsPublished.value?.pagination?.total || 0);
    const draftPosts = computed(() => postsDraft.value?.pagination?.total || 0);
    const totalCategories = computed(() => categoriesData.value?.list?.length || 0);
    const totalTags = computed(() => tagsData.value?.list?.length || 0);
    const latestPosts = computed(() => postsAll.value?.list || []);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="mb-8"><div class="text-xs text-text-muted light:text-gray-500 uppercase tracking-wider mb-2">系统概览</div><h1 class="text-4xl font-bold text-white light:text-gray-900 mb-2">管理面板</h1><p class="text-text-secondary light:text-gray-600 text-sm max-w-2xl">仅展示真实数据与可执行操作，去除演示数据和无效交互。</p></div><div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 mb-8"><div class="p-5 bg-[#1a1625] dark:bg-[#1a1625] light:bg-white rounded-xl border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200"><div class="text-xs text-text-muted light:text-gray-500 uppercase mb-1">文章总数</div><div class="text-2xl font-bold text-white light:text-gray-900">${ssrInterpolate(unref(totalPosts))}</div></div><div class="p-5 bg-[#1a1625] dark:bg-[#1a1625] light:bg-white rounded-xl border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200"><div class="text-xs text-text-muted light:text-gray-500 uppercase mb-1">已发布</div><div class="text-2xl font-bold text-green-500">${ssrInterpolate(unref(publishedPosts))}</div></div><div class="p-5 bg-[#1a1625] dark:bg-[#1a1625] light:bg-white rounded-xl border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200"><div class="text-xs text-text-muted light:text-gray-500 uppercase mb-1">草稿</div><div class="text-2xl font-bold text-yellow-500">${ssrInterpolate(unref(draftPosts))}</div></div><div class="p-5 bg-[#1a1625] dark:bg-[#1a1625] light:bg-white rounded-xl border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200"><div class="text-xs text-text-muted light:text-gray-500 uppercase mb-1">分类数</div><div class="text-2xl font-bold text-white light:text-gray-900">${ssrInterpolate(unref(totalCategories))}</div></div><div class="p-5 bg-[#1a1625] dark:bg-[#1a1625] light:bg-white rounded-xl border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200"><div class="text-xs text-text-muted light:text-gray-500 uppercase mb-1">标签数</div><div class="text-2xl font-bold text-white light:text-gray-900">${ssrInterpolate(unref(totalTags))}</div></div></div><div class="grid grid-cols-1 xl:grid-cols-3 gap-6"><div class="xl:col-span-2 p-6 bg-[#1a1625] dark:bg-[#1a1625] light:bg-white rounded-xl border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200"><div class="flex items-center justify-between mb-4"><h2 class="text-lg font-semibold text-white light:text-gray-900">最近文章</h2>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/posts",
        class: "text-sm text-accent-purple hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`查看全部`);
          } else {
            return [
              createTextVNode("查看全部")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (!unref(latestPosts).length) {
        _push(`<div class="text-sm text-text-muted light:text-gray-500 py-8 text-center"> 暂无文章，去 `);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/admin/new-post",
          class: "text-accent-purple hover:underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`新建文章`);
            } else {
              return [
                createTextVNode("新建文章")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="space-y-3"><!--[-->`);
        ssrRenderList(unref(latestPosts), (post) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: post.id,
            to: `/admin/posts/${post.id}`,
            class: "block p-4 rounded-lg border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 hover:border-accent-purple/40 transition-colors"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="flex items-start justify-between gap-4"${_scopeId}><div class="min-w-0"${_scopeId}><p class="text-white light:text-gray-900 font-medium truncate"${_scopeId}>${ssrInterpolate(post.title)}</p><p class="text-xs text-text-muted light:text-gray-500 mt-1"${_scopeId}>/${ssrInterpolate(post.slug)}</p></div><span class="${ssrRenderClass([post.status === "published" ? "text-green-500" : "text-yellow-600", "text-xs"])}"${_scopeId}>${ssrInterpolate(post.status === "published" ? "已发布" : "草稿")}</span></div>`);
              } else {
                return [
                  createVNode("div", { class: "flex items-start justify-between gap-4" }, [
                    createVNode("div", { class: "min-w-0" }, [
                      createVNode("p", { class: "text-white light:text-gray-900 font-medium truncate" }, toDisplayString(post.title), 1),
                      createVNode("p", { class: "text-xs text-text-muted light:text-gray-500 mt-1" }, "/" + toDisplayString(post.slug), 1)
                    ]),
                    createVNode("span", {
                      class: ["text-xs", post.status === "published" ? "text-green-500" : "text-yellow-600"]
                    }, toDisplayString(post.status === "published" ? "已发布" : "草稿"), 3)
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div><div class="p-6 bg-[#1a1625] dark:bg-[#1a1625] light:bg-white rounded-xl border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200"><h2 class="text-lg font-semibold text-white light:text-gray-900 mb-4">系统状态</h2><div class="space-y-3 text-sm"><div class="flex items-center justify-between"><span class="text-text-secondary light:text-gray-600">数据库连接</span><span class="${ssrRenderClass(unref(dbStatus)?.ok ? "text-green-500" : "text-red-500")}">${ssrInterpolate(unref(dbStatus)?.ok ? "正常" : "异常")}</span></div><div class="flex items-center justify-between"><span class="text-text-secondary light:text-gray-600">数据库类型</span><span class="text-white light:text-gray-900">${ssrInterpolate(unref(dbStatus)?.dialect || "-")}</span></div><div class="text-xs text-text-muted light:text-gray-500 break-all">${ssrInterpolate(unref(dbStatus)?.target || "-")}</div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DOlYKkz-.mjs.map
