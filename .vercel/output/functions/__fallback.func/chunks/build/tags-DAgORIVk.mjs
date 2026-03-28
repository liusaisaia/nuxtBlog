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
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 class="text-2xl font-bold mb-6">标签管理</h1><div class="bg-white rounded-lg shadow p-6 mb-6"><div class="flex gap-4"><input${ssrRenderAttr("value", unref(name))} placeholder="标签名称" class="flex-1 border rounded px-3 py-2"><button class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"> 添加 </button></div></div><div class="bg-white rounded-lg shadow p-6"><div class="flex flex-wrap gap-2"><!--[-->`);
      ssrRenderList(unref(tagList), (tag) => {
        _push(`<span class="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2">${ssrInterpolate(tag.name)} <button class="text-red-500 hover:text-red-700">×</button></span>`);
      });
      _push(`<!--]-->`);
      if (!unref(tagList).length) {
        _push(`<span class="text-gray-500">暂无标签</span>`);
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
//# sourceMappingURL=tags-DAgORIVk.mjs.map
