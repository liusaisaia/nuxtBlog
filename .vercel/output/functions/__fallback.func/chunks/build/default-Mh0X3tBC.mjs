import { _ as __nuxt_component_0$1 } from './nuxt-link-CsGu9mXO.mjs';
import { mergeProps, defineComponent, ref, computed, watch, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderClass, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc, b as useRoute } from './server.mjs';
import { u as useColorMode } from './composables-DdquGXk6.mjs';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AppHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const colorMode = useColorMode();
    const mobileOpen = ref(false);
    const scrolled = ref(false);
    const nav = [
      { label: "首页", to: "/" },
      { label: "文章", to: "/posts" },
      { label: "标签", to: "/tags" },
      { label: "关于", to: "/about" }
    ];
    const isDark = computed(() => colorMode.value === "dark");
    watch(
      () => route.path,
      () => {
        mobileOpen.value = false;
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<header${ssrRenderAttrs(mergeProps({
        class: ["fixed inset-x-0 top-0 z-50 transition-all duration-300", unref(scrolled) ? "py-2" : "py-3"]
      }, _attrs))}><div class="${ssrRenderClass([unref(scrolled) ? "surface-strong" : "bg-transparent border border-transparent", "container-page rounded-2xl"])}"><div class="h-14 flex items-center justify-between px-3 md:px-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex items-center gap-3"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="h-7 w-7 rounded-md brand-chip flex items-center justify-center text-xs font-black"${_scopeId}>V</span><span class="font-semibold tracking-tight text-base md:text-lg"${_scopeId}>Void Notes</span>`);
          } else {
            return [
              createVNode("span", { class: "h-7 w-7 rounded-md brand-chip flex items-center justify-center text-xs font-black" }, "V"),
              createVNode("span", { class: "font-semibold tracking-tight text-base md:text-lg" }, "Void Notes")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav class="hidden md:flex items-center gap-1"><!--[-->`);
      ssrRenderList(nav, (item) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: item.to,
          to: item.to,
          class: ["px-3 py-2 text-sm rounded-lg transition-colors", unref(route).path === item.to ? "brand-chip font-medium" : "text-soft hover:text-[var(--text)] hover:bg-[var(--brand-soft)]"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(item.label)}`);
            } else {
              return [
                createTextVNode(toDisplayString(item.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></nav><div class="flex items-center gap-2 md:gap-3"><button class="w-9 h-9 rounded-lg border border-soft text-soft hover:text-[var(--text)] hover:bg-[var(--brand-soft)] transition-colors" aria-label="切换主题">`);
      if (unref(isDark)) {
        _push(`<svg class="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 3v1m0 16v1m9-9h-1M4 12H3m14.95 6.95l-.707-.707M6.757 6.757l-.707-.707m12.02 0l-.707.707M6.757 17.243l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`);
      } else {
        _push(`<svg class="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M20.354 15.354A9 9 0 018.646 3.646 9 9 0 1012 21a9 9 0 008.354-5.646z"></path></svg>`);
      }
      _push(`</button><a href="https://github.com/saisaia" target="_blank" rel="noreferrer" class="hidden sm:inline-flex px-3 py-2 rounded-lg border border-soft text-sm text-soft hover:text-[var(--text)] hover:border-strong transition-colors"> GitHub </a><button class="md:hidden w-9 h-9 rounded-lg border border-soft text-soft" aria-label="打开菜单"><svg class="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 6h16M4 12h16M4 18h16"></path></svg></button></div></div>`);
      if (unref(mobileOpen)) {
        _push(`<div class="md:hidden px-3 pb-3 motion-fade"><nav class="surface rounded-xl p-2 flex flex-col gap-1"><!--[-->`);
        ssrRenderList(nav, (item) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: item.to,
            to: item.to,
            class: ["px-3 py-2 rounded-lg text-sm", unref(route).path === item.to ? "brand-chip font-medium" : "text-soft"],
            onClick: ($event) => mobileOpen.value = false
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(item.label)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(item.label), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></nav></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></header>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppHeader.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$2, { __name: "AppHeader" });
const _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<footer${ssrRenderAttrs(mergeProps({ class: "mt-16 border-t border-soft" }, _attrs))}><div class="container-page py-10"><div class="surface rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6"><div class="space-y-2"><p class="text-xs uppercase tracking-[0.2em] text-mute">Tech Reading Journal</p><h2 class="text-2xl md:text-3xl font-semibold tracking-tight">保持对技术演进的长期感知</h2><p class="text-soft max-w-xl text-sm md:text-base"> 每篇文章都聚焦真实工程决策、实现细节和权衡过程，避免概念堆叠。 </p></div><div class="text-sm text-mute"> © 2026 Void Notes </div></div></div></footer>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppFooter.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]), { __name: "AppFooter" });
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_AppHeader = __nuxt_component_0;
  const _component_AppFooter = __nuxt_component_1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex flex-col text-[var(--text)]" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
  _push(`<main class="flex-1 pt-20">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</main>`);
  _push(ssrRenderComponent(_component_AppFooter, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _default as default };
//# sourceMappingURL=default-Mh0X3tBC.mjs.map
