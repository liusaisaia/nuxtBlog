import { _ as __nuxt_component_0 } from './nuxt-link-7eIXoFIv.mjs';
import { defineComponent, ref, withAsyncContext, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from 'vue/server-renderer';
import { b as useRoute, a as useRouter } from './server.mjs';
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
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    useRouter();
    const isNew = route.params.id === "new";
    const title = ref("");
    const content = ref("");
    const slug = ref("");
    const description = ref("");
    const published = ref(false);
    const categoryId = ref(null);
    ref(false);
    const saving = ref(false);
    const { data: categories } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/admin/categories",
      "$vrOkcmz3uE"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex justify-between items-center mb-6"><h1 class="text-2xl font-bold">${ssrInterpolate(isNew ? "新建文章" : "编辑文章")}</h1>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/posts",
        class: "text-gray-500 hover:text-gray-700"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 返回列表 `);
          } else {
            return [
              createTextVNode(" 返回列表 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="bg-white rounded-lg shadow p-6"><div class="space-y-4"><div><label class="block text-sm font-medium mb-1">标题</label><input${ssrRenderAttr("value", unref(title))} type="text" class="w-full border rounded px-3 py-2" placeholder="文章标题"></div><div><label class="block text-sm font-medium mb-1">Slug</label><input${ssrRenderAttr("value", unref(slug))} type="text" class="w-full border rounded px-3 py-2" placeholder="url-slug"></div><div><label class="block text-sm font-medium mb-1">描述</label><textarea class="w-full border rounded px-3 py-2" rows="2" placeholder="文章描述">${ssrInterpolate(unref(description))}</textarea></div><div><label class="block text-sm font-medium mb-1">分类</label><select class="w-full border rounded px-3 py-2"><option${ssrRenderAttr("value", null)}${ssrIncludeBooleanAttr(Array.isArray(unref(categoryId)) ? ssrLooseContain(unref(categoryId), null) : ssrLooseEqual(unref(categoryId), null)) ? " selected" : ""}>选择分类</option><!--[-->`);
      ssrRenderList(unref(categories), (cat) => {
        _push(`<option${ssrRenderAttr("value", cat.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(categoryId)) ? ssrLooseContain(unref(categoryId), cat.id) : ssrLooseEqual(unref(categoryId), cat.id)) ? " selected" : ""}>${ssrInterpolate(cat.name)}</option>`);
      });
      _push(`<!--]--></select></div><div><label class="block text-sm font-medium mb-1">内容 (Markdown)</label><textarea class="w-full border rounded px-3 py-2 font-mono" rows="20" placeholder="文章内容">${ssrInterpolate(unref(content))}</textarea></div><div class="flex items-center"><input${ssrIncludeBooleanAttr(Array.isArray(unref(published)) ? ssrLooseContain(unref(published), null) : unref(published)) ? " checked" : ""} type="checkbox" id="published" class="mr-2"><label for="published">发布</label></div><div class="flex justify-end"><button${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""} class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50">${ssrInterpolate(unref(saving) ? "保存中..." : "保存")}</button></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/posts/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-BkjQ3cpg.mjs.map
