var ps = Object.defineProperty;
var ms = (e, t, s) => t in e ? ps(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var ht = (e, t, s) => (ms(e, typeof t != "symbol" ? t + "" : t, s), s);
import { effectScope as Qt, ref as j, markRaw as Jt, hasInjectionContext as bs, inject as Gt, watch as ys, reactive as Ts, isRef as Oe, isReactive as Yt, toRaw as vs, getCurrentScope as ks, onScopeDispose as Ss, nextTick as Es, toRefs as Cs, computed as Xt, defineComponent as F, openBlock as p, createElementBlock as T, unref as l, createTextVNode as he, toDisplayString as M, normalizeClass as be, createCommentVNode as C, normalizeStyle as fe, createElementVNode as x, withModifiers as As, withDirectives as Ds, vModelText as Is, Fragment as de, renderList as ct, createBlock as Z, withCtx as Ns, createVNode as Zt, onMounted as _s, createApp as Ls } from "vue";
var Os = !1;
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
function bt(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var ye;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(ye || (ye = {}));
function Rs() {
  const e = Qt(!0), t = e.run(() => j({}));
  let s = [], i = [];
  const n = Jt({
    install(a) {
      lt(n), n._a = a, a.provide(ts, n), a.config.globalProperties.$pinia = n, i.forEach((o) => s.push(o)), i = [];
    },
    use(a) {
      return !this._a && !Os ? i.push(a) : s.push(a), this;
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
  return !s && ks() && Ss(n), n;
}
function ce(e, ...t) {
  e.slice().forEach((s) => {
    s(...t);
  });
}
const ws = (e) => e();
function yt(e, t) {
  e instanceof Map && t instanceof Map && t.forEach((s, i) => e.set(i, s)), e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const s in t) {
    if (!t.hasOwnProperty(s))
      continue;
    const i = t[s], n = e[s];
    bt(n) && bt(i) && e.hasOwnProperty(s) && !Oe(i) && !Yt(i) ? e[s] = yt(n, i) : e[s] = i;
  }
  return e;
}
const xs = (
  /* istanbul ignore next */
  Symbol()
);
function Ps(e) {
  return !bt(e) || !e.hasOwnProperty(xs);
}
const { assign: se } = Object;
function Hs(e) {
  return !!(Oe(e) && e.effect);
}
function Ms(e, t, s, i) {
  const { state: n, actions: a, getters: o } = t, r = s.state.value[e];
  let u;
  function f() {
    r || (s.state.value[e] = n ? n() : {});
    const b = Cs(s.state.value[e]);
    return se(b, a, Object.keys(o || {}).reduce((g, d) => (g[d] = Jt(Xt(() => {
      lt(s);
      const h = s._s.get(e);
      return o[d].call(h, h);
    })), g), {}));
  }
  return u = ns(e, f, t, s, i, !0), u;
}
function ns(e, t, s = {}, i, n, a) {
  let o;
  const r = se({ actions: {} }, s), u = {
    deep: !0
    // flush: 'post',
  };
  let f, b, g = [], d = [], h;
  const y = i.state.value[e];
  !a && !y && (i.state.value[e] = {}), j({});
  let k;
  function D(A) {
    let S;
    f = b = !1, typeof A == "function" ? (A(i.state.value[e]), S = {
      type: ye.patchFunction,
      storeId: e,
      events: h
    }) : (yt(i.state.value[e], A), S = {
      type: ye.patchObject,
      payload: A,
      storeId: e,
      events: h
    });
    const z = k = Symbol();
    Es().then(() => {
      k === z && (f = !0);
    }), b = !0, ce(g, S, i.state.value[e]);
  }
  const E = a ? function() {
    const { state: S } = s, z = S ? S() : {};
    this.$patch((W) => {
      se(W, z);
    });
  } : (
    /* istanbul ignore next */
    ss
  );
  function N() {
    o.stop(), g = [], d = [], i._s.delete(e);
  }
  function v(A, S) {
    return function() {
      lt(i);
      const z = Array.from(arguments), W = [], ee = [];
      function pe(O) {
        W.push(O);
      }
      function Ce(O) {
        ee.push(O);
      }
      ce(d, {
        args: z,
        name: A,
        store: I,
        after: pe,
        onError: Ce
      });
      let G;
      try {
        G = S.apply(this && this.$id === e ? this : I, z);
      } catch (O) {
        throw ce(ee, O), O;
      }
      return G instanceof Promise ? G.then((O) => (ce(W, O), O)).catch((O) => (ce(ee, O), Promise.reject(O))) : (ce(W, G), G);
    };
  }
  const P = {
    _p: i,
    // _s: scope,
    $id: e,
    $onAction: Ht.bind(null, d),
    $patch: D,
    $reset: E,
    $subscribe(A, S = {}) {
      const z = Ht(g, A, S.detached, () => W()), W = o.run(() => ys(() => i.state.value[e], (ee) => {
        (S.flush === "sync" ? b : f) && A({
          storeId: e,
          type: ye.direct,
          events: h
        }, ee);
      }, se({}, u, S)));
      return z;
    },
    $dispose: N
  }, I = Ts(P);
  i._s.set(e, I);
  const V = (i._a && i._a.runWithContext || ws)(() => i._e.run(() => (o = Qt()).run(t)));
  for (const A in V) {
    const S = V[A];
    if (Oe(S) && !Hs(S) || Yt(S))
      a || (y && Ps(S) && (Oe(S) ? S.value = y[A] : yt(S, y[A])), i.state.value[e][A] = S);
    else if (typeof S == "function") {
      const z = v(A, S);
      V[A] = z, r.actions[A] = S;
    }
  }
  return se(I, V), se(vs(I), V), Object.defineProperty(I, "$state", {
    get: () => i.state.value[e],
    set: (A) => {
      D((S) => {
        se(S, A);
      });
    }
  }), i._p.forEach((A) => {
    se(I, o.run(() => A({
      store: I,
      app: i._a,
      pinia: i,
      options: r
    })));
  }), y && a && s.hydrate && s.hydrate(I.$state, y), f = !0, b = !0, I;
}
function Bs(e, t, s) {
  let i, n;
  const a = typeof t == "function";
  typeof e == "string" ? (i = e, n = a ? s : t) : (n = e, i = e.id);
  function o(r, u) {
    const f = bs();
    return r = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    r || (f ? Gt(ts, null) : null), r && lt(r), r = es, r._s.has(i) || (a ? ns(i, t, n, r) : Ms(i, n, r)), r._s.get(i);
  }
  return o.$id = i, o;
}
function js() {
  const e = Date.now().toString(36), t = Math.random().toString(36).substr(2, 5);
  return (e + t).toUpperCase();
}
const is = Symbol("tockEndpointKey");
var _ = /* @__PURE__ */ ((e) => (e.bot = "bot", e.user = "user", e.app = "app", e))(_ || {}), w = /* @__PURE__ */ ((e) => (e.message = "message", e.card = "card", e.carousel = "carousel", e.image = "image", e.loader = "loader", e))(w || {});
function ft(e) {
  return e && typeof e == "object" && !Array.isArray(e);
}
function Tt(e, ...t) {
  if (!t.length)
    return e;
  const s = t.shift();
  if (ft(e) && ft(s))
    for (const i in s)
      ft(s[i]) ? (e[i] || Object.assign(e, { [i]: {} }), Tt(e[i], s[i])) : Object.assign(e, { [i]: s[i] });
  return Tt(e, ...t);
}
const as = {
  localStorage: {
    enabled: !1,
    maxNumberMessages: 20
  },
  preferences: {
    messages: {
      clearOnNewRequest: !1,
      hideIfNoMessages: !0,
      message: {
        hideUserMessages: !1,
        header: {
          display: !0,
          avatar: {
            display: !0,
            userIcon: "bi bi-person-fill",
            botIcon: "bi bi-robot"
          },
          label: {
            display: !0
          }
        }
      }
    },
    questionBar: {
      clearTypedCharsOnSubmit: !0,
      maxUserInputLength: 500,
      clearHistory: {
        display: !0,
        icon: "bi bi-trash-fill"
      },
      submit: {
        icon: "bi bi-send-fill"
      }
    }
  },
  wording: {
    messages: {
      message: {
        header: {
          labelUser: "You",
          labelBot: "Bot"
        },
        footnotes: {
          sources: "Sources :"
        }
      }
    },
    questionBar: {
      clearHistory: {
        labelBefore: "",
        labelAfter: ""
      },
      input: {
        placeholder: "Ask me a question..."
      },
      submit: {
        labelBefore: "",
        labelAfter: ""
      }
    }
  }
}, X = class X {
  constructor(t) {
    ht(this, "options");
    this.options = Tt(
      JSON.parse(JSON.stringify(as)),
      t
    );
  }
  static clearInstance() {
    X.instance && (X.instance = void 0);
  }
  static getInstance(t) {
    return X.instance || (X.instance = new X(t)), X.instance;
  }
};
ht(X, "instance");
let B = X;
const Us = "main", Mt = "main_storage", zs = () => ({
  userId: js(),
  messages: []
}), ae = Bs(Us, () => {
  const e = Gt(is), t = B.getInstance().options, s = j(i());
  function i() {
    if (t.localStorage.enabled) {
      const h = n();
      if (h)
        return h;
    }
    return zs();
  }
  function n() {
    if (!t.localStorage.enabled)
      return !1;
    const h = localStorage.getItem(a());
    return h ? JSON.parse(h) : !1;
  }
  function a() {
    let h = Mt;
    return t.localStorage.prefix && (h = `${Mt}_${t.localStorage.prefix}`), h;
  }
  const o = Xt(() => s.value.messages);
  function r() {
    s.value.messages = s.value.messages.filter((h) => h.type !== w.loader);
  }
  function u() {
  }
  function f(h) {
    const y = ae();
    y.clearLoaderMessages(), y.scrollMessages(), b(h), s.value.messages.push(h);
  }
  function b(h) {
    function y() {
      const D = Math.max(Math.random(), 0.3), E = Math.max(Math.random(), 0.3), N = Math.ceil(D * 500), v = Math.ceil(E * 500), P = Math.ceil(1), I = Math.floor(1084);
      return `https://picsum.photos/id/${Math.floor(
        Math.random() * (I - P) + P
      )}/${N}/${v}`;
    }
    h.type === w.card && (h.file.url = y()), h.type === w.carousel && h.cards.forEach((k) => {
      k.file.url = y();
    });
  }
  async function g(h, y = !0) {
    const k = ae();
    t.preferences.messages.clearOnNewRequest && (s.value.messages = []), y && k.addMessage({
      type: w.message,
      author: _.user,
      text: h,
      date: Date.now()
    }), k.addMessage({
      type: w.loader,
      author: _.app,
      date: Date.now()
    });
    const D = navigator.language, E = {
      query: h,
      userId: s.value.userId,
      locale: D
    }, N = await (await fetch(e, {
      method: "post",
      body: JSON.stringify(E)
    })).json();
    if (k.clearLoaderMessages(), N.responses.forEach((v) => {
      delete v.type, delete v.version, "text" in v ? k.addMessage({
        type: w.message,
        author: _.bot,
        date: Date.now(),
        ...v
      }) : "card" in v ? k.addMessage({
        type: w.card,
        author: _.bot,
        date: Date.now(),
        ...v.card
      }) : "image" in v ? k.addMessage({
        type: w.image,
        author: _.bot,
        date: Date.now(),
        ...v.image
      }) : "carousel" in v && k.addMessage({
        type: w.carousel,
        author: _.bot,
        date: Date.now(),
        ...v.carousel
      });
    }), t.localStorage.enabled) {
      let v = JSON.stringify(s.value);
      if (t.localStorage.maxNumberMessages && s.value.messages.length > t.localStorage.maxNumberMessages) {
        const P = JSON.parse(v), I = P.messages.length - parseInt(
          t.localStorage.maxNumberMessages
        );
        I && (P.messages = P.messages.slice(
          I,
          P.messages.length + 1
        )), v = JSON.stringify(P);
      }
      localStorage.setItem(a(), v);
    }
  }
  function d() {
    s.value.messages = [], t.localStorage.enabled && localStorage.setItem(a(), JSON.stringify(s.value));
  }
  return {
    state: s,
    getStoredState: n,
    getMessages: o,
    sendUserMessage: g,
    addMessage: f,
    clearHistory: d,
    clearLoaderMessages: r,
    scrollMessages: u
  };
}), $s = ["src"], qs = ["maxlength", "placeholder"], Vs = { class: "tvk-question-bar-chars-count" }, Ws = ["disabled"], Fs = ["src"], Ks = /* @__PURE__ */ F({
  __name: "question-block",
  setup(e) {
    const t = B.getInstance().options, s = ae(), i = t.preferences.questionBar.maxUserInputLength, n = j(null), a = j("");
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
    function b() {
      s.clearHistory();
    }
    return (g, d) => {
      var h;
      return p(), T("div", {
        class: "tvk-question-bar",
        onClick: o
      }, [
        (h = l(t).preferences.questionBar.clearHistory) != null && h.display ? (p(), T("button", {
          key: 0,
          class: "tvk-btn tvk-question-bar-clear-history",
          onClick: b
        }, [
          he(M(l(t).wording.questionBar.clearHistory.labelBefore) + " ", 1),
          !l(t).preferences.questionBar.clearHistory.image && l(t).preferences.questionBar.clearHistory.icon ? (p(), T("i", {
            key: 0,
            class: be(l(t).preferences.questionBar.clearHistory.icon)
          }, null, 2)) : C("", !0),
          l(t).preferences.questionBar.clearHistory.image ? (p(), T("img", {
            key: 1,
            src: l(t).preferences.questionBar.clearHistory.image.src,
            style: fe({
              width: l(t).preferences.questionBar.clearHistory.image.width,
              height: l(t).preferences.questionBar.clearHistory.image.height
            })
          }, null, 12, $s)) : C("", !0),
          he(" " + M(l(t).wording.questionBar.clearHistory.labelAfter), 1)
        ])) : C("", !0),
        x("form", {
          onSubmit: As(f, ["prevent"]),
          class: "tvk-question-bar-form"
        }, [
          Ds(x("input", {
            ref_key: "input",
            ref: n,
            class: "tvk-question-bar-input",
            maxlength: l(t).preferences.questionBar.maxUserInputLength,
            placeholder: l(t).wording.questionBar.input.placeholder,
            "onUpdate:modelValue": d[0] || (d[0] = (y) => a.value = y)
          }, null, 8, qs), [
            [Is, a.value]
          ]),
          x("div", Vs, M(r()) + "/" + M(l(i)), 1)
        ], 32),
        x("button", {
          onClick: f,
          disabled: !a.value.trim().length || u(),
          class: "tvk-btn tvk-question-bar-btn-submit"
        }, [
          he(M(l(t).wording.questionBar.submit.labelBefore) + " ", 1),
          !l(t).preferences.questionBar.submit.image && l(t).preferences.questionBar.submit.icon ? (p(), T("i", {
            key: 0,
            class: be(l(t).preferences.questionBar.submit.icon)
          }, null, 2)) : C("", !0),
          l(t).preferences.questionBar.submit.image ? (p(), T("img", {
            key: 1,
            src: l(t).preferences.questionBar.submit.image.src,
            style: fe({
              width: l(t).preferences.questionBar.submit.image.width,
              height: l(t).preferences.questionBar.submit.image.height
            })
          }, null, 12, Fs)) : C("", !0),
          he(" " + M(l(t).wording.questionBar.submit.labelAfter), 1)
        ], 8, Ws)
      ]);
    };
  }
}), Qs = "aaa1rp3bb0ott3vie4c1le2ogado5udhabi7c0ademy5centure6ountant0s9o1tor4d0s1ult4e0g1ro2tna4f0l1rica5g0akhan5ency5i0g1rbus3force5tel5kdn3l0ibaba4pay4lfinanz6state5y2sace3tom5m0azon4ericanexpress7family11x2fam3ica3sterdam8nalytics7droid5quan4z2o0l2partments8p0le4q0uarelle8r0ab1mco4chi3my2pa2t0e3s0da2ia2sociates9t0hleta5torney7u0ction5di0ble3o3spost5thor3o0s4vianca6w0s2x0a2z0ure5ba0by2idu3namex3narepublic11d1k2r0celona5laycard4s5efoot5gains6seball5ketball8uhaus5yern5b0c1t1va3cg1n2d1e0ats2uty4er2ntley5rlin4st0buy5t2f1g1h0arti5i0ble3d1ke2ng0o3o1z2j1lack0friday9ockbuster8g1omberg7ue3m0s1w2n0pparibas9o0ats3ehringer8fa2m1nd2o0k0ing5sch2tik2on4t1utique6x2r0adesco6idgestone9oadway5ker3ther5ussels7s1t1uild0ers6siness6y1zz3v1w1y1z0h3ca0b1fe2l0l1vinklein9m0era3p2non3petown5ital0one8r0avan4ds2e0er0s4s2sa1e1h1ino4t0ering5holic7ba1n1re3c1d1enter4o1rn3f0a1d2g1h0anel2nel4rity4se2t2eap3intai5ristmas6ome4urch5i0priani6rcle4sco3tadel4i0c2y3k1l0aims4eaning6ick2nic1que6othing5ud3ub0med6m1n1o0ach3des3ffee4llege4ogne5m0cast4mbank4unity6pany2re3uter5sec4ndos3struction8ulting7tact3ractors9oking4l1p2rsica5untry4pon0s4rses6pa2r0edit0card4union9icket5own3s1uise0s6u0isinella9v1w1x1y0mru3ou3z2dabur3d1nce3ta1e1ing3sun4y2clk3ds2e0al0er2s3gree4livery5l1oitte5ta3mocrat6ntal2ist5si0gn4v2hl2iamonds6et2gital5rect0ory7scount3ver5h2y2j1k1m1np2o0cs1tor4g1mains5t1wnload7rive4tv2ubai3nlop4pont4rban5vag2r2z2earth3t2c0o2deka3u0cation8e1g1mail3erck5nergy4gineer0ing9terprises10pson4quipment8r0icsson6ni3s0q1tate5t1u0rovision8s2vents5xchange6pert3osed4ress5traspace10fage2il1rwinds6th3mily4n0s2rm0ers5shion4t3edex3edback6rrari3ero6i0delity5o2lm2nal1nce1ial7re0stone6mdale6sh0ing5t0ness6j1k1lickr3ghts4r2orist4wers5y2m1o0o0d1tball6rd1ex2sale4um3undation8x2r0ee1senius7l1ogans4ntier7tr2ujitsu5n0d2rniture7tbol5yi3ga0l0lery3o1up4me0s3p1rden4y2b0iz3d0n2e0a1nt0ing5orge5f1g0ee3h1i0ft0s3ves2ing5l0ass3e1obal2o4m0ail3bh2o1x2n1odaddy5ld0point6f2o0dyear5g0le4p1t1v2p1q1r0ainger5phics5tis4een3ipe3ocery4up4s1t1u0ardian6cci3ge2ide2tars5ru3w1y2hair2mburg5ngout5us3bo2dfc0bank7ealth0care8lp1sinki6re1mes5iphop4samitsu7tachi5v2k0t2m1n1ockey4ldings5iday5medepot5goods5s0ense7nda3rse3spital5t0ing5t0els3mail5use3w2r1sbc3t1u0ghes5yatt3undai7ibm2cbc2e1u2d1e0ee3fm2kano4l1m0amat4db2mo0bilien9n0c1dustries8finiti5o2g1k1stitute6urance4e4t0ernational10uit4vestments10o1piranga7q1r0ish4s0maili5t0anbul7t0au2v3jaguar4va3cb2e0ep2tzt3welry6io2ll2m0p2nj2o0bs1urg4t1y2p0morgan6rs3uegos4niper7kaufen5ddi3e0rryhotels6logistics9properties14fh2g1h1i0a1ds2m1ndle4tchen5wi3m1n1oeln3matsu5sher5p0mg2n2r0d1ed3uokgroup8w1y0oto4z2la0caixa5mborghini8er3ncaster6d0rover6xess5salle5t0ino3robe5w0yer5b1c1ds2ease3clerc5frak4gal2o2xus4gbt3i0dl2fe0insurance9style7ghting6ke2lly3mited4o2ncoln4k2psy3ve1ing5k1lc1p2oan0s3cker3us3l1ndon4tte1o3ve3pl0financial11r1s1t0d0a3u0ndbeck6xe1ury5v1y2ma0drid4if1son4keup4n0agement7go3p1rket0ing3s4riott5shalls7ttel5ba2c0kinsey7d1e0d0ia3et2lbourne7me1orial6n0u2rckmsd7g1h1iami3crosoft7l1ni1t2t0subishi9k1l0b1s2m0a2n1o0bi0le4da2e1i1m1nash3ey2ster5rmon3tgage6scow4to0rcycles9v0ie4p1q1r1s0d2t0n1r2u0seum3ic4v1w1x1y1z2na0b1goya4me2tura4vy3ba2c1e0c1t0bank4flix4work5ustar5w0s2xt0direct7us4f0l2g0o2hk2i0co2ke1on3nja3ssan1y5l1o0kia3rton4w0ruz3tv4p1r0a1w2tt2u1yc2z2obi1server7ffice5kinawa6layan0group9dnavy5lo3m0ega4ne1g1l0ine5oo2pen3racle3nge4g0anic5igins6saka4tsuka4t2vh3pa0ge2nasonic7ris2s1tners4s1y3y2ccw3e0t2f0izer5g1h0armacy6d1ilips5one2to0graphy6s4ysio5ics1tet2ures6d1n0g1k2oneer5zza4k1l0ace2y0station9umbing5s3m1n0c2ohl2ker3litie5rn2st3r0america6xi3ess3ime3o0d0uctions8f1gressive8mo2perties3y5tection8u0dential9s1t1ub2w0c2y2qa1pon3uebec3st5racing4dio4e0ad1lestate6tor2y4cipes5d0stone5umbrella9hab3ise0n3t2liance6n0t0als5pair3ort3ublican8st0aurant8view0s5xroth6ich0ardli6oh3l1o1p2o0cks3deo3gers4om3s0vp3u0gby3hr2n2w0e2yukyu6sa0arland6fe0ty4kura4le1on3msclub4ung5ndvik0coromant12ofi4p1rl2s1ve2xo3b0i1s2c0a1b1haeffler7midt4olarships8ol3ule3warz5ience5ot3d1e0arch3t2cure1ity6ek2lect4ner3rvices6ven3w1x0y3fr2g1h0angrila6rp2w2ell3ia1ksha5oes2p0ping5uji3w3i0lk2na1gles5te3j1k0i0n2y0pe4l0ing4m0art3ile4n0cf3o0ccer3ial4ftbank4ware6hu2lar2utions7ng1y2y2pa0ce3ort2t3r0l2s1t0ada2ples4r1tebank4farm7c0group6ockholm6rage3e3ream4udio2y3yle4u0cks3pplies3y2ort5rf1gery5zuki5v1watch4iss4x1y0dney4stems6z2tab1ipei4lk2obao4rget4tamotors6r2too4x0i3c0i2d0k2eam2ch0nology8l1masek5nnis4va3f1g1h0d1eater2re6iaa2ckets5enda4ps2res2ol4j0maxx4x2k0maxx5l1m0all4n1o0day3kyo3ols3p1ray3shiba5tal3urs3wn2yota3s3r0ade1ing4ining5vel0ers0insurance16ust3v2t1ube2i1nes3shu4v0s2w1z2ua1bank3s2g1k1nicom3versity8o2ol2ps2s1y1z2va0cations7na1guard7c1e0gas3ntures6risign5mögensberater2ung14sicherung10t2g1i0ajes4deo3g1king4llas4n1p1rgin4sa1ion4va1o3laanderen9n1odka3lvo3te1ing3o2yage5u2wales2mart4ter4ng0gou5tch0es6eather0channel12bcam3er2site5d0ding5ibo2r3f1hoswho6ien2ki2lliamhill9n0dows4e1ners6me2olterskluwer11odside6rk0s2ld3w2s1tc1f3xbox3erox4finity6ihuan4n2xx2yz3yachts4hoo3maxun5ndex5e1odobashi7ga2kohama6u0tube6t1un3za0ppos4ra3ero3ip2m1one3uerich6w2", Js = "ελ1υ2бг1ел3дети4ею2католик6ом3мкд2он1сква6онлайн5рг3рус2ф2сайт3рб3укр3қаз3հայ3ישראל5קום3ابوظبي5رامكو5لاردن4بحرين5جزائر5سعودية6عليان5مغرب5مارات5یران5بارت2زار4يتك3ھارت5تونس4سودان3رية5شبكة4عراق2ب2مان4فلسطين6قطر3كاثوليك6وم3مصر2ليسيا5وريتانيا7قع4همراه5پاکستان7ڀارت4कॉम3नेट3भारत0म्3ोत5संगठन5বাংলা5ভারত2ৰত4ਭਾਰਤ4ભારત4ଭାରତ4இந்தியா6லங்கை6சிங்கப்பூர்11భారత్5ಭಾರತ4ഭാരതം5ලංකා4คอม3ไทย3ລາວ3გე2みんな3アマゾン4クラウド4グーグル4コム2ストア3セール3ファッション6ポイント4世界2中信1国1國1文网3亚马逊3企业2佛山2信息2健康2八卦2公司1益2台湾1灣2商城1店1标2嘉里0大酒店5在线2大拿2天主教3娱乐2家電2广东2微博2慈善2我爱你3手机2招聘2政务1府2新加坡2闻2时尚2書籍2机构2淡马锡3游戏2澳門2点看2移动2组织机构4网址1店1站1络2联通2谷歌2购物2通販2集团2電訊盈科4飞利浦3食品2餐厅2香格里拉3港2닷넷1컴2삼성2한국2", ge = (e, t) => {
  for (const s in t)
    e[s] = t[s];
  return e;
}, vt = "numeric", kt = "ascii", St = "alpha", _e = "asciinumeric", Ae = "alphanumeric", Et = "domain", os = "emoji", Gs = "scheme", Ys = "slashscheme", Bt = "whitespace";
function Xs(e, t) {
  return e in t || (t[e] = []), t[e];
}
function oe(e, t, s) {
  t[vt] && (t[_e] = !0, t[Ae] = !0), t[kt] && (t[_e] = !0, t[St] = !0), t[_e] && (t[Ae] = !0), t[St] && (t[Ae] = !0), t[Ae] && (t[Et] = !0), t[os] && (t[Et] = !0);
  for (const i in t) {
    const n = Xs(i, s);
    n.indexOf(e) < 0 && n.push(e);
  }
}
function Zs(e, t) {
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
    if (r ? (o = new U(), ge(o.j, r.j), o.jr.push.apply(o.jr, r.jr), o.jd = r.jd, o.t = r.t) : o = new U(), a) {
      if (i)
        if (o.t && typeof o.t == "string") {
          const u = ge(Zs(o.t, i), s);
          oe(a, u, i);
        } else
          s && oe(a, s, i);
      o.t = a;
    }
    return n.j[e] = o, o;
  }
};
const m = (e, t, s, i, n) => e.ta(t, s, i, n), $ = (e, t, s, i, n) => e.tr(t, s, i, n), jt = (e, t, s, i, n) => e.ts(t, s, i, n), c = (e, t, s, i, n) => e.tt(t, s, i, n), Y = "WORD", Ct = "UWORD", Se = "LOCALHOST", At = "TLD", Dt = "UTLD", Le = "SCHEME", ue = "SLASH_SCHEME", _t = "NUM", rs = "WS", Lt = "NL", Te = "OPENBRACE", ve = "CLOSEBRACE", Re = "OPENBRACKET", we = "CLOSEBRACKET", xe = "OPENPAREN", Pe = "CLOSEPAREN", He = "OPENANGLEBRACKET", Me = "CLOSEANGLEBRACKET", Be = "FULLWIDTHLEFTPAREN", je = "FULLWIDTHRIGHTPAREN", Ue = "LEFTCORNERBRACKET", ze = "RIGHTCORNERBRACKET", $e = "LEFTWHITECORNERBRACKET", qe = "RIGHTWHITECORNERBRACKET", Ve = "FULLWIDTHLESSTHAN", We = "FULLWIDTHGREATERTHAN", Fe = "AMPERSAND", Ke = "APOSTROPHE", Qe = "ASTERISK", ne = "AT", Je = "BACKSLASH", Ge = "BACKTICK", Ye = "CARET", ie = "COLON", Ot = "COMMA", Xe = "DOLLAR", K = "DOT", Ze = "EQUALS", Rt = "EXCLAMATION", Q = "HYPHEN", et = "PERCENT", tt = "PIPE", st = "PLUS", nt = "POUND", it = "QUERY", wt = "QUOTE", xt = "SEMI", J = "SLASH", ke = "TILDE", at = "UNDERSCORE", cs = "EMOJI", ot = "SYM";
var ls = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  WORD: Y,
  UWORD: Ct,
  LOCALHOST: Se,
  TLD: At,
  UTLD: Dt,
  SCHEME: Le,
  SLASH_SCHEME: ue,
  NUM: _t,
  WS: rs,
  NL: Lt,
  OPENBRACE: Te,
  CLOSEBRACE: ve,
  OPENBRACKET: Re,
  CLOSEBRACKET: we,
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
  AMPERSAND: Fe,
  APOSTROPHE: Ke,
  ASTERISK: Qe,
  AT: ne,
  BACKSLASH: Je,
  BACKTICK: Ge,
  CARET: Ye,
  COLON: ie,
  COMMA: Ot,
  DOLLAR: Xe,
  DOT: K,
  EQUALS: Ze,
  EXCLAMATION: Rt,
  HYPHEN: Q,
  PERCENT: et,
  PIPE: tt,
  PLUS: st,
  POUND: nt,
  QUERY: it,
  QUOTE: wt,
  SEMI: xt,
  SLASH: J,
  TILDE: ke,
  UNDERSCORE: at,
  EMOJI: cs,
  SYM: ot
});
const le = /[a-z]/, dt = new RegExp("\\p{L}", "u"), gt = new RegExp("\\p{Emoji}", "u"), pt = /\d/, Ut = /\s/, zt = `
`, en = "️", tn = "‍";
let De = null, Ie = null;
function sn(e) {
  e === void 0 && (e = []);
  const t = {};
  U.groups = t;
  const s = new U();
  De == null && (De = $t(Qs)), Ie == null && (Ie = $t(Js)), c(s, "'", Ke), c(s, "{", Te), c(s, "}", ve), c(s, "[", Re), c(s, "]", we), c(s, "(", xe), c(s, ")", Pe), c(s, "<", He), c(s, ">", Me), c(s, "（", Be), c(s, "）", je), c(s, "「", Ue), c(s, "」", ze), c(s, "『", $e), c(s, "』", qe), c(s, "＜", Ve), c(s, "＞", We), c(s, "&", Fe), c(s, "*", Qe), c(s, "@", ne), c(s, "`", Ge), c(s, "^", Ye), c(s, ":", ie), c(s, ",", Ot), c(s, "$", Xe), c(s, ".", K), c(s, "=", Ze), c(s, "!", Rt), c(s, "-", Q), c(s, "%", et), c(s, "|", tt), c(s, "+", st), c(s, "#", nt), c(s, "?", it), c(s, '"', wt), c(s, "/", J), c(s, ";", xt), c(s, "~", ke), c(s, "_", at), c(s, "\\", Je);
  const i = $(s, pt, _t, {
    [vt]: !0
  });
  $(i, pt, i);
  const n = $(s, le, Y, {
    [kt]: !0
  });
  $(n, le, n);
  const a = $(s, dt, Ct, {
    [St]: !0
  });
  $(a, le), $(a, dt, a);
  const o = $(s, Ut, rs, {
    [Bt]: !0
  });
  c(s, zt, Lt, {
    [Bt]: !0
  }), c(o, zt), $(o, Ut, o);
  const r = $(s, gt, cs, {
    [os]: !0
  });
  $(r, gt, r), c(r, en, r);
  const u = c(r, tn);
  $(u, gt, r);
  const f = [[le, n]], b = [[le, null], [dt, a]];
  for (let g = 0; g < De.length; g++)
    te(s, De[g], At, Y, f);
  for (let g = 0; g < Ie.length; g++)
    te(s, Ie[g], Dt, Ct, b);
  oe(At, {
    tld: !0,
    ascii: !0
  }, t), oe(Dt, {
    utld: !0,
    alpha: !0
  }, t), te(s, "file", Le, Y, f), te(s, "mailto", Le, Y, f), te(s, "http", ue, Y, f), te(s, "https", ue, Y, f), te(s, "ftp", ue, Y, f), te(s, "ftps", ue, Y, f), oe(Le, {
    scheme: !0,
    ascii: !0
  }, t), oe(ue, {
    slashscheme: !0,
    ascii: !0
  }, t), e = e.sort((g, d) => g[0] > d[0] ? 1 : -1);
  for (let g = 0; g < e.length; g++) {
    const d = e[g][0], y = e[g][1] ? {
      [Gs]: !0
    } : {
      [Ys]: !0
    };
    d.indexOf("-") >= 0 ? y[Et] = !0 : le.test(d) ? pt.test(d) ? y[_e] = !0 : y[kt] = !0 : y[vt] = !0, jt(s, d, d, y);
  }
  return jt(s, "localhost", Se, {
    ascii: !0
  }), s.jd = new U(ot), {
    start: s,
    tokens: ge({
      groups: t
    }, ls)
  };
}
function nn(e, t) {
  const s = an(t.replace(/[A-Z]/g, (r) => r.toLowerCase())), i = s.length, n = [];
  let a = 0, o = 0;
  for (; o < i; ) {
    let r = e, u = null, f = 0, b = null, g = -1, d = -1;
    for (; o < i && (u = r.go(s[o])); )
      r = u, r.accepts() ? (g = 0, d = 0, b = r) : g >= 0 && (g += s[o].length, d++), f += s[o].length, a += s[o].length, o++;
    a -= g, o -= d, f -= g, n.push({
      t: b.t,
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
function an(e) {
  const t = [], s = e.length;
  let i = 0;
  for (; i < s; ) {
    let n = e.charCodeAt(i), a, o = n < 55296 || n > 56319 || i + 1 === s || (a = e.charCodeAt(i + 1)) < 56320 || a > 57343 ? e[i] : e.slice(i, i + 2);
    t.push(o), i += o.length;
  }
  return t;
}
function te(e, t, s, i, n) {
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
  let s = ge({}, Ee);
  e && (s = ge(s, e instanceof Pt ? e.o : e));
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
function us(e, t) {
  this.t = "token", this.v = e, this.tk = t;
}
us.prototype = {
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
    const t = this, s = this.toHref(e.get("defaultProtocol")), i = e.get("formatHref", s, this), n = e.get("tagName", s, t), a = this.toFormattedString(e), o = {}, r = e.get("className", s, t), u = e.get("target", s, t), f = e.get("rel", s, t), b = e.getObj("attributes", s, t), g = e.getObj("events", s, t);
    return o.href = i, r && (o.class = r), u && (o.target = u), f && (o.rel = f), b && ge(o, b), {
      tagName: n,
      attributes: o,
      content: a,
      eventListeners: g
    };
  }
};
function ut(e, t) {
  class s extends us {
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
}), Wt = ut("text"), on = ut("nl"), Ne = ut("url", {
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
    return e.length >= 2 && e[0].t !== Se && e[1].t === ie;
  }
}), q = (e) => new U(e);
function rn(e) {
  let {
    groups: t
  } = e;
  const s = t.domain.concat([Fe, Qe, ne, Je, Ge, Ye, Xe, Ze, Q, _t, et, tt, st, nt, J, ot, ke, at]), i = [Ke, ie, Ot, K, Rt, it, wt, xt, He, Me, Te, ve, we, Re, xe, Pe, Be, je, Ue, ze, $e, qe, Ve, We], n = [Fe, Ke, Qe, Je, Ge, Ye, Xe, Ze, Q, Te, ve, et, tt, st, nt, it, J, ot, ke, at], a = q(), o = c(a, ke);
  m(o, n, o), m(o, t.domain, o);
  const r = q(), u = q(), f = q();
  m(a, t.domain, r), m(a, t.scheme, u), m(a, t.slashscheme, f), m(r, n, o), m(r, t.domain, r);
  const b = c(r, ne);
  c(o, ne, b), c(u, ne, b), c(f, ne, b);
  const g = c(o, K);
  m(g, n, o), m(g, t.domain, o);
  const d = q();
  m(b, t.domain, d), m(d, t.domain, d);
  const h = c(d, K);
  m(h, t.domain, d);
  const y = q(Vt);
  m(h, t.tld, y), m(h, t.utld, y), c(b, Se, y);
  const k = c(d, Q);
  m(k, t.domain, d), m(y, t.domain, d), c(y, K, h), c(y, Q, k);
  const D = c(y, ie);
  m(D, t.numeric, Vt);
  const E = c(r, Q), N = c(r, K);
  m(E, t.domain, r), m(N, n, o), m(N, t.domain, r);
  const v = q(Ne);
  m(N, t.tld, v), m(N, t.utld, v), m(v, t.domain, r), m(v, n, o), c(v, K, N), c(v, Q, E), c(v, ne, b);
  const P = c(v, ie), I = q(Ne);
  m(P, t.numeric, I);
  const L = q(Ne), V = q();
  m(L, s, L), m(L, i, V), m(V, s, L), m(V, i, V), c(v, J, L), c(I, J, L);
  const A = c(u, ie), S = c(f, ie), z = c(S, J), W = c(z, J);
  m(u, t.domain, r), c(u, K, N), c(u, Q, E), m(f, t.domain, r), c(f, K, N), c(f, Q, E), m(A, t.domain, L), c(A, J, L), m(W, t.domain, L), m(W, s, L), c(W, J, L);
  const ee = [
    [Te, ve],
    // {}
    [Re, we],
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
  for (let pe = 0; pe < ee.length; pe++) {
    const [Ce, G] = ee[pe], O = c(L, Ce);
    c(V, Ce, O), c(O, G, L);
    const re = q(Ne);
    m(O, s, re);
    const me = q();
    m(O, i), m(re, s, re), m(re, i, me), m(me, s, re), m(me, i, me), c(re, G, L), c(me, G, L);
  }
  return c(a, Se, v), c(a, Lt, on), {
    start: a,
    tokens: ls
  };
}
function cn(e, t, s) {
  let i = s.length, n = 0, a = [], o = [];
  for (; n < i; ) {
    let r = e, u = null, f = null, b = 0, g = null, d = -1;
    for (; n < i && !(u = r.go(s[n].t)); )
      o.push(s[n++]);
    for (; n < i && (f = u || r.go(s[n].t)); )
      u = null, r = f, r.accepts() ? (d = 0, g = r) : d >= 0 && d++, n++, b++;
    if (d < 0)
      n -= b, n < i && (o.push(s[n]), n++);
    else {
      o.length > 0 && (a.push(mt(Wt, t, o)), o = []), n -= d, b -= d;
      const h = g.t, y = s.slice(n - b, n);
      a.push(mt(h, t, y));
    }
  }
  return o.length > 0 && a.push(mt(Wt, t, o)), a;
}
function mt(e, t, s) {
  const i = s[0].s, n = s[s.length - 1].e, a = t.slice(i, n);
  return new e(a, s);
}
const H = {
  scanner: null,
  parser: null,
  tokenQueue: [],
  pluginQueue: [],
  customSchemes: [],
  initialized: !1
};
function ln() {
  H.scanner = sn(H.customSchemes);
  for (let e = 0; e < H.tokenQueue.length; e++)
    H.tokenQueue[e][1]({
      scanner: H.scanner
    });
  H.parser = rn(H.scanner.tokens);
  for (let e = 0; e < H.pluginQueue.length; e++)
    H.pluginQueue[e][1]({
      scanner: H.scanner,
      parser: H.parser
    });
  H.initialized = !0;
}
function un(e) {
  return H.initialized || ln(), cn(H.parser.start, e, nn(H.scanner.start, e));
}
var hn = {
  // We don't need the complete named character reference because linkifyHtml
  // does not modify the escape sequences. We do need &nbsp; so that
  // whitespace is parsed properly. Other types of whitespace should already
  // be accounted for. &gt; &lt; and &quot; are also frequently relevant ones
  amp: "&",
  gt: ">",
  lt: "<",
  nbsp: " ",
  quot: '"'
}, fn = /^#[xX]([A-Fa-f0-9]+)$/, dn = /^#([0-9]+)$/, gn = /^([A-Za-z0-9]+)$/, pn = (
  /** @class */
  function() {
    function e(t) {
      this.named = t;
    }
    return e.prototype.parse = function(t) {
      if (t) {
        var s = t.match(fn);
        if (s)
          return String.fromCharCode(parseInt(s[1], 16));
        if (s = t.match(dn), s)
          return String.fromCharCode(parseInt(s[1], 10));
        if (s = t.match(gn), s)
          return this.named[s[1]] || "&" + s[1] + ";";
      }
    }, e;
  }()
), mn = /[\t\n\f ]/, bn = /[A-Za-z]/, yn = /\r\n?/g;
function R(e) {
  return mn.test(e);
}
function Ft(e) {
  return bn.test(e);
}
function Tn(e) {
  return e.replace(yn, `
`);
}
var vn = (
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
          ) : (n === "@" || n === ":" || Ft(n)) && (this.transitionTo(
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
          (n === "@" || n === ":" || Ft(n)) && (this.transitionTo(
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
      for (this.input += Tn(t); this.index < this.input.length; ) {
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
), kn = (
  /** @class */
  function() {
    function e(t, s) {
      s === void 0 && (s = {}), this.options = s, this.token = null, this.startLine = 1, this.startColumn = 0, this.tokens = [], this.tokenizer = new vn(this, t, s.mode), this._currentAttribute = void 0;
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
function Sn(e, t) {
  var s = new kn(new pn(hn), t);
  return s.tokenize(e);
}
const hs = "LinkifyResult", rt = "StartTag", fs = "EndTag", It = "Chars", En = "Comment", Cn = "Doctype";
function An(e, t) {
  t === void 0 && (t = {});
  const s = Sn(e), i = [], n = [], a = new Pt(t, Nn);
  for (let o = 0; o < s.length; o++) {
    const r = s[o];
    if (r.type === rt) {
      i.push(r);
      const u = r.tagName.toUpperCase();
      if (!(u === "A" || a.ignoreTags.indexOf(u) >= 0))
        continue;
      let b = i.length;
      In(u, s, ++o, i), o += i.length - b - 1;
    } else if (r.type !== It)
      i.push(r);
    else {
      const u = Dn(r.chars, a);
      i.push.apply(i, u);
    }
  }
  for (let o = 0; o < i.length; o++) {
    const r = i[o];
    switch (r.type) {
      case hs:
        n.push(r.rendered);
        break;
      case rt: {
        let u = "<" + r.tagName;
        r.attributes.length > 0 && (u += " " + Ln(r.attributes).join(" ")), r.selfClosing && (u += " /"), u += ">", n.push(u);
        break;
      }
      case fs:
        n.push(`</${r.tagName}>`);
        break;
      case It:
        n.push(Nt(r.chars));
        break;
      case En:
        n.push(`<!--${Nt(r.chars)}-->`);
        break;
      case Cn: {
        let u = `<!DOCTYPE ${r.name}`;
        r.publicIdentifier && (u += ` PUBLIC "${r.publicIdentifier}"`), r.systemIdentifier && (u += ` "${r.systemIdentifier}"`), u += ">", n.push(u);
        break;
      }
    }
  }
  return n.join("");
}
function Dn(e, t) {
  const s = un(e), i = [];
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
      type: hs,
      rendered: t.render(a)
    });
  }
  return i;
}
function In(e, t, s, i) {
  let n = 1;
  for (; s < t.length && n > 0; ) {
    let a = t[s];
    a.type === rt && a.tagName.toUpperCase() === e ? n++ : a.type === fs && a.tagName.toUpperCase() === e && n--, i.push(a), s++;
  }
  return i;
}
function Nn(e) {
  let {
    tagName: t,
    attributes: s,
    content: i
  } = e;
  return `<${t} ${_n(s)}>${Nt(i)}</${t}>`;
}
function Nt(e) {
  return e.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function ds(e) {
  return e.replace(/"/g, "&quot;");
}
function _n(e) {
  const t = [];
  for (const s in e) {
    const i = e[s] + "";
    t.push(`${s}="${ds(i)}"`);
  }
  return t.join(" ");
}
function Ln(e) {
  const t = [];
  for (let s = 0; s < e.length; s++) {
    const i = e[s][0], n = e[s][1] + "";
    t.push(`${i}="${ds(n)}"`);
  }
  return t;
}
const On = /* @__PURE__ */ F({
  __name: "button",
  props: {
    button: {
      type: Object
    }
  },
  setup(e) {
    const t = ae(), s = e;
    function i() {
      t.sendUserMessage(s.button.title);
    }
    return (n, a) => (p(), T("button", {
      class: "tvk-btn tvk-btn-action",
      onClick: i
    }, M(s.button.title), 1));
  }
}), Rn = ["href"], wn = /* @__PURE__ */ F({
  __name: "footnote",
  props: {
    footnote: {
      type: Object
    }
  },
  setup(e) {
    const t = e;
    return (s, i) => (p(), T("a", {
      class: "tvk-message-footnote",
      href: t.footnote.url,
      target: "_blank"
    }, M(t.footnote.title), 9, Rn));
  }
}), xn = { class: "tvk-message-footnotes" }, Pn = /* @__PURE__ */ F({
  __name: "footnotes",
  props: {
    footnotes: {
      type: Object
    }
  },
  setup(e) {
    const t = B.getInstance().options, s = e;
    return (i, n) => (p(), T("div", xn, [
      he(M(l(t).wording.messages.message.footnotes.sources) + " ", 1),
      (p(!0), T(de, null, ct(s.footnotes, (a) => (p(), Z(wn, { footnote: a }, null, 8, ["footnote"]))), 256))
    ]));
  }
}), Hn = ["innerHTML"], Mn = /* @__PURE__ */ F({
  __name: "message-text",
  props: {
    message: {
      type: Object
    }
  },
  setup(e) {
    B.getInstance().options;
    const t = e;
    function s() {
      return An(t.message.text, { target: "_blank" });
    }
    return (i, n) => {
      var a;
      return p(), T(de, null, [
        x("div", {
          innerHTML: s()
        }, null, 8, Hn),
        (a = t.message.footnotes) != null && a.length ? (p(), Z(Pn, {
          key: 0,
          footnotes: t.message.footnotes
        }, null, 8, ["footnotes"])) : C("", !0),
        (p(!0), T(de, null, ct(t.message.buttons, (o) => (p(), Z(On, { button: o }, {
          default: Ns(() => [
            he(M(o.title), 1)
          ]),
          _: 2
        }, 1032, ["button"]))), 256))
      ], 64);
    };
  }
}), Bn = { class: "tvk-card" }, jn = ["src", "alt"], Un = { key: 1 }, zn = { key: 2 }, $n = { key: 3 }, gs = /* @__PURE__ */ F({
  __name: "message-card",
  props: {
    card: {
      type: Object
    }
  },
  setup(e) {
    var a, o, r;
    const t = ae();
    B.getInstance().options;
    const s = e, i = ((o = (a = s.card) == null ? void 0 : a.file) == null ? void 0 : o.description) ?? ((r = s.card) == null ? void 0 : r.title);
    function n(u) {
      s.card.file._loaded || (s.card.file._loaded = !0, t.scrollMessages());
    }
    return (u, f) => {
      var b, g, d, h, y, k, D, E, N, v, P, I;
      return p(), T("div", Bn, [
        (g = (b = s.card) == null ? void 0 : b.file) != null && g.url ? (p(), T("img", {
          key: 0,
          src: (h = (d = s.card) == null ? void 0 : d.file) == null ? void 0 : h.url,
          alt: l(i),
          onLoad: n,
          class: "tvk-thumbnail"
        }, null, 40, jn)) : C("", !0),
        (y = s.card) != null && y.title ? (p(), T("div", Un, [
          x("strong", null, M((k = s.card) == null ? void 0 : k.title), 1)
        ])) : C("", !0),
        (D = s.card) != null && D.subTitle ? (p(), T("div", zn, M((E = s.card) == null ? void 0 : E.subTitle), 1)) : C("", !0),
        (v = (N = s.card) == null ? void 0 : N.file) != null && v.description ? (p(), T("div", $n, M((I = (P = s.card) == null ? void 0 : P.file) == null ? void 0 : I.description), 1)) : C("", !0)
      ]);
    };
  }
}), Kt = "transform 0.2s", qn = /* @__PURE__ */ F({
  __name: "message-carousel",
  props: {
    carousel: {
      type: Object
    }
  },
  setup(e) {
    const s = j(e.carousel.cards), i = j([]), n = j(null), a = j(null), o = j({}), r = j({}), u = j(!1);
    function f() {
      var D;
      const k = (D = n.value) == null ? void 0 : D.offsetWidth;
      o.value = {
        overflow: "hidden",
        "max-width": `${k}px`
      };
    }
    function b() {
      return i.value.reduce((k, D) => k + D.offsetWidth, 0);
    }
    function g() {
      if (u.value)
        return;
      u.value = !0, f();
      const k = b(), D = s.value[0];
      s.value.push(D);
      const E = i.value[0];
      r.value = {
        transition: Kt,
        transform: `translateX(-${E.offsetWidth}px)`,
        width: `${k + E.offsetWidth + 1}px`
      }, h(() => {
        s.value.shift(), y(), u.value = !1;
      });
    }
    function d() {
      if (u.value)
        return;
      u.value = !0, f();
      const k = b(), D = s.value[s.value.length - 1];
      s.value.unshift(D);
      const E = i.value[i.value.length - 1];
      r.value = {
        transition: "none",
        transform: `translateX(-${E.offsetWidth}px)`,
        width: `${k + E.offsetWidth + 1}px`
      }, setTimeout(() => {
        r.value = {
          transition: Kt,
          transform: "translateX(0)",
          width: `${k + E.offsetWidth + 1}px`
        }, h(() => {
          s.value.pop(), y(), u.value = !1;
        });
      });
    }
    function h(k) {
      var E;
      const D = () => {
        var N;
        k(), (N = a.value) == null || N.removeEventListener("transitionend", D);
      };
      (E = a.value) == null || E.addEventListener("transitionend", D);
    }
    function y() {
      o.value = {}, r.value = {
        transition: "none",
        transform: "translateX(0)"
      };
    }
    return (k, D) => (p(), T(de, null, [
      x("div", {
        class: "tvk-carousel",
        ref_key: "carouselRef",
        ref: n,
        style: fe(o.value)
      }, [
        x("div", {
          class: "tvk-carousel-inner",
          ref_key: "innerRef",
          ref: a,
          style: fe(r.value)
        }, [
          (p(!0), T(de, null, ct(s.value, (E) => (p(), T("div", {
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
      x("div", { class: "tvk-carousel-controls" }, [
        x("button", {
          class: "tvk-btn",
          onClick: d
        }, " prev "),
        x("button", {
          class: "tvk-btn",
          onClick: g
        }, " next ")
      ])
    ], 64));
  }
}), Vn = /* @__PURE__ */ F({
  __name: "message-image",
  props: { message: Object },
  setup(e) {
    return B.getInstance().options, (t, s) => "Image type not yet implemented";
  }
}), Wn = {
  key: 0,
  class: "tvk-message-header"
}, Fn = {
  key: 0,
  class: "tvk-message-header-avatar"
}, Kn = ["src"], Qn = ["src"], Jn = {
  key: 1,
  class: "tvk-message-header-label"
}, Gn = { class: "tvk-message-header-label-user" }, Yn = { class: "tvk-message-header-label-bot" }, Xn = /* @__PURE__ */ x("div", { class: "tvk-message-header-line-break" }, null, -1), Zn = {
  key: 1,
  class: "tvk-message-body"
}, ei = {
  key: 2,
  class: "tvk-message-body-from-app"
}, ti = {
  key: 0,
  class: "tvk-message-loader"
}, si = /* @__PURE__ */ F({
  __name: "message",
  props: {
    message: {
      type: Object
    }
  },
  setup(e) {
    const t = B.getInstance().options, s = e;
    return (i, n) => s.message.author !== l(_).user || !l(t).preferences.messages.message.hideUserMessages ? (p(), T("div", {
      key: 0,
      class: be(["tvk-message", {
        "tvk-message-user": s.message.author === l(_).user,
        "tvk-message-bot": s.message.author === l(_).bot
      }])
    }, [
      l(t).preferences.messages.message.header.display && s.message.author !== l(_).app ? (p(), T("div", Wn, [
        l(t).preferences.messages.message.header.avatar.display ? (p(), T("div", Fn, [
          !l(t).preferences.messages.message.header.avatar.userImage && l(t).preferences.messages.message.header.avatar.userIcon && s.message.author === l(_).user ? (p(), T("i", {
            key: 0,
            class: be([
              "tvk-message-header-avatar-user",
              l(t).preferences.messages.message.header.avatar.userIcon
            ])
          }, null, 2)) : C("", !0),
          l(t).preferences.messages.message.header.avatar.userImage && s.message.author === l(_).user ? (p(), T("img", {
            key: 1,
            src: l(t).preferences.messages.message.header.avatar.userImage.src,
            style: fe({
              width: l(t).preferences.messages.message.header.avatar.userImage.width,
              height: l(t).preferences.messages.message.header.avatar.userImage.height
            })
          }, null, 12, Kn)) : C("", !0),
          !l(t).preferences.messages.message.header.avatar.botImage && l(t).preferences.messages.message.header.avatar.botIcon && s.message.author === l(_).bot ? (p(), T("i", {
            key: 2,
            class: be(["tvk-message-header-avatar-bot", l(t).preferences.messages.message.header.avatar.botIcon])
          }, null, 2)) : C("", !0),
          l(t).preferences.messages.message.header.avatar.botImage && s.message.author === l(_).bot ? (p(), T("img", {
            key: 3,
            src: l(t).preferences.messages.message.header.avatar.botImage.src,
            style: fe({
              width: l(t).preferences.messages.message.header.avatar.botImage.width,
              height: l(t).preferences.messages.message.header.avatar.botImage.height
            })
          }, null, 12, Qn)) : C("", !0)
        ])) : C("", !0),
        l(t).preferences.messages.message.header.label.display ? (p(), T("div", Jn, [
          x("span", Gn, M(l(t).wording.messages.message.header.labelUser), 1),
          x("span", Yn, M(l(t).wording.messages.message.header.labelBot), 1)
        ])) : C("", !0)
      ])) : C("", !0),
      Xn,
      s.message.author !== l(_).app ? (p(), T("div", Zn, [
        s.message.type === l(w).message ? (p(), Z(Mn, {
          key: 0,
          message: s.message
        }, null, 8, ["message"])) : C("", !0),
        s.message.type === l(w).card ? (p(), Z(gs, {
          key: 1,
          card: s.message
        }, null, 8, ["card"])) : C("", !0),
        s.message.type === l(w).carousel ? (p(), Z(qn, {
          key: 2,
          carousel: s.message
        }, null, 8, ["carousel"])) : C("", !0),
        s.message.type === l(w).image ? (p(), Z(Vn, {
          key: 3,
          message: s.message
        }, null, 8, ["message"])) : C("", !0)
      ])) : C("", !0),
      s.message.author === l(_).app ? (p(), T("div", ei, [
        s.message.type === l(w).loader ? (p(), T("div", ti)) : C("", !0)
      ])) : C("", !0)
    ], 2)) : C("", !0);
  }
}), ni = /* @__PURE__ */ x("div", { class: "tvk-shader tvk-shader-top" }, null, -1), ii = /* @__PURE__ */ x("div", { class: "tvk-shader tvk-shader-bottom" }, null, -1), ai = /* @__PURE__ */ F({
  __name: "messages",
  setup(e) {
    const t = ae(), s = j();
    function i() {
      setTimeout(() => {
        s.value.scrollTop = s.value.scrollHeight;
      }, 100);
    }
    return _s(() => {
      i();
    }), t.$onAction(({ name: n, store: a, args: o, after: r }) => {
      n === "scrollMessages" && r(() => {
        setTimeout(() => {
          i();
        });
      });
    }), (n, a) => (p(), T("div", {
      ref_key: "messagesWrapper",
      ref: s,
      class: "tvk-messages"
    }, [
      ni,
      (p(!0), T(de, null, ct(l(t).getMessages, (o) => (p(), Z(si, { message: o }, null, 8, ["message"]))), 256)),
      ii
    ], 512));
  }
}), oi = { class: "tvk-wrapper" }, ri = /* @__PURE__ */ F({
  __name: "App",
  setup(e) {
    const t = B.getInstance().options, s = ae();
    return (i, n) => (p(), T("main", oi, [
      l(s).getMessages.length || !l(t).preferences.messages.hideIfNoMessages ? (p(), Z(ai, { key: 0 })) : C("", !0),
      Zt(Ks)
    ]));
  }
});
function ci() {
  var t, s;
  const e = B.getInstance().options;
  if ((t = e == null ? void 0 : e.initialization) != null && t.welcomeMessage || (s = e == null ? void 0 : e.initialization) != null && s.openingMessage) {
    const i = ae(), n = i.getStoredState();
    (!n || !n.messages.length) && (e.initialization.welcomeMessage && i.addMessage({
      type: w.message,
      author: _.bot,
      date: Date.now(),
      text: e.initialization.welcomeMessage
    }), e.initialization.openingMessage && i.sendUserMessage(
      e.initialization.openingMessage,
      !1
    ));
  }
}
function hi(e, t, s) {
  const i = Ls(ri);
  i.provide(is, t), B.clearInstance(), B.getInstance(s);
  const n = Rs();
  return i.use(n), i.mount(e), ci(), i;
}
function fi() {
  return JSON.parse(JSON.stringify(as));
}
function di() {
  return JSON.parse(JSON.stringify(B.getInstance().options));
}
export {
  di as getCurrentOptions,
  fi as getDefaultOptions,
  hi as renderChat
};
