var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { effectScope, ref, markRaw, hasInjectionContext, inject, getCurrentInstance, toRaw, watch, reactive, isRef, isReactive, toRef, nextTick, computed, unref, getCurrentScope, onScopeDispose, toRefs, defineComponent, openBlock, createElementBlock, createElementVNode, Fragment, renderList, normalizeClass, createTextVNode, toDisplayString, createCommentVNode, withDirectives, vShow, onMounted, onUnmounted, withModifiers, createBlock, normalizeStyle, vModelText, withCtx, createVNode, createApp } from "vue";
var isVue2 = false;
function set(target, key, val) {
  if (Array.isArray(target)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }
  target[key] = val;
  return val;
}
function del(target, key) {
  if (Array.isArray(target)) {
    target.splice(key, 1);
    return;
  }
  delete target[key];
}
function getDevtoolsGlobalHook() {
  return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function getTarget() {
  return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : {};
}
const isProxyAvailable = typeof Proxy === "function";
const HOOK_SETUP = "devtools-plugin:setup";
const HOOK_PLUGIN_SETTINGS_SET = "plugin:settings:set";
let supported;
let perf;
function isPerformanceSupported() {
  var _a;
  if (supported !== void 0) {
    return supported;
  }
  if (typeof window !== "undefined" && window.performance) {
    supported = true;
    perf = window.performance;
  } else if (typeof globalThis !== "undefined" && ((_a = globalThis.perf_hooks) === null || _a === void 0 ? void 0 : _a.performance)) {
    supported = true;
    perf = globalThis.perf_hooks.performance;
  } else {
    supported = false;
  }
  return supported;
}
function now() {
  return isPerformanceSupported() ? perf.now() : Date.now();
}
class ApiProxy {
  constructor(plugin, hook) {
    this.target = null;
    this.targetQueue = [];
    this.onQueue = [];
    this.plugin = plugin;
    this.hook = hook;
    const defaultSettings = {};
    if (plugin.settings) {
      for (const id in plugin.settings) {
        const item = plugin.settings[id];
        defaultSettings[id] = item.defaultValue;
      }
    }
    const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
    let currentSettings = Object.assign({}, defaultSettings);
    try {
      const raw = localStorage.getItem(localSettingsSaveId);
      const data = JSON.parse(raw);
      Object.assign(currentSettings, data);
    } catch (e) {
    }
    this.fallbacks = {
      getSettings() {
        return currentSettings;
      },
      setSettings(value) {
        try {
          localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
        } catch (e) {
        }
        currentSettings = value;
      },
      now() {
        return now();
      }
    };
    if (hook) {
      hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
        if (pluginId === this.plugin.id) {
          this.fallbacks.setSettings(value);
        }
      });
    }
    this.proxiedOn = new Proxy({}, {
      get: (_target, prop) => {
        if (this.target) {
          return this.target.on[prop];
        } else {
          return (...args) => {
            this.onQueue.push({
              method: prop,
              args
            });
          };
        }
      }
    });
    this.proxiedTarget = new Proxy({}, {
      get: (_target, prop) => {
        if (this.target) {
          return this.target[prop];
        } else if (prop === "on") {
          return this.proxiedOn;
        } else if (Object.keys(this.fallbacks).includes(prop)) {
          return (...args) => {
            this.targetQueue.push({
              method: prop,
              args,
              resolve: () => {
              }
            });
            return this.fallbacks[prop](...args);
          };
        } else {
          return (...args) => {
            return new Promise((resolve) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve
              });
            });
          };
        }
      }
    });
  }
  async setRealTarget(target) {
    this.target = target;
    for (const item of this.onQueue) {
      this.target.on[item.method](...item.args);
    }
    for (const item of this.targetQueue) {
      item.resolve(await this.target[item.method](...item.args));
    }
  }
}
function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
  const descriptor = pluginDescriptor;
  const target = getTarget();
  const hook = getDevtoolsGlobalHook();
  const enableProxy = isProxyAvailable && descriptor.enableEarlyProxy;
  if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
    hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
  } else {
    const proxy = enableProxy ? new ApiProxy(descriptor, hook) : null;
    const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
    list.push({
      pluginDescriptor: descriptor,
      setupFn,
      proxy
    });
    if (proxy) {
      setupFn(proxy.proxiedTarget);
    }
  }
}
/*!
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */
let activePinia;
const setActivePinia = (pinia) => activePinia = pinia;
const piniaSymbol = Symbol("pinia");
function isPlainObject(o) {
  return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
}
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
const IS_CLIENT = typeof window !== "undefined";
const USE_DEVTOOLS = IS_CLIENT;
const _global = /* @__PURE__ */ (() => typeof window === "object" && window.window === window ? window : typeof self === "object" && self.self === self ? self : typeof global === "object" && global.global === global ? global : typeof globalThis === "object" ? globalThis : { HTMLElement: null })();
function bom(blob, { autoBom = false } = {}) {
  if (autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
    return new Blob([String.fromCharCode(65279), blob], { type: blob.type });
  }
  return blob;
}
function download(url, name, opts) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.onload = function() {
    saveAs(xhr.response, name, opts);
  };
  xhr.onerror = function() {
    console.error("could not download file");
  };
  xhr.send();
}
function corsEnabled(url) {
  const xhr = new XMLHttpRequest();
  xhr.open("HEAD", url, false);
  try {
    xhr.send();
  } catch (e) {
  }
  return xhr.status >= 200 && xhr.status <= 299;
}
function click(node) {
  try {
    node.dispatchEvent(new MouseEvent("click"));
  } catch (e) {
    const evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
    node.dispatchEvent(evt);
  }
}
const _navigator = typeof navigator === "object" ? navigator : { userAgent: "" };
const isMacOSWebView = /* @__PURE__ */ (() => /Macintosh/.test(_navigator.userAgent) && /AppleWebKit/.test(_navigator.userAgent) && !/Safari/.test(_navigator.userAgent))();
const saveAs = !IS_CLIENT ? () => {
} : (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement !== "undefined" && "download" in HTMLAnchorElement.prototype && !isMacOSWebView ? downloadSaveAs : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in _navigator ? msSaveAs : (
      // Fallback to using FileReader and a popup
      fileSaverSaveAs
    )
  )
);
function downloadSaveAs(blob, name = "download", opts) {
  const a = document.createElement("a");
  a.download = name;
  a.rel = "noopener";
  if (typeof blob === "string") {
    a.href = blob;
    if (a.origin !== location.origin) {
      if (corsEnabled(a.href)) {
        download(blob, name, opts);
      } else {
        a.target = "_blank";
        click(a);
      }
    } else {
      click(a);
    }
  } else {
    a.href = URL.createObjectURL(blob);
    setTimeout(function() {
      URL.revokeObjectURL(a.href);
    }, 4e4);
    setTimeout(function() {
      click(a);
    }, 0);
  }
}
function msSaveAs(blob, name = "download", opts) {
  if (typeof blob === "string") {
    if (corsEnabled(blob)) {
      download(blob, name, opts);
    } else {
      const a = document.createElement("a");
      a.href = blob;
      a.target = "_blank";
      setTimeout(function() {
        click(a);
      });
    }
  } else {
    navigator.msSaveOrOpenBlob(bom(blob, opts), name);
  }
}
function fileSaverSaveAs(blob, name, opts, popup) {
  popup = popup || open("", "_blank");
  if (popup) {
    popup.document.title = popup.document.body.innerText = "downloading...";
  }
  if (typeof blob === "string")
    return download(blob, name, opts);
  const force = blob.type === "application/octet-stream";
  const isSafari = /constructor/i.test(String(_global.HTMLElement)) || "safari" in _global;
  const isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((isChromeIOS || force && isSafari || isMacOSWebView) && typeof FileReader !== "undefined") {
    const reader = new FileReader();
    reader.onloadend = function() {
      let url = reader.result;
      if (typeof url !== "string") {
        popup = null;
        throw new Error("Wrong reader.result type");
      }
      url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, "data:attachment/file;");
      if (popup) {
        popup.location.href = url;
      } else {
        location.assign(url);
      }
      popup = null;
    };
    reader.readAsDataURL(blob);
  } else {
    const url = URL.createObjectURL(blob);
    if (popup)
      popup.location.assign(url);
    else
      location.href = url;
    popup = null;
    setTimeout(function() {
      URL.revokeObjectURL(url);
    }, 4e4);
  }
}
function toastMessage(message, type) {
  const piniaMessage = "🍍 " + message;
  if (typeof __VUE_DEVTOOLS_TOAST__ === "function") {
    __VUE_DEVTOOLS_TOAST__(piniaMessage, type);
  } else if (type === "error") {
    console.error(piniaMessage);
  } else if (type === "warn") {
    console.warn(piniaMessage);
  } else {
    console.log(piniaMessage);
  }
}
function isPinia(o) {
  return "_a" in o && "install" in o;
}
function checkClipboardAccess() {
  if (!("clipboard" in navigator)) {
    toastMessage(`Your browser doesn't support the Clipboard API`, "error");
    return true;
  }
}
function checkNotFocusedError(error) {
  if (error instanceof Error && error.message.toLowerCase().includes("document is not focused")) {
    toastMessage('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn");
    return true;
  }
  return false;
}
async function actionGlobalCopyState(pinia) {
  if (checkClipboardAccess())
    return;
  try {
    await navigator.clipboard.writeText(JSON.stringify(pinia.state.value));
    toastMessage("Global state copied to clipboard.");
  } catch (error) {
    if (checkNotFocusedError(error))
      return;
    toastMessage(`Failed to serialize the state. Check the console for more details.`, "error");
    console.error(error);
  }
}
async function actionGlobalPasteState(pinia) {
  if (checkClipboardAccess())
    return;
  try {
    loadStoresState(pinia, JSON.parse(await navigator.clipboard.readText()));
    toastMessage("Global state pasted from clipboard.");
  } catch (error) {
    if (checkNotFocusedError(error))
      return;
    toastMessage(`Failed to deserialize the state from clipboard. Check the console for more details.`, "error");
    console.error(error);
  }
}
async function actionGlobalSaveState(pinia) {
  try {
    saveAs(new Blob([JSON.stringify(pinia.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (error) {
    toastMessage(`Failed to export the state as JSON. Check the console for more details.`, "error");
    console.error(error);
  }
}
let fileInput;
function getFileOpener() {
  if (!fileInput) {
    fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".json";
  }
  function openFile() {
    return new Promise((resolve, reject) => {
      fileInput.onchange = async () => {
        const files = fileInput.files;
        if (!files)
          return resolve(null);
        const file = files.item(0);
        if (!file)
          return resolve(null);
        return resolve({ text: await file.text(), file });
      };
      fileInput.oncancel = () => resolve(null);
      fileInput.onerror = reject;
      fileInput.click();
    });
  }
  return openFile;
}
async function actionGlobalOpenStateFile(pinia) {
  try {
    const open2 = getFileOpener();
    const result = await open2();
    if (!result)
      return;
    const { text, file } = result;
    loadStoresState(pinia, JSON.parse(text));
    toastMessage(`Global state imported from "${file.name}".`);
  } catch (error) {
    toastMessage(`Failed to import the state from JSON. Check the console for more details.`, "error");
    console.error(error);
  }
}
function loadStoresState(pinia, state) {
  for (const key in state) {
    const storeState = pinia.state.value[key];
    if (storeState) {
      Object.assign(storeState, state[key]);
    } else {
      pinia.state.value[key] = state[key];
    }
  }
}
function formatDisplay(display) {
  return {
    _custom: {
      display
    }
  };
}
const PINIA_ROOT_LABEL = "🍍 Pinia (root)";
const PINIA_ROOT_ID = "_root";
function formatStoreForInspectorTree(store) {
  return isPinia(store) ? {
    id: PINIA_ROOT_ID,
    label: PINIA_ROOT_LABEL
  } : {
    id: store.$id,
    label: store.$id
  };
}
function formatStoreForInspectorState(store) {
  if (isPinia(store)) {
    const storeNames = Array.from(store._s.keys());
    const storeMap = store._s;
    const state2 = {
      state: storeNames.map((storeId) => ({
        editable: true,
        key: storeId,
        value: store.state.value[storeId]
      })),
      getters: storeNames.filter((id) => storeMap.get(id)._getters).map((id) => {
        const store2 = storeMap.get(id);
        return {
          editable: false,
          key: id,
          value: store2._getters.reduce((getters, key) => {
            getters[key] = store2[key];
            return getters;
          }, {})
        };
      })
    };
    return state2;
  }
  const state = {
    state: Object.keys(store.$state).map((key) => ({
      editable: true,
      key,
      value: store.$state[key]
    }))
  };
  if (store._getters && store._getters.length) {
    state.getters = store._getters.map((getterName) => ({
      editable: false,
      key: getterName,
      value: store[getterName]
    }));
  }
  if (store._customProperties.size) {
    state.customProperties = Array.from(store._customProperties).map((key) => ({
      editable: true,
      key,
      value: store[key]
    }));
  }
  return state;
}
function formatEventData(events) {
  if (!events)
    return {};
  if (Array.isArray(events)) {
    return events.reduce((data, event) => {
      data.keys.push(event.key);
      data.operations.push(event.type);
      data.oldValue[event.key] = event.oldValue;
      data.newValue[event.key] = event.newValue;
      return data;
    }, {
      oldValue: {},
      keys: [],
      operations: [],
      newValue: {}
    });
  } else {
    return {
      operation: formatDisplay(events.type),
      key: formatDisplay(events.key),
      oldValue: events.oldValue,
      newValue: events.newValue
    };
  }
}
function formatMutationType(type) {
  switch (type) {
    case MutationType.direct:
      return "mutation";
    case MutationType.patchFunction:
      return "$patch";
    case MutationType.patchObject:
      return "$patch";
    default:
      return "unknown";
  }
}
let isTimelineActive = true;
const componentStateTypes = [];
const MUTATIONS_LAYER_ID = "pinia:mutations";
const INSPECTOR_ID = "pinia";
const { assign: assign$1 } = Object;
const getStoreType = (id) => "🍍 " + id;
function registerPiniaDevtools(app, pinia) {
  setupDevtoolsPlugin({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes,
    app
  }, (api) => {
    if (typeof api.now !== "function") {
      toastMessage("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.");
    }
    api.addTimelineLayer({
      id: MUTATIONS_LAYER_ID,
      label: `Pinia 🍍`,
      color: 15064968
    });
    api.addInspector({
      id: INSPECTOR_ID,
      label: "Pinia 🍍",
      icon: "storage",
      treeFilterPlaceholder: "Search stores",
      actions: [
        {
          icon: "content_copy",
          action: () => {
            actionGlobalCopyState(pinia);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await actionGlobalPasteState(pinia);
            api.sendInspectorTree(INSPECTOR_ID);
            api.sendInspectorState(INSPECTOR_ID);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            actionGlobalSaveState(pinia);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await actionGlobalOpenStateFile(pinia);
            api.sendInspectorTree(INSPECTOR_ID);
            api.sendInspectorState(INSPECTOR_ID);
          },
          tooltip: "Import the state from a JSON file"
        }
      ],
      nodeActions: [
        {
          icon: "restore",
          tooltip: 'Reset the state (with "$reset")',
          action: (nodeId) => {
            const store = pinia._s.get(nodeId);
            if (!store) {
              toastMessage(`Cannot reset "${nodeId}" store because it wasn't found.`, "warn");
            } else if (typeof store.$reset !== "function") {
              toastMessage(`Cannot reset "${nodeId}" store because it doesn't have a "$reset" method implemented.`, "warn");
            } else {
              store.$reset();
              toastMessage(`Store "${nodeId}" reset.`);
            }
          }
        }
      ]
    });
    api.on.inspectComponent((payload, ctx) => {
      const proxy = payload.componentInstance && payload.componentInstance.proxy;
      if (proxy && proxy._pStores) {
        const piniaStores = payload.componentInstance.proxy._pStores;
        Object.values(piniaStores).forEach((store) => {
          payload.instanceData.state.push({
            type: getStoreType(store.$id),
            key: "state",
            editable: true,
            value: store._isOptionsAPI ? {
              _custom: {
                value: toRaw(store.$state),
                actions: [
                  {
                    icon: "restore",
                    tooltip: "Reset the state of this store",
                    action: () => store.$reset()
                  }
                ]
              }
            } : (
              // NOTE: workaround to unwrap transferred refs
              Object.keys(store.$state).reduce((state, key) => {
                state[key] = store.$state[key];
                return state;
              }, {})
            )
          });
          if (store._getters && store._getters.length) {
            payload.instanceData.state.push({
              type: getStoreType(store.$id),
              key: "getters",
              editable: false,
              value: store._getters.reduce((getters, key) => {
                try {
                  getters[key] = store[key];
                } catch (error) {
                  getters[key] = error;
                }
                return getters;
              }, {})
            });
          }
        });
      }
    });
    api.on.getInspectorTree((payload) => {
      if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
        let stores = [pinia];
        stores = stores.concat(Array.from(pinia._s.values()));
        payload.rootNodes = (payload.filter ? stores.filter((store) => "$id" in store ? store.$id.toLowerCase().includes(payload.filter.toLowerCase()) : PINIA_ROOT_LABEL.toLowerCase().includes(payload.filter.toLowerCase())) : stores).map(formatStoreForInspectorTree);
      }
    });
    api.on.getInspectorState((payload) => {
      if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
        const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
        if (!inspectedStore) {
          return;
        }
        if (inspectedStore) {
          payload.state = formatStoreForInspectorState(inspectedStore);
        }
      }
    });
    api.on.editInspectorState((payload, ctx) => {
      if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
        const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
        if (!inspectedStore) {
          return toastMessage(`store "${payload.nodeId}" not found`, "error");
        }
        const { path } = payload;
        if (!isPinia(inspectedStore)) {
          if (path.length !== 1 || !inspectedStore._customProperties.has(path[0]) || path[0] in inspectedStore.$state) {
            path.unshift("$state");
          }
        } else {
          path.unshift("state");
        }
        isTimelineActive = false;
        payload.set(inspectedStore, path, payload.state.value);
        isTimelineActive = true;
      }
    });
    api.on.editComponentState((payload) => {
      if (payload.type.startsWith("🍍")) {
        const storeId = payload.type.replace(/^🍍\s*/, "");
        const store = pinia._s.get(storeId);
        if (!store) {
          return toastMessage(`store "${storeId}" not found`, "error");
        }
        const { path } = payload;
        if (path[0] !== "state") {
          return toastMessage(`Invalid path for store "${storeId}":
${path}
Only state can be modified.`);
        }
        path[0] = "$state";
        isTimelineActive = false;
        payload.set(store, path, payload.state.value);
        isTimelineActive = true;
      }
    });
  });
}
function addStoreToDevtools(app, store) {
  if (!componentStateTypes.includes(getStoreType(store.$id))) {
    componentStateTypes.push(getStoreType(store.$id));
  }
  setupDevtoolsPlugin({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes,
    app,
    settings: {
      logStoreChanges: {
        label: "Notify about new/deleted stores",
        type: "boolean",
        defaultValue: true
      }
      // useEmojis: {
      //   label: 'Use emojis in messages ⚡️',
      //   type: 'boolean',
      //   defaultValue: true,
      // },
    }
  }, (api) => {
    const now2 = typeof api.now === "function" ? api.now.bind(api) : Date.now;
    store.$onAction(({ after, onError, name, args }) => {
      const groupId = runningActionId++;
      api.addTimelineEvent({
        layerId: MUTATIONS_LAYER_ID,
        event: {
          time: now2(),
          title: "🛫 " + name,
          subtitle: "start",
          data: {
            store: formatDisplay(store.$id),
            action: formatDisplay(name),
            args
          },
          groupId
        }
      });
      after((result) => {
        activeAction = void 0;
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "🛬 " + name,
            subtitle: "end",
            data: {
              store: formatDisplay(store.$id),
              action: formatDisplay(name),
              args,
              result
            },
            groupId
          }
        });
      });
      onError((error) => {
        activeAction = void 0;
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            logType: "error",
            title: "💥 " + name,
            subtitle: "end",
            data: {
              store: formatDisplay(store.$id),
              action: formatDisplay(name),
              args,
              error
            },
            groupId
          }
        });
      });
    }, true);
    store._customProperties.forEach((name) => {
      watch(() => unref(store[name]), (newValue, oldValue) => {
        api.notifyComponentUpdate();
        api.sendInspectorState(INSPECTOR_ID);
        if (isTimelineActive) {
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now2(),
              title: "Change",
              subtitle: name,
              data: {
                newValue,
                oldValue
              },
              groupId: activeAction
            }
          });
        }
      }, { deep: true });
    });
    store.$subscribe(({ events, type }, state) => {
      api.notifyComponentUpdate();
      api.sendInspectorState(INSPECTOR_ID);
      if (!isTimelineActive)
        return;
      const eventData = {
        time: now2(),
        title: formatMutationType(type),
        data: assign$1({ store: formatDisplay(store.$id) }, formatEventData(events)),
        groupId: activeAction
      };
      if (type === MutationType.patchFunction) {
        eventData.subtitle = "⤵️";
      } else if (type === MutationType.patchObject) {
        eventData.subtitle = "🧩";
      } else if (events && !Array.isArray(events)) {
        eventData.subtitle = events.type;
      }
      if (events) {
        eventData.data["rawEvent(s)"] = {
          _custom: {
            display: "DebuggerEvent",
            type: "object",
            tooltip: "raw DebuggerEvent[]",
            value: events
          }
        };
      }
      api.addTimelineEvent({
        layerId: MUTATIONS_LAYER_ID,
        event: eventData
      });
    }, { detached: true, flush: "sync" });
    const hotUpdate = store._hotUpdate;
    store._hotUpdate = markRaw((newStore) => {
      hotUpdate(newStore);
      api.addTimelineEvent({
        layerId: MUTATIONS_LAYER_ID,
        event: {
          time: now2(),
          title: "🔥 " + store.$id,
          subtitle: "HMR update",
          data: {
            store: formatDisplay(store.$id),
            info: formatDisplay(`HMR update`)
          }
        }
      });
      api.notifyComponentUpdate();
      api.sendInspectorTree(INSPECTOR_ID);
      api.sendInspectorState(INSPECTOR_ID);
    });
    const { $dispose } = store;
    store.$dispose = () => {
      $dispose();
      api.notifyComponentUpdate();
      api.sendInspectorTree(INSPECTOR_ID);
      api.sendInspectorState(INSPECTOR_ID);
      api.getSettings().logStoreChanges && toastMessage(`Disposed "${store.$id}" store 🗑`);
    };
    api.notifyComponentUpdate();
    api.sendInspectorTree(INSPECTOR_ID);
    api.sendInspectorState(INSPECTOR_ID);
    api.getSettings().logStoreChanges && toastMessage(`"${store.$id}" store installed 🆕`);
  });
}
let runningActionId = 0;
let activeAction;
function patchActionForGrouping(store, actionNames, wrapWithProxy) {
  const actions = actionNames.reduce((storeActions, actionName) => {
    storeActions[actionName] = toRaw(store)[actionName];
    return storeActions;
  }, {});
  for (const actionName in actions) {
    store[actionName] = function() {
      const _actionId = runningActionId;
      const trackedStore = wrapWithProxy ? new Proxy(store, {
        get(...args) {
          activeAction = _actionId;
          return Reflect.get(...args);
        },
        set(...args) {
          activeAction = _actionId;
          return Reflect.set(...args);
        }
      }) : store;
      activeAction = _actionId;
      const retValue = actions[actionName].apply(trackedStore, arguments);
      activeAction = void 0;
      return retValue;
    };
  }
}
function devtoolsPlugin({ app, store, options }) {
  if (store.$id.startsWith("__hot:")) {
    return;
  }
  store._isOptionsAPI = !!options.state;
  patchActionForGrouping(store, Object.keys(options.actions), store._isOptionsAPI);
  const originalHotUpdate = store._hotUpdate;
  toRaw(store)._hotUpdate = function(newStore) {
    originalHotUpdate.apply(this, arguments);
    patchActionForGrouping(store, Object.keys(newStore._hmrPayload.actions), !!store._isOptionsAPI);
  };
  addStoreToDevtools(
    app,
    // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
    store
  );
}
function createPinia() {
  const scope = effectScope(true);
  const state = scope.run(() => ref({}));
  let _p = [];
  let toBeInstalled = [];
  const pinia = markRaw({
    install(app) {
      setActivePinia(pinia);
      {
        pinia._a = app;
        app.provide(piniaSymbol, pinia);
        app.config.globalProperties.$pinia = pinia;
        if (USE_DEVTOOLS) {
          registerPiniaDevtools(app, pinia);
        }
        toBeInstalled.forEach((plugin) => _p.push(plugin));
        toBeInstalled = [];
      }
    },
    use(plugin) {
      if (!this._a && !isVue2) {
        toBeInstalled.push(plugin);
      } else {
        _p.push(plugin);
      }
      return this;
    },
    _p,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: scope,
    _s: /* @__PURE__ */ new Map(),
    state
  });
  if (USE_DEVTOOLS && typeof Proxy !== "undefined") {
    pinia.use(devtoolsPlugin);
  }
  return pinia;
}
function patchObject(newState, oldState) {
  for (const key in oldState) {
    const subPatch = oldState[key];
    if (!(key in newState)) {
      continue;
    }
    const targetValue = newState[key];
    if (isPlainObject(targetValue) && isPlainObject(subPatch) && !isRef(subPatch) && !isReactive(subPatch)) {
      newState[key] = patchObject(targetValue, subPatch);
    } else {
      {
        newState[key] = subPatch;
      }
    }
  }
  return newState;
}
const noop$1 = () => {
};
function addSubscription(subscriptions, callback, detached, onCleanup = noop$1) {
  subscriptions.push(callback);
  const removeSubscription = () => {
    const idx = subscriptions.indexOf(callback);
    if (idx > -1) {
      subscriptions.splice(idx, 1);
      onCleanup();
    }
  };
  if (!detached && getCurrentScope()) {
    onScopeDispose(removeSubscription);
  }
  return removeSubscription;
}
function triggerSubscriptions(subscriptions, ...args) {
  subscriptions.slice().forEach((callback) => {
    callback(...args);
  });
}
const fallbackRunWithContext = (fn) => fn();
function mergeReactiveObjects(target, patchToApply) {
  if (target instanceof Map && patchToApply instanceof Map) {
    patchToApply.forEach((value, key) => target.set(key, value));
  }
  if (target instanceof Set && patchToApply instanceof Set) {
    patchToApply.forEach(target.add, target);
  }
  for (const key in patchToApply) {
    if (!patchToApply.hasOwnProperty(key))
      continue;
    const subPatch = patchToApply[key];
    const targetValue = target[key];
    if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !isRef(subPatch) && !isReactive(subPatch)) {
      target[key] = mergeReactiveObjects(targetValue, subPatch);
    } else {
      target[key] = subPatch;
    }
  }
  return target;
}
const skipHydrateSymbol = Symbol("pinia:skipHydration");
function shouldHydrate(obj) {
  return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
}
const { assign: assign$2 } = Object;
function isComputed(o) {
  return !!(isRef(o) && o.effect);
}
function createOptionsStore(id, options, pinia, hot) {
  const { state, actions, getters } = options;
  const initialState = pinia.state.value[id];
  let store;
  function setup() {
    if (!initialState && !hot) {
      {
        pinia.state.value[id] = state ? state() : {};
      }
    }
    const localState = hot ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      toRefs(ref(state ? state() : {}).value)
    ) : toRefs(pinia.state.value[id]);
    return assign$2(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
      if (name in localState) {
        console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${name}" in store "${id}".`);
      }
      computedGetters[name] = markRaw(computed(() => {
        setActivePinia(pinia);
        const store2 = pinia._s.get(id);
        return getters[name].call(store2, store2);
      }));
      return computedGetters;
    }, {}));
  }
  store = createSetupStore(id, setup, options, pinia, hot, true);
  return store;
}
function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
  let scope;
  const optionsForPlugin = assign$2({ actions: {} }, options);
  if (!pinia._e.active) {
    throw new Error("Pinia destroyed");
  }
  const $subscribeOptions = {
    deep: true
    // flush: 'post',
  };
  {
    $subscribeOptions.onTrigger = (event) => {
      if (isListening) {
        debuggerEvents = event;
      } else if (isListening == false && !store._hotUpdating) {
        if (Array.isArray(debuggerEvents)) {
          debuggerEvents.push(event);
        } else {
          console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug.");
        }
      }
    };
  }
  let isListening;
  let isSyncListening;
  let subscriptions = [];
  let actionSubscriptions = [];
  let debuggerEvents;
  const initialState = pinia.state.value[$id];
  if (!isOptionsStore && !initialState && !hot) {
    {
      pinia.state.value[$id] = {};
    }
  }
  const hotState = ref({});
  let activeListener;
  function $patch(partialStateOrMutator) {
    let subscriptionMutation;
    isListening = isSyncListening = false;
    {
      debuggerEvents = [];
    }
    if (typeof partialStateOrMutator === "function") {
      partialStateOrMutator(pinia.state.value[$id]);
      subscriptionMutation = {
        type: MutationType.patchFunction,
        storeId: $id,
        events: debuggerEvents
      };
    } else {
      mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
      subscriptionMutation = {
        type: MutationType.patchObject,
        payload: partialStateOrMutator,
        storeId: $id,
        events: debuggerEvents
      };
    }
    const myListenerId = activeListener = Symbol();
    nextTick().then(() => {
      if (activeListener === myListenerId) {
        isListening = true;
      }
    });
    isSyncListening = true;
    triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
  }
  const $reset = isOptionsStore ? function $reset2() {
    const { state } = options;
    const newState = state ? state() : {};
    this.$patch(($state) => {
      assign$2($state, newState);
    });
  } : (
    /* istanbul ignore next */
    () => {
      throw new Error(`🍍: Store "${$id}" is built using the setup syntax and does not implement $reset().`);
    }
  );
  function $dispose() {
    scope.stop();
    subscriptions = [];
    actionSubscriptions = [];
    pinia._s.delete($id);
  }
  function wrapAction(name, action) {
    return function() {
      setActivePinia(pinia);
      const args = Array.from(arguments);
      const afterCallbackList = [];
      const onErrorCallbackList = [];
      function after(callback) {
        afterCallbackList.push(callback);
      }
      function onError(callback) {
        onErrorCallbackList.push(callback);
      }
      triggerSubscriptions(actionSubscriptions, {
        args,
        name,
        store,
        after,
        onError
      });
      let ret;
      try {
        ret = action.apply(this && this.$id === $id ? this : store, args);
      } catch (error) {
        triggerSubscriptions(onErrorCallbackList, error);
        throw error;
      }
      if (ret instanceof Promise) {
        return ret.then((value) => {
          triggerSubscriptions(afterCallbackList, value);
          return value;
        }).catch((error) => {
          triggerSubscriptions(onErrorCallbackList, error);
          return Promise.reject(error);
        });
      }
      triggerSubscriptions(afterCallbackList, ret);
      return ret;
    };
  }
  const _hmrPayload = /* @__PURE__ */ markRaw({
    actions: {},
    getters: {},
    state: [],
    hotState
  });
  const partialStore = {
    _p: pinia,
    // _s: scope,
    $id,
    $onAction: addSubscription.bind(null, actionSubscriptions),
    $patch,
    $reset,
    $subscribe(callback, options2 = {}) {
      const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
      const stopWatcher = scope.run(() => watch(() => pinia.state.value[$id], (state) => {
        if (options2.flush === "sync" ? isSyncListening : isListening) {
          callback({
            storeId: $id,
            type: MutationType.direct,
            events: debuggerEvents
          }, state);
        }
      }, assign$2({}, $subscribeOptions, options2)));
      return removeSubscription;
    },
    $dispose
  };
  const store = reactive(assign$2(
    {
      _hmrPayload,
      _customProperties: markRaw(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    partialStore
    // must be added later
    // setupStore
  ));
  pinia._s.set($id, store);
  const runWithContext = pinia._a && pinia._a.runWithContext || fallbackRunWithContext;
  const setupStore = runWithContext(() => pinia._e.run(() => (scope = effectScope()).run(setup)));
  for (const key in setupStore) {
    const prop = setupStore[key];
    if (isRef(prop) && !isComputed(prop) || isReactive(prop)) {
      if (hot) {
        set(hotState.value, key, toRef(setupStore, key));
      } else if (!isOptionsStore) {
        if (initialState && shouldHydrate(prop)) {
          if (isRef(prop)) {
            prop.value = initialState[key];
          } else {
            mergeReactiveObjects(prop, initialState[key]);
          }
        }
        {
          pinia.state.value[$id][key] = prop;
        }
      }
      {
        _hmrPayload.state.push(key);
      }
    } else if (typeof prop === "function") {
      const actionValue = hot ? prop : wrapAction(key, prop);
      {
        setupStore[key] = actionValue;
      }
      {
        _hmrPayload.actions[key] = prop;
      }
      optionsForPlugin.actions[key] = prop;
    } else {
      if (isComputed(prop)) {
        _hmrPayload.getters[key] = isOptionsStore ? (
          // @ts-expect-error
          options.getters[key]
        ) : prop;
        if (IS_CLIENT) {
          const getters = setupStore._getters || // @ts-expect-error: same
          (setupStore._getters = markRaw([]));
          getters.push(key);
        }
      }
    }
  }
  {
    assign$2(store, setupStore);
    assign$2(toRaw(store), setupStore);
  }
  Object.defineProperty(store, "$state", {
    get: () => hot ? hotState.value : pinia.state.value[$id],
    set: (state) => {
      if (hot) {
        throw new Error("cannot set hotState");
      }
      $patch(($state) => {
        assign$2($state, state);
      });
    }
  });
  {
    store._hotUpdate = markRaw((newStore) => {
      store._hotUpdating = true;
      newStore._hmrPayload.state.forEach((stateKey) => {
        if (stateKey in store.$state) {
          const newStateTarget = newStore.$state[stateKey];
          const oldStateSource = store.$state[stateKey];
          if (typeof newStateTarget === "object" && isPlainObject(newStateTarget) && isPlainObject(oldStateSource)) {
            patchObject(newStateTarget, oldStateSource);
          } else {
            newStore.$state[stateKey] = oldStateSource;
          }
        }
        set(store, stateKey, toRef(newStore.$state, stateKey));
      });
      Object.keys(store.$state).forEach((stateKey) => {
        if (!(stateKey in newStore.$state)) {
          del(store, stateKey);
        }
      });
      isListening = false;
      isSyncListening = false;
      pinia.state.value[$id] = toRef(newStore._hmrPayload, "hotState");
      isSyncListening = true;
      nextTick().then(() => {
        isListening = true;
      });
      for (const actionName in newStore._hmrPayload.actions) {
        const action = newStore[actionName];
        set(store, actionName, wrapAction(actionName, action));
      }
      for (const getterName in newStore._hmrPayload.getters) {
        const getter = newStore._hmrPayload.getters[getterName];
        const getterValue = isOptionsStore ? (
          // special handling of options api
          computed(() => {
            setActivePinia(pinia);
            return getter.call(store, store);
          })
        ) : getter;
        set(store, getterName, getterValue);
      }
      Object.keys(store._hmrPayload.getters).forEach((key) => {
        if (!(key in newStore._hmrPayload.getters)) {
          del(store, key);
        }
      });
      Object.keys(store._hmrPayload.actions).forEach((key) => {
        if (!(key in newStore._hmrPayload.actions)) {
          del(store, key);
        }
      });
      store._hmrPayload = newStore._hmrPayload;
      store._getters = newStore._getters;
      store._hotUpdating = false;
    });
  }
  if (USE_DEVTOOLS) {
    const nonEnumerable = {
      writable: true,
      configurable: true,
      // avoid warning on devtools trying to display this property
      enumerable: false
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((p) => {
      Object.defineProperty(store, p, assign$2({ value: store[p] }, nonEnumerable));
    });
  }
  pinia._p.forEach((extender) => {
    if (USE_DEVTOOLS) {
      const extensions = scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      }));
      Object.keys(extensions || {}).forEach((key) => store._customProperties.add(key));
      assign$2(store, extensions);
    } else {
      assign$2(store, scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      })));
    }
  });
  if (store.$state && typeof store.$state === "object" && typeof store.$state.constructor === "function" && !store.$state.constructor.toString().includes("[native code]")) {
    console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${store.$id}".`);
  }
  if (initialState && isOptionsStore && options.hydrate) {
    options.hydrate(store.$state, initialState);
  }
  isListening = true;
  isSyncListening = true;
  return store;
}
function defineStore(idOrOptions, setup, setupOptions) {
  let id;
  let options;
  const isSetupStore = typeof setup === "function";
  if (typeof idOrOptions === "string") {
    id = idOrOptions;
    options = isSetupStore ? setupOptions : setup;
  } else {
    options = idOrOptions;
    id = idOrOptions.id;
    if (typeof id !== "string") {
      throw new Error(`[🍍]: "defineStore()" must be passed a store id as its first argument.`);
    }
  }
  function useStore(pinia, hot) {
    const hasContext = hasInjectionContext();
    pinia = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    pinia || (hasContext ? inject(piniaSymbol, null) : null);
    if (pinia)
      setActivePinia(pinia);
    if (!activePinia) {
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    }
    pinia = activePinia;
    if (!pinia._s.has(id)) {
      if (isSetupStore) {
        createSetupStore(id, setup, options, pinia);
      } else {
        createOptionsStore(id, options, pinia);
      }
      {
        useStore._pinia = pinia;
      }
    }
    const store = pinia._s.get(id);
    if (hot) {
      const hotId = "__hot:" + id;
      const newStore = isSetupStore ? createSetupStore(hotId, setup, options, pinia, true) : createOptionsStore(hotId, assign$2({}, options), pinia, true);
      hot._hotUpdate(newStore);
      delete pinia.state.value[hotId];
      pinia._s.delete(hotId);
    }
    if (IS_CLIENT) {
      const currentInstance = getCurrentInstance();
      if (currentInstance && currentInstance.proxy && // avoid adding stores that are just built for hot module replacement
      !hot) {
        const vm = currentInstance.proxy;
        const cache = "_pStores" in vm ? vm._pStores : vm._pStores = {};
        cache[id] = store;
      }
    }
    return store;
  }
  useStore.$id = id;
  return useStore;
}
function forgeNewUserId() {
  const date = Date.now().toString(36);
  const randomNumber = Math.random().toString(36).substr(2, 5);
  return (date + randomNumber).toUpperCase();
}
const tockEndpointKey = Symbol("tockEndpointKey");
var MessageAuthor = /* @__PURE__ */ ((MessageAuthor2) => {
  MessageAuthor2["bot"] = "bot";
  MessageAuthor2["user"] = "user";
  MessageAuthor2["app"] = "app";
  return MessageAuthor2;
})(MessageAuthor || {});
var MessageType = /* @__PURE__ */ ((MessageType2) => {
  MessageType2["message"] = "message";
  MessageType2["card"] = "card";
  MessageType2["carousel"] = "carousel";
  MessageType2["image"] = "image";
  MessageType2["loader"] = "loader";
  MessageType2["error"] = "error";
  MessageType2["info"] = "info";
  return MessageType2;
})(MessageType || {});
function isObject(value) {
  return !!(value && typeof value === "object" && !Array.isArray(value));
}
function humanFileSize(bytes, si = true, dp = 1) {
  const thresh = si ? 1e3 : 1024;
  if (Math.abs(bytes) < thresh) {
    return bytes + " B";
  }
  const units = si ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"] : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  let u = -1;
  const r = 10 ** dp;
  do {
    bytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);
  return bytes.toFixed(dp) + " " + units[u];
}
function mergeDeep(target, ...sources) {
  if (!sources.length)
    return target;
  const source = sources.shift();
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key])
          Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }
  return mergeDeep(target, ...sources);
}
const localStorage$1 = {
  enabled: {
    title: "Local storage",
    type: "boolean",
    default: false,
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
};
const initialization = {
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
};
const preferences = {
  messages: {
    hideIfNoMessages: {
      title: "Hide messages if no messages",
      type: "boolean",
      default: true,
      description: "Hide messages container if there is no messages to display.",
      index: 20
    },
    clearOnNewRequest: {
      title: "Clear on new request",
      type: "boolean",
      default: false,
      description: "If true, deletes previous messages when a new user request is sent",
      index: 21
    },
    message: {
      hideUserMessages: {
        title: "Hide user messages",
        type: "boolean",
        default: false,
        description: "If true, user messages are not displayed.",
        index: 22
      },
      header: {
        display: {
          title: "Display header",
          type: "boolean",
          default: true,
          description: "Display a header above message.",
          index: 1
        },
        avatar: {
          display: {
            title: "Display header avatar",
            type: "boolean",
            default: true,
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
            default: true,
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
        default: true,
        description: "For RAG answers, display the sources used to generate the answer if any.",
        index: 50
      },
      requireSourcesContent: {
        title: "Request textual content of sources",
        type: "boolean",
        default: false,
        description: "For RAG answers, request the textual content of the source in addition to the source title and link.",
        index: 51,
        conditions: ["preferences.messages.footNotes.display"]
      },
      clampSourceContent: {
        title: "Clamp content of sources",
        type: "boolean",
        default: true,
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
        default: false,
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
      default: true,
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
        default: true,
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
    uploadFiles: {
      allow: {
        title: "Allow files upload",
        type: "boolean",
        default: true,
        description: "Allow user to upload files",
        index: 73
      },
      maxFiles: {
        title: "Max upload files",
        type: "number",
        default: 15,
        description: "Maximum number of files a user can upload",
        index: 74,
        conditions: ["preferences.questionBar.uploadFiles.allow"]
      },
      maxFileSize: {
        title: "Max upload file size",
        type: "number",
        default: 5e7,
        description: "Maximum file size a user can upload (in bytes)",
        index: 74,
        conditions: ["preferences.questionBar.uploadFiles.allow"]
      },
      displayButton: {
        title: "Show files upload button",
        type: "boolean",
        default: true,
        description: "Displays the control allowing the user to browse the files to be uploaded. If the control is not displayed, but uploading is allowed, drag-and-drop functionality remains available.",
        index: 75,
        conditions: ["preferences.questionBar.uploadFiles.allow"]
      },
      icon: {
        title: "Upload files button icon",
        type: "string",
        default: "bi bi-paperclip",
        description: "Class name of the files upload control icon (displayed only if no image is defined)",
        index: 76,
        conditions: [
          "preferences.questionBar.uploadFiles.allow",
          "preferences.questionBar.uploadFiles.displayButton"
        ]
      },
      image: {
        title: "Upload files button image",
        type: "ImageDef",
        default: void 0,
        description: "Image of the files upload control",
        index: 77,
        conditions: [
          "preferences.questionBar.uploadFiles.allow",
          "preferences.questionBar.uploadFiles.displayButton"
        ]
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
};
const wording = {
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
          title: "Footnotes label",
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
    uploadBrowseButtonLabel: {
      title: "Files browse button label",
      type: "string",
      default: "",
      description: void 0
    },
    uploadBrowseButtonAriaLabel: {
      title: "Files browse button Aria label",
      type: "string",
      default: "Upload files",
      description: void 0
    },
    uploadFilesList: {
      uploadSubmit: {
        title: "Files upload submit button label",
        type: "string",
        default: "Upload files",
        description: void 0
      },
      uploadCancel: {
        title: "Files upload cancel button label",
        type: "string",
        default: "Cancel",
        description: void 0
      },
      filesNumberLimitWarning: {
        title: "Number of files exceeded warning",
        type: "string",
        default: "The number of uploadable files is limited to ",
        description: void 0
      },
      filesFormatWarning: {
        title: "Unsupported file format warning",
        type: "string",
        default: "This file format is not supported",
        description: void 0
      },
      filesSizeWarning: {
        title: "File size warning",
        type: "string",
        default: "This file is too big",
        description: void 0
      },
      fileUploadLoading: {
        title: "File upload progress info",
        type: "string",
        default: "In progress",
        description: void 0
      },
      fileUploadError: {
        title: "File upload error info",
        type: "string",
        default: "Upload error",
        description: void 0
      },
      fileUploadCompleted: {
        title: "File upload completed info",
        type: "string",
        default: "Complete",
        description: void 0
      },
      fileUploadConfirmationMessage: {
        title: "Upload confirmation message",
        type: "string",
        description: "Confirmation message displayed after an upload of file(s). Html allowed.",
        default: "The file transfer is complete.<br>You can now query the corpus of documents provided."
      },
      fileUploadConfirmationMessageWithErrors: {
        title: "Upload confirmation message with errors",
        type: "string",
        description: "Confirmation message displayed after an upload of file(s) with some transfer errors. Html allowed.",
        default: "The file transfer is complete, but errors have occurred.<br>You can now query the correctly transferred documents.<br>Files whose transfer failed :<br>"
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
};
const appOptionsModel = {
  localStorage: localStorage$1,
  initialization,
  preferences,
  wording
};
function isOptionDefinition(object) {
  return "type" in object && "default" in object && "title" in object && "description" in object;
}
function extractDefaultAppOptions(object, target = {}) {
  if (isObject(object)) {
    if (isOptionDefinition(object)) {
      return object.default;
    } else {
      const entries = Object.entries(object);
      for (let i = 0; i < entries.length; i++) {
        const [objectKey, objectValue] = entries[i];
        target[objectKey] = extractDefaultAppOptions(objectValue);
      }
      return target;
    }
  }
}
const _appOptionsSingleton = class _appOptionsSingleton {
  constructor(options) {
    __publicField(this, "options");
    const defaultOptions = extractDefaultAppOptions(appOptionsModel);
    this.options = mergeDeep(defaultOptions, options);
  }
  static clearInstance() {
    if (_appOptionsSingleton.instance) {
      _appOptionsSingleton.instance = void 0;
    }
  }
  static setOptions(options) {
    _appOptionsSingleton.instance = new _appOptionsSingleton(options);
  }
  static getOptions() {
    if (!_appOptionsSingleton.instance) {
      throw new Error("No TVK instance avalaible.");
    }
    return _appOptionsSingleton.instance.options;
  }
};
__publicField(_appOptionsSingleton, "instance");
let appOptionsSingleton = _appOptionsSingleton;
var FileUploadStatus = /* @__PURE__ */ ((FileUploadStatus2) => {
  FileUploadStatus2["pending"] = "pending";
  FileUploadStatus2["loading"] = "loading";
  FileUploadStatus2["error"] = "error";
  FileUploadStatus2["completed"] = "completed";
  return FileUploadStatus2;
})(FileUploadStatus || {});
const allowedFilesTypes = [
  { label: "json", mimetype: "application/json" },
  { label: "csv", mimetype: "text/csv" },
  { label: "html", mimetype: "text/html" },
  { label: "pdf", mimetype: "application/pdf" },
  { label: "txt", mimetype: "text/plain" },
  { label: "rtf", mimetype: "application/rtf" },
  { label: "odt", mimetype: "application/vnd.oasis.opendocument.text" },
  { label: "doc", mimetype: "application/msword" },
  {
    label: "docx",
    mimetype: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  }
];
class UploadableFile {
  constructor(file) {
    __publicField(this, "file");
    __publicField(this, "name");
    __publicField(this, "size");
    __publicField(this, "sizeAllowed");
    __publicField(this, "mimetype");
    __publicField(this, "typeAllowed");
    __publicField(this, "typelabel");
    __publicField(this, "id");
    __publicField(this, "url");
    __publicField(this, "status");
    const appOptions = appOptionsSingleton.getOptions();
    this.file = file;
    this.name = file.name;
    this.size = file.size;
    this.sizeAllowed = file.size <= appOptions.preferences.questionBar.uploadFiles.maxFileSize;
    this.mimetype = file.type;
    const supportedType = allowedFilesTypes.find(
      (aft) => aft.mimetype === file.type
    );
    this.typeAllowed = !!supportedType;
    this.typelabel = supportedType == null ? void 0 : supportedType.label;
    this.id = `${file.name}-${file.size}-${file.lastModified}-${file.type}`;
    this.url = URL.createObjectURL(file);
    this.status = "pending";
  }
}
function uploadFilesListHandler() {
  const mainStore = useMainStore();
  const appOptions = appOptionsSingleton.getOptions();
  const files = ref([]);
  function addFiles(newFiles) {
    let newUploadableFiles = [...newFiles].map((file) => new UploadableFile(file)).filter((file) => !fileExists(file.id));
    files.value = files.value.concat(newUploadableFiles);
  }
  function fileExists(otherId) {
    return files.value.some(({ id }) => id === otherId);
  }
  function removeFile(file) {
    const index = files.value.indexOf(file);
    if (index > -1)
      files.value.splice(index, 1);
  }
  function removeAllFiles() {
    files.value = [];
  }
  function uploadFiles() {
    files.value = files.value.filter((file) => {
      return file.sizeAllowed && file.typeAllowed;
    });
    if (files.value.length > appOptions.preferences.questionBar.uploadFiles.maxFiles) {
      files.value.length = appOptions.preferences.questionBar.uploadFiles.maxFiles;
    }
    return Promise.allSettled(
      files.value.map((file) => mainStore.postFile(file))
    );
  }
  return { files, addFiles, removeFile, removeAllFiles, uploadFiles };
}
const MAIN_STORE_NAME = "main";
const STORE_NAME = "main_storage";
const initNewState = () => ({
  userId: forgeNewUserId(),
  messages: []
});
const useMainStore = defineStore(MAIN_STORE_NAME, () => {
  const tockEndPoint = inject(tockEndpointKey);
  const appOptions = appOptionsSingleton.getOptions();
  const state = ref(getState());
  function updateApplication() {
  }
  function getState() {
    if (appOptions.localStorage.enabled) {
      const storedState = getStoredState();
      if (storedState)
        return storedState;
    }
    return initNewState();
  }
  function getStoredState() {
    if (!appOptions.localStorage.enabled)
      return false;
    const storage = localStorage.getItem(getStorageKey());
    if (storage)
      return JSON.parse(storage);
    return false;
  }
  function getStorageKey() {
    let storageKey = STORE_NAME;
    if (appOptions.localStorage.prefix) {
      storageKey = `${STORE_NAME}_${appOptions.localStorage.prefix}`;
    }
    return storageKey;
  }
  const getMessages = computed(
    () => state.value.messages
  );
  function clearLoaderMessages() {
    state.value.messages = state.value.messages.filter((mssg) => {
      return mssg.type !== MessageType.loader;
    });
  }
  function scrollMessages() {
  }
  function addMessage(message) {
    const mainStoreInstance = useMainStore();
    mainStoreInstance.clearLoaderMessages();
    mainStoreInstance.scrollMessages();
    state.value.messages.push(message);
  }
  function getHeaders() {
    const headers = new Headers({ "Content-Type": "application/json" });
    if (appOptions.initialization.extraHeaders) {
      Object.entries(appOptions.initialization.extraHeaders).forEach(
        (entry) => {
          headers.append(entry[0], entry[1]);
        }
      );
    }
    return headers;
  }
  function notifyError() {
    const mainStoreInstance = useMainStore();
    mainStoreInstance.addMessage({
      type: MessageType.error,
      author: MessageAuthor.app,
      date: Date.now(),
      text: appOptions.wording.questionBar.uploadFilesList.fileUploadConfirmationMessage
    });
  }
  async function sendUserMessage(message, addToHistory = true) {
    const mainStoreInstance = useMainStore();
    if (appOptions.preferences.messages.clearOnNewRequest) {
      state.value.messages = [];
    }
    if (addToHistory) {
      mainStoreInstance.addMessage({
        type: MessageType.message,
        author: MessageAuthor.user,
        text: message,
        date: Date.now()
      });
    }
    mainStoreInstance.addMessage({
      type: MessageType.loader,
      author: MessageAuthor.app,
      date: Date.now()
    });
    const locale = navigator.language;
    const payload = {
      query: message,
      userId: state.value.userId,
      locale,
      sourceWithContent: appOptions.preferences.messages.footNotes.requireSourcesContent
    };
    let query;
    try {
      query = await fetch(tockEndPoint, {
        method: "post",
        body: JSON.stringify(payload),
        headers: getHeaders()
      });
    } catch (error) {
      console.log(error);
      notifyError();
      return;
    }
    if (!query.ok) {
      console.log(query);
      notifyError();
      return;
    }
    let res;
    try {
      res = await query.json();
    } catch (error) {
      console.log(error);
      notifyError();
      return;
    }
    mainStoreInstance.clearLoaderMessages();
    res.responses.forEach((response) => {
      delete response.type;
      delete response.version;
      if ("text" in response) {
        mainStoreInstance.addMessage({
          type: MessageType.message,
          author: MessageAuthor.bot,
          date: Date.now(),
          ...response
        });
      } else if ("card" in response) {
        mainStoreInstance.addMessage({
          type: MessageType.card,
          author: MessageAuthor.bot,
          date: Date.now(),
          ...response.card
        });
      } else if ("image" in response) {
        mainStoreInstance.addMessage({
          type: MessageType.image,
          author: MessageAuthor.bot,
          date: Date.now(),
          ...response.image
        });
      } else if ("carousel" in response) {
        mainStoreInstance.addMessage({
          type: MessageType.carousel,
          author: MessageAuthor.bot,
          date: Date.now(),
          ...response.carousel
        });
      }
    });
    if (appOptions.localStorage.enabled) {
      let stateCopy = JSON.stringify(state.value);
      if (appOptions.localStorage.maxNumberMessages && state.value.messages.length > appOptions.localStorage.maxNumberMessages) {
        const stateRevived = JSON.parse(stateCopy);
        const startIndex = stateRevived.messages.length - parseInt(
          appOptions.localStorage.maxNumberMessages
        );
        if (startIndex) {
          stateRevived.messages = stateRevived.messages.slice(
            startIndex,
            stateRevived.messages.length + 1
          );
        }
        stateCopy = JSON.stringify(stateRevived);
      }
      localStorage.setItem(getStorageKey(), stateCopy);
    }
  }
  async function postFile(file) {
    let endpointUrl = "https://httpbin.org/post";
    const locale = navigator.language;
    let formData = new FormData();
    formData.append("locale", locale);
    formData.append("userId", state.value.userId);
    formData.append("file", file.file);
    file.status = FileUploadStatus.loading;
    let response;
    try {
      response = await fetch(endpointUrl, {
        method: "POST",
        body: formData,
        headers: getHeaders()
      });
    } catch (error) {
      console.log(response);
      file.status = FileUploadStatus.error;
      return Promise.reject(file.name);
    }
    if (!response.ok) {
      console.log(response);
      file.status = FileUploadStatus.error;
      return Promise.reject(file.name);
    }
    file.status = FileUploadStatus.completed;
    return response;
  }
  function clearHistory() {
    state.value.messages = [];
    if (appOptions.localStorage.enabled) {
      localStorage.setItem(getStorageKey(), JSON.stringify(state.value));
    }
  }
  return {
    state,
    updateApplication,
    getStoredState,
    getMessages,
    sendUserMessage,
    postFile,
    addMessage,
    clearHistory,
    clearLoaderMessages,
    scrollMessages
  };
});
const _hoisted_1$7 = { class: "tvk-upload-files-preview-wrapper" };
const _hoisted_2$6 = { class: "tvk-upload-files-preview-body" };
const _hoisted_3$4 = { class: "tvk-upload-file-preview-infos" };
const _hoisted_4$4 = {
  key: 0,
  class: "tvk-upload-file-preview-infos-fileIcon bi bi-exclamation-triangle-fill warning"
};
const _hoisted_5$4 = {
  key: 1,
  class: "tvk-upload-file-preview-infos-fileIcon bi bi-file-arrow-up"
};
const _hoisted_6$2 = {
  key: 2,
  class: "tvk-upload-file-preview-infos-fileIcon bi bi-check-lg"
};
const _hoisted_7$2 = {
  key: 3,
  class: "tvk-upload-file-preview-infos-fileIcon bi bi-filetype-pdf"
};
const _hoisted_8$2 = {
  key: 4,
  class: "tvk-upload-file-preview-infos-fileIcon bi bi-filetype-json"
};
const _hoisted_9$2 = {
  key: 5,
  class: "tvk-upload-file-preview-infos-fileIcon bi bi-filetype-csv"
};
const _hoisted_10$2 = {
  key: 6,
  class: "tvk-upload-file-preview-infos-fileIcon bi bi-filetype-html"
};
const _hoisted_11$1 = {
  key: 7,
  class: "tvk-upload-file-preview-infos-fileIcon bi bi-filetype-txt"
};
const _hoisted_12$1 = {
  key: 8,
  class: "tvk-upload-file-preview-infos-fileIcon bi bi-filetype-txt"
};
const _hoisted_13$1 = {
  key: 9,
  class: "tvk-upload-file-preview-infos-fileIcon bi bi-filetype-doc"
};
const _hoisted_14$1 = {
  key: 10,
  class: "tvk-upload-file-preview-infos-fileIcon bi bi-filetype-doc"
};
const _hoisted_15$1 = {
  key: 11,
  class: "tvk-upload-file-preview-infos-fileIcon bi bi-filetype-docx"
};
const _hoisted_16 = {
  key: 12,
  class: "tvk-upload-file-preview-infos-fileIcon bi bi-file-x"
};
const _hoisted_17 = { class: "tvk-upload-file-preview-infos-fileName" };
const _hoisted_18 = { class: "tvk-upload-file-preview-infos-fileSize" };
const _hoisted_19 = { key: 13 };
const _hoisted_20 = { class: "warning" };
const _hoisted_21 = { key: 14 };
const _hoisted_22 = { class: "warning" };
const _hoisted_23 = { key: 15 };
const _hoisted_24 = { class: "warning" };
const _hoisted_25 = ["onClick"];
const _hoisted_26 = { class: "tvk-upload-files-preview-footer" };
const _hoisted_27 = { class: "tvk-upload-files-preview-footer-actions" };
const _hoisted_28 = ["disabled"];
const _hoisted_29 = ["disabled"];
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "upload-files-preview",
  props: {
    files: {},
    uploadInProgress: { type: Boolean }
  },
  emits: ["remove", "cancel", "upload"],
  setup(__props) {
    const appOptions = appOptionsSingleton.getOptions();
    const props = __props;
    function uploadPossible() {
      return props.files.some((file) => {
        return file.typeAllowed && file.sizeAllowed;
      });
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$7, [
        createElementVNode("ul", _hoisted_2$6, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.files, (file, index) => {
            return openBlock(), createElementBlock("li", {
              class: normalizeClass(["tvk-upload-file-preview", {
                "not-allowed": !file.typeAllowed || !file.sizeAllowed || index >= unref(appOptions).preferences.questionBar.uploadFiles.maxFiles
              }])
            }, [
              createElementVNode("div", _hoisted_3$4, [
                !file.typeAllowed || file.status === unref(FileUploadStatus).error ? (openBlock(), createElementBlock("i", _hoisted_4$4)) : file.status === unref(FileUploadStatus).loading ? (openBlock(), createElementBlock("i", _hoisted_5$4)) : file.status === unref(FileUploadStatus).completed ? (openBlock(), createElementBlock("i", _hoisted_6$2)) : file.typelabel === "pdf" ? (openBlock(), createElementBlock("i", _hoisted_7$2)) : file.typelabel === "json" ? (openBlock(), createElementBlock("i", _hoisted_8$2)) : file.typelabel === "csv" ? (openBlock(), createElementBlock("i", _hoisted_9$2)) : file.typelabel === "html" ? (openBlock(), createElementBlock("i", _hoisted_10$2)) : file.typelabel === "txt" ? (openBlock(), createElementBlock("i", _hoisted_11$1)) : file.typelabel === "rtf" ? (openBlock(), createElementBlock("i", _hoisted_12$1)) : file.typelabel === "odt" ? (openBlock(), createElementBlock("i", _hoisted_13$1)) : file.typelabel === "doc" ? (openBlock(), createElementBlock("i", _hoisted_14$1)) : file.typelabel === "docx" ? (openBlock(), createElementBlock("i", _hoisted_15$1)) : (openBlock(), createElementBlock("i", _hoisted_16)),
                createTextVNode(" " + toDisplayString(file.status) + " ", 1),
                createElementVNode("span", _hoisted_17, toDisplayString(file.name), 1),
                createElementVNode("small", _hoisted_18, "(" + toDisplayString(unref(humanFileSize)(file.size)) + ")", 1),
                index >= unref(appOptions).preferences.questionBar.uploadFiles.maxFiles ? (openBlock(), createElementBlock("div", _hoisted_19, [
                  createElementVNode("small", _hoisted_20, toDisplayString(unref(appOptions).wording.questionBar.uploadFilesList.filesNumberLimitWarning) + " " + toDisplayString(unref(appOptions).preferences.questionBar.uploadFiles.maxFiles), 1)
                ])) : !file.sizeAllowed ? (openBlock(), createElementBlock("div", _hoisted_21, [
                  createElementVNode("small", _hoisted_22, toDisplayString(unref(appOptions).wording.questionBar.uploadFilesList.filesSizeWarning) + " (max file size " + toDisplayString(unref(humanFileSize)(
                    unref(appOptions).preferences.questionBar.uploadFiles.maxFileSize
                  )) + ") ", 1)
                ])) : !file.typeAllowed ? (openBlock(), createElementBlock("div", _hoisted_23, [
                  createElementVNode("small", _hoisted_24, toDisplayString(unref(appOptions).wording.questionBar.uploadFilesList.filesFormatWarning), 1)
                ])) : createCommentVNode("", true)
              ]),
              file.status === unref(FileUploadStatus).pending ? (openBlock(), createElementBlock("button", {
                key: 0,
                onClick: ($event) => _ctx.$emit("remove", file),
                class: "tvk-btn tvk-upload-files-preview-remove"
              }, " × ", 8, _hoisted_25)) : createCommentVNode("", true),
              withDirectives(createElementVNode("div", { class: "status-indicator loading" }, toDisplayString(unref(appOptions).wording.questionBar.uploadFilesList.fileUploadLoading), 513), [
                [vShow, file.status === unref(FileUploadStatus).loading]
              ]),
              withDirectives(createElementVNode("div", { class: "status-indicator success" }, toDisplayString(unref(appOptions).wording.questionBar.uploadFilesList.fileUploadCompleted), 513), [
                [vShow, file.status === unref(FileUploadStatus).completed]
              ]),
              withDirectives(createElementVNode("div", { class: "status-indicator warning" }, toDisplayString(unref(appOptions).wording.questionBar.uploadFilesList.fileUploadError), 513), [
                [vShow, file.status === unref(FileUploadStatus).error]
              ])
            ], 2);
          }), 256))
        ]),
        createElementVNode("div", _hoisted_26, [
          createElementVNode("div", _hoisted_27, [
            createElementVNode("button", {
              class: "tvk-btn",
              onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("cancel")),
              disabled: _ctx.uploadInProgress
            }, toDisplayString(unref(appOptions).wording.questionBar.uploadFilesList.uploadCancel), 9, _hoisted_28),
            createElementVNode("button", {
              class: "tvk-btn tvk-btn-action",
              onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("upload")),
              disabled: !uploadPossible() || _ctx.uploadInProgress
            }, toDisplayString(unref(appOptions).wording.questionBar.uploadFilesList.uploadSubmit), 9, _hoisted_29)
          ])
        ])
      ]);
    };
  }
});
const _hoisted_1$6 = ["data-active"];
const _hoisted_2$5 = ["aria-label"];
const _hoisted_3$3 = ["src"];
const _hoisted_4$3 = ["maxlength", "placeholder"];
const _hoisted_5$3 = { class: "tvk-question-bar-chars-count" };
const _hoisted_6$1 = ["aria-label"];
const _hoisted_7$1 = ["src"];
const _hoisted_8$1 = ["multiple"];
const _hoisted_9$1 = ["disabled", "aria-label"];
const _hoisted_10$1 = ["src"];
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "question-block",
  setup(__props) {
    const { files, addFiles, removeFile, removeAllFiles, uploadFiles } = uploadFilesListHandler();
    const appOptions = appOptionsSingleton.getOptions();
    const mainStore = useMainStore();
    const maxChars = appOptions.preferences.questionBar.maxUserInputLength;
    const input = ref(null);
    const fileInput2 = ref(null);
    const typedChars = ref("");
    const dropZoneActive = ref(false);
    const uploadInProgress = ref(false);
    function handleClick() {
      if (input == null ? void 0 : input.value)
        input.value.focus();
    }
    function nbTypedChars() {
      return typedChars.value.trim().length;
    }
    function userInputExceedLenth() {
      return nbTypedChars() > maxChars;
    }
    function onSubmit() {
      if (nbTypedChars() && !userInputExceedLenth()) {
        mainStore.sendUserMessage(typedChars.value);
        if (appOptions.preferences.questionBar.clearTypedCharsOnSubmit) {
          typedChars.value = "";
        }
      }
    }
    function onClearHistory() {
      mainStore.clearHistory();
    }
    function onUploadFiles() {
      uploadInProgress.value = true;
      uploadFiles().then((res) => {
        let message = appOptions.wording.questionBar.uploadFilesList.fileUploadConfirmationMessage;
        let errors = [];
        res.forEach((fu) => {
          if (fu.status === "rejected") {
            errors.push(`"${fu.reason}"`);
          }
        });
        if (errors.length) {
          message = `${appOptions.wording.questionBar.uploadFilesList.fileUploadConfirmationMessageWithErrors} ${errors.join(", ")}`;
        }
        removeAllFiles();
        uploadInProgress.value = false;
        mainStore.addMessage({
          type: MessageType.info,
          author: MessageAuthor.app,
          date: Date.now(),
          text: message
        });
      });
    }
    function onCancelUpload() {
      removeAllFiles();
    }
    function onOpenFileBrowser() {
      var _a;
      (_a = fileInput2.value) == null ? void 0 : _a.click();
    }
    function onFileInputChanged(e) {
      if (!appOptions.preferences.questionBar.uploadFiles.allow)
        return;
      const target = e.target;
      if (target && target.files) {
        addFiles(target.files);
      }
    }
    function onDrop(e) {
      if (!appOptions.preferences.questionBar.uploadFiles.allow || uploadInProgress.value)
        return;
      setDropZoneInactive();
      if (e.dataTransfer) {
        addFiles(e.dataTransfer.files);
      }
    }
    function preventDefaults(e) {
      e.preventDefault();
    }
    let dropZoneInActiveTimeout;
    function setDropZoneActive() {
      if (!appOptions.preferences.questionBar.uploadFiles.allow)
        return;
      dropZoneActive.value = true;
      clearTimeout(dropZoneInActiveTimeout);
    }
    function setDropZoneInactive() {
      if (!appOptions.preferences.questionBar.uploadFiles.allow)
        return;
      dropZoneInActiveTimeout = setTimeout(() => {
        dropZoneActive.value = false;
      }, 50);
    }
    const dragDropEvents = ["dragenter", "dragover", "dragleave", "drop"];
    onMounted(() => {
      if (appOptions.preferences.questionBar.uploadFiles.allow) {
        dragDropEvents.forEach((eventName) => {
          document.body.addEventListener(eventName, preventDefaults);
        });
      }
    });
    onUnmounted(() => {
      if (appOptions.preferences.questionBar.uploadFiles.allow) {
        dragDropEvents.forEach((eventName) => {
          document.body.removeEventListener(eventName, preventDefaults);
        });
      }
    });
    return (_ctx, _cache) => {
      var _a;
      return openBlock(), createElementBlock("div", {
        class: "tvk-question-bar",
        onClick: handleClick,
        onDrop: withModifiers(onDrop, ["prevent"]),
        onDragenter: withModifiers(setDropZoneActive, ["prevent"]),
        onDragover: withModifiers(setDropZoneActive, ["prevent"]),
        onDragleave: withModifiers(setDropZoneInactive, ["prevent"]),
        "data-active": dropZoneActive.value
      }, [
        unref(files).length ? (openBlock(), createBlock(_sfc_main$b, {
          key: 0,
          files: unref(files),
          uploadInProgress: uploadInProgress.value,
          onRemove: unref(removeFile),
          onCancel: onCancelUpload,
          onUpload: onUploadFiles
        }, null, 8, ["files", "uploadInProgress", "onRemove"])) : createCommentVNode("", true),
        !unref(files).length ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          ((_a = unref(appOptions).preferences.questionBar.clearHistory) == null ? void 0 : _a.display) ? (openBlock(), createElementBlock("button", {
            key: 0,
            class: "tvk-btn tvk-question-bar-btn-clear-history",
            "aria-label": unref(appOptions).wording.questionBar.clearHistoryAriaLabel,
            onClick: onClearHistory
          }, [
            !unref(appOptions).preferences.questionBar.clearHistory.image && unref(appOptions).preferences.questionBar.clearHistory.icon ? (openBlock(), createElementBlock("i", {
              key: 0,
              class: normalizeClass(unref(appOptions).preferences.questionBar.clearHistory.icon)
            }, null, 2)) : createCommentVNode("", true),
            unref(appOptions).preferences.questionBar.clearHistory.image ? (openBlock(), createElementBlock("img", {
              key: 1,
              src: unref(appOptions).preferences.questionBar.clearHistory.image.src,
              style: normalizeStyle({
                width: unref(appOptions).preferences.questionBar.clearHistory.image.width,
                height: unref(appOptions).preferences.questionBar.clearHistory.image.height
              })
            }, null, 12, _hoisted_3$3)) : createCommentVNode("", true),
            createTextVNode(" " + toDisplayString(unref(appOptions).wording.questionBar.clearHistory), 1)
          ], 8, _hoisted_2$5)) : createCommentVNode("", true),
          createElementVNode("form", {
            onSubmit: withModifiers(onSubmit, ["prevent"]),
            class: "tvk-question-bar-form"
          }, [
            withDirectives(createElementVNode("input", {
              ref_key: "input",
              ref: input,
              type: "text",
              class: "tvk-question-bar-input",
              rows: "1",
              maxlength: unref(appOptions).preferences.questionBar.maxUserInputLength,
              placeholder: unref(appOptions).wording.questionBar.input.placeholder,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => typedChars.value = $event)
            }, null, 8, _hoisted_4$3), [
              [vModelText, typedChars.value]
            ]),
            createElementVNode("div", _hoisted_5$3, toDisplayString(nbTypedChars()) + "/" + toDisplayString(unref(maxChars)), 1)
          ], 32),
          unref(appOptions).preferences.questionBar.uploadFiles.allow && unref(appOptions).preferences.questionBar.uploadFiles.displayButton ? (openBlock(), createElementBlock("button", {
            key: 1,
            class: "tvk-btn tvk-question-bar-btn-upload-files",
            "aria-label": unref(appOptions).wording.questionBar.uploadBrowseButtonAriaLabel,
            onClick: onOpenFileBrowser
          }, [
            !unref(appOptions).preferences.questionBar.uploadFiles.image && unref(appOptions).preferences.questionBar.uploadFiles.icon ? (openBlock(), createElementBlock("i", {
              key: 0,
              class: normalizeClass(unref(appOptions).preferences.questionBar.uploadFiles.icon)
            }, null, 2)) : createCommentVNode("", true),
            unref(appOptions).preferences.questionBar.uploadFiles.image ? (openBlock(), createElementBlock("img", {
              key: 1,
              src: unref(appOptions).preferences.questionBar.uploadFiles.image.src,
              style: normalizeStyle({
                width: unref(appOptions).preferences.questionBar.uploadFiles.image.width,
                height: unref(appOptions).preferences.questionBar.uploadFiles.image.height
              })
            }, null, 12, _hoisted_7$1)) : createCommentVNode("", true),
            createTextVNode(" " + toDisplayString(unref(appOptions).wording.questionBar.uploadBrowseButtonLabel), 1)
          ], 8, _hoisted_6$1)) : createCommentVNode("", true),
          unref(appOptions).preferences.questionBar.uploadFiles.allow && unref(appOptions).preferences.questionBar.uploadFiles.displayButton ? (openBlock(), createElementBlock("input", {
            key: 2,
            type: "file",
            class: "file-input",
            ref_key: "fileInput",
            ref: fileInput2,
            multiple: unref(appOptions).preferences.questionBar.uploadFiles.maxFiles > 1,
            onChange: onFileInputChanged
          }, null, 40, _hoisted_8$1)) : createCommentVNode("", true),
          createElementVNode("button", {
            disabled: !typedChars.value.trim().length || userInputExceedLenth(),
            class: "tvk-btn tvk-question-bar-btn-submit",
            "aria-label": unref(appOptions).wording.questionBar.submitAriaLabel,
            onClick: onSubmit
          }, [
            !unref(appOptions).preferences.questionBar.submit.image && unref(appOptions).preferences.questionBar.submit.icon ? (openBlock(), createElementBlock("i", {
              key: 0,
              class: normalizeClass(unref(appOptions).preferences.questionBar.submit.icon)
            }, null, 2)) : createCommentVNode("", true),
            unref(appOptions).preferences.questionBar.submit.image ? (openBlock(), createElementBlock("img", {
              key: 1,
              src: unref(appOptions).preferences.questionBar.submit.image.src,
              style: normalizeStyle({
                width: unref(appOptions).preferences.questionBar.submit.image.width,
                height: unref(appOptions).preferences.questionBar.submit.image.height
              })
            }, null, 12, _hoisted_10$1)) : createCommentVNode("", true),
            createTextVNode(" " + toDisplayString(unref(appOptions).wording.questionBar.submit), 1)
          ], 8, _hoisted_9$1)
        ], 64)) : createCommentVNode("", true)
      ], 40, _hoisted_1$6);
    };
  }
});
const encodedTlds = "aaa1rp3bb0ott3vie4c1le2ogado5udhabi7c0ademy5centure6ountant0s9o1tor4d0s1ult4e0g1ro2tna4f0l1rica5g0akhan5ency5i0g1rbus3force5tel5kdn3l0ibaba4pay4lfinanz6state5y2sace3tom5m0azon4ericanexpress7family11x2fam3ica3sterdam8nalytics7droid5quan4z2o0l2partments8p0le4q0uarelle8r0ab1mco4chi3my2pa2t0e3s0da2ia2sociates9t0hleta5torney7u0ction5di0ble3o3spost5thor3o0s4vianca6w0s2x0a2z0ure5ba0by2idu3namex3narepublic11d1k2r0celona5laycard4s5efoot5gains6seball5ketball8uhaus5yern5b0c1t1va3cg1n2d1e0ats2uty4er2ntley5rlin4st0buy5t2f1g1h0arti5i0ble3d1ke2ng0o3o1z2j1lack0friday9ockbuster8g1omberg7ue3m0s1w2n0pparibas9o0ats3ehringer8fa2m1nd2o0k0ing5sch2tik2on4t1utique6x2r0adesco6idgestone9oadway5ker3ther5ussels7s1t1uild0ers6siness6y1zz3v1w1y1z0h3ca0b1fe2l0l1vinklein9m0era3p2non3petown5ital0one8r0avan4ds2e0er0s4s2sa1e1h1ino4t0ering5holic7ba1n1re3c1d1enter4o1rn3f0a1d2g1h0anel2nel4rity4se2t2eap3intai5ristmas6ome4urch5i0priani6rcle4sco3tadel4i0c2y3k1l0aims4eaning6ick2nic1que6othing5ud3ub0med6m1n1o0ach3des3ffee4llege4ogne5m0cast4mbank4unity6pany2re3uter5sec4ndos3struction8ulting7tact3ractors9oking4l1p2rsica5untry4pon0s4rses6pa2r0edit0card4union9icket5own3s1uise0s6u0isinella9v1w1x1y0mru3ou3z2dabur3d1nce3ta1e1ing3sun4y2clk3ds2e0al0er2s3gree4livery5l1oitte5ta3mocrat6ntal2ist5si0gn4v2hl2iamonds6et2gital5rect0ory7scount3ver5h2y2j1k1m1np2o0cs1tor4g1mains5t1wnload7rive4tv2ubai3nlop4pont4rban5vag2r2z2earth3t2c0o2deka3u0cation8e1g1mail3erck5nergy4gineer0ing9terprises10pson4quipment8r0icsson6ni3s0q1tate5t1u0rovision8s2vents5xchange6pert3osed4ress5traspace10fage2il1rwinds6th3mily4n0s2rm0ers5shion4t3edex3edback6rrari3ero6i0delity5o2lm2nal1nce1ial7re0stone6mdale6sh0ing5t0ness6j1k1lickr3ghts4r2orist4wers5y2m1o0o0d1tball6rd1ex2sale4um3undation8x2r0ee1senius7l1ogans4ntier7tr2ujitsu5n0d2rniture7tbol5yi3ga0l0lery3o1up4me0s3p1rden4y2b0iz3d0n2e0a1nt0ing5orge5f1g0ee3h1i0ft0s3ves2ing5l0ass3e1obal2o4m0ail3bh2o1x2n1odaddy5ld0point6f2o0dyear5g0le4p1t1v2p1q1r0ainger5phics5tis4een3ipe3ocery4up4s1t1u0ardian6cci3ge2ide2tars5ru3w1y2hair2mburg5ngout5us3bo2dfc0bank7ealth0care8lp1sinki6re1mes5iphop4samitsu7tachi5v2k0t2m1n1ockey4ldings5iday5medepot5goods5s0ense7nda3rse3spital5t0ing5t0els3mail5use3w2r1sbc3t1u0ghes5yatt3undai7ibm2cbc2e1u2d1e0ee3fm2kano4l1m0amat4db2mo0bilien9n0c1dustries8finiti5o2g1k1stitute6urance4e4t0ernational10uit4vestments10o1piranga7q1r0ish4s0maili5t0anbul7t0au2v3jaguar4va3cb2e0ep2tzt3welry6io2ll2m0p2nj2o0bs1urg4t1y2p0morgan6rs3uegos4niper7kaufen5ddi3e0rryhotels6logistics9properties14fh2g1h1i0a1ds2m1ndle4tchen5wi3m1n1oeln3matsu5sher5p0mg2n2r0d1ed3uokgroup8w1y0oto4z2la0caixa5mborghini8er3ncaster6d0rover6xess5salle5t0ino3robe5w0yer5b1c1ds2ease3clerc5frak4gal2o2xus4gbt3i0dl2fe0insurance9style7ghting6ke2lly3mited4o2ncoln4k2psy3ve1ing5k1lc1p2oan0s3cker3us3l1ndon4tte1o3ve3pl0financial11r1s1t0d0a3u0ndbeck6xe1ury5v1y2ma0drid4if1son4keup4n0agement7go3p1rket0ing3s4riott5shalls7ttel5ba2c0kinsey7d1e0d0ia3et2lbourne7me1orial6n0u2rckmsd7g1h1iami3crosoft7l1ni1t2t0subishi9k1l0b1s2m0a2n1o0bi0le4da2e1i1m1nash3ey2ster5rmon3tgage6scow4to0rcycles9v0ie4p1q1r1s0d2t0n1r2u0seum3ic4v1w1x1y1z2na0b1goya4me2tura4vy3ba2c1e0c1t0bank4flix4work5ustar5w0s2xt0direct7us4f0l2g0o2hk2i0co2ke1on3nja3ssan1y5l1o0kia3rton4w0ruz3tv4p1r0a1w2tt2u1yc2z2obi1server7ffice5kinawa6layan0group9dnavy5lo3m0ega4ne1g1l0ine5oo2pen3racle3nge4g0anic5igins6saka4tsuka4t2vh3pa0ge2nasonic7ris2s1tners4s1y3y2ccw3e0t2f0izer5g1h0armacy6d1ilips5one2to0graphy6s4ysio5ics1tet2ures6d1n0g1k2oneer5zza4k1l0ace2y0station9umbing5s3m1n0c2ohl2ker3litie5rn2st3r0america6xi3ess3ime3o0d0uctions8f1gressive8mo2perties3y5tection8u0dential9s1t1ub2w0c2y2qa1pon3uebec3st5racing4dio4e0ad1lestate6tor2y4cipes5d0stone5umbrella9hab3ise0n3t2liance6n0t0als5pair3ort3ublican8st0aurant8view0s5xroth6ich0ardli6oh3l1o1p2o0cks3deo3gers4om3s0vp3u0gby3hr2n2w0e2yukyu6sa0arland6fe0ty4kura4le1on3msclub4ung5ndvik0coromant12ofi4p1rl2s1ve2xo3b0i1s2c0a1b1haeffler7midt4olarships8ol3ule3warz5ience5ot3d1e0arch3t2cure1ity6ek2lect4ner3rvices6ven3w1x0y3fr2g1h0angrila6rp2w2ell3ia1ksha5oes2p0ping5uji3w3i0lk2na1gles5te3j1k0i0n2y0pe4l0ing4m0art3ile4n0cf3o0ccer3ial4ftbank4ware6hu2lar2utions7ng1y2y2pa0ce3ort2t3r0l2s1t0ada2ples4r1tebank4farm7c0group6ockholm6rage3e3ream4udio2y3yle4u0cks3pplies3y2ort5rf1gery5zuki5v1watch4iss4x1y0dney4stems6z2tab1ipei4lk2obao4rget4tamotors6r2too4x0i3c0i2d0k2eam2ch0nology8l1masek5nnis4va3f1g1h0d1eater2re6iaa2ckets5enda4ps2res2ol4j0maxx4x2k0maxx5l1m0all4n1o0day3kyo3ols3p1ray3shiba5tal3urs3wn2yota3s3r0ade1ing4ining5vel0ers0insurance16ust3v2t1ube2i1nes3shu4v0s2w1z2ua1bank3s2g1k1nicom3versity8o2ol2ps2s1y1z2va0cations7na1guard7c1e0gas3ntures6risign5mögensberater2ung14sicherung10t2g1i0ajes4deo3g1king4llas4n1p1rgin4sa1ion4va1o3laanderen9n1odka3lvo3te1ing3o2yage5u2wales2mart4ter4ng0gou5tch0es6eather0channel12bcam3er2site5d0ding5ibo2r3f1hoswho6ien2ki2lliamhill9n0dows4e1ners6me2olterskluwer11odside6rk0s2ld3w2s1tc1f3xbox3erox4finity6ihuan4n2xx2yz3yachts4hoo3maxun5ndex5e1odobashi7ga2kohama6u0tube6t1un3za0ppos4ra3ero3ip2m1one3uerich6w2";
const encodedUtlds = "ελ1υ2бг1ел3дети4ею2католик6ом3мкд2он1сква6онлайн5рг3рус2ф2сайт3рб3укр3қаз3հայ3ישראל5קום3ابوظبي5رامكو5لاردن4بحرين5جزائر5سعودية6عليان5مغرب5مارات5یران5بارت2زار4يتك3ھارت5تونس4سودان3رية5شبكة4عراق2ب2مان4فلسطين6قطر3كاثوليك6وم3مصر2ليسيا5وريتانيا7قع4همراه5پاکستان7ڀارت4कॉम3नेट3भारत0म्3ोत5संगठन5বাংলা5ভারত2ৰত4ਭਾਰਤ4ભારત4ଭାରତ4இந்தியா6லங்கை6சிங்கப்பூர்11భారత్5ಭಾರತ4ഭാരതം5ලංකා4คอม3ไทย3ລາວ3გე2みんな3アマゾン4クラウド4グーグル4コム2ストア3セール3ファッション6ポイント4世界2中信1国1國1文网3亚马逊3企业2佛山2信息2健康2八卦2公司1益2台湾1灣2商城1店1标2嘉里0大酒店5在线2大拿2天主教3娱乐2家電2广东2微博2慈善2我爱你3手机2招聘2政务1府2新加坡2闻2时尚2書籍2机构2淡马锡3游戏2澳門2点看2移动2组织机构4网址1店1站1络2联通2谷歌2购物2通販2集团2電訊盈科4飞利浦3食品2餐厅2香格里拉3港2닷넷1컴2삼성2한국2";
const assign = (target, properties) => {
  for (const key in properties) {
    target[key] = properties[key];
  }
  return target;
};
const numeric = "numeric";
const ascii = "ascii";
const alpha = "alpha";
const asciinumeric = "asciinumeric";
const alphanumeric = "alphanumeric";
const domain = "domain";
const emoji = "emoji";
const scheme = "scheme";
const slashscheme = "slashscheme";
const whitespace = "whitespace";
function registerGroup(name, groups) {
  if (!(name in groups)) {
    groups[name] = [];
  }
  return groups[name];
}
function addToGroups(t, flags, groups) {
  if (flags[numeric]) {
    flags[asciinumeric] = true;
    flags[alphanumeric] = true;
  }
  if (flags[ascii]) {
    flags[asciinumeric] = true;
    flags[alpha] = true;
  }
  if (flags[asciinumeric]) {
    flags[alphanumeric] = true;
  }
  if (flags[alpha]) {
    flags[alphanumeric] = true;
  }
  if (flags[alphanumeric]) {
    flags[domain] = true;
  }
  if (flags[emoji]) {
    flags[domain] = true;
  }
  for (const k in flags) {
    const group = registerGroup(k, groups);
    if (group.indexOf(t) < 0) {
      group.push(t);
    }
  }
}
function flagsForToken(t, groups) {
  const result = {};
  for (const c in groups) {
    if (groups[c].indexOf(t) >= 0) {
      result[c] = true;
    }
  }
  return result;
}
function State(token) {
  if (token === void 0) {
    token = null;
  }
  this.j = {};
  this.jr = [];
  this.jd = null;
  this.t = token;
}
State.groups = {};
State.prototype = {
  accepts() {
    return !!this.t;
  },
  /**
   * Follow an existing transition from the given input to the next state.
   * Does not mutate.
   * @param {string} input character or token type to transition on
   * @returns {?State<T>} the next state, if any
   */
  go(input) {
    const state = this;
    const nextState = state.j[input];
    if (nextState) {
      return nextState;
    }
    for (let i = 0; i < state.jr.length; i++) {
      const regex = state.jr[i][0];
      const nextState2 = state.jr[i][1];
      if (nextState2 && regex.test(input)) {
        return nextState2;
      }
    }
    return state.jd;
  },
  /**
   * Whether the state has a transition for the given input. Set the second
   * argument to true to only look for an exact match (and not a default or
   * regular-expression-based transition)
   * @param {string} input
   * @param {boolean} exactOnly
   */
  has(input, exactOnly) {
    if (exactOnly === void 0) {
      exactOnly = false;
    }
    return exactOnly ? input in this.j : !!this.go(input);
  },
  /**
   * Short for "transition all"; create a transition from the array of items
   * in the given list to the same final resulting state.
   * @param {string | string[]} inputs Group of inputs to transition on
   * @param {Transition<T> | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   */
  ta(inputs, next, flags, groups) {
    for (let i = 0; i < inputs.length; i++) {
      this.tt(inputs[i], next, flags, groups);
    }
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
  tr(regexp, next, flags, groups) {
    groups = groups || State.groups;
    let nextState;
    if (next && next.j) {
      nextState = next;
    } else {
      nextState = new State(next);
      if (flags && groups) {
        addToGroups(next, flags, groups);
      }
    }
    this.jr.push([regexp, nextState]);
    return nextState;
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
  ts(input, next, flags, groups) {
    let state = this;
    const len = input.length;
    if (!len) {
      return state;
    }
    for (let i = 0; i < len - 1; i++) {
      state = state.tt(input[i]);
    }
    return state.tt(input[len - 1], next, flags, groups);
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
  tt(input, next, flags, groups) {
    groups = groups || State.groups;
    const state = this;
    if (next && next.j) {
      state.j[input] = next;
      return next;
    }
    const t = next;
    let nextState, templateState = state.go(input);
    if (templateState) {
      nextState = new State();
      assign(nextState.j, templateState.j);
      nextState.jr.push.apply(nextState.jr, templateState.jr);
      nextState.jd = templateState.jd;
      nextState.t = templateState.t;
    } else {
      nextState = new State();
    }
    if (t) {
      if (groups) {
        if (nextState.t && typeof nextState.t === "string") {
          const allFlags = assign(flagsForToken(nextState.t, groups), flags);
          addToGroups(t, allFlags, groups);
        } else if (flags) {
          addToGroups(t, flags, groups);
        }
      }
      nextState.t = t;
    }
    state.j[input] = nextState;
    return nextState;
  }
};
const ta = (state, input, next, flags, groups) => state.ta(input, next, flags, groups);
const tr = (state, regexp, next, flags, groups) => state.tr(regexp, next, flags, groups);
const ts = (state, input, next, flags, groups) => state.ts(input, next, flags, groups);
const tt = (state, input, next, flags, groups) => state.tt(input, next, flags, groups);
const WORD = "WORD";
const UWORD = "UWORD";
const LOCALHOST = "LOCALHOST";
const TLD = "TLD";
const UTLD = "UTLD";
const SCHEME = "SCHEME";
const SLASH_SCHEME = "SLASH_SCHEME";
const NUM = "NUM";
const WS = "WS";
const NL$1 = "NL";
const OPENBRACE = "OPENBRACE";
const CLOSEBRACE = "CLOSEBRACE";
const OPENBRACKET = "OPENBRACKET";
const CLOSEBRACKET = "CLOSEBRACKET";
const OPENPAREN = "OPENPAREN";
const CLOSEPAREN = "CLOSEPAREN";
const OPENANGLEBRACKET = "OPENANGLEBRACKET";
const CLOSEANGLEBRACKET = "CLOSEANGLEBRACKET";
const FULLWIDTHLEFTPAREN = "FULLWIDTHLEFTPAREN";
const FULLWIDTHRIGHTPAREN = "FULLWIDTHRIGHTPAREN";
const LEFTCORNERBRACKET = "LEFTCORNERBRACKET";
const RIGHTCORNERBRACKET = "RIGHTCORNERBRACKET";
const LEFTWHITECORNERBRACKET = "LEFTWHITECORNERBRACKET";
const RIGHTWHITECORNERBRACKET = "RIGHTWHITECORNERBRACKET";
const FULLWIDTHLESSTHAN = "FULLWIDTHLESSTHAN";
const FULLWIDTHGREATERTHAN = "FULLWIDTHGREATERTHAN";
const AMPERSAND = "AMPERSAND";
const APOSTROPHE = "APOSTROPHE";
const ASTERISK = "ASTERISK";
const AT = "AT";
const BACKSLASH = "BACKSLASH";
const BACKTICK = "BACKTICK";
const CARET = "CARET";
const COLON = "COLON";
const COMMA = "COMMA";
const DOLLAR = "DOLLAR";
const DOT = "DOT";
const EQUALS = "EQUALS";
const EXCLAMATION = "EXCLAMATION";
const HYPHEN = "HYPHEN";
const PERCENT = "PERCENT";
const PIPE = "PIPE";
const PLUS = "PLUS";
const POUND = "POUND";
const QUERY = "QUERY";
const QUOTE = "QUOTE";
const SEMI = "SEMI";
const SLASH = "SLASH";
const TILDE = "TILDE";
const UNDERSCORE = "UNDERSCORE";
const EMOJI$1 = "EMOJI";
const SYM = "SYM";
var tk = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  WORD,
  UWORD,
  LOCALHOST,
  TLD,
  UTLD,
  SCHEME,
  SLASH_SCHEME,
  NUM,
  WS,
  NL: NL$1,
  OPENBRACE,
  CLOSEBRACE,
  OPENBRACKET,
  CLOSEBRACKET,
  OPENPAREN,
  CLOSEPAREN,
  OPENANGLEBRACKET,
  CLOSEANGLEBRACKET,
  FULLWIDTHLEFTPAREN,
  FULLWIDTHRIGHTPAREN,
  LEFTCORNERBRACKET,
  RIGHTCORNERBRACKET,
  LEFTWHITECORNERBRACKET,
  RIGHTWHITECORNERBRACKET,
  FULLWIDTHLESSTHAN,
  FULLWIDTHGREATERTHAN,
  AMPERSAND,
  APOSTROPHE,
  ASTERISK,
  AT,
  BACKSLASH,
  BACKTICK,
  CARET,
  COLON,
  COMMA,
  DOLLAR,
  DOT,
  EQUALS,
  EXCLAMATION,
  HYPHEN,
  PERCENT,
  PIPE,
  PLUS,
  POUND,
  QUERY,
  QUOTE,
  SEMI,
  SLASH,
  TILDE,
  UNDERSCORE,
  EMOJI: EMOJI$1,
  SYM
});
const ASCII_LETTER = /[a-z]/;
const LETTER = new RegExp("\\p{L}", "u");
const EMOJI = new RegExp("\\p{Emoji}", "u");
const DIGIT = /\d/;
const SPACE = /\s/;
const NL = "\n";
const EMOJI_VARIATION = "️";
const EMOJI_JOINER = "‍";
let tlds = null, utlds = null;
function init$2(customSchemes) {
  if (customSchemes === void 0) {
    customSchemes = [];
  }
  const groups = {};
  State.groups = groups;
  const Start = new State();
  if (tlds == null) {
    tlds = decodeTlds(encodedTlds);
  }
  if (utlds == null) {
    utlds = decodeTlds(encodedUtlds);
  }
  tt(Start, "'", APOSTROPHE);
  tt(Start, "{", OPENBRACE);
  tt(Start, "}", CLOSEBRACE);
  tt(Start, "[", OPENBRACKET);
  tt(Start, "]", CLOSEBRACKET);
  tt(Start, "(", OPENPAREN);
  tt(Start, ")", CLOSEPAREN);
  tt(Start, "<", OPENANGLEBRACKET);
  tt(Start, ">", CLOSEANGLEBRACKET);
  tt(Start, "（", FULLWIDTHLEFTPAREN);
  tt(Start, "）", FULLWIDTHRIGHTPAREN);
  tt(Start, "「", LEFTCORNERBRACKET);
  tt(Start, "」", RIGHTCORNERBRACKET);
  tt(Start, "『", LEFTWHITECORNERBRACKET);
  tt(Start, "』", RIGHTWHITECORNERBRACKET);
  tt(Start, "＜", FULLWIDTHLESSTHAN);
  tt(Start, "＞", FULLWIDTHGREATERTHAN);
  tt(Start, "&", AMPERSAND);
  tt(Start, "*", ASTERISK);
  tt(Start, "@", AT);
  tt(Start, "`", BACKTICK);
  tt(Start, "^", CARET);
  tt(Start, ":", COLON);
  tt(Start, ",", COMMA);
  tt(Start, "$", DOLLAR);
  tt(Start, ".", DOT);
  tt(Start, "=", EQUALS);
  tt(Start, "!", EXCLAMATION);
  tt(Start, "-", HYPHEN);
  tt(Start, "%", PERCENT);
  tt(Start, "|", PIPE);
  tt(Start, "+", PLUS);
  tt(Start, "#", POUND);
  tt(Start, "?", QUERY);
  tt(Start, '"', QUOTE);
  tt(Start, "/", SLASH);
  tt(Start, ";", SEMI);
  tt(Start, "~", TILDE);
  tt(Start, "_", UNDERSCORE);
  tt(Start, "\\", BACKSLASH);
  const Num = tr(Start, DIGIT, NUM, {
    [numeric]: true
  });
  tr(Num, DIGIT, Num);
  const Word = tr(Start, ASCII_LETTER, WORD, {
    [ascii]: true
  });
  tr(Word, ASCII_LETTER, Word);
  const UWord = tr(Start, LETTER, UWORD, {
    [alpha]: true
  });
  tr(UWord, ASCII_LETTER);
  tr(UWord, LETTER, UWord);
  const Ws = tr(Start, SPACE, WS, {
    [whitespace]: true
  });
  tt(Start, NL, NL$1, {
    [whitespace]: true
  });
  tt(Ws, NL);
  tr(Ws, SPACE, Ws);
  const Emoji = tr(Start, EMOJI, EMOJI$1, {
    [emoji]: true
  });
  tr(Emoji, EMOJI, Emoji);
  tt(Emoji, EMOJI_VARIATION, Emoji);
  const EmojiJoiner = tt(Emoji, EMOJI_JOINER);
  tr(EmojiJoiner, EMOJI, Emoji);
  const wordjr = [[ASCII_LETTER, Word]];
  const uwordjr = [[ASCII_LETTER, null], [LETTER, UWord]];
  for (let i = 0; i < tlds.length; i++) {
    fastts(Start, tlds[i], TLD, WORD, wordjr);
  }
  for (let i = 0; i < utlds.length; i++) {
    fastts(Start, utlds[i], UTLD, UWORD, uwordjr);
  }
  addToGroups(TLD, {
    tld: true,
    ascii: true
  }, groups);
  addToGroups(UTLD, {
    utld: true,
    alpha: true
  }, groups);
  fastts(Start, "file", SCHEME, WORD, wordjr);
  fastts(Start, "mailto", SCHEME, WORD, wordjr);
  fastts(Start, "http", SLASH_SCHEME, WORD, wordjr);
  fastts(Start, "https", SLASH_SCHEME, WORD, wordjr);
  fastts(Start, "ftp", SLASH_SCHEME, WORD, wordjr);
  fastts(Start, "ftps", SLASH_SCHEME, WORD, wordjr);
  addToGroups(SCHEME, {
    scheme: true,
    ascii: true
  }, groups);
  addToGroups(SLASH_SCHEME, {
    slashscheme: true,
    ascii: true
  }, groups);
  customSchemes = customSchemes.sort((a, b) => a[0] > b[0] ? 1 : -1);
  for (let i = 0; i < customSchemes.length; i++) {
    const sch = customSchemes[i][0];
    const optionalSlashSlash = customSchemes[i][1];
    const flags = optionalSlashSlash ? {
      [scheme]: true
    } : {
      [slashscheme]: true
    };
    if (sch.indexOf("-") >= 0) {
      flags[domain] = true;
    } else if (!ASCII_LETTER.test(sch)) {
      flags[numeric] = true;
    } else if (DIGIT.test(sch)) {
      flags[asciinumeric] = true;
    } else {
      flags[ascii] = true;
    }
    ts(Start, sch, sch, flags);
  }
  ts(Start, "localhost", LOCALHOST, {
    ascii: true
  });
  Start.jd = new State(SYM);
  return {
    start: Start,
    tokens: assign({
      groups
    }, tk)
  };
}
function run$1(start, str) {
  const iterable = stringToArray(str.replace(/[A-Z]/g, (c) => c.toLowerCase()));
  const charCount = iterable.length;
  const tokens = [];
  let cursor = 0;
  let charCursor = 0;
  while (charCursor < charCount) {
    let state = start;
    let nextState = null;
    let tokenLength = 0;
    let latestAccepting = null;
    let sinceAccepts = -1;
    let charsSinceAccepts = -1;
    while (charCursor < charCount && (nextState = state.go(iterable[charCursor]))) {
      state = nextState;
      if (state.accepts()) {
        sinceAccepts = 0;
        charsSinceAccepts = 0;
        latestAccepting = state;
      } else if (sinceAccepts >= 0) {
        sinceAccepts += iterable[charCursor].length;
        charsSinceAccepts++;
      }
      tokenLength += iterable[charCursor].length;
      cursor += iterable[charCursor].length;
      charCursor++;
    }
    cursor -= sinceAccepts;
    charCursor -= charsSinceAccepts;
    tokenLength -= sinceAccepts;
    tokens.push({
      t: latestAccepting.t,
      // token type/name
      v: str.slice(cursor - tokenLength, cursor),
      // string value
      s: cursor - tokenLength,
      // start index
      e: cursor
      // end index (excluding)
    });
  }
  return tokens;
}
function stringToArray(str) {
  const result = [];
  const len = str.length;
  let index = 0;
  while (index < len) {
    let first = str.charCodeAt(index);
    let second;
    let char = first < 55296 || first > 56319 || index + 1 === len || (second = str.charCodeAt(index + 1)) < 56320 || second > 57343 ? str[index] : str.slice(index, index + 2);
    result.push(char);
    index += char.length;
  }
  return result;
}
function fastts(state, input, t, defaultt, jr) {
  let next;
  const len = input.length;
  for (let i = 0; i < len - 1; i++) {
    const char = input[i];
    if (state.j[char]) {
      next = state.j[char];
    } else {
      next = new State(defaultt);
      next.jr = jr.slice();
      state.j[char] = next;
    }
    state = next;
  }
  next = new State(t);
  next.jr = jr.slice();
  state.j[input[len - 1]] = next;
  return next;
}
function decodeTlds(encoded) {
  const words = [];
  const stack = [];
  let i = 0;
  let digits = "0123456789";
  while (i < encoded.length) {
    let popDigitCount = 0;
    while (digits.indexOf(encoded[i + popDigitCount]) >= 0) {
      popDigitCount++;
    }
    if (popDigitCount > 0) {
      words.push(stack.join(""));
      for (let popCount = parseInt(encoded.substring(i, i + popDigitCount), 10); popCount > 0; popCount--) {
        stack.pop();
      }
      i += popDigitCount;
    } else {
      stack.push(encoded[i]);
      i++;
    }
  }
  return words;
}
const defaults = {
  defaultProtocol: "http",
  events: null,
  format: noop,
  formatHref: noop,
  nl2br: false,
  tagName: "a",
  target: null,
  rel: null,
  validate: true,
  truncate: Infinity,
  className: null,
  attributes: null,
  ignoreTags: [],
  render: null
};
function Options(opts, defaultRender2) {
  if (defaultRender2 === void 0) {
    defaultRender2 = null;
  }
  let o = assign({}, defaults);
  if (opts) {
    o = assign(o, opts instanceof Options ? opts.o : opts);
  }
  const ignoredTags = o.ignoreTags;
  const uppercaseIgnoredTags = [];
  for (let i = 0; i < ignoredTags.length; i++) {
    uppercaseIgnoredTags.push(ignoredTags[i].toUpperCase());
  }
  this.o = o;
  if (defaultRender2) {
    this.defaultRender = defaultRender2;
  }
  this.ignoreTags = uppercaseIgnoredTags;
}
Options.prototype = {
  o: defaults,
  /**
   * @type string[]
   */
  ignoreTags: [],
  /**
   * @param {IntermediateRepresentation} ir
   * @returns {any}
   */
  defaultRender(ir) {
    return ir;
  },
  /**
   * Returns true or false based on whether a token should be displayed as a
   * link based on the user options.
   * @param {MultiToken} token
   * @returns {boolean}
   */
  check(token) {
    return this.get("validate", token.toString(), token);
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
  get(key, operator, token) {
    const isCallable = operator != null;
    let option = this.o[key];
    if (!option) {
      return option;
    }
    if (typeof option === "object") {
      option = token.t in option ? option[token.t] : defaults[key];
      if (typeof option === "function" && isCallable) {
        option = option(operator, token);
      }
    } else if (typeof option === "function" && isCallable) {
      option = option(operator, token.t, token);
    }
    return option;
  },
  /**
   * @template {keyof Opts} L
   * @param {L} key Name of options object to use
   * @param {string} [operator]
   * @param {MultiToken} [token]
   * @returns {Opts[L] | any}
   */
  getObj(key, operator, token) {
    let obj = this.o[key];
    if (typeof obj === "function" && operator != null) {
      obj = obj(operator, token.t, token);
    }
    return obj;
  },
  /**
   * Convert the given token to a rendered element that may be added to the
   * calling-interface's DOM
   * @param {MultiToken} token Token to render to an HTML element
   * @returns {any} Render result; e.g., HTML string, DOM element, React
   *   Component, etc.
   */
  render(token) {
    const ir = token.render(this);
    const renderFn = this.get("render", null, token) || this.defaultRender;
    return renderFn(ir, token.t, token);
  }
};
function noop(val) {
  return val;
}
function MultiToken(value, tokens) {
  this.t = "token";
  this.v = value;
  this.tk = tokens;
}
MultiToken.prototype = {
  isLink: false,
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
  toHref(scheme2) {
    return this.toString();
  },
  /**
   * @param {Options} options Formatting options
   * @returns {string}
   */
  toFormattedString(options) {
    const val = this.toString();
    const truncate = options.get("truncate", val, this);
    const formatted = options.get("format", val, this);
    return truncate && formatted.length > truncate ? formatted.substring(0, truncate) + "…" : formatted;
  },
  /**
   *
   * @param {Options} options
   * @returns {string}
   */
  toFormattedHref(options) {
    return options.get("formatHref", this.toHref(options.get("defaultProtocol")), this);
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
  toObject(protocol) {
    if (protocol === void 0) {
      protocol = defaults.defaultProtocol;
    }
    return {
      type: this.t,
      value: this.toString(),
      isLink: this.isLink,
      href: this.toHref(protocol),
      start: this.startIndex(),
      end: this.endIndex()
    };
  },
  /**
   *
   * @param {Options} options Formatting option
   */
  toFormattedObject(options) {
    return {
      type: this.t,
      value: this.toFormattedString(options),
      isLink: this.isLink,
      href: this.toFormattedHref(options),
      start: this.startIndex(),
      end: this.endIndex()
    };
  },
  /**
   * Whether this token should be rendered as a link according to the given options
   * @param {Options} options
   * @returns {boolean}
   */
  validate(options) {
    return options.get("validate", this.toString(), this);
  },
  /**
   * Return an object that represents how this link should be rendered.
   * @param {Options} options Formattinng options
   */
  render(options) {
    const token = this;
    const href = this.toHref(options.get("defaultProtocol"));
    const formattedHref = options.get("formatHref", href, this);
    const tagName = options.get("tagName", href, token);
    const content = this.toFormattedString(options);
    const attributes = {};
    const className = options.get("className", href, token);
    const target = options.get("target", href, token);
    const rel = options.get("rel", href, token);
    const attrs = options.getObj("attributes", href, token);
    const eventListeners = options.getObj("events", href, token);
    attributes.href = formattedHref;
    if (className) {
      attributes.class = className;
    }
    if (target) {
      attributes.target = target;
    }
    if (rel) {
      attributes.rel = rel;
    }
    if (attrs) {
      assign(attributes, attrs);
    }
    return {
      tagName,
      attributes,
      content,
      eventListeners
    };
  }
};
function createTokenClass(type, props) {
  class Token extends MultiToken {
    constructor(value, tokens) {
      super(value, tokens);
      this.t = type;
    }
  }
  for (const p in props) {
    Token.prototype[p] = props[p];
  }
  Token.t = type;
  return Token;
}
const Email = createTokenClass("email", {
  isLink: true,
  toHref() {
    return "mailto:" + this.toString();
  }
});
const Text = createTokenClass("text");
const Nl = createTokenClass("nl");
const Url = createTokenClass("url", {
  isLink: true,
  /**
  	Lowercases relevant parts of the domain and adds the protocol if
  	required. Note that this will not escape unsafe HTML characters in the
  	URL.
  		@param {string} [scheme] default scheme (e.g., 'https')
  	@return {string} the full href
  */
  toHref(scheme2) {
    if (scheme2 === void 0) {
      scheme2 = defaults.defaultProtocol;
    }
    return this.hasProtocol() ? this.v : `${scheme2}://${this.v}`;
  },
  /**
   * Check whether this URL token has a protocol
   * @return {boolean}
   */
  hasProtocol() {
    const tokens = this.tk;
    return tokens.length >= 2 && tokens[0].t !== LOCALHOST && tokens[1].t === COLON;
  }
});
const makeState = (arg) => new State(arg);
function init$1(_ref) {
  let {
    groups
  } = _ref;
  const qsAccepting = groups.domain.concat([AMPERSAND, ASTERISK, AT, BACKSLASH, BACKTICK, CARET, DOLLAR, EQUALS, HYPHEN, NUM, PERCENT, PIPE, PLUS, POUND, SLASH, SYM, TILDE, UNDERSCORE]);
  const qsNonAccepting = [APOSTROPHE, COLON, COMMA, DOT, EXCLAMATION, QUERY, QUOTE, SEMI, OPENANGLEBRACKET, CLOSEANGLEBRACKET, OPENBRACE, CLOSEBRACE, CLOSEBRACKET, OPENBRACKET, OPENPAREN, CLOSEPAREN, FULLWIDTHLEFTPAREN, FULLWIDTHRIGHTPAREN, LEFTCORNERBRACKET, RIGHTCORNERBRACKET, LEFTWHITECORNERBRACKET, RIGHTWHITECORNERBRACKET, FULLWIDTHLESSTHAN, FULLWIDTHGREATERTHAN];
  const localpartAccepting = [AMPERSAND, APOSTROPHE, ASTERISK, BACKSLASH, BACKTICK, CARET, DOLLAR, EQUALS, HYPHEN, OPENBRACE, CLOSEBRACE, PERCENT, PIPE, PLUS, POUND, QUERY, SLASH, SYM, TILDE, UNDERSCORE];
  const Start = makeState();
  const Localpart = tt(Start, TILDE);
  ta(Localpart, localpartAccepting, Localpart);
  ta(Localpart, groups.domain, Localpart);
  const Domain = makeState(), Scheme = makeState(), SlashScheme = makeState();
  ta(Start, groups.domain, Domain);
  ta(Start, groups.scheme, Scheme);
  ta(Start, groups.slashscheme, SlashScheme);
  ta(Domain, localpartAccepting, Localpart);
  ta(Domain, groups.domain, Domain);
  const LocalpartAt = tt(Domain, AT);
  tt(Localpart, AT, LocalpartAt);
  tt(Scheme, AT, LocalpartAt);
  tt(SlashScheme, AT, LocalpartAt);
  const LocalpartDot = tt(Localpart, DOT);
  ta(LocalpartDot, localpartAccepting, Localpart);
  ta(LocalpartDot, groups.domain, Localpart);
  const EmailDomain = makeState();
  ta(LocalpartAt, groups.domain, EmailDomain);
  ta(EmailDomain, groups.domain, EmailDomain);
  const EmailDomainDot = tt(EmailDomain, DOT);
  ta(EmailDomainDot, groups.domain, EmailDomain);
  const Email$1 = makeState(Email);
  ta(EmailDomainDot, groups.tld, Email$1);
  ta(EmailDomainDot, groups.utld, Email$1);
  tt(LocalpartAt, LOCALHOST, Email$1);
  const EmailDomainHyphen = tt(EmailDomain, HYPHEN);
  ta(EmailDomainHyphen, groups.domain, EmailDomain);
  ta(Email$1, groups.domain, EmailDomain);
  tt(Email$1, DOT, EmailDomainDot);
  tt(Email$1, HYPHEN, EmailDomainHyphen);
  const EmailColon = tt(Email$1, COLON);
  ta(EmailColon, groups.numeric, Email);
  const DomainHyphen = tt(Domain, HYPHEN);
  const DomainDot = tt(Domain, DOT);
  ta(DomainHyphen, groups.domain, Domain);
  ta(DomainDot, localpartAccepting, Localpart);
  ta(DomainDot, groups.domain, Domain);
  const DomainDotTld = makeState(Url);
  ta(DomainDot, groups.tld, DomainDotTld);
  ta(DomainDot, groups.utld, DomainDotTld);
  ta(DomainDotTld, groups.domain, Domain);
  ta(DomainDotTld, localpartAccepting, Localpart);
  tt(DomainDotTld, DOT, DomainDot);
  tt(DomainDotTld, HYPHEN, DomainHyphen);
  tt(DomainDotTld, AT, LocalpartAt);
  const DomainDotTldColon = tt(DomainDotTld, COLON);
  const DomainDotTldColonPort = makeState(Url);
  ta(DomainDotTldColon, groups.numeric, DomainDotTldColonPort);
  const Url$1 = makeState(Url);
  const UrlNonaccept = makeState();
  ta(Url$1, qsAccepting, Url$1);
  ta(Url$1, qsNonAccepting, UrlNonaccept);
  ta(UrlNonaccept, qsAccepting, Url$1);
  ta(UrlNonaccept, qsNonAccepting, UrlNonaccept);
  tt(DomainDotTld, SLASH, Url$1);
  tt(DomainDotTldColonPort, SLASH, Url$1);
  const SchemeColon = tt(Scheme, COLON);
  const SlashSchemeColon = tt(SlashScheme, COLON);
  const SlashSchemeColonSlash = tt(SlashSchemeColon, SLASH);
  const UriPrefix = tt(SlashSchemeColonSlash, SLASH);
  ta(Scheme, groups.domain, Domain);
  tt(Scheme, DOT, DomainDot);
  tt(Scheme, HYPHEN, DomainHyphen);
  ta(SlashScheme, groups.domain, Domain);
  tt(SlashScheme, DOT, DomainDot);
  tt(SlashScheme, HYPHEN, DomainHyphen);
  ta(SchemeColon, groups.domain, Url$1);
  tt(SchemeColon, SLASH, Url$1);
  ta(UriPrefix, groups.domain, Url$1);
  ta(UriPrefix, qsAccepting, Url$1);
  tt(UriPrefix, SLASH, Url$1);
  const bracketPairs = [
    [OPENBRACE, CLOSEBRACE],
    // {}
    [OPENBRACKET, CLOSEBRACKET],
    // []
    [OPENPAREN, CLOSEPAREN],
    // ()
    [OPENANGLEBRACKET, CLOSEANGLEBRACKET],
    // <>
    [FULLWIDTHLEFTPAREN, FULLWIDTHRIGHTPAREN],
    // （）
    [LEFTCORNERBRACKET, RIGHTCORNERBRACKET],
    // 「」
    [LEFTWHITECORNERBRACKET, RIGHTWHITECORNERBRACKET],
    // 『』
    [FULLWIDTHLESSTHAN, FULLWIDTHGREATERTHAN]
    // ＜＞
  ];
  for (let i = 0; i < bracketPairs.length; i++) {
    const [OPEN, CLOSE] = bracketPairs[i];
    const UrlOpen = tt(Url$1, OPEN);
    tt(UrlNonaccept, OPEN, UrlOpen);
    tt(UrlOpen, CLOSE, Url$1);
    const UrlOpenQ = makeState(Url);
    ta(UrlOpen, qsAccepting, UrlOpenQ);
    const UrlOpenSyms = makeState();
    ta(UrlOpen, qsNonAccepting);
    ta(UrlOpenQ, qsAccepting, UrlOpenQ);
    ta(UrlOpenQ, qsNonAccepting, UrlOpenSyms);
    ta(UrlOpenSyms, qsAccepting, UrlOpenQ);
    ta(UrlOpenSyms, qsNonAccepting, UrlOpenSyms);
    tt(UrlOpenQ, CLOSE, Url$1);
    tt(UrlOpenSyms, CLOSE, Url$1);
  }
  tt(Start, LOCALHOST, DomainDotTld);
  tt(Start, NL$1, Nl);
  return {
    start: Start,
    tokens: tk
  };
}
function run(start, input, tokens) {
  let len = tokens.length;
  let cursor = 0;
  let multis = [];
  let textTokens = [];
  while (cursor < len) {
    let state = start;
    let secondState = null;
    let nextState = null;
    let multiLength = 0;
    let latestAccepting = null;
    let sinceAccepts = -1;
    while (cursor < len && !(secondState = state.go(tokens[cursor].t))) {
      textTokens.push(tokens[cursor++]);
    }
    while (cursor < len && (nextState = secondState || state.go(tokens[cursor].t))) {
      secondState = null;
      state = nextState;
      if (state.accepts()) {
        sinceAccepts = 0;
        latestAccepting = state;
      } else if (sinceAccepts >= 0) {
        sinceAccepts++;
      }
      cursor++;
      multiLength++;
    }
    if (sinceAccepts < 0) {
      cursor -= multiLength;
      if (cursor < len) {
        textTokens.push(tokens[cursor]);
        cursor++;
      }
    } else {
      if (textTokens.length > 0) {
        multis.push(initMultiToken(Text, input, textTokens));
        textTokens = [];
      }
      cursor -= sinceAccepts;
      multiLength -= sinceAccepts;
      const Multi = latestAccepting.t;
      const subtokens = tokens.slice(cursor - multiLength, cursor);
      multis.push(initMultiToken(Multi, input, subtokens));
    }
  }
  if (textTokens.length > 0) {
    multis.push(initMultiToken(Text, input, textTokens));
  }
  return multis;
}
function initMultiToken(Multi, input, tokens) {
  const startIdx = tokens[0].s;
  const endIdx = tokens[tokens.length - 1].e;
  const value = input.slice(startIdx, endIdx);
  return new Multi(value, tokens);
}
const INIT = {
  scanner: null,
  parser: null,
  tokenQueue: [],
  pluginQueue: [],
  customSchemes: [],
  initialized: false
};
function init() {
  INIT.scanner = init$2(INIT.customSchemes);
  for (let i = 0; i < INIT.tokenQueue.length; i++) {
    INIT.tokenQueue[i][1]({
      scanner: INIT.scanner
    });
  }
  INIT.parser = init$1(INIT.scanner.tokens);
  for (let i = 0; i < INIT.pluginQueue.length; i++) {
    INIT.pluginQueue[i][1]({
      scanner: INIT.scanner,
      parser: INIT.parser
    });
  }
  INIT.initialized = true;
}
function tokenize$1(str) {
  if (!INIT.initialized) {
    init();
  }
  return run(INIT.parser.start, str, run$1(INIT.scanner.start, str));
}
var HTML5NamedCharRefs = {
  // We don't need the complete named character reference because linkifyHtml
  // does not modify the escape sequences. We do need &nbsp; so that
  // whitespace is parsed properly. Other types of whitespace should already
  // be accounted for. &gt; &lt; and &quot; are also frequently relevant ones
  amp: "&",
  gt: ">",
  lt: "<",
  nbsp: " ",
  quot: '"'
};
var HEXCHARCODE = /^#[xX]([A-Fa-f0-9]+)$/;
var CHARCODE = /^#([0-9]+)$/;
var NAMED = /^([A-Za-z0-9]+)$/;
var EntityParser = (
  /** @class */
  function() {
    function EntityParser2(named) {
      this.named = named;
    }
    EntityParser2.prototype.parse = function(entity) {
      if (!entity) {
        return;
      }
      var matches = entity.match(HEXCHARCODE);
      if (matches) {
        return String.fromCharCode(parseInt(matches[1], 16));
      }
      matches = entity.match(CHARCODE);
      if (matches) {
        return String.fromCharCode(parseInt(matches[1], 10));
      }
      matches = entity.match(NAMED);
      if (matches) {
        return this.named[matches[1]] || "&" + matches[1] + ";";
      }
    };
    return EntityParser2;
  }()
);
var WSP = /[\t\n\f ]/;
var ALPHA = /[A-Za-z]/;
var CRLF = /\r\n?/g;
function isSpace(char) {
  return WSP.test(char);
}
function isAlpha(char) {
  return ALPHA.test(char);
}
function preprocessInput(input) {
  return input.replace(CRLF, "\n");
}
var EventedTokenizer = (
  /** @class */
  function() {
    function EventedTokenizer2(delegate, entityParser, mode) {
      if (mode === void 0) {
        mode = "precompile";
      }
      this.delegate = delegate;
      this.entityParser = entityParser;
      this.mode = mode;
      this.state = "beforeData";
      this.line = -1;
      this.column = -1;
      this.input = "";
      this.index = -1;
      this.tagNameBuffer = "";
      this.states = {
        beforeData: function() {
          var char = this.peek();
          if (char === "<" && !this.isIgnoredEndTag()) {
            this.transitionTo(
              "tagOpen"
              /* tagOpen */
            );
            this.markTagStart();
            this.consume();
          } else {
            if (this.mode === "precompile" && char === "\n") {
              var tag = this.tagNameBuffer.toLowerCase();
              if (tag === "pre" || tag === "textarea") {
                this.consume();
              }
            }
            this.transitionTo(
              "data"
              /* data */
            );
            this.delegate.beginData();
          }
        },
        data: function() {
          var char = this.peek();
          var tag = this.tagNameBuffer;
          if (char === "<" && !this.isIgnoredEndTag()) {
            this.delegate.finishData();
            this.transitionTo(
              "tagOpen"
              /* tagOpen */
            );
            this.markTagStart();
            this.consume();
          } else if (char === "&" && tag !== "script" && tag !== "style") {
            this.consume();
            this.delegate.appendToData(this.consumeCharRef() || "&");
          } else {
            this.consume();
            this.delegate.appendToData(char);
          }
        },
        tagOpen: function() {
          var char = this.consume();
          if (char === "!") {
            this.transitionTo(
              "markupDeclarationOpen"
              /* markupDeclarationOpen */
            );
          } else if (char === "/") {
            this.transitionTo(
              "endTagOpen"
              /* endTagOpen */
            );
          } else if (char === "@" || char === ":" || isAlpha(char)) {
            this.transitionTo(
              "tagName"
              /* tagName */
            );
            this.tagNameBuffer = "";
            this.delegate.beginStartTag();
            this.appendToTagName(char);
          }
        },
        markupDeclarationOpen: function() {
          var char = this.consume();
          if (char === "-" && this.peek() === "-") {
            this.consume();
            this.transitionTo(
              "commentStart"
              /* commentStart */
            );
            this.delegate.beginComment();
          } else {
            var maybeDoctype = char.toUpperCase() + this.input.substring(this.index, this.index + 6).toUpperCase();
            if (maybeDoctype === "DOCTYPE") {
              this.consume();
              this.consume();
              this.consume();
              this.consume();
              this.consume();
              this.consume();
              this.transitionTo(
                "doctype"
                /* doctype */
              );
              if (this.delegate.beginDoctype)
                this.delegate.beginDoctype();
            }
          }
        },
        doctype: function() {
          var char = this.consume();
          if (isSpace(char)) {
            this.transitionTo(
              "beforeDoctypeName"
              /* beforeDoctypeName */
            );
          }
        },
        beforeDoctypeName: function() {
          var char = this.consume();
          if (isSpace(char)) {
            return;
          } else {
            this.transitionTo(
              "doctypeName"
              /* doctypeName */
            );
            if (this.delegate.appendToDoctypeName)
              this.delegate.appendToDoctypeName(char.toLowerCase());
          }
        },
        doctypeName: function() {
          var char = this.consume();
          if (isSpace(char)) {
            this.transitionTo(
              "afterDoctypeName"
              /* afterDoctypeName */
            );
          } else if (char === ">") {
            if (this.delegate.endDoctype)
              this.delegate.endDoctype();
            this.transitionTo(
              "beforeData"
              /* beforeData */
            );
          } else {
            if (this.delegate.appendToDoctypeName)
              this.delegate.appendToDoctypeName(char.toLowerCase());
          }
        },
        afterDoctypeName: function() {
          var char = this.consume();
          if (isSpace(char)) {
            return;
          } else if (char === ">") {
            if (this.delegate.endDoctype)
              this.delegate.endDoctype();
            this.transitionTo(
              "beforeData"
              /* beforeData */
            );
          } else {
            var nextSixChars = char.toUpperCase() + this.input.substring(this.index, this.index + 5).toUpperCase();
            var isPublic = nextSixChars.toUpperCase() === "PUBLIC";
            var isSystem = nextSixChars.toUpperCase() === "SYSTEM";
            if (isPublic || isSystem) {
              this.consume();
              this.consume();
              this.consume();
              this.consume();
              this.consume();
              this.consume();
            }
            if (isPublic) {
              this.transitionTo(
                "afterDoctypePublicKeyword"
                /* afterDoctypePublicKeyword */
              );
            } else if (isSystem) {
              this.transitionTo(
                "afterDoctypeSystemKeyword"
                /* afterDoctypeSystemKeyword */
              );
            }
          }
        },
        afterDoctypePublicKeyword: function() {
          var char = this.peek();
          if (isSpace(char)) {
            this.transitionTo(
              "beforeDoctypePublicIdentifier"
              /* beforeDoctypePublicIdentifier */
            );
            this.consume();
          } else if (char === '"') {
            this.transitionTo(
              "doctypePublicIdentifierDoubleQuoted"
              /* doctypePublicIdentifierDoubleQuoted */
            );
            this.consume();
          } else if (char === "'") {
            this.transitionTo(
              "doctypePublicIdentifierSingleQuoted"
              /* doctypePublicIdentifierSingleQuoted */
            );
            this.consume();
          } else if (char === ">") {
            this.consume();
            if (this.delegate.endDoctype)
              this.delegate.endDoctype();
            this.transitionTo(
              "beforeData"
              /* beforeData */
            );
          }
        },
        doctypePublicIdentifierDoubleQuoted: function() {
          var char = this.consume();
          if (char === '"') {
            this.transitionTo(
              "afterDoctypePublicIdentifier"
              /* afterDoctypePublicIdentifier */
            );
          } else if (char === ">") {
            if (this.delegate.endDoctype)
              this.delegate.endDoctype();
            this.transitionTo(
              "beforeData"
              /* beforeData */
            );
          } else {
            if (this.delegate.appendToDoctypePublicIdentifier)
              this.delegate.appendToDoctypePublicIdentifier(char);
          }
        },
        doctypePublicIdentifierSingleQuoted: function() {
          var char = this.consume();
          if (char === "'") {
            this.transitionTo(
              "afterDoctypePublicIdentifier"
              /* afterDoctypePublicIdentifier */
            );
          } else if (char === ">") {
            if (this.delegate.endDoctype)
              this.delegate.endDoctype();
            this.transitionTo(
              "beforeData"
              /* beforeData */
            );
          } else {
            if (this.delegate.appendToDoctypePublicIdentifier)
              this.delegate.appendToDoctypePublicIdentifier(char);
          }
        },
        afterDoctypePublicIdentifier: function() {
          var char = this.consume();
          if (isSpace(char)) {
            this.transitionTo(
              "betweenDoctypePublicAndSystemIdentifiers"
              /* betweenDoctypePublicAndSystemIdentifiers */
            );
          } else if (char === ">") {
            if (this.delegate.endDoctype)
              this.delegate.endDoctype();
            this.transitionTo(
              "beforeData"
              /* beforeData */
            );
          } else if (char === '"') {
            this.transitionTo(
              "doctypeSystemIdentifierDoubleQuoted"
              /* doctypeSystemIdentifierDoubleQuoted */
            );
          } else if (char === "'") {
            this.transitionTo(
              "doctypeSystemIdentifierSingleQuoted"
              /* doctypeSystemIdentifierSingleQuoted */
            );
          }
        },
        betweenDoctypePublicAndSystemIdentifiers: function() {
          var char = this.consume();
          if (isSpace(char)) {
            return;
          } else if (char === ">") {
            if (this.delegate.endDoctype)
              this.delegate.endDoctype();
            this.transitionTo(
              "beforeData"
              /* beforeData */
            );
          } else if (char === '"') {
            this.transitionTo(
              "doctypeSystemIdentifierDoubleQuoted"
              /* doctypeSystemIdentifierDoubleQuoted */
            );
          } else if (char === "'") {
            this.transitionTo(
              "doctypeSystemIdentifierSingleQuoted"
              /* doctypeSystemIdentifierSingleQuoted */
            );
          }
        },
        doctypeSystemIdentifierDoubleQuoted: function() {
          var char = this.consume();
          if (char === '"') {
            this.transitionTo(
              "afterDoctypeSystemIdentifier"
              /* afterDoctypeSystemIdentifier */
            );
          } else if (char === ">") {
            if (this.delegate.endDoctype)
              this.delegate.endDoctype();
            this.transitionTo(
              "beforeData"
              /* beforeData */
            );
          } else {
            if (this.delegate.appendToDoctypeSystemIdentifier)
              this.delegate.appendToDoctypeSystemIdentifier(char);
          }
        },
        doctypeSystemIdentifierSingleQuoted: function() {
          var char = this.consume();
          if (char === "'") {
            this.transitionTo(
              "afterDoctypeSystemIdentifier"
              /* afterDoctypeSystemIdentifier */
            );
          } else if (char === ">") {
            if (this.delegate.endDoctype)
              this.delegate.endDoctype();
            this.transitionTo(
              "beforeData"
              /* beforeData */
            );
          } else {
            if (this.delegate.appendToDoctypeSystemIdentifier)
              this.delegate.appendToDoctypeSystemIdentifier(char);
          }
        },
        afterDoctypeSystemIdentifier: function() {
          var char = this.consume();
          if (isSpace(char)) {
            return;
          } else if (char === ">") {
            if (this.delegate.endDoctype)
              this.delegate.endDoctype();
            this.transitionTo(
              "beforeData"
              /* beforeData */
            );
          }
        },
        commentStart: function() {
          var char = this.consume();
          if (char === "-") {
            this.transitionTo(
              "commentStartDash"
              /* commentStartDash */
            );
          } else if (char === ">") {
            this.delegate.finishComment();
            this.transitionTo(
              "beforeData"
              /* beforeData */
            );
          } else {
            this.delegate.appendToCommentData(char);
            this.transitionTo(
              "comment"
              /* comment */
            );
          }
        },
        commentStartDash: function() {
          var char = this.consume();
          if (char === "-") {
            this.transitionTo(
              "commentEnd"
              /* commentEnd */
            );
          } else if (char === ">") {
            this.delegate.finishComment();
            this.transitionTo(
              "beforeData"
              /* beforeData */
            );
          } else {
            this.delegate.appendToCommentData("-");
            this.transitionTo(
              "comment"
              /* comment */
            );
          }
        },
        comment: function() {
          var char = this.consume();
          if (char === "-") {
            this.transitionTo(
              "commentEndDash"
              /* commentEndDash */
            );
          } else {
            this.delegate.appendToCommentData(char);
          }
        },
        commentEndDash: function() {
          var char = this.consume();
          if (char === "-") {
            this.transitionTo(
              "commentEnd"
              /* commentEnd */
            );
          } else {
            this.delegate.appendToCommentData("-" + char);
            this.transitionTo(
              "comment"
              /* comment */
            );
          }
        },
        commentEnd: function() {
          var char = this.consume();
          if (char === ">") {
            this.delegate.finishComment();
            this.transitionTo(
              "beforeData"
              /* beforeData */
            );
          } else {
            this.delegate.appendToCommentData("--" + char);
            this.transitionTo(
              "comment"
              /* comment */
            );
          }
        },
        tagName: function() {
          var char = this.consume();
          if (isSpace(char)) {
            this.transitionTo(
              "beforeAttributeName"
              /* beforeAttributeName */
            );
          } else if (char === "/") {
            this.transitionTo(
              "selfClosingStartTag"
              /* selfClosingStartTag */
            );
          } else if (char === ">") {
            this.delegate.finishTag();
            this.transitionTo(
              "beforeData"
              /* beforeData */
            );
          } else {
            this.appendToTagName(char);
          }
        },
        endTagName: function() {
          var char = this.consume();
          if (isSpace(char)) {
            this.transitionTo(
              "beforeAttributeName"
              /* beforeAttributeName */
            );
            this.tagNameBuffer = "";
          } else if (char === "/") {
            this.transitionTo(
              "selfClosingStartTag"
              /* selfClosingStartTag */
            );
            this.tagNameBuffer = "";
          } else if (char === ">") {
            this.delegate.finishTag();
            this.transitionTo(
              "beforeData"
              /* beforeData */
            );
            this.tagNameBuffer = "";
          } else {
            this.appendToTagName(char);
          }
        },
        beforeAttributeName: function() {
          var char = this.peek();
          if (isSpace(char)) {
            this.consume();
            return;
          } else if (char === "/") {
            this.transitionTo(
              "selfClosingStartTag"
              /* selfClosingStartTag */
            );
            this.consume();
          } else if (char === ">") {
            this.consume();
            this.delegate.finishTag();
            this.transitionTo(
              "beforeData"
              /* beforeData */
            );
          } else if (char === "=") {
            this.delegate.reportSyntaxError("attribute name cannot start with equals sign");
            this.transitionTo(
              "attributeName"
              /* attributeName */
            );
            this.delegate.beginAttribute();
            this.consume();
            this.delegate.appendToAttributeName(char);
          } else {
            this.transitionTo(
              "attributeName"
              /* attributeName */
            );
            this.delegate.beginAttribute();
          }
        },
        attributeName: function() {
          var char = this.peek();
          if (isSpace(char)) {
            this.transitionTo(
              "afterAttributeName"
              /* afterAttributeName */
            );
            this.consume();
          } else if (char === "/") {
            this.delegate.beginAttributeValue(false);
            this.delegate.finishAttributeValue();
            this.consume();
            this.transitionTo(
              "selfClosingStartTag"
              /* selfClosingStartTag */
            );
          } else if (char === "=") {
            this.transitionTo(
              "beforeAttributeValue"
              /* beforeAttributeValue */
            );
            this.consume();
          } else if (char === ">") {
            this.delegate.beginAttributeValue(false);
            this.delegate.finishAttributeValue();
            this.consume();
            this.delegate.finishTag();
            this.transitionTo(
              "beforeData"
              /* beforeData */
            );
          } else if (char === '"' || char === "'" || char === "<") {
            this.delegate.reportSyntaxError(char + " is not a valid character within attribute names");
            this.consume();
            this.delegate.appendToAttributeName(char);
          } else {
            this.consume();
            this.delegate.appendToAttributeName(char);
          }
        },
        afterAttributeName: function() {
          var char = this.peek();
          if (isSpace(char)) {
            this.consume();
            return;
          } else if (char === "/") {
            this.delegate.beginAttributeValue(false);
            this.delegate.finishAttributeValue();
            this.consume();
            this.transitionTo(
              "selfClosingStartTag"
              /* selfClosingStartTag */
            );
          } else if (char === "=") {
            this.consume();
            this.transitionTo(
              "beforeAttributeValue"
              /* beforeAttributeValue */
            );
          } else if (char === ">") {
            this.delegate.beginAttributeValue(false);
            this.delegate.finishAttributeValue();
            this.consume();
            this.delegate.finishTag();
            this.transitionTo(
              "beforeData"
              /* beforeData */
            );
          } else {
            this.delegate.beginAttributeValue(false);
            this.delegate.finishAttributeValue();
            this.transitionTo(
              "attributeName"
              /* attributeName */
            );
            this.delegate.beginAttribute();
            this.consume();
            this.delegate.appendToAttributeName(char);
          }
        },
        beforeAttributeValue: function() {
          var char = this.peek();
          if (isSpace(char)) {
            this.consume();
          } else if (char === '"') {
            this.transitionTo(
              "attributeValueDoubleQuoted"
              /* attributeValueDoubleQuoted */
            );
            this.delegate.beginAttributeValue(true);
            this.consume();
          } else if (char === "'") {
            this.transitionTo(
              "attributeValueSingleQuoted"
              /* attributeValueSingleQuoted */
            );
            this.delegate.beginAttributeValue(true);
            this.consume();
          } else if (char === ">") {
            this.delegate.beginAttributeValue(false);
            this.delegate.finishAttributeValue();
            this.consume();
            this.delegate.finishTag();
            this.transitionTo(
              "beforeData"
              /* beforeData */
            );
          } else {
            this.transitionTo(
              "attributeValueUnquoted"
              /* attributeValueUnquoted */
            );
            this.delegate.beginAttributeValue(false);
            this.consume();
            this.delegate.appendToAttributeValue(char);
          }
        },
        attributeValueDoubleQuoted: function() {
          var char = this.consume();
          if (char === '"') {
            this.delegate.finishAttributeValue();
            this.transitionTo(
              "afterAttributeValueQuoted"
              /* afterAttributeValueQuoted */
            );
          } else if (char === "&") {
            this.delegate.appendToAttributeValue(this.consumeCharRef() || "&");
          } else {
            this.delegate.appendToAttributeValue(char);
          }
        },
        attributeValueSingleQuoted: function() {
          var char = this.consume();
          if (char === "'") {
            this.delegate.finishAttributeValue();
            this.transitionTo(
              "afterAttributeValueQuoted"
              /* afterAttributeValueQuoted */
            );
          } else if (char === "&") {
            this.delegate.appendToAttributeValue(this.consumeCharRef() || "&");
          } else {
            this.delegate.appendToAttributeValue(char);
          }
        },
        attributeValueUnquoted: function() {
          var char = this.peek();
          if (isSpace(char)) {
            this.delegate.finishAttributeValue();
            this.consume();
            this.transitionTo(
              "beforeAttributeName"
              /* beforeAttributeName */
            );
          } else if (char === "/") {
            this.delegate.finishAttributeValue();
            this.consume();
            this.transitionTo(
              "selfClosingStartTag"
              /* selfClosingStartTag */
            );
          } else if (char === "&") {
            this.consume();
            this.delegate.appendToAttributeValue(this.consumeCharRef() || "&");
          } else if (char === ">") {
            this.delegate.finishAttributeValue();
            this.consume();
            this.delegate.finishTag();
            this.transitionTo(
              "beforeData"
              /* beforeData */
            );
          } else {
            this.consume();
            this.delegate.appendToAttributeValue(char);
          }
        },
        afterAttributeValueQuoted: function() {
          var char = this.peek();
          if (isSpace(char)) {
            this.consume();
            this.transitionTo(
              "beforeAttributeName"
              /* beforeAttributeName */
            );
          } else if (char === "/") {
            this.consume();
            this.transitionTo(
              "selfClosingStartTag"
              /* selfClosingStartTag */
            );
          } else if (char === ">") {
            this.consume();
            this.delegate.finishTag();
            this.transitionTo(
              "beforeData"
              /* beforeData */
            );
          } else {
            this.transitionTo(
              "beforeAttributeName"
              /* beforeAttributeName */
            );
          }
        },
        selfClosingStartTag: function() {
          var char = this.peek();
          if (char === ">") {
            this.consume();
            this.delegate.markTagAsSelfClosing();
            this.delegate.finishTag();
            this.transitionTo(
              "beforeData"
              /* beforeData */
            );
          } else {
            this.transitionTo(
              "beforeAttributeName"
              /* beforeAttributeName */
            );
          }
        },
        endTagOpen: function() {
          var char = this.consume();
          if (char === "@" || char === ":" || isAlpha(char)) {
            this.transitionTo(
              "endTagName"
              /* endTagName */
            );
            this.tagNameBuffer = "";
            this.delegate.beginEndTag();
            this.appendToTagName(char);
          }
        }
      };
      this.reset();
    }
    EventedTokenizer2.prototype.reset = function() {
      this.transitionTo(
        "beforeData"
        /* beforeData */
      );
      this.input = "";
      this.tagNameBuffer = "";
      this.index = 0;
      this.line = 1;
      this.column = 0;
      this.delegate.reset();
    };
    EventedTokenizer2.prototype.transitionTo = function(state) {
      this.state = state;
    };
    EventedTokenizer2.prototype.tokenize = function(input) {
      this.reset();
      this.tokenizePart(input);
      this.tokenizeEOF();
    };
    EventedTokenizer2.prototype.tokenizePart = function(input) {
      this.input += preprocessInput(input);
      while (this.index < this.input.length) {
        var handler = this.states[this.state];
        if (handler !== void 0) {
          handler.call(this);
        } else {
          throw new Error("unhandled state " + this.state);
        }
      }
    };
    EventedTokenizer2.prototype.tokenizeEOF = function() {
      this.flushData();
    };
    EventedTokenizer2.prototype.flushData = function() {
      if (this.state === "data") {
        this.delegate.finishData();
        this.transitionTo(
          "beforeData"
          /* beforeData */
        );
      }
    };
    EventedTokenizer2.prototype.peek = function() {
      return this.input.charAt(this.index);
    };
    EventedTokenizer2.prototype.consume = function() {
      var char = this.peek();
      this.index++;
      if (char === "\n") {
        this.line++;
        this.column = 0;
      } else {
        this.column++;
      }
      return char;
    };
    EventedTokenizer2.prototype.consumeCharRef = function() {
      var endIndex = this.input.indexOf(";", this.index);
      if (endIndex === -1) {
        return;
      }
      var entity = this.input.slice(this.index, endIndex);
      var chars = this.entityParser.parse(entity);
      if (chars) {
        var count = entity.length;
        while (count) {
          this.consume();
          count--;
        }
        this.consume();
        return chars;
      }
    };
    EventedTokenizer2.prototype.markTagStart = function() {
      this.delegate.tagOpen();
    };
    EventedTokenizer2.prototype.appendToTagName = function(char) {
      this.tagNameBuffer += char;
      this.delegate.appendToTagName(char);
    };
    EventedTokenizer2.prototype.isIgnoredEndTag = function() {
      var tag = this.tagNameBuffer;
      return tag === "title" && this.input.substring(this.index, this.index + 8) !== "</title>" || tag === "style" && this.input.substring(this.index, this.index + 8) !== "</style>" || tag === "script" && this.input.substring(this.index, this.index + 9) !== "<\/script>";
    };
    return EventedTokenizer2;
  }()
);
var Tokenizer = (
  /** @class */
  function() {
    function Tokenizer2(entityParser, options) {
      if (options === void 0) {
        options = {};
      }
      this.options = options;
      this.token = null;
      this.startLine = 1;
      this.startColumn = 0;
      this.tokens = [];
      this.tokenizer = new EventedTokenizer(this, entityParser, options.mode);
      this._currentAttribute = void 0;
    }
    Tokenizer2.prototype.tokenize = function(input) {
      this.tokens = [];
      this.tokenizer.tokenize(input);
      return this.tokens;
    };
    Tokenizer2.prototype.tokenizePart = function(input) {
      this.tokens = [];
      this.tokenizer.tokenizePart(input);
      return this.tokens;
    };
    Tokenizer2.prototype.tokenizeEOF = function() {
      this.tokens = [];
      this.tokenizer.tokenizeEOF();
      return this.tokens[0];
    };
    Tokenizer2.prototype.reset = function() {
      this.token = null;
      this.startLine = 1;
      this.startColumn = 0;
    };
    Tokenizer2.prototype.current = function() {
      var token = this.token;
      if (token === null) {
        throw new Error("token was unexpectedly null");
      }
      if (arguments.length === 0) {
        return token;
      }
      for (var i = 0; i < arguments.length; i++) {
        if (token.type === arguments[i]) {
          return token;
        }
      }
      throw new Error("token type was unexpectedly " + token.type);
    };
    Tokenizer2.prototype.push = function(token) {
      this.token = token;
      this.tokens.push(token);
    };
    Tokenizer2.prototype.currentAttribute = function() {
      return this._currentAttribute;
    };
    Tokenizer2.prototype.addLocInfo = function() {
      if (this.options.loc) {
        this.current().loc = {
          start: {
            line: this.startLine,
            column: this.startColumn
          },
          end: {
            line: this.tokenizer.line,
            column: this.tokenizer.column
          }
        };
      }
      this.startLine = this.tokenizer.line;
      this.startColumn = this.tokenizer.column;
    };
    Tokenizer2.prototype.beginDoctype = function() {
      this.push({
        type: "Doctype",
        name: ""
      });
    };
    Tokenizer2.prototype.appendToDoctypeName = function(char) {
      this.current(
        "Doctype"
        /* Doctype */
      ).name += char;
    };
    Tokenizer2.prototype.appendToDoctypePublicIdentifier = function(char) {
      var doctype = this.current(
        "Doctype"
        /* Doctype */
      );
      if (doctype.publicIdentifier === void 0) {
        doctype.publicIdentifier = char;
      } else {
        doctype.publicIdentifier += char;
      }
    };
    Tokenizer2.prototype.appendToDoctypeSystemIdentifier = function(char) {
      var doctype = this.current(
        "Doctype"
        /* Doctype */
      );
      if (doctype.systemIdentifier === void 0) {
        doctype.systemIdentifier = char;
      } else {
        doctype.systemIdentifier += char;
      }
    };
    Tokenizer2.prototype.endDoctype = function() {
      this.addLocInfo();
    };
    Tokenizer2.prototype.beginData = function() {
      this.push({
        type: "Chars",
        chars: ""
      });
    };
    Tokenizer2.prototype.appendToData = function(char) {
      this.current(
        "Chars"
        /* Chars */
      ).chars += char;
    };
    Tokenizer2.prototype.finishData = function() {
      this.addLocInfo();
    };
    Tokenizer2.prototype.beginComment = function() {
      this.push({
        type: "Comment",
        chars: ""
      });
    };
    Tokenizer2.prototype.appendToCommentData = function(char) {
      this.current(
        "Comment"
        /* Comment */
      ).chars += char;
    };
    Tokenizer2.prototype.finishComment = function() {
      this.addLocInfo();
    };
    Tokenizer2.prototype.tagOpen = function() {
    };
    Tokenizer2.prototype.beginStartTag = function() {
      this.push({
        type: "StartTag",
        tagName: "",
        attributes: [],
        selfClosing: false
      });
    };
    Tokenizer2.prototype.beginEndTag = function() {
      this.push({
        type: "EndTag",
        tagName: ""
      });
    };
    Tokenizer2.prototype.finishTag = function() {
      this.addLocInfo();
    };
    Tokenizer2.prototype.markTagAsSelfClosing = function() {
      this.current(
        "StartTag"
        /* StartTag */
      ).selfClosing = true;
    };
    Tokenizer2.prototype.appendToTagName = function(char) {
      this.current(
        "StartTag",
        "EndTag"
        /* EndTag */
      ).tagName += char;
    };
    Tokenizer2.prototype.beginAttribute = function() {
      this._currentAttribute = ["", "", false];
    };
    Tokenizer2.prototype.appendToAttributeName = function(char) {
      this.currentAttribute()[0] += char;
    };
    Tokenizer2.prototype.beginAttributeValue = function(isQuoted) {
      this.currentAttribute()[2] = isQuoted;
    };
    Tokenizer2.prototype.appendToAttributeValue = function(char) {
      this.currentAttribute()[1] += char;
    };
    Tokenizer2.prototype.finishAttributeValue = function() {
      this.current(
        "StartTag"
        /* StartTag */
      ).attributes.push(this._currentAttribute);
    };
    Tokenizer2.prototype.reportSyntaxError = function(message) {
      this.current().syntaxError = message;
    };
    return Tokenizer2;
  }()
);
function tokenize(input, options) {
  var tokenizer = new Tokenizer(new EntityParser(HTML5NamedCharRefs), options);
  return tokenizer.tokenize(input);
}
const LinkifyResult = "LinkifyResult";
const StartTag = "StartTag";
const EndTag = "EndTag";
const Chars = "Chars";
const Comment = "Comment";
const Doctype = "Doctype";
function linkifyHtml(str, opts) {
  if (opts === void 0) {
    opts = {};
  }
  const tokens = tokenize(str);
  const linkifiedTokens = [];
  const linkified = [];
  const options = new Options(opts, defaultRender);
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.type === StartTag) {
      linkifiedTokens.push(token);
      const tagName = token.tagName.toUpperCase();
      const isIgnored = tagName === "A" || options.ignoreTags.indexOf(tagName) >= 0;
      if (!isIgnored) {
        continue;
      }
      let preskipLen = linkifiedTokens.length;
      skipTagTokens(tagName, tokens, ++i, linkifiedTokens);
      i += linkifiedTokens.length - preskipLen - 1;
    } else if (token.type !== Chars) {
      linkifiedTokens.push(token);
    } else {
      const linkifedChars = linkifyChars(token.chars, options);
      linkifiedTokens.push.apply(linkifiedTokens, linkifedChars);
    }
  }
  for (let i = 0; i < linkifiedTokens.length; i++) {
    const token = linkifiedTokens[i];
    switch (token.type) {
      case LinkifyResult:
        linkified.push(token.rendered);
        break;
      case StartTag: {
        let link = "<" + token.tagName;
        if (token.attributes.length > 0) {
          link += " " + attributeArrayToStrings(token.attributes).join(" ");
        }
        if (token.selfClosing) {
          link += " /";
        }
        link += ">";
        linkified.push(link);
        break;
      }
      case EndTag:
        linkified.push(`</${token.tagName}>`);
        break;
      case Chars:
        linkified.push(escapeText(token.chars));
        break;
      case Comment:
        linkified.push(`<!--${escapeText(token.chars)}-->`);
        break;
      case Doctype: {
        let doctype = `<!DOCTYPE ${token.name}`;
        if (token.publicIdentifier) {
          doctype += ` PUBLIC "${token.publicIdentifier}"`;
        }
        if (token.systemIdentifier) {
          doctype += ` "${token.systemIdentifier}"`;
        }
        doctype += ">";
        linkified.push(doctype);
        break;
      }
    }
  }
  return linkified.join("");
}
function linkifyChars(str, options) {
  const tokens = tokenize$1(str);
  const result = [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.t === "nl" && options.get("nl2br")) {
      result.push({
        type: StartTag,
        tagName: "br",
        attributes: [],
        selfClosing: true
      });
    } else if (!token.isLink || !options.check(token)) {
      result.push({
        type: Chars,
        chars: token.toString()
      });
    } else {
      result.push({
        type: LinkifyResult,
        rendered: options.render(token)
      });
    }
  }
  return result;
}
function skipTagTokens(tagName, tokens, i, skippedTokens) {
  let stackCount = 1;
  while (i < tokens.length && stackCount > 0) {
    let token = tokens[i];
    if (token.type === StartTag && token.tagName.toUpperCase() === tagName) {
      stackCount++;
    } else if (token.type === EndTag && token.tagName.toUpperCase() === tagName) {
      stackCount--;
    }
    skippedTokens.push(token);
    i++;
  }
  return skippedTokens;
}
function defaultRender(_ref) {
  let {
    tagName,
    attributes,
    content
  } = _ref;
  return `<${tagName} ${attributesToString(attributes)}>${escapeText(content)}</${tagName}>`;
}
function escapeText(text) {
  return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function escapeAttr(attr) {
  return attr.replace(/"/g, "&quot;");
}
function attributesToString(attributes) {
  const result = [];
  for (const attr in attributes) {
    const val = attributes[attr] + "";
    result.push(`${attr}="${escapeAttr(val)}"`);
  }
  return result.join(" ");
}
function attributeArrayToStrings(attrs) {
  const attrStrs = [];
  for (let i = 0; i < attrs.length; i++) {
    const name = attrs[i][0];
    const value = attrs[i][1] + "";
    attrStrs.push(`${name}="${escapeAttr(value)}"`);
  }
  return attrStrs;
}
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "button",
  props: {
    button: {}
  },
  setup(__props) {
    const mainStore = useMainStore();
    const props = __props;
    function sendButtonMessage() {
      mainStore.sendUserMessage(props.button.title);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("button", {
        class: "tvk-btn tvk-btn-action",
        onClick: sendButtonMessage
      }, toDisplayString(props.button.title), 1);
    };
  }
});
const _hoisted_1$5 = { class: "tvk-footnote" };
const _hoisted_2$4 = ["href"];
const _hoisted_3$2 = {
  key: 1,
  class: "tvk-footnote-title"
};
const _hoisted_4$2 = {
  key: 2,
  class: "tvk-footnote-content"
};
const _hoisted_5$2 = ["innerHTML"];
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "footnote",
  props: {
    footnote: {}
  },
  setup(__props) {
    const appOptions = appOptionsSingleton.getOptions();
    const props = __props;
    const showFullText = ref(false);
    function getLinkyfiedSourceContent() {
      return linkifyHtml(props.footnote.content, { target: "_blank" });
    }
    const contentTxt = ref(null);
    function isClamped() {
      if (!contentTxt.value)
        return false;
      return contentTxt.value.offsetHeight < contentTxt.value.scrollHeight;
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$5, [
        props.footnote.url ? (openBlock(), createElementBlock("a", {
          key: 0,
          href: props.footnote.url,
          target: "_blank",
          class: "tvk-footnote-title"
        }, toDisplayString(props.footnote.title), 9, _hoisted_2$4)) : createCommentVNode("", true),
        !props.footnote.url ? (openBlock(), createElementBlock("span", _hoisted_3$2, toDisplayString(props.footnote.title), 1)) : createCommentVNode("", true),
        props.footnote.content ? (openBlock(), createElementBlock("div", _hoisted_4$2, [
          createElementVNode("div", {
            ref_key: "contentTxt",
            ref: contentTxt,
            style: normalizeStyle({
              "--tvk-clamp-nb-line": unref(appOptions).preferences.messages.footNotes.clampSourceContentNbLines
            }),
            class: normalizeClass({
              "tvk-clamp": unref(appOptions).preferences.messages.footNotes.clampSourceContent && !showFullText.value
            })
          }, [
            createElementVNode("span", {
              innerHTML: getLinkyfiedSourceContent()
            }, null, 8, _hoisted_5$2)
          ], 6),
          props.footnote.content && unref(appOptions).preferences.messages.footNotes.clampSourceContent && !showFullText.value && isClamped() ? (openBlock(), createElementBlock("a", {
            key: 0,
            href: "javascript:void(0)",
            class: "tvk-footnote-content-show-more-link",
            onClick: _cache[0] || (_cache[0] = ($event) => showFullText.value = !showFullText.value)
          }, toDisplayString(unref(appOptions).wording.messages.message.footnotes.showMoreLink), 1)) : createCommentVNode("", true)
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
const _hoisted_1$4 = { class: "tvk-footnotes" };
const _hoisted_2$3 = { class: "tvk-footnotes-sources-label" };
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "footnotes",
  props: {
    footnotes: {}
  },
  setup(__props) {
    const appOptions = appOptionsSingleton.getOptions();
    const props = __props;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$4, [
        createElementVNode("span", _hoisted_2$3, toDisplayString(unref(appOptions).wording.messages.message.footnotes.sources), 1),
        (openBlock(true), createElementBlock(Fragment, null, renderList(props.footnotes, (footnote) => {
          return openBlock(), createBlock(_sfc_main$8, { footnote }, null, 8, ["footnote"]);
        }), 256))
      ]);
    };
  }
});
const _hoisted_1$3 = ["innerHTML"];
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "message-text",
  props: {
    message: {}
  },
  setup(__props) {
    const appOptions = appOptionsSingleton.getOptions();
    const props = __props;
    function getLinkyfiedText() {
      return linkifyHtml(props.message.text, { target: "_blank" });
    }
    return (_ctx, _cache) => {
      var _a;
      return openBlock(), createElementBlock(Fragment, null, [
        createElementVNode("div", {
          innerHTML: getLinkyfiedText(),
          tabindex: "1"
        }, null, 8, _hoisted_1$3),
        ((_a = props.message.footnotes) == null ? void 0 : _a.length) && unref(appOptions).preferences.messages.footNotes.display && !unref(appOptions).preferences.messages.footNotes.displayOnMessageSide ? (openBlock(), createBlock(_sfc_main$7, {
          key: 0,
          footnotes: props.message.footnotes
        }, null, 8, ["footnotes"])) : createCommentVNode("", true),
        (openBlock(true), createElementBlock(Fragment, null, renderList(props.message.buttons, (button) => {
          return openBlock(), createBlock(_sfc_main$9, { button }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(button.title), 1)
            ]),
            _: 2
          }, 1032, ["button"]);
        }), 256))
      ], 64);
    };
  }
});
const _hoisted_1$2 = { class: "tvk-card" };
const _hoisted_2$2 = ["src", "alt"];
const _hoisted_3$1 = { key: 1 };
const _hoisted_4$1 = { key: 2 };
const _hoisted_5$1 = { key: 3 };
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "message-card",
  props: {
    card: {}
  },
  setup(__props) {
    var _a, _b, _c;
    const mainStore = useMainStore();
    appOptionsSingleton.getOptions();
    const props = __props;
    const imageAlternative = ((_b = (_a = props.card) == null ? void 0 : _a.file) == null ? void 0 : _b.description) ?? ((_c = props.card) == null ? void 0 : _c.title);
    function onImgLoad(event) {
      if (props.card.file._loaded)
        return;
      props.card.file._loaded = true;
      mainStore.scrollMessages();
    }
    return (_ctx, _cache) => {
      var _a2, _b2, _c2, _d, _e, _f, _g, _h, _i, _j, _k, _l;
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        ((_b2 = (_a2 = props.card) == null ? void 0 : _a2.file) == null ? void 0 : _b2.url) ? (openBlock(), createElementBlock("img", {
          key: 0,
          src: (_d = (_c2 = props.card) == null ? void 0 : _c2.file) == null ? void 0 : _d.url,
          alt: unref(imageAlternative),
          onLoad: onImgLoad,
          class: "tvk-thumbnail"
        }, null, 40, _hoisted_2$2)) : createCommentVNode("", true),
        ((_e = props.card) == null ? void 0 : _e.title) ? (openBlock(), createElementBlock("div", _hoisted_3$1, [
          createElementVNode("strong", null, toDisplayString((_f = props.card) == null ? void 0 : _f.title), 1)
        ])) : createCommentVNode("", true),
        ((_g = props.card) == null ? void 0 : _g.subTitle) ? (openBlock(), createElementBlock("div", _hoisted_4$1, toDisplayString((_h = props.card) == null ? void 0 : _h.subTitle), 1)) : createCommentVNode("", true),
        ((_j = (_i = props.card) == null ? void 0 : _i.file) == null ? void 0 : _j.description) ? (openBlock(), createElementBlock("div", _hoisted_5$1, toDisplayString((_l = (_k = props.card) == null ? void 0 : _k.file) == null ? void 0 : _l.description), 1)) : createCommentVNode("", true)
      ]);
    };
  }
});
const transition = "transform 0.2s";
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "message-carousel",
  props: {
    carousel: {}
  },
  setup(__props) {
    const props = __props;
    const cards = ref(props.carousel.cards);
    const cardsRefs = ref([]);
    const carouselRef = ref(null);
    const innerRef = ref(null);
    const carouselStyles = ref({});
    const innerStyles = ref({});
    const transitioning = ref(false);
    function freezeCarouselWidth() {
      var _a;
      const carouselWidth = (_a = carouselRef.value) == null ? void 0 : _a.offsetWidth;
      carouselStyles.value = {
        overflow: "hidden",
        "max-width": `${carouselWidth}px`
      };
    }
    function getTotalInnerWidth() {
      return cardsRefs.value.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.offsetWidth;
      }, 0);
    }
    function next() {
      if (transitioning.value)
        return;
      transitioning.value = true;
      freezeCarouselWidth();
      const totalInnerWidth = getTotalInnerWidth();
      const firstcard = cards.value[0];
      cards.value.push(firstcard);
      const firstCardRef = cardsRefs.value[0];
      innerStyles.value = {
        transition,
        transform: `translateX(-${firstCardRef.offsetWidth}px)`,
        width: `${totalInnerWidth + firstCardRef.offsetWidth + 1}px`
      };
      afterTransition(() => {
        cards.value.shift();
        resetTranslate();
        transitioning.value = false;
      });
    }
    function prev() {
      if (transitioning.value)
        return;
      transitioning.value = true;
      freezeCarouselWidth();
      const totalInnerWidth = getTotalInnerWidth();
      const lastCard = cards.value[cards.value.length - 1];
      cards.value.unshift(lastCard);
      const lastCardRef = cardsRefs.value[cardsRefs.value.length - 1];
      innerStyles.value = {
        transition: "none",
        transform: `translateX(-${lastCardRef.offsetWidth}px)`,
        width: `${totalInnerWidth + lastCardRef.offsetWidth + 1}px`
      };
      setTimeout(() => {
        innerStyles.value = {
          transition,
          transform: `translateX(0)`,
          width: `${totalInnerWidth + lastCardRef.offsetWidth + 1}px`
        };
        afterTransition(() => {
          cards.value.pop();
          resetTranslate();
          transitioning.value = false;
        });
      });
    }
    function afterTransition(callback) {
      var _a;
      const listener = () => {
        var _a2;
        callback();
        (_a2 = innerRef.value) == null ? void 0 : _a2.removeEventListener("transitionend", listener);
      };
      (_a = innerRef.value) == null ? void 0 : _a.addEventListener("transitionend", listener);
    }
    function resetTranslate() {
      carouselStyles.value = {};
      innerStyles.value = {
        transition: "none",
        transform: `translateX(0)`
      };
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createElementVNode("div", {
          class: "tvk-carousel",
          ref_key: "carouselRef",
          ref: carouselRef,
          style: normalizeStyle(carouselStyles.value)
        }, [
          createElementVNode("div", {
            class: "tvk-carousel-inner",
            ref_key: "innerRef",
            ref: innerRef,
            style: normalizeStyle(innerStyles.value)
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(cards.value, (card) => {
              return openBlock(), createElementBlock("div", {
                class: "tvk-carousel-card",
                key: JSON.stringify(card),
                ref_for: true,
                ref_key: "cardsRefs",
                ref: cardsRefs
              }, [
                createVNode(_sfc_main$5, { card }, null, 8, ["card"])
              ]);
            }), 128))
          ], 4)
        ], 4),
        createElementVNode("div", { class: "tvk-carousel-controls" }, [
          createElementVNode("button", {
            class: "tvk-btn",
            onClick: prev
          }, "prev"),
          createElementVNode("button", {
            class: "tvk-btn",
            onClick: next
          }, "next")
        ])
      ], 64);
    };
  }
});
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "message-image",
  props: { message: Object },
  setup(__props) {
    appOptionsSingleton.getOptions();
    return (_ctx, _cache) => {
      return "Image type not yet implemented";
    };
  }
});
const _hoisted_1$1 = { class: "tvk-message-answer" };
const _hoisted_2$1 = {
  key: 0,
  class: "tvk-message-header"
};
const _hoisted_3 = {
  key: 0,
  class: "tvk-message-header-avatar"
};
const _hoisted_4 = ["src"];
const _hoisted_5 = ["src"];
const _hoisted_6 = {
  key: 1,
  class: "tvk-message-header-label"
};
const _hoisted_7 = { class: "tvk-message-header-label-user" };
const _hoisted_8 = { class: "tvk-message-header-label-bot" };
const _hoisted_9 = {
  key: 1,
  class: "tvk-message-body"
};
const _hoisted_10 = {
  key: 2,
  class: "tvk-message-body-from-app"
};
const _hoisted_11 = {
  key: 0,
  class: "tvk-message-loader"
};
const _hoisted_12 = {
  key: 1,
  class: "tvk-error-connection"
};
const _hoisted_13 = /* @__PURE__ */ createElementVNode("i", { class: "tvk-error-icon bi bi-exclamation-triangle" }, null, -1);
const _hoisted_14 = ["innerHTML"];
const _hoisted_15 = {
  key: 0,
  class: "tvk-side-footnotes"
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "message",
  props: {
    message: {}
  },
  setup(__props) {
    const appOptions = appOptionsSingleton.getOptions();
    const props = __props;
    return (_ctx, _cache) => {
      var _a;
      return props.message.author !== unref(MessageAuthor).user || !unref(appOptions).preferences.messages.message.hideUserMessages ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(["tvk-message", {
          "tvk-message-user": props.message.author === unref(MessageAuthor).user,
          "tvk-message-bot": props.message.author === unref(MessageAuthor).bot
        }])
      }, [
        createElementVNode("div", _hoisted_1$1, [
          unref(appOptions).preferences.messages.message.header.display && props.message.author !== unref(MessageAuthor).app ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
            unref(appOptions).preferences.messages.message.header.avatar.display ? (openBlock(), createElementBlock("div", _hoisted_3, [
              !unref(appOptions).preferences.messages.message.header.avatar.userImage && unref(appOptions).preferences.messages.message.header.avatar.userIcon && props.message.author === unref(MessageAuthor).user ? (openBlock(), createElementBlock("i", {
                key: 0,
                class: normalizeClass([
                  "tvk-message-header-avatar-user",
                  unref(appOptions).preferences.messages.message.header.avatar.userIcon
                ])
              }, null, 2)) : createCommentVNode("", true),
              unref(appOptions).preferences.messages.message.header.avatar.userImage && props.message.author === unref(MessageAuthor).user ? (openBlock(), createElementBlock("img", {
                key: 1,
                src: unref(appOptions).preferences.messages.message.header.avatar.userImage.src,
                style: normalizeStyle({
                  width: unref(appOptions).preferences.messages.message.header.avatar.userImage.width,
                  height: unref(appOptions).preferences.messages.message.header.avatar.userImage.height
                }),
                role: "none"
              }, null, 12, _hoisted_4)) : createCommentVNode("", true),
              !unref(appOptions).preferences.messages.message.header.avatar.botImage && unref(appOptions).preferences.messages.message.header.avatar.botIcon && props.message.author === unref(MessageAuthor).bot ? (openBlock(), createElementBlock("i", {
                key: 2,
                class: normalizeClass([
                  "tvk-message-header-avatar-bot",
                  unref(appOptions).preferences.messages.message.header.avatar.botIcon
                ])
              }, null, 2)) : createCommentVNode("", true),
              unref(appOptions).preferences.messages.message.header.avatar.botImage && props.message.author === unref(MessageAuthor).bot ? (openBlock(), createElementBlock("img", {
                key: 3,
                src: unref(appOptions).preferences.messages.message.header.avatar.botImage.src,
                style: normalizeStyle({
                  width: unref(appOptions).preferences.messages.message.header.avatar.botImage.width,
                  height: unref(appOptions).preferences.messages.message.header.avatar.botImage.height
                }),
                role: "none"
              }, null, 12, _hoisted_5)) : createCommentVNode("", true)
            ])) : createCommentVNode("", true),
            unref(appOptions).preferences.messages.message.header.label.display ? (openBlock(), createElementBlock("div", _hoisted_6, [
              createElementVNode("span", _hoisted_7, toDisplayString(unref(appOptions).wording.messages.message.header.labelUser), 1),
              createElementVNode("span", _hoisted_8, toDisplayString(unref(appOptions).wording.messages.message.header.labelBot), 1)
            ])) : createCommentVNode("", true)
          ])) : createCommentVNode("", true),
          props.message.author !== unref(MessageAuthor).app ? (openBlock(), createElementBlock("div", _hoisted_9, [
            props.message.type === unref(MessageType).message ? (openBlock(), createBlock(_sfc_main$6, {
              key: 0,
              message: props.message
            }, null, 8, ["message"])) : createCommentVNode("", true),
            props.message.type === unref(MessageType).card ? (openBlock(), createBlock(_sfc_main$5, {
              key: 1,
              card: props.message
            }, null, 8, ["card"])) : createCommentVNode("", true),
            props.message.type === unref(MessageType).carousel ? (openBlock(), createBlock(_sfc_main$4, {
              key: 2,
              carousel: props.message
            }, null, 8, ["carousel"])) : createCommentVNode("", true),
            props.message.type === unref(MessageType).image ? (openBlock(), createBlock(_sfc_main$3, {
              key: 3,
              message: props.message
            }, null, 8, ["message"])) : createCommentVNode("", true)
          ])) : createCommentVNode("", true),
          props.message.author === unref(MessageAuthor).app ? (openBlock(), createElementBlock("div", _hoisted_10, [
            props.message.type === unref(MessageType).loader ? (openBlock(), createElementBlock("div", _hoisted_11)) : createCommentVNode("", true),
            props.message.type === unref(MessageType).error ? (openBlock(), createElementBlock("div", _hoisted_12, [
              _hoisted_13,
              createTextVNode(" " + toDisplayString(props.message.text), 1)
            ])) : createCommentVNode("", true),
            props.message.type === unref(MessageType).info ? (openBlock(), createElementBlock("div", {
              key: 2,
              class: "tvk-message-info",
              innerHTML: props.message.text
            }, null, 8, _hoisted_14)) : createCommentVNode("", true)
          ])) : createCommentVNode("", true)
        ]),
        ((_a = props.message.footnotes) == null ? void 0 : _a.length) && unref(appOptions).preferences.messages.footNotes.display && unref(appOptions).preferences.messages.footNotes.displayOnMessageSide ? (openBlock(), createElementBlock("div", _hoisted_15, [
          createVNode(_sfc_main$7, {
            footnotes: props.message.footnotes
          }, null, 8, ["footnotes"])
        ])) : createCommentVNode("", true)
      ], 2)) : createCommentVNode("", true);
    };
  }
});
const _hoisted_1 = /* @__PURE__ */ createElementVNode("div", { class: "tvk-shader tvk-shader-top" }, null, -1);
const _hoisted_2 = /* @__PURE__ */ createElementVNode("div", { class: "tvk-shader tvk-shader-bottom" }, null, -1);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "messages",
  setup(__props) {
    const mainStore = useMainStore();
    const messagesWrapper = ref();
    function scrollBottom() {
      setTimeout(() => {
        messagesWrapper.value.scrollTop = messagesWrapper.value.scrollHeight;
      }, 100);
    }
    onMounted(() => {
      scrollBottom();
    });
    mainStore.$onAction(({ name, store, args, after }) => {
      if (name === "scrollMessages") {
        after(() => {
          setTimeout(() => {
            scrollBottom();
          });
        });
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "messagesWrapper",
        ref: messagesWrapper,
        class: "tvk-messages"
      }, [
        _hoisted_1,
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(mainStore).getMessages, (mssg) => {
          return openBlock(), createBlock(_sfc_main$2, { message: mssg }, null, 8, ["message"]);
        }), 256)),
        _hoisted_2
      ], 512);
    };
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "App",
  setup(__props) {
    const appOptions = appOptionsSingleton.getOptions();
    const mainStore = useMainStore();
    let randomKey = ref(getRandomKey());
    let isDisplayed = ref(true);
    function getRandomKey() {
      return (Math.random() + 1).toString(36).substring(7);
    }
    mainStore.$onAction(({ name, store, args, after }) => {
      if (name === "updateApplication") {
        after(() => {
          randomKey.value = getRandomKey();
          isDisplayed.value = false;
          setTimeout(() => {
            isDisplayed.value = true;
          });
        });
      }
    });
    return (_ctx, _cache) => {
      return unref(isDisplayed) ? (openBlock(), createElementBlock("div", {
        class: "tvk-wrapper",
        key: unref(randomKey)
      }, [
        unref(mainStore).getMessages.length || !unref(appOptions).preferences.messages.hideIfNoMessages ? (openBlock(), createBlock(_sfc_main$1, { key: 0 })) : createCommentVNode("", true),
        createVNode(_sfc_main$a)
      ])) : createCommentVNode("", true);
    };
  }
});
function appInitialization() {
  var _a, _b;
  const appOptions = appOptionsSingleton.getOptions();
  if (((_a = appOptions == null ? void 0 : appOptions.initialization) == null ? void 0 : _a.welcomeMessage) || ((_b = appOptions == null ? void 0 : appOptions.initialization) == null ? void 0 : _b.openingMessage)) {
    const mainStore = useMainStore();
    const storedState = mainStore.getStoredState();
    if (!storedState || !storedState.messages.length) {
      if (appOptions.initialization.welcomeMessage) {
        mainStore.addMessage({
          type: MessageType.message,
          author: MessageAuthor.bot,
          date: Date.now(),
          text: appOptions.initialization.welcomeMessage
        });
      }
      if (appOptions.initialization.openingMessage) {
        mainStore.sendUserMessage(
          appOptions.initialization.openingMessage,
          false
        );
      }
    }
  }
}
let appMemo;
let targetMemo;
function renderChat(target, tockEndPoint, options) {
  targetMemo = target;
  mountApp(tockEndPoint, options);
  return appMemo;
}
function reload(tockEndPoint, options) {
  mountApp(tockEndPoint, options);
}
function mountApp(tockEndPoint, options) {
  if (appMemo == null ? void 0 : appMemo.unmount)
    appMemo.unmount();
  appMemo = createApp(_sfc_main);
  appMemo.provide(tockEndpointKey, tockEndPoint);
  appOptionsSingleton.clearInstance();
  appOptionsSingleton.setOptions(options);
  const pinia = createPinia();
  appMemo.use(pinia);
  appMemo.mount(targetMemo);
  appInitialization();
}
function getTvkDefaultOptions() {
  return JSON.parse(JSON.stringify(appOptionsModel));
}
function getTvkCurrentOptions() {
  return JSON.parse(JSON.stringify(appOptionsSingleton.getOptions()));
}
function updateTvkOption(pathString, value) {
  const options = appOptionsSingleton.getOptions();
  const path = pathString.split(".");
  let pointer = options;
  for (let i = 0; i < path.length; i++) {
    const space = path[i];
    if (i < path.length - 1) {
      if (pointer[space]) {
        pointer = pointer[space];
      } else {
        pointer[space] = {};
        pointer = pointer[space];
      }
    } else {
      pointer[space] = value;
      const mainStore = useMainStore();
      mainStore.updateApplication();
    }
  }
}
function addTvkMessage(message) {
  const mainStore = useMainStore();
  mainStore.addMessage(message);
}
export {
  addTvkMessage,
  getTvkCurrentOptions,
  getTvkDefaultOptions,
  reload,
  renderChat,
  updateTvkOption
};
