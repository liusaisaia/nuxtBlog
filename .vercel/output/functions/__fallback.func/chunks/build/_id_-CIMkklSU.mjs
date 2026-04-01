import { _ as __nuxt_component_0 } from './nuxt-link-CNNFjuF7.mjs';
import { defineComponent, computed, ref, withAsyncContext, watch, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from 'vue/server-renderer';
import { c as useRoute, a as useRouter } from './server.mjs';
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
import 'pinia';
import 'vue-router';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import '@vue/shared';
import './asyncData-D5CYTES7.mjs';
import 'perfect-debounce';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    useRouter();
    const isNew = computed(() => route.params.id === "new");
    const title = ref("");
    const content = ref("");
    const slug = ref("");
    const description = ref("");
    const coverImage = ref("");
    const published = ref(false);
    const categoryId = ref(null);
    const saving = ref(false);
    const uploadingCover = ref(false);
    const { data: categories } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/admin/categories",
      "$vrOkcmz3uE"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const categoryList = computed(() => categories.value?.list || []);
    async function loadPostDetail() {
      if (isNew.value) return;
      const data = await $fetch(`/api/admin/posts/${route.params.id}`);
      title.value = data.title;
      content.value = data.content || "";
      slug.value = data.slug || "";
      description.value = data.excerpt || "";
      coverImage.value = data.coverImage || "";
      published.value = data.status === "published";
      categoryId.value = data.categoryId;
    }
    watch(
      () => route.params.id,
      async () => {
        await loadPostDetail();
      },
      { immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex justify-between items-center mb-6"><h1 class="text-3xl font-bold text-white light:text-gray-900">${ssrInterpolate(unref(isNew) ? "新建文章" : "编辑文章")}</h1>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/posts",
        class: "text-text-secondary light:text-gray-600 hover:text-accent-purple"
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
      _push(`</div><div class="bg-[#1a1625] dark:bg-[#1a1625] light:bg-white rounded-xl border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 p-6"><div class="space-y-4"><div><label class="block text-sm font-medium mb-1 text-white light:text-gray-900">标题</label><input${ssrRenderAttr("value", unref(title))} type="text" class="w-full px-3 py-2 rounded-lg bg-[#0f0c16] dark:bg-[#0f0c16] light:bg-white border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 text-white light:text-gray-900" placeholder="文章标题"></div><div><label class="block text-sm font-medium mb-1 text-white light:text-gray-900">路径标识（Slug）</label><input${ssrRenderAttr("value", unref(slug))} type="text" class="w-full px-3 py-2 rounded-lg bg-[#0f0c16] dark:bg-[#0f0c16] light:bg-white border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 text-white light:text-gray-900" placeholder="url-slug"></div><div><label class="block text-sm font-medium mb-1 text-white light:text-gray-900">描述</label><textarea class="w-full px-3 py-2 rounded-lg bg-[#0f0c16] dark:bg-[#0f0c16] light:bg-white border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 text-white light:text-gray-900" rows="2" placeholder="文章描述">${ssrInterpolate(unref(description))}</textarea></div><div><label class="block text-sm font-medium mb-1 text-white light:text-gray-900">封面图</label><div class="space-y-3"><input${ssrRenderAttr("value", unref(coverImage))} type="text" class="w-full px-3 py-2 rounded-lg bg-[#0f0c16] dark:bg-[#0f0c16] light:bg-white border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 text-white light:text-gray-900" placeholder="封面图 URL（可粘贴或上传）"><div class="flex items-center gap-3"><label class="inline-flex items-center px-3 py-2 border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 rounded cursor-pointer hover:bg-accent-purple/10 text-sm text-text-secondary light:text-gray-700"><input type="file" accept="image/jpeg,image/png,image/webp,image/gif" class="hidden"> ${ssrInterpolate(unref(uploadingCover) ? "上传中..." : "上传图片")}</label><span class="text-xs text-text-muted light:text-gray-500">支持 JPG / PNG / WebP / GIF，最大 5MB</span></div>`);
      if (unref(coverImage)) {
        _push(`<img${ssrRenderAttr("src", unref(coverImage))} alt="封面预览" class="w-full max-w-md h-40 object-cover rounded border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200">`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div><label class="block text-sm font-medium mb-1 text-white light:text-gray-900">分类</label><select class="w-full px-3 py-2 rounded-lg bg-[#0f0c16] dark:bg-[#0f0c16] light:bg-white border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 text-white light:text-gray-900"><option${ssrRenderAttr("value", null)}${ssrIncludeBooleanAttr(Array.isArray(unref(categoryId)) ? ssrLooseContain(unref(categoryId), null) : ssrLooseEqual(unref(categoryId), null)) ? " selected" : ""}>选择分类</option><!--[-->`);
      ssrRenderList(unref(categoryList), (cat) => {
        _push(`<option${ssrRenderAttr("value", cat.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(categoryId)) ? ssrLooseContain(unref(categoryId), cat.id) : ssrLooseEqual(unref(categoryId), cat.id)) ? " selected" : ""}>${ssrInterpolate(cat.name)}</option>`);
      });
      _push(`<!--]--></select></div><div><label class="block text-sm font-medium mb-1 text-white light:text-gray-900">内容（Markdown）</label><textarea class="w-full px-3 py-2 rounded-lg bg-[#0f0c16] dark:bg-[#0f0c16] light:bg-white border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 text-white light:text-gray-900 font-mono" rows="20" placeholder="文章内容">${ssrInterpolate(unref(content))}</textarea></div><div class="flex items-center text-text-secondary light:text-gray-700"><input${ssrIncludeBooleanAttr(Array.isArray(unref(published)) ? ssrLooseContain(unref(published), null) : unref(published)) ? " checked" : ""} type="checkbox" id="published" class="mr-2"><label for="published">发布</label></div><div class="flex justify-end"><button${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""} class="bg-accent-purple text-white px-6 py-2 rounded-lg hover:bg-accent-purple/90 disabled:opacity-50 transition-colors">${ssrInterpolate(unref(saving) ? "保存中..." : "保存")}</button></div></div></div></div>`);
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
//# sourceMappingURL=_id_-CIMkklSU.mjs.map
