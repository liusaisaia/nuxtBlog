import { _ as __nuxt_component_0 } from './nuxt-link-CNNFjuF7.mjs';
import { withAsyncContext, computed, mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useAsyncData } from './asyncData-D5CYTES7.mjs';
import { q as queryCollection } from './client-BfRTNG13.mjs';
import { u as useHead } from './server.mjs';
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

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: posts } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("all-posts-tags", () => queryCollection("content").all())), __temp = await __temp, __restore(), __temp);
    const tags = computed(() => {
      const map = {};
      posts.value?.forEach((p) => {
        p.tags?.forEach((t) => {
          map[t] = (map[t] || 0) + 1;
        });
      });
      return Object.entries(map).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
    });
    useHead({
      title: "话题标签 - SAISAI(0)",
      meta: [
        { name: "description", content: "浏览所有文章标签。" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "pt-32 pb-20" }, _attrs))}><div class="max-w-page mx-auto px-8"><div class="text-center mb-16"><h1 class="text-4xl sm:text-5xl font-bold mb-4 text-white">热门话题</h1><p class="text-text-secondary max-w-2xl mx-auto"> 按分类和标签浏览文章 </p></div><div class="flex flex-wrap justify-center gap-4"><!--[-->`);
      ssrRenderList(unref(tags), (tag) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: tag.name,
          to: `/posts?tag=${tag.name}`,
          class: "group px-6 py-4 rounded-xl bg-background-secondary border border-border hover:border-accent-purple transition-all flex items-center gap-3"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="text-lg font-medium text-white group-hover:text-accent-purple transition-colors"${_scopeId}>${ssrInterpolate(tag.name)}</span><span class="px-2 py-0.5 rounded-full bg-accent-purple/20 text-accent-purple text-xs font-mono"${_scopeId}>${ssrInterpolate(tag.count)}</span>`);
            } else {
              return [
                createVNode("span", { class: "text-lg font-medium text-white group-hover:text-accent-purple transition-colors" }, toDisplayString(tag.name), 1),
                createVNode("span", { class: "px-2 py-0.5 rounded-full bg-accent-purple/20 text-accent-purple text-xs font-mono" }, toDisplayString(tag.count), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tags/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Cn-BVueo.mjs.map
