var Cs = Object.defineProperty;
var As = (e, t, s) => t in e ? Cs(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var ht = (e, t, s) => (As(e, typeof t != "symbol" ? t + "" : t, s), s);
import { effectScope as Jt, ref as H, markRaw as Yt, hasInjectionContext as Ds, inject as Xt, watch as Ns, reactive as _s, isRef as Re, isReactive as Zt, toRaw as Is, getCurrentScope as xs, onScopeDispose as ws, nextTick as Os, toRefs as Ls, computed as es, defineComponent as Q, openBlock as d, createElementBlock as g, unref as l, normalizeClass as me, createCommentVNode as T, normalizeStyle as ue, createTextVNode as Ee, toDisplayString as w, createElementVNode as N, withModifiers as Rs, withDirectives as Hs, vModelText as Ps, Fragment as de, renderList as De, createBlock as X, withCtx as ts, createVNode as xt, onMounted as Ms, createApp as Bs } from "vue";
var Us = !1;
/*!
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */
let ss;
const dt = (e) => ss = e, ns = (
  /* istanbul ignore next */
  Symbol()
);
function bt(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var ve;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(ve || (ve = {}));
function js() {
  const e = Jt(!0), t = e.run(() => H({}));
  let s = [], i = [];
  const n = Yt({
    install(o) {
      dt(n), n._a = o, o.provide(ns, n), o.config.globalProperties.$pinia = n, i.forEach((a) => s.push(a)), i = [];
    },
    use(o) {
      return !this._a && !Us ? i.push(o) : s.push(o), this;
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
const is = () => {
};
function Bt(e, t, s, i = is) {
  e.push(t);
  const n = () => {
    const o = e.indexOf(t);
    o > -1 && (e.splice(o, 1), i());
  };
  return !s && xs() && ws(n), n;
}
function he(e, ...t) {
  e.slice().forEach((s) => {
    s(...t);
  });
}
const zs = (e) => e();
function vt(e, t) {
  e instanceof Map && t instanceof Map && t.forEach((s, i) => e.set(i, s)), e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const s in t) {
    if (!t.hasOwnProperty(s))
      continue;
    const i = t[s], n = e[s];
    bt(n) && bt(i) && e.hasOwnProperty(s) && !Re(i) && !Zt(i) ? e[s] = vt(n, i) : e[s] = i;
  }
  return e;
}
const $s = (
  /* istanbul ignore next */
  Symbol()
);
function qs(e) {
  return !bt(e) || !e.hasOwnProperty($s);
}
const { assign: oe } = Object;
function Vs(e) {
  return !!(Re(e) && e.effect);
}
function Ws(e, t, s, i) {
  const { state: n, actions: o, getters: a } = t, r = s.state.value[e];
  let u;
  function f() {
    r || (s.state.value[e] = n ? n() : {});
    const b = Ls(s.state.value[e]);
    return oe(b, o, Object.keys(a || {}).reduce((p, h) => (p[h] = Yt(es(() => {
      dt(s);
      const D = s._s.get(e);
      return a[h].call(D, D);
    })), p), {}));
  }
  return u = os(e, f, t, s, i, !0), u;
}
function os(e, t, s = {}, i, n, o) {
  let a;
  const r = oe({ actions: {} }, s), u = {
    deep: !0
    // flush: 'post',
  };
  let f, b, p = [], h = [], D;
  const k = i.state.value[e];
  !o && !k && (i.state.value[e] = {}), H({});
  let m;
  function A(S) {
    let E;
    f = b = !1, typeof S == "function" ? (S(i.state.value[e]), E = {
      type: ve.patchFunction,
      storeId: e,
      events: D
    }) : (vt(i.state.value[e], S), E = {
      type: ve.patchObject,
      payload: S,
      storeId: e,
      events: D
    });
    const B = m = Symbol();
    Os().then(() => {
      m === B && (f = !0);
    }), b = !0, he(p, E, i.state.value[e]);
  }
  const C = o ? function() {
    const { state: E } = s, B = E ? E() : {};
    this.$patch((z) => {
      oe(z, B);
    });
  } : (
    /* istanbul ignore next */
    is
  );
  function O() {
    a.stop(), p = [], h = [], i._s.delete(e);
  }
  function L(S, E) {
    return function() {
      dt(i);
      const B = Array.from(arguments), z = [], F = [];
      function ne(R) {
        z.push(R);
      }
      function ce(R) {
        F.push(R);
      }
      he(h, {
        args: B,
        name: S,
        store: I,
        after: ne,
        onError: ce
      });
      let Z;
      try {
        Z = E.apply(this && this.$id === e ? this : I, B);
      } catch (R) {
        throw he(F, R), R;
      }
      return Z instanceof Promise ? Z.then((R) => (he(z, R), R)).catch((R) => (he(F, R), Promise.reject(R))) : (he(z, Z), Z);
    };
  }
  const W = {
    _p: i,
    // _s: scope,
    $id: e,
    $onAction: Bt.bind(null, h),
    $patch: A,
    $reset: C,
    $subscribe(S, E = {}) {
      const B = Bt(p, S, E.detached, () => z()), z = a.run(() => Ns(() => i.state.value[e], (F) => {
        (E.flush === "sync" ? b : f) && S({
          storeId: e,
          type: ve.direct,
          events: D
        }, F);
      }, oe({}, u, E)));
      return B;
    },
    $dispose: O
  }, I = _s(W);
  i._s.set(e, I);
  const _ = (i._a && i._a.runWithContext || zs)(() => i._e.run(() => (a = Jt()).run(t)));
  for (const S in _) {
    const E = _[S];
    if (Re(E) && !Vs(E) || Zt(E))
      o || (k && qs(E) && (Re(E) ? E.value = k[S] : vt(E, k[S])), i.state.value[e][S] = E);
    else if (typeof E == "function") {
      const B = L(S, E);
      _[S] = B, r.actions[S] = E;
    }
  }
  return oe(I, _), oe(Is(I), _), Object.defineProperty(I, "$state", {
    get: () => i.state.value[e],
    set: (S) => {
      A((E) => {
        oe(E, S);
      });
    }
  }), i._p.forEach((S) => {
    oe(I, a.run(() => S({
      store: I,
      app: i._a,
      pinia: i,
      options: r
    })));
  }), k && o && s.hydrate && s.hydrate(I.$state, k), f = !0, b = !0, I;
}
function Fs(e, t, s) {
  let i, n;
  const o = typeof t == "function";
  typeof e == "string" ? (i = e, n = o ? s : t) : (n = e, i = e.id);
  function a(r, u) {
    const f = Ds();
    return r = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    r || (f ? Xt(ns, null) : null), r && dt(r), r = ss, r._s.has(i) || (o ? os(i, t, n, r) : Ws(i, n, r)), r._s.get(i);
  }
  return a.$id = i, a;
}
function Ks() {
  const e = Date.now().toString(36), t = Math.random().toString(36).substr(2, 5);
  return (e + t).toUpperCase();
}
const as = Symbol("tockEndpointKey");
var x = /* @__PURE__ */ ((e) => (e.bot = "bot", e.user = "user", e.app = "app", e))(x || {}), M = /* @__PURE__ */ ((e) => (e.message = "message", e.card = "card", e.carousel = "carousel", e.image = "image", e.loader = "loader", e.error = "error", e))(M || {}), rs = /* @__PURE__ */ ((e) => (e.web_url = "web_url", e.postback = "postback", e.quick_reply = "quick_reply", e))(rs || {});
function we(e) {
  return !!(e && typeof e == "object" && !Array.isArray(e));
}
function Tt(e, ...t) {
  if (!t.length)
    return e;
  const s = t.shift();
  if (we(e) && we(s))
    for (const i in s)
      we(s[i]) ? (e[i] || Object.assign(e, { [i]: {} }), Tt(e[i], s[i])) : Object.assign(e, { [i]: s[i] });
  return Tt(e, ...t);
}
const Qs = {
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
}, Gs = {
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
}, Js = {
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
}, Ys = {
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
}, cs = {
  localStorage: Qs,
  initialization: Gs,
  preferences: Js,
  wording: Ys
};
function Xs(e) {
  return "type" in e && "default" in e && "title" in e && "description" in e;
}
function ls(e, t = {}) {
  if (we(e)) {
    if (Xs(e))
      return e.default;
    {
      const s = Object.entries(e);
      for (let i = 0; i < s.length; i++) {
        const [n, o] = s[i];
        t[n] = ls(o);
      }
      return t;
    }
  }
}
const se = class se {
  constructor(t) {
    ht(this, "options");
    const s = ls(cs);
    this.options = Tt(s, t);
  }
  static clearInstance() {
    se.instance && (se.instance = void 0);
  }
  static setOptions(t) {
    se.instance = new se(t);
  }
  static getOptions() {
    if (!se.instance)
      throw new Error("No TVK instance avalaible.");
    return se.instance.options;
  }
};
ht(se, "instance");
let j = se;
const Zs = "main", Ut = "main_storage", en = () => ({
  userId: Ks(),
  messages: []
}), K = Fs(Zs, () => {
  const e = Xt(as), t = j.getOptions(), s = H(n());
  function i() {
  }
  function n() {
    if (t.localStorage.enabled) {
      const m = o();
      if (m)
        return m;
    }
    return en();
  }
  function o() {
    if (!t.localStorage.enabled)
      return !1;
    const m = localStorage.getItem(a());
    return m ? JSON.parse(m) : !1;
  }
  function a() {
    let m = Ut;
    return t.localStorage.prefix && (m = `${Ut}_${t.localStorage.prefix}`), m;
  }
  const r = es(
    () => s.value.messages
  );
  function u() {
    s.value.messages = s.value.messages.filter((m) => m.type !== M.loader);
  }
  function f() {
  }
  function b(m) {
    const A = K();
    A.clearLoaderMessages(), A.scrollMessages(), s.value.messages.push(m);
  }
  function p() {
    const m = new Headers({ "Content-Type": "application/json" });
    return t.initialization.extraHeaders && Object.entries(t.initialization.extraHeaders).forEach(
      (A) => {
        m.append(A[0], A[1]);
      }
    ), m;
  }
  function h() {
    K().addMessage({
      type: M.error,
      author: x.app,
      date: Date.now(),
      text: t.wording.connectionErrorMessage
    });
  }
  async function D(m, A = !0) {
    const C = K();
    t.preferences.messages.clearOnNewRequest && (s.value.messages = []), A && C.addMessage({
      type: M.message,
      author: x.user,
      text: m,
      date: Date.now()
    }), C.addMessage({
      type: M.loader,
      author: x.app,
      date: Date.now()
    });
    const O = navigator.language, L = {
      query: m,
      userId: s.value.userId,
      locale: O,
      sourceWithContent: t.preferences.messages.footNotes.requireSourcesContent
    };
    let W;
    try {
      W = await fetch(e, {
        method: "post",
        body: JSON.stringify(L),
        headers: p()
      });
    } catch (v) {
      console.log(v), h();
      return;
    }
    if (!W.ok) {
      console.log(W), h();
      return;
    }
    let I;
    try {
      I = await W.json();
    } catch (v) {
      console.log(v), h();
      return;
    }
    if (C.clearLoaderMessages(), I.responses.forEach((v) => {
      delete v.type, delete v.version, "text" in v ? C.addMessage({
        type: M.message,
        author: x.bot,
        date: Date.now(),
        ...v
      }) : "card" in v ? C.addMessage({
        type: M.card,
        author: x.bot,
        date: Date.now(),
        ...v.card
      }) : "image" in v ? C.addMessage({
        type: M.image,
        author: x.bot,
        date: Date.now(),
        ...v.image
      }) : "carousel" in v && C.addMessage({
        type: M.carousel,
        author: x.bot,
        date: Date.now(),
        ...v.carousel
      });
    }), t.localStorage.enabled) {
      let v = JSON.stringify(s.value);
      if (t.localStorage.maxNumberMessages && s.value.messages.length > t.localStorage.maxNumberMessages) {
        const _ = JSON.parse(v), S = _.messages.length - parseInt(
          t.localStorage.maxNumberMessages
        );
        S && (_.messages = _.messages.slice(
          S,
          _.messages.length + 1
        )), v = JSON.stringify(_);
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
}), tn = ["aria-label"], sn = ["src"], nn = ["maxlength", "placeholder"], on = { class: "tvk-question-bar-chars-count" }, an = ["disabled", "aria-label"], rn = ["src"], cn = /* @__PURE__ */ Q({
  __name: "question-block",
  setup(e) {
    const t = j.getOptions(), s = K(), i = t.preferences.questionBar.maxUserInputLength, n = H(null), o = H("");
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
      return d(), g("div", {
        class: "tvk-question-bar",
        onClick: a
      }, [
        (D = l(t).preferences.questionBar.clearHistory) != null && D.display ? (d(), g("button", {
          key: 0,
          class: "tvk-btn tvk-question-bar-btn-clear-history",
          "aria-label": l(t).wording.questionBar.clearHistoryAriaLabel,
          onClick: b
        }, [
          !l(t).preferences.questionBar.clearHistory.image && l(t).preferences.questionBar.clearHistory.icon ? (d(), g("i", {
            key: 0,
            class: me(l(t).preferences.questionBar.clearHistory.icon)
          }, null, 2)) : T("", !0),
          l(t).preferences.questionBar.clearHistory.image ? (d(), g("img", {
            key: 1,
            src: l(t).preferences.questionBar.clearHistory.image.src,
            style: ue({
              width: l(t).preferences.questionBar.clearHistory.image.width,
              height: l(t).preferences.questionBar.clearHistory.image.height
            })
          }, null, 12, sn)) : T("", !0),
          Ee(" " + w(l(t).wording.questionBar.clearHistory), 1)
        ], 8, tn)) : T("", !0),
        N("form", {
          onSubmit: Rs(f, ["prevent"]),
          class: "tvk-question-bar-form"
        }, [
          Hs(N("input", {
            ref_key: "input",
            ref: n,
            type: "text",
            class: "tvk-question-bar-input",
            rows: "1",
            maxlength: l(t).preferences.questionBar.maxUserInputLength,
            placeholder: l(t).wording.questionBar.input.placeholder,
            "onUpdate:modelValue": h[0] || (h[0] = (k) => o.value = k)
          }, null, 8, nn), [
            [Ps, o.value]
          ]),
          N("div", on, w(r()) + "/" + w(l(i)), 1)
        ], 32),
        N("button", {
          disabled: !o.value.trim().length || u(),
          class: "tvk-btn tvk-question-bar-btn-submit",
          "aria-label": l(t).wording.questionBar.submitAriaLabel,
          onClick: f
        }, [
          !l(t).preferences.questionBar.submit.image && l(t).preferences.questionBar.submit.icon ? (d(), g("i", {
            key: 0,
            class: me(l(t).preferences.questionBar.submit.icon)
          }, null, 2)) : T("", !0),
          l(t).preferences.questionBar.submit.image ? (d(), g("img", {
            key: 1,
            src: l(t).preferences.questionBar.submit.image.src,
            style: ue({
              width: l(t).preferences.questionBar.submit.image.width,
              height: l(t).preferences.questionBar.submit.image.height
            })
          }, null, 12, rn)) : T("", !0),
          Ee(" " + w(l(t).wording.questionBar.submit), 1)
        ], 8, an)
      ]);
    };
  }
}), ln = "aaa1rp3bb0ott3vie4c1le2ogado5udhabi7c0ademy5centure6ountant0s9o1tor4d0s1ult4e0g1ro2tna4f0l1rica5g0akhan5ency5i0g1rbus3force5tel5kdn3l0ibaba4pay4lfinanz6state5y2sace3tom5m0azon4ericanexpress7family11x2fam3ica3sterdam8nalytics7droid5quan4z2o0l2partments8p0le4q0uarelle8r0ab1mco4chi3my2pa2t0e3s0da2ia2sociates9t0hleta5torney7u0ction5di0ble3o3spost5thor3o0s4vianca6w0s2x0a2z0ure5ba0by2idu3namex3narepublic11d1k2r0celona5laycard4s5efoot5gains6seball5ketball8uhaus5yern5b0c1t1va3cg1n2d1e0ats2uty4er2ntley5rlin4st0buy5t2f1g1h0arti5i0ble3d1ke2ng0o3o1z2j1lack0friday9ockbuster8g1omberg7ue3m0s1w2n0pparibas9o0ats3ehringer8fa2m1nd2o0k0ing5sch2tik2on4t1utique6x2r0adesco6idgestone9oadway5ker3ther5ussels7s1t1uild0ers6siness6y1zz3v1w1y1z0h3ca0b1fe2l0l1vinklein9m0era3p2non3petown5ital0one8r0avan4ds2e0er0s4s2sa1e1h1ino4t0ering5holic7ba1n1re3c1d1enter4o1rn3f0a1d2g1h0anel2nel4rity4se2t2eap3intai5ristmas6ome4urch5i0priani6rcle4sco3tadel4i0c2y3k1l0aims4eaning6ick2nic1que6othing5ud3ub0med6m1n1o0ach3des3ffee4llege4ogne5m0cast4mbank4unity6pany2re3uter5sec4ndos3struction8ulting7tact3ractors9oking4l1p2rsica5untry4pon0s4rses6pa2r0edit0card4union9icket5own3s1uise0s6u0isinella9v1w1x1y0mru3ou3z2dabur3d1nce3ta1e1ing3sun4y2clk3ds2e0al0er2s3gree4livery5l1oitte5ta3mocrat6ntal2ist5si0gn4v2hl2iamonds6et2gital5rect0ory7scount3ver5h2y2j1k1m1np2o0cs1tor4g1mains5t1wnload7rive4tv2ubai3nlop4pont4rban5vag2r2z2earth3t2c0o2deka3u0cation8e1g1mail3erck5nergy4gineer0ing9terprises10pson4quipment8r0icsson6ni3s0q1tate5t1u0rovision8s2vents5xchange6pert3osed4ress5traspace10fage2il1rwinds6th3mily4n0s2rm0ers5shion4t3edex3edback6rrari3ero6i0delity5o2lm2nal1nce1ial7re0stone6mdale6sh0ing5t0ness6j1k1lickr3ghts4r2orist4wers5y2m1o0o0d1tball6rd1ex2sale4um3undation8x2r0ee1senius7l1ogans4ntier7tr2ujitsu5n0d2rniture7tbol5yi3ga0l0lery3o1up4me0s3p1rden4y2b0iz3d0n2e0a1nt0ing5orge5f1g0ee3h1i0ft0s3ves2ing5l0ass3e1obal2o4m0ail3bh2o1x2n1odaddy5ld0point6f2o0dyear5g0le4p1t1v2p1q1r0ainger5phics5tis4een3ipe3ocery4up4s1t1u0ardian6cci3ge2ide2tars5ru3w1y2hair2mburg5ngout5us3bo2dfc0bank7ealth0care8lp1sinki6re1mes5iphop4samitsu7tachi5v2k0t2m1n1ockey4ldings5iday5medepot5goods5s0ense7nda3rse3spital5t0ing5t0els3mail5use3w2r1sbc3t1u0ghes5yatt3undai7ibm2cbc2e1u2d1e0ee3fm2kano4l1m0amat4db2mo0bilien9n0c1dustries8finiti5o2g1k1stitute6urance4e4t0ernational10uit4vestments10o1piranga7q1r0ish4s0maili5t0anbul7t0au2v3jaguar4va3cb2e0ep2tzt3welry6io2ll2m0p2nj2o0bs1urg4t1y2p0morgan6rs3uegos4niper7kaufen5ddi3e0rryhotels6logistics9properties14fh2g1h1i0a1ds2m1ndle4tchen5wi3m1n1oeln3matsu5sher5p0mg2n2r0d1ed3uokgroup8w1y0oto4z2la0caixa5mborghini8er3ncaster6d0rover6xess5salle5t0ino3robe5w0yer5b1c1ds2ease3clerc5frak4gal2o2xus4gbt3i0dl2fe0insurance9style7ghting6ke2lly3mited4o2ncoln4k2psy3ve1ing5k1lc1p2oan0s3cker3us3l1ndon4tte1o3ve3pl0financial11r1s1t0d0a3u0ndbeck6xe1ury5v1y2ma0drid4if1son4keup4n0agement7go3p1rket0ing3s4riott5shalls7ttel5ba2c0kinsey7d1e0d0ia3et2lbourne7me1orial6n0u2rckmsd7g1h1iami3crosoft7l1ni1t2t0subishi9k1l0b1s2m0a2n1o0bi0le4da2e1i1m1nash3ey2ster5rmon3tgage6scow4to0rcycles9v0ie4p1q1r1s0d2t0n1r2u0seum3ic4v1w1x1y1z2na0b1goya4me2tura4vy3ba2c1e0c1t0bank4flix4work5ustar5w0s2xt0direct7us4f0l2g0o2hk2i0co2ke1on3nja3ssan1y5l1o0kia3rton4w0ruz3tv4p1r0a1w2tt2u1yc2z2obi1server7ffice5kinawa6layan0group9dnavy5lo3m0ega4ne1g1l0ine5oo2pen3racle3nge4g0anic5igins6saka4tsuka4t2vh3pa0ge2nasonic7ris2s1tners4s1y3y2ccw3e0t2f0izer5g1h0armacy6d1ilips5one2to0graphy6s4ysio5ics1tet2ures6d1n0g1k2oneer5zza4k1l0ace2y0station9umbing5s3m1n0c2ohl2ker3litie5rn2st3r0america6xi3ess3ime3o0d0uctions8f1gressive8mo2perties3y5tection8u0dential9s1t1ub2w0c2y2qa1pon3uebec3st5racing4dio4e0ad1lestate6tor2y4cipes5d0stone5umbrella9hab3ise0n3t2liance6n0t0als5pair3ort3ublican8st0aurant8view0s5xroth6ich0ardli6oh3l1o1p2o0cks3deo3gers4om3s0vp3u0gby3hr2n2w0e2yukyu6sa0arland6fe0ty4kura4le1on3msclub4ung5ndvik0coromant12ofi4p1rl2s1ve2xo3b0i1s2c0a1b1haeffler7midt4olarships8ol3ule3warz5ience5ot3d1e0arch3t2cure1ity6ek2lect4ner3rvices6ven3w1x0y3fr2g1h0angrila6rp2w2ell3ia1ksha5oes2p0ping5uji3w3i0lk2na1gles5te3j1k0i0n2y0pe4l0ing4m0art3ile4n0cf3o0ccer3ial4ftbank4ware6hu2lar2utions7ng1y2y2pa0ce3ort2t3r0l2s1t0ada2ples4r1tebank4farm7c0group6ockholm6rage3e3ream4udio2y3yle4u0cks3pplies3y2ort5rf1gery5zuki5v1watch4iss4x1y0dney4stems6z2tab1ipei4lk2obao4rget4tamotors6r2too4x0i3c0i2d0k2eam2ch0nology8l1masek5nnis4va3f1g1h0d1eater2re6iaa2ckets5enda4ps2res2ol4j0maxx4x2k0maxx5l1m0all4n1o0day3kyo3ols3p1ray3shiba5tal3urs3wn2yota3s3r0ade1ing4ining5vel0ers0insurance16ust3v2t1ube2i1nes3shu4v0s2w1z2ua1bank3s2g1k1nicom3versity8o2ol2ps2s1y1z2va0cations7na1guard7c1e0gas3ntures6risign5mögensberater2ung14sicherung10t2g1i0ajes4deo3g1king4llas4n1p1rgin4sa1ion4va1o3laanderen9n1odka3lvo3te1ing3o2yage5u2wales2mart4ter4ng0gou5tch0es6eather0channel12bcam3er2site5d0ding5ibo2r3f1hoswho6ien2ki2lliamhill9n0dows4e1ners6me2olterskluwer11odside6rk0s2ld3w2s1tc1f3xbox3erox4finity6ihuan4n2xx2yz3yachts4hoo3maxun5ndex5e1odobashi7ga2kohama6u0tube6t1un3za0ppos4ra3ero3ip2m1one3uerich6w2", un = "ελ1υ2бг1ел3дети4ею2католик6ом3мкд2он1сква6онлайн5рг3рус2ф2сайт3рб3укр3қаз3հայ3ישראל5קום3ابوظبي5رامكو5لاردن4بحرين5جزائر5سعودية6عليان5مغرب5مارات5یران5بارت2زار4يتك3ھارت5تونس4سودان3رية5شبكة4عراق2ب2مان4فلسطين6قطر3كاثوليك6وم3مصر2ليسيا5وريتانيا7قع4همراه5پاکستان7ڀارت4कॉम3नेट3भारत0म्3ोत5संगठन5বাংলা5ভারত2ৰত4ਭਾਰਤ4ભારત4ଭାରତ4இந்தியா6லங்கை6சிங்கப்பூர்11భారత్5ಭಾರತ4ഭാരതം5ලංකා4คอม3ไทย3ລາວ3გე2みんな3アマゾン4クラウド4グーグル4コム2ストア3セール3ファッション6ポイント4世界2中信1国1國1文网3亚马逊3企业2佛山2信息2健康2八卦2公司1益2台湾1灣2商城1店1标2嘉里0大酒店5在线2大拿2天主教3娱乐2家電2广东2微博2慈善2我爱你3手机2招聘2政务1府2新加坡2闻2时尚2書籍2机构2淡马锡3游戏2澳門2点看2移动2组织机构4网址1店1站1络2联通2谷歌2购物2通販2集团2電訊盈科4飞利浦3食品2餐厅2香格里拉3港2닷넷1컴2삼성2한국2", ye = (e, t) => {
  for (const s in t)
    e[s] = t[s];
  return e;
}, kt = "numeric", St = "ascii", Et = "alpha", Oe = "asciinumeric", Ne = "alphanumeric", Ct = "domain", us = "emoji", dn = "scheme", fn = "slashscheme", jt = "whitespace";
function hn(e, t) {
  return e in t || (t[e] = []), t[e];
}
function le(e, t, s) {
  t[kt] && (t[Oe] = !0, t[Ne] = !0), t[St] && (t[Oe] = !0, t[Et] = !0), t[Oe] && (t[Ne] = !0), t[Et] && (t[Ne] = !0), t[Ne] && (t[Ct] = !0), t[us] && (t[Ct] = !0);
  for (const i in t) {
    const n = hn(i, s);
    n.indexOf(e) < 0 && n.push(e);
  }
}
function pn(e, t) {
  const s = {};
  for (const i in t)
    t[i].indexOf(e) >= 0 && (s[i] = !0);
  return s;
}
function $(e) {
  e === void 0 && (e = null), this.j = {}, this.jr = [], this.jd = null, this.t = e;
}
$.groups = {};
$.prototype = {
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
    i = i || $.groups;
    let n;
    return t && t.j ? n = t : (n = new $(t), s && i && le(t, s, i)), this.jr.push([e, n]), n;
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
    i = i || $.groups;
    const n = this;
    if (t && t.j)
      return n.j[e] = t, t;
    const o = t;
    let a, r = n.go(e);
    if (r ? (a = new $(), ye(a.j, r.j), a.jr.push.apply(a.jr, r.jr), a.jd = r.jd, a.t = r.t) : a = new $(), o) {
      if (i)
        if (a.t && typeof a.t == "string") {
          const u = ye(pn(a.t, i), s);
          le(o, u, i);
        } else
          s && le(o, s, i);
      a.t = o;
    }
    return n.j[e] = a, a;
  }
};
const y = (e, t, s, i, n) => e.ta(t, s, i, n), q = (e, t, s, i, n) => e.tr(t, s, i, n), zt = (e, t, s, i, n) => e.ts(t, s, i, n), c = (e, t, s, i, n) => e.tt(t, s, i, n), ee = "WORD", At = "UWORD", Ce = "LOCALHOST", Dt = "TLD", Nt = "UTLD", Le = "SCHEME", ge = "SLASH_SCHEME", wt = "NUM", ds = "WS", Ot = "NL", Te = "OPENBRACE", ke = "CLOSEBRACE", He = "OPENBRACKET", Pe = "CLOSEBRACKET", Me = "OPENPAREN", Be = "CLOSEPAREN", Ue = "OPENANGLEBRACKET", je = "CLOSEANGLEBRACKET", ze = "FULLWIDTHLEFTPAREN", $e = "FULLWIDTHRIGHTPAREN", qe = "LEFTCORNERBRACKET", Ve = "RIGHTCORNERBRACKET", We = "LEFTWHITECORNERBRACKET", Fe = "RIGHTWHITECORNERBRACKET", Ke = "FULLWIDTHLESSTHAN", Qe = "FULLWIDTHGREATERTHAN", Ge = "AMPERSAND", Je = "APOSTROPHE", Ye = "ASTERISK", ae = "AT", Xe = "BACKSLASH", Ze = "BACKTICK", et = "CARET", re = "COLON", Lt = "COMMA", tt = "DOLLAR", G = "DOT", st = "EQUALS", Rt = "EXCLAMATION", J = "HYPHEN", nt = "PERCENT", it = "PIPE", ot = "PLUS", at = "POUND", rt = "QUERY", Ht = "QUOTE", Pt = "SEMI", Y = "SLASH", Se = "TILDE", ct = "UNDERSCORE", fs = "EMOJI", lt = "SYM";
var hs = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  WORD: ee,
  UWORD: At,
  LOCALHOST: Ce,
  TLD: Dt,
  UTLD: Nt,
  SCHEME: Le,
  SLASH_SCHEME: ge,
  NUM: wt,
  WS: ds,
  NL: Ot,
  OPENBRACE: Te,
  CLOSEBRACE: ke,
  OPENBRACKET: He,
  CLOSEBRACKET: Pe,
  OPENPAREN: Me,
  CLOSEPAREN: Be,
  OPENANGLEBRACKET: Ue,
  CLOSEANGLEBRACKET: je,
  FULLWIDTHLEFTPAREN: ze,
  FULLWIDTHRIGHTPAREN: $e,
  LEFTCORNERBRACKET: qe,
  RIGHTCORNERBRACKET: Ve,
  LEFTWHITECORNERBRACKET: We,
  RIGHTWHITECORNERBRACKET: Fe,
  FULLWIDTHLESSTHAN: Ke,
  FULLWIDTHGREATERTHAN: Qe,
  AMPERSAND: Ge,
  APOSTROPHE: Je,
  ASTERISK: Ye,
  AT: ae,
  BACKSLASH: Xe,
  BACKTICK: Ze,
  CARET: et,
  COLON: re,
  COMMA: Lt,
  DOLLAR: tt,
  DOT: G,
  EQUALS: st,
  EXCLAMATION: Rt,
  HYPHEN: J,
  PERCENT: nt,
  PIPE: it,
  PLUS: ot,
  POUND: at,
  QUERY: rt,
  QUOTE: Ht,
  SEMI: Pt,
  SLASH: Y,
  TILDE: Se,
  UNDERSCORE: ct,
  EMOJI: fs,
  SYM: lt
});
const pe = /[a-z]/, pt = new RegExp("\\p{L}", "u"), gt = new RegExp("\\p{Emoji}", "u"), mt = /\d/, $t = /\s/, qt = `
`, gn = "️", mn = "‍";
let _e = null, Ie = null;
function yn(e) {
  e === void 0 && (e = []);
  const t = {};
  $.groups = t;
  const s = new $();
  _e == null && (_e = Vt(ln)), Ie == null && (Ie = Vt(un)), c(s, "'", Je), c(s, "{", Te), c(s, "}", ke), c(s, "[", He), c(s, "]", Pe), c(s, "(", Me), c(s, ")", Be), c(s, "<", Ue), c(s, ">", je), c(s, "（", ze), c(s, "）", $e), c(s, "「", qe), c(s, "」", Ve), c(s, "『", We), c(s, "』", Fe), c(s, "＜", Ke), c(s, "＞", Qe), c(s, "&", Ge), c(s, "*", Ye), c(s, "@", ae), c(s, "`", Ze), c(s, "^", et), c(s, ":", re), c(s, ",", Lt), c(s, "$", tt), c(s, ".", G), c(s, "=", st), c(s, "!", Rt), c(s, "-", J), c(s, "%", nt), c(s, "|", it), c(s, "+", ot), c(s, "#", at), c(s, "?", rt), c(s, '"', Ht), c(s, "/", Y), c(s, ";", Pt), c(s, "~", Se), c(s, "_", ct), c(s, "\\", Xe);
  const i = q(s, mt, wt, {
    [kt]: !0
  });
  q(i, mt, i);
  const n = q(s, pe, ee, {
    [St]: !0
  });
  q(n, pe, n);
  const o = q(s, pt, At, {
    [Et]: !0
  });
  q(o, pe), q(o, pt, o);
  const a = q(s, $t, ds, {
    [jt]: !0
  });
  c(s, qt, Ot, {
    [jt]: !0
  }), c(a, qt), q(a, $t, a);
  const r = q(s, gt, fs, {
    [us]: !0
  });
  q(r, gt, r), c(r, gn, r);
  const u = c(r, mn);
  q(u, gt, r);
  const f = [[pe, n]], b = [[pe, null], [pt, o]];
  for (let p = 0; p < _e.length; p++)
    ie(s, _e[p], Dt, ee, f);
  for (let p = 0; p < Ie.length; p++)
    ie(s, Ie[p], Nt, At, b);
  le(Dt, {
    tld: !0,
    ascii: !0
  }, t), le(Nt, {
    utld: !0,
    alpha: !0
  }, t), ie(s, "file", Le, ee, f), ie(s, "mailto", Le, ee, f), ie(s, "http", ge, ee, f), ie(s, "https", ge, ee, f), ie(s, "ftp", ge, ee, f), ie(s, "ftps", ge, ee, f), le(Le, {
    scheme: !0,
    ascii: !0
  }, t), le(ge, {
    slashscheme: !0,
    ascii: !0
  }, t), e = e.sort((p, h) => p[0] > h[0] ? 1 : -1);
  for (let p = 0; p < e.length; p++) {
    const h = e[p][0], k = e[p][1] ? {
      [dn]: !0
    } : {
      [fn]: !0
    };
    h.indexOf("-") >= 0 ? k[Ct] = !0 : pe.test(h) ? mt.test(h) ? k[Oe] = !0 : k[St] = !0 : k[kt] = !0, zt(s, h, h, k);
  }
  return zt(s, "localhost", Ce, {
    ascii: !0
  }), s.jd = new $(lt), {
    start: s,
    tokens: ye({
      groups: t
    }, hs)
  };
}
function bn(e, t) {
  const s = vn(t.replace(/[A-Z]/g, (r) => r.toLowerCase())), i = s.length, n = [];
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
function vn(e) {
  const t = [], s = e.length;
  let i = 0;
  for (; i < s; ) {
    let n = e.charCodeAt(i), o, a = n < 55296 || n > 56319 || i + 1 === s || (o = e.charCodeAt(i + 1)) < 56320 || o > 57343 ? e[i] : e.slice(i, i + 2);
    t.push(a), i += a.length;
  }
  return t;
}
function ie(e, t, s, i, n) {
  let o;
  const a = t.length;
  for (let r = 0; r < a - 1; r++) {
    const u = t[r];
    e.j[u] ? o = e.j[u] : (o = new $(i), o.jr = n.slice(), e.j[u] = o), e = o;
  }
  return o = new $(s), o.jr = n.slice(), e.j[t[a - 1]] = o, o;
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
const Ae = {
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
  let s = ye({}, Ae);
  e && (s = ye(s, e instanceof Mt ? e.o : e));
  const i = s.ignoreTags, n = [];
  for (let o = 0; o < i.length; o++)
    n.push(i[o].toUpperCase());
  this.o = s, t && (this.defaultRender = t), this.ignoreTags = n;
}
Mt.prototype = {
  o: Ae,
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
    return n && (typeof n == "object" ? (n = s.t in n ? n[s.t] : Ae[e], typeof n == "function" && i && (n = n(t, s))) : typeof n == "function" && i && (n = n(t, s.t, s)), n);
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
function ps(e, t) {
  this.t = "token", this.v = e, this.tk = t;
}
ps.prototype = {
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
    return e === void 0 && (e = Ae.defaultProtocol), {
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
    return a.href = i, r && (a.class = r), u && (a.target = u), f && (a.rel = f), b && ye(a, b), {
      tagName: n,
      attributes: a,
      content: o,
      eventListeners: p
    };
  }
};
function ft(e, t) {
  class s extends ps {
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
}), Kt = ft("text"), Tn = ft("nl"), xe = ft("url", {
  isLink: !0,
  /**
  	Lowercases relevant parts of the domain and adds the protocol if
  	required. Note that this will not escape unsafe HTML characters in the
  	URL.
  		@param {string} [scheme] default scheme (e.g., 'https')
  	@return {string} the full href
  */
  toHref(e) {
    return e === void 0 && (e = Ae.defaultProtocol), this.hasProtocol() ? this.v : `${e}://${this.v}`;
  },
  /**
   * Check whether this URL token has a protocol
   * @return {boolean}
   */
  hasProtocol() {
    const e = this.tk;
    return e.length >= 2 && e[0].t !== Ce && e[1].t === re;
  }
}), V = (e) => new $(e);
function kn(e) {
  let {
    groups: t
  } = e;
  const s = t.domain.concat([Ge, Ye, ae, Xe, Ze, et, tt, st, J, wt, nt, it, ot, at, Y, lt, Se, ct]), i = [Je, re, Lt, G, Rt, rt, Ht, Pt, Ue, je, Te, ke, Pe, He, Me, Be, ze, $e, qe, Ve, We, Fe, Ke, Qe], n = [Ge, Je, Ye, Xe, Ze, et, tt, st, J, Te, ke, nt, it, ot, at, rt, Y, lt, Se, ct], o = V(), a = c(o, Se);
  y(a, n, a), y(a, t.domain, a);
  const r = V(), u = V(), f = V();
  y(o, t.domain, r), y(o, t.scheme, u), y(o, t.slashscheme, f), y(r, n, a), y(r, t.domain, r);
  const b = c(r, ae);
  c(a, ae, b), c(u, ae, b), c(f, ae, b);
  const p = c(a, G);
  y(p, n, a), y(p, t.domain, a);
  const h = V();
  y(b, t.domain, h), y(h, t.domain, h);
  const D = c(h, G);
  y(D, t.domain, h);
  const k = V(Ft);
  y(D, t.tld, k), y(D, t.utld, k), c(b, Ce, k);
  const m = c(h, J);
  y(m, t.domain, h), y(k, t.domain, h), c(k, G, D), c(k, J, m);
  const A = c(k, re);
  y(A, t.numeric, Ft);
  const C = c(r, J), O = c(r, G);
  y(C, t.domain, r), y(O, n, a), y(O, t.domain, r);
  const L = V(xe);
  y(O, t.tld, L), y(O, t.utld, L), y(L, t.domain, r), y(L, n, a), c(L, G, O), c(L, J, C), c(L, ae, b);
  const W = c(L, re), I = V(xe);
  y(W, t.numeric, I);
  const v = V(xe), _ = V();
  y(v, s, v), y(v, i, _), y(_, s, v), y(_, i, _), c(L, Y, v), c(I, Y, v);
  const S = c(u, re), E = c(f, re), B = c(E, Y), z = c(B, Y);
  y(u, t.domain, r), c(u, G, O), c(u, J, C), y(f, t.domain, r), c(f, G, O), c(f, J, C), y(S, t.domain, v), c(S, Y, v), y(z, t.domain, v), y(z, s, v), c(z, Y, v);
  const F = [
    [Te, ke],
    // {}
    [He, Pe],
    // []
    [Me, Be],
    // ()
    [Ue, je],
    // <>
    [ze, $e],
    // （）
    [qe, Ve],
    // 「」
    [We, Fe],
    // 『』
    [Ke, Qe]
    // ＜＞
  ];
  for (let ne = 0; ne < F.length; ne++) {
    const [ce, Z] = F[ne], R = c(v, ce);
    c(_, ce, R), c(R, Z, v);
    const fe = V(xe);
    y(R, s, fe);
    const be = V();
    y(R, i), y(fe, s, fe), y(fe, i, be), y(be, s, fe), y(be, i, be), c(fe, Z, v), c(be, Z, v);
  }
  return c(o, Ce, L), c(o, Ot, Tn), {
    start: o,
    tokens: hs
  };
}
function Sn(e, t, s) {
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
function En() {
  U.scanner = yn(U.customSchemes);
  for (let e = 0; e < U.tokenQueue.length; e++)
    U.tokenQueue[e][1]({
      scanner: U.scanner
    });
  U.parser = kn(U.scanner.tokens);
  for (let e = 0; e < U.pluginQueue.length; e++)
    U.pluginQueue[e][1]({
      scanner: U.scanner,
      parser: U.parser
    });
  U.initialized = !0;
}
function Cn(e) {
  return U.initialized || En(), Sn(U.parser.start, e, bn(U.scanner.start, e));
}
var An = {
  // We don't need the complete named character reference because linkifyHtml
  // does not modify the escape sequences. We do need &nbsp; so that
  // whitespace is parsed properly. Other types of whitespace should already
  // be accounted for. &gt; &lt; and &quot; are also frequently relevant ones
  amp: "&",
  gt: ">",
  lt: "<",
  nbsp: " ",
  quot: '"'
}, Dn = /^#[xX]([A-Fa-f0-9]+)$/, Nn = /^#([0-9]+)$/, _n = /^([A-Za-z0-9]+)$/, In = (
  /** @class */
  function() {
    function e(t) {
      this.named = t;
    }
    return e.prototype.parse = function(t) {
      if (t) {
        var s = t.match(Dn);
        if (s)
          return String.fromCharCode(parseInt(s[1], 16));
        if (s = t.match(Nn), s)
          return String.fromCharCode(parseInt(s[1], 10));
        if (s = t.match(_n), s)
          return this.named[s[1]] || "&" + s[1] + ";";
      }
    }, e;
  }()
), xn = /[\t\n\f ]/, wn = /[A-Za-z]/, On = /\r\n?/g;
function P(e) {
  return xn.test(e);
}
function Qt(e) {
  return wn.test(e);
}
function Ln(e) {
  return e.replace(On, `
`);
}
var Rn = (
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
          P(n) && this.transitionTo(
            "beforeDoctypeName"
            /* beforeDoctypeName */
          );
        },
        beforeDoctypeName: function() {
          var n = this.consume();
          P(n) || (this.transitionTo(
            "doctypeName"
            /* doctypeName */
          ), this.delegate.appendToDoctypeName && this.delegate.appendToDoctypeName(n.toLowerCase()));
        },
        doctypeName: function() {
          var n = this.consume();
          P(n) ? this.transitionTo(
            "afterDoctypeName"
            /* afterDoctypeName */
          ) : n === ">" ? (this.delegate.endDoctype && this.delegate.endDoctype(), this.transitionTo(
            "beforeData"
            /* beforeData */
          )) : this.delegate.appendToDoctypeName && this.delegate.appendToDoctypeName(n.toLowerCase());
        },
        afterDoctypeName: function() {
          var n = this.consume();
          if (!P(n))
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
          P(n) ? (this.transitionTo(
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
          P(n) ? this.transitionTo(
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
          P(n) || (n === ">" ? (this.delegate.endDoctype && this.delegate.endDoctype(), this.transitionTo(
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
          P(n) || n === ">" && (this.delegate.endDoctype && this.delegate.endDoctype(), this.transitionTo(
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
          P(n) ? this.transitionTo(
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
          P(n) ? (this.transitionTo(
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
          if (P(n)) {
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
          P(n) ? (this.transitionTo(
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
          if (P(n)) {
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
          P(n) ? this.consume() : n === '"' ? (this.transitionTo(
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
          P(n) ? (this.delegate.finishAttributeValue(), this.consume(), this.transitionTo(
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
          P(n) ? (this.consume(), this.transitionTo(
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
      for (this.input += Ln(t); this.index < this.input.length; ) {
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
), Hn = (
  /** @class */
  function() {
    function e(t, s) {
      s === void 0 && (s = {}), this.options = s, this.token = null, this.startLine = 1, this.startColumn = 0, this.tokens = [], this.tokenizer = new Rn(this, t, s.mode), this._currentAttribute = void 0;
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
function Pn(e, t) {
  var s = new Hn(new In(An), t);
  return s.tokenize(e);
}
const gs = "LinkifyResult", ut = "StartTag", ms = "EndTag", _t = "Chars", Mn = "Comment", Bn = "Doctype";
function ys(e, t) {
  t === void 0 && (t = {});
  const s = Pn(e), i = [], n = [], o = new Mt(t, zn);
  for (let a = 0; a < s.length; a++) {
    const r = s[a];
    if (r.type === ut) {
      i.push(r);
      const u = r.tagName.toUpperCase();
      if (!(u === "A" || o.ignoreTags.indexOf(u) >= 0))
        continue;
      let b = i.length;
      jn(u, s, ++a, i), a += i.length - b - 1;
    } else if (r.type !== _t)
      i.push(r);
    else {
      const u = Un(r.chars, o);
      i.push.apply(i, u);
    }
  }
  for (let a = 0; a < i.length; a++) {
    const r = i[a];
    switch (r.type) {
      case gs:
        n.push(r.rendered);
        break;
      case ut: {
        let u = "<" + r.tagName;
        r.attributes.length > 0 && (u += " " + qn(r.attributes).join(" ")), r.selfClosing && (u += " /"), u += ">", n.push(u);
        break;
      }
      case ms:
        n.push(`</${r.tagName}>`);
        break;
      case _t:
        n.push(It(r.chars));
        break;
      case Mn:
        n.push(`<!--${It(r.chars)}-->`);
        break;
      case Bn: {
        let u = `<!DOCTYPE ${r.name}`;
        r.publicIdentifier && (u += ` PUBLIC "${r.publicIdentifier}"`), r.systemIdentifier && (u += ` "${r.systemIdentifier}"`), u += ">", n.push(u);
        break;
      }
    }
  }
  return n.join("");
}
function Un(e, t) {
  const s = Cn(e), i = [];
  for (let n = 0; n < s.length; n++) {
    const o = s[n];
    o.t === "nl" && t.get("nl2br") ? i.push({
      type: ut,
      tagName: "br",
      attributes: [],
      selfClosing: !0
    }) : !o.isLink || !t.check(o) ? i.push({
      type: _t,
      chars: o.toString()
    }) : i.push({
      type: gs,
      rendered: t.render(o)
    });
  }
  return i;
}
function jn(e, t, s, i) {
  let n = 1;
  for (; s < t.length && n > 0; ) {
    let o = t[s];
    o.type === ut && o.tagName.toUpperCase() === e ? n++ : o.type === ms && o.tagName.toUpperCase() === e && n--, i.push(o), s++;
  }
  return i;
}
function zn(e) {
  let {
    tagName: t,
    attributes: s,
    content: i
  } = e;
  return `<${t} ${$n(s)}>${It(i)}</${t}>`;
}
function It(e) {
  return e.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function bs(e) {
  return e.replace(/"/g, "&quot;");
}
function $n(e) {
  const t = [];
  for (const s in e) {
    const i = e[s] + "";
    t.push(`${s}="${bs(i)}"`);
  }
  return t.join(" ");
}
function qn(e) {
  const t = [];
  for (let s = 0; s < e.length; s++) {
    const i = e[s][0], n = e[s][1] + "";
    t.push(`${i}="${bs(n)}"`);
  }
  return t;
}
const vs = /* @__PURE__ */ Q({
  __name: "button",
  props: {
    button: {}
  },
  setup(e) {
    const t = K(), s = e;
    function i() {
      s.button.type === rs.web_url ? window.open(s.button.url) : t.sendUserMessage(s.button.title);
    }
    return (n, o) => (d(), g("button", {
      class: "tvk-btn tvk-btn-action",
      onClick: i
    }, w(s.button.title), 1));
  }
}), Vn = { class: "tvk-footnote" }, Wn = ["href"], Fn = {
  key: 1,
  class: "tvk-footnote-title"
}, Kn = {
  key: 2,
  class: "tvk-footnote-content"
}, Qn = ["innerHTML"], Gn = /* @__PURE__ */ Q({
  __name: "footnote",
  props: {
    footnote: {}
  },
  setup(e) {
    const t = j.getOptions(), s = e, i = H(!1);
    function n() {
      return ys(s.footnote.content, { target: "_blank" });
    }
    const o = H(null);
    function a() {
      return o.value ? o.value.offsetHeight < o.value.scrollHeight : !1;
    }
    return (r, u) => (d(), g("div", Vn, [
      s.footnote.url ? (d(), g("a", {
        key: 0,
        href: s.footnote.url,
        target: "_blank",
        class: "tvk-footnote-title"
      }, w(s.footnote.title), 9, Wn)) : T("", !0),
      s.footnote.url ? T("", !0) : (d(), g("span", Fn, w(s.footnote.title), 1)),
      s.footnote.content ? (d(), g("div", Kn, [
        N("div", {
          ref_key: "contentTxt",
          ref: o,
          style: ue({
            "--tvk-clamp-nb-line": l(t).preferences.messages.footNotes.clampSourceContentNbLines
          }),
          class: me({
            "tvk-clamp": l(t).preferences.messages.footNotes.clampSourceContent && !i.value
          })
        }, [
          N("span", {
            innerHTML: n()
          }, null, 8, Qn)
        ], 6),
        s.footnote.content && l(t).preferences.messages.footNotes.clampSourceContent && !i.value && a() ? (d(), g("a", {
          key: 0,
          href: "javascript:void(0)",
          class: "tvk-footnote-content-show-more-link",
          onClick: u[0] || (u[0] = (f) => i.value = !i.value)
        }, w(l(t).wording.messages.message.footnotes.showMoreLink), 1)) : T("", !0)
      ])) : T("", !0)
    ]));
  }
}), Jn = { class: "tvk-footnotes" }, Yn = { class: "tvk-footnotes-sources-label" }, Ts = /* @__PURE__ */ Q({
  __name: "footnotes",
  props: {
    footnotes: {}
  },
  setup(e) {
    const t = j.getOptions(), s = e;
    return (i, n) => (d(), g("div", Jn, [
      N("span", Yn, w(l(t).wording.messages.message.footnotes.sources), 1),
      (d(!0), g(de, null, De(s.footnotes, (o) => (d(), X(Gn, { footnote: o }, null, 8, ["footnote"]))), 256))
    ]));
  }
}), Xn = ["innerHTML"], Zn = /* @__PURE__ */ Q({
  __name: "message-text",
  props: {
    message: {}
  },
  setup(e) {
    const t = j.getOptions(), s = e;
    function i() {
      return ys(s.message.text, { target: "_blank" });
    }
    return (n, o) => {
      var a;
      return d(), g(de, null, [
        N("div", {
          innerHTML: i(),
          tabindex: "1"
        }, null, 8, Xn),
        (a = s.message.footnotes) != null && a.length && l(t).preferences.messages.footNotes.display && !l(t).preferences.messages.footNotes.displayOnMessageSide ? (d(), X(Ts, {
          key: 0,
          footnotes: s.message.footnotes
        }, null, 8, ["footnotes"])) : T("", !0),
        (d(!0), g(de, null, De(s.message.buttons, (r) => (d(), X(vs, { button: r }, {
          default: ts(() => [
            Ee(w(r.title), 1)
          ]),
          _: 2
        }, 1032, ["button"]))), 256))
      ], 64);
    };
  }
}), ei = { class: "tvk-card" }, ti = ["href"], si = ["src", "alt"], ni = ["href"], ii = { key: 2 }, oi = { key: 3 }, ai = { key: 4 }, ks = /* @__PURE__ */ Q({
  __name: "message-card",
  props: {
    card: {}
  },
  setup(e) {
    var o, a, r;
    const t = K(), s = e, i = ((a = (o = s.card) == null ? void 0 : o.file) == null ? void 0 : a.description) ?? ((r = s.card) == null ? void 0 : r.title);
    function n(u) {
      s.card.file._loaded || (s.card.file._loaded = !0, t.scrollMessages());
    }
    return (u, f) => {
      var b, p, h, D, k, m, A, C, O, L, W, I, v, _, S, E, B, z, F, ne;
      return d(), g("div", ei, [
        ((p = (b = s.card) == null ? void 0 : b.file) == null ? void 0 : p.type) === "image" ? (d(), g("a", {
          key: 0,
          href: (D = (h = s.card) == null ? void 0 : h.file) == null ? void 0 : D.url,
          target: "_blank"
        }, [
          N("img", {
            src: (m = (k = s.card) == null ? void 0 : k.file) == null ? void 0 : m.url,
            alt: l(i),
            onLoad: n,
            class: "tvk-thumbnail"
          }, null, 40, si)
        ], 8, ti)) : T("", !0),
        ((C = (A = s.card) == null ? void 0 : A.file) == null ? void 0 : C.type) === "file" ? (d(), g("a", {
          key: 1,
          href: (L = (O = s.card) == null ? void 0 : O.file) == null ? void 0 : L.url,
          target: "_blank"
        }, w((I = (W = s.card) == null ? void 0 : W.file) == null ? void 0 : I.name), 9, ni)) : T("", !0),
        (v = s.card) != null && v.title ? (d(), g("div", ii, [
          N("strong", null, w((_ = s.card) == null ? void 0 : _.title), 1)
        ])) : T("", !0),
        (S = s.card) != null && S.subTitle ? (d(), g("div", oi, w((E = s.card) == null ? void 0 : E.subTitle), 1)) : T("", !0),
        (z = (B = s.card) == null ? void 0 : B.file) != null && z.description ? (d(), g("div", ai, w((ne = (F = s.card) == null ? void 0 : F.file) == null ? void 0 : ne.description), 1)) : T("", !0),
        (d(!0), g(de, null, De(s.card.buttons, (ce) => (d(), X(vs, { button: ce }, {
          default: ts(() => [
            Ee(w(ce.title), 1)
          ]),
          _: 2
        }, 1032, ["button"]))), 256))
      ]);
    };
  }
}), Gt = "transform 0.2s", ri = /* @__PURE__ */ Q({
  __name: "message-carousel",
  props: {
    carousel: {}
  },
  setup(e) {
    const s = H(e.carousel.cards), i = H([]), n = H(null), o = H(null), a = H({}), r = H({}), u = H(!1);
    function f() {
      var A;
      const m = (A = n.value) == null ? void 0 : A.offsetWidth;
      a.value = {
        overflow: "hidden",
        "max-width": `${m}px`
      };
    }
    function b() {
      return i.value.reduce((m, A) => m + A.offsetWidth, 0);
    }
    function p() {
      if (u.value)
        return;
      u.value = !0, f();
      const m = b(), A = s.value[0];
      s.value.push(A);
      const C = i.value[0];
      r.value = {
        transition: Gt,
        transform: `translateX(-${C.offsetWidth}px)`,
        width: `${m + C.offsetWidth + 1}px`
      }, D(() => {
        s.value.shift(), k(), u.value = !1;
      });
    }
    function h() {
      if (u.value)
        return;
      u.value = !0, f();
      const m = b(), A = s.value[s.value.length - 1];
      s.value.unshift(A);
      const C = i.value[i.value.length - 1];
      r.value = {
        transition: "none",
        transform: `translateX(-${C.offsetWidth}px)`,
        width: `${m + C.offsetWidth + 1}px`
      }, setTimeout(() => {
        r.value = {
          transition: Gt,
          transform: "translateX(0)",
          width: `${m + C.offsetWidth + 1}px`
        }, D(() => {
          s.value.pop(), k(), u.value = !1;
        });
      });
    }
    function D(m) {
      var C;
      const A = () => {
        var O;
        m(), (O = o.value) == null || O.removeEventListener("transitionend", A);
      };
      (C = o.value) == null || C.addEventListener("transitionend", A);
    }
    function k() {
      a.value = {}, r.value = {
        transition: "none",
        transform: "translateX(0)"
      };
    }
    return (m, A) => (d(), g(de, null, [
      N("div", {
        class: "tvk-carousel",
        ref_key: "carouselRef",
        ref: n,
        style: ue(a.value)
      }, [
        N("div", {
          class: "tvk-carousel-inner",
          ref_key: "innerRef",
          ref: o,
          style: ue(r.value)
        }, [
          (d(!0), g(de, null, De(s.value, (C) => (d(), g("div", {
            class: "tvk-carousel-card",
            key: JSON.stringify(C),
            ref_for: !0,
            ref_key: "cardsRefs",
            ref: i
          }, [
            xt(ks, { card: C }, null, 8, ["card"])
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
}), ci = /* @__PURE__ */ Q({
  __name: "message-image",
  props: { message: Object },
  setup(e) {
    return j.getOptions(), (t, s) => "Image type not yet implemented";
  }
}), li = { class: "tvk-message-answer" }, ui = {
  key: 0,
  class: "tvk-message-header"
}, di = {
  key: 0,
  class: "tvk-message-header-avatar"
}, fi = ["src"], hi = ["src"], pi = {
  key: 1,
  class: "tvk-message-header-label"
}, gi = { class: "tvk-message-header-label-user" }, mi = { class: "tvk-message-header-label-bot" }, yi = {
  key: 1,
  class: "tvk-message-body"
}, bi = {
  key: 2,
  class: "tvk-message-body-from-app"
}, vi = {
  key: 0,
  class: "tvk-message-loader"
}, Ti = {
  key: 1,
  class: "tvk-error-connection"
}, ki = /* @__PURE__ */ N("i", { class: "tvk-error-icon bi bi-exclamation-triangle" }, null, -1), Si = {
  key: 0,
  class: "tvk-side-footnotes"
}, Ei = /* @__PURE__ */ Q({
  __name: "message",
  props: {
    message: {}
  },
  setup(e) {
    const t = j.getOptions(), s = e;
    return (i, n) => {
      var o;
      return s.message.author !== l(x).user || !l(t).preferences.messages.message.hideUserMessages ? (d(), g("div", {
        key: 0,
        class: me(["tvk-message", {
          "tvk-message-user": s.message.author === l(x).user,
          "tvk-message-bot": s.message.author === l(x).bot
        }])
      }, [
        N("div", li, [
          l(t).preferences.messages.message.header.display && s.message.author !== l(x).app ? (d(), g("div", ui, [
            l(t).preferences.messages.message.header.avatar.display ? (d(), g("div", di, [
              !l(t).preferences.messages.message.header.avatar.userImage && l(t).preferences.messages.message.header.avatar.userIcon && s.message.author === l(x).user ? (d(), g("i", {
                key: 0,
                class: me([
                  "tvk-message-header-avatar-user",
                  l(t).preferences.messages.message.header.avatar.userIcon
                ])
              }, null, 2)) : T("", !0),
              l(t).preferences.messages.message.header.avatar.userImage && s.message.author === l(x).user ? (d(), g("img", {
                key: 1,
                src: l(t).preferences.messages.message.header.avatar.userImage.src,
                style: ue({
                  width: l(t).preferences.messages.message.header.avatar.userImage.width,
                  height: l(t).preferences.messages.message.header.avatar.userImage.height
                }),
                role: "none"
              }, null, 12, fi)) : T("", !0),
              !l(t).preferences.messages.message.header.avatar.botImage && l(t).preferences.messages.message.header.avatar.botIcon && s.message.author === l(x).bot ? (d(), g("i", {
                key: 2,
                class: me([
                  "tvk-message-header-avatar-bot",
                  l(t).preferences.messages.message.header.avatar.botIcon
                ])
              }, null, 2)) : T("", !0),
              l(t).preferences.messages.message.header.avatar.botImage && s.message.author === l(x).bot ? (d(), g("img", {
                key: 3,
                src: l(t).preferences.messages.message.header.avatar.botImage.src,
                style: ue({
                  width: l(t).preferences.messages.message.header.avatar.botImage.width,
                  height: l(t).preferences.messages.message.header.avatar.botImage.height
                }),
                role: "none"
              }, null, 12, hi)) : T("", !0)
            ])) : T("", !0),
            l(t).preferences.messages.message.header.label.display ? (d(), g("div", pi, [
              N("span", gi, w(l(t).wording.messages.message.header.labelUser), 1),
              N("span", mi, w(l(t).wording.messages.message.header.labelBot), 1)
            ])) : T("", !0)
          ])) : T("", !0),
          s.message.author !== l(x).app ? (d(), g("div", yi, [
            s.message.type === l(M).message ? (d(), X(Zn, {
              key: 0,
              message: s.message
            }, null, 8, ["message"])) : T("", !0),
            s.message.type === l(M).card ? (d(), X(ks, {
              key: 1,
              card: s.message
            }, null, 8, ["card"])) : T("", !0),
            s.message.type === l(M).carousel ? (d(), X(ri, {
              key: 2,
              carousel: s.message
            }, null, 8, ["carousel"])) : T("", !0),
            s.message.type === l(M).image ? (d(), X(ci, {
              key: 3,
              message: s.message
            }, null, 8, ["message"])) : T("", !0)
          ])) : T("", !0),
          s.message.author === l(x).app ? (d(), g("div", bi, [
            s.message.type === l(M).loader ? (d(), g("div", vi)) : T("", !0),
            s.message.type === l(M).error ? (d(), g("div", Ti, [
              ki,
              Ee(" " + w(s.message.text), 1)
            ])) : T("", !0)
          ])) : T("", !0)
        ]),
        (o = s.message.footnotes) != null && o.length && l(t).preferences.messages.footNotes.display && l(t).preferences.messages.footNotes.displayOnMessageSide ? (d(), g("div", Si, [
          xt(Ts, {
            footnotes: s.message.footnotes
          }, null, 8, ["footnotes"])
        ])) : T("", !0)
      ], 2)) : T("", !0);
    };
  }
}), Ci = /* @__PURE__ */ N("div", { class: "tvk-shader tvk-shader-top" }, null, -1), Ai = /* @__PURE__ */ N("div", { class: "tvk-shader tvk-shader-bottom" }, null, -1), Di = /* @__PURE__ */ Q({
  __name: "messages",
  setup(e) {
    const t = K(), s = H();
    function i() {
      setTimeout(() => {
        s.value.scrollTop = s.value.scrollHeight;
      }, 100);
    }
    return Ms(() => {
      i();
    }), t.$onAction(({ name: n, store: o, args: a, after: r }) => {
      n === "scrollMessages" && r(() => {
        setTimeout(() => {
          i();
        });
      });
    }), (n, o) => (d(), g("div", {
      ref_key: "messagesWrapper",
      ref: s,
      class: "tvk-messages"
    }, [
      Ci,
      (d(!0), g(de, null, De(l(t).getMessages, (a) => (d(), X(Ei, { message: a }, null, 8, ["message"]))), 256)),
      Ai
    ], 512));
  }
}), Ni = /* @__PURE__ */ Q({
  __name: "App",
  setup(e) {
    const t = j.getOptions(), s = K();
    let i = H(o()), n = H(!0);
    function o() {
      return (Math.random() + 1).toString(36).substring(7);
    }
    return s.$onAction(({ name: a, store: r, args: u, after: f }) => {
      a === "updateApplication" && f(() => {
        i.value = o(), n.value = !1, setTimeout(() => {
          n.value = !0;
        });
      });
    }), (a, r) => l(n) ? (d(), g("div", {
      class: "tvk-wrapper",
      key: l(i)
    }, [
      l(s).getMessages.length || !l(t).preferences.messages.hideIfNoMessages ? (d(), X(Di, { key: 0 })) : T("", !0),
      xt(cn)
    ])) : T("", !0);
  }
});
function _i() {
  var t, s;
  const e = j.getOptions();
  if ((t = e == null ? void 0 : e.initialization) != null && t.welcomeMessage || (s = e == null ? void 0 : e.initialization) != null && s.openingMessage) {
    const i = K(), n = i.getStoredState();
    (!n || !n.messages.length) && (e.initialization.welcomeMessage && i.addMessage({
      type: M.message,
      author: x.bot,
      date: Date.now(),
      text: e.initialization.welcomeMessage
    }), e.initialization.openingMessage && i.sendUserMessage(
      e.initialization.openingMessage,
      !1
    ));
  }
}
let te, Ss;
function wi(e, t, s) {
  return Ss = e, Es(t, s), te;
}
function Oi(e, t) {
  Es(e, t);
}
function Es(e, t) {
  te != null && te.unmount && te.unmount(), te = Bs(Ni), te.provide(as, e), j.clearInstance(), j.setOptions(t);
  const s = js();
  te.use(s), te.mount(Ss), _i();
}
function Li() {
  return JSON.parse(JSON.stringify(cs));
}
function Ri() {
  return JSON.parse(JSON.stringify(j.getOptions()));
}
function Hi(e, t) {
  const s = j.getOptions(), i = e.split(".");
  let n = s;
  for (let o = 0; o < i.length; o++) {
    const a = i[o];
    o < i.length - 1 ? (n[a] || (n[a] = {}), n = n[a]) : (n[a] = t, K().updateApplication());
  }
}
function Pi(e) {
  K().addMessage(e);
}
export {
  Pi as addTvkMessage,
  Ri as getTvkCurrentOptions,
  Li as getTvkDefaultOptions,
  Oi as reload,
  wi as renderChat,
  Hi as updateTvkOption
};
