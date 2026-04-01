import { _ as __nuxt_component_0 } from './nuxt-link-CNNFjuF7.mjs';
import { _ as __nuxt_component_0$1 } from './PostCard-DoTikjDI.mjs';
import { defineComponent, withAsyncContext, computed, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { BookText, Tags } from 'lucide-vue-next';
import { u as useAsyncData } from './asyncData-D5CYTES7.mjs';
import { q as queryCollection } from './client-BfRTNG13.mjs';
import { u as useHead } from './server.mjs';
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
import 'perfect-debounce';
import 'pinia';
import 'vue-router';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: posts } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "home-posts",
      () => queryCollection("content").order("date", "DESC").select("title", "description", "date", "tags", "path", "readingTime").all()
    )), __temp = await __temp, __restore(), __temp);
    const featuredPost = computed(() => posts.value?.[0] || null);
    const sidePosts = computed(() => posts.value?.slice(1, 4) || []);
    const gridPosts = computed(() => posts.value?.slice(4, 10) || []);
    const topTopics = computed(() => {
      const map = /* @__PURE__ */ new Map();
      for (const post of posts.value || []) {
        for (const tag of post.tags || []) {
          map.set(tag, (map.get(tag) || 0) + 1);
        }
      }
      return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name]) => name);
    });
    function formatDate(date) {
      if (!date) return "未标注日期";
      return new Date(date).toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC"
      });
    }
    useHead({
      title: "Void Notes - 技术博客",
      meta: [
        { name: "description", content: "面向技术博客读者的工程实践与架构深读。" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_PostCard = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container-page pb-16 md:pb-24" }, _attrs))}><section class="pt-8 md:pt-16 motion-fade"><div class="surface-strong rounded-3xl p-6 md:p-10 overflow-hidden relative"><div class="absolute -top-20 -right-14 w-60 h-60 rounded-full bg-[var(--brand-soft)] blur-3xl"></div><div class="absolute -bottom-24 -left-10 w-52 h-52 rounded-full bg-cyan-400/10 blur-3xl"></div><div class="relative reveal-stagger"><p class="text-xs tracking-[0.2em] uppercase text-mute">Tech Reading Editorial</p><h1 class="mt-3 text-4xl md:text-6xl font-semibold tracking-tight max-w-4xl leading-[1.05]"> 为技术博客读者构建 <span class="headline-typewriter headline-art" style="${ssrRenderStyle({ "--type-ch": "8", "--type-steps": "8" })}">沉浸式阅读界面</span></h1><p class="text-soft mt-5 max-w-2xl text-base md:text-lg leading-relaxed"> 聚焦架构、性能与工程实践。通过分层动效和更清晰的信息结构，让读者更快进入正文、更久停留在文章深处。 </p><div class="mt-8 flex flex-wrap gap-3">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/posts",
        class: "px-5 py-3 rounded-xl bg-[var(--brand)] text-white text-sm font-medium hover:opacity-90 transition-opacity inline-flex flex-row flex-nowrap items-center justify-center gap-2 whitespace-nowrap leading-none"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(BookText), {
              class: "w-4 h-4 shrink-0 block",
              "stroke-width": 2,
              "aria-hidden": "true"
            }, null, _parent2, _scopeId));
            _push2(`<span class="leading-none"${_scopeId}>浏览全部文章</span>`);
          } else {
            return [
              createVNode(unref(BookText), {
                class: "w-4 h-4 shrink-0 block",
                "stroke-width": 2,
                "aria-hidden": "true"
              }),
              createVNode("span", { class: "leading-none" }, "浏览全部文章")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/tags",
        class: "px-5 py-3 rounded-xl border border-soft text-soft hover:text-[var(--text)] hover:border-strong transition-colors text-sm font-medium inline-flex flex-row flex-nowrap items-center justify-center gap-2 whitespace-nowrap leading-none"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Tags), {
              class: "w-4 h-4 shrink-0 block",
              "stroke-width": 2,
              "aria-hidden": "true"
            }, null, _parent2, _scopeId));
            _push2(`<span class="leading-none"${_scopeId}>查看主题标签</span>`);
          } else {
            return [
              createVNode(unref(Tags), {
                class: "w-4 h-4 shrink-0 block",
                "stroke-width": 2,
                "aria-hidden": "true"
              }),
              createVNode("span", { class: "leading-none" }, "查看主题标签")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></section><section class="mt-12 md:mt-16"><div class="flex items-center justify-between mb-5"><h2 class="text-2xl md:text-3xl tracking-tight font-semibold">最新文章</h2>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/posts",
        class: "text-sm text-soft hover:text-[var(--brand)] transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`查看归档`);
          } else {
            return [
              createTextVNode("查看归档")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(featuredPost)) {
        _push(`<div class="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: unref(featuredPost).path,
          class: "lg:col-span-7 surface-strong rounded-3xl p-6 md:p-8 group transition-all duration-300 hover:-translate-y-1"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center gap-2 text-xs mb-4"${_scopeId}><span class="brand-chip rounded-full px-2.5 py-1"${_scopeId}>主推阅读</span><span class="text-mute"${_scopeId}>${ssrInterpolate(unref(featuredPost).readingTime || "8 分钟阅读")}</span></div><h3 class="text-2xl md:text-3xl font-semibold tracking-tight leading-snug group-hover:text-[var(--brand)] transition-colors"${_scopeId}>${ssrInterpolate(unref(featuredPost).title)}</h3><p class="text-soft mt-4 leading-relaxed line-clamp-3"${_scopeId}>${ssrInterpolate(unref(featuredPost).description || "点击进入文章查看完整内容。")}</p><div class="mt-8 text-sm text-mute flex items-center justify-between"${_scopeId}><span${_scopeId}>${ssrInterpolate(formatDate(unref(featuredPost).date))}</span><span class="inline-flex items-center gap-1.5 text-[var(--brand)]"${_scopeId}> 进入阅读 <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 5l7 7-7 7"${_scopeId}></path></svg></span></div>`);
            } else {
              return [
                createVNode("div", { class: "flex items-center gap-2 text-xs mb-4" }, [
                  createVNode("span", { class: "brand-chip rounded-full px-2.5 py-1" }, "主推阅读"),
                  createVNode("span", { class: "text-mute" }, toDisplayString(unref(featuredPost).readingTime || "8 分钟阅读"), 1)
                ]),
                createVNode("h3", { class: "text-2xl md:text-3xl font-semibold tracking-tight leading-snug group-hover:text-[var(--brand)] transition-colors" }, toDisplayString(unref(featuredPost).title), 1),
                createVNode("p", { class: "text-soft mt-4 leading-relaxed line-clamp-3" }, toDisplayString(unref(featuredPost).description || "点击进入文章查看完整内容。"), 1),
                createVNode("div", { class: "mt-8 text-sm text-mute flex items-center justify-between" }, [
                  createVNode("span", null, toDisplayString(formatDate(unref(featuredPost).date)), 1),
                  createVNode("span", { class: "inline-flex items-center gap-1.5 text-[var(--brand)]" }, [
                    createTextVNode(" 进入阅读 "),
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
        _push(`<div class="lg:col-span-5 grid gap-4 md:gap-5"><!--[-->`);
        ssrRenderList(unref(sidePosts), (post) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: post.path,
            to: post.path,
            class: "surface rounded-2xl p-5 group transition-all duration-300 hover:-translate-y-1"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="text-xs text-mute mb-2"${_scopeId}>${ssrInterpolate(formatDate(post.date))}</div><h4 class="text-lg font-medium tracking-tight leading-snug group-hover:text-[var(--brand)] transition-colors line-clamp-2"${_scopeId}>${ssrInterpolate(post.title)}</h4><p class="text-soft text-sm mt-2 line-clamp-2"${_scopeId}>${ssrInterpolate(post.description || "查看文章内容。")}</p>`);
              } else {
                return [
                  createVNode("div", { class: "text-xs text-mute mb-2" }, toDisplayString(formatDate(post.date)), 1),
                  createVNode("h4", { class: "text-lg font-medium tracking-tight leading-snug group-hover:text-[var(--brand)] transition-colors line-clamp-2" }, toDisplayString(post.title), 1),
                  createVNode("p", { class: "text-soft text-sm mt-2 line-clamp-2" }, toDisplayString(post.description || "查看文章内容。"), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</section><section class="mt-14 md:mt-20"><div class="flex items-end justify-between gap-4 mb-5"><h2 class="text-2xl md:text-3xl tracking-tight font-semibold">近期更新</h2><div class="hidden md:flex flex-wrap gap-2 justify-end"><!--[-->`);
      ssrRenderList(unref(topTopics), (topic) => {
        _push(`<span class="brand-chip px-2.5 py-1 rounded-full text-xs">${ssrInterpolate(topic)}</span>`);
      });
      _push(`<!--]--></div></div><div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5"><!--[-->`);
      ssrRenderList(unref(gridPosts), (post) => {
        _push(ssrRenderComponent(_component_PostCard, {
          key: post.path,
          post
        }, null, _parent));
      });
      _push(`<!--]--></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CDELBG6e.mjs.map
