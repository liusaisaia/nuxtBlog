import { defineComponent, ref, withAsyncContext, computed, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
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
import '@vue/shared';
import './server.mjs';
import 'pinia';
import 'vue-router';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import './asyncData-D5CYTES7.mjs';
import 'perfect-debounce';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tags",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const name = ref("");
    const { data: tags, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/admin/tags",
      "$oplbb_cLoc"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const tagList = computed(() => tags.value?.list || []);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="mb-6"><div class="text-xs text-text-muted light:text-gray-500 uppercase tracking-wider mb-2">内容组织</div><h1 class="text-3xl font-bold text-white light:text-gray-900">标签管理</h1></div><div class="bg-[#1a1625] dark:bg-[#1a1625] light:bg-white rounded-xl border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 p-6 mb-6"><div class="flex flex-col md:flex-row gap-3"><input${ssrRenderAttr("value", unref(name))} placeholder="标签名称" class="flex-1 px-3 py-2 rounded-lg bg-[#0f0c16] dark:bg-[#0f0c16] light:bg-white border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 text-white light:text-gray-900"><button class="px-5 py-2 rounded-lg bg-accent-purple text-white hover:bg-accent-purple/90 transition-colors"> 新增标签 </button></div></div><div class="bg-[#1a1625] dark:bg-[#1a1625] light:bg-white rounded-xl border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 p-6"><div class="flex flex-wrap gap-2"><!--[-->`);
      ssrRenderList(unref(tagList), (tag) => {
        _push(`<span class="bg-[#2a2435] dark:bg-[#2a2435] light:bg-gray-100 text-white light:text-gray-800 px-3 py-1 rounded-full flex items-center gap-2">${ssrInterpolate(tag.name)} <button class="text-rose-400 hover:text-rose-300 light:text-rose-600 light:hover:text-rose-700">×</button></span>`);
      });
      _push(`<!--]-->`);
      if (!unref(tagList).length) {
        _push(`<span class="text-text-muted light:text-gray-500">暂无标签，请先新增。</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/tags.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=tags-D47tqwU_.mjs.map
