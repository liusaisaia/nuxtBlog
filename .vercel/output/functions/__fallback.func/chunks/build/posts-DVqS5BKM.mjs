import { ref, computed, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';

const _sfc_main = {
  __name: "posts",
  __ssrInlineRender: true,
  setup(__props) {
    const searchQuery = ref("");
    const posts = [
      {
        id: 1,
        title: "Neural Mesh: Scaling LLMs in Production",
        uuid: "8F25-4A18-50B2",
        category: "Engineering",
        status: "published",
        date: "2024-05-12",
        time: "14:32"
      },
      {
        id: 2,
        title: "The Void Design Language v2.0",
        uuid: "2A1F-9986-765C",
        category: "Design",
        status: "draft",
        date: "2024-05-10",
        time: "09:15"
      },
      {
        id: 3,
        title: "Securing Edge Gateways in Distributed Systems",
        uuid: "CC93-11BE-8B01",
        category: "Security",
        status: "published",
        date: "2024-05-08",
        time: "18:45"
      },
      {
        id: 4,
        title: "Quantum Resistance: Preparing for the 2030s",
        uuid: "33A2-0B48-B122",
        category: "Protocol",
        status: "published",
        date: "2024-05-04",
        time: "11:20"
      }
    ];
    const filteredPosts = computed(() => {
      if (!searchQuery.value) return posts;
      const query = searchQuery.value.toLowerCase();
      return posts.filter(
        (post) => post.title.toLowerCase().includes(query) || post.category.toLowerCase().includes(query) || post.uuid.toLowerCase().includes(query)
      );
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="mb-8"><div class="text-xs text-text-muted light:text-gray-500 uppercase tracking-wider mb-2">Content Engine</div><div class="flex items-start justify-between"><h1 class="text-4xl font-bold text-white light:text-gray-900"> POST_ARCHIVE </h1><div class="px-4 py-2 bg-[#1a1625] dark:bg-[#1a1625] light:bg-white rounded-lg border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 text-right"><div class="text-[10px] text-text-muted light:text-gray-500 uppercase">Total Posts</div><div class="text-2xl font-bold text-white light:text-gray-900">1,248</div></div></div></div><div class="flex flex-col sm:flex-row gap-4 mb-6"><div class="relative flex-1"><svg class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted light:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg><input${ssrRenderAttr("value", unref(searchQuery))} type="text" placeholder="Search archive by title, tag, or ID..." class="w-full pl-11 pr-4 py-3 bg-[#1a1625] dark:bg-[#1a1625] light:bg-white border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 rounded-lg text-white light:text-gray-900 placeholder:text-text-muted light:placeholder:text-gray-400 focus:outline-none focus:border-accent-purple/50 transition-colors text-sm"></div><div class="flex gap-3"><select class="px-4 py-3 bg-[#1a1625] dark:bg-[#1a1625] light:bg-white border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 rounded-lg text-white light:text-gray-900 text-sm focus:outline-none focus:border-accent-purple/50 cursor-pointer"><option>All Categories</option><option>Engineering</option><option>Design</option><option>Security</option><option>Protocol</option></select><button class="px-4 py-3 bg-[#1a1625] dark:bg-[#1a1625] light:bg-white border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 rounded-lg text-text-secondary light:text-gray-600 hover:text-accent-purple transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg></button></div></div><div class="bg-[#1a1625] dark:bg-[#1a1625] light:bg-white rounded-xl border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 overflow-hidden"><div class="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 text-[10px] text-text-muted light:text-gray-500 uppercase tracking-wider font-medium"><div class="col-span-5">Post Identity</div><div class="col-span-2">Category</div><div class="col-span-2">Status</div><div class="col-span-2">Timestamp</div><div class="col-span-1 text-right">Operations</div></div><!--[-->`);
      ssrRenderList(unref(filteredPosts), (post) => {
        _push(`<div class="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[#2a2435]/50 dark:border-[#2a2435]/50 light:border-gray-100 hover:bg-accent-purple/5 transition-colors items-center"><div class="col-span-5"><h4 class="text-sm text-white light:text-gray-900 font-medium mb-1">${ssrInterpolate(post.title)}</h4><p class="text-[10px] text-text-muted light:text-gray-500 font-mono">UUID: ${ssrInterpolate(post.uuid)}</p></div><div class="col-span-2"><span class="px-2 py-1 text-[10px] bg-[#2a2435] dark:bg-[#2a2435] light:bg-gray-100 text-text-secondary light:text-gray-600 rounded uppercase">${ssrInterpolate(post.category)}</span></div><div class="col-span-2"><div class="flex items-center gap-2"><span class="${ssrRenderClass([{
          "bg-green-500": post.status === "published",
          "bg-yellow-500": post.status === "draft"
        }, "w-1.5 h-1.5 rounded-full"])}"></span><span class="${ssrRenderClass([{
          "text-green-500": post.status === "published",
          "text-yellow-600": post.status === "draft"
        }, "text-xs uppercase"])}">${ssrInterpolate(post.status)}</span></div></div><div class="col-span-2 text-xs text-text-secondary light:text-gray-600"><div>${ssrInterpolate(post.date)}</div><div class="text-[10px] text-text-muted light:text-gray-500">${ssrInterpolate(post.time)}</div></div><div class="col-span-1 flex items-center justify-end gap-1"><button class="p-1.5 text-text-muted light:text-gray-400 hover:text-accent-purple hover:bg-accent-purple/10 rounded transition-colors" title="View"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg></button><button class="p-1.5 text-text-muted light:text-gray-400 hover:text-accent-purple hover:bg-accent-purple/10 rounded transition-colors" title="Edit"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg></button><button class="p-1.5 text-text-muted light:text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors" title="Delete"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button></div></div>`);
      });
      _push(`<!--]--></div><div class="flex items-center justify-between mt-6"><div class="text-xs text-text-muted light:text-gray-500"> Showing 1-4 of 1,248 records </div><div class="flex items-center gap-2"><button class="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1a1625] dark:bg-[#1a1625] light:bg-white border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 text-text-muted light:text-gray-500 hover:text-accent-purple hover:border-accent-purple/50 hover:bg-accent-purple/10 transition-colors"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button><button class="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-purple text-white text-sm font-medium"> 1 </button><button class="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1a1625] dark:bg-[#1a1625] light:bg-white border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 text-text-secondary light:text-gray-600 hover:text-accent-purple hover:border-accent-purple/50 hover:bg-accent-purple/10 transition-colors text-sm"> 2 </button><button class="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1a1625] dark:bg-[#1a1625] light:bg-white border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 text-text-secondary light:text-gray-600 hover:text-accent-purple hover:border-accent-purple/50 hover:bg-accent-purple/10 transition-colors text-sm"> 3 </button><button class="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1a1625] dark:bg-[#1a1625] light:bg-white border border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 text-text-muted light:text-gray-500 hover:text-accent-purple hover:border-accent-purple/50 hover:bg-accent-purple/10 transition-colors"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button></div></div><div class="flex items-center justify-between mt-8 pt-6 border-t border-[#2a2435] dark:border-[#2a2435] light:border-gray-200 text-[10px] text-text-muted light:text-gray-500"><div class="font-mono"> SYSTEM ENGINE: V.1.0.4 — LAT: 52.0127° N LON: 118.2437° W </div><div> © 2024 VOID PROTOCOL CORE </div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/posts.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=posts-DVqS5BKM.mjs.map
