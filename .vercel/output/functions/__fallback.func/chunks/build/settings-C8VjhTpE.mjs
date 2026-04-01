import { defineComponent, withAsyncContext, ref, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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
  __name: "settings",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: settings, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/admin/settings",
      "$AT2bFy2VMk"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const siteName = ref("");
    const siteDescription = ref("");
    const saving = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="mb-6"><div class="text-xs text-text-muted light:text-gray-500 uppercase tracking-wider mb-2">系统配置</div><h1 class="text-3xl font-bold text-white light:text-gray-900">站点设置</h1></div><div class="bg-[#1a1625] dark:bg-[#1a1625] light:bg-white rounded-xl border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 p-6"><div class="space-y-4 max-w-xl"><div><label class="block text-sm font-medium mb-1 text-white light:text-gray-900">站点名称</label><input${ssrRenderAttr("value", unref(siteName))} type="text" class="w-full px-3 py-2 rounded-lg bg-[#0f0c16] dark:bg-[#0f0c16] light:bg-white border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 text-white light:text-gray-900"></div><div><label class="block text-sm font-medium mb-1 text-white light:text-gray-900">站点描述</label><textarea class="w-full px-3 py-2 rounded-lg bg-[#0f0c16] dark:bg-[#0f0c16] light:bg-white border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 text-white light:text-gray-900" rows="3">${ssrInterpolate(unref(siteDescription))}</textarea></div><div><button${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""} class="px-6 py-2 rounded-lg bg-accent-purple text-white hover:bg-accent-purple/90 disabled:opacity-50 transition-colors">${ssrInterpolate(unref(saving) ? "保存中..." : "保存")}</button></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/settings.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=settings-C8VjhTpE.mjs.map
