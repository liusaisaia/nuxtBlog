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
  __name: "categories",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const name = ref("");
    const slug = ref("");
    const { data: categories, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/admin/categories",
      "$uVkx-wJ30h"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const categoryList = computed(() => categories.value?.list || []);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="mb-6"><div class="text-xs text-text-muted light:text-gray-500 uppercase tracking-wider mb-2">内容组织</div><h1 class="text-3xl font-bold text-white light:text-gray-900">分类管理</h1></div><div class="bg-[#1a1625] dark:bg-[#1a1625] light:bg-white rounded-xl border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 p-6 mb-6"><div class="flex flex-col md:flex-row gap-3"><input${ssrRenderAttr("value", unref(name))} placeholder="分类名称" class="flex-1 px-3 py-2 rounded-lg bg-[#0f0c16] dark:bg-[#0f0c16] light:bg-white border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 text-white light:text-gray-900"><input${ssrRenderAttr("value", unref(slug))} placeholder="路径标识（可选）" class="md:w-52 px-3 py-2 rounded-lg bg-[#0f0c16] dark:bg-[#0f0c16] light:bg-white border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 text-white light:text-gray-900"><button class="px-5 py-2 rounded-lg bg-accent-purple text-white hover:bg-accent-purple/90 transition-colors"> 新增分类 </button></div></div><div class="bg-[#1a1625] dark:bg-[#1a1625] light:bg-white rounded-xl border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 overflow-hidden"><table class="min-w-full"><thead class="bg-[#15121a] dark:bg-[#15121a] light:bg-gray-50"><tr><th class="px-6 py-3 text-left text-xs text-text-muted light:text-gray-500 uppercase">名称</th><th class="px-6 py-3 text-left text-xs text-text-muted light:text-gray-500 uppercase">路径标识</th><th class="px-6 py-3 text-right text-xs text-text-muted light:text-gray-500 uppercase">操作</th></tr></thead><tbody class="divide-y divide-[#2a2435]/50 dark:divide-[#2a2435]/50 light:divide-gray-100"><!--[-->`);
      ssrRenderList(unref(categoryList), (cat) => {
        _push(`<tr class="hover:bg-accent-purple/5 transition-colors"><td class="px-6 py-4 text-white light:text-gray-900">${ssrInterpolate(cat.name)}</td><td class="px-6 py-4 text-text-secondary light:text-gray-600">${ssrInterpolate(cat.slug)}</td><td class="px-6 py-4 text-right"><button class="text-rose-400 hover:text-rose-300 light:text-rose-600 light:hover:text-rose-700">删除</button></td></tr>`);
      });
      _push(`<!--]-->`);
      if (!unref(categoryList).length) {
        _push(`<tr><td colspan="3" class="px-6 py-10 text-center text-text-muted light:text-gray-500">暂无分类，请先新增。</td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</tbody></table></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/categories.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=categories-Bg3ldaNs.mjs.map
