import { V as executeAsync, a2 as klona, a3 as parse, a4 as getRequestHeader, G as destr, a5 as isEqual, x as setCookie, g as getCookie, a6 as deleteCookie } from '../nitro/nitro.mjs';
import { g as defineNuxtRouteMiddleware, n as navigateTo, e as useNuxtApp, f as useRequestEvent } from './server.mjs';
import { ref } from 'vue';
import { u as useFetch } from './fetch-CHkX7ai1.mjs';
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
import 'vue/server-renderer';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import '@vue/shared';
import './asyncData-D5CYTES7.mjs';
import 'perfect-debounce';

const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => {
    const decoded = decodeURIComponent(val);
    const parsed = destr(decoded);
    if (typeof parsed === "number" && (!Number.isFinite(parsed) || String(parsed) !== decoded)) {
      return decoded;
    }
    return parsed;
  },
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  const opts = { ...CookieDefaults, ..._opts };
  opts.filter ??= (key) => key === name;
  const cookies = readRawCookies(opts) || {};
  let delay;
  if (opts.maxAge !== void 0) {
    delay = opts.maxAge * 1e3;
  } else if (opts.expires) {
    delay = opts.expires.getTime() - Date.now();
  }
  const hasExpired = delay !== void 0 && delay <= 0;
  const cookieValue = klona(hasExpired ? void 0 : cookies[name] ?? opts.default?.());
  const cookie = ref(cookieValue);
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (opts.readonly || isEqual(cookie.value, cookies[name])) {
        return;
      }
      nuxtApp._cookies ||= {};
      if (name in nuxtApp._cookies) {
        if (isEqual(cookie.value, nuxtApp._cookies[name])) {
          return;
        }
      }
      nuxtApp._cookies[name] = cookie.value;
      writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:error", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  {
    return parse(getRequestHeader(useRequestEvent(), "cookie") || "", opts);
  }
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    if (value !== null && value !== void 0) {
      return setCookie(event, name, value, opts);
    }
    if (getCookie(event, name) !== void 0) {
      return deleteCookie(event, name, opts);
    }
  }
}
const auth = defineNuxtRouteMiddleware(async () => {
  let __temp, __restore;
  const tokenCookie = useCookie("auth_token");
  const token = tokenCookie.value;
  if (!token) {
    return navigateTo("/admin/login");
  }
  try {
    const { data, error } = ([__temp, __restore] = executeAsync(() => useFetch(
      "/api/auth/me",
      {
        headers: { Authorization: `Bearer ${token}` }
      },
      "$hU0GDvWRIT"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    if (error.value || !data.value) {
      tokenCookie.value = null;
      return navigateTo("/admin/login");
    }
  } catch {
    tokenCookie.value = null;
    return navigateTo("/admin/login");
  }
});

export { auth as default };
//# sourceMappingURL=auth-CK2Pfb_h.mjs.map
