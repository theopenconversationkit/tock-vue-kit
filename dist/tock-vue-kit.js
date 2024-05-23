var bs = Object.defineProperty;
var vs = (e, t, s) => t in e ? bs(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var ft = (e, t, s) => (vs(e, typeof t != "symbol" ? t + "" : t, s), s);
import { effectScope as Gt, ref as x, markRaw as Jt, hasInjectionContext as Ts, inject as Yt, watch as ks, reactive as Ss, isRef as Oe, isReactive as Xt, toRaw as Es, getCurrentScope as Cs, onScopeDispose as As, nextTick as Ds, toRefs as Ns, computed as Zt, defineComponent as W, openBlock as h, createElementBlock as y, unref as l, normalizeClass as fe, createCommentVNode as T, normalizeStyle as re, createTextVNode as Le, toDisplayString as P, createElementVNode as _, withModifiers as Is, withDirectives as _s, vModelText as ws, Fragment as de, renderList as lt, createBlock as ee, withCtx as Os, createVNode as _t, onMounted as Ls, createApp as xs } from "vue";
var Rs = !1;
/*!
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */
let es;
const ut = (e) => es = e, ts = (
  /* istanbul ignore next */
  Symbol()
);
function yt(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var ye;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(ye || (ye = {}));
function Hs() {
  const e = Gt(!0), t = e.run(() => x({}));
  let s = [], i = [];
  const n = Jt({
    install(o) {
      ut(n), n._a = o, o.provide(ts, n), o.config.globalProperties.$pinia = n, i.forEach((a) => s.push(a)), i = [];
    },
    use(o) {
      return !this._a && !Rs ? i.push(o) : s.push(o), this;
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
const ss = () => {
};
function Mt(e, t, s, i = ss) {
  e.push(t);
  const n = () => {
    const o = e.indexOf(t);
    o > -1 && (e.splice(o, 1), i());
  };
  return !s && Cs() && As(n), n;
}
function le(e, ...t) {
  e.slice().forEach((s) => {
    s(...t);
  });
}
const Ps = (e) => e();
function bt(e, t) {
  e instanceof Map && t instanceof Map && t.forEach((s, i) => e.set(i, s)), e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const s in t) {
    if (!t.hasOwnProperty(s))
      continue;
    const i = t[s], n = e[s];
    yt(n) && yt(i) && e.hasOwnProperty(s) && !Oe(i) && !Xt(i) ? e[s] = bt(n, i) : e[s] = i;
  }
  return e;
}
const Ms = (
  /* istanbul ignore next */
  Symbol()
);
function Bs(e) {
  return !yt(e) || !e.hasOwnProperty(Ms);
}
const { assign: ne } = Object;
function Us(e) {
  return !!(Oe(e) && e.effect);
}
function js(e, t, s, i) {
  const { state: n, actions: o, getters: a } = t, r = s.state.value[e];
  let u;
  function f() {
    r || (s.state.value[e] = n ? n() : {});
    const b = Ns(s.state.value[e]);
    return ne(b, o, Object.keys(a || {}).reduce((p, g) => (p[g] = Jt(Zt(() => {
      ut(s);
      const E = s._s.get(e);
      return a[g].call(E, E);
    })), p), {}));
  }
  return u = ns(e, f, t, s, i, !0), u;
}
function ns(e, t, s = {}, i, n, o) {
  let a;
  const r = ne({ actions: {} }, s), u = {
    deep: !0
    // flush: 'post',
  };
  let f, b, p = [], g = [], E;
  const d = i.state.value[e];
  !o && !d && (i.state.value[e] = {}), x({});
  let C;
  function k(A) {
    let S;
    f = b = !1, typeof A == "function" ? (A(i.state.value[e]), S = {
      type: ye.patchFunction,
      storeId: e,
      events: E
    }) : (bt(i.state.value[e], A), S = {
      type: ye.patchObject,
      payload: A,
      storeId: e,
      events: E
    });
    const z = C = Symbol();
    Ds().then(() => {
      C === z && (f = !0);
    }), b = !0, le(p, S, i.state.value[e]);
  }
  const D = o ? function() {
    const { state: S } = s, z = S ? S() : {};
    this.$patch((V) => {
      ne(V, z);
    });
  } : (
    /* istanbul ignore next */
    ss
  );
  function O() {
    a.stop(), p = [], g = [], i._s.delete(e);
  }
  function I(A, S) {
    return function() {
      ut(i);
      const z = Array.from(arguments), V = [], te = [];
      function ge(L) {
        V.push(L);
      }
      function Ee(L) {
        te.push(L);
      }
      le(g, {
        args: z,
        name: A,
        store: v,
        after: ge,
        onError: Ee
      });
      let Y;
      try {
        Y = S.apply(this && this.$id === e ? this : v, z);
      } catch (L) {
        throw le(te, L), L;
      }
      return Y instanceof Promise ? Y.then((L) => (le(V, L), L)).catch((L) => (le(te, L), Promise.reject(L))) : (le(V, Y), Y);
    };
  }
  const J = {
    _p: i,
    // _s: scope,
    $id: e,
    $onAction: Mt.bind(null, g),
    $patch: k,
    $reset: D,
    $subscribe(A, S = {}) {
      const z = Mt(p, A, S.detached, () => V()), V = a.run(() => ks(() => i.state.value[e], (te) => {
        (S.flush === "sync" ? b : f) && A({
          storeId: e,
          type: ye.direct,
          events: E
        }, te);
      }, ne({}, u, S)));
      return z;
    },
    $dispose: O
  }, v = Ss(J);
  i._s.set(e, v);
  const U = (i._a && i._a.runWithContext || Ps)(() => i._e.run(() => (a = Gt()).run(t)));
  for (const A in U) {
    const S = U[A];
    if (Oe(S) && !Us(S) || Xt(S))
      o || (d && Bs(S) && (Oe(S) ? S.value = d[A] : bt(S, d[A])), i.state.value[e][A] = S);
    else if (typeof S == "function") {
      const z = I(A, S);
      U[A] = z, r.actions[A] = S;
    }
  }
  return ne(v, U), ne(Es(v), U), Object.defineProperty(v, "$state", {
    get: () => i.state.value[e],
    set: (A) => {
      k((S) => {
        ne(S, A);
      });
    }
  }), i._p.forEach((A) => {
    ne(v, a.run(() => A({
      store: v,
      app: i._a,
      pinia: i,
      options: r
    })));
  }), d && o && s.hydrate && s.hydrate(v.$state, d), f = !0, b = !0, v;
}
function zs(e, t, s) {
  let i, n;
  const o = typeof t == "function";
  typeof e == "string" ? (i = e, n = o ? s : t) : (n = e, i = e.id);
  function a(r, u) {
    const f = Ts();
    return r = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    r || (f ? Yt(ts, null) : null), r && ut(r), r = es, r._s.has(i) || (o ? ns(i, t, n, r) : js(i, n, r)), r._s.get(i);
  }
  return a.$id = i, a;
}
function $s() {
  const e = Date.now().toString(36), t = Math.random().toString(36).substr(2, 5);
  return (e + t).toUpperCase();
}
const is = Symbol("tockEndpointKey");
var w = /* @__PURE__ */ ((e) => (e.bot = "bot", e.user = "user", e.app = "app", e))(w || {}), H = /* @__PURE__ */ ((e) => (e.message = "message", e.card = "card", e.carousel = "carousel", e.image = "image", e.loader = "loader", e.error = "error", e))(H || {});
function Ie(e) {
  return !!(e && typeof e == "object" && !Array.isArray(e));
}
function vt(e, ...t) {
  if (!t.length)
    return e;
  const s = t.shift();
  if (Ie(e) && Ie(s))
    for (const i in s)
      Ie(s[i]) ? (e[i] || Object.assign(e, { [i]: {} }), vt(e[i], s[i])) : Object.assign(e, { [i]: s[i] });
  return vt(e, ...t);
}
const qs = {
  enabled: {
    type: "boolean",
    default: !1,
    title: "Local storage",
    description: "Retain conversation history in local storage"
  },
  maxNumberMessages: {
    type: "number",
    default: 20,
    title: "Maximum messages",
    description: "Maximum number of messages to store in local storage"
  },
  prefix: {
    type: "string",
    default: void 0,
    title: "Local storage prefix",
    description: "Prefix for local storage keys allowing communication with different bots from the same domain"
  }
}, Vs = {
  welcomeMessage: {
    type: "string",
    default: void 0,
    title: "Welcome message",
    description: "Initial bot message to be displayed to the user at startup. It will not be sent to the bot and will be stored in local storage, if any."
  },
  openingMessage: {
    type: "string",
    default: void 0,
    title: "Opening message",
    description: "Initial user message to be sent to the bot at startup to trigger a welcome sequence. It will not be displayed to the user and will not be stored in local storage, if any."
  }
}, Ws = {
  messages: {
    clearOnNewRequest: {
      type: "boolean",
      default: !1,
      title: "Clear on new message",
      description: "If true, deletes previous messages when a new user request is sent"
    },
    hideIfNoMessages: {
      type: "boolean",
      default: !0,
      title: "Hide messages if no messages",
      description: "Hide messages container if there is no messages to display."
    },
    message: {
      hideUserMessages: {
        type: "boolean",
        default: !1,
        title: "Hide user messages",
        description: "If true, user messages are not displayed."
      },
      header: {
        display: {
          type: "boolean",
          default: !0,
          title: "Display header",
          description: "Display a header above message."
        },
        avatar: {
          display: {
            type: "boolean",
            default: !0,
            title: "Display header avatar",
            description: "Display an avatar in message header."
          },
          userIcon: {
            type: "string",
            default: "bi bi-person-fill",
            title: "User icon",
            description: "Class name of the user avatar icon (displayed only if User image is not defined)."
          },
          userImage: {
            type: "ImageDef",
            default: void 0,
            title: "User image",
            description: "Image of the user avatar"
          },
          botIcon: {
            type: "string",
            default: "bi bi-robot",
            title: "Bot icon",
            description: "Class name of the bot avatar icon (displayed only if Bot image is not defined)."
          },
          botImage: {
            type: "ImageDef",
            default: void 0,
            title: "Bot image",
            description: "Image of the bot avatar"
          }
        },
        label: {
          display: {
            type: "boolean",
            default: !0,
            title: "Display header label",
            description: "Display a label in message header (cf wording.messages.message.header.labelUser and wording.messages.message.header.labelBot for textual content)."
          }
        }
      }
    },
    footNotes: {
      display: {
        type: "boolean",
        default: !0,
        title: "Display sources if any",
        description: "For RAG answers, display the sources used to generate the answer."
      },
      requireSourcesContent: {
        type: "boolean",
        default: !1,
        title: "Request textual content of sources",
        description: "For RAG answers, request the textual content of the source in addition to the source title and link."
      },
      clampSourceContent: {
        type: "boolean",
        default: !0,
        title: "Clamp content of sources",
        description: "For RAG answers with sources content, truncate the textual source content."
      },
      clampSourceContentNbLines: {
        type: "number",
        default: 2,
        title: "Number of lines to clamp",
        description: "For RAG answers with sources content, number of lines after which to truncate text."
      },
      displayOnMessageSide: {
        type: "boolean",
        default: !1,
        title: "Display sources on the side of the answer",
        description: "For RAG responses, any sources are displayed on one side of the message response rather than directly following the response."
      }
    }
  },
  questionBar: {
    clearTypedCharsOnSubmit: {
      type: "boolean",
      default: !0,
      title: "Clear input on submit",
      description: "Whether or not the question input should be cleared on submit."
    },
    maxUserInputLength: {
      type: "number",
      default: 500,
      title: "Max user message length",
      description: "Max length of the user input message string"
    },
    clearHistory: {
      display: {
        type: "boolean",
        default: !0,
        title: "Show clear history button",
        description: "Display the control allowing user to clear discussion history and local storage history, if any"
      },
      icon: {
        type: "string",
        default: "bi bi-trash-fill",
        title: "Clear history button icon",
        description: "Class name of the clear history control icon (displayed only if no image is defined)"
      },
      image: {
        type: "ImageDef",
        default: void 0,
        title: "Clear history button image",
        description: "Image of the clearHistory control"
      }
    },
    submit: {
      icon: {
        type: "string",
        default: "bi bi-send-fill",
        title: "Submit button icon",
        description: "Class name of the submit control icon (displayed only if no image is defined)"
      },
      image: {
        type: "ImageDef",
        default: void 0,
        title: "Submit button image",
        description: "Image of the submit control"
      }
    }
  }
}, Fs = {
  messages: {
    message: {
      header: {
        labelUser: {
          type: "string",
          default: "You",
          title: "Message header user label",
          description: void 0
        },
        labelBot: {
          type: "string",
          default: "Bot",
          title: "Message header bot label",
          description: void 0
        }
      },
      footnotes: {
        sources: {
          type: "string",
          default: "Sources :",
          title: "Footnotes label",
          description: void 0
        },
        showMoreLink: {
          type: "string",
          default: "> Show more",
          title: "Footnotes label",
          description: void 0
        }
      }
    }
  },
  questionBar: {
    clearHistory: {
      type: "string",
      default: "",
      title: "Clear history button label",
      description: void 0
    },
    clearHistoryAriaLabel: {
      type: "string",
      default: "Clear discussion and history button",
      title: "Clear history button Aria label",
      description: void 0
    },
    input: {
      placeholder: {
        type: "string",
        default: "Ask me a question...",
        title: "User input placeholder",
        description: void 0
      }
    },
    submit: {
      type: "string",
      default: "",
      title: "Submit button label",
      description: void 0
    },
    submitAriaLabel: {
      type: "string",
      default: "Submit button",
      title: "Submit button Aria label",
      description: void 0
    }
  },
  connectionErrorMessage: {
    type: "string",
    default: "An unexpected error occured. Please try again later.",
    title: "Connection error message",
    description: void 0
  }
}, os = {
  localStorage: qs,
  initialization: Vs,
  preferences: Ws,
  wording: Fs
};
function Ks(e) {
  return "type" in e && "default" in e && "title" in e && "description" in e;
}
function as(e, t = {}) {
  if (Ie(e)) {
    if (Ks(e))
      return e.default;
    {
      const s = Object.entries(e);
      for (let i = 0; i < s.length; i++) {
        const [n, o] = s[i];
        t[n] = as(o);
      }
      return t;
    }
  }
}
const Z = class Z {
  constructor(t) {
    ft(this, "options");
    const s = as(os);
    this.options = vt(s, t);
  }
  static clearInstance() {
    Z.instance && (Z.instance = void 0);
  }
  static setOptions(t) {
    Z.instance = new Z(t);
  }
  static getOptions() {
    if (!Z.instance)
      throw new Error("No TVK instance avalaible.");
    return Z.instance.options;
  }
};
ft(Z, "instance");
let M = Z;
const Qs = "main", Bt = "main_storage", Gs = () => ({
  userId: $s(),
  messages: []
}), G = zs(Qs, () => {
  const e = Yt(is), t = M.getOptions(), s = x(n());
  function i() {
  }
  function n() {
    if (t.localStorage.enabled) {
      const d = o();
      if (d)
        return d;
    }
    return Gs();
  }
  function o() {
    if (!t.localStorage.enabled)
      return !1;
    const d = localStorage.getItem(a());
    return d ? JSON.parse(d) : !1;
  }
  function a() {
    let d = Bt;
    return t.localStorage.prefix && (d = `${Bt}_${t.localStorage.prefix}`), d;
  }
  const r = Zt(
    () => s.value.messages
  );
  function u() {
    s.value.messages = s.value.messages.filter((d) => d.type !== H.loader);
  }
  function f() {
  }
  function b(d) {
    const C = G();
    C.clearLoaderMessages(), C.scrollMessages(), s.value.messages.push(d);
  }
  function p() {
    G().addMessage({
      type: H.error,
      author: w.app,
      date: Date.now(),
      text: t.wording.connectionErrorMessage
    });
  }
  async function g(d, C = !0) {
    const k = G();
    t.preferences.messages.clearOnNewRequest && (s.value.messages = []), C && k.addMessage({
      type: H.message,
      author: w.user,
      text: d,
      date: Date.now()
    }), k.addMessage({
      type: H.loader,
      author: w.app,
      date: Date.now()
    });
    const D = navigator.language, O = {
      query: d,
      userId: s.value.userId,
      locale: D,
      sourceWithContent: t.preferences.messages.footNotes.requireSourcesContent
    };
    let I;
    try {
      I = await fetch(e, {
        method: "post",
        body: JSON.stringify(O)
      });
    } catch (v) {
      console.log(v), p();
      return;
    }
    if (!I.ok) {
      console.log(I), p();
      return;
    }
    let J;
    try {
      J = await I.json();
    } catch (v) {
      console.log(v), p();
      return;
    }
    if (k.clearLoaderMessages(), J.responses.forEach((v) => {
      delete v.type, delete v.version, "text" in v ? k.addMessage({
        type: H.message,
        author: w.bot,
        date: Date.now(),
        ...v
      }) : "card" in v ? k.addMessage({
        type: H.card,
        author: w.bot,
        date: Date.now(),
        ...v.card
      }) : "image" in v ? k.addMessage({
        type: H.image,
        author: w.bot,
        date: Date.now(),
        ...v.image
      }) : "carousel" in v && k.addMessage({
        type: H.carousel,
        author: w.bot,
        date: Date.now(),
        ...v.carousel
      });
    }), t.localStorage.enabled) {
      let v = JSON.stringify(s.value);
      if (t.localStorage.maxNumberMessages && s.value.messages.length > t.localStorage.maxNumberMessages) {
        const N = JSON.parse(v), U = N.messages.length - parseInt(
          t.localStorage.maxNumberMessages
        );
        U && (N.messages = N.messages.slice(
          U,
          N.messages.length + 1
        )), v = JSON.stringify(N);
      }
      localStorage.setItem(a(), v);
    }
  }
  function E() {
    s.value.messages = [], t.localStorage.enabled && localStorage.setItem(a(), JSON.stringify(s.value));
  }
  return {
    state: s,
    updateApplication: i,
    getStoredState: o,
    getMessages: r,
    sendUserMessage: g,
    addMessage: b,
    clearHistory: E,
    clearLoaderMessages: u,
    scrollMessages: f
  };
}), Js = ["aria-label"], Ys = ["src"], Xs = ["maxlength", "placeholder"], Zs = { class: "tvk-question-bar-chars-count" }, en = ["disabled", "aria-label"], tn = ["src"], sn = /* @__PURE__ */ W({
  __name: "question-block",
  setup(e) {
    const t = M.getOptions(), s = G(), i = t.preferences.questionBar.maxUserInputLength, n = x(null), o = x("");
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
    return (p, g) => {
      var E;
      return h(), y("div", {
        class: "tvk-question-bar",
        onClick: a
      }, [
        (E = l(t).preferences.questionBar.clearHistory) != null && E.display ? (h(), y("button", {
          key: 0,
          class: "tvk-btn tvk-question-bar-btn-clear-history",
          "aria-label": l(t).wording.questionBar.clearHistoryAriaLabel,
          onClick: b
        }, [
          !l(t).preferences.questionBar.clearHistory.image && l(t).preferences.questionBar.clearHistory.icon ? (h(), y("i", {
            key: 0,
            class: fe(l(t).preferences.questionBar.clearHistory.icon)
          }, null, 2)) : T("", !0),
          l(t).preferences.questionBar.clearHistory.image ? (h(), y("img", {
            key: 1,
            src: l(t).preferences.questionBar.clearHistory.image.src,
            style: re({
              width: l(t).preferences.questionBar.clearHistory.image.width,
              height: l(t).preferences.questionBar.clearHistory.image.height
            })
          }, null, 12, Ys)) : T("", !0),
          Le(" " + P(l(t).wording.questionBar.clearHistory), 1)
        ], 8, Js)) : T("", !0),
        _("form", {
          onSubmit: Is(f, ["prevent"]),
          class: "tvk-question-bar-form"
        }, [
          _s(_("input", {
            ref_key: "input",
            ref: n,
            class: "tvk-question-bar-input",
            maxlength: l(t).preferences.questionBar.maxUserInputLength,
            placeholder: l(t).wording.questionBar.input.placeholder,
            "onUpdate:modelValue": g[0] || (g[0] = (d) => o.value = d)
          }, null, 8, Xs), [
            [ws, o.value]
          ]),
          _("div", Zs, P(r()) + "/" + P(l(i)), 1)
        ], 32),
        _("button", {
          disabled: !o.value.trim().length || u(),
          class: "tvk-btn tvk-question-bar-btn-submit",
          "aria-label": l(t).wording.questionBar.submitAriaLabel,
          onClick: f
        }, [
          !l(t).preferences.questionBar.submit.image && l(t).preferences.questionBar.submit.icon ? (h(), y("i", {
            key: 0,
            class: fe(l(t).preferences.questionBar.submit.icon)
          }, null, 2)) : T("", !0),
          l(t).preferences.questionBar.submit.image ? (h(), y("img", {
            key: 1,
            src: l(t).preferences.questionBar.submit.image.src,
            style: re({
              width: l(t).preferences.questionBar.submit.image.width,
              height: l(t).preferences.questionBar.submit.image.height
            })
          }, null, 12, tn)) : T("", !0),
          Le(" " + P(l(t).wording.questionBar.submit), 1)
        ], 8, en)
      ]);
    };
  }
}), nn = "aaa1rp3bb0ott3vie4c1le2ogado5udhabi7c0ademy5centure6ountant0s9o1tor4d0s1ult4e0g1ro2tna4f0l1rica5g0akhan5ency5i0g1rbus3force5tel5kdn3l0ibaba4pay4lfinanz6state5y2sace3tom5m0azon4ericanexpress7family11x2fam3ica3sterdam8nalytics7droid5quan4z2o0l2partments8p0le4q0uarelle8r0ab1mco4chi3my2pa2t0e3s0da2ia2sociates9t0hleta5torney7u0ction5di0ble3o3spost5thor3o0s4vianca6w0s2x0a2z0ure5ba0by2idu3namex3narepublic11d1k2r0celona5laycard4s5efoot5gains6seball5ketball8uhaus5yern5b0c1t1va3cg1n2d1e0ats2uty4er2ntley5rlin4st0buy5t2f1g1h0arti5i0ble3d1ke2ng0o3o1z2j1lack0friday9ockbuster8g1omberg7ue3m0s1w2n0pparibas9o0ats3ehringer8fa2m1nd2o0k0ing5sch2tik2on4t1utique6x2r0adesco6idgestone9oadway5ker3ther5ussels7s1t1uild0ers6siness6y1zz3v1w1y1z0h3ca0b1fe2l0l1vinklein9m0era3p2non3petown5ital0one8r0avan4ds2e0er0s4s2sa1e1h1ino4t0ering5holic7ba1n1re3c1d1enter4o1rn3f0a1d2g1h0anel2nel4rity4se2t2eap3intai5ristmas6ome4urch5i0priani6rcle4sco3tadel4i0c2y3k1l0aims4eaning6ick2nic1que6othing5ud3ub0med6m1n1o0ach3des3ffee4llege4ogne5m0cast4mbank4unity6pany2re3uter5sec4ndos3struction8ulting7tact3ractors9oking4l1p2rsica5untry4pon0s4rses6pa2r0edit0card4union9icket5own3s1uise0s6u0isinella9v1w1x1y0mru3ou3z2dabur3d1nce3ta1e1ing3sun4y2clk3ds2e0al0er2s3gree4livery5l1oitte5ta3mocrat6ntal2ist5si0gn4v2hl2iamonds6et2gital5rect0ory7scount3ver5h2y2j1k1m1np2o0cs1tor4g1mains5t1wnload7rive4tv2ubai3nlop4pont4rban5vag2r2z2earth3t2c0o2deka3u0cation8e1g1mail3erck5nergy4gineer0ing9terprises10pson4quipment8r0icsson6ni3s0q1tate5t1u0rovision8s2vents5xchange6pert3osed4ress5traspace10fage2il1rwinds6th3mily4n0s2rm0ers5shion4t3edex3edback6rrari3ero6i0delity5o2lm2nal1nce1ial7re0stone6mdale6sh0ing5t0ness6j1k1lickr3ghts4r2orist4wers5y2m1o0o0d1tball6rd1ex2sale4um3undation8x2r0ee1senius7l1ogans4ntier7tr2ujitsu5n0d2rniture7tbol5yi3ga0l0lery3o1up4me0s3p1rden4y2b0iz3d0n2e0a1nt0ing5orge5f1g0ee3h1i0ft0s3ves2ing5l0ass3e1obal2o4m0ail3bh2o1x2n1odaddy5ld0point6f2o0dyear5g0le4p1t1v2p1q1r0ainger5phics5tis4een3ipe3ocery4up4s1t1u0ardian6cci3ge2ide2tars5ru3w1y2hair2mburg5ngout5us3bo2dfc0bank7ealth0care8lp1sinki6re1mes5iphop4samitsu7tachi5v2k0t2m1n1ockey4ldings5iday5medepot5goods5s0ense7nda3rse3spital5t0ing5t0els3mail5use3w2r1sbc3t1u0ghes5yatt3undai7ibm2cbc2e1u2d1e0ee3fm2kano4l1m0amat4db2mo0bilien9n0c1dustries8finiti5o2g1k1stitute6urance4e4t0ernational10uit4vestments10o1piranga7q1r0ish4s0maili5t0anbul7t0au2v3jaguar4va3cb2e0ep2tzt3welry6io2ll2m0p2nj2o0bs1urg4t1y2p0morgan6rs3uegos4niper7kaufen5ddi3e0rryhotels6logistics9properties14fh2g1h1i0a1ds2m1ndle4tchen5wi3m1n1oeln3matsu5sher5p0mg2n2r0d1ed3uokgroup8w1y0oto4z2la0caixa5mborghini8er3ncaster6d0rover6xess5salle5t0ino3robe5w0yer5b1c1ds2ease3clerc5frak4gal2o2xus4gbt3i0dl2fe0insurance9style7ghting6ke2lly3mited4o2ncoln4k2psy3ve1ing5k1lc1p2oan0s3cker3us3l1ndon4tte1o3ve3pl0financial11r1s1t0d0a3u0ndbeck6xe1ury5v1y2ma0drid4if1son4keup4n0agement7go3p1rket0ing3s4riott5shalls7ttel5ba2c0kinsey7d1e0d0ia3et2lbourne7me1orial6n0u2rckmsd7g1h1iami3crosoft7l1ni1t2t0subishi9k1l0b1s2m0a2n1o0bi0le4da2e1i1m1nash3ey2ster5rmon3tgage6scow4to0rcycles9v0ie4p1q1r1s0d2t0n1r2u0seum3ic4v1w1x1y1z2na0b1goya4me2tura4vy3ba2c1e0c1t0bank4flix4work5ustar5w0s2xt0direct7us4f0l2g0o2hk2i0co2ke1on3nja3ssan1y5l1o0kia3rton4w0ruz3tv4p1r0a1w2tt2u1yc2z2obi1server7ffice5kinawa6layan0group9dnavy5lo3m0ega4ne1g1l0ine5oo2pen3racle3nge4g0anic5igins6saka4tsuka4t2vh3pa0ge2nasonic7ris2s1tners4s1y3y2ccw3e0t2f0izer5g1h0armacy6d1ilips5one2to0graphy6s4ysio5ics1tet2ures6d1n0g1k2oneer5zza4k1l0ace2y0station9umbing5s3m1n0c2ohl2ker3litie5rn2st3r0america6xi3ess3ime3o0d0uctions8f1gressive8mo2perties3y5tection8u0dential9s1t1ub2w0c2y2qa1pon3uebec3st5racing4dio4e0ad1lestate6tor2y4cipes5d0stone5umbrella9hab3ise0n3t2liance6n0t0als5pair3ort3ublican8st0aurant8view0s5xroth6ich0ardli6oh3l1o1p2o0cks3deo3gers4om3s0vp3u0gby3hr2n2w0e2yukyu6sa0arland6fe0ty4kura4le1on3msclub4ung5ndvik0coromant12ofi4p1rl2s1ve2xo3b0i1s2c0a1b1haeffler7midt4olarships8ol3ule3warz5ience5ot3d1e0arch3t2cure1ity6ek2lect4ner3rvices6ven3w1x0y3fr2g1h0angrila6rp2w2ell3ia1ksha5oes2p0ping5uji3w3i0lk2na1gles5te3j1k0i0n2y0pe4l0ing4m0art3ile4n0cf3o0ccer3ial4ftbank4ware6hu2lar2utions7ng1y2y2pa0ce3ort2t3r0l2s1t0ada2ples4r1tebank4farm7c0group6ockholm6rage3e3ream4udio2y3yle4u0cks3pplies3y2ort5rf1gery5zuki5v1watch4iss4x1y0dney4stems6z2tab1ipei4lk2obao4rget4tamotors6r2too4x0i3c0i2d0k2eam2ch0nology8l1masek5nnis4va3f1g1h0d1eater2re6iaa2ckets5enda4ps2res2ol4j0maxx4x2k0maxx5l1m0all4n1o0day3kyo3ols3p1ray3shiba5tal3urs3wn2yota3s3r0ade1ing4ining5vel0ers0insurance16ust3v2t1ube2i1nes3shu4v0s2w1z2ua1bank3s2g1k1nicom3versity8o2ol2ps2s1y1z2va0cations7na1guard7c1e0gas3ntures6risign5mögensberater2ung14sicherung10t2g1i0ajes4deo3g1king4llas4n1p1rgin4sa1ion4va1o3laanderen9n1odka3lvo3te1ing3o2yage5u2wales2mart4ter4ng0gou5tch0es6eather0channel12bcam3er2site5d0ding5ibo2r3f1hoswho6ien2ki2lliamhill9n0dows4e1ners6me2olterskluwer11odside6rk0s2ld3w2s1tc1f3xbox3erox4finity6ihuan4n2xx2yz3yachts4hoo3maxun5ndex5e1odobashi7ga2kohama6u0tube6t1un3za0ppos4ra3ero3ip2m1one3uerich6w2", on = "ελ1υ2бг1ел3дети4ею2католик6ом3мкд2он1сква6онлайн5рг3рус2ф2сайт3рб3укр3қаз3հայ3ישראל5קום3ابوظبي5رامكو5لاردن4بحرين5جزائر5سعودية6عليان5مغرب5مارات5یران5بارت2زار4يتك3ھارت5تونس4سودان3رية5شبكة4عراق2ب2مان4فلسطين6قطر3كاثوليك6وم3مصر2ليسيا5وريتانيا7قع4همراه5پاکستان7ڀارت4कॉम3नेट3भारत0म्3ोत5संगठन5বাংলা5ভারত2ৰত4ਭਾਰਤ4ભારત4ଭାରତ4இந்தியா6லங்கை6சிங்கப்பூர்11భారత్5ಭಾರತ4ഭാരതം5ලංකා4คอม3ไทย3ລາວ3გე2みんな3アマゾン4クラウド4グーグル4コム2ストア3セール3ファッション6ポイント4世界2中信1国1國1文网3亚马逊3企业2佛山2信息2健康2八卦2公司1益2台湾1灣2商城1店1标2嘉里0大酒店5在线2大拿2天主教3娱乐2家電2广东2微博2慈善2我爱你3手机2招聘2政务1府2新加坡2闻2时尚2書籍2机构2淡马锡3游戏2澳門2点看2移动2组织机构4网址1店1站1络2联通2谷歌2购物2通販2集团2電訊盈科4飞利浦3食品2餐厅2香格里拉3港2닷넷1컴2삼성2한국2", pe = (e, t) => {
  for (const s in t)
    e[s] = t[s];
  return e;
}, Tt = "numeric", kt = "ascii", St = "alpha", _e = "asciinumeric", Ce = "alphanumeric", Et = "domain", rs = "emoji", an = "scheme", rn = "slashscheme", Ut = "whitespace";
function cn(e, t) {
  return e in t || (t[e] = []), t[e];
}
function ae(e, t, s) {
  t[Tt] && (t[_e] = !0, t[Ce] = !0), t[kt] && (t[_e] = !0, t[St] = !0), t[_e] && (t[Ce] = !0), t[St] && (t[Ce] = !0), t[Ce] && (t[Et] = !0), t[rs] && (t[Et] = !0);
  for (const i in t) {
    const n = cn(i, s);
    n.indexOf(e) < 0 && n.push(e);
  }
}
function ln(e, t) {
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
    return t && t.j ? n = t : (n = new j(t), s && i && ae(t, s, i)), this.jr.push([e, n]), n;
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
    if (r ? (a = new j(), pe(a.j, r.j), a.jr.push.apply(a.jr, r.jr), a.jd = r.jd, a.t = r.t) : a = new j(), o) {
      if (i)
        if (a.t && typeof a.t == "string") {
          const u = pe(ln(a.t, i), s);
          ae(o, u, i);
        } else
          s && ae(o, s, i);
      a.t = o;
    }
    return n.j[e] = a, a;
  }
};
const m = (e, t, s, i, n) => e.ta(t, s, i, n), $ = (e, t, s, i, n) => e.tr(t, s, i, n), jt = (e, t, s, i, n) => e.ts(t, s, i, n), c = (e, t, s, i, n) => e.tt(t, s, i, n), X = "WORD", Ct = "UWORD", ke = "LOCALHOST", At = "TLD", Dt = "UTLD", we = "SCHEME", he = "SLASH_SCHEME", wt = "NUM", cs = "WS", Ot = "NL", be = "OPENBRACE", ve = "CLOSEBRACE", xe = "OPENBRACKET", Re = "CLOSEBRACKET", He = "OPENPAREN", Pe = "CLOSEPAREN", Me = "OPENANGLEBRACKET", Be = "CLOSEANGLEBRACKET", Ue = "FULLWIDTHLEFTPAREN", je = "FULLWIDTHRIGHTPAREN", ze = "LEFTCORNERBRACKET", $e = "RIGHTCORNERBRACKET", qe = "LEFTWHITECORNERBRACKET", Ve = "RIGHTWHITECORNERBRACKET", We = "FULLWIDTHLESSTHAN", Fe = "FULLWIDTHGREATERTHAN", Ke = "AMPERSAND", Qe = "APOSTROPHE", Ge = "ASTERISK", ie = "AT", Je = "BACKSLASH", Ye = "BACKTICK", Xe = "CARET", oe = "COLON", Lt = "COMMA", Ze = "DOLLAR", F = "DOT", et = "EQUALS", xt = "EXCLAMATION", K = "HYPHEN", tt = "PERCENT", st = "PIPE", nt = "PLUS", it = "POUND", ot = "QUERY", Rt = "QUOTE", Ht = "SEMI", Q = "SLASH", Te = "TILDE", at = "UNDERSCORE", ls = "EMOJI", rt = "SYM";
var us = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  WORD: X,
  UWORD: Ct,
  LOCALHOST: ke,
  TLD: At,
  UTLD: Dt,
  SCHEME: we,
  SLASH_SCHEME: he,
  NUM: wt,
  WS: cs,
  NL: Ot,
  OPENBRACE: be,
  CLOSEBRACE: ve,
  OPENBRACKET: xe,
  CLOSEBRACKET: Re,
  OPENPAREN: He,
  CLOSEPAREN: Pe,
  OPENANGLEBRACKET: Me,
  CLOSEANGLEBRACKET: Be,
  FULLWIDTHLEFTPAREN: Ue,
  FULLWIDTHRIGHTPAREN: je,
  LEFTCORNERBRACKET: ze,
  RIGHTCORNERBRACKET: $e,
  LEFTWHITECORNERBRACKET: qe,
  RIGHTWHITECORNERBRACKET: Ve,
  FULLWIDTHLESSTHAN: We,
  FULLWIDTHGREATERTHAN: Fe,
  AMPERSAND: Ke,
  APOSTROPHE: Qe,
  ASTERISK: Ge,
  AT: ie,
  BACKSLASH: Je,
  BACKTICK: Ye,
  CARET: Xe,
  COLON: oe,
  COMMA: Lt,
  DOLLAR: Ze,
  DOT: F,
  EQUALS: et,
  EXCLAMATION: xt,
  HYPHEN: K,
  PERCENT: tt,
  PIPE: st,
  PLUS: nt,
  POUND: it,
  QUERY: ot,
  QUOTE: Rt,
  SEMI: Ht,
  SLASH: Q,
  TILDE: Te,
  UNDERSCORE: at,
  EMOJI: ls,
  SYM: rt
});
const ue = /[a-z]/, dt = new RegExp("\\p{L}", "u"), pt = new RegExp("\\p{Emoji}", "u"), gt = /\d/, zt = /\s/, $t = `
`, un = "️", hn = "‍";
let Ae = null, De = null;
function fn(e) {
  e === void 0 && (e = []);
  const t = {};
  j.groups = t;
  const s = new j();
  Ae == null && (Ae = qt(nn)), De == null && (De = qt(on)), c(s, "'", Qe), c(s, "{", be), c(s, "}", ve), c(s, "[", xe), c(s, "]", Re), c(s, "(", He), c(s, ")", Pe), c(s, "<", Me), c(s, ">", Be), c(s, "（", Ue), c(s, "）", je), c(s, "「", ze), c(s, "」", $e), c(s, "『", qe), c(s, "』", Ve), c(s, "＜", We), c(s, "＞", Fe), c(s, "&", Ke), c(s, "*", Ge), c(s, "@", ie), c(s, "`", Ye), c(s, "^", Xe), c(s, ":", oe), c(s, ",", Lt), c(s, "$", Ze), c(s, ".", F), c(s, "=", et), c(s, "!", xt), c(s, "-", K), c(s, "%", tt), c(s, "|", st), c(s, "+", nt), c(s, "#", it), c(s, "?", ot), c(s, '"', Rt), c(s, "/", Q), c(s, ";", Ht), c(s, "~", Te), c(s, "_", at), c(s, "\\", Je);
  const i = $(s, gt, wt, {
    [Tt]: !0
  });
  $(i, gt, i);
  const n = $(s, ue, X, {
    [kt]: !0
  });
  $(n, ue, n);
  const o = $(s, dt, Ct, {
    [St]: !0
  });
  $(o, ue), $(o, dt, o);
  const a = $(s, zt, cs, {
    [Ut]: !0
  });
  c(s, $t, Ot, {
    [Ut]: !0
  }), c(a, $t), $(a, zt, a);
  const r = $(s, pt, ls, {
    [rs]: !0
  });
  $(r, pt, r), c(r, un, r);
  const u = c(r, hn);
  $(u, pt, r);
  const f = [[ue, n]], b = [[ue, null], [dt, o]];
  for (let p = 0; p < Ae.length; p++)
    se(s, Ae[p], At, X, f);
  for (let p = 0; p < De.length; p++)
    se(s, De[p], Dt, Ct, b);
  ae(At, {
    tld: !0,
    ascii: !0
  }, t), ae(Dt, {
    utld: !0,
    alpha: !0
  }, t), se(s, "file", we, X, f), se(s, "mailto", we, X, f), se(s, "http", he, X, f), se(s, "https", he, X, f), se(s, "ftp", he, X, f), se(s, "ftps", he, X, f), ae(we, {
    scheme: !0,
    ascii: !0
  }, t), ae(he, {
    slashscheme: !0,
    ascii: !0
  }, t), e = e.sort((p, g) => p[0] > g[0] ? 1 : -1);
  for (let p = 0; p < e.length; p++) {
    const g = e[p][0], d = e[p][1] ? {
      [an]: !0
    } : {
      [rn]: !0
    };
    g.indexOf("-") >= 0 ? d[Et] = !0 : ue.test(g) ? gt.test(g) ? d[_e] = !0 : d[kt] = !0 : d[Tt] = !0, jt(s, g, g, d);
  }
  return jt(s, "localhost", ke, {
    ascii: !0
  }), s.jd = new j(rt), {
    start: s,
    tokens: pe({
      groups: t
    }, us)
  };
}
function dn(e, t) {
  const s = pn(t.replace(/[A-Z]/g, (r) => r.toLowerCase())), i = s.length, n = [];
  let o = 0, a = 0;
  for (; a < i; ) {
    let r = e, u = null, f = 0, b = null, p = -1, g = -1;
    for (; a < i && (u = r.go(s[a])); )
      r = u, r.accepts() ? (p = 0, g = 0, b = r) : p >= 0 && (p += s[a].length, g++), f += s[a].length, o += s[a].length, a++;
    o -= p, a -= g, f -= p, n.push({
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
function pn(e) {
  const t = [], s = e.length;
  let i = 0;
  for (; i < s; ) {
    let n = e.charCodeAt(i), o, a = n < 55296 || n > 56319 || i + 1 === s || (o = e.charCodeAt(i + 1)) < 56320 || o > 57343 ? e[i] : e.slice(i, i + 2);
    t.push(a), i += a.length;
  }
  return t;
}
function se(e, t, s, i, n) {
  let o;
  const a = t.length;
  for (let r = 0; r < a - 1; r++) {
    const u = t[r];
    e.j[u] ? o = e.j[u] : (o = new j(i), o.jr = n.slice(), e.j[u] = o), e = o;
  }
  return o = new j(s), o.jr = n.slice(), e.j[t[a - 1]] = o, o;
}
function qt(e) {
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
const Se = {
  defaultProtocol: "http",
  events: null,
  format: Vt,
  formatHref: Vt,
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
function Pt(e, t) {
  t === void 0 && (t = null);
  let s = pe({}, Se);
  e && (s = pe(s, e instanceof Pt ? e.o : e));
  const i = s.ignoreTags, n = [];
  for (let o = 0; o < i.length; o++)
    n.push(i[o].toUpperCase());
  this.o = s, t && (this.defaultRender = t), this.ignoreTags = n;
}
Pt.prototype = {
  o: Se,
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
    return n && (typeof n == "object" ? (n = s.t in n ? n[s.t] : Se[e], typeof n == "function" && i && (n = n(t, s))) : typeof n == "function" && i && (n = n(t, s.t, s)), n);
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
function Vt(e) {
  return e;
}
function hs(e, t) {
  this.t = "token", this.v = e, this.tk = t;
}
hs.prototype = {
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
    return e === void 0 && (e = Se.defaultProtocol), {
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
    return a.href = i, r && (a.class = r), u && (a.target = u), f && (a.rel = f), b && pe(a, b), {
      tagName: n,
      attributes: a,
      content: o,
      eventListeners: p
    };
  }
};
function ht(e, t) {
  class s extends hs {
    constructor(n, o) {
      super(n, o), this.t = e;
    }
  }
  for (const i in t)
    s.prototype[i] = t[i];
  return s.t = e, s;
}
const Wt = ht("email", {
  isLink: !0,
  toHref() {
    return "mailto:" + this.toString();
  }
}), Ft = ht("text"), gn = ht("nl"), Ne = ht("url", {
  isLink: !0,
  /**
  	Lowercases relevant parts of the domain and adds the protocol if
  	required. Note that this will not escape unsafe HTML characters in the
  	URL.
  		@param {string} [scheme] default scheme (e.g., 'https')
  	@return {string} the full href
  */
  toHref(e) {
    return e === void 0 && (e = Se.defaultProtocol), this.hasProtocol() ? this.v : `${e}://${this.v}`;
  },
  /**
   * Check whether this URL token has a protocol
   * @return {boolean}
   */
  hasProtocol() {
    const e = this.tk;
    return e.length >= 2 && e[0].t !== ke && e[1].t === oe;
  }
}), q = (e) => new j(e);
function mn(e) {
  let {
    groups: t
  } = e;
  const s = t.domain.concat([Ke, Ge, ie, Je, Ye, Xe, Ze, et, K, wt, tt, st, nt, it, Q, rt, Te, at]), i = [Qe, oe, Lt, F, xt, ot, Rt, Ht, Me, Be, be, ve, Re, xe, He, Pe, Ue, je, ze, $e, qe, Ve, We, Fe], n = [Ke, Qe, Ge, Je, Ye, Xe, Ze, et, K, be, ve, tt, st, nt, it, ot, Q, rt, Te, at], o = q(), a = c(o, Te);
  m(a, n, a), m(a, t.domain, a);
  const r = q(), u = q(), f = q();
  m(o, t.domain, r), m(o, t.scheme, u), m(o, t.slashscheme, f), m(r, n, a), m(r, t.domain, r);
  const b = c(r, ie);
  c(a, ie, b), c(u, ie, b), c(f, ie, b);
  const p = c(a, F);
  m(p, n, a), m(p, t.domain, a);
  const g = q();
  m(b, t.domain, g), m(g, t.domain, g);
  const E = c(g, F);
  m(E, t.domain, g);
  const d = q(Wt);
  m(E, t.tld, d), m(E, t.utld, d), c(b, ke, d);
  const C = c(g, K);
  m(C, t.domain, g), m(d, t.domain, g), c(d, F, E), c(d, K, C);
  const k = c(d, oe);
  m(k, t.numeric, Wt);
  const D = c(r, K), O = c(r, F);
  m(D, t.domain, r), m(O, n, a), m(O, t.domain, r);
  const I = q(Ne);
  m(O, t.tld, I), m(O, t.utld, I), m(I, t.domain, r), m(I, n, a), c(I, F, O), c(I, K, D), c(I, ie, b);
  const J = c(I, oe), v = q(Ne);
  m(J, t.numeric, v);
  const N = q(Ne), U = q();
  m(N, s, N), m(N, i, U), m(U, s, N), m(U, i, U), c(I, Q, N), c(v, Q, N);
  const A = c(u, oe), S = c(f, oe), z = c(S, Q), V = c(z, Q);
  m(u, t.domain, r), c(u, F, O), c(u, K, D), m(f, t.domain, r), c(f, F, O), c(f, K, D), m(A, t.domain, N), c(A, Q, N), m(V, t.domain, N), m(V, s, N), c(V, Q, N);
  const te = [
    [be, ve],
    // {}
    [xe, Re],
    // []
    [He, Pe],
    // ()
    [Me, Be],
    // <>
    [Ue, je],
    // （）
    [ze, $e],
    // 「」
    [qe, Ve],
    // 『』
    [We, Fe]
    // ＜＞
  ];
  for (let ge = 0; ge < te.length; ge++) {
    const [Ee, Y] = te[ge], L = c(N, Ee);
    c(U, Ee, L), c(L, Y, N);
    const ce = q(Ne);
    m(L, s, ce);
    const me = q();
    m(L, i), m(ce, s, ce), m(ce, i, me), m(me, s, ce), m(me, i, me), c(ce, Y, N), c(me, Y, N);
  }
  return c(o, ke, I), c(o, Ot, gn), {
    start: o,
    tokens: us
  };
}
function yn(e, t, s) {
  let i = s.length, n = 0, o = [], a = [];
  for (; n < i; ) {
    let r = e, u = null, f = null, b = 0, p = null, g = -1;
    for (; n < i && !(u = r.go(s[n].t)); )
      a.push(s[n++]);
    for (; n < i && (f = u || r.go(s[n].t)); )
      u = null, r = f, r.accepts() ? (g = 0, p = r) : g >= 0 && g++, n++, b++;
    if (g < 0)
      n -= b, n < i && (a.push(s[n]), n++);
    else {
      a.length > 0 && (o.push(mt(Ft, t, a)), a = []), n -= g, b -= g;
      const E = p.t, d = s.slice(n - b, n);
      o.push(mt(E, t, d));
    }
  }
  return a.length > 0 && o.push(mt(Ft, t, a)), o;
}
function mt(e, t, s) {
  const i = s[0].s, n = s[s.length - 1].e, o = t.slice(i, n);
  return new e(o, s);
}
const B = {
  scanner: null,
  parser: null,
  tokenQueue: [],
  pluginQueue: [],
  customSchemes: [],
  initialized: !1
};
function bn() {
  B.scanner = fn(B.customSchemes);
  for (let e = 0; e < B.tokenQueue.length; e++)
    B.tokenQueue[e][1]({
      scanner: B.scanner
    });
  B.parser = mn(B.scanner.tokens);
  for (let e = 0; e < B.pluginQueue.length; e++)
    B.pluginQueue[e][1]({
      scanner: B.scanner,
      parser: B.parser
    });
  B.initialized = !0;
}
function vn(e) {
  return B.initialized || bn(), yn(B.parser.start, e, dn(B.scanner.start, e));
}
var Tn = {
  // We don't need the complete named character reference because linkifyHtml
  // does not modify the escape sequences. We do need &nbsp; so that
  // whitespace is parsed properly. Other types of whitespace should already
  // be accounted for. &gt; &lt; and &quot; are also frequently relevant ones
  amp: "&",
  gt: ">",
  lt: "<",
  nbsp: " ",
  quot: '"'
}, kn = /^#[xX]([A-Fa-f0-9]+)$/, Sn = /^#([0-9]+)$/, En = /^([A-Za-z0-9]+)$/, Cn = (
  /** @class */
  function() {
    function e(t) {
      this.named = t;
    }
    return e.prototype.parse = function(t) {
      if (t) {
        var s = t.match(kn);
        if (s)
          return String.fromCharCode(parseInt(s[1], 16));
        if (s = t.match(Sn), s)
          return String.fromCharCode(parseInt(s[1], 10));
        if (s = t.match(En), s)
          return this.named[s[1]] || "&" + s[1] + ";";
      }
    }, e;
  }()
), An = /[\t\n\f ]/, Dn = /[A-Za-z]/, Nn = /\r\n?/g;
function R(e) {
  return An.test(e);
}
function Kt(e) {
  return Dn.test(e);
}
function In(e) {
  return e.replace(Nn, `
`);
}
var _n = (
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
          ) : (n === "@" || n === ":" || Kt(n)) && (this.transitionTo(
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
          R(n) && this.transitionTo(
            "beforeDoctypeName"
            /* beforeDoctypeName */
          );
        },
        beforeDoctypeName: function() {
          var n = this.consume();
          R(n) || (this.transitionTo(
            "doctypeName"
            /* doctypeName */
          ), this.delegate.appendToDoctypeName && this.delegate.appendToDoctypeName(n.toLowerCase()));
        },
        doctypeName: function() {
          var n = this.consume();
          R(n) ? this.transitionTo(
            "afterDoctypeName"
            /* afterDoctypeName */
          ) : n === ">" ? (this.delegate.endDoctype && this.delegate.endDoctype(), this.transitionTo(
            "beforeData"
            /* beforeData */
          )) : this.delegate.appendToDoctypeName && this.delegate.appendToDoctypeName(n.toLowerCase());
        },
        afterDoctypeName: function() {
          var n = this.consume();
          if (!R(n))
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
          R(n) ? (this.transitionTo(
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
          R(n) ? this.transitionTo(
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
          R(n) || (n === ">" ? (this.delegate.endDoctype && this.delegate.endDoctype(), this.transitionTo(
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
          R(n) || n === ">" && (this.delegate.endDoctype && this.delegate.endDoctype(), this.transitionTo(
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
          R(n) ? this.transitionTo(
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
          R(n) ? (this.transitionTo(
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
          if (R(n)) {
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
          R(n) ? (this.transitionTo(
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
          if (R(n)) {
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
          R(n) ? this.consume() : n === '"' ? (this.transitionTo(
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
          R(n) ? (this.delegate.finishAttributeValue(), this.consume(), this.transitionTo(
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
          R(n) ? (this.consume(), this.transitionTo(
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
          (n === "@" || n === ":" || Kt(n)) && (this.transitionTo(
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
      for (this.input += In(t); this.index < this.input.length; ) {
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
), wn = (
  /** @class */
  function() {
    function e(t, s) {
      s === void 0 && (s = {}), this.options = s, this.token = null, this.startLine = 1, this.startColumn = 0, this.tokens = [], this.tokenizer = new _n(this, t, s.mode), this._currentAttribute = void 0;
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
function On(e, t) {
  var s = new wn(new Cn(Tn), t);
  return s.tokenize(e);
}
const fs = "LinkifyResult", ct = "StartTag", ds = "EndTag", Nt = "Chars", Ln = "Comment", xn = "Doctype";
function ps(e, t) {
  t === void 0 && (t = {});
  const s = On(e), i = [], n = [], o = new Pt(t, Pn);
  for (let a = 0; a < s.length; a++) {
    const r = s[a];
    if (r.type === ct) {
      i.push(r);
      const u = r.tagName.toUpperCase();
      if (!(u === "A" || o.ignoreTags.indexOf(u) >= 0))
        continue;
      let b = i.length;
      Hn(u, s, ++a, i), a += i.length - b - 1;
    } else if (r.type !== Nt)
      i.push(r);
    else {
      const u = Rn(r.chars, o);
      i.push.apply(i, u);
    }
  }
  for (let a = 0; a < i.length; a++) {
    const r = i[a];
    switch (r.type) {
      case fs:
        n.push(r.rendered);
        break;
      case ct: {
        let u = "<" + r.tagName;
        r.attributes.length > 0 && (u += " " + Bn(r.attributes).join(" ")), r.selfClosing && (u += " /"), u += ">", n.push(u);
        break;
      }
      case ds:
        n.push(`</${r.tagName}>`);
        break;
      case Nt:
        n.push(It(r.chars));
        break;
      case Ln:
        n.push(`<!--${It(r.chars)}-->`);
        break;
      case xn: {
        let u = `<!DOCTYPE ${r.name}`;
        r.publicIdentifier && (u += ` PUBLIC "${r.publicIdentifier}"`), r.systemIdentifier && (u += ` "${r.systemIdentifier}"`), u += ">", n.push(u);
        break;
      }
    }
  }
  return n.join("");
}
function Rn(e, t) {
  const s = vn(e), i = [];
  for (let n = 0; n < s.length; n++) {
    const o = s[n];
    o.t === "nl" && t.get("nl2br") ? i.push({
      type: ct,
      tagName: "br",
      attributes: [],
      selfClosing: !0
    }) : !o.isLink || !t.check(o) ? i.push({
      type: Nt,
      chars: o.toString()
    }) : i.push({
      type: fs,
      rendered: t.render(o)
    });
  }
  return i;
}
function Hn(e, t, s, i) {
  let n = 1;
  for (; s < t.length && n > 0; ) {
    let o = t[s];
    o.type === ct && o.tagName.toUpperCase() === e ? n++ : o.type === ds && o.tagName.toUpperCase() === e && n--, i.push(o), s++;
  }
  return i;
}
function Pn(e) {
  let {
    tagName: t,
    attributes: s,
    content: i
  } = e;
  return `<${t} ${Mn(s)}>${It(i)}</${t}>`;
}
function It(e) {
  return e.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function gs(e) {
  return e.replace(/"/g, "&quot;");
}
function Mn(e) {
  const t = [];
  for (const s in e) {
    const i = e[s] + "";
    t.push(`${s}="${gs(i)}"`);
  }
  return t.join(" ");
}
function Bn(e) {
  const t = [];
  for (let s = 0; s < e.length; s++) {
    const i = e[s][0], n = e[s][1] + "";
    t.push(`${i}="${gs(n)}"`);
  }
  return t;
}
const Un = /* @__PURE__ */ W({
  __name: "button",
  props: {
    button: {}
  },
  setup(e) {
    const t = G(), s = e;
    function i() {
      t.sendUserMessage(s.button.title);
    }
    return (n, o) => (h(), y("button", {
      class: "tvk-btn tvk-btn-action",
      onClick: i
    }, P(s.button.title), 1));
  }
}), jn = { class: "tvk-footnote" }, zn = ["href"], $n = {
  key: 1,
  class: "tvk-footnote-title"
}, qn = {
  key: 2,
  class: "tvk-footnote-content"
}, Vn = ["innerHTML"], Wn = /* @__PURE__ */ W({
  __name: "footnote",
  props: {
    footnote: {}
  },
  setup(e) {
    const t = M.getOptions(), s = e, i = x(!1);
    function n() {
      return ps(s.footnote.content, { target: "_blank" });
    }
    const o = x(null);
    function a() {
      return o.value ? o.value.offsetHeight < o.value.scrollHeight : !1;
    }
    return (r, u) => (h(), y("div", jn, [
      s.footnote.url ? (h(), y("a", {
        key: 0,
        href: s.footnote.url,
        target: "_blank",
        class: "tvk-footnote-title"
      }, P(s.footnote.title), 9, zn)) : T("", !0),
      s.footnote.url ? T("", !0) : (h(), y("span", $n, P(s.footnote.title), 1)),
      s.footnote.content ? (h(), y("div", qn, [
        _("div", {
          ref_key: "contentTxt",
          ref: o,
          style: re({
            "--tvk-clamp-nb-line": l(t).preferences.messages.footNotes.clampSourceContentNbLines
          }),
          class: fe({
            "tvk-clamp": l(t).preferences.messages.footNotes.clampSourceContent && !i.value
          })
        }, [
          _("span", {
            innerHTML: n()
          }, null, 8, Vn)
        ], 6),
        s.footnote.content && l(t).preferences.messages.footNotes.clampSourceContent && !i.value && a() ? (h(), y("a", {
          key: 0,
          href: "#!",
          class: "tvk-footnote-content-show-more-link",
          onClick: u[0] || (u[0] = (f) => i.value = !i.value)
        }, P(l(t).wording.messages.message.footnotes.showMoreLink), 1)) : T("", !0)
      ])) : T("", !0)
    ]));
  }
}), Fn = { class: "tvk-footnotes" }, Kn = { class: "tvk-footnotes-sources-label" }, ms = /* @__PURE__ */ W({
  __name: "footnotes",
  props: {
    footnotes: {}
  },
  setup(e) {
    const t = M.getOptions(), s = e;
    return (i, n) => (h(), y("div", Fn, [
      _("span", Kn, P(l(t).wording.messages.message.footnotes.sources), 1),
      (h(!0), y(de, null, lt(s.footnotes, (o) => (h(), ee(Wn, { footnote: o }, null, 8, ["footnote"]))), 256))
    ]));
  }
}), Qn = ["innerHTML"], Gn = /* @__PURE__ */ W({
  __name: "message-text",
  props: {
    message: {}
  },
  setup(e) {
    const t = M.getOptions(), s = e;
    function i() {
      return ps(s.message.text, { target: "_blank" });
    }
    return (n, o) => {
      var a;
      return h(), y(de, null, [
        _("div", {
          innerHTML: i(),
          tabindex: "1"
        }, null, 8, Qn),
        (a = s.message.footnotes) != null && a.length && l(t).preferences.messages.footNotes.display && !l(t).preferences.messages.footNotes.displayOnMessageSide ? (h(), ee(ms, {
          key: 0,
          footnotes: s.message.footnotes
        }, null, 8, ["footnotes"])) : T("", !0),
        (h(!0), y(de, null, lt(s.message.buttons, (r) => (h(), ee(Un, { button: r }, {
          default: Os(() => [
            Le(P(r.title), 1)
          ]),
          _: 2
        }, 1032, ["button"]))), 256))
      ], 64);
    };
  }
}), Jn = { class: "tvk-card" }, Yn = ["src", "alt"], Xn = { key: 1 }, Zn = { key: 2 }, ei = { key: 3 }, ys = /* @__PURE__ */ W({
  __name: "message-card",
  props: {
    card: {}
  },
  setup(e) {
    var o, a, r;
    const t = G();
    M.getOptions();
    const s = e, i = ((a = (o = s.card) == null ? void 0 : o.file) == null ? void 0 : a.description) ?? ((r = s.card) == null ? void 0 : r.title);
    function n(u) {
      s.card.file._loaded || (s.card.file._loaded = !0, t.scrollMessages());
    }
    return (u, f) => {
      var b, p, g, E, d, C, k, D, O, I, J, v;
      return h(), y("div", Jn, [
        (p = (b = s.card) == null ? void 0 : b.file) != null && p.url ? (h(), y("img", {
          key: 0,
          src: (E = (g = s.card) == null ? void 0 : g.file) == null ? void 0 : E.url,
          alt: l(i),
          onLoad: n,
          class: "tvk-thumbnail"
        }, null, 40, Yn)) : T("", !0),
        (d = s.card) != null && d.title ? (h(), y("div", Xn, [
          _("strong", null, P((C = s.card) == null ? void 0 : C.title), 1)
        ])) : T("", !0),
        (k = s.card) != null && k.subTitle ? (h(), y("div", Zn, P((D = s.card) == null ? void 0 : D.subTitle), 1)) : T("", !0),
        (I = (O = s.card) == null ? void 0 : O.file) != null && I.description ? (h(), y("div", ei, P((v = (J = s.card) == null ? void 0 : J.file) == null ? void 0 : v.description), 1)) : T("", !0)
      ]);
    };
  }
}), Qt = "transform 0.2s", ti = /* @__PURE__ */ W({
  __name: "message-carousel",
  props: {
    carousel: {}
  },
  setup(e) {
    const s = x(e.carousel.cards), i = x([]), n = x(null), o = x(null), a = x({}), r = x({}), u = x(!1);
    function f() {
      var k;
      const C = (k = n.value) == null ? void 0 : k.offsetWidth;
      a.value = {
        overflow: "hidden",
        "max-width": `${C}px`
      };
    }
    function b() {
      return i.value.reduce((C, k) => C + k.offsetWidth, 0);
    }
    function p() {
      if (u.value)
        return;
      u.value = !0, f();
      const C = b(), k = s.value[0];
      s.value.push(k);
      const D = i.value[0];
      r.value = {
        transition: Qt,
        transform: `translateX(-${D.offsetWidth}px)`,
        width: `${C + D.offsetWidth + 1}px`
      }, E(() => {
        s.value.shift(), d(), u.value = !1;
      });
    }
    function g() {
      if (u.value)
        return;
      u.value = !0, f();
      const C = b(), k = s.value[s.value.length - 1];
      s.value.unshift(k);
      const D = i.value[i.value.length - 1];
      r.value = {
        transition: "none",
        transform: `translateX(-${D.offsetWidth}px)`,
        width: `${C + D.offsetWidth + 1}px`
      }, setTimeout(() => {
        r.value = {
          transition: Qt,
          transform: "translateX(0)",
          width: `${C + D.offsetWidth + 1}px`
        }, E(() => {
          s.value.pop(), d(), u.value = !1;
        });
      });
    }
    function E(C) {
      var D;
      const k = () => {
        var O;
        C(), (O = o.value) == null || O.removeEventListener("transitionend", k);
      };
      (D = o.value) == null || D.addEventListener("transitionend", k);
    }
    function d() {
      a.value = {}, r.value = {
        transition: "none",
        transform: "translateX(0)"
      };
    }
    return (C, k) => (h(), y(de, null, [
      _("div", {
        class: "tvk-carousel",
        ref_key: "carouselRef",
        ref: n,
        style: re(a.value)
      }, [
        _("div", {
          class: "tvk-carousel-inner",
          ref_key: "innerRef",
          ref: o,
          style: re(r.value)
        }, [
          (h(!0), y(de, null, lt(s.value, (D) => (h(), y("div", {
            class: "tvk-carousel-card",
            key: JSON.stringify(D),
            ref_for: !0,
            ref_key: "cardsRefs",
            ref: i
          }, [
            _t(ys, { card: D }, null, 8, ["card"])
          ]))), 128))
        ], 4)
      ], 4),
      _("div", { class: "tvk-carousel-controls" }, [
        _("button", {
          class: "tvk-btn",
          onClick: g
        }, "prev"),
        _("button", {
          class: "tvk-btn",
          onClick: p
        }, "next")
      ])
    ], 64));
  }
}), si = /* @__PURE__ */ W({
  __name: "message-image",
  props: { message: Object },
  setup(e) {
    return M.getOptions(), (t, s) => "Image type not yet implemented";
  }
}), ni = { class: "tvk-message-answer" }, ii = {
  key: 0,
  class: "tvk-message-header"
}, oi = {
  key: 0,
  class: "tvk-message-header-avatar"
}, ai = ["src"], ri = ["src"], ci = {
  key: 1,
  class: "tvk-message-header-label"
}, li = { class: "tvk-message-header-label-user" }, ui = { class: "tvk-message-header-label-bot" }, hi = {
  key: 1,
  class: "tvk-message-body"
}, fi = {
  key: 2,
  class: "tvk-message-body-from-app"
}, di = {
  key: 0,
  class: "tvk-message-loader"
}, pi = {
  key: 1,
  class: "tvk-error-connection"
}, gi = /* @__PURE__ */ _("i", { class: "tvk-error-icon bi bi-exclamation-triangle" }, null, -1), mi = {
  key: 0,
  class: "tvk-side-footnotes"
}, yi = /* @__PURE__ */ W({
  __name: "message",
  props: {
    message: {}
  },
  setup(e) {
    const t = M.getOptions(), s = e;
    return (i, n) => {
      var o;
      return s.message.author !== l(w).user || !l(t).preferences.messages.message.hideUserMessages ? (h(), y("div", {
        key: 0,
        class: fe(["tvk-message", {
          "tvk-message-user": s.message.author === l(w).user,
          "tvk-message-bot": s.message.author === l(w).bot
        }])
      }, [
        _("div", ni, [
          l(t).preferences.messages.message.header.display && s.message.author !== l(w).app ? (h(), y("div", ii, [
            l(t).preferences.messages.message.header.avatar.display ? (h(), y("div", oi, [
              !l(t).preferences.messages.message.header.avatar.userImage && l(t).preferences.messages.message.header.avatar.userIcon && s.message.author === l(w).user ? (h(), y("i", {
                key: 0,
                class: fe([
                  "tvk-message-header-avatar-user",
                  l(t).preferences.messages.message.header.avatar.userIcon
                ])
              }, null, 2)) : T("", !0),
              l(t).preferences.messages.message.header.avatar.userImage && s.message.author === l(w).user ? (h(), y("img", {
                key: 1,
                src: l(t).preferences.messages.message.header.avatar.userImage.src,
                style: re({
                  width: l(t).preferences.messages.message.header.avatar.userImage.width,
                  height: l(t).preferences.messages.message.header.avatar.userImage.height
                }),
                role: "none"
              }, null, 12, ai)) : T("", !0),
              !l(t).preferences.messages.message.header.avatar.botImage && l(t).preferences.messages.message.header.avatar.botIcon && s.message.author === l(w).bot ? (h(), y("i", {
                key: 2,
                class: fe([
                  "tvk-message-header-avatar-bot",
                  l(t).preferences.messages.message.header.avatar.botIcon
                ])
              }, null, 2)) : T("", !0),
              l(t).preferences.messages.message.header.avatar.botImage && s.message.author === l(w).bot ? (h(), y("img", {
                key: 3,
                src: l(t).preferences.messages.message.header.avatar.botImage.src,
                style: re({
                  width: l(t).preferences.messages.message.header.avatar.botImage.width,
                  height: l(t).preferences.messages.message.header.avatar.botImage.height
                }),
                role: "none"
              }, null, 12, ri)) : T("", !0)
            ])) : T("", !0),
            l(t).preferences.messages.message.header.label.display ? (h(), y("div", ci, [
              _("span", li, P(l(t).wording.messages.message.header.labelUser), 1),
              _("span", ui, P(l(t).wording.messages.message.header.labelBot), 1)
            ])) : T("", !0)
          ])) : T("", !0),
          s.message.author !== l(w).app ? (h(), y("div", hi, [
            s.message.type === l(H).message ? (h(), ee(Gn, {
              key: 0,
              message: s.message
            }, null, 8, ["message"])) : T("", !0),
            s.message.type === l(H).card ? (h(), ee(ys, {
              key: 1,
              card: s.message
            }, null, 8, ["card"])) : T("", !0),
            s.message.type === l(H).carousel ? (h(), ee(ti, {
              key: 2,
              carousel: s.message
            }, null, 8, ["carousel"])) : T("", !0),
            s.message.type === l(H).image ? (h(), ee(si, {
              key: 3,
              message: s.message
            }, null, 8, ["message"])) : T("", !0)
          ])) : T("", !0),
          s.message.author === l(w).app ? (h(), y("div", fi, [
            s.message.type === l(H).loader ? (h(), y("div", di)) : T("", !0),
            s.message.type === l(H).error ? (h(), y("div", pi, [
              gi,
              Le(" " + P(s.message.text), 1)
            ])) : T("", !0)
          ])) : T("", !0)
        ]),
        (o = s.message.footnotes) != null && o.length && l(t).preferences.messages.footNotes.display && l(t).preferences.messages.footNotes.displayOnMessageSide ? (h(), y("div", mi, [
          _t(ms, {
            footnotes: s.message.footnotes
          }, null, 8, ["footnotes"])
        ])) : T("", !0)
      ], 2)) : T("", !0);
    };
  }
}), bi = /* @__PURE__ */ _("div", { class: "tvk-shader tvk-shader-top" }, null, -1), vi = /* @__PURE__ */ _("div", { class: "tvk-shader tvk-shader-bottom" }, null, -1), Ti = /* @__PURE__ */ W({
  __name: "messages",
  setup(e) {
    const t = G(), s = x();
    function i() {
      setTimeout(() => {
        s.value.scrollTop = s.value.scrollHeight;
      }, 100);
    }
    return Ls(() => {
      i();
    }), t.$onAction(({ name: n, store: o, args: a, after: r }) => {
      n === "scrollMessages" && r(() => {
        setTimeout(() => {
          i();
        });
      });
    }), (n, o) => (h(), y("div", {
      ref_key: "messagesWrapper",
      ref: s,
      class: "tvk-messages"
    }, [
      bi,
      (h(!0), y(de, null, lt(l(t).getMessages, (a) => (h(), ee(yi, { message: a }, null, 8, ["message"]))), 256)),
      vi
    ], 512));
  }
}), ki = /* @__PURE__ */ W({
  __name: "App",
  setup(e) {
    const t = M.getOptions(), s = G();
    let i = x(o()), n = x(!0);
    function o() {
      return (Math.random() + 1).toString(36).substring(7);
    }
    return s.$onAction(({ name: a, store: r, args: u, after: f }) => {
      a === "updateApplication" && f(() => {
        i.value = o(), n.value = !1, setTimeout(() => {
          n.value = !0;
        });
      });
    }), (a, r) => l(n) ? (h(), y("div", {
      class: "tvk-wrapper",
      key: l(i)
    }, [
      l(s).getMessages.length || !l(t).preferences.messages.hideIfNoMessages ? (h(), ee(Ti, { key: 0 })) : T("", !0),
      _t(sn)
    ])) : T("", !0);
  }
});
function Si() {
  var t, s;
  const e = M.getOptions();
  if ((t = e == null ? void 0 : e.initialization) != null && t.welcomeMessage || (s = e == null ? void 0 : e.initialization) != null && s.openingMessage) {
    const i = G(), n = i.getStoredState();
    (!n || !n.messages.length) && (e.initialization.welcomeMessage && i.addMessage({
      type: H.message,
      author: w.bot,
      date: Date.now(),
      text: e.initialization.welcomeMessage
    }), e.initialization.openingMessage && i.sendUserMessage(
      e.initialization.openingMessage,
      !1
    ));
  }
}
function Ai(e, t, s) {
  const i = xs(ki);
  i.provide(is, t), M.clearInstance(), M.setOptions(s);
  const n = Hs();
  return i.use(n), i.mount(e), Si(), i;
}
function Di() {
  return JSON.parse(JSON.stringify(os));
}
function Ni() {
  return JSON.parse(JSON.stringify(M.getOptions()));
}
function Ii(e, t) {
  const s = M.getOptions(), i = e.split(".");
  let n = s;
  for (let o = 0; o < i.length; o++) {
    const a = i[o];
    if (o < i.length - 1)
      if (n[a])
        n = n[a];
      else {
        console.warn("Non existing Tock Vue Kit option passed", a, i);
        break;
      }
    else
      n[a] = t, G().updateApplication();
  }
}
export {
  Ni as getTvkCurrentOptions,
  Di as getTvkDefaultOptions,
  Ai as renderChat,
  Ii as updateTvkOption
};
