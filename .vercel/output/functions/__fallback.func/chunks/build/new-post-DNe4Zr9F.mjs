import { _ as __nuxt_component_0 } from './nuxt-link-CNNFjuF7.mjs';
import { defineComponent, ref, reactive, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { a as useRouter } from './server.mjs';
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
import 'pinia';
import 'vue-router';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "new-post",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const submitting = ref(false);
    const form = reactive({
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      status: "draft"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-4xl" }, _attrs))}><div class="flex items-center justify-between mb-6"><h1 class="text-2xl font-bold text-white light:text-gray-900">新建文章</h1>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/posts",
        class: "text-sm text-accent-purple hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`返回列表`);
          } else {
            return [
              createTextVNode("返回列表")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="bg-[#15121a] dark:bg-[#15121a] light:bg-white rounded-xl border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 p-6 space-y-4"><div><label class="block text-sm mb-2 text-text-secondary light:text-gray-700">标题</label><input${ssrRenderAttr("value", unref(form).title)} class="w-full px-3 py-2 rounded border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 bg-[#1a1625] dark:bg-[#1a1625] light:bg-white text-white light:text-gray-900" placeholder="请输入标题"></div><div><label class="block text-sm mb-2 text-text-secondary light:text-gray-700">路径标识（可选）</label><input${ssrRenderAttr("value", unref(form).slug)} class="w-full px-3 py-2 rounded border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 bg-[#1a1625] dark:bg-[#1a1625] light:bg-white text-white light:text-gray-900" placeholder="自动生成或手动填写"></div><div><label class="block text-sm mb-2 text-text-secondary light:text-gray-700">摘要</label><textarea rows="3" class="w-full px-3 py-2 rounded border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 bg-[#1a1625] dark:bg-[#1a1625] light:bg-white text-white light:text-gray-900" placeholder="可选">${ssrInterpolate(unref(form).excerpt)}</textarea></div><div><label class="block text-sm mb-2 text-text-secondary light:text-gray-700">正文</label><textarea rows="12" class="w-full px-3 py-2 rounded border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 bg-[#1a1625] dark:bg-[#1a1625] light:bg-white text-white light:text-gray-900 font-mono" placeholder="请输入文章内容">${ssrInterpolate(unref(form).content)}</textarea></div><div class="flex items-center gap-3"><button${ssrIncludeBooleanAttr(unref(submitting)) ? " disabled" : ""} class="px-4 py-2 rounded bg-accent-purple text-white hover:bg-accent-purple/90 disabled:opacity-50">${ssrInterpolate(unref(submitting) ? "创建中..." : "创建并编辑")}</button>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/posts",
        class: "px-4 py-2 rounded border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 text-text-secondary light:text-gray-700 hover:text-accent-purple"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 取消 `);
          } else {
            return [
              createTextVNode(" 取消 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/new-post.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=new-post-DNe4Zr9F.mjs.map
