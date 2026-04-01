import { defineComponent, ref, withAsyncContext, computed, watch, unref, withCtx, createTextVNode, isRef, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { Button, Input, Select, Table, Tag, Pagination } from 'tdesign-vue-next';
import { a as useRouter } from './server.mjs';
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

const pageSize = 10;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const router = useRouter();
    const searchQuery = ref("");
    const statusFilter = ref(void 0);
    const page = ref(1);
    const statusOptions = [
      { label: "已发布", value: "published" },
      { label: "草稿", value: "draft" }
    ];
    const columns = [
      { colKey: "title", title: "标题", minWidth: 240 },
      { colKey: "slug", title: "Slug", width: 180 },
      { colKey: "categoryName", title: "分类", width: 140 },
      { colKey: "status", title: "状态", width: 120 },
      { colKey: "updatedAt", title: "更新时间", width: 190 },
      { colKey: "actions", title: "操作", width: 160, align: "right" }
    ];
    const { data: postsData, pending, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/admin/posts",
      {
        query: computed(() => ({
          page: page.value,
          pageSize,
          keyword: searchQuery.value || void 0,
          status: statusFilter.value || void 0
        }))
      },
      "$sdmAXgrsJg"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const posts = computed(() => postsData.value?.list || []);
    const pagination = computed(() => postsData.value?.pagination || { page: 1, totalPages: 1, total: 0 });
    watch([searchQuery, statusFilter], () => {
      page.value = 1;
    });
    function formatDate(value) {
      if (!value) return "-";
      return new Date(value).toLocaleString("zh-CN");
    }
    function statusText(status) {
      return status === "published" ? "已发布" : "草稿";
    }
    function statusTheme(status) {
      return status === "published" ? "success" : "warning";
    }
    function goToNewPost() {
      router.push("/admin/new-post").catch(() => {
        (void 0).location.href = "/admin/new-post";
      });
    }
    function goToEditPost(id) {
      const target = `/admin/posts/${id}`;
      router.push(target);
    }
    async function deletePost(id) {
      if (!confirm("确定删除这篇文章吗？")) return;
      await $fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
      await refresh();
    }
    function handlePageChange(pageInfo) {
      page.value = pageInfo.current;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="mb-8"><div class="text-xs text-text-muted light:text-gray-500 uppercase tracking-wider mb-2">内容中心</div><div class="flex items-start justify-between gap-4"><h1 class="text-4xl font-bold text-white light:text-gray-900">文章归档</h1>`);
      _push(ssrRenderComponent(unref(Button), {
        theme: "primary",
        onClick: goToNewPost
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`新建文章`);
          } else {
            return [
              createTextVNode("新建文章")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="flex flex-col sm:flex-row gap-4 mb-6">`);
      _push(ssrRenderComponent(unref(Input), {
        modelValue: unref(searchQuery),
        "onUpdate:modelValue": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
        clearable: "",
        placeholder: "按标题或正文搜索..."
      }, null, _parent));
      _push(ssrRenderComponent(unref(Select), {
        modelValue: unref(statusFilter),
        "onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
        options: statusOptions,
        clearable: "",
        placeholder: "筛选状态",
        class: "sm:w-48"
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(unref(Table), {
        "row-key": "id",
        hover: "",
        stripe: "",
        data: unref(posts),
        columns,
        loading: unref(pending),
        "table-layout": "fixed",
        size: "small",
        bordered: ""
      }, {
        title: withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<a${ssrRenderAttr("href", `/admin/posts/${row.id}`)} class="text-accent-purple hover:underline"${_scopeId}>${ssrInterpolate(row.title)}</a>`);
          } else {
            return [
              createVNode("a", {
                href: `/admin/posts/${row.id}`,
                class: "text-accent-purple hover:underline"
              }, toDisplayString(row.title), 9, ["href"])
            ];
          }
        }),
        slug: withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="text-xs text-text-muted"${_scopeId}>/${ssrInterpolate(row.slug)}</span>`);
          } else {
            return [
              createVNode("span", { class: "text-xs text-text-muted" }, "/" + toDisplayString(row.slug), 1)
            ];
          }
        }),
        categoryName: withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(row.category?.name || "未分类")}`);
          } else {
            return [
              createTextVNode(toDisplayString(row.category?.name || "未分类"), 1)
            ];
          }
        }),
        status: withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Tag), {
              size: "small",
              theme: statusTheme(row.status),
              variant: "light"
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(statusText(row.status))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(statusText(row.status)), 1)
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Tag), {
                size: "small",
                theme: statusTheme(row.status),
                variant: "light"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(statusText(row.status)), 1)
                ]),
                _: 2
              }, 1032, ["theme"])
            ];
          }
        }),
        updatedAt: withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(formatDate(row.updatedAt || row.createdAt || null))}`);
          } else {
            return [
              createTextVNode(toDisplayString(formatDate(row.updatedAt || row.createdAt || null)), 1)
            ];
          }
        }),
        actions: withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-end gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Button), {
              variant: "text",
              theme: "primary",
              onClick: ($event) => goToEditPost(row.id)
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`编辑`);
                } else {
                  return [
                    createTextVNode("编辑")
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Button), {
              variant: "text",
              theme: "danger",
              onClick: ($event) => deletePost(row.id)
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`删除`);
                } else {
                  return [
                    createTextVNode("删除")
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                createVNode(unref(Button), {
                  variant: "text",
                  theme: "primary",
                  onClick: ($event) => goToEditPost(row.id)
                }, {
                  default: withCtx(() => [
                    createTextVNode("编辑")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(unref(Button), {
                  variant: "text",
                  theme: "danger",
                  onClick: ($event) => deletePost(row.id)
                }, {
                  default: withCtx(() => [
                    createTextVNode("删除")
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex items-center justify-between mt-6"><div class="text-xs text-text-muted light:text-gray-500"> 第 ${ssrInterpolate(unref(pagination).page)} / ${ssrInterpolate(Math.max(unref(pagination).totalPages, 1))} 页，共 ${ssrInterpolate(unref(pagination).total)} 条 </div>`);
      _push(ssrRenderComponent(unref(Pagination), {
        current: unref(page),
        "page-size": pageSize,
        total: unref(pagination).total,
        "show-page-size": false,
        onChange: handlePageChange
      }, null, _parent));
      _push(`</div></div>`);
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
//# sourceMappingURL=index-CMDicOBQ.mjs.map
