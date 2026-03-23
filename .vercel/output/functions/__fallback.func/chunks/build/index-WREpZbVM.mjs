import { _ as __nuxt_component_0 } from './nuxt-link-7eIXoFIv.mjs';
import { withAsyncContext, withCtx, createVNode, createTextVNode, unref, openBlock, createBlock, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { u as useAsyncData } from './asyncData-14sGL0-c.mjs';
import { q as queryCollection } from './client-BfRTNG13.mjs';
import { u as useHead } from './server.mjs';
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

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const coreTechs = [
      { name: "Rust", icon: "⚙️" },
      { name: "Go", icon: "🔵" },
      { name: "TypeScript", icon: "🔷" },
      { name: "WebAssembly", icon: "⚡" },
      { name: "Nix", icon: "❄️" },
      { name: "Zig", icon: "⚡" }
    ];
    const { data: posts } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "posts",
      () => queryCollection("content").order("date", "DESC").select("title", "description", "date", "tags", "path", "readingTime").all()
    )), __temp = await __temp, __restore(), __temp);
    const recentPosts = posts.value?.slice(0, 4) || [];
    useHead({
      title: "VOIDZERO - 构建下一代虚空工程",
      meta: [
        { name: "description", content: "一个专注于系统编程前沿、响应式架构和高性能开发者工具的技术日志。" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="max-w-page mx-auto px-8"><section class="relative pt-32 pb-24"><div class="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-purple-500/5 to-transparent pointer-events-none"></div><div class="max-w-4xl relative z-10"><h1 class="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-6 text-white"> 构建下一代<br><span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">虚空工程。</span></h1><p class="text-lg text-text-secondary mb-8 leading-relaxed max-w-2xl"> 一个专注于系统编程前沿、响应式架构和高性能开发者工具的技术日志。 </p><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/posts",
        class: "inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent-purple text-white font-medium hover:bg-accent-purple/80 transition-all"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>探索文档</span>`);
          } else {
            return [
              createVNode("span", null, "探索文档")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/about",
        class: "inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#2a2435] text-white font-medium hover:bg-accent-purple hover:border-accent-purple transition-all border border-[#2a2435]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 查看项目 `);
          } else {
            return [
              createTextVNode(" 查看项目 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section><section class="py-16"><div class="flex items-end justify-between mb-8"><h2 class="text-2xl font-bold text-white">最新文章</h2>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/posts",
        class: "text-sm text-text-secondary hover:text-accent-purple transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 查看全部 → `);
          } else {
            return [
              createTextVNode(" 查看全部 → ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid grid-cols-12 gap-6">`);
      if (unref(recentPosts)[0]) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: unref(recentPosts)[0].path,
          class: "col-span-12 lg:col-span-7 lg:row-span-2 group relative rounded-2xl bg-[#1a1625] border border-[#2a2435] overflow-hidden hover:border-[#4a4060] transition-all min-h-[400px]"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="absolute inset-0 overflow-hidden"${_scopeId}><svg class="w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice"${_scopeId}><defs${_scopeId}><radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%"${_scopeId}><stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.3"${_scopeId}></stop><stop offset="100%" stop-color="#8b5cf6" stop-opacity="0"${_scopeId}></stop></radialGradient></defs><g stroke="#8b5cf6" stroke-width="0.5" opacity="0.3"${_scopeId}><line x1="100" y1="80" x2="200" y2="120"${_scopeId}></line><line x1="200" y1="120" x2="300" y2="80"${_scopeId}></line><line x1="300" y1="80" x2="400" y2="150"${_scopeId}></line><line x1="400" y1="150" x2="500" y2="100"${_scopeId}></line><line x1="150" y1="200" x2="250" y2="180"${_scopeId}></line><line x1="250" y1="180" x2="350" y2="220"${_scopeId}></line><line x1="350" y1="220" x2="450" y2="200"${_scopeId}></line><line x1="80" y1="280" x2="180" y2="250"${_scopeId}></line><line x1="180" y1="250" x2="280" y2="300"${_scopeId}></line><line x1="280" y1="300" x2="380" y2="280"${_scopeId}></line><line x1="380" y1="280" x2="480" y2="320"${_scopeId}></line><line x1="120" y1="150" x2="180" y2="250"${_scopeId}></line><line x1="250" y1="180" x2="300" y2="80"${_scopeId}></line><line x1="350" y1="220" x2="400" y2="150"${_scopeId}></line></g><g fill="#8b5cf6"${_scopeId}><circle cx="100" cy="80" r="3" opacity="0.8"${_scopeId}></circle><circle cx="200" cy="120" r="4" opacity="0.9"${_scopeId}></circle><circle cx="300" cy="80" r="3" opacity="0.7"${_scopeId}></circle><circle cx="400" cy="150" r="5" opacity="1"${_scopeId}></circle><circle cx="500" cy="100" r="3" opacity="0.6"${_scopeId}></circle><circle cx="150" cy="200" r="3" opacity="0.7"${_scopeId}></circle><circle cx="250" cy="180" r="4" opacity="0.9"${_scopeId}></circle><circle cx="350" cy="220" r="3" opacity="0.8"${_scopeId}></circle><circle cx="450" cy="200" r="4" opacity="0.7"${_scopeId}></circle><circle cx="80" cy="280" r="3" opacity="0.6"${_scopeId}></circle><circle cx="180" cy="250" r="5" opacity="1"${_scopeId}></circle><circle cx="280" cy="300" r="3" opacity="0.7"${_scopeId}></circle><circle cx="380" cy="280" r="4" opacity="0.8"${_scopeId}></circle><circle cx="480" cy="320" r="3" opacity="0.6"${_scopeId}></circle><circle cx="120" cy="150" r="3" opacity="0.5"${_scopeId}></circle></g><circle cx="400" cy="150" r="30" fill="url(#nodeGlow)" opacity="0.5"${_scopeId}></circle><circle cx="180" cy="250" r="25" fill="url(#nodeGlow)" opacity="0.4"${_scopeId}></circle></svg></div><div class="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#1a1625] via-[#1a1625]/90 to-transparent"${_scopeId}><div class="flex items-center gap-2 mb-3"${_scopeId}><span class="px-3 py-1 text-xs rounded-full bg-[#8b5cf6]/20 text-[#a78bfa] border border-[#8b5cf6]/30"${_scopeId}>${ssrInterpolate(unref(recentPosts)[0].tags?.[0] || "工程")}</span></div><h3 class="text-2xl font-bold text-white mb-3 group-hover:text-[#a78bfa] transition-colors"${_scopeId}>${ssrInterpolate(unref(recentPosts)[0].title)}</h3><p class="text-text-secondary text-sm line-clamp-2 max-w-lg"${_scopeId}>${ssrInterpolate(unref(recentPosts)[0].description)}</p></div>`);
            } else {
              return [
                createVNode("div", { class: "absolute inset-0 overflow-hidden" }, [
                  (openBlock(), createBlock("svg", {
                    class: "w-full h-full",
                    viewBox: "0 0 600 400",
                    preserveAspectRatio: "xMidYMid slice"
                  }, [
                    createVNode("defs", null, [
                      createVNode("radialGradient", {
                        id: "nodeGlow",
                        cx: "50%",
                        cy: "50%",
                        r: "50%"
                      }, [
                        createVNode("stop", {
                          offset: "0%",
                          "stop-color": "#8b5cf6",
                          "stop-opacity": "0.3"
                        }),
                        createVNode("stop", {
                          offset: "100%",
                          "stop-color": "#8b5cf6",
                          "stop-opacity": "0"
                        })
                      ])
                    ]),
                    createVNode("g", {
                      stroke: "#8b5cf6",
                      "stroke-width": "0.5",
                      opacity: "0.3"
                    }, [
                      createVNode("line", {
                        x1: "100",
                        y1: "80",
                        x2: "200",
                        y2: "120"
                      }),
                      createVNode("line", {
                        x1: "200",
                        y1: "120",
                        x2: "300",
                        y2: "80"
                      }),
                      createVNode("line", {
                        x1: "300",
                        y1: "80",
                        x2: "400",
                        y2: "150"
                      }),
                      createVNode("line", {
                        x1: "400",
                        y1: "150",
                        x2: "500",
                        y2: "100"
                      }),
                      createVNode("line", {
                        x1: "150",
                        y1: "200",
                        x2: "250",
                        y2: "180"
                      }),
                      createVNode("line", {
                        x1: "250",
                        y1: "180",
                        x2: "350",
                        y2: "220"
                      }),
                      createVNode("line", {
                        x1: "350",
                        y1: "220",
                        x2: "450",
                        y2: "200"
                      }),
                      createVNode("line", {
                        x1: "80",
                        y1: "280",
                        x2: "180",
                        y2: "250"
                      }),
                      createVNode("line", {
                        x1: "180",
                        y1: "250",
                        x2: "280",
                        y2: "300"
                      }),
                      createVNode("line", {
                        x1: "280",
                        y1: "300",
                        x2: "380",
                        y2: "280"
                      }),
                      createVNode("line", {
                        x1: "380",
                        y1: "280",
                        x2: "480",
                        y2: "320"
                      }),
                      createVNode("line", {
                        x1: "120",
                        y1: "150",
                        x2: "180",
                        y2: "250"
                      }),
                      createVNode("line", {
                        x1: "250",
                        y1: "180",
                        x2: "300",
                        y2: "80"
                      }),
                      createVNode("line", {
                        x1: "350",
                        y1: "220",
                        x2: "400",
                        y2: "150"
                      })
                    ]),
                    createVNode("g", { fill: "#8b5cf6" }, [
                      createVNode("circle", {
                        cx: "100",
                        cy: "80",
                        r: "3",
                        opacity: "0.8"
                      }),
                      createVNode("circle", {
                        cx: "200",
                        cy: "120",
                        r: "4",
                        opacity: "0.9"
                      }),
                      createVNode("circle", {
                        cx: "300",
                        cy: "80",
                        r: "3",
                        opacity: "0.7"
                      }),
                      createVNode("circle", {
                        cx: "400",
                        cy: "150",
                        r: "5",
                        opacity: "1"
                      }),
                      createVNode("circle", {
                        cx: "500",
                        cy: "100",
                        r: "3",
                        opacity: "0.6"
                      }),
                      createVNode("circle", {
                        cx: "150",
                        cy: "200",
                        r: "3",
                        opacity: "0.7"
                      }),
                      createVNode("circle", {
                        cx: "250",
                        cy: "180",
                        r: "4",
                        opacity: "0.9"
                      }),
                      createVNode("circle", {
                        cx: "350",
                        cy: "220",
                        r: "3",
                        opacity: "0.8"
                      }),
                      createVNode("circle", {
                        cx: "450",
                        cy: "200",
                        r: "4",
                        opacity: "0.7"
                      }),
                      createVNode("circle", {
                        cx: "80",
                        cy: "280",
                        r: "3",
                        opacity: "0.6"
                      }),
                      createVNode("circle", {
                        cx: "180",
                        cy: "250",
                        r: "5",
                        opacity: "1"
                      }),
                      createVNode("circle", {
                        cx: "280",
                        cy: "300",
                        r: "3",
                        opacity: "0.7"
                      }),
                      createVNode("circle", {
                        cx: "380",
                        cy: "280",
                        r: "4",
                        opacity: "0.8"
                      }),
                      createVNode("circle", {
                        cx: "480",
                        cy: "320",
                        r: "3",
                        opacity: "0.6"
                      }),
                      createVNode("circle", {
                        cx: "120",
                        cy: "150",
                        r: "3",
                        opacity: "0.5"
                      })
                    ]),
                    createVNode("circle", {
                      cx: "400",
                      cy: "150",
                      r: "30",
                      fill: "url(#nodeGlow)",
                      opacity: "0.5"
                    }),
                    createVNode("circle", {
                      cx: "180",
                      cy: "250",
                      r: "25",
                      fill: "url(#nodeGlow)",
                      opacity: "0.4"
                    })
                  ]))
                ]),
                createVNode("div", { class: "absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#1a1625] via-[#1a1625]/90 to-transparent" }, [
                  createVNode("div", { class: "flex items-center gap-2 mb-3" }, [
                    createVNode("span", { class: "px-3 py-1 text-xs rounded-full bg-[#8b5cf6]/20 text-[#a78bfa] border border-[#8b5cf6]/30" }, toDisplayString(unref(recentPosts)[0].tags?.[0] || "工程"), 1)
                  ]),
                  createVNode("h3", { class: "text-2xl font-bold text-white mb-3 group-hover:text-[#a78bfa] transition-colors" }, toDisplayString(unref(recentPosts)[0].title), 1),
                  createVNode("p", { class: "text-text-secondary text-sm line-clamp-2 max-w-lg" }, toDisplayString(unref(recentPosts)[0].description), 1)
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="col-span-12 lg:col-span-5 space-y-4"><!--[-->`);
      ssrRenderList(unref(recentPosts).slice(1, 4), (post) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: post.path,
          to: post.path,
          class: "group flex gap-4 p-4 rounded-xl bg-[#1a1625] border border-[#2a2435] hover:border-[#4a4060] transition-all"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="w-20 h-20 rounded-lg bg-gradient-to-br from-[#2a2435] to-[#1a1625] flex-shrink-0 flex items-center justify-center border border-[#3a3445]"${_scopeId}><svg class="w-10 h-10 text-[#6b5c8a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"${_scopeId}></path></svg></div><div class="flex-1 min-w-0"${_scopeId}><div class="flex items-center gap-2 mb-1"${_scopeId}><span class="text-xs text-[#a78bfa]"${_scopeId}>${ssrInterpolate(post.tags?.[0] || "工程")}</span></div><h4 class="text-sm font-semibold text-white mb-1 group-hover:text-[#a78bfa] transition-colors line-clamp-2"${_scopeId}>${ssrInterpolate(post.title)}</h4><p class="text-xs text-text-muted line-clamp-2"${_scopeId}>${ssrInterpolate(post.description)}</p></div>`);
            } else {
              return [
                createVNode("div", { class: "w-20 h-20 rounded-lg bg-gradient-to-br from-[#2a2435] to-[#1a1625] flex-shrink-0 flex items-center justify-center border border-[#3a3445]" }, [
                  (openBlock(), createBlock("svg", {
                    class: "w-10 h-10 text-[#6b5c8a]",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "1.5",
                      d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    })
                  ]))
                ]),
                createVNode("div", { class: "flex-1 min-w-0" }, [
                  createVNode("div", { class: "flex items-center gap-2 mb-1" }, [
                    createVNode("span", { class: "text-xs text-[#a78bfa]" }, toDisplayString(post.tags?.[0] || "工程"), 1)
                  ]),
                  createVNode("h4", { class: "text-sm font-semibold text-white mb-1 group-hover:text-[#a78bfa] transition-colors line-clamp-2" }, toDisplayString(post.title), 1),
                  createVNode("p", { class: "text-xs text-text-muted line-clamp-2" }, toDisplayString(post.description), 1)
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div></section><section class="py-16"><h2 class="text-2xl font-bold text-white text-center mb-12">核心基础设施</h2><div class="flex items-center justify-center gap-12 flex-wrap"><!--[-->`);
      ssrRenderList(coreTechs, (tech) => {
        _push(`<div class="flex flex-col items-center gap-3 group cursor-pointer"><div class="w-16 h-16 rounded-xl bg-[#1a1625] border border-[#2a2435] flex items-center justify-center text-2xl group-hover:border-[#4a4060] group-hover:bg-[#231d2e] transition-all">${ssrInterpolate(tech.icon)}</div><span class="text-sm text-text-secondary group-hover:text-white transition-colors">${ssrInterpolate(tech.name)}</span></div>`);
      });
      _push(`<!--]--></div></section><section class="py-16"><h2 class="text-2xl font-bold text-white mb-8">活跃部署</h2><div class="grid grid-cols-12 gap-4"><div class="col-span-12 md:col-span-6 md:row-span-2 p-8 rounded-2xl bg-[#1a1625] border border-[#2a2435] hover:border-[#4a4060] transition-all group"><div class="text-xs text-[#a78bfa] mb-3 tracking-wider">运行时</div><h3 class="text-2xl font-bold text-white mb-3 group-hover:text-[#a78bfa] transition-colors">Lumina 运行时</h3><p class="text-text-secondary text-sm mb-6 leading-relaxed">一个内存安全且高性能的运行时，专为现代大规模数据系统优化。</p><div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span><span class="text-xs text-text-muted">运行中</span></div></div><div class="col-span-12 md:col-span-6 p-6 rounded-2xl bg-[#1a1625] border border-[#2a2435] hover:border-[#4a4060] transition-all group"><div class="text-xs text-[#a78bfa] mb-2 tracking-wider">编译器</div><h3 class="text-xl font-bold text-white mb-2 group-hover:text-[#a78bfa] transition-colors">VoidCC</h3><p class="text-text-secondary text-sm leading-relaxed">一个用于领域特定语言的实验性编译器，具有零成本抽象。</p></div><div class="col-span-12 md:col-span-3 p-6 rounded-2xl bg-[#1a1625] border border-[#2a2435] hover:border-[#4a4060] transition-all group"><div class="text-xs text-[#a78bfa] mb-2 tracking-wider">库</div><h3 class="text-lg font-bold text-white mb-1 group-hover:text-[#a78bfa] transition-colors">Chronos</h3><p class="text-text-secondary text-xs">时间序列数据结构</p></div><div class="col-span-12 md:col-span-3 p-6 rounded-2xl bg-[#1a1625] border border-[#2a2435] hover:border-[#4a4060] transition-all group"><div class="text-xs text-[#a78bfa] mb-2 tracking-wider">协议</div><h3 class="text-lg font-bold text-white mb-1 group-hover:text-[#a78bfa] transition-colors">Spectral</h3><p class="text-text-secondary text-xs">WebSocket 通信层</p></div></div></section><section class="py-16"><div class="p-16 rounded-2xl bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] text-center relative overflow-hidden"><div class="absolute inset-0 opacity-10"><div class="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div><div class="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/3 translate-y-1/3"></div></div><div class="relative z-10"><h2 class="text-4xl font-bold text-white mb-4">保持联系。</h2><p class="text-white/80 mb-10 max-w-lg mx-auto text-lg"> 接收关于新工程文章、系统设计和开源发布的更新。 </p><div class="flex items-center gap-4 justify-center flex-wrap"><input type="email" placeholder="your@email.com" class="px-6 py-4 rounded-lg bg-[#1a1625] border border-[#2a2435] text-white placeholder:text-text-muted focus:outline-none focus:border-accent-purple/50 w-80 text-base"><button class="px-8 py-4 rounded-lg bg-accent-purple text-white font-semibold hover:bg-accent-purple/80 transition-all text-base"> 订阅 </button></div></div></div></section></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-WREpZbVM.mjs.map
