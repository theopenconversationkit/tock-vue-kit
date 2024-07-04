import "./assets/scss/main.scss";

import { createApp, type App } from "vue";
import { createPinia } from "pinia";
import TvkApp from "@/App.vue";
import { tockEndpointKey } from "@/keys/app-keys";
import { appOptionsSingleton } from "@/utils/app-options-singleton";
import { appInitialization } from "@/utils/initialization";
import { useMainStore } from "@/stores/main-state";
import { appOptionsModel } from "@/utils/app-options-model";
import type {
  AppOptions,
  AppOptionsModel,
  DeepPartial,
} from "@/models/app-options-model";

let appMemo: App<Element>;
let targetMemo: HTMLElement;

function renderChat(
  target: HTMLElement,
  tockEndPoint: string,
  options?: DeepPartial<AppOptions>
): App<Element> {
  targetMemo = target;
  mountApp(tockEndPoint, options);
  return appMemo;
}

function reload(tockEndPoint: string, options?: DeepPartial<AppOptions>): void {
  mountApp(tockEndPoint, options);
}

function mountApp(
  tockEndPoint: string,
  options?: DeepPartial<AppOptions>
): void {
  if (appMemo?.unmount) appMemo.unmount();

  appMemo = createApp(TvkApp);

  appMemo.provide(tockEndpointKey, tockEndPoint);

  appOptionsSingleton.clearInstance();
  appOptionsSingleton.setOptions(options);

  const pinia = createPinia();
  appMemo.use(pinia);

  appMemo.mount(targetMemo);
  appInitialization();
}

function getTvkDefaultOptions(): AppOptionsModel {
  return JSON.parse(JSON.stringify(appOptionsModel));
}

function getTvkCurrentOptions(): AppOptions {
  return JSON.parse(JSON.stringify(appOptionsSingleton.getOptions()));
}

function updateTvkOption(
  pathString: string,
  value: string | number | boolean | undefined
): void {
  const options = appOptionsSingleton.getOptions();
  const path = pathString.split(".");

  let pointer = options;
  for (let i = 0; i < path.length; i++) {
    const space = path[i] as keyof AppOptions;

    if (i < path.length - 1) {
      if (pointer[space]) {
        pointer = pointer[space] as unknown as AppOptions;
      } else {
        (pointer as any)[space] = {};
        pointer = pointer[space] as unknown as AppOptions;
      }
    } else {
      (pointer as any)[space] = value;
      const mainStore = useMainStore();
      mainStore.updateApplication();
    }
  }
}

declare global {
  interface Window {
    TockVueKit: {
      renderChat: (
        target: string,
        tockEndPoint: string,
        options: AppOptions
      ) => App<Element>;
      getTvkDefaultOptions: () => AppOptionsModel;
      getTvkCurrentOptions: () => AppOptions;
      updateTvkOption: (
        path: string,
        value: string | number | boolean | undefined
      ) => void;
      reload: () => void;
    };
  }
}

export {
  renderChat,
  getTvkDefaultOptions,
  getTvkCurrentOptions,
  updateTvkOption,
  reload,
};
