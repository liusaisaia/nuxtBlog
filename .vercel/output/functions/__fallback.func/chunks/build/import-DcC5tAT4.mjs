import { _ as __nuxt_component_0 } from './nuxt-link-7eIXoFIv.mjs';
import { defineComponent, ref, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderClass, ssrRenderComponent } from 'vue/server-renderer';
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
import './server.mjs';
import 'pinia';
import 'vue-router';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "import",
  __ssrInlineRender: true,
  setup(__props) {
    const file = ref(null);
    const uploading = ref(false);
    const message = ref("");
    const messageType = ref("success");
    const importedPost = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="mb-6"><h1 class="text-2xl font-bold">导入文档</h1><p class="text-gray-600 mt-1">从 Markdown 文件导入文章</p></div><div class="bg-white rounded-lg shadow p-6"><div class="mb-4"><label class="block text-sm font-medium text-gray-700 mb-2"> 选择 Markdown 文件 </label><input type="file" accept=".md,.markdown" class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"></div><p class="text-sm text-gray-500 mb-4"> 支持语雀导出的 Markdown 文件<br> 支持 frontmatter：title, tags, category, excerpt, cover </p><button${ssrIncludeBooleanAttr(unref(uploading) || !unref(file)) ? " disabled" : ""} class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">${ssrInterpolate(unref(uploading) ? "导入中..." : "导入")}</button>`);
      if (unref(message)) {
        _push(`<div class="${ssrRenderClass([
          "mt-4 p-3 rounded-md",
          unref(messageType) === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
        ])}">${ssrInterpolate(unref(message))}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(importedPost)) {
        _push(`<div class="mt-4 p-4 bg-blue-50 rounded-md"><p class="font-medium">导入的文章：</p><p class="text-lg font-semibold mt-1">${ssrInterpolate(unref(importedPost).title)}</p><p class="text-sm text-gray-600 mt-1">Slug: ${ssrInterpolate(unref(importedPost).slug)}</p><p class="text-sm text-gray-600 mt-1">状态: ${ssrInterpolate(unref(importedPost).status)}</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/admin/posts/${unref(importedPost).id}`,
          class: "inline-block mt-3 text-blue-600 hover:underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` 编辑文章 → `);
            } else {
              return [
                createTextVNode(" 编辑文章 → ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/import.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=import-DcC5tAT4.mjs.map
