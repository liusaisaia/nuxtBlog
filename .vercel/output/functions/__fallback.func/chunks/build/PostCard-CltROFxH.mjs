import { _ as __nuxt_component_0$1 } from './nuxt-link-CsGu9mXO.mjs';
import { defineComponent, computed, mergeProps, withCtx, unref, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PostCard",
  __ssrInlineRender: true,
  props: {
    post: {}
  },
  setup(__props) {
    const props = __props;
    const readingLabel = computed(() => props.post.readingTime || "6 分钟阅读");
    function formatDate(date) {
      if (!date) return "未标注日期";
      return new Date(date).toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC"
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        to: __props.post.path,
        class: "surface rounded-2xl p-5 md:p-6 h-full group transition-all duration-300 hover:-translate-y-1 hover:border-strong"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between gap-3 mb-4 text-xs"${_scopeId}><div class="flex items-center gap-2 flex-wrap"${_scopeId}><!--[-->`);
            ssrRenderList(__props.post.tags?.slice(0, 2), (tag) => {
              _push2(`<span class="brand-chip rounded-full px-2.5 py-1"${_scopeId}>${ssrInterpolate(tag)}</span>`);
            });
            _push2(`<!--]--></div><span class="text-mute whitespace-nowrap"${_scopeId}>${ssrInterpolate(unref(readingLabel))}</span></div><h3 class="text-xl font-semibold tracking-tight mb-2 leading-snug group-hover:text-[var(--brand)] transition-colors"${_scopeId}>${ssrInterpolate(__props.post.title)}</h3><p class="text-soft text-sm leading-relaxed mb-6 line-clamp-3"${_scopeId}>${ssrInterpolate(__props.post.description || "这篇文章没有摘要，请点击进入阅读全文。")}</p><div class="flex items-center justify-between text-sm text-mute border-t border-soft pt-4"${_scopeId}><span${_scopeId}>${ssrInterpolate(formatDate(__props.post.date))}</span><span class="inline-flex items-center gap-1.5 text-[var(--brand)]"${_scopeId}> 阅读全文 <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 5l7 7-7 7"${_scopeId}></path></svg></span></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between gap-3 mb-4 text-xs" }, [
                createVNode("div", { class: "flex items-center gap-2 flex-wrap" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.post.tags?.slice(0, 2), (tag) => {
                    return openBlock(), createBlock("span", {
                      key: tag,
                      class: "brand-chip rounded-full px-2.5 py-1"
                    }, toDisplayString(tag), 1);
                  }), 128))
                ]),
                createVNode("span", { class: "text-mute whitespace-nowrap" }, toDisplayString(unref(readingLabel)), 1)
              ]),
              createVNode("h3", { class: "text-xl font-semibold tracking-tight mb-2 leading-snug group-hover:text-[var(--brand)] transition-colors" }, toDisplayString(__props.post.title), 1),
              createVNode("p", { class: "text-soft text-sm leading-relaxed mb-6 line-clamp-3" }, toDisplayString(__props.post.description || "这篇文章没有摘要，请点击进入阅读全文。"), 1),
              createVNode("div", { class: "flex items-center justify-between text-sm text-mute border-t border-soft pt-4" }, [
                createVNode("span", null, toDisplayString(formatDate(__props.post.date)), 1),
                createVNode("span", { class: "inline-flex items-center gap-1.5 text-[var(--brand)]" }, [
                  createTextVNode(" 阅读全文 "),
                  (openBlock(), createBlock("svg", {
                    class: "w-4 h-4 transition-transform group-hover:translate-x-1",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "1.8",
                      d: "M9 5l7 7-7 7"
                    })
                  ]))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PostCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main, { __name: "PostCard" });

export { __nuxt_component_0 as _ };
//# sourceMappingURL=PostCard-CltROFxH.mjs.map
