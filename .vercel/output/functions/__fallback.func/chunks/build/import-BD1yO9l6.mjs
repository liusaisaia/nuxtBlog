import { _ as __nuxt_component_0 } from './nuxt-link-CNNFjuF7.mjs';
import { defineComponent, ref, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderClass, ssrRenderComponent } from 'vue/server-renderer';
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
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="mb-6"><div class="text-xs text-text-muted light:text-gray-500 uppercase tracking-wider mb-2">导入中心</div><h1 class="text-2xl font-bold text-white light:text-gray-900">导入文档</h1><p class="text-text-secondary light:text-gray-600 mt-1">支持 Markdown / JSON 导入文章或笔记</p></div><div class="bg-[#15121a] dark:bg-[#15121a] light:bg-white rounded-xl border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 p-6 shadow-card"><div class="mb-4"><label class="block text-sm font-medium text-white light:text-gray-800 mb-2"> 选择导入文件 </label><input type="file" accept=".md,.markdown,.json" class="block w-full text-sm text-text-muted light:text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border file:border-[#2a2435] dark:file:border-[#2a2435] light:file:border-gray-200 file:text-sm file:font-semibold file:bg-accent-purple/15 file:text-accent-purple hover:file:bg-accent-purple/25"></div><p class="text-sm text-text-secondary light:text-gray-600 mb-5 leading-relaxed"> 支持语雀导出的 Markdown 文件<br> 支持 JSON / frontmatter 字段：title, tags, category, excerpt, cover </p><button${ssrIncludeBooleanAttr(unref(uploading) || !unref(file)) ? " disabled" : ""} class="px-5 py-2.5 bg-accent-purple text-white rounded-lg hover:bg-accent-purple/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all inline-flex items-center gap-2 hover:shadow-lg hover:shadow-accent-purple/25">`);
      if (unref(uploading)) {
        _push(`<svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-30" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(unref(uploading) ? "导入中..." : "开始导入")}</button>`);
      if (unref(message)) {
        _push(`<div class="${ssrRenderClass([
          "mt-4 p-3 rounded-lg border text-sm",
          unref(messageType) === "success" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300 light:bg-emerald-50 light:text-emerald-700 light:border-emerald-200" : "bg-rose-500/10 border-rose-500/30 text-rose-300 light:bg-rose-50 light:text-rose-700 light:border-rose-200"
        ])}">${ssrInterpolate(unref(message))}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(importedPost)) {
        _push(`<div class="mt-4 p-4 bg-accent-purple/10 border border-accent-purple/25 rounded-lg"><p class="font-medium text-white light:text-gray-900">导入完成：</p><p class="text-lg font-semibold mt-1 text-white light:text-gray-900">${ssrInterpolate(unref(importedPost).title)}</p><p class="text-sm text-text-secondary light:text-gray-600 mt-1">路径标识: ${ssrInterpolate(unref(importedPost).slug)}</p><p class="text-sm text-text-secondary light:text-gray-600 mt-1">状态: ${ssrInterpolate(unref(importedPost).status)}</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/admin/posts/${unref(importedPost).id}`,
          class: "inline-flex mt-3 text-accent-purple hover:opacity-80 font-medium"
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
//# sourceMappingURL=import-BD1yO9l6.mjs.map
