import { defineComponent, ref, withAsyncContext, computed, watch, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
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

const pageSize = 10;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "comments",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const searchQuery = ref("");
    const statusFilter = ref("");
    const page = ref(1);
    const { data, pending, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/admin/comments",
      {
        query: computed(() => ({
          page: page.value,
          pageSize,
          keyword: searchQuery.value || void 0,
          status: statusFilter.value || void 0
        }))
      },
      "$LLvTxIM6MR"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const comments = computed(() => data.value?.list || []);
    const pagination = computed(() => data.value?.pagination || { page: 1, totalPages: 1, total: 0 });
    function formatDate(value) {
      if (!value) return "-";
      return new Date(value).toLocaleString("zh-CN");
    }
    function statusText(status) {
      switch (status) {
        case "approved":
          return "已通过";
        case "rejected":
          return "已驳回";
        case "spam":
          return "垃圾评论";
        default:
          return "待审核";
      }
    }
    function statusClass(status) {
      switch (status) {
        case "approved":
          return "text-emerald-400 light:text-emerald-600";
        case "rejected":
          return "text-amber-400 light:text-amber-600";
        case "spam":
          return "text-rose-400 light:text-rose-600";
        default:
          return "text-sky-400 light:text-sky-600";
      }
    }
    watch([searchQuery, statusFilter], () => {
      page.value = 1;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="mb-8"><div class="text-xs text-text-muted light:text-gray-500 uppercase tracking-wider mb-2">互动中心</div><h1 class="text-4xl font-bold text-white light:text-gray-900">评论管理</h1></div><div class="flex flex-col sm:flex-row gap-4 mb-6"><input${ssrRenderAttr("value", unref(searchQuery))} type="text" placeholder="搜索评论内容/作者/邮箱..." class="flex-1 px-4 py-3 bg-[#1a1625] dark:bg-[#1a1625] light:bg-white border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 rounded-lg text-white light:text-gray-900"><select class="px-4 py-3 bg-[#1a1625] dark:bg-[#1a1625] light:bg-white border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 rounded-lg text-white light:text-gray-900"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "") : ssrLooseEqual(unref(statusFilter), "")) ? " selected" : ""}>全部状态</option><option value="pending"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "pending") : ssrLooseEqual(unref(statusFilter), "pending")) ? " selected" : ""}>待审核</option><option value="approved"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "approved") : ssrLooseEqual(unref(statusFilter), "approved")) ? " selected" : ""}>已通过</option><option value="rejected"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "rejected") : ssrLooseEqual(unref(statusFilter), "rejected")) ? " selected" : ""}>已驳回</option><option value="spam"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "spam") : ssrLooseEqual(unref(statusFilter), "spam")) ? " selected" : ""}>垃圾评论</option></select></div><div class="bg-[#1a1625] dark:bg-[#1a1625] light:bg-white rounded-xl border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 overflow-hidden"><div class="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 text-[10px] text-text-muted light:text-gray-500 uppercase tracking-wider"><div class="col-span-4">评论内容</div><div class="col-span-2">作者</div><div class="col-span-2">所属文章</div><div class="col-span-1">状态</div><div class="col-span-2">时间</div><div class="col-span-1 text-right">操作</div></div>`);
      if (unref(pending)) {
        _push(`<div class="px-6 py-10 text-center text-text-muted light:text-gray-500">加载中...</div>`);
      } else {
        _push(`<!--[--><!--[-->`);
        ssrRenderList(unref(comments), (item) => {
          _push(`<div class="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[#2a2435]/50 dark:border-[#2a2435]/50 light:border-gray-100 items-start hover:bg-accent-purple/5 transition-colors"><div class="col-span-4 min-w-0"><p class="text-sm text-white light:text-gray-900 line-clamp-2">${ssrInterpolate(item.content)}</p></div><div class="col-span-2 min-w-0"><p class="text-sm text-white light:text-gray-900 truncate">${ssrInterpolate(item.authorName)}</p><p class="text-xs text-text-muted light:text-gray-500 truncate">${ssrInterpolate(item.authorEmail || "-")}</p></div><div class="col-span-2 min-w-0"><p class="text-sm text-text-secondary light:text-gray-700 truncate">${ssrInterpolate(item.post?.title || "未关联文章")}</p></div><div class="col-span-1"><span class="${ssrRenderClass([statusClass(item.status), "text-xs"])}">${ssrInterpolate(statusText(item.status))}</span></div><div class="col-span-2 text-xs text-text-secondary light:text-gray-600">${ssrInterpolate(formatDate(item.createdAt))}</div><div class="col-span-1 flex items-center justify-end gap-2"><button class="text-xs text-emerald-400 hover:text-emerald-300 light:text-emerald-600">通过</button><button class="text-xs text-amber-400 hover:text-amber-300 light:text-amber-600">驳回</button><button class="text-xs text-rose-400 hover:text-rose-300 light:text-rose-600">删</button></div></div>`);
        });
        _push(`<!--]-->`);
        if (!unref(comments).length) {
          _push(`<div class="px-6 py-10 text-center text-text-muted light:text-gray-500"> 暂无评论数据 </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      }
      _push(`</div><div class="flex items-center justify-between mt-6"><div class="text-xs text-text-muted light:text-gray-500"> 第 ${ssrInterpolate(unref(pagination).page)} / ${ssrInterpolate(Math.max(unref(pagination).totalPages, 1))} 页，共 ${ssrInterpolate(unref(pagination).total)} 条 </div><div class="flex items-center gap-2"><button class="px-3 py-1.5 rounded border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 text-text-secondary light:text-gray-600 disabled:opacity-40"${ssrIncludeBooleanAttr(unref(page) <= 1) ? " disabled" : ""}>上一页</button><button class="px-3 py-1.5 rounded border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 text-text-secondary light:text-gray-600 disabled:opacity-40"${ssrIncludeBooleanAttr(unref(page) >= unref(pagination).totalPages) ? " disabled" : ""}>下一页</button></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/comments.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=comments-NmeMj99w.mjs.map
