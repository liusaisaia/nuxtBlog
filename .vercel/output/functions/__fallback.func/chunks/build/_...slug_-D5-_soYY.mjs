import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { withAsyncContext, computed, ref, mergeProps, unref, withCtx, openBlock, createBlock, createVNode, toDisplayString, toRaw, resolveComponent, defineAsyncComponent, defineComponent, h, getCurrentInstance, reactive, watch, Text, Comment, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { K as pascalCase, L as kebabCase, M as destr } from '../nitro/nitro.mjs';
import { find, html } from 'property-information';
import { toHast } from 'minimark/hast';
import { _ as _export_sfc, b as useRoute, u as useHead, c as useRuntimeConfig } from './server.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-7eIXoFIv.mjs';
import { u as useAsyncData } from './asyncData-14sGL0-c.mjs';
import { q as queryCollection } from './client-BfRTNG13.mjs';
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

const htmlTags = /* @__PURE__ */ new Set([
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "math",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rb",
  "rp",
  "rt",
  "rtc",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "slot",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "svg",
  "table",
  "tbody",
  "td",
  "template",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr"
]);
const TEXT_TAGS = ["p", "h1", "h2", "h3", "h4", "h5", "h6", "li"];
function isTag(vnode, tag) {
  if (vnode.type === tag) {
    return true;
  }
  if (typeof vnode.type === "object" && vnode.type.tag === tag) {
    return true;
  }
  if (vnode.tag === tag) {
    return true;
  }
  return false;
}
function isText(vnode) {
  return isTag(vnode, "text") || isTag(vnode, /* @__PURE__ */ Symbol.for("v-txt"));
}
function nodeChildren(node) {
  if (Array.isArray(node.children) || typeof node.children === "string") {
    return node.children;
  }
  if (typeof node.children?.default === "function") {
    return node.children.default();
  }
  return [];
}
function nodeTextContent(node) {
  if (!node) {
    return "";
  }
  if (Array.isArray(node)) {
    return node.map(nodeTextContent).join("");
  }
  if (isText(node)) {
    return node.value || node.children || "";
  }
  const children = nodeChildren(node);
  if (Array.isArray(children)) {
    return children.map(nodeTextContent).filter(Boolean).join("");
  }
  return "";
}
function unwrap(vnode, tags = []) {
  if (Array.isArray(vnode)) {
    return vnode.flatMap((node) => unwrap(node, tags));
  }
  let result = vnode;
  if (tags.some((tag) => tag === "*" || isTag(vnode, tag))) {
    result = nodeChildren(vnode) || vnode;
    if (!Array.isArray(result) && TEXT_TAGS.some((tag) => isTag(vnode, tag))) {
      result = [result];
    }
  }
  return result;
}
function _flatUnwrap(vnodes, tags = []) {
  vnodes = Array.isArray(vnodes) ? vnodes : [vnodes];
  if (!tags.length) {
    return vnodes;
  }
  return vnodes.flatMap((vnode) => _flatUnwrap(unwrap(vnode, [tags[0]]), tags.slice(1))).filter((vnode) => !(isText(vnode) && nodeTextContent(vnode).trim() === ""));
}
function flatUnwrap(vnodes, tags = []) {
  if (typeof tags === "string") {
    tags = tags.split(/[,\s]/).map((tag) => tag.trim()).filter(Boolean);
  }
  if (!tags.length) {
    return vnodes;
  }
  return _flatUnwrap(vnodes, tags).reduce((acc, item) => {
    if (isText(item)) {
      if (typeof acc[acc.length - 1] === "string") {
        acc[acc.length - 1] += item.children;
      } else {
        acc.push(item.children);
      }
    } else {
      acc.push(item);
    }
    return acc;
  }, []);
}
function pick(obj, keys) {
  return keys.reduce((acc, key) => {
    const value = get(obj, key);
    if (value !== void 0) {
      acc[key] = value;
    }
    return acc;
  }, {});
}
function get(obj, key) {
  return key.split(".").reduce((acc, k) => acc && acc[k], obj);
}
const DEFAULT_SLOT = "default";
const rxOn = /^@|^v-on:/;
const rxBind = /^:|^v-bind:/;
const rxModel = /^v-model/;
const nativeInputs = ["select", "textarea", "input"];
const specialParentTags = /* @__PURE__ */ new Set(["math", "svg"]);
const customElements = /* @__PURE__ */ new Set();
const proseComponentMap = Object.fromEntries(["p", "a", "blockquote", "code", "pre", "code", "em", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "img", "ul", "ol", "li", "strong", "table", "thead", "tbody", "td", "th", "tr", "script"].map((t) => [t, `prose-${t}`]));
const dangerousTags = ["script", "base"];
const _sfc_main$2 = defineComponent({
  name: "MDCRenderer",
  props: {
    /**
     * Content to render
     */
    body: {
      type: Object,
      required: true
    },
    /**
     * Document meta data
     */
    data: {
      type: Object,
      default: () => ({})
    },
    /**
     * Class(es) to bind to the component
     */
    class: {
      type: [String, Object],
      default: void 0
    },
    /**
     * Root tag to use for rendering
     */
    tag: {
      type: [String, Boolean],
      default: void 0
    },
    /**
     * Whether or not to render Prose components instead of HTML tags
     */
    prose: {
      type: Boolean,
      default: void 0
    },
    /**
     * The map of custom components to use for rendering.
     */
    components: {
      type: Object,
      default: () => ({})
    },
    /**
     * Tags to unwrap separated by spaces
     * Example: 'ul li'
     */
    unwrap: {
      type: [Boolean, String],
      default: false
    }
  },
  async setup(props) {
    const app = getCurrentInstance()?.appContext?.app;
    const $nuxt = app?.$nuxt;
    const route = $nuxt?.$route || $nuxt?._route;
    const { mdc } = $nuxt?.$config?.public || {};
    const customElementTags = mdc?.components?.customElements || mdc?.components?.custom;
    if (customElementTags) {
      customElementTags.forEach((tag) => customElements.add(tag));
    }
    const tags = computed(() => ({
      ...mdc?.components?.prose && props.prose !== false ? proseComponentMap : {},
      ...mdc?.components?.map || {},
      ...toRaw(props.data?.mdc?.components || {}),
      ...props.components
    }));
    const contentKey = computed(() => {
      const components = (props.body?.children || []).map((n) => n.tag || n.type).filter((t) => !ignoreTag(t));
      return Array.from(new Set(components)).sort().join(".");
    });
    const runtimeData = reactive({
      ...props.data
    });
    watch(() => props.data, (newData) => {
      Object.assign(runtimeData, newData);
    });
    await resolveContentComponents(props.body, { tags: tags.value });
    function updateRuntimeData(code, value) {
      const lastIndex = code.split(".").length - 1;
      return code.split(".").reduce((o, k, i) => {
        if (i == lastIndex && o) {
          o[k] = value;
          return o[k];
        }
        return typeof o === "object" ? o[k] : void 0;
      }, runtimeData);
    }
    return { tags, contentKey, route, runtimeData, updateRuntimeData };
  },
  render(ctx) {
    const { tags, tag, body, data, contentKey, route, unwrap: unwrap2, runtimeData, updateRuntimeData } = ctx;
    if (!body) {
      return null;
    }
    const meta = { ...data, tags, $route: route, runtimeData, updateRuntimeData };
    const component = tag !== false ? resolveComponentInstance(tag || meta.component?.name || meta.component || "div") : void 0;
    return component ? h(component, { ...meta.component?.props, class: ctx.class, ...this.$attrs, key: contentKey }, { default: defaultSlotRenderer }) : defaultSlotRenderer?.();
    function defaultSlotRenderer() {
      const defaultSlot = _renderSlots(body, h, { documentMeta: meta, parentScope: meta, resolveComponent: resolveComponentInstance });
      if (!defaultSlot?.default) {
        return null;
      }
      if (unwrap2) {
        return flatUnwrap(
          defaultSlot.default(),
          typeof unwrap2 === "string" ? unwrap2.split(" ") : ["*"]
        );
      }
      return defaultSlot.default();
    }
  }
});
function _renderNode(node, h2, options, keyInParent) {
  const { documentMeta, parentScope, resolveComponent: resolveComponent2 } = options;
  if (node.type === "text") {
    return h2(Text, node.value);
  }
  if (node.type === "comment") {
    return h2(Comment, null, node.value);
  }
  const originalTag = node.tag;
  const renderTag = findMappedTag(node, documentMeta.tags);
  if (node.tag === "binding") {
    return renderBinding(node, h2, documentMeta, parentScope);
  }
  const _resolveComponent = isUnresolvableTag(renderTag) ? (component2) => component2 : resolveComponent2;
  if (dangerousTags.includes(renderTag)) {
    return h2(
      "pre",
      { class: "mdc-renderer-dangerous-tag" },
      "<" + renderTag + ">" + nodeTextContent(node) + "</" + renderTag + ">"
    );
  }
  const component = _resolveComponent(renderTag);
  if (typeof component === "object") {
    component.tag = originalTag;
  }
  const props = propsToData(node, documentMeta);
  if (keyInParent) {
    props.key = keyInParent;
  }
  return h2(
    component,
    props,
    _renderSlots(
      node,
      h2,
      {
        documentMeta,
        parentScope: { ...parentScope, ...props },
        resolveComponent: _resolveComponent
      }
    )
  );
}
function _renderSlots(node, h2, options) {
  const { documentMeta, parentScope, resolveComponent: resolveComponent2 } = options;
  const children = node.children || [];
  const slotNodes = children.reduce((data, node2) => {
    if (!isTemplate(node2)) {
      data[DEFAULT_SLOT].children.push(node2);
      return data;
    }
    const slotName = getSlotName(node2);
    data[slotName] = data[slotName] || { props: {}, children: [] };
    if (node2.type === "element") {
      data[slotName].props = node2.props;
      data[slotName].children.push(...node2.children || []);
    }
    return data;
  }, {
    [DEFAULT_SLOT]: { props: {}, children: [] }
  });
  const slots = Object.entries(slotNodes).reduce((slots2, [name, { props, children: children2 }]) => {
    if (!children2.length) {
      return slots2;
    }
    slots2[name] = (data = {}) => {
      const scopedProps = pick(data, Object.keys(props || {}));
      let vNodes = children2.map((child, index) => {
        return _renderNode(
          child,
          h2,
          {
            documentMeta,
            parentScope: { ...parentScope, ...scopedProps },
            resolveComponent: resolveComponent2
          },
          String(child.props?.key || index)
        );
      });
      if (props?.unwrap) {
        vNodes = flatUnwrap(vNodes, props.unwrap);
      }
      return mergeTextNodes(vNodes);
    };
    return slots2;
  }, {});
  return slots;
}
function renderBinding(node, h2, documentMeta, parentScope = {}) {
  const data = {
    ...documentMeta.runtimeData,
    ...parentScope,
    $document: documentMeta,
    $doc: documentMeta
  };
  const splitter = /\.|\[(\d+)\]/;
  const keys = node.props?.value.trim().split(splitter).filter(Boolean);
  const value = keys.reduce((data2, key) => {
    if (data2 && key in data2) {
      if (typeof data2[key] === "function") {
        return data2[key]();
      } else {
        return data2[key];
      }
    }
    return void 0;
  }, data);
  const defaultValue = node.props?.defaultValue;
  return h2(Text, value ?? defaultValue ?? "");
}
function propsToData(node, documentMeta) {
  const { tag = "", props = {} } = node;
  return Object.keys(props).reduce(function(data, key) {
    if (key === "__ignoreMap") {
      return data;
    }
    const value = props[key];
    if (rxModel.test(key)) {
      return propsToDataRxModel(key, value, data, documentMeta, { native: nativeInputs.includes(tag) });
    }
    if (key === "v-bind") {
      return propsToDataVBind(key, value, data, documentMeta);
    }
    if (rxOn.test(key)) {
      return propsToDataRxOn(key, value, data, documentMeta);
    }
    if (rxBind.test(key)) {
      return propsToDataRxBind(key, value, data, documentMeta);
    }
    const { attribute } = find(html, key);
    if (Array.isArray(value) && value.every((v) => typeof v === "string")) {
      data[attribute] = value.join(" ");
      return data;
    }
    data[attribute] = value;
    return data;
  }, {});
}
function propsToDataRxModel(key, value, data, documentMeta, { native }) {
  const propName = key.match(/^v-model:([^=]+)/)?.[1] || "modelValue";
  const field = native ? "value" : propName;
  const event = native ? "onInput" : `onUpdate:${propName}`;
  data[field] = evalInContext(value, documentMeta.runtimeData);
  data[event] = (e) => {
    documentMeta.updateRuntimeData(value, native ? e.target?.value : e);
  };
  return data;
}
function propsToDataVBind(_key, value, data, documentMeta) {
  const val = evalInContext(value, documentMeta);
  data = Object.assign(data, val);
  return data;
}
function propsToDataRxOn(key, value, data, documentMeta) {
  key = key.replace(rxOn, "");
  data.on = data.on || {};
  data.on[key] = () => evalInContext(value, documentMeta);
  return data;
}
function propsToDataRxBind(key, value, data, documentMeta) {
  key = key.replace(rxBind, "");
  data[key] = evalInContext(value, documentMeta);
  return data;
}
const resolveComponentInstance = (component) => {
  if (typeof component === "string") {
    if (ignoreTag(component)) {
      return component;
    }
    const _component = resolveComponent(pascalCase(component), false);
    if (!component || _component?.name === "AsyncComponentWrapper") {
      return _component;
    }
    if (typeof _component === "string") {
      return _component;
    }
    if ("setup" in _component) {
      return defineAsyncComponent(() => new Promise((resolve) => resolve(_component)));
    }
    return _component;
  }
  return component;
};
function evalInContext(code, context) {
  const result = code.split(".").reduce((o, k) => typeof o === "object" ? o[k] : void 0, context);
  return typeof result === "undefined" ? destr(code) : result;
}
function getSlotName(node) {
  let name = "";
  for (const propName of Object.keys(node.props || {})) {
    if (!propName.startsWith("#") && !propName.startsWith("v-slot:")) {
      continue;
    }
    name = propName.split(/[:#]/, 2)[1];
    break;
  }
  return name || DEFAULT_SLOT;
}
function isTemplate(node) {
  return node.tag === "template";
}
function isUnresolvableTag(tag) {
  return specialParentTags.has(tag);
}
function mergeTextNodes(nodes) {
  const mergedNodes = [];
  for (const node of nodes) {
    const previousNode = mergedNodes[mergedNodes.length - 1];
    if (node.type === Text && previousNode?.type === Text) {
      previousNode.children = previousNode.children + node.children;
    } else {
      mergedNodes.push(node);
    }
  }
  return mergedNodes;
}
async function resolveContentComponents(body, meta) {
  if (!body) {
    return;
  }
  const components = Array.from(new Set(loadComponents(body, meta)));
  await Promise.all(components.map(async (c) => {
    if (c?.render || c?.ssrRender || c?.__ssrInlineRender) {
      return;
    }
    const resolvedComponent = resolveComponentInstance(c);
    if (resolvedComponent?.__asyncLoader && !resolvedComponent.__asyncResolved) {
      await resolvedComponent.__asyncLoader();
    }
  }));
  function loadComponents(node, documentMeta) {
    const tag = node.tag;
    if (node.type === "text" || tag === "binding" || node.type === "comment") {
      return [];
    }
    const renderTag = findMappedTag(node, documentMeta.tags);
    if (isUnresolvableTag(renderTag)) {
      return [];
    }
    const components2 = [];
    if (node.type !== "root" && !ignoreTag(renderTag)) {
      components2.push(renderTag);
    }
    for (const child of node.children || []) {
      components2.push(...loadComponents(child, documentMeta));
    }
    return components2;
  }
}
function findMappedTag(node, tags) {
  const tag = node.tag;
  if (!tag || typeof node.props?.__ignoreMap !== "undefined") {
    return tag;
  }
  return tags[tag] || tags[pascalCase(tag)] || tags[kebabCase(node.tag)] || tag;
}
function ignoreTag(tag) {
  const isCustomEl = typeof tag === "string" ? customElements.has(tag) : false;
  return isCustomEl || htmlTags.has(tag);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/.pnpm/@nuxtjs+mdc@0.20.1_magicast@0.5.2/node_modules/@nuxtjs/mdc/dist/runtime/components/MDCRenderer.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const globalComponents = ["ProseA", "ProseBlockquote", "ProseCode", "ProseEm", "ProseH1", "ProseH2", "ProseH3", "ProseH4", "ProseH5", "ProseH6", "ProseHr", "ProseImg", "ProseLi", "ProseOl", "ProseP", "ProsePre", "ProseScript", "ProseStrong", "ProseTable", "ProseTbody", "ProseTd", "ProseTh", "ProseThead", "ProseTr", "ProseUl"];
const localComponents = [];
const virtual_nuxt__2FVolumes_2Fdata_2FUsers_2Fsaisaia_2FDocuments_2Fstudy_2FnuxtBlog_2Fnode_modules_2F_cache_2Fnuxt_2F_nuxt_2Fcontent_2Fcomponents = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  globalComponents,
  localComponents
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1 = {
  __name: "ContentRenderer",
  __ssrInlineRender: true,
  props: {
    /**
     * Content to render
     */
    value: {
      type: Object,
      required: true
    },
    /**
     * Render only the excerpt
     */
    excerpt: {
      type: Boolean,
      default: false
    },
    /**
     * Root tag to use for rendering
     */
    tag: {
      type: String,
      default: "div"
    },
    /**
     * The map of custom components to use for rendering.
     */
    components: {
      type: Object,
      default: () => ({})
    },
    data: {
      type: Object,
      default: () => ({})
    },
    /**
     * Whether or not to render Prose components instead of HTML tags
     */
    prose: {
      type: Boolean,
      default: void 0
    },
    /**
     * Root tag to use for rendering
     */
    class: {
      type: [String, Object],
      default: void 0
    },
    /**
     * Tags to unwrap separated by spaces
     * Example: 'ul li'
     */
    unwrap: {
      type: [Boolean, String],
      default: false
    }
  },
  setup(__props) {
    const renderFunctions = ["render", "ssrRender", "__ssrInlineRender"];
    const props = __props;
    const debug = globalThis._importMeta_.preview;
    const body = computed(() => {
      let body2 = props.value.body || props.value;
      if (props.excerpt && props.value.excerpt) {
        body2 = props.value.excerpt;
      }
      if (body2.type === "minimal" || body2.type === "minimark") {
        return toHast({ type: "minimark", value: body2.value });
      }
      return body2;
    });
    const isEmpty = computed(() => !body.value?.children?.length);
    const data = computed(() => {
      const { body: body2, excerpt, ...data2 } = props.value;
      return {
        ...data2,
        ...props.data
      };
    });
    const proseComponentMap2 = Object.fromEntries(["p", "a", "blockquote", "code", "pre", "code", "em", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "img", "ul", "ol", "li", "strong", "table", "thead", "tbody", "td", "th", "tr", "script"].map((t) => [t, `prose-${t}`]));
    const { mdc } = useRuntimeConfig().public || {};
    const propsDataMDC = computed(() => props.data.mdc);
    const tags = computed(() => ({
      ...mdc?.components?.prose && props.prose !== false ? proseComponentMap2 : {},
      ...mdc?.components?.map || {},
      ...toRaw(propsDataMDC.value?.components || {}),
      ...props.components
    }));
    const componentsMap = computed(() => {
      return body.value ? resolveContentComponents2(body.value, { tags: tags.value }) : {};
    });
    function resolveVueComponent(component) {
      let _component = component;
      if (typeof component === "string") {
        if (htmlTags.has(component)) {
          return component;
        }
        if (globalComponents.includes(pascalCase(component))) {
          _component = resolveComponent(component, false);
        } else if (localComponents.includes(pascalCase(component))) {
          const loader = () => {
            return Promise.resolve().then(() => virtual_nuxt__2FVolumes_2Fdata_2FUsers_2Fsaisaia_2FDocuments_2Fstudy_2FnuxtBlog_2Fnode_modules_2F_cache_2Fnuxt_2F_nuxt_2Fcontent_2Fcomponents).then((m) => {
              const comp = m[pascalCase(component)];
              return comp ? comp() : void 0;
            });
          };
          _component = defineAsyncComponent(loader);
        }
        if (typeof _component === "string") {
          return _component;
        }
      }
      if (!_component) {
        return _component;
      }
      const componentObject = _component;
      if ("__asyncLoader" in componentObject) {
        return componentObject;
      }
      if ("setup" in componentObject) {
        return defineAsyncComponent(() => Promise.resolve(componentObject));
      }
      return componentObject;
    }
    function resolveContentComponents2(body2, meta) {
      if (!body2) {
        return;
      }
      const components = Array.from(new Set(loadComponents(body2, meta)));
      const result = {};
      for (const [tag, component] of components) {
        if (result[tag]) {
          continue;
        }
        if (typeof component === "object" && renderFunctions.some((fn) => Object.hasOwnProperty.call(component, fn))) {
          result[tag] = component;
          continue;
        }
        result[tag] = resolveVueComponent(component);
      }
      return result;
    }
    function loadComponents(node, documentMeta) {
      const tag = node.tag;
      if (node.type === "text" || tag === "binding" || node.type === "comment") {
        return [];
      }
      const renderTag = findMappedTag2(node, documentMeta.tags);
      const components2 = [];
      if (node.type !== "root" && !htmlTags.has(renderTag)) {
        components2.push([tag, renderTag]);
      }
      for (const child of node.children || []) {
        components2.push(...loadComponents(child, documentMeta));
      }
      return components2;
    }
    function findMappedTag2(node, tags2) {
      const tag = node.tag;
      if (!tag || typeof node.props?.__ignoreMap !== "undefined") {
        return tag;
      }
      return tags2[tag] || tags2[pascalCase(tag)] || tags2[kebabCase(node.tag)] || tag;
    }
    return (_ctx, _push, _parent, _attrs) => {
      if (!isEmpty.value) {
        _push(ssrRenderComponent(_sfc_main$2, mergeProps({
          body: body.value,
          data: data.value,
          class: props.class,
          tag: props.tag,
          prose: props.prose,
          unwrap: props.unwrap,
          components: componentsMap.value,
          "data-content-id": unref(debug) ? __props.value.id : void 0
        }, _attrs), null, _parent));
      } else {
        ssrRenderSlot(_ctx.$slots, "empty", {
          body: body.value,
          data: data.value,
          dataContentId: unref(debug) ? __props.value.id : void 0
        }, null, _push, _parent);
      }
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/.pnpm/@nuxt+content@3.11.2_better-sqlite3@12.6.2_drizzle-orm@0.45.1_@types+better-sqlite3@7.6_08ae5c5551f1eadb33f439aa93a37f06/node_modules/@nuxt/content/dist/runtime/components/ContentRenderer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$1, { __name: "ContentRenderer" });
const _sfc_main = {
  __name: "[...slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const { data: doc } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(`content-${route.path}`, () => queryCollection("content").path(route.path).first())), __temp = await __temp, __restore(), __temp);
    const { data: surround } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(`surround-${route.path}`, async () => {
      const posts = await queryCollection("content").order("date", "DESC").select("title", "path").all();
      const index = posts.findIndex((p) => p.path === route.path);
      if (index === -1) return [null, null];
      return [
        posts[index + 1] || null,
        posts[index - 1] || null
      ];
    })), __temp = await __temp, __restore(), __temp);
    const [prev, next] = surround.value || [];
    const tocItems = computed(() => {
      if (!doc.value?.body?.toc?.links) return [];
      const items = [
        { id: "introduction", text: "引言" },
        { id: "core-concept", text: "核心概念" },
        { id: "features", text: "特性" },
        { id: "author", text: "关于作者" },
        { id: "discussion", text: "讨论" }
      ];
      return items;
    });
    const activeSection = ref("introduction");
    const comments = [
      {
        id: 1,
        author: "Sarah Chen",
        time: "2 天前",
        content: "这篇文章对现代打包器的解释非常清晰！特别是关于零延迟开发的部分，让我对 Vite 的架构有了更深的理解。"
      },
      {
        id: 2,
        author: "Marcus Holloway",
        time: "1 周前",
        content: "关于智能缓存的策略很有意思。我在我们的项目中尝试了类似的方案，确实能显著提升构建速度。"
      }
    ];
    function formatDate(date) {
      if (!date) return "";
      return new Date(date).toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "short",
        day: "numeric",
        timeZone: "UTC"
      });
    }
    useHead(() => ({
      title: doc.value?.title,
      meta: [
        { name: "description", content: doc.value?.description },
        { property: "og:title", content: doc.value?.title },
        { property: "og:description", content: doc.value?.description },
        { name: "twitter:card", content: "summary_large_image" }
      ]
    }));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ContentRenderer = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<article${ssrRenderAttrs(mergeProps({ class: "pt-24 min-h-screen" }, _attrs))} data-v-657651b9><div class="max-w-page mx-auto px-8 pb-20" data-v-657651b9><div class="flex gap-12" data-v-657651b9><aside class="w-56 flex-shrink-0 hidden lg:block" data-v-657651b9><div class="sticky top-24" data-v-657651b9><h3 class="text-xs font-semibold text-text-muted mb-4 uppercase tracking-wider" data-v-657651b9> 目录 </h3><nav class="space-y-1" data-v-657651b9><!--[-->`);
      ssrRenderList(unref(tocItems), (item) => {
        _push(`<a${ssrRenderAttr("href", `#${item.id}`)} class="${ssrRenderClass([unref(activeSection) === item.id ? "text-accent-purple bg-accent-purple/10" : "text-text-secondary hover:text-white", "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all group"])}" data-v-657651b9><span class="${ssrRenderClass([unref(activeSection) === item.id ? "bg-accent-purple" : "bg-text-muted group-hover:bg-text-secondary", "w-1.5 h-1.5 rounded-full transition-colors"])}" data-v-657651b9></span><span data-v-657651b9>${ssrInterpolate(item.text)}</span></a>`);
      });
      _push(`<!--]--></nav></div></aside><div class="flex-1 min-w-0 max-w-3xl" data-v-657651b9><header class="mb-12" data-v-657651b9><div class="flex items-center gap-3 mb-6" data-v-657651b9><!--[-->`);
      ssrRenderList(unref(doc).tags?.slice(0, 2), (tag) => {
        _push(`<span class="px-3 py-1 text-xs rounded-full bg-accent-purple/20 text-accent-purple border border-accent-purple/30" data-v-657651b9>${ssrInterpolate(tag)}</span>`);
      });
      _push(`<!--]--><span class="text-text-muted text-xs" data-v-657651b9>${ssrInterpolate(unref(doc).readingTime || "12 分钟阅读")}</span></div><h1 class="text-4xl sm:text-5xl font-bold text-white mb-8 leading-tight" data-v-657651b9> 重塑现代<br data-v-657651b9><span class="text-accent-purple" data-v-657651b9>打包器架构。</span></h1><div class="flex items-center justify-between pt-6 border-t border-[#2a2435]" data-v-657651b9><div class="flex items-center gap-3" data-v-657651b9><div class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold overflow-hidden" data-v-657651b9><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="头像" class="w-full h-full object-cover" data-v-657651b9></div><div data-v-657651b9><div class="text-white text-sm font-medium" data-v-657651b9>${ssrInterpolate(unref(doc).author || "Alex Rivera")}</div><div class="text-text-muted text-xs" data-v-657651b9>核心贡献者</div></div></div><div class="text-right" data-v-657651b9><div class="text-white text-sm" data-v-657651b9>${ssrInterpolate(formatDate(unref(doc).date))}</div><div class="text-text-muted text-xs" data-v-657651b9>发布于 ${ssrInterpolate(unref(doc).category || "Technical")}</div></div></div></header><div class="mb-12 rounded-xl overflow-hidden bg-[#1a1625] border border-[#2a2435]" data-v-657651b9><div class="aspect-[21/9] relative" data-v-657651b9><svg class="w-full h-full" viewBox="0 0 800 340" preserveAspectRatio="xMidYMid slice" data-v-657651b9><defs data-v-657651b9><radialGradient id="articleNodeGlow" cx="50%" cy="50%" r="50%" data-v-657651b9><stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.4" data-v-657651b9></stop><stop offset="100%" stop-color="#8b5cf6" stop-opacity="0" data-v-657651b9></stop></radialGradient></defs><g stroke="#8b5cf6" stroke-width="0.5" opacity="0.2" data-v-657651b9><line x1="100" y1="80" x2="200" y2="120" data-v-657651b9></line><line x1="200" y1="120" x2="300" y2="80" data-v-657651b9></line><line x1="300" y1="80" x2="400" y2="150" data-v-657651b9></line><line x1="400" y1="150" x2="500" y2="100" data-v-657651b9></line><line x1="500" y1="100" x2="600" y2="180" data-v-657651b9></line><line x1="150" y1="200" x2="250" y2="180" data-v-657651b9></line><line x1="250" y1="180" x2="350" y2="220" data-v-657651b9></line><line x1="350" y1="220" x2="450" y2="200" data-v-657651b9></line><line x1="450" y1="200" x2="550" y2="250" data-v-657651b9></line><line x1="80" y1="280" x2="180" y2="250" data-v-657651b9></line><line x1="180" y1="250" x2="280" y2="300" data-v-657651b9></line><line x1="280" y1="300" x2="380" y2="280" data-v-657651b9></line><line x1="380" y1="280" x2="480" y2="320" data-v-657651b9></line><line x1="120" y1="150" x2="180" y2="250" data-v-657651b9></line><line x1="250" y1="180" x2="300" y2="80" data-v-657651b9></line><line x1="350" y1="220" x2="400" y2="150" data-v-657651b9></line><line x1="450" y1="200" x2="500" y2="100" data-v-657651b9></line></g><g fill="#8b5cf6" data-v-657651b9><circle cx="100" cy="80" r="3" opacity="0.8" data-v-657651b9></circle><circle cx="200" cy="120" r="4" opacity="0.9" data-v-657651b9></circle><circle cx="300" cy="80" r="3" opacity="0.7" data-v-657651b9></circle><circle cx="400" cy="150" r="5" opacity="1" data-v-657651b9></circle><circle cx="500" cy="100" r="3" opacity="0.6" data-v-657651b9></circle><circle cx="600" cy="180" r="4" opacity="0.8" data-v-657651b9></circle><circle cx="150" cy="200" r="3" opacity="0.7" data-v-657651b9></circle><circle cx="250" cy="180" r="4" opacity="0.9" data-v-657651b9></circle><circle cx="350" cy="220" r="3" opacity="0.8" data-v-657651b9></circle><circle cx="450" cy="200" r="4" opacity="0.7" data-v-657651b9></circle><circle cx="550" cy="250" r="3" opacity="0.6" data-v-657651b9></circle><circle cx="80" cy="280" r="3" opacity="0.6" data-v-657651b9></circle><circle cx="180" cy="250" r="5" opacity="1" data-v-657651b9></circle><circle cx="280" cy="300" r="3" opacity="0.7" data-v-657651b9></circle><circle cx="380" cy="280" r="4" opacity="0.8" data-v-657651b9></circle><circle cx="480" cy="320" r="3" opacity="0.6" data-v-657651b9></circle><circle cx="120" cy="150" r="3" opacity="0.5" data-v-657651b9></circle></g><circle cx="400" cy="150" r="40" fill="url(#articleNodeGlow)" opacity="0.6" data-v-657651b9></circle><circle cx="180" cy="250" r="30" fill="url(#articleNodeGlow)" opacity="0.5" data-v-657651b9></circle></svg></div></div><div class="prose prose-lg prose-invert max-w-none" data-v-657651b9>`);
      _push(ssrRenderComponent(_component_ContentRenderer, { value: unref(doc) }, null, _parent));
      _push(`</div><div id="features" class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4" data-v-657651b9><div class="p-6 rounded-xl bg-[#1a1625] border border-[#2a2435]" data-v-657651b9><div class="w-10 h-10 rounded-lg bg-accent-purple/20 flex items-center justify-center mb-4" data-v-657651b9><svg class="w-5 h-5 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-657651b9><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" data-v-657651b9></path></svg></div><h3 class="text-lg font-semibold text-white mb-2" data-v-657651b9>即时启动</h3><p class="text-text-secondary text-sm" data-v-657651b9> 通过延迟加载和智能缓存，实现毫秒级开发服务器启动时间。 </p></div><div class="p-6 rounded-xl bg-[#1a1625] border border-[#2a2435]" data-v-657651b9><div class="w-10 h-10 rounded-lg bg-accent-purple/20 flex items-center justify-center mb-4" data-v-657651b9><svg class="w-5 h-5 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-657651b9><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-v-657651b9></path></svg></div><h3 class="text-lg font-semibold text-white mb-2" data-v-657651b9>智能缓存</h3><p class="text-text-secondary text-sm" data-v-657651b9> 细粒度的模块级缓存，在维护正确性的同时最大化缓存命中率。 </p></div></div><div id="author" class="mt-12 p-6 rounded-xl bg-[#1a1625] border border-[#2a2435]" data-v-657651b9><div class="flex items-start gap-4" data-v-657651b9><div class="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold overflow-hidden flex-shrink-0" data-v-657651b9><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="头像" class="w-full h-full object-cover" data-v-657651b9></div><div class="flex-1" data-v-657651b9><div class="text-xs text-text-muted mb-1" data-v-657651b9>作者</div><h3 class="text-lg font-semibold text-white mb-2" data-v-657651b9>Alex Rivera</h3><p class="text-text-secondary text-sm leading-relaxed" data-v-657651b9> 软件架构师，专注于构建工具和开发者体验设计。目前在 VOIDZERO 领导工具链开发，热衷于创造高性能的开发工具。 </p><div class="flex items-center gap-4 mt-4" data-v-657651b9><a href="#" class="text-xs text-accent-purple hover:text-white transition-colors" data-v-657651b9>Twitter</a><a href="#" class="text-xs text-accent-purple hover:text-white transition-colors" data-v-657651b9>GitHub</a><a href="#" class="text-xs text-accent-purple hover:text-white transition-colors" data-v-657651b9>个人网站</a></div></div></div></div><div id="discussion" class="mt-12" data-v-657651b9><div class="flex items-center justify-between mb-6" data-v-657651b9><h3 class="text-xl font-bold text-white" data-v-657651b9> 讨论 <span class="text-text-muted text-base font-normal" data-v-657651b9>(12)</span></h3><button class="px-4 py-2 rounded-lg bg-accent-purple text-white text-sm font-medium hover:bg-accent-purple/90 transition-all" data-v-657651b9> 加入讨论 </button></div><div class="space-y-4" data-v-657651b9><!--[-->`);
      ssrRenderList(comments, (comment) => {
        _push(`<div class="p-4 rounded-xl bg-[#1a1625] border border-[#2a2435]" data-v-657651b9><div class="flex items-start gap-3" data-v-657651b9><div class="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold overflow-hidden flex-shrink-0" data-v-657651b9>${ssrInterpolate(comment.author.charAt(0))}</div><div class="flex-1" data-v-657651b9><div class="flex items-center gap-2 mb-1" data-v-657651b9><span class="text-white text-sm font-medium" data-v-657651b9>${ssrInterpolate(comment.author)}</span><span class="text-text-muted text-xs" data-v-657651b9>${ssrInterpolate(comment.time)}</span></div><p class="text-text-secondary text-sm" data-v-657651b9>${ssrInterpolate(comment.content)}</p></div></div></div>`);
      });
      _push(`<!--]--></div></div><div class="mt-12 pt-8 border-t border-[#2a2435]" data-v-657651b9><div class="flex flex-col sm:flex-row items-center justify-between gap-4" data-v-657651b9>`);
      if (unref(prev)) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: unref(prev).path,
          class: "flex items-center gap-3 text-text-secondary hover:text-accent-purple transition-colors group w-full sm:w-auto"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-657651b9${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" data-v-657651b9${_scopeId}></path></svg><div class="text-left" data-v-657651b9${_scopeId}><div class="text-xs text-text-muted" data-v-657651b9${_scopeId}>上一篇</div><div class="font-medium text-white text-sm" data-v-657651b9${_scopeId}>${ssrInterpolate(unref(prev).title)}</div></div>`);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  class: "w-5 h-5 transform group-hover:-translate-x-1 transition-transform",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M15 19l-7-7 7-7"
                  })
                ])),
                createVNode("div", { class: "text-left" }, [
                  createVNode("div", { class: "text-xs text-text-muted" }, "上一篇"),
                  createVNode("div", { class: "font-medium text-white text-sm" }, toDisplayString(unref(prev).title), 1)
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<div class="w-full sm:w-auto" data-v-657651b9></div>`);
      }
      if (unref(next)) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: unref(next).path,
          class: "flex items-center gap-3 text-text-secondary hover:text-accent-purple transition-colors text-right group w-full sm:w-auto"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="text-right" data-v-657651b9${_scopeId}><div class="text-xs text-text-muted" data-v-657651b9${_scopeId}>下一篇</div><div class="font-medium text-white text-sm" data-v-657651b9${_scopeId}>${ssrInterpolate(unref(next).title)}</div></div><svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-657651b9${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-v-657651b9${_scopeId}></path></svg>`);
            } else {
              return [
                createVNode("div", { class: "text-right" }, [
                  createVNode("div", { class: "text-xs text-text-muted" }, "下一篇"),
                  createVNode("div", { class: "font-medium text-white text-sm" }, toDisplayString(unref(next).title), 1)
                ]),
                (openBlock(), createBlock("svg", {
                  class: "w-5 h-5 transform group-hover:translate-x-1 transition-transform",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M9 5l7 7-7 7"
                  })
                ]))
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div></div></article>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/posts/[...slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ____slug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-657651b9"]]);

export { ____slug_ as default };
//# sourceMappingURL=_...slug_-D5-_soYY.mjs.map
