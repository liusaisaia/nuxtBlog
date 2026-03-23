import { defineComponent, withAsyncContext, ref, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useFetch } from './fetch-B7Y0_04n.mjs';
import 'node:crypto';
import '@vue/shared';
import './server.mjs';
import '../nitro/nitro.mjs';
import 'jose';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'better-sqlite3';
import 'node:url';
import 'ipx';
import 'pinia';
import 'vue-router';
import 'unhead/utils';
import './asyncData-14sGL0-c.mjs';

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
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 class="text-2xl font-bold mb-6">站点设置</h1><div class="bg-white rounded-lg shadow p-6"><div class="space-y-4 max-w-xl"><div><label class="block text-sm font-medium mb-1">站点名称</label><input${ssrRenderAttr("value", unref(siteName))} type="text" class="w-full border rounded px-3 py-2"></div><div><label class="block text-sm font-medium mb-1">站点描述</label><textarea class="w-full border rounded px-3 py-2" rows="3">${ssrInterpolate(unref(siteDescription))}</textarea></div><div><button${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""} class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50">${ssrInterpolate(unref(saving) ? "保存中..." : "保存")}</button></div></div></div></div>`);
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
//# sourceMappingURL=settings-DSM3xZxu.mjs.map
