import { defineComponent, ref, withAsyncContext, computed, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as useFetch } from './fetch-CHkX7ai1.mjs';
import '../nitro/nitro.mjs';
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
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 class="text-2xl font-bold mb-6">分类管理</h1><div class="bg-white rounded-lg shadow p-6 mb-6"><div class="flex gap-4"><input${ssrRenderAttr("value", unref(name))} placeholder="分类名称" class="flex-1 border rounded px-3 py-2"><input${ssrRenderAttr("value", unref(slug))} placeholder="Slug (可选)" class="w-40 border rounded px-3 py-2"><button class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"> 添加 </button></div></div><div class="bg-white rounded-lg shadow"><table class="min-w-full"><thead class="bg-gray-50"><tr><th class="px-6 py-3 text-left">名称</th><th class="px-6 py-3 text-left">Slug</th><th class="px-6 py-3 text-right">操作</th></tr></thead><tbody class="divide-y"><!--[-->`);
      ssrRenderList(unref(categoryList), (cat) => {
        _push(`<tr><td class="px-6 py-4">${ssrInterpolate(cat.name)}</td><td class="px-6 py-4 text-gray-500">${ssrInterpolate(cat.slug)}</td><td class="px-6 py-4 text-right"><button class="text-red-500 hover:text-red-700">删除</button></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div>`);
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
//# sourceMappingURL=categories-Dv99rQZL.mjs.map
