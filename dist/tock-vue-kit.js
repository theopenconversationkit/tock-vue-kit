var ks = Object.defineProperty;
var Ss = (e, t, s) => t in e ? ks(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var ht = (e, t, s) => (Ss(e, typeof t != "symbol" ? t + "" : t, s), s);
import { effectScope as Jt, ref as R, markRaw as Yt, hasInjectionContext as Es, inject as Xt, watch as Cs, reactive as As, isRef as Oe, isReactive as Zt, toRaw as Ds, getCurrentScope as Ns, onScopeDispose as Is, nextTick as xs, toRefs as ws, computed as es, defineComponent as K, openBlock as d, createElementBlock as y, unref as l, normalizeClass as he, createCommentVNode as T, normalizeStyle as ce, createTextVNode as Le, toDisplayString as M, createElementVNode as N, withModifiers as _s, withDirectives as Os, vModelText as Ls, Fragment as pe, renderList as ut, createBlock as te, withCtx as Rs, createVNode as wt, onMounted as Hs, createApp as Ps } from "vue";
var Ms = !1;
/*!
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */
let ts;
const dt = (e) => ts = e, ss = (
  /* istanbul ignore next */
  Symbol()
);
function bt(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var be;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(be || (be = {}));
function Bs() {
  const e = Jt(!0), t = e.run(() => R({}));
  let s = [], i = [];
  const n = Yt({
    install(o) {
      dt(n), n._a = o, o.provide(ss, n), o.config.globalProperties.$pinia = n, i.forEach((a) => s.push(a)), i = [];
    },
    use(o) {
      return !this._a && !Ms ? i.push(o) : s.push(o), this;
    },
    _p: s,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: t
  });
  return n;
}
const ns = () => {
};
function Bt(e, t, s, i = ns) {
  e.push(t);
  const n = () => {
    const o = e.indexOf(t);
    o > -1 && (e.splice(o, 1), i());
  };
  return !s && Ns() && Is(n), n;
}
function ue(e, ...t) {
  e.slice().forEach((s) => {
    s(...t);
  });
}
const Us = (e) => e();
function vt(e, t) {
  e instanceof Map && t instanceof Map && t.forEach((s, i) => e.set(i, s)), e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const s in t) {
    if (!t.hasOwnProperty(s))
      continue;
    const i = t[s], n = e[s];
    bt(n) && bt(i) && e.hasOwnProperty(s) && !Oe(i) && !Zt(i) ? e[s] = vt(n, i) : e[s] = i;
  }
  return e;
}
const js = (
  /* istanbul ignore next */
  Symbol()
);
function zs(e) {
  return !bt(e) || !e.hasOwnProperty(js);
}
const { assign: ie } = Object;
function $s(e) {
  return !!(Oe(e) && e.effect);
}
function qs(e, t, s, i) {
  const { state: n, actions: o, getters: a } = t, r = s.state.value[e];
  let u;
  function f() {
    r || (s.state.value[e] = n ? n() : {});
    const b = ws(s.state.value[e]);
    return ie(b, o, Object.keys(a || {}).reduce((p, h) => (p[h] = Yt(es(() => {
      dt(s);
      const D = s._s.get(e);
      return a[h].call(D, D);
    })), p), {}));
  }
  return u = is(e, f, t, s, i, !0), u;
}
function is(e, t, s = {}, i, n, o) {
  let a;
  const r = ie({ actions: {} }, s), u = {
    deep: !0
    // flush: 'post',
  };
  let f, b, p = [], h = [], D;
  const k = i.state.value[e];
  !o && !k && (i.state.value[e] = {}), R({});
  let g;
  function E(C) {
    let A;
    f = b = !1, typeof C == "function" ? (C(i.state.value[e]), A = {
      type: be.patchFunction,
      storeId: e,
      events: D
    }) : (vt(i.state.value[e], C), A = {
      type: be.patchObject,
      payload: C,
      storeId: e,
      events: D
    });
    const z = g = Symbol();
    xs().then(() => {
      g === z && (f = !0);
    }), b = !0, ue(p, A, i.state.value[e]);
  }
  const S = o ? function() {
    const { state: A } = s, z = A ? A() : {};
    this.$patch((W) => {
      ie(W, z);
    });
  } : (
    /* istanbul ignore next */
    ns
  );
  function w() {
    a.stop(), p = [], h = [], i._s.delete(e);
  }
  function _(C, A) {
    return function() {
      dt(i);
      const z = Array.from(arguments), W = [], se = [];
      function me(L) {
        W.push(L);
      }
      function Ce(L) {
        se.push(L);
      }
      ue(h, {
        args: z,
        name: C,
        store: I,
        after: me,
        onError: Ce
      });
      let Y;
      try {
        Y = A.apply(this && this.$id === e ? this : I, z);
      } catch (L) {
        throw ue(se, L), L;
      }
      return Y instanceof Promise ? Y.then((L) => (ue(W, L), L)).catch((L) => (ue(se, L), Promise.reject(L))) : (ue(W, Y), Y);
    };
  }
  const V = {
    _p: i,
    // _s: scope,
    $id: e,
    $onAction: Bt.bind(null, h),
    $patch: E,
    $reset: S,
    $subscribe(C, A = {}) {
      const z = Bt(p, C, A.detached, () => W()), W = a.run(() => Cs(() => i.state.value[e], (se) => {
        (A.flush === "sync" ? b : f) && C({
          storeId: e,
          type: be.direct,
          events: D
        }, se);
      }, ie({}, u, A)));
      return z;
    },
    $dispose: w
  }, I = As(V);
  i._s.set(e, I);
  const O = (i._a && i._a.runWithContext || Us)(() => i._e.run(() => (a = Jt()).run(t)));
  for (const C in O) {
    const A = O[C];
    if (Oe(A) && !$s(A) || Zt(A))
      o || (k && zs(A) && (Oe(A) ? A.value = k[C] : vt(A, k[C])), i.state.value[e][C] = A);
    else if (typeof A == "function") {
      const z = _(C, A);
      O[C] = z, r.actions[C] = A;
    }
  }
  return ie(I, O), ie(Ds(I), O), Object.defineProperty(I, "$state", {
    get: () => i.state.value[e],
    set: (C) => {
      E((A) => {
        ie(A, C);
      });
    }
  }), i._p.forEach((C) => {
    ie(I, a.run(() => C({
      store: I,
      app: i._a,
      pinia: i,
      options: r
    })));
  }), k && o && s.hydrate && s.hydrate(I.$state, k), f = !0, b = !0, I;
}
function Vs(e, t, s) {
  let i, n;
  const o = typeof t == "function";
  typeof e == "string" ? (i = e, n = o ? s : t) : (n = e, i = e.id);
  function a(r, u) {
    const f = Es();
    return r = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    r || (f ? Xt(ss, null) : null), r && dt(r), r = ts, r._s.has(i) || (o ? is(i, t, n, r) : qs(i, n, r)), r._s.get(i);
  }
  return a.$id = i, a;
}
function Ws() {
  const e = Date.now().toString(36), t = Math.random().toString(36).substr(2, 5);
  return (e + t).toUpperCase();
}
const os = Symbol("tockEndpointKey");
var x = /* @__PURE__ */ ((e) => (e.bot = "bot", e.user = "user", e.app = "app", e))(x || {}), P = /* @__PURE__ */ ((e) => (e.message = "message", e.card = "card", e.carousel = "carousel", e.image = "image", e.loader = "loader", e.error = "error", e))(P || {});
function xe(e) {
  return !!(e && typeof e == "object" && !Array.isArray(e));
}
function Tt(e, ...t) {
  if (!t.length)
    return e;
  const s = t.shift();
  if (xe(e) && xe(s))
    for (const i in s)
      xe(s[i]) ? (e[i] || Object.assign(e, { [i]: {} }), Tt(e[i], s[i])) : Object.assign(e, { [i]: s[i] });
  return Tt(e, ...t);
}
const Fs = {
  enabled: {
    title: "Local storage",
    type: "boolean",
    default: !1,
    description: "Retain conversation history in local storage",
    index: 1
  },
  prefix: {
    title: "Local storage prefix",
    type: "string",
    default: void 0,
    description: "Prefix for local storage keys allowing communication with different bots from the same domain",
    index: 1.1,
    conditions: ["localStorage.enabled"]
  },
  maxNumberMessages: {
    title: "Maximum messages",
    type: "number",
    default: 20,
    description: "Maximum number of messages to store in local storage",
    index: 2,
    conditions: ["localStorage.enabled"]
  }
}, Ks = {
  extraHeaders: {
    title: "Extra headers",
    type: "KeyValues",
    default: void 0,
    description: "Additional HTTP header key/value pairs to be supplied in requests. Warning : Tock server configuration required.",
    index: 1
  },
  welcomeMessage: {
    title: "Welcome message",
    type: "string",
    default: void 0,
    description: "Initial bot message to be displayed to the user at startup. It will not be sent to the bot and will be stored in local storage, if any.",
    index: 2
  },
  openingMessage: {
    title: "Opening message",
    type: "string",
    default: void 0,
    description: "Initial user message to be sent to the bot at startup to trigger a welcome sequence. It will not be displayed to the user and will not be stored in local storage, if any.",
    index: 3
  }
}, Qs = {
  messages: {
    hideIfNoMessages: {
      title: "Hide messages if no messages",
      type: "boolean",
      default: !0,
      description: "Hide messages container if there is no messages to display.",
      index: 20
    },
    clearOnNewRequest: {
      title: "Clear on new request",
      type: "boolean",
      default: !1,
      description: "If true, deletes previous messages when a new user request is sent",
      index: 21
    },
    message: {
      hideUserMessages: {
        title: "Hide user messages",
        type: "boolean",
        default: !1,
        description: "If true, user messages are not displayed.",
        index: 22
      },
      header: {
        display: {
          title: "Display header",
          type: "boolean",
          default: !0,
          description: "Display a header above message.",
          index: 1
        },
        avatar: {
          display: {
            title: "Display header avatar",
            type: "boolean",
            default: !0,
            description: "Display an avatar in message header.",
            index: 3,
            conditions: ["preferences.messages.message.header.display"]
          },
          userIcon: {
            title: "Avatar User icon",
            type: "string",
            default: "bi bi-person-fill",
            description: "Class name of the user avatar icon (displayed only if User image is not defined).",
            index: 3.1,
            conditions: ["preferences.messages.message.header.display"]
          },
          userImage: {
            title: "Avatar User image",
            type: "ImageDef",
            default: void 0,
            description: "Image of the user avatar",
            index: 3.2,
            conditions: ["preferences.messages.message.header.display"]
          },
          botIcon: {
            title: "Avatar Bot icon",
            type: "string",
            default: "bi bi-robot",
            description: "Class name of the bot avatar icon (displayed only if Bot image is not defined).",
            index: 3.3,
            conditions: ["preferences.messages.message.header.display"]
          },
          botImage: {
            title: "Avatar Bot image",
            type: "ImageDef",
            default: void 0,
            description: "Image of the bot avatar",
            index: 3.4,
            conditions: ["preferences.messages.message.header.display"]
          }
        },
        label: {
          display: {
            title: "Display header label",
            type: "boolean",
            default: !0,
            description: "Display a label in message header (cf wording.messages.message.header.labelUser and wording.messages.message.header.labelBot for textual content).",
            index: 2,
            conditions: ["preferences.messages.message.header.display"]
          }
        }
      }
    },
    footNotes: {
      display: {
        title: "Display sources",
        type: "boolean",
        default: !0,
        description: "For RAG answers, display the sources used to generate the answer if any.",
        index: 50
      },
      requireSourcesContent: {
        title: "Request textual content of sources",
        type: "boolean",
        default: !1,
        description: "For RAG answers, request the textual content of the source in addition to the source title and link.",
        index: 51,
        conditions: ["preferences.messages.footNotes.display"]
      },
      clampSourceContent: {
        title: "Clamp content of sources",
        type: "boolean",
        default: !0,
        description: "For RAG answers with sources content, truncate the textual source content.",
        index: 52,
        conditions: [
          "preferences.messages.footNotes.display",
          "preferences.messages.footNotes.requireSourcesContent"
        ]
      },
      clampSourceContentNbLines: {
        title: "Number of lines to clamp",
        type: "number",
        default: 2,
        description: "For RAG answers with sources content, number of lines after which to truncate text.",
        index: 53,
        conditions: [
          "preferences.messages.footNotes.display",
          "preferences.messages.footNotes.requireSourcesContent",
          "preferences.messages.footNotes.clampSourceContent"
        ]
      },
      displayOnMessageSide: {
        title: "Display sources on the side of the answer",
        type: "boolean",
        default: !1,
        description: "For RAG responses, any sources are displayed on one side of the message response rather than directly following the response.",
        index: 54,
        conditions: ["preferences.messages.footNotes.display"]
      }
    }
  },
  questionBar: {
    clearTypedCharsOnSubmit: {
      title: "Clear input on submit",
      type: "boolean",
      default: !0,
      description: "Whether or not the question input should be cleared on submit.",
      index: 60
    },
    maxUserInputLength: {
      title: "Max user message length",
      type: "number",
      default: 500,
      description: "Max length of the user input message string",
      index: 61
    },
    clearHistory: {
      display: {
        title: "Show clear history button",
        type: "boolean",
        default: !0,
        description: "Display the control allowing user to clear discussion history and local storage history, if any",
        index: 70
      },
      icon: {
        title: "Clear history button icon",
        type: "string",
        default: "bi bi-trash-fill",
        description: "Class name of the clear history control icon (displayed only if no image is defined)",
        index: 71,
        conditions: ["preferences.questionBar.clearHistory.display"]
      },
      image: {
        title: "Clear history button image",
        type: "ImageDef",
        default: void 0,
        description: "Image of the clearHistory control",
        index: 72,
        conditions: ["preferences.questionBar.clearHistory.display"]
      }
    },
    submit: {
      icon: {
        title: "Submit button icon",
        type: "string",
        default: "bi bi-send-fill",
        description: "Class name of the submit control icon (displayed only if no image is defined)",
        index: 80
      },
      image: {
        title: "Submit button image",
        type: "ImageDef",
        default: void 0,
        description: "Image of the submit control",
        index: 81
      }
    }
  }
}, Gs = {
  messages: {
    message: {
      header: {
        labelUser: {
          title: "Message header user label",
          type: "string",
          default: "You",
          description: void 0
        },
        labelBot: {
          title: "Message header bot label",
          type: "string",
          default: "Bot",
          description: void 0
        }
      },
      footnotes: {
        sources: {
          title: "Footnotes label",
          type: "string",
          default: "Sources:",
          description: void 0
        },
        showMoreLink: {
          title: "Show more link label",
          type: "string",
          default: "> Show more",
          description: void 0
        }
      }
    }
  },
  questionBar: {
    clearHistory: {
      title: "Clear history button label",
      type: "string",
      default: "",
      description: void 0
    },
    clearHistoryAriaLabel: {
      title: "Clear history button Aria label",
      type: "string",
      default: "Clear discussion and history button",
      description: void 0
    },
    input: {
      placeholder: {
        title: "User input placeholder",
        type: "string",
        default: "Ask me a question...",
        description: void 0
      }
    },
    submit: {
      title: "Submit button label",
      type: "string",
      default: "",
      description: void 0
    },
    submitAriaLabel: {
      title: "Submit button Aria label",
      type: "string",
      default: "Submit button",
      description: void 0
    }
  },
  connectionErrorMessage: {
    title: "Connection error message",
    type: "string",
    default: "An unexpected error occured. Please try again later.",
    description: void 0
  }
}, as = {
  localStorage: Fs,
  initialization: Ks,
  preferences: Qs,
  wording: Gs
};
function Js(e) {
  return "type" in e && "default" in e && "title" in e && "description" in e;
}
function rs(e, t = {}) {
  if (xe(e)) {
    if (Js(e))
      return e.default;
    {
      const s = Object.entries(e);
      for (let i = 0; i < s.length; i++) {
        const [n, o] = s[i];
        t[n] = rs(o);
      }
      return t;
    }
  }
}
const ee = class ee {
  constructor(t) {
    ht(this, "options");
    const s = rs(as);
    this.options = Tt(s, t);
  }
  static clearInstance() {
    ee.instance && (ee.instance = void 0);
  }
  static setOptions(t) {
    ee.instance = new ee(t);
  }
  static getOptions() {
    if (!ee.instance)
      throw new Error("No TVK instance avalaible.");
    return ee.instance.options;
  }
};
ht(ee, "instance");
let B = ee;
const Ys = "main", Ut = "main_storage", Xs = () => ({
  userId: Ws(),
  messages: []
}), F = Vs(Ys, () => {
  const e = Xt(os), t = B.getOptions(), s = R(n());
  function i() {
  }
  function n() {
    if (t.localStorage.enabled) {
      const g = o();
      if (g)
        return g;
    }
    return Xs();
  }
  function o() {
    if (!t.localStorage.enabled)
      return !1;
    const g = localStorage.getItem(a());
    return g ? JSON.parse(g) : !1;
  }
  function a() {
    let g = Ut;
    return t.localStorage.prefix && (g = `${Ut}_${t.localStorage.prefix}`), g;
  }
  const r = es(
    () => s.value.messages
  );
  function u() {
    s.value.messages = s.value.messages.filter((g) => g.type !== P.loader);
  }
  function f() {
  }
  function b(g) {
    const E = F();
    E.clearLoaderMessages(), E.scrollMessages(), s.value.messages.push(g);
  }
  function p() {
    const g = new Headers({ "Content-Type": "application/json" });
    return t.initialization.extraHeaders && Object.entries(t.initialization.extraHeaders).forEach(
      (E) => {
        g.append(E[0], E[1]);
      }
    ), g;
  }
  function h() {
    F().addMessage({
      type: P.error,
      author: x.app,
      date: Date.now(),
      text: t.wording.connectionErrorMessage
    });
  }
  async function D(g, E = !0) {
    const S = F();
    t.preferences.messages.clearOnNewRequest && (s.value.messages = []), E && S.addMessage({
      type: P.message,
      author: x.user,
      text: g,
      date: Date.now()
    }), S.addMessage({
      type: P.loader,
      author: x.app,
      date: Date.now()
    });
    const w = navigator.language, _ = {
      query: g,
      userId: s.value.userId,
      locale: w,
      sourceWithContent: t.preferences.messages.footNotes.requireSourcesContent
    };
    let V;
    try {
      V = await fetch(e, {
        method: "post",
        body: JSON.stringify(_),
        headers: p()
      });
    } catch (v) {
      console.log(v), h();
      return;
    }
    if (!V.ok) {
      console.log(V), h();
      return;
    }
    let I;
    try {
      I = await V.json();
    } catch (v) {
      console.log(v), h();
      return;
    }
    if (S.clearLoaderMessages(), I.responses.forEach((v) => {
      delete v.type, delete v.version, "text" in v ? S.addMessage({
        type: P.message,
        author: x.bot,
        date: Date.now(),
        ...v
      }) : "card" in v ? S.addMessage({
        type: P.card,
        author: x.bot,
        date: Date.now(),
        ...v.card
      }) : "image" in v ? S.addMessage({
        type: P.image,
        author: x.bot,
        date: Date.now(),
        ...v.image
      }) : "carousel" in v && S.addMessage({
        type: P.carousel,
        author: x.bot,
        date: Date.now(),
        ...v.carousel
      });
    }), t.localStorage.enabled) {
      let v = JSON.stringify(s.value);
      if (t.localStorage.maxNumberMessages && s.value.messages.length > t.localStorage.maxNumberMessages) {
        const O = JSON.parse(v), C = O.messages.length - parseInt(
          t.localStorage.maxNumberMessages
        );
        C && (O.messages = O.messages.slice(
          C,
          O.messages.length + 1
        )), v = JSON.stringify(O);
      }
      localStorage.setItem(a(), v);
    }
  }
  function k() {
    s.value.messages = [], t.localStorage.enabled && localStorage.setItem(a(), JSON.stringify(s.value));
  }
  return {
    state: s,
    updateApplication: i,
    getStoredState: o,
    getMessages: r,
    sendUserMessage: D,
    addMessage: b,
    clearHistory: k,
    clearLoaderMessages: u,
    scrollMessages: f
  };
}), Zs = ["aria-label"], en = ["src"], tn = ["maxlength", "placeholder"], sn = { class: "tvk-question-bar-chars-count" }, nn = ["disabled", "aria-label"], on = ["src"], an = /* @__PURE__ */ K({
  __name: "question-block",
  setup(e) {
    const t = B.getOptions(), s = F(), i = t.preferences.questionBar.maxUserInputLength, n = R(null), o = R("");
    function a() {
      n != null && n.value && n.value.focus();
    }
    function r() {
      return o.value.trim().length;
    }
    function u() {
      return r() > i;
    }
    function f() {
      r() && !u() && (s.sendUserMessage(o.value), t.preferences.questionBar.clearTypedCharsOnSubmit && (o.value = ""));
    }
    function b() {
      s.clearHistory();
    }
    return (p, h) => {
      var D;
      return d(), y("div", {
        class: "tvk-question-bar",
        onClick: a
      }, [
        (D = l(t).preferences.questionBar.clearHistory) != null && D.display ? (d(), y("button", {
          key: 0,
          class: "tvk-btn tvk-question-bar-btn-clear-history",
          "aria-label": l(t).wording.questionBar.clearHistoryAriaLabel,
          onClick: b
        }, [
          !l(t).preferences.questionBar.clearHistory.image && l(t).preferences.questionBar.clearHistory.icon ? (d(), y("i", {
            key: 0,
            class: he(l(t).preferences.questionBar.clearHistory.icon)
          }, null, 2)) : T("", !0),
          l(t).preferences.questionBar.clearHistory.image ? (d(), y("img", {
            key: 1,
            src: l(t).preferences.questionBar.clearHistory.image.src,
            style: ce({
              width: l(t).preferences.questionBar.clearHistory.image.width,
              height: l(t).preferences.questionBar.clearHistory.image.height
            })
          }, null, 12, en)) : T("", !0),
          Le(" " + M(l(t).wording.questionBar.clearHistory), 1)
        ], 8, Zs)) : T("", !0),
        N("form", {
          onSubmit: _s(f, ["prevent"]),
          class: "tvk-question-bar-form"
        }, [
          Os(N("input", {
            ref_key: "input",
            ref: n,
            type: "text",
            class: "tvk-question-bar-input",
            rows: "1",
            maxlength: l(t).preferences.questionBar.maxUserInputLength,
            placeholder: l(t).wording.questionBar.input.placeholder,
            "onUpdate:modelValue": h[0] || (h[0] = (k) => o.value = k)
          }, null, 8, tn), [
            [Ls, o.value]
          ]),
          N("div", sn, M(r()) + "/" + M(l(i)), 1)
        ], 32),
        N("button", {
          disabled: !o.value.trim().length || u(),
          class: "tvk-btn tvk-question-bar-btn-submit",
          "aria-label": l(t).wording.questionBar.submitAriaLabel,
          onClick: f
        }, [
          !l(t).preferences.questionBar.submit.image && l(t).preferences.questionBar.submit.icon ? (d(), y("i", {
            key: 0,
            class: he(l(t).preferences.questionBar.submit.icon)
          }, null, 2)) : T("", !0),
          l(t).preferences.questionBar.submit.image ? (d(), y("img", {
            key: 1,
            src: l(t).preferences.questionBar.submit.image.src,
            style: ce({
              width: l(t).preferences.questionBar.submit.image.width,
              height: l(t).preferences.questionBar.submit.image.height
            })
          }, null, 12, on)) : T("", !0),
          Le(" " + M(l(t).wording.questionBar.submit), 1)
        ], 8, nn)
      ]);
    };
  }
}), rn = "aaa1rp3bb0ott3vie4c1le2ogado5udhabi7c0ademy5centure6ountant0s9o1tor4d0s1ult4e0g1ro2tna4f0l1rica5g0akhan5ency5i0g1rbus3force5tel5kdn3l0ibaba4pay4lfinanz6state5y2sace3tom5m0azon4ericanexpress7family11x2fam3ica3sterdam8nalytics7droid5quan4z2o0l2partments8p0le4q0uarelle8r0ab1mco4chi3my2pa2t0e3s0da2ia2sociates9t0hleta5torney7u0ction5di0ble3o3spost5thor3o0s4vianca6w0s2x0a2z0ure5ba0by2idu3namex3narepublic11d1k2r0celona5laycard4s5efoot5gains6seball5ketball8uhaus5yern5b0c1t1va3cg1n2d1e0ats2uty4er2ntley5rlin4st0buy5t2f1g1h0arti5i0ble3d1ke2ng0o3o1z2j1lack0friday9ockbuster8g1omberg7ue3m0s1w2n0pparibas9o0ats3ehringer8fa2m1nd2o0k0ing5sch2tik2on4t1utique6x2r0adesco6idgestone9oadway5ker3ther5ussels7s1t1uild0ers6siness6y1zz3v1w1y1z0h3ca0b1fe2l0l1vinklein9m0era3p2non3petown5ital0one8r0avan4ds2e0er0s4s2sa1e1h1ino4t0ering5holic7ba1n1re3c1d1enter4o1rn3f0a1d2g1h0anel2nel4rity4se2t2eap3intai5ristmas6ome4urch5i0priani6rcle4sco3tadel4i0c2y3k1l0aims4eaning6ick2nic1que6othing5ud3ub0med6m1n1o0ach3des3ffee4llege4ogne5m0cast4mbank4unity6pany2re3uter5sec4ndos3struction8ulting7tact3ractors9oking4l1p2rsica5untry4pon0s4rses6pa2r0edit0card4union9icket5own3s1uise0s6u0isinella9v1w1x1y0mru3ou3z2dabur3d1nce3ta1e1ing3sun4y2clk3ds2e0al0er2s3gree4livery5l1oitte5ta3mocrat6ntal2ist5si0gn4v2hl2iamonds6et2gital5rect0ory7scount3ver5h2y2j1k1m1np2o0cs1tor4g1mains5t1wnload7rive4tv2ubai3nlop4pont4rban5vag2r2z2earth3t2c0o2deka3u0cation8e1g1mail3erck5nergy4gineer0ing9terprises10pson4quipment8r0icsson6ni3s0q1tate5t1u0rovision8s2vents5xchange6pert3osed4ress5traspace10fage2il1rwinds6th3mily4n0s2rm0ers5shion4t3edex3edback6rrari3ero6i0delity5o2lm2nal1nce1ial7re0stone6mdale6sh0ing5t0ness6j1k1lickr3ghts4r2orist4wers5y2m1o0o0d1tball6rd1ex2sale4um3undation8x2r0ee1senius7l1ogans4ntier7tr2ujitsu5n0d2rniture7tbol5yi3ga0l0lery3o1up4me0s3p1rden4y2b0iz3d0n2e0a1nt0ing5orge5f1g0ee3h1i0ft0s3ves2ing5l0ass3e1obal2o4m0ail3bh2o1x2n1odaddy5ld0point6f2o0dyear5g0le4p1t1v2p1q1r0ainger5phics5tis4een3ipe3ocery4up4s1t1u0ardian6cci3ge2ide2tars5ru3w1y2hair2mburg5ngout5us3bo2dfc0bank7ealth0care8lp1sinki6re1mes5iphop4samitsu7tachi5v2k0t2m1n1ockey4ldings5iday5medepot5goods5s0ense7nda3rse3spital5t0ing5t0els3mail5use3w2r1sbc3t1u0ghes5yatt3undai7ibm2cbc2e1u2d1e0ee3fm2kano4l1m0amat4db2mo0bilien9n0c1dustries8finiti5o2g1k1stitute6urance4e4t0ernational10uit4vestments10o1piranga7q1r0ish4s0maili5t0anbul7t0au2v3jaguar4va3cb2e0ep2tzt3welry6io2ll2m0p2nj2o0bs1urg4t1y2p0morgan6rs3uegos4niper7kaufen5ddi3e0rryhotels6logistics9properties14fh2g1h1i0a1ds2m1ndle4tchen5wi3m1n1oeln3matsu5sher5p0mg2n2r0d1ed3uokgroup8w1y0oto4z2la0caixa5mborghini8er3ncaster6d0rover6xess5salle5t0ino3robe5w0yer5b1c1ds2ease3clerc5frak4gal2o2xus4gbt3i0dl2fe0insurance9style7ghting6ke2lly3mited4o2ncoln4k2psy3ve1ing5k1lc1p2oan0s3cker3us3l1ndon4tte1o3ve3pl0financial11r1s1t0d0a3u0ndbeck6xe1ury5v1y2ma0drid4if1son4keup4n0agement7go3p1rket0ing3s4riott5shalls7ttel5ba2c0kinsey7d1e0d0ia3et2lbourne7me1orial6n0u2rckmsd7g1h1iami3crosoft7l1ni1t2t0subishi9k1l0b1s2m0a2n1o0bi0le4da2e1i1m1nash3ey2ster5rmon3tgage6scow4to0rcycles9v0ie4p1q1r1s0d2t0n1r2u0seum3ic4v1w1x1y1z2na0b1goya4me2tura4vy3ba2c1e0c1t0bank4flix4work5ustar5w0s2xt0direct7us4f0l2g0o2hk2i0co2ke1on3nja3ssan1y5l1o0kia3rton4w0ruz3tv4p1r0a1w2tt2u1yc2z2obi1server7ffice5kinawa6layan0group9dnavy5lo3m0ega4ne1g1l0ine5oo2pen3racle3nge4g0anic5igins6saka4tsuka4t2vh3pa0ge2nasonic7ris2s1tners4s1y3y2ccw3e0t2f0izer5g1h0armacy6d1ilips5one2to0graphy6s4ysio5ics1tet2ures6d1n0g1k2oneer5zza4k1l0ace2y0station9umbing5s3m1n0c2ohl2ker3litie5rn2st3r0america6xi3ess3ime3o0d0uctions8f1gressive8mo2perties3y5tection8u0dential9s1t1ub2w0c2y2qa1pon3uebec3st5racing4dio4e0ad1lestate6tor2y4cipes5d0stone5umbrella9hab3ise0n3t2liance6n0t0als5pair3ort3ublican8st0aurant8view0s5xroth6ich0ardli6oh3l1o1p2o0cks3deo3gers4om3s0vp3u0gby3hr2n2w0e2yukyu6sa0arland6fe0ty4kura4le1on3msclub4ung5ndvik0coromant12ofi4p1rl2s1ve2xo3b0i1s2c0a1b1haeffler7midt4olarships8ol3ule3warz5ience5ot3d1e0arch3t2cure1ity6ek2lect4ner3rvices6ven3w1x0y3fr2g1h0angrila6rp2w2ell3ia1ksha5oes2p0ping5uji3w3i0lk2na1gles5te3j1k0i0n2y0pe4l0ing4m0art3ile4n0cf3o0ccer3ial4ftbank4ware6hu2lar2utions7ng1y2y2pa0ce3ort2t3r0l2s1t0ada2ples4r1tebank4farm7c0group6ockholm6rage3e3ream4udio2y3yle4u0cks3pplies3y2ort5rf1gery5zuki5v1watch4iss4x1y0dney4stems6z2tab1ipei4lk2obao4rget4tamotors6r2too4x0i3c0i2d0k2eam2ch0nology8l1masek5nnis4va3f1g1h0d1eater2re6iaa2ckets5enda4ps2res2ol4j0maxx4x2k0maxx5l1m0all4n1o0day3kyo3ols3p1ray3shiba5tal3urs3wn2yota3s3r0ade1ing4ining5vel0ers0insurance16ust3v2t1ube2i1nes3shu4v0s2w1z2ua1bank3s2g1k1nicom3versity8o2ol2ps2s1y1z2va0cations7na1guard7c1e0gas3ntures6risign5mögensberater2ung14sicherung10t2g1i0ajes4deo3g1king4llas4n1p1rgin4sa1ion4va1o3laanderen9n1odka3lvo3te1ing3o2yage5u2wales2mart4ter4ng0gou5tch0es6eather0channel12bcam3er2site5d0ding5ibo2r3f1hoswho6ien2ki2lliamhill9n0dows4e1ners6me2olterskluwer11odside6rk0s2ld3w2s1tc1f3xbox3erox4finity6ihuan4n2xx2yz3yachts4hoo3maxun5ndex5e1odobashi7ga2kohama6u0tube6t1un3za0ppos4ra3ero3ip2m1one3uerich6w2", cn = "ελ1υ2бг1ел3дети4ею2католик6ом3мкд2он1сква6онлайн5рг3рус2ф2сайт3рб3укр3қаз3հայ3ישראל5קום3ابوظبي5رامكو5لاردن4بحرين5جزائر5سعودية6عليان5مغرب5مارات5یران5بارت2زار4يتك3ھارت5تونس4سودان3رية5شبكة4عراق2ب2مان4فلسطين6قطر3كاثوليك6وم3مصر2ليسيا5وريتانيا7قع4همراه5پاکستان7ڀارت4कॉम3नेट3भारत0म्3ोत5संगठन5বাংলা5ভারত2ৰত4ਭਾਰਤ4ભારત4ଭାରତ4இந்தியா6லங்கை6சிங்கப்பூர்11భారత్5ಭಾರತ4ഭാരതം5ලංකා4คอม3ไทย3ລາວ3გე2みんな3アマゾン4クラウド4グーグル4コム2ストア3セール3ファッション6ポイント4世界2中信1国1國1文网3亚马逊3企业2佛山2信息2健康2八卦2公司1益2台湾1灣2商城1店1标2嘉里0大酒店5在线2大拿2天主教3娱乐2家電2广东2微博2慈善2我爱你3手机2招聘2政务1府2新加坡2闻2时尚2書籍2机构2淡马锡3游戏2澳門2点看2移动2组织机构4网址1店1站1络2联通2谷歌2购物2通販2集团2電訊盈科4飞利浦3食品2餐厅2香格里拉3港2닷넷1컴2삼성2한국2", ge = (e, t) => {
  for (const s in t)
    e[s] = t[s];
  return e;
}, kt = "numeric", St = "ascii", Et = "alpha", we = "asciinumeric", Ae = "alphanumeric", Ct = "domain", cs = "emoji", ln = "scheme", un = "slashscheme", jt = "whitespace";
function dn(e, t) {
  return e in t || (t[e] = []), t[e];
}
function re(e, t, s) {
  t[kt] && (t[we] = !0, t[Ae] = !0), t[St] && (t[we] = !0, t[Et] = !0), t[we] && (t[Ae] = !0), t[Et] && (t[Ae] = !0), t[Ae] && (t[Ct] = !0), t[cs] && (t[Ct] = !0);
  for (const i in t) {
    const n = dn(i, s);
    n.indexOf(e) < 0 && n.push(e);
  }
}
function fn(e, t) {
  const s = {};
  for (const i in t)
    t[i].indexOf(e) >= 0 && (s[i] = !0);
  return s;
}
function j(e) {
  e === void 0 && (e = null), this.j = {}, this.jr = [], this.jd = null, this.t = e;
}
j.groups = {};
j.prototype = {
  accepts() {
    return !!this.t;
  },
  /**
   * Follow an existing transition from the given input to the next state.
   * Does not mutate.
   * @param {string} input character or token type to transition on
   * @returns {?State<T>} the next state, if any
   */
  go(e) {
    const t = this, s = t.j[e];
    if (s)
      return s;
    for (let i = 0; i < t.jr.length; i++) {
      const n = t.jr[i][0], o = t.jr[i][1];
      if (o && n.test(e))
        return o;
    }
    return t.jd;
  },
  /**
   * Whether the state has a transition for the given input. Set the second
   * argument to true to only look for an exact match (and not a default or
   * regular-expression-based transition)
   * @param {string} input
   * @param {boolean} exactOnly
   */
  has(e, t) {
    return t === void 0 && (t = !1), t ? e in this.j : !!this.go(e);
  },
  /**
   * Short for "transition all"; create a transition from the array of items
   * in the given list to the same final resulting state.
   * @param {string | string[]} inputs Group of inputs to transition on
   * @param {Transition<T> | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   */
  ta(e, t, s, i) {
    for (let n = 0; n < e.length; n++)
      this.tt(e[n], t, s, i);
  },
  /**
   * Short for "take regexp transition"; defines a transition for this state
   * when it encounters a token which matches the given regular expression
   * @param {RegExp} regexp Regular expression transition (populate first)
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   * @returns {State<T>} taken after the given input
   */
  tr(e, t, s, i) {
    i = i || j.groups;
    let n;
    return t && t.j ? n = t : (n = new j(t), s && i && re(t, s, i)), this.jr.push([e, n]), n;
  },
  /**
   * Short for "take transitions", will take as many sequential transitions as
   * the length of the given input and returns the
   * resulting final state.
   * @param {string | string[]} input
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   * @returns {State<T>} taken after the given input
   */
  ts(e, t, s, i) {
    let n = this;
    const o = e.length;
    if (!o)
      return n;
    for (let a = 0; a < o - 1; a++)
      n = n.tt(e[a]);
    return n.tt(e[o - 1], t, s, i);
  },
  /**
   * Short for "take transition", this is a method for building/working with
   * state machines.
   *
   * If a state already exists for the given input, returns it.
   *
   * If a token is specified, that state will emit that token when reached by
   * the linkify engine.
   *
   * If no state exists, it will be initialized with some default transitions
   * that resemble existing default transitions.
   *
   * If a state is given for the second argument, that state will be
   * transitioned to on the given input regardless of what that input
   * previously did.
   *
   * Specify a token group flags to define groups that this token belongs to.
   * The token will be added to corresponding entires in the given groups
   * object.
   *
   * @param {string} input character, token type to transition on
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of groups
   * @returns {State<T>} taken after the given input
   */
  tt(e, t, s, i) {
    i = i || j.groups;
    const n = this;
    if (t && t.j)
      return n.j[e] = t, t;
    const o = t;
    let a, r = n.go(e);
    if (r ? (a = new j(), ge(a.j, r.j), a.jr.push.apply(a.jr, r.jr), a.jd = r.jd, a.t = r.t) : a = new j(), o) {
      if (i)
        if (a.t && typeof a.t == "string") {
          const u = ge(fn(a.t, i), s);
          re(o, u, i);
        } else
          s && re(o, s, i);
      a.t = o;
    }
    return n.j[e] = a, a;
  }
};
const m = (e, t, s, i, n) => e.ta(t, s, i, n), $ = (e, t, s, i, n) => e.tr(t, s, i, n), zt = (e, t, s, i, n) => e.ts(t, s, i, n), c = (e, t, s, i, n) => e.tt(t, s, i, n), X = "WORD", At = "UWORD", Se = "LOCALHOST", Dt = "TLD", Nt = "UTLD", _e = "SCHEME", fe = "SLASH_SCHEME", _t = "NUM", ls = "WS", Ot = "NL", ve = "OPENBRACE", Te = "CLOSEBRACE", Re = "OPENBRACKET", He = "CLOSEBRACKET", Pe = "OPENPAREN", Me = "CLOSEPAREN", Be = "OPENANGLEBRACKET", Ue = "CLOSEANGLEBRACKET", je = "FULLWIDTHLEFTPAREN", ze = "FULLWIDTHRIGHTPAREN", $e = "LEFTCORNERBRACKET", qe = "RIGHTCORNERBRACKET", Ve = "LEFTWHITECORNERBRACKET", We = "RIGHTWHITECORNERBRACKET", Fe = "FULLWIDTHLESSTHAN", Ke = "FULLWIDTHGREATERTHAN", Qe = "AMPERSAND", Ge = "APOSTROPHE", Je = "ASTERISK", oe = "AT", Ye = "BACKSLASH", Xe = "BACKTICK", Ze = "CARET", ae = "COLON", Lt = "COMMA", et = "DOLLAR", Q = "DOT", tt = "EQUALS", Rt = "EXCLAMATION", G = "HYPHEN", st = "PERCENT", nt = "PIPE", it = "PLUS", ot = "POUND", at = "QUERY", Ht = "QUOTE", Pt = "SEMI", J = "SLASH", ke = "TILDE", rt = "UNDERSCORE", us = "EMOJI", ct = "SYM";
var ds = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  WORD: X,
  UWORD: At,
  LOCALHOST: Se,
  TLD: Dt,
  UTLD: Nt,
  SCHEME: _e,
  SLASH_SCHEME: fe,
  NUM: _t,
  WS: ls,
  NL: Ot,
  OPENBRACE: ve,
  CLOSEBRACE: Te,
  OPENBRACKET: Re,
  CLOSEBRACKET: He,
  OPENPAREN: Pe,
  CLOSEPAREN: Me,
  OPENANGLEBRACKET: Be,
  CLOSEANGLEBRACKET: Ue,
  FULLWIDTHLEFTPAREN: je,
  FULLWIDTHRIGHTPAREN: ze,
  LEFTCORNERBRACKET: $e,
  RIGHTCORNERBRACKET: qe,
  LEFTWHITECORNERBRACKET: Ve,
  RIGHTWHITECORNERBRACKET: We,
  FULLWIDTHLESSTHAN: Fe,
  FULLWIDTHGREATERTHAN: Ke,
  AMPERSAND: Qe,
  APOSTROPHE: Ge,
  ASTERISK: Je,
  AT: oe,
  BACKSLASH: Ye,
  BACKTICK: Xe,
  CARET: Ze,
  COLON: ae,
  COMMA: Lt,
  DOLLAR: et,
  DOT: Q,
  EQUALS: tt,
  EXCLAMATION: Rt,
  HYPHEN: G,
  PERCENT: st,
  PIPE: nt,
  PLUS: it,
  POUND: ot,
  QUERY: at,
  QUOTE: Ht,
  SEMI: Pt,
  SLASH: J,
  TILDE: ke,
  UNDERSCORE: rt,
  EMOJI: us,
  SYM: ct
});
const de = /[a-z]/, pt = new RegExp("\\p{L}", "u"), gt = new RegExp("\\p{Emoji}", "u"), mt = /\d/, $t = /\s/, qt = `
`, hn = "️", pn = "‍";
let De = null, Ne = null;
function gn(e) {
  e === void 0 && (e = []);
  const t = {};
  j.groups = t;
  const s = new j();
  De == null && (De = Vt(rn)), Ne == null && (Ne = Vt(cn)), c(s, "'", Ge), c(s, "{", ve), c(s, "}", Te), c(s, "[", Re), c(s, "]", He), c(s, "(", Pe), c(s, ")", Me), c(s, "<", Be), c(s, ">", Ue), c(s, "（", je), c(s, "）", ze), c(s, "「", $e), c(s, "」", qe), c(s, "『", Ve), c(s, "』", We), c(s, "＜", Fe), c(s, "＞", Ke), c(s, "&", Qe), c(s, "*", Je), c(s, "@", oe), c(s, "`", Xe), c(s, "^", Ze), c(s, ":", ae), c(s, ",", Lt), c(s, "$", et), c(s, ".", Q), c(s, "=", tt), c(s, "!", Rt), c(s, "-", G), c(s, "%", st), c(s, "|", nt), c(s, "+", it), c(s, "#", ot), c(s, "?", at), c(s, '"', Ht), c(s, "/", J), c(s, ";", Pt), c(s, "~", ke), c(s, "_", rt), c(s, "\\", Ye);
  const i = $(s, mt, _t, {
    [kt]: !0
  });
  $(i, mt, i);
  const n = $(s, de, X, {
    [St]: !0
  });
  $(n, de, n);
  const o = $(s, pt, At, {
    [Et]: !0
  });
  $(o, de), $(o, pt, o);
  const a = $(s, $t, ls, {
    [jt]: !0
  });
  c(s, qt, Ot, {
    [jt]: !0
  }), c(a, qt), $(a, $t, a);
  const r = $(s, gt, us, {
    [cs]: !0
  });
  $(r, gt, r), c(r, hn, r);
  const u = c(r, pn);
  $(u, gt, r);
  const f = [[de, n]], b = [[de, null], [pt, o]];
  for (let p = 0; p < De.length; p++)
    ne(s, De[p], Dt, X, f);
  for (let p = 0; p < Ne.length; p++)
    ne(s, Ne[p], Nt, At, b);
  re(Dt, {
    tld: !0,
    ascii: !0
  }, t), re(Nt, {
    utld: !0,
    alpha: !0
  }, t), ne(s, "file", _e, X, f), ne(s, "mailto", _e, X, f), ne(s, "http", fe, X, f), ne(s, "https", fe, X, f), ne(s, "ftp", fe, X, f), ne(s, "ftps", fe, X, f), re(_e, {
    scheme: !0,
    ascii: !0
  }, t), re(fe, {
    slashscheme: !0,
    ascii: !0
  }, t), e = e.sort((p, h) => p[0] > h[0] ? 1 : -1);
  for (let p = 0; p < e.length; p++) {
    const h = e[p][0], k = e[p][1] ? {
      [ln]: !0
    } : {
      [un]: !0
    };
    h.indexOf("-") >= 0 ? k[Ct] = !0 : de.test(h) ? mt.test(h) ? k[we] = !0 : k[St] = !0 : k[kt] = !0, zt(s, h, h, k);
  }
  return zt(s, "localhost", Se, {
    ascii: !0
  }), s.jd = new j(ct), {
    start: s,
    tokens: ge({
      groups: t
    }, ds)
  };
}
function mn(e, t) {
  const s = yn(t.replace(/[A-Z]/g, (r) => r.toLowerCase())), i = s.length, n = [];
  let o = 0, a = 0;
  for (; a < i; ) {
    let r = e, u = null, f = 0, b = null, p = -1, h = -1;
    for (; a < i && (u = r.go(s[a])); )
      r = u, r.accepts() ? (p = 0, h = 0, b = r) : p >= 0 && (p += s[a].length, h++), f += s[a].length, o += s[a].length, a++;
    o -= p, a -= h, f -= p, n.push({
      t: b.t,
      // token type/name
      v: t.slice(o - f, o),
      // string value
      s: o - f,
      // start index
      e: o
      // end index (excluding)
    });
  }
  return n;
}
function yn(e) {
  const t = [], s = e.length;
  let i = 0;
  for (; i < s; ) {
    let n = e.charCodeAt(i), o, a = n < 55296 || n > 56319 || i + 1 === s || (o = e.charCodeAt(i + 1)) < 56320 || o > 57343 ? e[i] : e.slice(i, i + 2);
    t.push(a), i += a.length;
  }
  return t;
}
function ne(e, t, s, i, n) {
  let o;
  const a = t.length;
  for (let r = 0; r < a - 1; r++) {
    const u = t[r];
    e.j[u] ? o = e.j[u] : (o = new j(i), o.jr = n.slice(), e.j[u] = o), e = o;
  }
  return o = new j(s), o.jr = n.slice(), e.j[t[a - 1]] = o, o;
}
function Vt(e) {
  const t = [], s = [];
  let i = 0, n = "0123456789";
  for (; i < e.length; ) {
    let o = 0;
    for (; n.indexOf(e[i + o]) >= 0; )
      o++;
    if (o > 0) {
      t.push(s.join(""));
      for (let a = parseInt(e.substring(i, i + o), 10); a > 0; a--)
        s.pop();
      i += o;
    } else
      s.push(e[i]), i++;
  }
  return t;
}
const Ee = {
  defaultProtocol: "http",
  events: null,
  format: Wt,
  formatHref: Wt,
  nl2br: !1,
  tagName: "a",
  target: null,
  rel: null,
  validate: !0,
  truncate: 1 / 0,
  className: null,
  attributes: null,
  ignoreTags: [],
  render: null
};
function Mt(e, t) {
  t === void 0 && (t = null);
  let s = ge({}, Ee);
  e && (s = ge(s, e instanceof Mt ? e.o : e));
  const i = s.ignoreTags, n = [];
  for (let o = 0; o < i.length; o++)
    n.push(i[o].toUpperCase());
  this.o = s, t && (this.defaultRender = t), this.ignoreTags = n;
}
Mt.prototype = {
  o: Ee,
  /**
   * @type string[]
   */
  ignoreTags: [],
  /**
   * @param {IntermediateRepresentation} ir
   * @returns {any}
   */
  defaultRender(e) {
    return e;
  },
  /**
   * Returns true or false based on whether a token should be displayed as a
   * link based on the user options.
   * @param {MultiToken} token
   * @returns {boolean}
   */
  check(e) {
    return this.get("validate", e.toString(), e);
  },
  // Private methods
  /**
   * Resolve an option's value based on the value of the option and the given
   * params. If operator and token are specified and the target option is
   * callable, automatically calls the function with the given argument.
   * @template {keyof Opts} K
   * @param {K} key Name of option to use
   * @param {string} [operator] will be passed to the target option if it's a
   * function. If not specified, RAW function value gets returned
   * @param {MultiToken} [token] The token from linkify.tokenize
   * @returns {Opts[K] | any}
   */
  get(e, t, s) {
    const i = t != null;
    let n = this.o[e];
    return n && (typeof n == "object" ? (n = s.t in n ? n[s.t] : Ee[e], typeof n == "function" && i && (n = n(t, s))) : typeof n == "function" && i && (n = n(t, s.t, s)), n);
  },
  /**
   * @template {keyof Opts} L
   * @param {L} key Name of options object to use
   * @param {string} [operator]
   * @param {MultiToken} [token]
   * @returns {Opts[L] | any}
   */
  getObj(e, t, s) {
    let i = this.o[e];
    return typeof i == "function" && t != null && (i = i(t, s.t, s)), i;
  },
  /**
   * Convert the given token to a rendered element that may be added to the
   * calling-interface's DOM
   * @param {MultiToken} token Token to render to an HTML element
   * @returns {any} Render result; e.g., HTML string, DOM element, React
   *   Component, etc.
   */
  render(e) {
    const t = e.render(this);
    return (this.get("render", null, e) || this.defaultRender)(t, e.t, e);
  }
};
function Wt(e) {
  return e;
}
function fs(e, t) {
  this.t = "token", this.v = e, this.tk = t;
}
fs.prototype = {
  isLink: !1,
  /**
   * Return the string this token represents.
   * @return {string}
   */
  toString() {
    return this.v;
  },
  /**
   * What should the value for this token be in the `href` HTML attribute?
   * Returns the `.toString` value by default.
   * @param {string} [scheme]
   * @return {string}
  */
  toHref(e) {
    return this.toString();
  },
  /**
   * @param {Options} options Formatting options
   * @returns {string}
   */
  toFormattedString(e) {
    const t = this.toString(), s = e.get("truncate", t, this), i = e.get("format", t, this);
    return s && i.length > s ? i.substring(0, s) + "…" : i;
  },
  /**
   *
   * @param {Options} options
   * @returns {string}
   */
  toFormattedHref(e) {
    return e.get("formatHref", this.toHref(e.get("defaultProtocol")), this);
  },
  /**
   * The start index of this token in the original input string
   * @returns {number}
   */
  startIndex() {
    return this.tk[0].s;
  },
  /**
   * The end index of this token in the original input string (up to this
   * index but not including it)
   * @returns {number}
   */
  endIndex() {
    return this.tk[this.tk.length - 1].e;
  },
  /**
  	Returns an object  of relevant values for this token, which includes keys
  	* type - Kind of token ('url', 'email', etc.)
  	* value - Original text
  	* href - The value that should be added to the anchor tag's href
  		attribute
  		@method toObject
  	@param {string} [protocol] `'http'` by default
  */
  toObject(e) {
    return e === void 0 && (e = Ee.defaultProtocol), {
      type: this.t,
      value: this.toString(),
      isLink: this.isLink,
      href: this.toHref(e),
      start: this.startIndex(),
      end: this.endIndex()
    };
  },
  /**
   *
   * @param {Options} options Formatting option
   */
  toFormattedObject(e) {
    return {
      type: this.t,
      value: this.toFormattedString(e),
      isLink: this.isLink,
      href: this.toFormattedHref(e),
      start: this.startIndex(),
      end: this.endIndex()
    };
  },
  /**
   * Whether this token should be rendered as a link according to the given options
   * @param {Options} options
   * @returns {boolean}
   */
  validate(e) {
    return e.get("validate", this.toString(), this);
  },
  /**
   * Return an object that represents how this link should be rendered.
   * @param {Options} options Formattinng options
   */
  render(e) {
    const t = this, s = this.toHref(e.get("defaultProtocol")), i = e.get("formatHref", s, this), n = e.get("tagName", s, t), o = this.toFormattedString(e), a = {}, r = e.get("className", s, t), u = e.get("target", s, t), f = e.get("rel", s, t), b = e.getObj("attributes", s, t), p = e.getObj("events", s, t);
    return a.href = i, r && (a.class = r), u && (a.target = u), f && (a.rel = f), b && ge(a, b), {
      tagName: n,
      attributes: a,
      content: o,
      eventListeners: p
    };
  }
};
function ft(e, t) {
  class s extends fs {
    constructor(n, o) {
      super(n, o), this.t = e;
    }
  }
  for (const i in t)
    s.prototype[i] = t[i];
  return s.t = e, s;
}
const Ft = ft("email", {
  isLink: !0,
  toHref() {
    return "mailto:" + this.toString();
  }
}), Kt = ft("text"), bn = ft("nl"), Ie = ft("url", {
  isLink: !0,
  /**
  	Lowercases relevant parts of the domain and adds the protocol if
  	required. Note that this will not escape unsafe HTML characters in the
  	URL.
  		@param {string} [scheme] default scheme (e.g., 'https')
  	@return {string} the full href
  */
  toHref(e) {
    return e === void 0 && (e = Ee.defaultProtocol), this.hasProtocol() ? this.v : `${e}://${this.v}`;
  },
  /**
   * Check whether this URL token has a protocol
   * @return {boolean}
   */
  hasProtocol() {
    const e = this.tk;
    return e.length >= 2 && e[0].t !== Se && e[1].t === ae;
  }
}), q = (e) => new j(e);
function vn(e) {
  let {
    groups: t
  } = e;
  const s = t.domain.concat([Qe, Je, oe, Ye, Xe, Ze, et, tt, G, _t, st, nt, it, ot, J, ct, ke, rt]), i = [Ge, ae, Lt, Q, Rt, at, Ht, Pt, Be, Ue, ve, Te, He, Re, Pe, Me, je, ze, $e, qe, Ve, We, Fe, Ke], n = [Qe, Ge, Je, Ye, Xe, Ze, et, tt, G, ve, Te, st, nt, it, ot, at, J, ct, ke, rt], o = q(), a = c(o, ke);
  m(a, n, a), m(a, t.domain, a);
  const r = q(), u = q(), f = q();
  m(o, t.domain, r), m(o, t.scheme, u), m(o, t.slashscheme, f), m(r, n, a), m(r, t.domain, r);
  const b = c(r, oe);
  c(a, oe, b), c(u, oe, b), c(f, oe, b);
  const p = c(a, Q);
  m(p, n, a), m(p, t.domain, a);
  const h = q();
  m(b, t.domain, h), m(h, t.domain, h);
  const D = c(h, Q);
  m(D, t.domain, h);
  const k = q(Ft);
  m(D, t.tld, k), m(D, t.utld, k), c(b, Se, k);
  const g = c(h, G);
  m(g, t.domain, h), m(k, t.domain, h), c(k, Q, D), c(k, G, g);
  const E = c(k, ae);
  m(E, t.numeric, Ft);
  const S = c(r, G), w = c(r, Q);
  m(S, t.domain, r), m(w, n, a), m(w, t.domain, r);
  const _ = q(Ie);
  m(w, t.tld, _), m(w, t.utld, _), m(_, t.domain, r), m(_, n, a), c(_, Q, w), c(_, G, S), c(_, oe, b);
  const V = c(_, ae), I = q(Ie);
  m(V, t.numeric, I);
  const v = q(Ie), O = q();
  m(v, s, v), m(v, i, O), m(O, s, v), m(O, i, O), c(_, J, v), c(I, J, v);
  const C = c(u, ae), A = c(f, ae), z = c(A, J), W = c(z, J);
  m(u, t.domain, r), c(u, Q, w), c(u, G, S), m(f, t.domain, r), c(f, Q, w), c(f, G, S), m(C, t.domain, v), c(C, J, v), m(W, t.domain, v), m(W, s, v), c(W, J, v);
  const se = [
    [ve, Te],
    // {}
    [Re, He],
    // []
    [Pe, Me],
    // ()
    [Be, Ue],
    // <>
    [je, ze],
    // （）
    [$e, qe],
    // 「」
    [Ve, We],
    // 『』
    [Fe, Ke]
    // ＜＞
  ];
  for (let me = 0; me < se.length; me++) {
    const [Ce, Y] = se[me], L = c(v, Ce);
    c(O, Ce, L), c(L, Y, v);
    const le = q(Ie);
    m(L, s, le);
    const ye = q();
    m(L, i), m(le, s, le), m(le, i, ye), m(ye, s, le), m(ye, i, ye), c(le, Y, v), c(ye, Y, v);
  }
  return c(o, Se, _), c(o, Ot, bn), {
    start: o,
    tokens: ds
  };
}
function Tn(e, t, s) {
  let i = s.length, n = 0, o = [], a = [];
  for (; n < i; ) {
    let r = e, u = null, f = null, b = 0, p = null, h = -1;
    for (; n < i && !(u = r.go(s[n].t)); )
      a.push(s[n++]);
    for (; n < i && (f = u || r.go(s[n].t)); )
      u = null, r = f, r.accepts() ? (h = 0, p = r) : h >= 0 && h++, n++, b++;
    if (h < 0)
      n -= b, n < i && (a.push(s[n]), n++);
    else {
      a.length > 0 && (o.push(yt(Kt, t, a)), a = []), n -= h, b -= h;
      const D = p.t, k = s.slice(n - b, n);
      o.push(yt(D, t, k));
    }
  }
  return a.length > 0 && o.push(yt(Kt, t, a)), o;
}
function yt(e, t, s) {
  const i = s[0].s, n = s[s.length - 1].e, o = t.slice(i, n);
  return new e(o, s);
}
const U = {
  scanner: null,
  parser: null,
  tokenQueue: [],
  pluginQueue: [],
  customSchemes: [],
  initialized: !1
};
function kn() {
  U.scanner = gn(U.customSchemes);
  for (let e = 0; e < U.tokenQueue.length; e++)
    U.tokenQueue[e][1]({
      scanner: U.scanner
    });
  U.parser = vn(U.scanner.tokens);
  for (let e = 0; e < U.pluginQueue.length; e++)
    U.pluginQueue[e][1]({
      scanner: U.scanner,
      parser: U.parser
    });
  U.initialized = !0;
}
function Sn(e) {
  return U.initialized || kn(), Tn(U.parser.start, e, mn(U.scanner.start, e));
}
var En = {
  // We don't need the complete named character reference because linkifyHtml
  // does not modify the escape sequences. We do need &nbsp; so that
  // whitespace is parsed properly. Other types of whitespace should already
  // be accounted for. &gt; &lt; and &quot; are also frequently relevant ones
  amp: "&",
  gt: ">",
  lt: "<",
  nbsp: " ",
  quot: '"'
}, Cn = /^#[xX]([A-Fa-f0-9]+)$/, An = /^#([0-9]+)$/, Dn = /^([A-Za-z0-9]+)$/, Nn = (
  /** @class */
  function() {
    function e(t) {
      this.named = t;
    }
    return e.prototype.parse = function(t) {
      if (t) {
        var s = t.match(Cn);
        if (s)
          return String.fromCharCode(parseInt(s[1], 16));
        if (s = t.match(An), s)
          return String.fromCharCode(parseInt(s[1], 10));
        if (s = t.match(Dn), s)
          return this.named[s[1]] || "&" + s[1] + ";";
      }
    }, e;
  }()
), In = /[\t\n\f ]/, xn = /[A-Za-z]/, wn = /\r\n?/g;
function H(e) {
  return In.test(e);
}
function Qt(e) {
  return xn.test(e);
}
function _n(e) {
  return e.replace(wn, `
`);
}
var On = (
  /** @class */
  function() {
    function e(t, s, i) {
      i === void 0 && (i = "precompile"), this.delegate = t, this.entityParser = s, this.mode = i, this.state = "beforeData", this.line = -1, this.column = -1, this.input = "", this.index = -1, this.tagNameBuffer = "", this.states = {
        beforeData: function() {
          var n = this.peek();
          if (n === "<" && !this.isIgnoredEndTag())
            this.transitionTo(
              "tagOpen"
              /* tagOpen */
            ), this.markTagStart(), this.consume();
          else {
            if (this.mode === "precompile" && n === `
`) {
              var o = this.tagNameBuffer.toLowerCase();
              (o === "pre" || o === "textarea") && this.consume();
            }
            this.transitionTo(
              "data"
              /* data */
            ), this.delegate.beginData();
          }
        },
        data: function() {
          var n = this.peek(), o = this.tagNameBuffer;
          n === "<" && !this.isIgnoredEndTag() ? (this.delegate.finishData(), this.transitionTo(
            "tagOpen"
            /* tagOpen */
          ), this.markTagStart(), this.consume()) : n === "&" && o !== "script" && o !== "style" ? (this.consume(), this.delegate.appendToData(this.consumeCharRef() || "&")) : (this.consume(), this.delegate.appendToData(n));
        },
        tagOpen: function() {
          var n = this.consume();
          n === "!" ? this.transitionTo(
            "markupDeclarationOpen"
            /* markupDeclarationOpen */
          ) : n === "/" ? this.transitionTo(
            "endTagOpen"
            /* endTagOpen */
          ) : (n === "@" || n === ":" || Qt(n)) && (this.transitionTo(
            "tagName"
            /* tagName */
          ), this.tagNameBuffer = "", this.delegate.beginStartTag(), this.appendToTagName(n));
        },
        markupDeclarationOpen: function() {
          var n = this.consume();
          if (n === "-" && this.peek() === "-")
            this.consume(), this.transitionTo(
              "commentStart"
              /* commentStart */
            ), this.delegate.beginComment();
          else {
            var o = n.toUpperCase() + this.input.substring(this.index, this.index + 6).toUpperCase();
            o === "DOCTYPE" && (this.consume(), this.consume(), this.consume(), this.consume(), this.consume(), this.consume(), this.transitionTo(
              "doctype"
              /* doctype */
            ), this.delegate.beginDoctype && this.delegate.beginDoctype());
          }
        },
        doctype: function() {
          var n = this.consume();
          H(n) && this.transitionTo(
            "beforeDoctypeName"
            /* beforeDoctypeName */
          );
        },
        beforeDoctypeName: function() {
          var n = this.consume();
          H(n) || (this.transitionTo(
            "doctypeName"
            /* doctypeName */
          ), this.delegate.appendToDoctypeName && this.delegate.appendToDoctypeName(n.toLowerCase()));
        },
        doctypeName: function() {
          var n = this.consume();
          H(n) ? this.transitionTo(
            "afterDoctypeName"
            /* afterDoctypeName */
          ) : n === ">" ? (this.delegate.endDoctype && this.delegate.endDoctype(), this.transitionTo(
            "beforeData"
            /* beforeData */
          )) : this.delegate.appendToDoctypeName && this.delegate.appendToDoctypeName(n.toLowerCase());
        },
        afterDoctypeName: function() {
          var n = this.consume();
          if (!H(n))
            if (n === ">")
              this.delegate.endDoctype && this.delegate.endDoctype(), this.transitionTo(
                "beforeData"
                /* beforeData */
              );
            else {
              var o = n.toUpperCase() + this.input.substring(this.index, this.index + 5).toUpperCase(), a = o.toUpperCase() === "PUBLIC", r = o.toUpperCase() === "SYSTEM";
              (a || r) && (this.consume(), this.consume(), this.consume(), this.consume(), this.consume(), this.consume()), a ? this.transitionTo(
                "afterDoctypePublicKeyword"
                /* afterDoctypePublicKeyword */
              ) : r && this.transitionTo(
                "afterDoctypeSystemKeyword"
                /* afterDoctypeSystemKeyword */
              );
            }
        },
        afterDoctypePublicKeyword: function() {
          var n = this.peek();
          H(n) ? (this.transitionTo(
            "beforeDoctypePublicIdentifier"
            /* beforeDoctypePublicIdentifier */
          ), this.consume()) : n === '"' ? (this.transitionTo(
            "doctypePublicIdentifierDoubleQuoted"
            /* doctypePublicIdentifierDoubleQuoted */
          ), this.consume()) : n === "'" ? (this.transitionTo(
            "doctypePublicIdentifierSingleQuoted"
            /* doctypePublicIdentifierSingleQuoted */
          ), this.consume()) : n === ">" && (this.consume(), this.delegate.endDoctype && this.delegate.endDoctype(), this.transitionTo(
            "beforeData"
            /* beforeData */
          ));
        },
        doctypePublicIdentifierDoubleQuoted: function() {
          var n = this.consume();
          n === '"' ? this.transitionTo(
            "afterDoctypePublicIdentifier"
            /* afterDoctypePublicIdentifier */
          ) : n === ">" ? (this.delegate.endDoctype && this.delegate.endDoctype(), this.transitionTo(
            "beforeData"
            /* beforeData */
          )) : this.delegate.appendToDoctypePublicIdentifier && this.delegate.appendToDoctypePublicIdentifier(n);
        },
        doctypePublicIdentifierSingleQuoted: function() {
          var n = this.consume();
          n === "'" ? this.transitionTo(
            "afterDoctypePublicIdentifier"
            /* afterDoctypePublicIdentifier */
          ) : n === ">" ? (this.delegate.endDoctype && this.delegate.endDoctype(), this.transitionTo(
            "beforeData"
            /* beforeData */
          )) : this.delegate.appendToDoctypePublicIdentifier && this.delegate.appendToDoctypePublicIdentifier(n);
        },
        afterDoctypePublicIdentifier: function() {
          var n = this.consume();
          H(n) ? this.transitionTo(
            "betweenDoctypePublicAndSystemIdentifiers"
            /* betweenDoctypePublicAndSystemIdentifiers */
          ) : n === ">" ? (this.delegate.endDoctype && this.delegate.endDoctype(), this.transitionTo(
            "beforeData"
            /* beforeData */
          )) : n === '"' ? this.transitionTo(
            "doctypeSystemIdentifierDoubleQuoted"
            /* doctypeSystemIdentifierDoubleQuoted */
          ) : n === "'" && this.transitionTo(
            "doctypeSystemIdentifierSingleQuoted"
            /* doctypeSystemIdentifierSingleQuoted */
          );
        },
        betweenDoctypePublicAndSystemIdentifiers: function() {
          var n = this.consume();
          H(n) || (n === ">" ? (this.delegate.endDoctype && this.delegate.endDoctype(), this.transitionTo(
            "beforeData"
            /* beforeData */
          )) : n === '"' ? this.transitionTo(
            "doctypeSystemIdentifierDoubleQuoted"
            /* doctypeSystemIdentifierDoubleQuoted */
          ) : n === "'" && this.transitionTo(
            "doctypeSystemIdentifierSingleQuoted"
            /* doctypeSystemIdentifierSingleQuoted */
          ));
        },
        doctypeSystemIdentifierDoubleQuoted: function() {
          var n = this.consume();
          n === '"' ? this.transitionTo(
            "afterDoctypeSystemIdentifier"
            /* afterDoctypeSystemIdentifier */
          ) : n === ">" ? (this.delegate.endDoctype && this.delegate.endDoctype(), this.transitionTo(
            "beforeData"
            /* beforeData */
          )) : this.delegate.appendToDoctypeSystemIdentifier && this.delegate.appendToDoctypeSystemIdentifier(n);
        },
        doctypeSystemIdentifierSingleQuoted: function() {
          var n = this.consume();
          n === "'" ? this.transitionTo(
            "afterDoctypeSystemIdentifier"
            /* afterDoctypeSystemIdentifier */
          ) : n === ">" ? (this.delegate.endDoctype && this.delegate.endDoctype(), this.transitionTo(
            "beforeData"
            /* beforeData */
          )) : this.delegate.appendToDoctypeSystemIdentifier && this.delegate.appendToDoctypeSystemIdentifier(n);
        },
        afterDoctypeSystemIdentifier: function() {
          var n = this.consume();
          H(n) || n === ">" && (this.delegate.endDoctype && this.delegate.endDoctype(), this.transitionTo(
            "beforeData"
            /* beforeData */
          ));
        },
        commentStart: function() {
          var n = this.consume();
          n === "-" ? this.transitionTo(
            "commentStartDash"
            /* commentStartDash */
          ) : n === ">" ? (this.delegate.finishComment(), this.transitionTo(
            "beforeData"
            /* beforeData */
          )) : (this.delegate.appendToCommentData(n), this.transitionTo(
            "comment"
            /* comment */
          ));
        },
        commentStartDash: function() {
          var n = this.consume();
          n === "-" ? this.transitionTo(
            "commentEnd"
            /* commentEnd */
          ) : n === ">" ? (this.delegate.finishComment(), this.transitionTo(
            "beforeData"
            /* beforeData */
          )) : (this.delegate.appendToCommentData("-"), this.transitionTo(
            "comment"
            /* comment */
          ));
        },
        comment: function() {
          var n = this.consume();
          n === "-" ? this.transitionTo(
            "commentEndDash"
            /* commentEndDash */
          ) : this.delegate.appendToCommentData(n);
        },
        commentEndDash: function() {
          var n = this.consume();
          n === "-" ? this.transitionTo(
            "commentEnd"
            /* commentEnd */
          ) : (this.delegate.appendToCommentData("-" + n), this.transitionTo(
            "comment"
            /* comment */
          ));
        },
        commentEnd: function() {
          var n = this.consume();
          n === ">" ? (this.delegate.finishComment(), this.transitionTo(
            "beforeData"
            /* beforeData */
          )) : (this.delegate.appendToCommentData("--" + n), this.transitionTo(
            "comment"
            /* comment */
          ));
        },
        tagName: function() {
          var n = this.consume();
          H(n) ? this.transitionTo(
            "beforeAttributeName"
            /* beforeAttributeName */
          ) : n === "/" ? this.transitionTo(
            "selfClosingStartTag"
            /* selfClosingStartTag */
          ) : n === ">" ? (this.delegate.finishTag(), this.transitionTo(
            "beforeData"
            /* beforeData */
          )) : this.appendToTagName(n);
        },
        endTagName: function() {
          var n = this.consume();
          H(n) ? (this.transitionTo(
            "beforeAttributeName"
            /* beforeAttributeName */
          ), this.tagNameBuffer = "") : n === "/" ? (this.transitionTo(
            "selfClosingStartTag"
            /* selfClosingStartTag */
          ), this.tagNameBuffer = "") : n === ">" ? (this.delegate.finishTag(), this.transitionTo(
            "beforeData"
            /* beforeData */
          ), this.tagNameBuffer = "") : this.appendToTagName(n);
        },
        beforeAttributeName: function() {
          var n = this.peek();
          if (H(n)) {
            this.consume();
            return;
          } else
            n === "/" ? (this.transitionTo(
              "selfClosingStartTag"
              /* selfClosingStartTag */
            ), this.consume()) : n === ">" ? (this.consume(), this.delegate.finishTag(), this.transitionTo(
              "beforeData"
              /* beforeData */
            )) : n === "=" ? (this.delegate.reportSyntaxError("attribute name cannot start with equals sign"), this.transitionTo(
              "attributeName"
              /* attributeName */
            ), this.delegate.beginAttribute(), this.consume(), this.delegate.appendToAttributeName(n)) : (this.transitionTo(
              "attributeName"
              /* attributeName */
            ), this.delegate.beginAttribute());
        },
        attributeName: function() {
          var n = this.peek();
          H(n) ? (this.transitionTo(
            "afterAttributeName"
            /* afterAttributeName */
          ), this.consume()) : n === "/" ? (this.delegate.beginAttributeValue(!1), this.delegate.finishAttributeValue(), this.consume(), this.transitionTo(
            "selfClosingStartTag"
            /* selfClosingStartTag */
          )) : n === "=" ? (this.transitionTo(
            "beforeAttributeValue"
            /* beforeAttributeValue */
          ), this.consume()) : n === ">" ? (this.delegate.beginAttributeValue(!1), this.delegate.finishAttributeValue(), this.consume(), this.delegate.finishTag(), this.transitionTo(
            "beforeData"
            /* beforeData */
          )) : n === '"' || n === "'" || n === "<" ? (this.delegate.reportSyntaxError(n + " is not a valid character within attribute names"), this.consume(), this.delegate.appendToAttributeName(n)) : (this.consume(), this.delegate.appendToAttributeName(n));
        },
        afterAttributeName: function() {
          var n = this.peek();
          if (H(n)) {
            this.consume();
            return;
          } else
            n === "/" ? (this.delegate.beginAttributeValue(!1), this.delegate.finishAttributeValue(), this.consume(), this.transitionTo(
              "selfClosingStartTag"
              /* selfClosingStartTag */
            )) : n === "=" ? (this.consume(), this.transitionTo(
              "beforeAttributeValue"
              /* beforeAttributeValue */
            )) : n === ">" ? (this.delegate.beginAttributeValue(!1), this.delegate.finishAttributeValue(), this.consume(), this.delegate.finishTag(), this.transitionTo(
              "beforeData"
              /* beforeData */
            )) : (this.delegate.beginAttributeValue(!1), this.delegate.finishAttributeValue(), this.transitionTo(
              "attributeName"
              /* attributeName */
            ), this.delegate.beginAttribute(), this.consume(), this.delegate.appendToAttributeName(n));
        },
        beforeAttributeValue: function() {
          var n = this.peek();
          H(n) ? this.consume() : n === '"' ? (this.transitionTo(
            "attributeValueDoubleQuoted"
            /* attributeValueDoubleQuoted */
          ), this.delegate.beginAttributeValue(!0), this.consume()) : n === "'" ? (this.transitionTo(
            "attributeValueSingleQuoted"
            /* attributeValueSingleQuoted */
          ), this.delegate.beginAttributeValue(!0), this.consume()) : n === ">" ? (this.delegate.beginAttributeValue(!1), this.delegate.finishAttributeValue(), this.consume(), this.delegate.finishTag(), this.transitionTo(
            "beforeData"
            /* beforeData */
          )) : (this.transitionTo(
            "attributeValueUnquoted"
            /* attributeValueUnquoted */
          ), this.delegate.beginAttributeValue(!1), this.consume(), this.delegate.appendToAttributeValue(n));
        },
        attributeValueDoubleQuoted: function() {
          var n = this.consume();
          n === '"' ? (this.delegate.finishAttributeValue(), this.transitionTo(
            "afterAttributeValueQuoted"
            /* afterAttributeValueQuoted */
          )) : n === "&" ? this.delegate.appendToAttributeValue(this.consumeCharRef() || "&") : this.delegate.appendToAttributeValue(n);
        },
        attributeValueSingleQuoted: function() {
          var n = this.consume();
          n === "'" ? (this.delegate.finishAttributeValue(), this.transitionTo(
            "afterAttributeValueQuoted"
            /* afterAttributeValueQuoted */
          )) : n === "&" ? this.delegate.appendToAttributeValue(this.consumeCharRef() || "&") : this.delegate.appendToAttributeValue(n);
        },
        attributeValueUnquoted: function() {
          var n = this.peek();
          H(n) ? (this.delegate.finishAttributeValue(), this.consume(), this.transitionTo(
            "beforeAttributeName"
            /* beforeAttributeName */
          )) : n === "/" ? (this.delegate.finishAttributeValue(), this.consume(), this.transitionTo(
            "selfClosingStartTag"
            /* selfClosingStartTag */
          )) : n === "&" ? (this.consume(), this.delegate.appendToAttributeValue(this.consumeCharRef() || "&")) : n === ">" ? (this.delegate.finishAttributeValue(), this.consume(), this.delegate.finishTag(), this.transitionTo(
            "beforeData"
            /* beforeData */
          )) : (this.consume(), this.delegate.appendToAttributeValue(n));
        },
        afterAttributeValueQuoted: function() {
          var n = this.peek();
          H(n) ? (this.consume(), this.transitionTo(
            "beforeAttributeName"
            /* beforeAttributeName */
          )) : n === "/" ? (this.consume(), this.transitionTo(
            "selfClosingStartTag"
            /* selfClosingStartTag */
          )) : n === ">" ? (this.consume(), this.delegate.finishTag(), this.transitionTo(
            "beforeData"
            /* beforeData */
          )) : this.transitionTo(
            "beforeAttributeName"
            /* beforeAttributeName */
          );
        },
        selfClosingStartTag: function() {
          var n = this.peek();
          n === ">" ? (this.consume(), this.delegate.markTagAsSelfClosing(), this.delegate.finishTag(), this.transitionTo(
            "beforeData"
            /* beforeData */
          )) : this.transitionTo(
            "beforeAttributeName"
            /* beforeAttributeName */
          );
        },
        endTagOpen: function() {
          var n = this.consume();
          (n === "@" || n === ":" || Qt(n)) && (this.transitionTo(
            "endTagName"
            /* endTagName */
          ), this.tagNameBuffer = "", this.delegate.beginEndTag(), this.appendToTagName(n));
        }
      }, this.reset();
    }
    return e.prototype.reset = function() {
      this.transitionTo(
        "beforeData"
        /* beforeData */
      ), this.input = "", this.tagNameBuffer = "", this.index = 0, this.line = 1, this.column = 0, this.delegate.reset();
    }, e.prototype.transitionTo = function(t) {
      this.state = t;
    }, e.prototype.tokenize = function(t) {
      this.reset(), this.tokenizePart(t), this.tokenizeEOF();
    }, e.prototype.tokenizePart = function(t) {
      for (this.input += _n(t); this.index < this.input.length; ) {
        var s = this.states[this.state];
        if (s !== void 0)
          s.call(this);
        else
          throw new Error("unhandled state " + this.state);
      }
    }, e.prototype.tokenizeEOF = function() {
      this.flushData();
    }, e.prototype.flushData = function() {
      this.state === "data" && (this.delegate.finishData(), this.transitionTo(
        "beforeData"
        /* beforeData */
      ));
    }, e.prototype.peek = function() {
      return this.input.charAt(this.index);
    }, e.prototype.consume = function() {
      var t = this.peek();
      return this.index++, t === `
` ? (this.line++, this.column = 0) : this.column++, t;
    }, e.prototype.consumeCharRef = function() {
      var t = this.input.indexOf(";", this.index);
      if (t !== -1) {
        var s = this.input.slice(this.index, t), i = this.entityParser.parse(s);
        if (i) {
          for (var n = s.length; n; )
            this.consume(), n--;
          return this.consume(), i;
        }
      }
    }, e.prototype.markTagStart = function() {
      this.delegate.tagOpen();
    }, e.prototype.appendToTagName = function(t) {
      this.tagNameBuffer += t, this.delegate.appendToTagName(t);
    }, e.prototype.isIgnoredEndTag = function() {
      var t = this.tagNameBuffer;
      return t === "title" && this.input.substring(this.index, this.index + 8) !== "</title>" || t === "style" && this.input.substring(this.index, this.index + 8) !== "</style>" || t === "script" && this.input.substring(this.index, this.index + 9) !== "<\/script>";
    }, e;
  }()
), Ln = (
  /** @class */
  function() {
    function e(t, s) {
      s === void 0 && (s = {}), this.options = s, this.token = null, this.startLine = 1, this.startColumn = 0, this.tokens = [], this.tokenizer = new On(this, t, s.mode), this._currentAttribute = void 0;
    }
    return e.prototype.tokenize = function(t) {
      return this.tokens = [], this.tokenizer.tokenize(t), this.tokens;
    }, e.prototype.tokenizePart = function(t) {
      return this.tokens = [], this.tokenizer.tokenizePart(t), this.tokens;
    }, e.prototype.tokenizeEOF = function() {
      return this.tokens = [], this.tokenizer.tokenizeEOF(), this.tokens[0];
    }, e.prototype.reset = function() {
      this.token = null, this.startLine = 1, this.startColumn = 0;
    }, e.prototype.current = function() {
      var t = this.token;
      if (t === null)
        throw new Error("token was unexpectedly null");
      if (arguments.length === 0)
        return t;
      for (var s = 0; s < arguments.length; s++)
        if (t.type === arguments[s])
          return t;
      throw new Error("token type was unexpectedly " + t.type);
    }, e.prototype.push = function(t) {
      this.token = t, this.tokens.push(t);
    }, e.prototype.currentAttribute = function() {
      return this._currentAttribute;
    }, e.prototype.addLocInfo = function() {
      this.options.loc && (this.current().loc = {
        start: {
          line: this.startLine,
          column: this.startColumn
        },
        end: {
          line: this.tokenizer.line,
          column: this.tokenizer.column
        }
      }), this.startLine = this.tokenizer.line, this.startColumn = this.tokenizer.column;
    }, e.prototype.beginDoctype = function() {
      this.push({
        type: "Doctype",
        name: ""
      });
    }, e.prototype.appendToDoctypeName = function(t) {
      this.current(
        "Doctype"
        /* Doctype */
      ).name += t;
    }, e.prototype.appendToDoctypePublicIdentifier = function(t) {
      var s = this.current(
        "Doctype"
        /* Doctype */
      );
      s.publicIdentifier === void 0 ? s.publicIdentifier = t : s.publicIdentifier += t;
    }, e.prototype.appendToDoctypeSystemIdentifier = function(t) {
      var s = this.current(
        "Doctype"
        /* Doctype */
      );
      s.systemIdentifier === void 0 ? s.systemIdentifier = t : s.systemIdentifier += t;
    }, e.prototype.endDoctype = function() {
      this.addLocInfo();
    }, e.prototype.beginData = function() {
      this.push({
        type: "Chars",
        chars: ""
      });
    }, e.prototype.appendToData = function(t) {
      this.current(
        "Chars"
        /* Chars */
      ).chars += t;
    }, e.prototype.finishData = function() {
      this.addLocInfo();
    }, e.prototype.beginComment = function() {
      this.push({
        type: "Comment",
        chars: ""
      });
    }, e.prototype.appendToCommentData = function(t) {
      this.current(
        "Comment"
        /* Comment */
      ).chars += t;
    }, e.prototype.finishComment = function() {
      this.addLocInfo();
    }, e.prototype.tagOpen = function() {
    }, e.prototype.beginStartTag = function() {
      this.push({
        type: "StartTag",
        tagName: "",
        attributes: [],
        selfClosing: !1
      });
    }, e.prototype.beginEndTag = function() {
      this.push({
        type: "EndTag",
        tagName: ""
      });
    }, e.prototype.finishTag = function() {
      this.addLocInfo();
    }, e.prototype.markTagAsSelfClosing = function() {
      this.current(
        "StartTag"
        /* StartTag */
      ).selfClosing = !0;
    }, e.prototype.appendToTagName = function(t) {
      this.current(
        "StartTag",
        "EndTag"
        /* EndTag */
      ).tagName += t;
    }, e.prototype.beginAttribute = function() {
      this._currentAttribute = ["", "", !1];
    }, e.prototype.appendToAttributeName = function(t) {
      this.currentAttribute()[0] += t;
    }, e.prototype.beginAttributeValue = function(t) {
      this.currentAttribute()[2] = t;
    }, e.prototype.appendToAttributeValue = function(t) {
      this.currentAttribute()[1] += t;
    }, e.prototype.finishAttributeValue = function() {
      this.current(
        "StartTag"
        /* StartTag */
      ).attributes.push(this._currentAttribute);
    }, e.prototype.reportSyntaxError = function(t) {
      this.current().syntaxError = t;
    }, e;
  }()
);
function Rn(e, t) {
  var s = new Ln(new Nn(En), t);
  return s.tokenize(e);
}
const hs = "LinkifyResult", lt = "StartTag", ps = "EndTag", It = "Chars", Hn = "Comment", Pn = "Doctype";
function gs(e, t) {
  t === void 0 && (t = {});
  const s = Rn(e), i = [], n = [], o = new Mt(t, Un);
  for (let a = 0; a < s.length; a++) {
    const r = s[a];
    if (r.type === lt) {
      i.push(r);
      const u = r.tagName.toUpperCase();
      if (!(u === "A" || o.ignoreTags.indexOf(u) >= 0))
        continue;
      let b = i.length;
      Bn(u, s, ++a, i), a += i.length - b - 1;
    } else if (r.type !== It)
      i.push(r);
    else {
      const u = Mn(r.chars, o);
      i.push.apply(i, u);
    }
  }
  for (let a = 0; a < i.length; a++) {
    const r = i[a];
    switch (r.type) {
      case hs:
        n.push(r.rendered);
        break;
      case lt: {
        let u = "<" + r.tagName;
        r.attributes.length > 0 && (u += " " + zn(r.attributes).join(" ")), r.selfClosing && (u += " /"), u += ">", n.push(u);
        break;
      }
      case ps:
        n.push(`</${r.tagName}>`);
        break;
      case It:
        n.push(xt(r.chars));
        break;
      case Hn:
        n.push(`<!--${xt(r.chars)}-->`);
        break;
      case Pn: {
        let u = `<!DOCTYPE ${r.name}`;
        r.publicIdentifier && (u += ` PUBLIC "${r.publicIdentifier}"`), r.systemIdentifier && (u += ` "${r.systemIdentifier}"`), u += ">", n.push(u);
        break;
      }
    }
  }
  return n.join("");
}
function Mn(e, t) {
  const s = Sn(e), i = [];
  for (let n = 0; n < s.length; n++) {
    const o = s[n];
    o.t === "nl" && t.get("nl2br") ? i.push({
      type: lt,
      tagName: "br",
      attributes: [],
      selfClosing: !0
    }) : !o.isLink || !t.check(o) ? i.push({
      type: It,
      chars: o.toString()
    }) : i.push({
      type: hs,
      rendered: t.render(o)
    });
  }
  return i;
}
function Bn(e, t, s, i) {
  let n = 1;
  for (; s < t.length && n > 0; ) {
    let o = t[s];
    o.type === lt && o.tagName.toUpperCase() === e ? n++ : o.type === ps && o.tagName.toUpperCase() === e && n--, i.push(o), s++;
  }
  return i;
}
function Un(e) {
  let {
    tagName: t,
    attributes: s,
    content: i
  } = e;
  return `<${t} ${jn(s)}>${xt(i)}</${t}>`;
}
function xt(e) {
  return e.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function ms(e) {
  return e.replace(/"/g, "&quot;");
}
function jn(e) {
  const t = [];
  for (const s in e) {
    const i = e[s] + "";
    t.push(`${s}="${ms(i)}"`);
  }
  return t.join(" ");
}
function zn(e) {
  const t = [];
  for (let s = 0; s < e.length; s++) {
    const i = e[s][0], n = e[s][1] + "";
    t.push(`${i}="${ms(n)}"`);
  }
  return t;
}
const $n = /* @__PURE__ */ K({
  __name: "button",
  props: {
    button: {}
  },
  setup(e) {
    const t = F(), s = e;
    function i() {
      t.sendUserMessage(s.button.title);
    }
    return (n, o) => (d(), y("button", {
      class: "tvk-btn tvk-btn-action",
      onClick: i
    }, M(s.button.title), 1));
  }
}), qn = { class: "tvk-footnote" }, Vn = ["href"], Wn = {
  key: 1,
  class: "tvk-footnote-title"
}, Fn = {
  key: 2,
  class: "tvk-footnote-content"
}, Kn = ["innerHTML"], Qn = /* @__PURE__ */ K({
  __name: "footnote",
  props: {
    footnote: {}
  },
  setup(e) {
    const t = B.getOptions(), s = e, i = R(!1);
    function n() {
      return gs(s.footnote.content, { target: "_blank" });
    }
    const o = R(null);
    function a() {
      return o.value ? o.value.offsetHeight < o.value.scrollHeight : !1;
    }
    return (r, u) => (d(), y("div", qn, [
      s.footnote.url ? (d(), y("a", {
        key: 0,
        href: s.footnote.url,
        target: "_blank",
        class: "tvk-footnote-title"
      }, M(s.footnote.title), 9, Vn)) : T("", !0),
      s.footnote.url ? T("", !0) : (d(), y("span", Wn, M(s.footnote.title), 1)),
      s.footnote.content ? (d(), y("div", Fn, [
        N("div", {
          ref_key: "contentTxt",
          ref: o,
          style: ce({
            "--tvk-clamp-nb-line": l(t).preferences.messages.footNotes.clampSourceContentNbLines
          }),
          class: he({
            "tvk-clamp": l(t).preferences.messages.footNotes.clampSourceContent && !i.value
          })
        }, [
          N("span", {
            innerHTML: n()
          }, null, 8, Kn)
        ], 6),
        s.footnote.content && l(t).preferences.messages.footNotes.clampSourceContent && !i.value && a() ? (d(), y("a", {
          key: 0,
          href: "javascript:void(0)",
          class: "tvk-footnote-content-show-more-link",
          onClick: u[0] || (u[0] = (f) => i.value = !i.value)
        }, M(l(t).wording.messages.message.footnotes.showMoreLink), 1)) : T("", !0)
      ])) : T("", !0)
    ]));
  }
}), Gn = { class: "tvk-footnotes" }, Jn = { class: "tvk-footnotes-sources-label" }, ys = /* @__PURE__ */ K({
  __name: "footnotes",
  props: {
    footnotes: {}
  },
  setup(e) {
    const t = B.getOptions(), s = e;
    return (i, n) => (d(), y("div", Gn, [
      N("span", Jn, M(l(t).wording.messages.message.footnotes.sources), 1),
      (d(!0), y(pe, null, ut(s.footnotes, (o) => (d(), te(Qn, { footnote: o }, null, 8, ["footnote"]))), 256))
    ]));
  }
}), Yn = ["innerHTML"], Xn = /* @__PURE__ */ K({
  __name: "message-text",
  props: {
    message: {}
  },
  setup(e) {
    const t = B.getOptions(), s = e;
    function i() {
      return gs(s.message.text, { target: "_blank" });
    }
    return (n, o) => {
      var a;
      return d(), y(pe, null, [
        N("div", {
          innerHTML: i(),
          tabindex: "1"
        }, null, 8, Yn),
        (a = s.message.footnotes) != null && a.length && l(t).preferences.messages.footNotes.display && !l(t).preferences.messages.footNotes.displayOnMessageSide ? (d(), te(ys, {
          key: 0,
          footnotes: s.message.footnotes
        }, null, 8, ["footnotes"])) : T("", !0),
        (d(!0), y(pe, null, ut(s.message.buttons, (r) => (d(), te($n, { button: r }, {
          default: Rs(() => [
            Le(M(r.title), 1)
          ]),
          _: 2
        }, 1032, ["button"]))), 256))
      ], 64);
    };
  }
}), Zn = { class: "tvk-card" }, ei = ["src", "alt"], ti = { key: 1 }, si = { key: 2 }, ni = { key: 3 }, bs = /* @__PURE__ */ K({
  __name: "message-card",
  props: {
    card: {}
  },
  setup(e) {
    var o, a, r;
    const t = F();
    B.getOptions();
    const s = e, i = ((a = (o = s.card) == null ? void 0 : o.file) == null ? void 0 : a.description) ?? ((r = s.card) == null ? void 0 : r.title);
    function n(u) {
      s.card.file._loaded || (s.card.file._loaded = !0, t.scrollMessages());
    }
    return (u, f) => {
      var b, p, h, D, k, g, E, S, w, _, V, I;
      return d(), y("div", Zn, [
        (p = (b = s.card) == null ? void 0 : b.file) != null && p.url ? (d(), y("img", {
          key: 0,
          src: (D = (h = s.card) == null ? void 0 : h.file) == null ? void 0 : D.url,
          alt: l(i),
          onLoad: n,
          class: "tvk-thumbnail"
        }, null, 40, ei)) : T("", !0),
        (k = s.card) != null && k.title ? (d(), y("div", ti, [
          N("strong", null, M((g = s.card) == null ? void 0 : g.title), 1)
        ])) : T("", !0),
        (E = s.card) != null && E.subTitle ? (d(), y("div", si, M((S = s.card) == null ? void 0 : S.subTitle), 1)) : T("", !0),
        (_ = (w = s.card) == null ? void 0 : w.file) != null && _.description ? (d(), y("div", ni, M((I = (V = s.card) == null ? void 0 : V.file) == null ? void 0 : I.description), 1)) : T("", !0)
      ]);
    };
  }
}), Gt = "transform 0.2s", ii = /* @__PURE__ */ K({
  __name: "message-carousel",
  props: {
    carousel: {}
  },
  setup(e) {
    const s = R(e.carousel.cards), i = R([]), n = R(null), o = R(null), a = R({}), r = R({}), u = R(!1);
    function f() {
      var E;
      const g = (E = n.value) == null ? void 0 : E.offsetWidth;
      a.value = {
        overflow: "hidden",
        "max-width": `${g}px`
      };
    }
    function b() {
      return i.value.reduce((g, E) => g + E.offsetWidth, 0);
    }
    function p() {
      if (u.value)
        return;
      u.value = !0, f();
      const g = b(), E = s.value[0];
      s.value.push(E);
      const S = i.value[0];
      r.value = {
        transition: Gt,
        transform: `translateX(-${S.offsetWidth}px)`,
        width: `${g + S.offsetWidth + 1}px`
      }, D(() => {
        s.value.shift(), k(), u.value = !1;
      });
    }
    function h() {
      if (u.value)
        return;
      u.value = !0, f();
      const g = b(), E = s.value[s.value.length - 1];
      s.value.unshift(E);
      const S = i.value[i.value.length - 1];
      r.value = {
        transition: "none",
        transform: `translateX(-${S.offsetWidth}px)`,
        width: `${g + S.offsetWidth + 1}px`
      }, setTimeout(() => {
        r.value = {
          transition: Gt,
          transform: "translateX(0)",
          width: `${g + S.offsetWidth + 1}px`
        }, D(() => {
          s.value.pop(), k(), u.value = !1;
        });
      });
    }
    function D(g) {
      var S;
      const E = () => {
        var w;
        g(), (w = o.value) == null || w.removeEventListener("transitionend", E);
      };
      (S = o.value) == null || S.addEventListener("transitionend", E);
    }
    function k() {
      a.value = {}, r.value = {
        transition: "none",
        transform: "translateX(0)"
      };
    }
    return (g, E) => (d(), y(pe, null, [
      N("div", {
        class: "tvk-carousel",
        ref_key: "carouselRef",
        ref: n,
        style: ce(a.value)
      }, [
        N("div", {
          class: "tvk-carousel-inner",
          ref_key: "innerRef",
          ref: o,
          style: ce(r.value)
        }, [
          (d(!0), y(pe, null, ut(s.value, (S) => (d(), y("div", {
            class: "tvk-carousel-card",
            key: JSON.stringify(S),
            ref_for: !0,
            ref_key: "cardsRefs",
            ref: i
          }, [
            wt(bs, { card: S }, null, 8, ["card"])
          ]))), 128))
        ], 4)
      ], 4),
      N("div", { class: "tvk-carousel-controls" }, [
        N("button", {
          class: "tvk-btn",
          onClick: h
        }, "prev"),
        N("button", {
          class: "tvk-btn",
          onClick: p
        }, "next")
      ])
    ], 64));
  }
}), oi = /* @__PURE__ */ K({
  __name: "message-image",
  props: { message: Object },
  setup(e) {
    return B.getOptions(), (t, s) => "Image type not yet implemented";
  }
}), ai = { class: "tvk-message-answer" }, ri = {
  key: 0,
  class: "tvk-message-header"
}, ci = {
  key: 0,
  class: "tvk-message-header-avatar"
}, li = ["src"], ui = ["src"], di = {
  key: 1,
  class: "tvk-message-header-label"
}, fi = { class: "tvk-message-header-label-user" }, hi = { class: "tvk-message-header-label-bot" }, pi = {
  key: 1,
  class: "tvk-message-body"
}, gi = {
  key: 2,
  class: "tvk-message-body-from-app"
}, mi = {
  key: 0,
  class: "tvk-message-loader"
}, yi = {
  key: 1,
  class: "tvk-error-connection"
}, bi = /* @__PURE__ */ N("i", { class: "tvk-error-icon bi bi-exclamation-triangle" }, null, -1), vi = {
  key: 0,
  class: "tvk-side-footnotes"
}, Ti = /* @__PURE__ */ K({
  __name: "message",
  props: {
    message: {}
  },
  setup(e) {
    const t = B.getOptions(), s = e;
    return (i, n) => {
      var o;
      return s.message.author !== l(x).user || !l(t).preferences.messages.message.hideUserMessages ? (d(), y("div", {
        key: 0,
        class: he(["tvk-message", {
          "tvk-message-user": s.message.author === l(x).user,
          "tvk-message-bot": s.message.author === l(x).bot
        }])
      }, [
        N("div", ai, [
          l(t).preferences.messages.message.header.display && s.message.author !== l(x).app ? (d(), y("div", ri, [
            l(t).preferences.messages.message.header.avatar.display ? (d(), y("div", ci, [
              !l(t).preferences.messages.message.header.avatar.userImage && l(t).preferences.messages.message.header.avatar.userIcon && s.message.author === l(x).user ? (d(), y("i", {
                key: 0,
                class: he([
                  "tvk-message-header-avatar-user",
                  l(t).preferences.messages.message.header.avatar.userIcon
                ])
              }, null, 2)) : T("", !0),
              l(t).preferences.messages.message.header.avatar.userImage && s.message.author === l(x).user ? (d(), y("img", {
                key: 1,
                src: l(t).preferences.messages.message.header.avatar.userImage.src,
                style: ce({
                  width: l(t).preferences.messages.message.header.avatar.userImage.width,
                  height: l(t).preferences.messages.message.header.avatar.userImage.height
                }),
                role: "none"
              }, null, 12, li)) : T("", !0),
              !l(t).preferences.messages.message.header.avatar.botImage && l(t).preferences.messages.message.header.avatar.botIcon && s.message.author === l(x).bot ? (d(), y("i", {
                key: 2,
                class: he([
                  "tvk-message-header-avatar-bot",
                  l(t).preferences.messages.message.header.avatar.botIcon
                ])
              }, null, 2)) : T("", !0),
              l(t).preferences.messages.message.header.avatar.botImage && s.message.author === l(x).bot ? (d(), y("img", {
                key: 3,
                src: l(t).preferences.messages.message.header.avatar.botImage.src,
                style: ce({
                  width: l(t).preferences.messages.message.header.avatar.botImage.width,
                  height: l(t).preferences.messages.message.header.avatar.botImage.height
                }),
                role: "none"
              }, null, 12, ui)) : T("", !0)
            ])) : T("", !0),
            l(t).preferences.messages.message.header.label.display ? (d(), y("div", di, [
              N("span", fi, M(l(t).wording.messages.message.header.labelUser), 1),
              N("span", hi, M(l(t).wording.messages.message.header.labelBot), 1)
            ])) : T("", !0)
          ])) : T("", !0),
          s.message.author !== l(x).app ? (d(), y("div", pi, [
            s.message.type === l(P).message ? (d(), te(Xn, {
              key: 0,
              message: s.message
            }, null, 8, ["message"])) : T("", !0),
            s.message.type === l(P).card ? (d(), te(bs, {
              key: 1,
              card: s.message
            }, null, 8, ["card"])) : T("", !0),
            s.message.type === l(P).carousel ? (d(), te(ii, {
              key: 2,
              carousel: s.message
            }, null, 8, ["carousel"])) : T("", !0),
            s.message.type === l(P).image ? (d(), te(oi, {
              key: 3,
              message: s.message
            }, null, 8, ["message"])) : T("", !0)
          ])) : T("", !0),
          s.message.author === l(x).app ? (d(), y("div", gi, [
            s.message.type === l(P).loader ? (d(), y("div", mi)) : T("", !0),
            s.message.type === l(P).error ? (d(), y("div", yi, [
              bi,
              Le(" " + M(s.message.text), 1)
            ])) : T("", !0)
          ])) : T("", !0)
        ]),
        (o = s.message.footnotes) != null && o.length && l(t).preferences.messages.footNotes.display && l(t).preferences.messages.footNotes.displayOnMessageSide ? (d(), y("div", vi, [
          wt(ys, {
            footnotes: s.message.footnotes
          }, null, 8, ["footnotes"])
        ])) : T("", !0)
      ], 2)) : T("", !0);
    };
  }
}), ki = /* @__PURE__ */ N("div", { class: "tvk-shader tvk-shader-top" }, null, -1), Si = /* @__PURE__ */ N("div", { class: "tvk-shader tvk-shader-bottom" }, null, -1), Ei = /* @__PURE__ */ K({
  __name: "messages",
  setup(e) {
    const t = F(), s = R();
    function i() {
      setTimeout(() => {
        s.value.scrollTop = s.value.scrollHeight;
      }, 100);
    }
    return Hs(() => {
      i();
    }), t.$onAction(({ name: n, store: o, args: a, after: r }) => {
      n === "scrollMessages" && r(() => {
        setTimeout(() => {
          i();
        });
      });
    }), (n, o) => (d(), y("div", {
      ref_key: "messagesWrapper",
      ref: s,
      class: "tvk-messages"
    }, [
      ki,
      (d(!0), y(pe, null, ut(l(t).getMessages, (a) => (d(), te(Ti, { message: a }, null, 8, ["message"]))), 256)),
      Si
    ], 512));
  }
}), Ci = /* @__PURE__ */ K({
  __name: "App",
  setup(e) {
    const t = B.getOptions(), s = F();
    let i = R(o()), n = R(!0);
    function o() {
      return (Math.random() + 1).toString(36).substring(7);
    }
    return s.$onAction(({ name: a, store: r, args: u, after: f }) => {
      a === "updateApplication" && f(() => {
        i.value = o(), n.value = !1, setTimeout(() => {
          n.value = !0;
        });
      });
    }), (a, r) => l(n) ? (d(), y("div", {
      class: "tvk-wrapper",
      key: l(i)
    }, [
      l(s).getMessages.length || !l(t).preferences.messages.hideIfNoMessages ? (d(), te(Ei, { key: 0 })) : T("", !0),
      wt(an)
    ])) : T("", !0);
  }
});
function Ai() {
  var t, s;
  const e = B.getOptions();
  if ((t = e == null ? void 0 : e.initialization) != null && t.welcomeMessage || (s = e == null ? void 0 : e.initialization) != null && s.openingMessage) {
    const i = F(), n = i.getStoredState();
    (!n || !n.messages.length) && (e.initialization.welcomeMessage && i.addMessage({
      type: P.message,
      author: x.bot,
      date: Date.now(),
      text: e.initialization.welcomeMessage
    }), e.initialization.openingMessage && i.sendUserMessage(
      e.initialization.openingMessage,
      !1
    ));
  }
}
let Z, vs;
function Ii(e, t, s) {
  return vs = e, Ts(t, s), Z;
}
function xi(e, t) {
  Ts(e, t);
}
function Ts(e, t) {
  Z != null && Z.unmount && Z.unmount(), Z = Ps(Ci), Z.provide(os, e), B.clearInstance(), B.setOptions(t);
  const s = Bs();
  Z.use(s), Z.mount(vs), Ai();
}
function wi() {
  return JSON.parse(JSON.stringify(as));
}
function _i() {
  return JSON.parse(JSON.stringify(B.getOptions()));
}
function Oi(e, t) {
  const s = B.getOptions(), i = e.split(".");
  let n = s;
  for (let o = 0; o < i.length; o++) {
    const a = i[o];
    o < i.length - 1 ? (n[a] || (n[a] = {}), n = n[a]) : (n[a] = t, F().updateApplication());
  }
}
function Li(e) {
  F().addMessage(e);
}
export {
  Li as addTvkMessage,
  _i as getTvkCurrentOptions,
  wi as getTvkDefaultOptions,
  xi as reload,
  Ii as renderChat,
  Oi as updateTvkOption
};
