var ms = Object.defineProperty;
var ys = (e, t, s) => t in e ? ms(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var ht = (e, t, s) => (ys(e, typeof t != "symbol" ? t + "" : t, s), s);
import { effectScope as Qt, ref as B, markRaw as Gt, hasInjectionContext as bs, inject as Jt, watch as vs, reactive as Ts, isRef as we, isReactive as Yt, toRaw as ks, getCurrentScope as Ss, onScopeDispose as Es, nextTick as Cs, toRefs as As, computed as Xt, defineComponent as K, openBlock as g, createElementBlock as b, unref as l, createTextVNode as he, toDisplayString as H, normalizeClass as ye, createCommentVNode as S, normalizeStyle as fe, createElementVNode as L, withModifiers as Ds, withDirectives as Is, vModelText as Ns, Fragment as de, renderList as ct, createBlock as Z, withCtx as _s, createVNode as Zt, onMounted as Os, createApp as ws } from "vue";
var Ls = !1;
/*!
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */
let es;
const lt = (e) => es = e, ts = (
  /* istanbul ignore next */
  Symbol()
);
function yt(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var be;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(be || (be = {}));
function Rs() {
  const e = Qt(!0), t = e.run(() => B({}));
  let s = [], i = [];
  const n = Gt({
    install(a) {
      lt(n), n._a = a, a.provide(ts, n), a.config.globalProperties.$pinia = n, i.forEach((o) => s.push(o)), i = [];
    },
    use(a) {
      return !this._a && !Ls ? i.push(a) : s.push(a), this;
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
function Ht(e, t, s, i = ss) {
  e.push(t);
  const n = () => {
    const a = e.indexOf(t);
    a > -1 && (e.splice(a, 1), i());
  };
  return !s && Ss() && Es(n), n;
}
function ce(e, ...t) {
  e.slice().forEach((s) => {
    s(...t);
  });
}
const xs = (e) => e();
function bt(e, t) {
  e instanceof Map && t instanceof Map && t.forEach((s, i) => e.set(i, s)), e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const s in t) {
    if (!t.hasOwnProperty(s))
      continue;
    const i = t[s], n = e[s];
    yt(n) && yt(i) && e.hasOwnProperty(s) && !we(i) && !Yt(i) ? e[s] = bt(n, i) : e[s] = i;
  }
  return e;
}
const Ps = (
  /* istanbul ignore next */
  Symbol()
);
function Hs(e) {
  return !yt(e) || !e.hasOwnProperty(Ps);
}
const { assign: ne } = Object;
function Ms(e) {
  return !!(we(e) && e.effect);
}
function Bs(e, t, s, i) {
  const { state: n, actions: a, getters: o } = t, r = s.state.value[e];
  let u;
  function f() {
    r || (s.state.value[e] = n ? n() : {});
    const y = As(s.state.value[e]);
    return ne(y, a, Object.keys(o || {}).reduce((p, d) => (p[d] = Gt(Xt(() => {
      lt(s);
      const C = s._s.get(e);
      return o[d].call(C, C);
    })), p), {}));
  }
  return u = ns(e, f, t, s, i, !0), u;
}
function ns(e, t, s = {}, i, n, a) {
  let o;
  const r = ne({ actions: {} }, s), u = {
    deep: !0
    // flush: 'post',
  };
  let f, y, p = [], d = [], C;
  const h = i.state.value[e];
  !a && !h && (i.state.value[e] = {}), B({});
  let T;
  function v(D) {
    let k;
    f = y = !1, typeof D == "function" ? (D(i.state.value[e]), k = {
      type: be.patchFunction,
      storeId: e,
      events: C
    }) : (bt(i.state.value[e], D), k = {
      type: be.patchObject,
      payload: D,
      storeId: e,
      events: C
    });
    const $ = T = Symbol();
    Cs().then(() => {
      T === $ && (f = !0);
    }), y = !0, ce(p, k, i.state.value[e]);
  }
  const E = a ? function() {
    const { state: k } = s, $ = k ? k() : {};
    this.$patch((W) => {
      ne(W, $);
    });
  } : (
    /* istanbul ignore next */
    ss
  );
  function _() {
    o.stop(), p = [], d = [], i._s.delete(e);
  }
  function O(D, k) {
    return function() {
      lt(i);
      const $ = Array.from(arguments), W = [], te = [];
      function ge(R) {
        W.push(R);
      }
      function Ce(R) {
        te.push(R);
      }
      ce(d, {
        args: $,
        name: D,
        store: A,
        after: ge,
        onError: Ce
      });
      let J;
      try {
        J = k.apply(this && this.$id === e ? this : A, $);
      } catch (R) {
        throw ce(te, R), R;
      }
      return J instanceof Promise ? J.then((R) => (ce(W, R), R)).catch((R) => (ce(te, R), Promise.reject(R))) : (ce(W, J), J);
    };
  }
  const I = {
    _p: i,
    // _s: scope,
    $id: e,
    $onAction: Ht.bind(null, d),
    $patch: v,
    $reset: E,
    $subscribe(D, k = {}) {
      const $ = Ht(p, D, k.detached, () => W()), W = o.run(() => vs(() => i.state.value[e], (te) => {
        (k.flush === "sync" ? y : f) && D({
          storeId: e,
          type: be.direct,
          events: C
        }, te);
      }, ne({}, u, k)));
      return $;
    },
    $dispose: _
  }, A = Ts(I);
  i._s.set(e, A);
  const z = (i._a && i._a.runWithContext || xs)(() => i._e.run(() => (o = Qt()).run(t)));
  for (const D in z) {
    const k = z[D];
    if (we(k) && !Ms(k) || Yt(k))
      a || (h && Hs(k) && (we(k) ? k.value = h[D] : bt(k, h[D])), i.state.value[e][D] = k);
    else if (typeof k == "function") {
      const $ = O(D, k);
      z[D] = $, r.actions[D] = k;
    }
  }
  return ne(A, z), ne(ks(A), z), Object.defineProperty(A, "$state", {
    get: () => i.state.value[e],
    set: (D) => {
      v((k) => {
        ne(k, D);
      });
    }
  }), i._p.forEach((D) => {
    ne(A, o.run(() => D({
      store: A,
      app: i._a,
      pinia: i,
      options: r
    })));
  }), h && a && s.hydrate && s.hydrate(A.$state, h), f = !0, y = !0, A;
}
function js(e, t, s) {
  let i, n;
  const a = typeof t == "function";
  typeof e == "string" ? (i = e, n = a ? s : t) : (n = e, i = e.id);
  function o(r, u) {
    const f = bs();
    return r = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    r || (f ? Jt(ts, null) : null), r && lt(r), r = es, r._s.has(i) || (a ? ns(i, t, n, r) : Bs(i, n, r)), r._s.get(i);
  }
  return o.$id = i, o;
}
function Us() {
  const e = Date.now().toString(36), t = Math.random().toString(36).substr(2, 5);
  return (e + t).toUpperCase();
}
const is = Symbol("tockEndpointKey");
var w = /* @__PURE__ */ ((e) => (e.bot = "bot", e.user = "user", e.app = "app", e))(w || {}), P = /* @__PURE__ */ ((e) => (e.message = "message", e.card = "card", e.carousel = "carousel", e.image = "image", e.loader = "loader", e))(P || {});
function ft(e) {
  return e && typeof e == "object" && !Array.isArray(e);
}
function vt(e, ...t) {
  if (!t.length)
    return e;
  const s = t.shift();
  if (ft(e) && ft(s))
    for (const i in s)
      ft(s[i]) ? (e[i] || Object.assign(e, { [i]: {} }), vt(e[i], s[i])) : Object.assign(e, { [i]: s[i] });
  return vt(e, ...t);
}
function zs(e) {
  return !!(e && typeof e == "object" && !Array.isArray(e));
}
const as = {
  localStorage: {
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
  },
  initialization: {
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
  },
  preferences: {
    messages: {
      footNotes: {
        requireSourcesContent: {
          type: "boolean",
          default: !1,
          title: "Request textual content of sources",
          description: "For RAG answers, request the textual content of the source in addition to the source title and link."
        }
      },
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
              type: "imageDef",
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
              type: "imageDef",
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
          type: "imageDef",
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
          type: "imageDef",
          default: void 0,
          title: "Submit button image",
          description: "Image of the submit control"
        }
      }
    }
  },
  wording: {
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
          }
        }
      }
    },
    questionBar: {
      clearHistory: {
        labelBefore: {
          type: "string",
          default: "",
          title: "Clear history label (before icon)",
          description: void 0
        },
        labelAfter: {
          type: "string",
          default: "",
          title: "Clear history label (after icon)",
          description: void 0
        }
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
        labelBefore: {
          type: "string",
          default: "",
          title: "Submit button label (before icon)",
          description: void 0
        },
        labelAfter: {
          type: "string",
          default: "",
          title: "Submit button label (after icon)",
          description: void 0
        }
      }
    }
  }
};
function $s(e) {
  return "type" in e && "default" in e && "title" in e && "description" in e;
}
function os(e, t = {}) {
  if (zs(e)) {
    if ($s(e))
      return e.default;
    {
      const s = Object.entries(e);
      for (let i = 0; i < s.length; i++) {
        const [n, a] = s[i];
        t[n] = os(a);
      }
      return t;
    }
  }
}
const X = class X {
  constructor(t) {
    ht(this, "options");
    const s = os(
      as
    );
    this.options = vt(s, t);
  }
  static clearInstance() {
    X.instance && (X.instance = void 0);
  }
  static getInstance(t) {
    return X.instance || (X.instance = new X(t)), X.instance;
  }
};
ht(X, "instance");
let j = X;
const qs = "main", Mt = "main_storage", Vs = () => ({
  userId: Us(),
  messages: []
}), ee = js(qs, () => {
  const e = Jt(is), t = j.getInstance().options, s = B(n());
  function i() {
  }
  function n() {
    if (t.localStorage.enabled) {
      const h = a();
      if (h)
        return h;
    }
    return Vs();
  }
  function a() {
    if (!t.localStorage.enabled)
      return !1;
    const h = localStorage.getItem(o());
    return h ? JSON.parse(h) : !1;
  }
  function o() {
    let h = Mt;
    return t.localStorage.prefix && (h = `${Mt}_${t.localStorage.prefix}`), h;
  }
  const r = Xt(() => s.value.messages);
  function u() {
    s.value.messages = s.value.messages.filter((h) => h.type !== P.loader);
  }
  function f() {
  }
  function y(h) {
    const T = ee();
    T.clearLoaderMessages(), T.scrollMessages(), p(h), s.value.messages.push(h);
  }
  function p(h) {
    function T() {
      const E = Math.max(Math.random(), 0.3), _ = Math.max(Math.random(), 0.3), O = Math.ceil(E * 500), I = Math.ceil(_ * 500), A = Math.ceil(1), N = Math.floor(1084);
      return `https://picsum.photos/id/${Math.floor(
        Math.random() * (N - A) + A
      )}/${O}/${I}`;
    }
    h.type === P.card && (h.file.url = T()), h.type === P.carousel && h.cards.forEach((v) => {
      v.file.url = T();
    });
  }
  async function d(h, T = !0) {
    const v = ee();
    t.preferences.messages.clearOnNewRequest && (s.value.messages = []), T && v.addMessage({
      type: P.message,
      author: w.user,
      text: h,
      date: Date.now()
    }), v.addMessage({
      type: P.loader,
      author: w.app,
      date: Date.now()
    });
    const E = navigator.language, _ = {
      query: h,
      userId: s.value.userId,
      locale: E,
      sourceWithContent: t.preferences.messages.footNotes.requireSourcesContent
    }, O = await (await fetch(e, {
      method: "post",
      body: JSON.stringify(_)
    })).json();
    if (v.clearLoaderMessages(), O.responses.forEach((I) => {
      delete I.type, delete I.version, "text" in I ? v.addMessage({
        type: P.message,
        author: w.bot,
        date: Date.now(),
        ...I
      }) : "card" in I ? v.addMessage({
        type: P.card,
        author: w.bot,
        date: Date.now(),
        ...I.card
      }) : "image" in I ? v.addMessage({
        type: P.image,
        author: w.bot,
        date: Date.now(),
        ...I.image
      }) : "carousel" in I && v.addMessage({
        type: P.carousel,
        author: w.bot,
        date: Date.now(),
        ...I.carousel
      });
    }), t.localStorage.enabled) {
      let I = JSON.stringify(s.value);
      if (t.localStorage.maxNumberMessages && s.value.messages.length > t.localStorage.maxNumberMessages) {
        const A = JSON.parse(I), N = A.messages.length - parseInt(
          t.localStorage.maxNumberMessages
        );
        N && (A.messages = A.messages.slice(
          N,
          A.messages.length + 1
        )), I = JSON.stringify(A);
      }
      localStorage.setItem(o(), I);
    }
  }
  function C() {
    s.value.messages = [], t.localStorage.enabled && localStorage.setItem(o(), JSON.stringify(s.value));
  }
  return {
    state: s,
    updateApplication: i,
    getStoredState: a,
    getMessages: r,
    sendUserMessage: d,
    addMessage: y,
    clearHistory: C,
    clearLoaderMessages: u,
    scrollMessages: f
  };
}), Ws = ["src"], Ks = ["maxlength", "placeholder"], Fs = { class: "tvk-question-bar-chars-count" }, Qs = ["disabled"], Gs = ["src"], Js = /* @__PURE__ */ K({
  __name: "question-block",
  setup(e) {
    const t = j.getInstance().options, s = ee(), i = t.preferences.questionBar.maxUserInputLength, n = B(null), a = B("");
    function o() {
      n != null && n.value && n.value.focus();
    }
    function r() {
      return a.value.trim().length;
    }
    function u() {
      return r() > i;
    }
    function f() {
      r() && !u() && (s.sendUserMessage(a.value), t.preferences.questionBar.clearTypedCharsOnSubmit && (a.value = ""));
    }
    function y() {
      s.clearHistory();
    }
    return (p, d) => {
      var C;
      return g(), b("div", {
        class: "tvk-question-bar",
        onClick: o
      }, [
        (C = l(t).preferences.questionBar.clearHistory) != null && C.display ? (g(), b("button", {
          key: 0,
          class: "tvk-btn tvk-question-bar-clear-history",
          onClick: y
        }, [
          he(H(l(t).wording.questionBar.clearHistory.labelBefore) + " ", 1),
          !l(t).preferences.questionBar.clearHistory.image && l(t).preferences.questionBar.clearHistory.icon ? (g(), b("i", {
            key: 0,
            class: ye(l(t).preferences.questionBar.clearHistory.icon)
          }, null, 2)) : S("", !0),
          l(t).preferences.questionBar.clearHistory.image ? (g(), b("img", {
            key: 1,
            src: l(t).preferences.questionBar.clearHistory.image.src,
            style: fe({
              width: l(t).preferences.questionBar.clearHistory.image.width,
              height: l(t).preferences.questionBar.clearHistory.image.height
            })
          }, null, 12, Ws)) : S("", !0),
          he(" " + H(l(t).wording.questionBar.clearHistory.labelAfter), 1)
        ])) : S("", !0),
        L("form", {
          onSubmit: Ds(f, ["prevent"]),
          class: "tvk-question-bar-form"
        }, [
          Is(L("input", {
            ref_key: "input",
            ref: n,
            class: "tvk-question-bar-input",
            maxlength: l(t).preferences.questionBar.maxUserInputLength,
            placeholder: l(t).wording.questionBar.input.placeholder,
            "onUpdate:modelValue": d[0] || (d[0] = (h) => a.value = h)
          }, null, 8, Ks), [
            [Ns, a.value]
          ]),
          L("div", Fs, H(r()) + "/" + H(l(i)), 1)
        ], 32),
        L("button", {
          onClick: f,
          disabled: !a.value.trim().length || u(),
          class: "tvk-btn tvk-question-bar-btn-submit"
        }, [
          he(H(l(t).wording.questionBar.submit.labelBefore) + " ", 1),
          !l(t).preferences.questionBar.submit.image && l(t).preferences.questionBar.submit.icon ? (g(), b("i", {
            key: 0,
            class: ye(l(t).preferences.questionBar.submit.icon)
          }, null, 2)) : S("", !0),
          l(t).preferences.questionBar.submit.image ? (g(), b("img", {
            key: 1,
            src: l(t).preferences.questionBar.submit.image.src,
            style: fe({
              width: l(t).preferences.questionBar.submit.image.width,
              height: l(t).preferences.questionBar.submit.image.height
            })
          }, null, 12, Gs)) : S("", !0),
          he(" " + H(l(t).wording.questionBar.submit.labelAfter), 1)
        ], 8, Qs)
      ]);
    };
  }
}), Ys = "aaa1rp3bb0ott3vie4c1le2ogado5udhabi7c0ademy5centure6ountant0s9o1tor4d0s1ult4e0g1ro2tna4f0l1rica5g0akhan5ency5i0g1rbus3force5tel5kdn3l0ibaba4pay4lfinanz6state5y2sace3tom5m0azon4ericanexpress7family11x2fam3ica3sterdam8nalytics7droid5quan4z2o0l2partments8p0le4q0uarelle8r0ab1mco4chi3my2pa2t0e3s0da2ia2sociates9t0hleta5torney7u0ction5di0ble3o3spost5thor3o0s4vianca6w0s2x0a2z0ure5ba0by2idu3namex3narepublic11d1k2r0celona5laycard4s5efoot5gains6seball5ketball8uhaus5yern5b0c1t1va3cg1n2d1e0ats2uty4er2ntley5rlin4st0buy5t2f1g1h0arti5i0ble3d1ke2ng0o3o1z2j1lack0friday9ockbuster8g1omberg7ue3m0s1w2n0pparibas9o0ats3ehringer8fa2m1nd2o0k0ing5sch2tik2on4t1utique6x2r0adesco6idgestone9oadway5ker3ther5ussels7s1t1uild0ers6siness6y1zz3v1w1y1z0h3ca0b1fe2l0l1vinklein9m0era3p2non3petown5ital0one8r0avan4ds2e0er0s4s2sa1e1h1ino4t0ering5holic7ba1n1re3c1d1enter4o1rn3f0a1d2g1h0anel2nel4rity4se2t2eap3intai5ristmas6ome4urch5i0priani6rcle4sco3tadel4i0c2y3k1l0aims4eaning6ick2nic1que6othing5ud3ub0med6m1n1o0ach3des3ffee4llege4ogne5m0cast4mbank4unity6pany2re3uter5sec4ndos3struction8ulting7tact3ractors9oking4l1p2rsica5untry4pon0s4rses6pa2r0edit0card4union9icket5own3s1uise0s6u0isinella9v1w1x1y0mru3ou3z2dabur3d1nce3ta1e1ing3sun4y2clk3ds2e0al0er2s3gree4livery5l1oitte5ta3mocrat6ntal2ist5si0gn4v2hl2iamonds6et2gital5rect0ory7scount3ver5h2y2j1k1m1np2o0cs1tor4g1mains5t1wnload7rive4tv2ubai3nlop4pont4rban5vag2r2z2earth3t2c0o2deka3u0cation8e1g1mail3erck5nergy4gineer0ing9terprises10pson4quipment8r0icsson6ni3s0q1tate5t1u0rovision8s2vents5xchange6pert3osed4ress5traspace10fage2il1rwinds6th3mily4n0s2rm0ers5shion4t3edex3edback6rrari3ero6i0delity5o2lm2nal1nce1ial7re0stone6mdale6sh0ing5t0ness6j1k1lickr3ghts4r2orist4wers5y2m1o0o0d1tball6rd1ex2sale4um3undation8x2r0ee1senius7l1ogans4ntier7tr2ujitsu5n0d2rniture7tbol5yi3ga0l0lery3o1up4me0s3p1rden4y2b0iz3d0n2e0a1nt0ing5orge5f1g0ee3h1i0ft0s3ves2ing5l0ass3e1obal2o4m0ail3bh2o1x2n1odaddy5ld0point6f2o0dyear5g0le4p1t1v2p1q1r0ainger5phics5tis4een3ipe3ocery4up4s1t1u0ardian6cci3ge2ide2tars5ru3w1y2hair2mburg5ngout5us3bo2dfc0bank7ealth0care8lp1sinki6re1mes5iphop4samitsu7tachi5v2k0t2m1n1ockey4ldings5iday5medepot5goods5s0ense7nda3rse3spital5t0ing5t0els3mail5use3w2r1sbc3t1u0ghes5yatt3undai7ibm2cbc2e1u2d1e0ee3fm2kano4l1m0amat4db2mo0bilien9n0c1dustries8finiti5o2g1k1stitute6urance4e4t0ernational10uit4vestments10o1piranga7q1r0ish4s0maili5t0anbul7t0au2v3jaguar4va3cb2e0ep2tzt3welry6io2ll2m0p2nj2o0bs1urg4t1y2p0morgan6rs3uegos4niper7kaufen5ddi3e0rryhotels6logistics9properties14fh2g1h1i0a1ds2m1ndle4tchen5wi3m1n1oeln3matsu5sher5p0mg2n2r0d1ed3uokgroup8w1y0oto4z2la0caixa5mborghini8er3ncaster6d0rover6xess5salle5t0ino3robe5w0yer5b1c1ds2ease3clerc5frak4gal2o2xus4gbt3i0dl2fe0insurance9style7ghting6ke2lly3mited4o2ncoln4k2psy3ve1ing5k1lc1p2oan0s3cker3us3l1ndon4tte1o3ve3pl0financial11r1s1t0d0a3u0ndbeck6xe1ury5v1y2ma0drid4if1son4keup4n0agement7go3p1rket0ing3s4riott5shalls7ttel5ba2c0kinsey7d1e0d0ia3et2lbourne7me1orial6n0u2rckmsd7g1h1iami3crosoft7l1ni1t2t0subishi9k1l0b1s2m0a2n1o0bi0le4da2e1i1m1nash3ey2ster5rmon3tgage6scow4to0rcycles9v0ie4p1q1r1s0d2t0n1r2u0seum3ic4v1w1x1y1z2na0b1goya4me2tura4vy3ba2c1e0c1t0bank4flix4work5ustar5w0s2xt0direct7us4f0l2g0o2hk2i0co2ke1on3nja3ssan1y5l1o0kia3rton4w0ruz3tv4p1r0a1w2tt2u1yc2z2obi1server7ffice5kinawa6layan0group9dnavy5lo3m0ega4ne1g1l0ine5oo2pen3racle3nge4g0anic5igins6saka4tsuka4t2vh3pa0ge2nasonic7ris2s1tners4s1y3y2ccw3e0t2f0izer5g1h0armacy6d1ilips5one2to0graphy6s4ysio5ics1tet2ures6d1n0g1k2oneer5zza4k1l0ace2y0station9umbing5s3m1n0c2ohl2ker3litie5rn2st3r0america6xi3ess3ime3o0d0uctions8f1gressive8mo2perties3y5tection8u0dential9s1t1ub2w0c2y2qa1pon3uebec3st5racing4dio4e0ad1lestate6tor2y4cipes5d0stone5umbrella9hab3ise0n3t2liance6n0t0als5pair3ort3ublican8st0aurant8view0s5xroth6ich0ardli6oh3l1o1p2o0cks3deo3gers4om3s0vp3u0gby3hr2n2w0e2yukyu6sa0arland6fe0ty4kura4le1on3msclub4ung5ndvik0coromant12ofi4p1rl2s1ve2xo3b0i1s2c0a1b1haeffler7midt4olarships8ol3ule3warz5ience5ot3d1e0arch3t2cure1ity6ek2lect4ner3rvices6ven3w1x0y3fr2g1h0angrila6rp2w2ell3ia1ksha5oes2p0ping5uji3w3i0lk2na1gles5te3j1k0i0n2y0pe4l0ing4m0art3ile4n0cf3o0ccer3ial4ftbank4ware6hu2lar2utions7ng1y2y2pa0ce3ort2t3r0l2s1t0ada2ples4r1tebank4farm7c0group6ockholm6rage3e3ream4udio2y3yle4u0cks3pplies3y2ort5rf1gery5zuki5v1watch4iss4x1y0dney4stems6z2tab1ipei4lk2obao4rget4tamotors6r2too4x0i3c0i2d0k2eam2ch0nology8l1masek5nnis4va3f1g1h0d1eater2re6iaa2ckets5enda4ps2res2ol4j0maxx4x2k0maxx5l1m0all4n1o0day3kyo3ols3p1ray3shiba5tal3urs3wn2yota3s3r0ade1ing4ining5vel0ers0insurance16ust3v2t1ube2i1nes3shu4v0s2w1z2ua1bank3s2g1k1nicom3versity8o2ol2ps2s1y1z2va0cations7na1guard7c1e0gas3ntures6risign5mögensberater2ung14sicherung10t2g1i0ajes4deo3g1king4llas4n1p1rgin4sa1ion4va1o3laanderen9n1odka3lvo3te1ing3o2yage5u2wales2mart4ter4ng0gou5tch0es6eather0channel12bcam3er2site5d0ding5ibo2r3f1hoswho6ien2ki2lliamhill9n0dows4e1ners6me2olterskluwer11odside6rk0s2ld3w2s1tc1f3xbox3erox4finity6ihuan4n2xx2yz3yachts4hoo3maxun5ndex5e1odobashi7ga2kohama6u0tube6t1un3za0ppos4ra3ero3ip2m1one3uerich6w2", Xs = "ελ1υ2бг1ел3дети4ею2католик6ом3мкд2он1сква6онлайн5рг3рус2ф2сайт3рб3укр3қаз3հայ3ישראל5קום3ابوظبي5رامكو5لاردن4بحرين5جزائر5سعودية6عليان5مغرب5مارات5یران5بارت2زار4يتك3ھارت5تونس4سودان3رية5شبكة4عراق2ب2مان4فلسطين6قطر3كاثوليك6وم3مصر2ليسيا5وريتانيا7قع4همراه5پاکستان7ڀارت4कॉम3नेट3भारत0म्3ोत5संगठन5বাংলা5ভারত2ৰত4ਭਾਰਤ4ભારત4ଭାରତ4இந்தியா6லங்கை6சிங்கப்பூர்11భారత్5ಭಾರತ4ഭാരതം5ලංකා4คอม3ไทย3ລາວ3გე2みんな3アマゾン4クラウド4グーグル4コム2ストア3セール3ファッション6ポイント4世界2中信1国1國1文网3亚马逊3企业2佛山2信息2健康2八卦2公司1益2台湾1灣2商城1店1标2嘉里0大酒店5在线2大拿2天主教3娱乐2家電2广东2微博2慈善2我爱你3手机2招聘2政务1府2新加坡2闻2时尚2書籍2机构2淡马锡3游戏2澳門2点看2移动2组织机构4网址1店1站1络2联通2谷歌2购物2通販2集团2電訊盈科4飞利浦3食品2餐厅2香格里拉3港2닷넷1컴2삼성2한국2", pe = (e, t) => {
  for (const s in t)
    e[s] = t[s];
  return e;
}, Tt = "numeric", kt = "ascii", St = "alpha", _e = "asciinumeric", Ae = "alphanumeric", Et = "domain", rs = "emoji", Zs = "scheme", en = "slashscheme", Bt = "whitespace";
function tn(e, t) {
  return e in t || (t[e] = []), t[e];
}
function oe(e, t, s) {
  t[Tt] && (t[_e] = !0, t[Ae] = !0), t[kt] && (t[_e] = !0, t[St] = !0), t[_e] && (t[Ae] = !0), t[St] && (t[Ae] = !0), t[Ae] && (t[Et] = !0), t[rs] && (t[Et] = !0);
  for (const i in t) {
    const n = tn(i, s);
    n.indexOf(e) < 0 && n.push(e);
  }
}
function sn(e, t) {
  const s = {};
  for (const i in t)
    t[i].indexOf(e) >= 0 && (s[i] = !0);
  return s;
}
function U(e) {
  e === void 0 && (e = null), this.j = {}, this.jr = [], this.jd = null, this.t = e;
}
U.groups = {};
U.prototype = {
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
      const n = t.jr[i][0], a = t.jr[i][1];
      if (a && n.test(e))
        return a;
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
    i = i || U.groups;
    let n;
    return t && t.j ? n = t : (n = new U(t), s && i && oe(t, s, i)), this.jr.push([e, n]), n;
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
    const a = e.length;
    if (!a)
      return n;
    for (let o = 0; o < a - 1; o++)
      n = n.tt(e[o]);
    return n.tt(e[a - 1], t, s, i);
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
    i = i || U.groups;
    const n = this;
    if (t && t.j)
      return n.j[e] = t, t;
    const a = t;
    let o, r = n.go(e);
    if (r ? (o = new U(), pe(o.j, r.j), o.jr.push.apply(o.jr, r.jr), o.jd = r.jd, o.t = r.t) : o = new U(), a) {
      if (i)
        if (o.t && typeof o.t == "string") {
          const u = pe(sn(o.t, i), s);
          oe(a, u, i);
        } else
          s && oe(a, s, i);
      o.t = a;
    }
    return n.j[e] = o, o;
  }
};
const m = (e, t, s, i, n) => e.ta(t, s, i, n), q = (e, t, s, i, n) => e.tr(t, s, i, n), jt = (e, t, s, i, n) => e.ts(t, s, i, n), c = (e, t, s, i, n) => e.tt(t, s, i, n), Y = "WORD", Ct = "UWORD", Se = "LOCALHOST", At = "TLD", Dt = "UTLD", Oe = "SCHEME", ue = "SLASH_SCHEME", _t = "NUM", cs = "WS", Ot = "NL", ve = "OPENBRACE", Te = "CLOSEBRACE", Le = "OPENBRACKET", Re = "CLOSEBRACKET", xe = "OPENPAREN", Pe = "CLOSEPAREN", He = "OPENANGLEBRACKET", Me = "CLOSEANGLEBRACKET", Be = "FULLWIDTHLEFTPAREN", je = "FULLWIDTHRIGHTPAREN", Ue = "LEFTCORNERBRACKET", ze = "RIGHTCORNERBRACKET", $e = "LEFTWHITECORNERBRACKET", qe = "RIGHTWHITECORNERBRACKET", Ve = "FULLWIDTHLESSTHAN", We = "FULLWIDTHGREATERTHAN", Ke = "AMPERSAND", Fe = "APOSTROPHE", Qe = "ASTERISK", ie = "AT", Ge = "BACKSLASH", Je = "BACKTICK", Ye = "CARET", ae = "COLON", wt = "COMMA", Xe = "DOLLAR", F = "DOT", Ze = "EQUALS", Lt = "EXCLAMATION", Q = "HYPHEN", et = "PERCENT", tt = "PIPE", st = "PLUS", nt = "POUND", it = "QUERY", Rt = "QUOTE", xt = "SEMI", G = "SLASH", ke = "TILDE", at = "UNDERSCORE", ls = "EMOJI", ot = "SYM";
var us = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  WORD: Y,
  UWORD: Ct,
  LOCALHOST: Se,
  TLD: At,
  UTLD: Dt,
  SCHEME: Oe,
  SLASH_SCHEME: ue,
  NUM: _t,
  WS: cs,
  NL: Ot,
  OPENBRACE: ve,
  CLOSEBRACE: Te,
  OPENBRACKET: Le,
  CLOSEBRACKET: Re,
  OPENPAREN: xe,
  CLOSEPAREN: Pe,
  OPENANGLEBRACKET: He,
  CLOSEANGLEBRACKET: Me,
  FULLWIDTHLEFTPAREN: Be,
  FULLWIDTHRIGHTPAREN: je,
  LEFTCORNERBRACKET: Ue,
  RIGHTCORNERBRACKET: ze,
  LEFTWHITECORNERBRACKET: $e,
  RIGHTWHITECORNERBRACKET: qe,
  FULLWIDTHLESSTHAN: Ve,
  FULLWIDTHGREATERTHAN: We,
  AMPERSAND: Ke,
  APOSTROPHE: Fe,
  ASTERISK: Qe,
  AT: ie,
  BACKSLASH: Ge,
  BACKTICK: Je,
  CARET: Ye,
  COLON: ae,
  COMMA: wt,
  DOLLAR: Xe,
  DOT: F,
  EQUALS: Ze,
  EXCLAMATION: Lt,
  HYPHEN: Q,
  PERCENT: et,
  PIPE: tt,
  PLUS: st,
  POUND: nt,
  QUERY: it,
  QUOTE: Rt,
  SEMI: xt,
  SLASH: G,
  TILDE: ke,
  UNDERSCORE: at,
  EMOJI: ls,
  SYM: ot
});
const le = /[a-z]/, dt = new RegExp("\\p{L}", "u"), pt = new RegExp("\\p{Emoji}", "u"), gt = /\d/, Ut = /\s/, zt = `
`, nn = "️", an = "‍";
let De = null, Ie = null;
function on(e) {
  e === void 0 && (e = []);
  const t = {};
  U.groups = t;
  const s = new U();
  De == null && (De = $t(Ys)), Ie == null && (Ie = $t(Xs)), c(s, "'", Fe), c(s, "{", ve), c(s, "}", Te), c(s, "[", Le), c(s, "]", Re), c(s, "(", xe), c(s, ")", Pe), c(s, "<", He), c(s, ">", Me), c(s, "（", Be), c(s, "）", je), c(s, "「", Ue), c(s, "」", ze), c(s, "『", $e), c(s, "』", qe), c(s, "＜", Ve), c(s, "＞", We), c(s, "&", Ke), c(s, "*", Qe), c(s, "@", ie), c(s, "`", Je), c(s, "^", Ye), c(s, ":", ae), c(s, ",", wt), c(s, "$", Xe), c(s, ".", F), c(s, "=", Ze), c(s, "!", Lt), c(s, "-", Q), c(s, "%", et), c(s, "|", tt), c(s, "+", st), c(s, "#", nt), c(s, "?", it), c(s, '"', Rt), c(s, "/", G), c(s, ";", xt), c(s, "~", ke), c(s, "_", at), c(s, "\\", Ge);
  const i = q(s, gt, _t, {
    [Tt]: !0
  });
  q(i, gt, i);
  const n = q(s, le, Y, {
    [kt]: !0
  });
  q(n, le, n);
  const a = q(s, dt, Ct, {
    [St]: !0
  });
  q(a, le), q(a, dt, a);
  const o = q(s, Ut, cs, {
    [Bt]: !0
  });
  c(s, zt, Ot, {
    [Bt]: !0
  }), c(o, zt), q(o, Ut, o);
  const r = q(s, pt, ls, {
    [rs]: !0
  });
  q(r, pt, r), c(r, nn, r);
  const u = c(r, an);
  q(u, pt, r);
  const f = [[le, n]], y = [[le, null], [dt, a]];
  for (let p = 0; p < De.length; p++)
    se(s, De[p], At, Y, f);
  for (let p = 0; p < Ie.length; p++)
    se(s, Ie[p], Dt, Ct, y);
  oe(At, {
    tld: !0,
    ascii: !0
  }, t), oe(Dt, {
    utld: !0,
    alpha: !0
  }, t), se(s, "file", Oe, Y, f), se(s, "mailto", Oe, Y, f), se(s, "http", ue, Y, f), se(s, "https", ue, Y, f), se(s, "ftp", ue, Y, f), se(s, "ftps", ue, Y, f), oe(Oe, {
    scheme: !0,
    ascii: !0
  }, t), oe(ue, {
    slashscheme: !0,
    ascii: !0
  }, t), e = e.sort((p, d) => p[0] > d[0] ? 1 : -1);
  for (let p = 0; p < e.length; p++) {
    const d = e[p][0], h = e[p][1] ? {
      [Zs]: !0
    } : {
      [en]: !0
    };
    d.indexOf("-") >= 0 ? h[Et] = !0 : le.test(d) ? gt.test(d) ? h[_e] = !0 : h[kt] = !0 : h[Tt] = !0, jt(s, d, d, h);
  }
  return jt(s, "localhost", Se, {
    ascii: !0
  }), s.jd = new U(ot), {
    start: s,
    tokens: pe({
      groups: t
    }, us)
  };
}
function rn(e, t) {
  const s = cn(t.replace(/[A-Z]/g, (r) => r.toLowerCase())), i = s.length, n = [];
  let a = 0, o = 0;
  for (; o < i; ) {
    let r = e, u = null, f = 0, y = null, p = -1, d = -1;
    for (; o < i && (u = r.go(s[o])); )
      r = u, r.accepts() ? (p = 0, d = 0, y = r) : p >= 0 && (p += s[o].length, d++), f += s[o].length, a += s[o].length, o++;
    a -= p, o -= d, f -= p, n.push({
      t: y.t,
      // token type/name
      v: t.slice(a - f, a),
      // string value
      s: a - f,
      // start index
      e: a
      // end index (excluding)
    });
  }
  return n;
}
function cn(e) {
  const t = [], s = e.length;
  let i = 0;
  for (; i < s; ) {
    let n = e.charCodeAt(i), a, o = n < 55296 || n > 56319 || i + 1 === s || (a = e.charCodeAt(i + 1)) < 56320 || a > 57343 ? e[i] : e.slice(i, i + 2);
    t.push(o), i += o.length;
  }
  return t;
}
function se(e, t, s, i, n) {
  let a;
  const o = t.length;
  for (let r = 0; r < o - 1; r++) {
    const u = t[r];
    e.j[u] ? a = e.j[u] : (a = new U(i), a.jr = n.slice(), e.j[u] = a), e = a;
  }
  return a = new U(s), a.jr = n.slice(), e.j[t[o - 1]] = a, a;
}
function $t(e) {
  const t = [], s = [];
  let i = 0, n = "0123456789";
  for (; i < e.length; ) {
    let a = 0;
    for (; n.indexOf(e[i + a]) >= 0; )
      a++;
    if (a > 0) {
      t.push(s.join(""));
      for (let o = parseInt(e.substring(i, i + a), 10); o > 0; o--)
        s.pop();
      i += a;
    } else
      s.push(e[i]), i++;
  }
  return t;
}
const Ee = {
  defaultProtocol: "http",
  events: null,
  format: qt,
  formatHref: qt,
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
  let s = pe({}, Ee);
  e && (s = pe(s, e instanceof Pt ? e.o : e));
  const i = s.ignoreTags, n = [];
  for (let a = 0; a < i.length; a++)
    n.push(i[a].toUpperCase());
  this.o = s, t && (this.defaultRender = t), this.ignoreTags = n;
}
Pt.prototype = {
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
function qt(e) {
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
    const t = this, s = this.toHref(e.get("defaultProtocol")), i = e.get("formatHref", s, this), n = e.get("tagName", s, t), a = this.toFormattedString(e), o = {}, r = e.get("className", s, t), u = e.get("target", s, t), f = e.get("rel", s, t), y = e.getObj("attributes", s, t), p = e.getObj("events", s, t);
    return o.href = i, r && (o.class = r), u && (o.target = u), f && (o.rel = f), y && pe(o, y), {
      tagName: n,
      attributes: o,
      content: a,
      eventListeners: p
    };
  }
};
function ut(e, t) {
  class s extends hs {
    constructor(n, a) {
      super(n, a), this.t = e;
    }
  }
  for (const i in t)
    s.prototype[i] = t[i];
  return s.t = e, s;
}
const Vt = ut("email", {
  isLink: !0,
  toHref() {
    return "mailto:" + this.toString();
  }
}), Wt = ut("text"), ln = ut("nl"), Ne = ut("url", {
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
}), V = (e) => new U(e);
function un(e) {
  let {
    groups: t
  } = e;
  const s = t.domain.concat([Ke, Qe, ie, Ge, Je, Ye, Xe, Ze, Q, _t, et, tt, st, nt, G, ot, ke, at]), i = [Fe, ae, wt, F, Lt, it, Rt, xt, He, Me, ve, Te, Re, Le, xe, Pe, Be, je, Ue, ze, $e, qe, Ve, We], n = [Ke, Fe, Qe, Ge, Je, Ye, Xe, Ze, Q, ve, Te, et, tt, st, nt, it, G, ot, ke, at], a = V(), o = c(a, ke);
  m(o, n, o), m(o, t.domain, o);
  const r = V(), u = V(), f = V();
  m(a, t.domain, r), m(a, t.scheme, u), m(a, t.slashscheme, f), m(r, n, o), m(r, t.domain, r);
  const y = c(r, ie);
  c(o, ie, y), c(u, ie, y), c(f, ie, y);
  const p = c(o, F);
  m(p, n, o), m(p, t.domain, o);
  const d = V();
  m(y, t.domain, d), m(d, t.domain, d);
  const C = c(d, F);
  m(C, t.domain, d);
  const h = V(Vt);
  m(C, t.tld, h), m(C, t.utld, h), c(y, Se, h);
  const T = c(d, Q);
  m(T, t.domain, d), m(h, t.domain, d), c(h, F, C), c(h, Q, T);
  const v = c(h, ae);
  m(v, t.numeric, Vt);
  const E = c(r, Q), _ = c(r, F);
  m(E, t.domain, r), m(_, n, o), m(_, t.domain, r);
  const O = V(Ne);
  m(_, t.tld, O), m(_, t.utld, O), m(O, t.domain, r), m(O, n, o), c(O, F, _), c(O, Q, E), c(O, ie, y);
  const I = c(O, ae), A = V(Ne);
  m(I, t.numeric, A);
  const N = V(Ne), z = V();
  m(N, s, N), m(N, i, z), m(z, s, N), m(z, i, z), c(O, G, N), c(A, G, N);
  const D = c(u, ae), k = c(f, ae), $ = c(k, G), W = c($, G);
  m(u, t.domain, r), c(u, F, _), c(u, Q, E), m(f, t.domain, r), c(f, F, _), c(f, Q, E), m(D, t.domain, N), c(D, G, N), m(W, t.domain, N), m(W, s, N), c(W, G, N);
  const te = [
    [ve, Te],
    // {}
    [Le, Re],
    // []
    [xe, Pe],
    // ()
    [He, Me],
    // <>
    [Be, je],
    // （）
    [Ue, ze],
    // 「」
    [$e, qe],
    // 『』
    [Ve, We]
    // ＜＞
  ];
  for (let ge = 0; ge < te.length; ge++) {
    const [Ce, J] = te[ge], R = c(N, Ce);
    c(z, Ce, R), c(R, J, N);
    const re = V(Ne);
    m(R, s, re);
    const me = V();
    m(R, i), m(re, s, re), m(re, i, me), m(me, s, re), m(me, i, me), c(re, J, N), c(me, J, N);
  }
  return c(a, Se, O), c(a, Ot, ln), {
    start: a,
    tokens: us
  };
}
function hn(e, t, s) {
  let i = s.length, n = 0, a = [], o = [];
  for (; n < i; ) {
    let r = e, u = null, f = null, y = 0, p = null, d = -1;
    for (; n < i && !(u = r.go(s[n].t)); )
      o.push(s[n++]);
    for (; n < i && (f = u || r.go(s[n].t)); )
      u = null, r = f, r.accepts() ? (d = 0, p = r) : d >= 0 && d++, n++, y++;
    if (d < 0)
      n -= y, n < i && (o.push(s[n]), n++);
    else {
      o.length > 0 && (a.push(mt(Wt, t, o)), o = []), n -= d, y -= d;
      const C = p.t, h = s.slice(n - y, n);
      a.push(mt(C, t, h));
    }
  }
  return o.length > 0 && a.push(mt(Wt, t, o)), a;
}
function mt(e, t, s) {
  const i = s[0].s, n = s[s.length - 1].e, a = t.slice(i, n);
  return new e(a, s);
}
const M = {
  scanner: null,
  parser: null,
  tokenQueue: [],
  pluginQueue: [],
  customSchemes: [],
  initialized: !1
};
function fn() {
  M.scanner = on(M.customSchemes);
  for (let e = 0; e < M.tokenQueue.length; e++)
    M.tokenQueue[e][1]({
      scanner: M.scanner
    });
  M.parser = un(M.scanner.tokens);
  for (let e = 0; e < M.pluginQueue.length; e++)
    M.pluginQueue[e][1]({
      scanner: M.scanner,
      parser: M.parser
    });
  M.initialized = !0;
}
function dn(e) {
  return M.initialized || fn(), hn(M.parser.start, e, rn(M.scanner.start, e));
}
var pn = {
  // We don't need the complete named character reference because linkifyHtml
  // does not modify the escape sequences. We do need &nbsp; so that
  // whitespace is parsed properly. Other types of whitespace should already
  // be accounted for. &gt; &lt; and &quot; are also frequently relevant ones
  amp: "&",
  gt: ">",
  lt: "<",
  nbsp: " ",
  quot: '"'
}, gn = /^#[xX]([A-Fa-f0-9]+)$/, mn = /^#([0-9]+)$/, yn = /^([A-Za-z0-9]+)$/, bn = (
  /** @class */
  function() {
    function e(t) {
      this.named = t;
    }
    return e.prototype.parse = function(t) {
      if (t) {
        var s = t.match(gn);
        if (s)
          return String.fromCharCode(parseInt(s[1], 16));
        if (s = t.match(mn), s)
          return String.fromCharCode(parseInt(s[1], 10));
        if (s = t.match(yn), s)
          return this.named[s[1]] || "&" + s[1] + ";";
      }
    }, e;
  }()
), vn = /[\t\n\f ]/, Tn = /[A-Za-z]/, kn = /\r\n?/g;
function x(e) {
  return vn.test(e);
}
function Kt(e) {
  return Tn.test(e);
}
function Sn(e) {
  return e.replace(kn, `
`);
}
var En = (
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
              var a = this.tagNameBuffer.toLowerCase();
              (a === "pre" || a === "textarea") && this.consume();
            }
            this.transitionTo(
              "data"
              /* data */
            ), this.delegate.beginData();
          }
        },
        data: function() {
          var n = this.peek(), a = this.tagNameBuffer;
          n === "<" && !this.isIgnoredEndTag() ? (this.delegate.finishData(), this.transitionTo(
            "tagOpen"
            /* tagOpen */
          ), this.markTagStart(), this.consume()) : n === "&" && a !== "script" && a !== "style" ? (this.consume(), this.delegate.appendToData(this.consumeCharRef() || "&")) : (this.consume(), this.delegate.appendToData(n));
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
            var a = n.toUpperCase() + this.input.substring(this.index, this.index + 6).toUpperCase();
            a === "DOCTYPE" && (this.consume(), this.consume(), this.consume(), this.consume(), this.consume(), this.consume(), this.transitionTo(
              "doctype"
              /* doctype */
            ), this.delegate.beginDoctype && this.delegate.beginDoctype());
          }
        },
        doctype: function() {
          var n = this.consume();
          x(n) && this.transitionTo(
            "beforeDoctypeName"
            /* beforeDoctypeName */
          );
        },
        beforeDoctypeName: function() {
          var n = this.consume();
          x(n) || (this.transitionTo(
            "doctypeName"
            /* doctypeName */
          ), this.delegate.appendToDoctypeName && this.delegate.appendToDoctypeName(n.toLowerCase()));
        },
        doctypeName: function() {
          var n = this.consume();
          x(n) ? this.transitionTo(
            "afterDoctypeName"
            /* afterDoctypeName */
          ) : n === ">" ? (this.delegate.endDoctype && this.delegate.endDoctype(), this.transitionTo(
            "beforeData"
            /* beforeData */
          )) : this.delegate.appendToDoctypeName && this.delegate.appendToDoctypeName(n.toLowerCase());
        },
        afterDoctypeName: function() {
          var n = this.consume();
          if (!x(n))
            if (n === ">")
              this.delegate.endDoctype && this.delegate.endDoctype(), this.transitionTo(
                "beforeData"
                /* beforeData */
              );
            else {
              var a = n.toUpperCase() + this.input.substring(this.index, this.index + 5).toUpperCase(), o = a.toUpperCase() === "PUBLIC", r = a.toUpperCase() === "SYSTEM";
              (o || r) && (this.consume(), this.consume(), this.consume(), this.consume(), this.consume(), this.consume()), o ? this.transitionTo(
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
          x(n) ? (this.transitionTo(
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
          x(n) ? this.transitionTo(
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
          x(n) || (n === ">" ? (this.delegate.endDoctype && this.delegate.endDoctype(), this.transitionTo(
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
          x(n) || n === ">" && (this.delegate.endDoctype && this.delegate.endDoctype(), this.transitionTo(
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
          x(n) ? this.transitionTo(
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
          x(n) ? (this.transitionTo(
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
          if (x(n)) {
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
          x(n) ? (this.transitionTo(
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
          if (x(n)) {
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
          x(n) ? this.consume() : n === '"' ? (this.transitionTo(
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
          x(n) ? (this.delegate.finishAttributeValue(), this.consume(), this.transitionTo(
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
          x(n) ? (this.consume(), this.transitionTo(
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
      for (this.input += Sn(t); this.index < this.input.length; ) {
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
), Cn = (
  /** @class */
  function() {
    function e(t, s) {
      s === void 0 && (s = {}), this.options = s, this.token = null, this.startLine = 1, this.startColumn = 0, this.tokens = [], this.tokenizer = new En(this, t, s.mode), this._currentAttribute = void 0;
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
function An(e, t) {
  var s = new Cn(new bn(pn), t);
  return s.tokenize(e);
}
const fs = "LinkifyResult", rt = "StartTag", ds = "EndTag", It = "Chars", Dn = "Comment", In = "Doctype";
function Nn(e, t) {
  t === void 0 && (t = {});
  const s = An(e), i = [], n = [], a = new Pt(t, wn);
  for (let o = 0; o < s.length; o++) {
    const r = s[o];
    if (r.type === rt) {
      i.push(r);
      const u = r.tagName.toUpperCase();
      if (!(u === "A" || a.ignoreTags.indexOf(u) >= 0))
        continue;
      let y = i.length;
      On(u, s, ++o, i), o += i.length - y - 1;
    } else if (r.type !== It)
      i.push(r);
    else {
      const u = _n(r.chars, a);
      i.push.apply(i, u);
    }
  }
  for (let o = 0; o < i.length; o++) {
    const r = i[o];
    switch (r.type) {
      case fs:
        n.push(r.rendered);
        break;
      case rt: {
        let u = "<" + r.tagName;
        r.attributes.length > 0 && (u += " " + Rn(r.attributes).join(" ")), r.selfClosing && (u += " /"), u += ">", n.push(u);
        break;
      }
      case ds:
        n.push(`</${r.tagName}>`);
        break;
      case It:
        n.push(Nt(r.chars));
        break;
      case Dn:
        n.push(`<!--${Nt(r.chars)}-->`);
        break;
      case In: {
        let u = `<!DOCTYPE ${r.name}`;
        r.publicIdentifier && (u += ` PUBLIC "${r.publicIdentifier}"`), r.systemIdentifier && (u += ` "${r.systemIdentifier}"`), u += ">", n.push(u);
        break;
      }
    }
  }
  return n.join("");
}
function _n(e, t) {
  const s = dn(e), i = [];
  for (let n = 0; n < s.length; n++) {
    const a = s[n];
    a.t === "nl" && t.get("nl2br") ? i.push({
      type: rt,
      tagName: "br",
      attributes: [],
      selfClosing: !0
    }) : !a.isLink || !t.check(a) ? i.push({
      type: It,
      chars: a.toString()
    }) : i.push({
      type: fs,
      rendered: t.render(a)
    });
  }
  return i;
}
function On(e, t, s, i) {
  let n = 1;
  for (; s < t.length && n > 0; ) {
    let a = t[s];
    a.type === rt && a.tagName.toUpperCase() === e ? n++ : a.type === ds && a.tagName.toUpperCase() === e && n--, i.push(a), s++;
  }
  return i;
}
function wn(e) {
  let {
    tagName: t,
    attributes: s,
    content: i
  } = e;
  return `<${t} ${Ln(s)}>${Nt(i)}</${t}>`;
}
function Nt(e) {
  return e.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function ps(e) {
  return e.replace(/"/g, "&quot;");
}
function Ln(e) {
  const t = [];
  for (const s in e) {
    const i = e[s] + "";
    t.push(`${s}="${ps(i)}"`);
  }
  return t.join(" ");
}
function Rn(e) {
  const t = [];
  for (let s = 0; s < e.length; s++) {
    const i = e[s][0], n = e[s][1] + "";
    t.push(`${i}="${ps(n)}"`);
  }
  return t;
}
const xn = /* @__PURE__ */ K({
  __name: "button",
  props: {
    button: {
      type: Object
    }
  },
  setup(e) {
    const t = ee(), s = e;
    function i() {
      t.sendUserMessage(s.button.title);
    }
    return (n, a) => (g(), b("button", {
      class: "tvk-btn tvk-btn-action",
      onClick: i
    }, H(s.button.title), 1));
  }
}), Pn = { class: "tvk-message-footnote" }, Hn = ["href"], Mn = /* @__PURE__ */ K({
  __name: "footnote",
  props: {
    footnote: {
      type: Object
    }
  },
  setup(e) {
    const t = e;
    return (s, i) => (g(), b("div", Pn, [
      L("a", {
        href: t.footnote.url,
        target: "_blank"
      }, H(t.footnote.title), 9, Hn),
      L("div", null, H(t.footnote.content), 1)
    ]));
  }
}), Bn = { class: "tvk-message-footnotes" }, jn = /* @__PURE__ */ K({
  __name: "footnotes",
  props: {
    footnotes: {
      type: Object
    }
  },
  setup(e) {
    const t = j.getInstance().options, s = e;
    return (i, n) => (g(), b("div", Bn, [
      he(H(l(t).wording.messages.message.footnotes.sources) + " ", 1),
      (g(!0), b(de, null, ct(s.footnotes, (a) => (g(), Z(Mn, { footnote: a }, null, 8, ["footnote"]))), 256))
    ]));
  }
}), Un = ["innerHTML"], zn = /* @__PURE__ */ K({
  __name: "message-text",
  props: {
    message: {
      type: Object
    }
  },
  setup(e) {
    j.getInstance().options;
    const t = e;
    function s() {
      return Nn(t.message.text, { target: "_blank" });
    }
    return (i, n) => {
      var a;
      return g(), b(de, null, [
        L("div", {
          innerHTML: s()
        }, null, 8, Un),
        (a = t.message.footnotes) != null && a.length ? (g(), Z(jn, {
          key: 0,
          footnotes: t.message.footnotes
        }, null, 8, ["footnotes"])) : S("", !0),
        (g(!0), b(de, null, ct(t.message.buttons, (o) => (g(), Z(xn, { button: o }, {
          default: _s(() => [
            he(H(o.title), 1)
          ]),
          _: 2
        }, 1032, ["button"]))), 256))
      ], 64);
    };
  }
}), $n = { class: "tvk-card" }, qn = ["src", "alt"], Vn = { key: 1 }, Wn = { key: 2 }, Kn = { key: 3 }, gs = /* @__PURE__ */ K({
  __name: "message-card",
  props: {
    card: {
      type: Object
    }
  },
  setup(e) {
    var a, o, r;
    const t = ee();
    j.getInstance().options;
    const s = e, i = ((o = (a = s.card) == null ? void 0 : a.file) == null ? void 0 : o.description) ?? ((r = s.card) == null ? void 0 : r.title);
    function n(u) {
      s.card.file._loaded || (s.card.file._loaded = !0, t.scrollMessages());
    }
    return (u, f) => {
      var y, p, d, C, h, T, v, E, _, O, I, A;
      return g(), b("div", $n, [
        (p = (y = s.card) == null ? void 0 : y.file) != null && p.url ? (g(), b("img", {
          key: 0,
          src: (C = (d = s.card) == null ? void 0 : d.file) == null ? void 0 : C.url,
          alt: l(i),
          onLoad: n,
          class: "tvk-thumbnail"
        }, null, 40, qn)) : S("", !0),
        (h = s.card) != null && h.title ? (g(), b("div", Vn, [
          L("strong", null, H((T = s.card) == null ? void 0 : T.title), 1)
        ])) : S("", !0),
        (v = s.card) != null && v.subTitle ? (g(), b("div", Wn, H((E = s.card) == null ? void 0 : E.subTitle), 1)) : S("", !0),
        (O = (_ = s.card) == null ? void 0 : _.file) != null && O.description ? (g(), b("div", Kn, H((A = (I = s.card) == null ? void 0 : I.file) == null ? void 0 : A.description), 1)) : S("", !0)
      ]);
    };
  }
}), Ft = "transform 0.2s", Fn = /* @__PURE__ */ K({
  __name: "message-carousel",
  props: {
    carousel: {
      type: Object
    }
  },
  setup(e) {
    const s = B(e.carousel.cards), i = B([]), n = B(null), a = B(null), o = B({}), r = B({}), u = B(!1);
    function f() {
      var v;
      const T = (v = n.value) == null ? void 0 : v.offsetWidth;
      o.value = {
        overflow: "hidden",
        "max-width": `${T}px`
      };
    }
    function y() {
      return i.value.reduce((T, v) => T + v.offsetWidth, 0);
    }
    function p() {
      if (u.value)
        return;
      u.value = !0, f();
      const T = y(), v = s.value[0];
      s.value.push(v);
      const E = i.value[0];
      r.value = {
        transition: Ft,
        transform: `translateX(-${E.offsetWidth}px)`,
        width: `${T + E.offsetWidth + 1}px`
      }, C(() => {
        s.value.shift(), h(), u.value = !1;
      });
    }
    function d() {
      if (u.value)
        return;
      u.value = !0, f();
      const T = y(), v = s.value[s.value.length - 1];
      s.value.unshift(v);
      const E = i.value[i.value.length - 1];
      r.value = {
        transition: "none",
        transform: `translateX(-${E.offsetWidth}px)`,
        width: `${T + E.offsetWidth + 1}px`
      }, setTimeout(() => {
        r.value = {
          transition: Ft,
          transform: "translateX(0)",
          width: `${T + E.offsetWidth + 1}px`
        }, C(() => {
          s.value.pop(), h(), u.value = !1;
        });
      });
    }
    function C(T) {
      var E;
      const v = () => {
        var _;
        T(), (_ = a.value) == null || _.removeEventListener("transitionend", v);
      };
      (E = a.value) == null || E.addEventListener("transitionend", v);
    }
    function h() {
      o.value = {}, r.value = {
        transition: "none",
        transform: "translateX(0)"
      };
    }
    return (T, v) => (g(), b(de, null, [
      L("div", {
        class: "tvk-carousel",
        ref_key: "carouselRef",
        ref: n,
        style: fe(o.value)
      }, [
        L("div", {
          class: "tvk-carousel-inner",
          ref_key: "innerRef",
          ref: a,
          style: fe(r.value)
        }, [
          (g(!0), b(de, null, ct(s.value, (E) => (g(), b("div", {
            class: "tvk-carousel-card",
            key: JSON.stringify(E),
            ref_for: !0,
            ref_key: "cardsRefs",
            ref: i
          }, [
            Zt(gs, { card: E }, null, 8, ["card"])
          ]))), 128))
        ], 4)
      ], 4),
      L("div", { class: "tvk-carousel-controls" }, [
        L("button", {
          class: "tvk-btn",
          onClick: d
        }, " prev "),
        L("button", {
          class: "tvk-btn",
          onClick: p
        }, " next ")
      ])
    ], 64));
  }
}), Qn = /* @__PURE__ */ K({
  __name: "message-image",
  props: { message: Object },
  setup(e) {
    return j.getInstance().options, (t, s) => "Image type not yet implemented";
  }
}), Gn = {
  key: 0,
  class: "tvk-message-header"
}, Jn = {
  key: 0,
  class: "tvk-message-header-avatar"
}, Yn = ["src"], Xn = ["src"], Zn = {
  key: 1,
  class: "tvk-message-header-label"
}, ei = { class: "tvk-message-header-label-user" }, ti = { class: "tvk-message-header-label-bot" }, si = /* @__PURE__ */ L("div", { class: "tvk-message-header-line-break" }, null, -1), ni = {
  key: 1,
  class: "tvk-message-body"
}, ii = {
  key: 2,
  class: "tvk-message-body-from-app"
}, ai = {
  key: 0,
  class: "tvk-message-loader"
}, oi = /* @__PURE__ */ K({
  __name: "message",
  props: {
    message: {
      type: Object
    }
  },
  setup(e) {
    const t = j.getInstance().options, s = e;
    return (i, n) => s.message.author !== l(w).user || !l(t).preferences.messages.message.hideUserMessages ? (g(), b("div", {
      key: 0,
      class: ye(["tvk-message", {
        "tvk-message-user": s.message.author === l(w).user,
        "tvk-message-bot": s.message.author === l(w).bot
      }])
    }, [
      l(t).preferences.messages.message.header.display && s.message.author !== l(w).app ? (g(), b("div", Gn, [
        l(t).preferences.messages.message.header.avatar.display ? (g(), b("div", Jn, [
          !l(t).preferences.messages.message.header.avatar.userImage && l(t).preferences.messages.message.header.avatar.userIcon && s.message.author === l(w).user ? (g(), b("i", {
            key: 0,
            class: ye([
              "tvk-message-header-avatar-user",
              l(t).preferences.messages.message.header.avatar.userIcon
            ])
          }, null, 2)) : S("", !0),
          l(t).preferences.messages.message.header.avatar.userImage && s.message.author === l(w).user ? (g(), b("img", {
            key: 1,
            src: l(t).preferences.messages.message.header.avatar.userImage.src,
            style: fe({
              width: l(t).preferences.messages.message.header.avatar.userImage.width,
              height: l(t).preferences.messages.message.header.avatar.userImage.height
            })
          }, null, 12, Yn)) : S("", !0),
          !l(t).preferences.messages.message.header.avatar.botImage && l(t).preferences.messages.message.header.avatar.botIcon && s.message.author === l(w).bot ? (g(), b("i", {
            key: 2,
            class: ye(["tvk-message-header-avatar-bot", l(t).preferences.messages.message.header.avatar.botIcon])
          }, null, 2)) : S("", !0),
          l(t).preferences.messages.message.header.avatar.botImage && s.message.author === l(w).bot ? (g(), b("img", {
            key: 3,
            src: l(t).preferences.messages.message.header.avatar.botImage.src,
            style: fe({
              width: l(t).preferences.messages.message.header.avatar.botImage.width,
              height: l(t).preferences.messages.message.header.avatar.botImage.height
            })
          }, null, 12, Xn)) : S("", !0)
        ])) : S("", !0),
        l(t).preferences.messages.message.header.label.display ? (g(), b("div", Zn, [
          L("span", ei, H(l(t).wording.messages.message.header.labelUser), 1),
          L("span", ti, H(l(t).wording.messages.message.header.labelBot), 1)
        ])) : S("", !0)
      ])) : S("", !0),
      si,
      s.message.author !== l(w).app ? (g(), b("div", ni, [
        s.message.type === l(P).message ? (g(), Z(zn, {
          key: 0,
          message: s.message
        }, null, 8, ["message"])) : S("", !0),
        s.message.type === l(P).card ? (g(), Z(gs, {
          key: 1,
          card: s.message
        }, null, 8, ["card"])) : S("", !0),
        s.message.type === l(P).carousel ? (g(), Z(Fn, {
          key: 2,
          carousel: s.message
        }, null, 8, ["carousel"])) : S("", !0),
        s.message.type === l(P).image ? (g(), Z(Qn, {
          key: 3,
          message: s.message
        }, null, 8, ["message"])) : S("", !0)
      ])) : S("", !0),
      s.message.author === l(w).app ? (g(), b("div", ii, [
        s.message.type === l(P).loader ? (g(), b("div", ai)) : S("", !0)
      ])) : S("", !0)
    ], 2)) : S("", !0);
  }
}), ri = /* @__PURE__ */ L("div", { class: "tvk-shader tvk-shader-top" }, null, -1), ci = /* @__PURE__ */ L("div", { class: "tvk-shader tvk-shader-bottom" }, null, -1), li = /* @__PURE__ */ K({
  __name: "messages",
  setup(e) {
    const t = ee(), s = B();
    function i() {
      setTimeout(() => {
        s.value.scrollTop = s.value.scrollHeight;
      }, 100);
    }
    return Os(() => {
      i();
    }), t.$onAction(({ name: n, store: a, args: o, after: r }) => {
      n === "scrollMessages" && r(() => {
        setTimeout(() => {
          i();
        });
      });
    }), (n, a) => (g(), b("div", {
      ref_key: "messagesWrapper",
      ref: s,
      class: "tvk-messages"
    }, [
      ri,
      (g(!0), b(de, null, ct(l(t).getMessages, (o) => (g(), Z(oi, { message: o }, null, 8, ["message"]))), 256)),
      ci
    ], 512));
  }
}), ui = /* @__PURE__ */ K({
  __name: "App",
  setup(e) {
    const t = j.getInstance().options, s = ee();
    let i = B(a()), n = B(!0);
    function a() {
      return (Math.random() + 1).toString(36).substring(7);
    }
    return s.$onAction(({ name: o, store: r, args: u, after: f }) => {
      o === "updateApplication" && f(() => {
        i.value = a(), n.value = !1, setTimeout(() => {
          n.value = !0;
        });
      });
    }), (o, r) => l(n) ? (g(), b("main", {
      class: "tvk-wrapper",
      key: l(i)
    }, [
      l(s).getMessages.length || !l(t).preferences.messages.hideIfNoMessages ? (g(), Z(li, { key: 0 })) : S("", !0),
      Zt(Js)
    ])) : S("", !0);
  }
});
function hi() {
  var t, s;
  const e = j.getInstance().options;
  if ((t = e == null ? void 0 : e.initialization) != null && t.welcomeMessage || (s = e == null ? void 0 : e.initialization) != null && s.openingMessage) {
    const i = ee(), n = i.getStoredState();
    (!n || !n.messages.length) && (e.initialization.welcomeMessage && i.addMessage({
      type: P.message,
      author: w.bot,
      date: Date.now(),
      text: e.initialization.welcomeMessage
    }), e.initialization.openingMessage && i.sendUserMessage(
      e.initialization.openingMessage,
      !1
    ));
  }
}
function pi(e, t, s) {
  const i = ws(ui);
  i.provide(is, t), j.clearInstance(), j.getInstance(s);
  const n = Rs();
  return i.use(n), i.mount(e), hi(), i;
}
function gi() {
  return JSON.parse(JSON.stringify(as));
}
function mi() {
  return JSON.parse(JSON.stringify(j.getInstance().options));
}
function yi(e, t) {
  const s = j.getInstance().options, i = e.split(".");
  let n = s;
  for (let a = 0; a < i.length; a++) {
    const o = i[a];
    if (a < i.length - 1)
      if (n[o])
        n = n[o];
      else {
        console.warn("Non existing Tock Vue Kit option passed", o, i);
        break;
      }
    else
      n[o] = t, ee().updateApplication();
  }
}
export {
  mi as getTvkCurrentOptions,
  gi as getTvkDefaultOptions,
  pi as renderChat,
  yi as updateTvkOption
};
