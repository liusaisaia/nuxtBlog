import { _ as __nuxt_component_0 } from './nuxt-link-7eIXoFIv.mjs';
import { defineComponent, withAsyncContext, withCtx, createTextVNode, unref, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { a as useRouter } from './server.mjs';
import { u as useFetch } from './fetch-B7Y0_04n.mjs';
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
import 'pinia';
import 'vue-router';
import 'unhead/utils';
import '@vue/shared';
import './asyncData-14sGL0-c.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useRouter();
    const { data: posts, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/admin/posts",
      "$sdmAXgrsJg"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex justify-between items-center mb-6 mt-20"><h1 class="text-2xl font-bold">文章管理</h1>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/posts/new",
        class: "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 新建文章 `);
          } else {
            return [
              createTextVNode(" 新建文章 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="bg-white rounded-lg shadow overflow-hidden"><table class="min-w-full"><thead class="bg-gray-50"><tr><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">标题</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">创建时间</th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">操作</th></tr></thead><tbody class="divide-y divide-gray-200"><!--[-->`);
      ssrRenderList(unref(posts), (post) => {
        _push(`<tr class="hover:bg-gray-50"><td class="px-6 py-4">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/admin/posts/${post.id}`,
          class: "text-blue-500 hover:text-blue-700"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(post.title)}`);
            } else {
              return [
                createTextVNode(toDisplayString(post.title), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</td><td class="px-6 py-4"><span class="${ssrRenderClass([post.published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800", "px-2 py-1 rounded text-xs"])}">${ssrInterpolate(post.published ? "已发布" : "草稿")}</span></td><td class="px-6 py-4 text-gray-500">${ssrInterpolate(new Date(post.createdAt).toLocaleDateString("zh-CN"))}</td><td class="px-6 py-4 text-right">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/admin/posts/${post.id}`,
          class: "text-blue-500 hover:text-blue-700 mr-4"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` 编辑 `);
            } else {
              return [
                createTextVNode(" 编辑 ")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<button class="text-red-500 hover:text-red-700"> 删除 </button></td></tr>`);
      });
      _push(`<!--]-->`);
      if (!unref(posts)?.length) {
        _push(`<tr><td colspan="4" class="px-6 py-8 text-center text-gray-500"> 暂无文章，`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/admin/posts/new",
          class: "text-blue-500"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`创建第一篇`);
            } else {
              return [
                createTextVNode("创建第一篇")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</td></tr>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/posts/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CAfUGFaB.mjs.map
